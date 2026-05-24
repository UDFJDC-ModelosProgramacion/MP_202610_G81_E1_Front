import type { ShelterDTO } from './shelter';
import type { UserRole } from './auth';

export interface UserDTO {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role?: UserRole;
}

export interface VeterinarianDTO extends UserDTO {
  specialty: string;
  availability: string;
  shelter?: ShelterDTO;
}

export interface VeterinarianDetailDTO extends VeterinarianDTO {
  id: number;
  name: string;
  specialties: string[];
}

