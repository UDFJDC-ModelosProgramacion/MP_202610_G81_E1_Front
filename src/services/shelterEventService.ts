import axios from 'axios';
import { type ShelterEventDTO, type ShelterEventDetailDTO } from '../types/shelterEvent';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_URL = `${BASE_URL}/shelter-events`;

/**
 * Registra un nuevo evento de refugio.
 * POST /shelter-events
 * HU23 — Registrar Evento de Refugio
 */
export const createShelterEvent = async (eventData: Omit<ShelterEventDTO, 'id'>): Promise<ShelterEventDTO> => {
  const response = await axios.post<ShelterEventDTO>(API_URL, eventData);
  return response.data;
};

/**
 * Obtiene todos los eventos de refugio.
 * GET /shelter-events
 */
export const getAllShelterEvents = async (): Promise<ShelterEventDTO[]> => {
  const response = await axios.get<ShelterEventDTO[]>(API_URL);
  return response.data;
};

/**
 * Obtiene un evento de refugio por ID con detalles.
 * GET /shelter-events/{id}
 */
export const getShelterEventById = async (id: number): Promise<ShelterEventDetailDTO> => {
  const response = await axios.get<ShelterEventDetailDTO>(`${API_URL}/${id}`);
  return response.data;
};
