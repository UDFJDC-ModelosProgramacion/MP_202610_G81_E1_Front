export interface ShelterEventDTO {
  id?: number;
  name: string;
  eventDate: string;  // ISO date: "YYYY-MM-DD"
  shelterId: number;
}

export interface ShelterEventDetailDTO extends ShelterEventDTO {
  shelter?: {
    id: number;
    name: string;
  };
}
