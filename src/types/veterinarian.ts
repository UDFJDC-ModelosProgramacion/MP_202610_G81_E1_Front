import type { ShelterDTO } from './shelter';

export interface UserDTO {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password?: string;
}

export interface VeterinarianDTO extends UserDTO {
  specialty: string;
  availability: string;
  shelter?: ShelterDTO;
}

export interface VeterinarianDetailDTO extends VeterinarianDTO {
  id: number;
}
