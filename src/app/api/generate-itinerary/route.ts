import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";

async function getImages(country: string) {
  const query = `travel ${country}`;
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`;

  const response = await fetch(url, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY || '',
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch images from Pexels");
    return [
      "https://via.placeholder.com/600x400?text=No+Image+Available",
      "https://via.placeholder.com/600x400?text=No+Image+Available",
      "https://via.placeholder.com/600x400?text=No+Image+Available"
    ];
  }

  const data = await response.json();
  return data.photos.map((photo: any) => photo.src.large);
}

async function generateItinerary({
  country,
  numberOfDays,
  budget,
  interests,
  travelStyle,
  groupType,
  userId,
}) {
  // Validate required fields
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Generate prompt
  const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
  Budget: '${budget}'
  Interests: '${interests}'
  TravelStyle: '${travelStyle}'
  GroupType: '${groupType}'
  Return ONLY a valid JSON object in the following structure, without any markdown formatting or additional text:
  {
    "name": "A descriptive title for the trip",
    "description": "A brief description of the trip and its highlights not exceeding 100 words",
    "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
    "duration": ${numberOfDays},
    "budget": "${budget}",
    "travelStyle": "${travelStyle}",
    "country": "${country}",
    "interests": "${interests}",
    "groupType": "${groupType}",
    "images": [],
    "bestTimeToVisit": [
      "🌸 Season (from month to month): reason to visit",
      "☀️ Season (from month to month): reason to visit",
      "🍁 Season (from month to month): reason to visit",
      "❄️ Season (from month to month): reason to visit"
    ],
    "weatherInfo": [
      "☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
      "🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
      "🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
      "❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)"
    ],
    "location": {
      "city": "name of the city or region",
      "coordinates": [latitude, longitude],
      "openStreetMap": "link to open street map"
    },
    "itinerary": [
      {
        "day": 1,
        "location": "City/Region Name",
        "activities": [
          {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
          {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
          {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
        ]
      }
    ]
  }`;

  // Call Gemini API
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log("Gemini response text:", text);

  // Parse JSON (remove markdown formatting if present)
  const cleanedText = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();
  console.log("Cleaned text:", cleanedText);
  let itineraryData;
  try {
    itineraryData = JSON.parse(cleanedText);
  } catch (parseError) {
    console.error("JSON parse error:", parseError);
    console.error("Failed to parse text:", cleanedText);
    throw new Error(`Invalid JSON response from AI: ${parseError.message}`);
  }

  // Fetch images from Pexels
  itineraryData.images = await getImages(country);

  // Save to Supabase
  const { data, error } = await supabase
    .from("itineraries")
    .insert({
      user_id: userId,
      name: itineraryData.name,
      description: itineraryData.description,
      country: itineraryData.country,
      estimated_price: itineraryData.estimatedPrice,
      duration: itineraryData.duration,
      budget: itineraryData.budget,
      travel_style: itineraryData.travelStyle,
      group_type: itineraryData.groupType,
      interests: Array.isArray(itineraryData.interests)
        ? itineraryData.interests
        : itineraryData.interests.split(",").map((s) => s.trim()),
      images: itineraryData.images,
      best_time_to_visit: itineraryData.bestTimeToVisit,
      weather_info: itineraryData.weatherInfo,
      location: itineraryData.location,
      itinerary: itineraryData.itinerary,
    })
    .select();

  if (error) throw error;

  return data[0];
}

export async function POST(request: NextRequest) {
  try {
    const { country, numberOfDays, budget, interests, travelStyle, groupType, userId } = await request.json();

    const itinerary = await generateItinerary({
      country,
      numberOfDays,
      budget,
      interests,
      travelStyle,
      groupType,
      userId,
    });

    return NextResponse.json({ itinerary });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return NextResponse.json(
      { error: "Failed to generate itinerary", details: error.message },
      { status: 500 }
    );
  }
}