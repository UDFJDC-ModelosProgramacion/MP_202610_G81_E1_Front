import axios from 'axios';
import { type NotificationDTO, type NotificationDetailDTO } from '../types/notification';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_URL = `${BASE_URL}/notifications`;

/**
 * Obtiene todas las notificaciones del usuario autenticado.
 * GET /notifications
 * HU16 — Ver Notificación
 */
export const getAllNotifications = async (): Promise<NotificationDTO[]> => {
  const response = await axios.get<NotificationDTO[]>(API_URL);
  return response.data;
};

/**
 * Obtiene una notificación por ID con detalles.
 * GET /notifications/{id}
 */
export const getNotificationById = async (id: number): Promise<NotificationDetailDTO> => {
  const response = await axios.get<NotificationDetailDTO>(`${API_URL}/${id}`);
  return response.data;
};

/**
 * Marca una notificación como leída.
 * PUT /notifications/{id}
 * HU17 — Marcar Notificación como Leída
 */
export const markNotificationAsRead = async (id: number): Promise<NotificationDTO> => {
  const response = await axios.put<NotificationDTO>(`${API_URL}/${id}`, { isRead: true });
  return response.data;
};

/**
 * Elimina una notificación.
 * DELETE /notifications/{id}
 * HU18 — Eliminar Notificación
 */
export const deleteNotification = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
