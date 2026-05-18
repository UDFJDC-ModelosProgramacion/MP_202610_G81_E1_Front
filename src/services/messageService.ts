import axios from 'axios';
import { type MessageDTO, type MessageDetailDTO } from '../types/message';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_URL = `${BASE_URL}/messages`;

/**
 * Envía un mensaje a otro usuario.
 * POST /messages
 * HU19 — Enviar Mensaje
 */
export const sendMessage = async (messageData: Omit<MessageDTO, 'id'>): Promise<MessageDTO> => {
  const response = await axios.post<MessageDTO>(API_URL, messageData);
  return response.data;
};

/**
 * Obtiene todos los mensajes.
 * GET /messages
 */
export const getAllMessages = async (): Promise<MessageDTO[]> => {
  const response = await axios.get<MessageDTO[]>(API_URL);
  return response.data;
};

/**
 * Obtiene un mensaje por ID con detalles.
 * GET /messages/{id}
 */
export const getMessageById = async (id: number): Promise<MessageDetailDTO> => {
  const response = await axios.get<MessageDetailDTO>(`${API_URL}/${id}`);
  return response.data;
};
