// src/types/pet.ts

export interface PetDTO {
  id: number;
  name: string;
  breed: string;
  age: number;
  photos: string; 
  status: string;
  species: string;
  shelter?: {
    name: string | null;
  };
}
