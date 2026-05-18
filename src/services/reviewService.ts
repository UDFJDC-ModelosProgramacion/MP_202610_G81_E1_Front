import axios from 'axios';
import { type ReviewDTO, type ReviewDetailDTO } from '../types/review';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_URL = `${BASE_URL}/reviews`;

/**
 * Crea una reseña.
 * POST /reviews
 * HU20 — Crear Reseña
 */
export const createReview = async (reviewData: Omit<ReviewDTO, 'id'>): Promise<ReviewDTO> => {
  const response = await axios.post<ReviewDTO>(API_URL, reviewData);
  return response.data;
};

/**
 * Obtiene todas las reseñas, con filtro opcional por entidad.
 * GET /reviews
 * HU21 — Ver Reseñas
 */
export const getAllReviews = async (entityId?: number, entityType?: string): Promise<ReviewDTO[]> => {
  const params: Record<string, string | number> = {};
  if (entityId !== undefined) params.entityId = entityId;
  if (entityType !== undefined) params.entityType = entityType;
  const response = await axios.get<ReviewDTO[]>(API_URL, { params });
  return response.data;
};

/**
 * Obtiene una reseña por ID con detalles.
 * GET /reviews/{id}
 */
export const getReviewById = async (id: number): Promise<ReviewDetailDTO> => {
  const response = await axios.get<ReviewDetailDTO>(`${API_URL}/${id}`);
  return response.data;
};

/**
 * Elimina una reseña (solo administrador).
 * DELETE /reviews/{id}
 * HU22 — Eliminar Reseña
 */
export const deleteReview = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
