import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { VeterinarianCard } from './VeterinarianCard';
import { getVeterinarians } from '../../../services/veterinarianService';
import { type VeterinarianDetailDTO } from '../../../types/veterinarian';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

interface VeterinaryDirectoryProps {
  selectedSpecialty: string;
}

export function VeterinaryDirectory({ selectedSpecialty }: Readonly<VeterinaryDirectoryProps>) {
  const [veterinarians, setVeterinarians] = useState<VeterinarianDetailDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  useEffect(() => {
    const fetchVets = async () => {
      try {
        setLoading(true);
        const data = await getVeterinarians();
        setVeterinarians(data);
        setError(null);
      } catch {
        setError('Failed to load veterinarians. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVets();
  }, []);

  const filteredVeterinarians = veterinarians.filter((vet) => {
    const matchesSearch =
      searchQuery === '' ||
      vet.specialty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vet.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === 'all' ||
      vet.specialty?.toLowerCase() === selectedSpecialty.toLowerCase();

    const matchesAvailability =
      availabilityFilter === 'all' ||
      (availabilityFilter === 'weekends' && vet.availability?.toLowerCase().includes('sat')) ||
      (availabilityFilter === 'available_now' && vet.availability?.toLowerCase().includes('mon'));

    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-blue-600 animate-pulse font-medium">Loading veterinarians...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-8 bg-gray-50">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-6xl mx-auto">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Veterinary Directory</h1>
          <p className="text-gray-600">Find qualified veterinarians for your pet's healthcare needs</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by specialty or name..."
                className="pl-10 h-12"
              />
            </div>
            <div>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="All Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  <SelectItem value="available_now">Available Now</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredVeterinarians.length} veterinarian{filteredVeterinarians.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="space-y-4">
          {filteredVeterinarians.length > 0 ? (
            filteredVeterinarians.map((vet) => (
              <VeterinarianCard key={vet.id} vet={vet} />
            ))
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-500">No veterinarians found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
