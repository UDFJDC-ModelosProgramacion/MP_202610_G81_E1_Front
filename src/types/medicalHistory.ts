export interface MedicalHistoryDTO {
  id: number;
  lastCheckup: string; 
  description: string;
  notes: string;
  petId: number;    
}

export interface CreateMedicalHistoryDTO {
  lastCheckup: string;
  description: string;
  notes: string;
  petId: number;
}
