import { MapPin } from 'lucide-react'; 
import { ImageWithFallback } from './figma/ImageWithFallback'; 

interface PetCardProps {
  name: string;
  breed: string;
  age: number; 
  photos: string; 
  shelterName: string;
}

export function PetCard({ name, breed, age, photos, shelterName }: PetCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-neutral-100 overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <ImageWithFallback
          src={photos} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          AVAILABLE
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-lg text-neutral-800">{name}</h3>
            <span className="text-xs font-medium px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">
                {age} {age === 1 ? 'year' : 'years'}
            </span>
        </div>
        <p className="text-neutral-600 text-sm mb-4">{breed}</p>

        <div className="flex items-center gap-1.5 mb-4 text-neutral-500 text-xs">
          <MapPin className="w-3.5 h-3.5" />
          <span>{shelterName || "Refugio Local"}</span>
        </div>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm">
          View Profile
        </button>
      </div>
    </div>
  );
}
