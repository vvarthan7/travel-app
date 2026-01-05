"use client";

import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import countryList from "../lib/countryList.json";
import { countryCoords } from "../lib/countryCoords";
import Dropdown from "./ui/dropdown";
import {
  groupTypeData,
  travelStyleData,
  interestsData,
  budgetEstimateData,
} from "@/lib/utils";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

const CreateTrip = () => {
  const [country, setCountry] = useState("");
  const [groupType, setGroupType] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [interests, setInterests] = useState("");
  const [budgetEstimate, setBudgetEstimate] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const router = useRouter();

  const countryOptions = countryList.map((country) => ({
    value: country.country,
    label: country.country,
    icon: country.flag,
  }));

  const groupTypeOptions = groupTypeData.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  const travelStyleOptions = travelStyleData.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  const interestsOptions = interestsData.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  const budgetEstimateOptions = budgetEstimateData.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      mapRef.current &&
      !mapInstanceRef.current
    ) {
      // Fix for default marker icons in Next.js
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      mapInstanceRef.current = L.map(mapRef.current).setView([20, 0], 2);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapInstanceRef.current
      );
    }
  }, []);

  useEffect(() => {
    if (country && countryCoords[country]) {
      const coords = countryCoords[country];
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([coords.lat, coords.lng], 6);
        if (markerRef.current) {
          markerRef.current.setLatLng([coords.lat, coords.lng]);
        } else {
          markerRef.current = L.marker([coords.lat, coords.lng]).addTo(
            mapInstanceRef.current
          );
        }
      }
    }
  }, [country]);

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto border border-light-100 p-6 rounded-lg shadow-md">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);

          try {
            // Get the current user
            const {
              data: { user },
              error: authError,
            } = await supabase.auth.getUser();
            // if (authError || !user) {
            //   throw new Error("User not authenticated");
            // }

            // Prepare form data
            const formData = {
              country,
              numberOfDays: parseInt(duration),
              budget: budgetEstimate,
              interests,
              travelStyle,
              groupType,
              userId: "a08166a6-9394-4cf7-b08e-b7bf67ee5157",
            };

            // Call the API route
            const response = await fetch("/api/generate-itinerary", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(
                errorData.error || "Failed to generate itinerary"
              );
            }

            const { itinerary } = await response.json();

            // Redirect to trip details
            router.push(`/trip-details/${itinerary.id}`);
          } catch (error) {
            console.error("Error creating trip:", error);
            alert("Failed to create trip. Please try again.");
          } finally {
            setLoading(false);
          }
        }}
      >
        <Dropdown
          label="Country"
          id="country"
          options={countryOptions}
          value={country}
          icon={true}
          onChange={setCountry}
          placeholder="Select country..."
          searchPlaceholder="Search country..."
          emptyMessage="No country found."
          search={true}
        />
        <div className="mb-6">
          <label
            htmlFor="duration"
            className="block font-normal text-sm text-gray-100 mb-2"
          />
          Duration
          <input
            type="number"
            name="duration"
            id="duration"
            placeholder="Enter number of days (e.g., 5, 12)"
            className="border border-light-400 shadow-sm h-12 px-3.5 w-full mt-2 rounded-md text-md placeholder:text-gray-100 text-dark-400"
            min="1"
            step="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <Dropdown
          label="Group Type"
          options={groupTypeOptions}
          value={groupType}
          icon={false}
          onChange={setGroupType}
          placeholder="Select group type..."
          search={false}
        />

        <Dropdown
          label="Travel Style"
          options={travelStyleOptions}
          value={travelStyle}
          icon={false}
          onChange={setTravelStyle}
          placeholder="Select your travel style..."
          search={false}
        />

        <Dropdown
          label="Interests"
          options={interestsOptions}
          value={interests}
          icon={false}
          onChange={setInterests}
          placeholder="Select interests..."
          search={false}
        />

        <Dropdown
          label="Budget Estimate"
          options={budgetEstimateOptions}
          value={budgetEstimate}
          icon={false}
          onChange={setBudgetEstimate}
          placeholder="Select your budget preference"
          search={false}
        />

        <div className="mb-6">
          <div className="block font-normal text-sm text-gray-100 mb-2">
            Location on map
          </div>
          <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer bg-primary-100 hover:bg-primary-200 text-white font-semibold py-3 px-6 rounded-md flex items-center justify-center w-full shadow-md hover:shadow-lg transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              src="/assets/icons/magic-star.svg"
              alt="magic star"
              width={24}
              height={24}
              className="inline mr-2"
            />
            {loading ? "Generating Trip..." : "Generate a trip"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateTrip;
