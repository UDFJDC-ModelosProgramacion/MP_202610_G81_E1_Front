import { Phone, Mail, Clock, Building2 } from 'lucide-react';
import { type VeterinarianDetailDTO } from '../../../types/veterinarian';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';

interface VeterinarianCardProps {
  vet: VeterinarianDetailDTO;
}

export function VeterinarianCard({ vet }: Readonly<VeterinarianCardProps>) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{vet.name}</h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                {vet.specialty}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
              <Clock className="w-4 h-4" />
              <span>{vet.availability}</span>
            </div>
            {vet.shelter && (
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <Building2 className="w-4 h-4" />
                <span>
                  Associated with: <span className="text-blue-600 font-medium">{vet.shelter.name}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-blue-600" />
            </div>
            <span>{vet.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <span>{vet.email}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            Request Appointment
          </Button>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
