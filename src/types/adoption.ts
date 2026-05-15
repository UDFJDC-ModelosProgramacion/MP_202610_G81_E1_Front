export interface AdoptionDTO {
  id?: number;
  adoptionDate: string;   // ISO date: "YYYY-MM-DD"
  status: string;         // ProcessStatus: CREATED | IN_PROGRESS | COMPLETED | CANCELLED | PENDING
  adopterId: number;
  petId: number;
}
 
export interface AdoptionDetailDTO extends AdoptionDTO {
  adopter?: {
    id: number;
    name: string;
    email: string;
  };
  pet?: {
    id: number;
    name: string;
    breed: string;
  };
  trialCohabitation?: TrialCohabitationSummaryDTO;
  followUps?: FollowUpSummaryDTO[];
}
 
export interface TrialCohabitationSummaryDTO {
  id: number;
  startDate: string;
  endDate: string;
  result: string;
}
 
export interface FollowUpSummaryDTO {
  id: number;
  followUpDate: string;
  notes: string;
}