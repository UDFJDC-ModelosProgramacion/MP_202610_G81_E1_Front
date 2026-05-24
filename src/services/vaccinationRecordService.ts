import axios from 'axios';
import { type VaccinationRecordDTO, type CreateVaccinationRecordDTO } from '../types/vaccinationRecord';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8999/api';
const API_URL = `${BASE_URL}/vaccination-records`;

export const getVaccinationRecords = async (): Promise<VaccinationRecordDTO[]> => {
  const response = await axios.get<VaccinationRecordDTO[]>(API_URL);
  return response.data;
};

export const createVaccinationRecord = async (record: CreateVaccinationRecordDTO): Promise<VaccinationRecordDTO> => {
  const response = await axios.post<VaccinationRecordDTO>(API_URL, record);
  return response.data;
};

export const updateVaccinationRecord = async (id: number, record: CreateVaccinationRecordDTO): Promise<VaccinationRecordDTO> => {
  const response = await axios.put<VaccinationRecordDTO>(`${API_URL}/${id}`, record);
  return response.data;
};

export const deleteVaccinationRecord = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
