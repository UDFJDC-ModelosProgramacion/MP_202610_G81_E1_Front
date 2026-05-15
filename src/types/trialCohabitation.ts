export type TrialCohabitationResult = 'EN_PROCESO' | 'EXITOSA' | 'FALLIDA' | 'CANCELADA';
 
export interface TrialCohabitationDTO {
  id?: number;
  startDate: string;   // ISO date: "YYYY-MM-DD"
  endDate: string;     // ISO date: "YYYY-MM-DD"
  result: TrialCohabitationResult;
  status?: string;
  petId?: number;
  adoptionId?: number;
}
 
export interface TrialCohabitationDetailDTO extends TrialCohabitationDTO {
  pet?: {
    id: number;
    name: string;
    breed: string;
  };
  adoption?: {
    id: number;
    adoptionDate: string;
    status: string;
  };
}