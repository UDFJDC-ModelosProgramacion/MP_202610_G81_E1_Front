export interface ReviewDTO {
  id?: number;
  rating: number;     // 1–5
  comment: string;
  creationDate: string; // ISO date: "YYYY-MM-DD"
  adopterId: number;
  entityId: number;
  entityType: string; // e.g. "SHELTER" | "VETERINARIAN"
}

export interface ReviewDetailDTO extends ReviewDTO {
  author?: {
    id: number;
    name: string;
    email: string;
  };
}
