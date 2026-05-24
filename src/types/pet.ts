export interface PetDTO {
  id?: number;
  name: string;
  species: string;
  breed: string;
  sex: string;
  size: string;
  age?: number;
  description?: string;
  photos?: string;
  status?: string;
  temperament?: string;
  specialNeeds?: string;
  activityLevel?: string;
  origin?: string;
  goodWithKids?: boolean;
  goodWithPets?: boolean;
  spaceRequired?: string;
  shelter?: {
    name: string | null;
  };
}
