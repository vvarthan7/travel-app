import { Button } from "@/components/Button";
import DestinationCard from "@/components/DestinationCard";
import { Destination } from "@/types";
import Link from "next/link";

// Mock data for demonstration
const mockDestinations: Destination[] = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    description: "The City of Light offers romantic streets, world-class museums, and unforgettable cuisine.",
    image_url: "",
    featured: true,
    popularity_score: 4.8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Tokyo",
    country: "Japan",
    description: "A vibrant metropolis blending ancient traditions with cutting-edge technology and culture.",
    image_url: "",
    featured: true,
    popularity_score: 4.9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Bali",
    country: "Indonesia",
    description: "Tropical paradise with stunning beaches, lush rice terraces, and spiritual temples.",
    image_url: "",
    featured: false,
    popularity_score: 4.7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative gradient-primary text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              AI-powered travel planning that creates personalized itineraries for unforgettable journeys
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-primary-blue hover:bg-gray-100 min-w-[200px]">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 min-w-[200px]">
                  Explore Destinations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Tourvisto?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">AI-Powered</h3>
              <p className="text-gray-600">
                Smart algorithms create personalized itineraries based on your preferences
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Global Destinations</h3>
              <p className="text-gray-600">
                Explore thousands of destinations worldwide with curated recommendations
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Instant Planning</h3>
              <p className="text-gray-600">
                Get your complete travel plan in minutes, not hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Destinations
            </h2>
            <Link href="/explore">
              <Button variant="ghost">View All →</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-secondary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of travelers who trust Tourvisto for their adventures
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-primary-purple hover:bg-gray-100 min-w-[200px]">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
