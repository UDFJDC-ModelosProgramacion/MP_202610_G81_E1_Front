export interface VaccinationRecordDTO {
  id: number;
  applicationDate: string;
  nextDueDate: string;
  vaccinationDate: string;
  notes: string;
  petId: number;
  vaccineId: number;
  medicalHistoryId: number;
  veterinarianId: number;
}

export interface CreateVaccinationRecordDTO {
  applicationDate: string;
  nextDueDate: string;
  vaccinationDate: string;
  notes: string;
  petId: number;
  vaccineId: number;
  medicalHistoryId: number;
  veterinarianId: number;
}
