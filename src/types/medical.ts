export interface Vaccine {
  id?: number;
  name: string;
  description: string;
}

export interface MedicalEvent {
  id?: number;
  eventDate: string;
  description: string;
  medicalHistoryId: number;
}

export interface MedicalHistory {
  id: number;
  petId: number;
  events: MedicalEvent[];
}