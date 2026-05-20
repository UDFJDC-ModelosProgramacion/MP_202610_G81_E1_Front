export type ID = number | string;

export interface ClinicalRecord {
  id: ID;
  petId: ID;
  createdAt: string;
  lastUpdated?: string;
}

export interface MedicalEvent {
  id: ID;
  clinicalId: ID;
  date: string; 
  description: string;
}

export interface Vaccine {
  id: ID;
  code?: string;
  name: string;
  description?: string;
}

export interface VaccineApplication {
  id: ID;
  petId: ID;
  vaccineId: ID;
  date: string;
  immutable?: boolean;
}
