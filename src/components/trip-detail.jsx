"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { supabase } from "../lib/supabase";
import TripImages from "./trip-images";
import "leaflet/dist/leaflet.css";
import { countryCoords } from "../lib/countryCoords";

const TripDetail = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedTrips, setRelatedTrips] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [relatedError, setRelatedError] = useState(null);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const LRef = useRef(null);

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

  useEffect(() => {
    const fetchRelatedTrips = async () => {
      if (!trip) return;

      try {
        setRelatedLoading(true);

        // Fetch trips matching budget and travel_style
        const query1 = supabase
          .from("itineraries")
          .select("*")
          .eq("budget", trip.budget)
          .eq("travel_style", trip.travel_style)
          .neq("id", trip.id);

        // Fetch trips matching budget and group_type
        const query2 = supabase
          .from("itineraries")
          .select("*")
          .eq("budget", trip.budget)
          .eq("group_type", trip.group_type)
          .neq("id", trip.id);

        // Fetch trips matching travel_style and group_type
        const query3 = supabase
          .from("itineraries")
          .select("*")
          .eq("travel_style", trip.travel_style)
          .eq("group_type", trip.group_type)
          .neq("id", trip.id);

        const [result1, result2, result3] = await Promise.all([
          query1,
          query2,
          query3,
        ]);

        if (result1.error) throw result1.error;
        if (result2.error) throw result2.error;
        if (result3.error) throw result3.error;

        // Combine results and remove duplicates
        const allTrips = [...result1.data, ...result2.data, ...result3.data];
        const uniqueTrips = allTrips.filter(
          (trip, index, self) =>
            self.findIndex((t) => t.id === trip.id) === index
        );

        // Limit to 3 related trips
        setRelatedTrips(uniqueTrips.slice(0, 3));
      } catch (err) {
        setRelatedError(err.message);
      } finally {
        setRelatedLoading(false);
      }
    };

    if (trip) {
      fetchRelatedTrips();
    }
  }, [trip]);

  useLayoutEffect(() => {
    if (
      trip &&
      typeof window !== "undefined" &&
      mapRef.current &&
      !mapInstanceRef.current
    ) {
      // Dynamically import Leaflet to avoid SSR issues
      import("leaflet").then((L) => {
        LRef.current = L;
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

        // Now set the view to the country
        if (trip.country && countryCoords[trip.country]) {
          const coords = countryCoords[trip.country];
          mapInstanceRef.current.setView([coords.lat, coords.lng], 6);
          markerRef.current = L.marker([coords.lat, coords.lng]).addTo(
            mapInstanceRef.current
          );
        }
      });
    }
  }, [trip]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!trip) return <div>Trip not found</div>;

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
      <h1 className="font-semibold text-4xl text-dark-100 mb-6">{trip.name}</h1>
      <div className="flex gap-6 mb-10">
        <span className="flex items-center gap-1">
          <Image
            src="/assets/icons/calendar.svg"
            alt="Duration"
            width={20}
            height={20}
          />{" "}
          {trip.duration} day plan
        </span>
        <span className="flex items-center gap-1">
          <Image
            src="/assets/icons/location-mark.svg"
            alt="Location"
            width={20}
            height={20}
          />{" "}
          {trip.country}
        </span>
      </div>
      <TripImages images={trip.images} />
      <div className="flex gap-5 mb-9">
        <span className="py-2 px-5 text-navy-500 bg-navy-50 rounded-full font-medium text-[16px] capitalize">
          {trip.budget}
        </span>
        <span className="py-2 px-5 text-pink-500 bg-pink-50 rounded-full font-medium text-[16px] capitalize">
          {trip.travel_style}
        </span>
        <span className="py-2 px-5 text-success-700 bg-success-50 rounded-full font-medium text-[16px] capitalize">
          {trip.group_type}
        </span>
        <span className="py-2 px-5 text-primary-500 bg-primary-50 rounded-full font-medium text-[16px] capitalize">
          {trip.interests?.join(" ")}
        </span>
      </div>
      <div className="flex justify-between items-center mb-9">
        <h2 className="text-3xl font-semibold text-dark-100 max-w-lg">
          {trip.name}
        </h2>
        <span className="text-xl font-semibold text-dark-100">
          {trip.estimated_price}
        </span>
      </div>
      <p className="font-normal text-lg mb-9">{trip.description}</p>
      {trip.itinerary?.map((day, index) => (
        <div key={index}>
          <h3 className="font-semibold text-xl mb-4">
            Day {day.day}: {day.location}
          </h3>
          <ul>
            {day.activities?.map((activity, actIndex) => (
              <li key={actIndex} className="mb-2.5">
                <strong>{activity.time}:</strong> {activity.description}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <hr className="my-9 border-light-500" />
      <h3 className="font-semibold text-xl mb-4">Best Time to Visit:</h3>
      <ul>
        {trip.best_time_to_visit?.map((time, index) => (
          <li key={index} className="mb-2.5">
            {time}
          </li>
        ))}
      </ul>
      <hr className="my-9 border-light-500" />
      <h3 className="font-semibold text-xl mb-4">Weather Info:</h3>
      <ul>
        {trip.weather_info?.map((weather, index) => (
          <li key={index} className="mb-2.5">
            {weather}
          </li>
        ))}
      </ul>
      <hr className="my-9 border-light-500" />
      <div
        ref={mapRef}
        style={{ height: "400px", width: "100%" }}
        className="mb-9"
      ></div>
      <hr className="mb-9 border-light-500" />
      <h3 className="font-semibold text-xl mb-4">Popular Itineraries</h3>
      {relatedLoading && <div>Loading related trips...</div>}
      {relatedError && <div>Error loading related trips: {relatedError}</div>}
      {!relatedLoading && relatedTrips.length === 0 && (
        <div>No related trips found.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
        {relatedTrips.map((relatedTrip) => (
          <Link
            key={relatedTrip.id}
            href={`/admin/trip-details/${relatedTrip.id}`}
            className="block"
          >
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {relatedTrip.images?.[0] && (
                <Image
                  src={relatedTrip.images[0]}
                  alt={relatedTrip.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2">
                  {relatedTrip.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {relatedTrip.country} - {relatedTrip.duration} days
                </p>
                <p className="text-sm text-gray-600 capitalize">
                  {relatedTrip.budget} | {relatedTrip.travel_style} |{" "}
                  {relatedTrip.group_type}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default TripDetail;
