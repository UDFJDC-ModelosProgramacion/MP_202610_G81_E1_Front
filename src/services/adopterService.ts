import axios from 'axios';
import { type AdopterDTO, type AdopterDetailDTO } from '../types/adopter';
 
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_URL = `${BASE_URL}/adopters`;
 
/**
 * Registra un nuevo adoptante.
 * POST /adopters
 */
export const registerAdopter = async (adopterData: Omit<AdopterDTO, 'id'>): Promise<AdopterDTO> => {
  const response = await axios.post<AdopterDTO>(API_URL, adopterData);
  return response.data;
};
 
/**
 * Obtiene todos los adoptantes.
 * GET /adopters
 */
export const getAllAdopters = async (): Promise<AdopterDetailDTO[]> => {
  const response = await axios.get<AdopterDetailDTO[]>(API_URL);
  return response.data;
};
 
/**
 * Obtiene un adoptante por ID.
 * GET /adopters/{id}
 */
export const getAdopterById = async (id: number): Promise<AdopterDetailDTO> => {
  const response = await axios.get<AdopterDetailDTO>(`${API_URL}/${id}`);
  return response.data;
};