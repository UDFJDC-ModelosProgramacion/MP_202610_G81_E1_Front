import { MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PetCardProps {
  name: string;
  breed: string;
  age: string;
  imageUrl: string;
  shelterName: string;
}

export function PetCard({ name, breed, age, imageUrl, shelterName }: PetCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-neutral-100 overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          AVAILABLE
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg text-neutral-800 mb-1">{name}</h3>
        <p className="text-neutral-600 text-sm mb-1">{breed}</p>
        <p className="text-neutral-500 text-sm mb-4">{age}</p>

        <div className="flex items-center gap-1.5 mb-4 text-neutral-500 text-xs">
          <MapPin className="w-3.5 h-3.5" />
          <span>{shelterName}</span>
        </div>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm">
          View Profile
        </button>
      </div>
    </div>
  );
}
