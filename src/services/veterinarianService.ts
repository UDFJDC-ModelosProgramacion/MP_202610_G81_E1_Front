import axios from 'axios';
import type {
  VeterinarianDTO,
  VeterinarianDetailDTO,
  VaccineDTO,
  MedicalEventDTO,
  MedicalHistoryDTO,
  MedicalHistoryDetailDTO,
  VaccinationReportDTO
} from '../types/veterinarian';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_URL = `${BASE_URL}/veterinarians`;

export const registerVeterinarian = async (data: Omit<VeterinarianDTO, 'id'>): Promise<VeterinarianDTO> => {
  const response = await axios.post<VeterinarianDTO>(API_URL, data);
  return response.data;
};

export const getVeterinarians = async (): Promise<VeterinarianDetailDTO[]> => {
  const response = await axios.get<VeterinarianDetailDTO[]>(API_URL);
  return response.data;
};

export const getVeterinarianById = async (id: number): Promise<VeterinarianDetailDTO> => {
  const response = await axios.get<VeterinarianDetailDTO>(`${API_URL}/${id}`);
  return response.data;
};

export const registerVaccine = async (vaccineData: Omit<VaccineDTO, 'id'>): Promise<VaccineDTO> => {
  const response = await axios.post<VaccineDTO>(`${BASE_URL}/vaccines`, vaccineData);
  return response.data;
};

export const getAllVaccines = async (): Promise<VaccineDTO[]> => {
  const response = await axios.get<VaccineDTO[]>(`${BASE_URL}/vaccines`);
  return response.data;
};

export const createMedicalHistory = async (historyData: MedicalHistoryDTO): Promise<MedicalHistoryDTO> => {
  const response = await axios.post<MedicalHistoryDTO>(`${BASE_URL}/medical-histories`, historyData);
  return response.data;
};

export const getMedicalHistoryByPetId = async (petId: number): Promise<MedicalHistoryDetailDTO> => {
  const response = await axios.get<MedicalHistoryDetailDTO>(`${BASE_URL}/medical-histories/pet/${petId}`);
  return response.data;
};

export const registerMedicalEvent = async (eventData: Omit<MedicalEventDTO, 'id'>): Promise<MedicalEventDTO> => {
  const response = await axios.post<MedicalEventDTO>(`${BASE_URL}/medical-events`, eventData);
  return response.data;
};

export const updateMedicalEvent = async (id: number, data: { description: string }): Promise<MedicalEventDTO> => {
  const response = await axios.put<MedicalEventDTO>(`${BASE_URL}/medical-events/${id}`, data);
  return response.data;
};

export const registerVaccinationReport = async (reportData: Omit<VaccinationReportDTO, 'id'>): Promise<VaccinationReportDTO> => {
  const response = await axios.post<VaccinationReportDTO>(`${BASE_URL}/vaccination-reports`, reportData);
  return response.data;
};

export const deleteVaccinationReport = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/vaccination-reports/${id}`);
};