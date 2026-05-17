import { Stethoscope, Heart, Syringe, Activity, Eye, Bone } from 'lucide-react';

interface VetSidebarProps {
  selectedSpecialty: string;
  onSpecialtyChange: (specialty: string) => void;
}

const specialties = [
  { id: 'all', name: 'All Specialties', icon: Stethoscope },
  { id: 'cardiology', name: 'Cardiology', icon: Heart },
  { id: 'dermatology', name: 'Dermatology', icon: Activity },
  { id: 'pediatrics', name: 'Pediatrics', icon: Bone },
  { id: 'surgery', name: 'Surgery', icon: Eye },
  { id: 'vaccination', name: 'Vaccination', icon: Syringe }
];

export function VetSidebar({ selectedSpecialty, onSpecialtyChange }: VetSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
      <h2 className="font-semibold text-lg text-gray-900 mb-6">Specialties</h2>
      <nav className="space-y-2">
        {specialties.map((specialty) => {
          const Icon = specialty.icon;
          return (
            <button
              key={specialty.id}
              onClick={() => onSpecialtyChange(specialty.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                selectedSpecialty.toLowerCase() === specialty.id.toLowerCase()
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{specialty.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
