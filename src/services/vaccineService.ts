import axios from 'axios';
import { type VaccineDTO, type CreateVaccineDTO } from '../types/vaccine';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8999/api';
const API_URL = `${BASE_URL}/vaccines`;

export const getVaccines = async (): Promise<VaccineDTO[]> => {
  const response = await axios.get<VaccineDTO[]>(API_URL);
  return response.data;
};

export const createVaccine = async (vaccine: CreateVaccineDTO): Promise<VaccineDTO> => {
  const response = await axios.post<VaccineDTO>(API_URL, vaccine);
  return response.data;
};

export const updateVaccine = async (id: number, vaccine: CreateVaccineDTO): Promise<VaccineDTO> => {
  const response = await axios.put<VaccineDTO>(`${API_URL}/${id}`, vaccine);
  return response.data;
};
