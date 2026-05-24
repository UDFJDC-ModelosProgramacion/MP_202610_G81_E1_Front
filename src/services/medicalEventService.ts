import axios from 'axios';
import { type MedicalEventDetailDTO, type CreateMedicalEventDTO } from '../types/medicalEvent';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8999/api';
const API_URL = `${BASE_URL}/medical-events`;

export const getMedicalEvents = async (): Promise<MedicalEventDetailDTO[]> => {
  const response = await axios.get<MedicalEventDetailDTO[]>(API_URL);
  return response.data;
};

export const createMedicalEvent = async (event: CreateMedicalEventDTO): Promise<MedicalEventDetailDTO> => {
  const response = await axios.post<MedicalEventDetailDTO>(API_URL, event);
  return response.data;
};

export const updateMedicalEvent = async (id: number, event: CreateMedicalEventDTO): Promise<MedicalEventDetailDTO> => {
  const response = await axios.put<MedicalEventDetailDTO>(`${API_URL}/${id}`, event);
  return response.data;
};

export const deleteMedicalEvent = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
