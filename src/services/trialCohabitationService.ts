import axios from 'axios';
import { type TrialCohabitationDTO, type TrialCohabitationDetailDTO } from '../types/trialCohabitation';
 
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_URL = `${BASE_URL}/trial-cohabitations`;
 
/**
 * Obtiene todas las convivencias de prueba.
 * GET /trial-cohabitations
 */
export const getAllTrialCohabitations = async (): Promise<TrialCohabitationDTO[]> => {
  const response = await axios.get<TrialCohabitationDTO[]>(API_URL);
  return response.data;
};
 
/**
 * Obtiene una convivencia de prueba por ID con detalles.
 * GET /trial-cohabitations/{id}
 */
export const getTrialCohabitationById = async (id: number): Promise<TrialCohabitationDetailDTO> => {
  const response = await axios.get<TrialCohabitationDetailDTO>(`${API_URL}/${id}`);
  return response.data;
};
 
/**
 * Actualiza el resultado de una convivencia de prueba.
 * PUT /trial-cohabitations/{id}
 * HU30: Actualizar resultado (EXITOSA | FALLIDA | CANCELADA)
 */
export const updateTrialCohabitation = async (
  id: number,
  trialData: TrialCohabitationDTO
): Promise<TrialCohabitationDTO> => {
  const response = await axios.put<TrialCohabitationDTO>(`${API_URL}/${id}`, trialData);
  return response.data;
};