import axios from 'axios';
import { type PetDTO } from '../types/pet'; 

const API_URL = 'http://localhost:8999/api/pets';

export interface PetFilters {
  species?: string;
  size?: string;
  status?: string;
}

export const getAvailablePets = async (filters?: PetFilters): Promise<PetDTO[]> => {
  // Siempre enviamos el status AVAILABLE por defecto para esta pagina
  const response = await axios.get<PetDTO[]>(API_URL, {
    params: {
      status: 'AVAILABLE',
      ...filters
    }
  });
  return response.data;
};;
