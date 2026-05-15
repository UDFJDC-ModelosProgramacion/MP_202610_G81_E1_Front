export interface AdopterDTO {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  housingType: string;
  hasChildren: boolean;
  hasOtherPets: boolean;
}
 
export interface AdopterDetailDTO extends AdopterDTO {
  adoptions?: AdoptionSummaryDTO[];
  adoptionRequests?: AdoptionRequestSummaryDTO[];
}
 
// Resumen mínimo para evitar circular refs
export interface AdoptionSummaryDTO {
  id: number;
  adoptionDate: string;
  status: string;
}
 
export interface AdoptionRequestSummaryDTO {
  id: number;
  requestDate: string;
  status: string;
}