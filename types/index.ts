// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

// Destination types
export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image_url: string;
  popularity_score?: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

// Itinerary types
export interface Itinerary {
  id: string;
  user_id: string;
  destination_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  activities: Activity[];
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  time: string;
  location?: string;
}

// Analytics types
export interface AnalyticsEvent {
  id: string;
  user_id?: string;
  event_type: string;
  event_data: Record<string, unknown>;
  created_at: string;
}

export interface DashboardStats {
  total_users: number;
  total_destinations: number;
  total_itineraries: number;
  recent_signups: number;
}
