export interface VaccineDTO {
  id: number;
  name: string;
  validityMonths: number;
  description: string;
}

export interface CreateVaccineDTO {
  name: string;
  validityMonths: number;
  description: string;
}
