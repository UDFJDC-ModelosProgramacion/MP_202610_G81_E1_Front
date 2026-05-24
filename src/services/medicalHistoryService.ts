import axios from 'axios';
import { type MedicalHistoryDTO, type CreateMedicalHistoryDTO } from '../types/medicalHistory';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8999/api';
const API_URL = `${BASE_URL}/medical-histories`;

export const getMedicalHistories = async (): Promise<MedicalHistoryDTO[]> => {
  const response = await axios.get<MedicalHistoryDTO[]>(API_URL);
  return response.data;
};

export const createMedicalHistory = async (history: CreateMedicalHistoryDTO): Promise<MedicalHistoryDTO> => {
  const response = await axios.post<MedicalHistoryDTO>(API_URL, history);
  return response.data;
};

export const updateMedicalHistory = async (id: number, history: CreateMedicalHistoryDTO): Promise<MedicalHistoryDTO> => {
  const response = await axios.put<MedicalHistoryDTO>(`${API_URL}/${id}`, history);
  return response.data;
};

export const deleteMedicalHistory = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
