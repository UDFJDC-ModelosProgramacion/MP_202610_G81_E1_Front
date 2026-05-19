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
  name: string;
  specialties: string[];
}

export interface VaccineDTO {
  id?: number;
  name: string;
  description: string;
}

export interface MedicalHistoryDTO {
  id?: number;
  petId: number;
}

export interface MedicalHistoryDetailDTO {
  id: number;
  petId: number;
  events: MedicalEventDetailDTO[];
  vaccinationReports: VaccinationReportDetailDTO[];
}

export interface MedicalEventDTO {
  id?: number;
  eventDate: string;
  description: string;
  medicalHistoryId: number;
}

export interface MedicalEventDetailDTO {
  id: number;
  eventDate: string;
  description: string;
  medicalHistoryId: number;
}

export interface VaccinationReportDTO {
  id?: number;
  applicationDate: string;
  petId: number;
  vaccineId: number;
}

export interface VaccinationReportDetailDTO {
  id: number;
  applicationDate: string;
  petId: number;
  vaccineId: number;
  vaccineName: string;
}
