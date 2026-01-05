import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const groupTypeData = [
  { value: "solo", label: "Solo" },
  { value: "couple", label: "Couple" },
  { value: "family", label: "Family" },
  { value: "friends", label: "Friends" },
  { value: "business", label: "Business" },
];

export const interestsData = [
  { value: "foodculinary", label: "Food & Culinary" },
  { value: "hikingnature", label: "Hiking & Nature Walks" },
  { value: "historicalsites", label: "Historical Sites" },
  { value: "museumsart", label: "Museums & Art" },
  { value: "beacheswater", label: "Beaches & Water Activities" },
  { value: "nightlifebars", label: "Nightlife & Bars" },
  { value: "photographyspots", label: "Photography Spots" },
  { value: "shopping", label: "Shopping" },
  { value: "localexperiences", label: "Local Experiences" },
];

export const travelStyleData = [
  { value: "relaxed", label: "Relaxed" },
  { value: "adventure", label: "Adventure" },
  { value: "culture", label: "Culture" },
  { value: "luxury", label: "Luxury" },
  { value: "natureoutdoors", label: "Nature & Outdoors" },
  { value: "cityexploration", label: "City Exploration" },
];

export const budgetEstimateData = [
  { value: "budget", label: "Budget" },
  { value: "midrange", label: "Mid-range" },
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Luxury" },
];
