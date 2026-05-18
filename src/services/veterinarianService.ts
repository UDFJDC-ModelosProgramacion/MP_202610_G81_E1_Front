import axios from 'axios';
import { type VeterinarianDetailDTO } from '../types/veterinarian';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_URL = `${BASE_URL}/veterinarians`;

export const getVeterinarians = async (): Promise<VeterinarianDetailDTO[]> => {
  const response = await axios.get<VeterinarianDetailDTO[]>(API_URL);
  return response.data;
};

export const getVeterinarianById = async (id: number): Promise<VeterinarianDetailDTO> => {
  const response = await axios.get<VeterinarianDetailDTO>(`${API_URL}/${id}`);
  return response.data;
};
