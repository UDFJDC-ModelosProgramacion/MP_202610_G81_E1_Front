export interface MedicalEventDetailDTO {
  id: number;
  eventDate: string;
  eventType: string;      
  diagnosis: string;      
  treatment: string;      
  medicalHistoryId: number; 
  veterinarianId: number;   
}

export interface CreateMedicalEventDTO {
  eventDate: string;
  eventType: string;
  diagnosis: string;
  treatment: string;
  medicalHistoryId: number;
  veterinarianId: number;
}
