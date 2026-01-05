"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const TripDetail = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data, error } = await supabase
          .from("itineraries")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setTrip(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTrip();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!trip) return <div>Trip not found</div>;

  return (
    <div>
      <div>
        <button>Back</button>
      </div>
      <div>
        <h1>{trip.name}</h1>
        <div>
          <span>{trip.duration} day plan</span>
          <span>{trip.country}</span>
        </div>
        <div>
          <Image
            src="/assets/images/sample.jpeg"
            alt="Trip Image"
            width={600}
            height={400}
          />
          <Image
            src="/assets/images/sample1.jpg"
            alt="Trip Image"
            width={600}
            height={400}
          />
          <Image
            src="/assets/images/sample2.jpg"
            alt="Trip Image"
            width={600}
            height={400}
          />
        </div>
        <div>
          <span>{trip.budget}</span>
          <span>{trip.travel_style}</span>
          <span>{trip.group_type}</span>
          <span>{trip.interests?.join(", ")}</span>
        </div>
        <h2>{trip.name}</h2>
        <p>{trip.description}</p>
        <p>Estimated Price: {trip.estimated_price}</p>
        {trip.itinerary?.map((day, index) => (
          <div key={index}>
            <h3>
              Day {day.day}: {day.location}
            </h3>
            <ul>
              {day.activities?.map((activity, actIndex) => (
                <li key={actIndex}>
                  <strong>{activity.time}:</strong> {activity.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <h3>Best Time to Visit:</h3>
        <ul>
          {trip.best_time_to_visit?.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
        <h3>Weather Info:</h3>
        <ul>
          {trip.weather_info?.map((weather, index) => (
            <li key={index}>{weather}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TripDetail;
