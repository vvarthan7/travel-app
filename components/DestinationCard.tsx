import Image from 'next/image';
import { Destination } from '@/types';
import { Button } from './Button';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        {destination.image_url ? (
          <Image
            src={destination.image_url}
            alt={destination.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full gradient-secondary flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{destination.name.charAt(0)}</span>
          </div>
        )}
        {destination.featured && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h3>
          <p className="text-sm text-gray-600">{destination.country}</p>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {destination.description}
        </p>
        
        {destination.popularity_score && (
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm font-medium">{destination.popularity_score.toFixed(1)}</span>
            </div>
          </div>
        )}
        
        <Button variant="gradient" className="w-full">
          Explore Now
        </Button>
      </div>
    </div>
  );
}
