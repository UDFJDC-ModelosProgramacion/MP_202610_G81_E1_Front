import axios from 'axios';
import { type AdoptionDTO, type AdoptionDetailDTO } from '../types/adoption';
 
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_URL = `${BASE_URL}/adoptions`;
 
/**
 * Registra una nueva adopción formal.
 * POST /adoptions
 */
export const registerAdoption = async (adoptionData: Omit<AdoptionDTO, 'id'>): Promise<AdoptionDTO> => {
  const response = await axios.post<AdoptionDTO>(API_URL, adoptionData);
  return response.data;
};
 
/**
 * Obtiene todas las adopciones.
 * GET /adoptions
 */
export const getAllAdoptions = async (): Promise<AdoptionDTO[]> => {
  const response = await axios.get<AdoptionDTO[]>(API_URL);
  return response.data;
};
 
/**
 * Obtiene una adopción por ID con todos sus detalles.
 * GET /adoptions/{id}
 */
export const getAdoptionById = async (id: number): Promise<AdoptionDetailDTO> => {
  const response = await axios.get<AdoptionDetailDTO>(`${API_URL}/${id}`);
  return response.data;
};