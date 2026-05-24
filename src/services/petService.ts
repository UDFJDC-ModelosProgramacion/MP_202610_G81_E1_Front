import axios from 'axios';
import { type PetDTO } from '../types/pet'; 

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_URL = `${BASE_URL}/pets`;

export interface PetFilters {
  species?: string;
  size?: string;
  status?: string;
}

export const createPet = async (data: Omit<PetDTO, 'id'>): Promise<PetDTO> => {
  const response = await axios.post<PetDTO>(API_URL, data);
  return response.data;
};

export const getAvailablePets = async (filters?: PetFilters): Promise<PetDTO[]> => {
  // status AVAILABLE por defecto 
  const response = await axios.get<PetDTO[]>(API_URL, {
    params: {
      status: 'AVAILABLE',
      ...filters
    }
  });
  return response.data;
};;
