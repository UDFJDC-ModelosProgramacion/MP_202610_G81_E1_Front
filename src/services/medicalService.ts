import type { Vaccine, MedicalEvent, MedicalHistory } from '../types/medical';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const medicalService = {
  // HU07, HU14: Obtener y crear vacunas
  getVaccines: async (): Promise<Vaccine[]> => {
    const res = await fetch(`${API_BASE_URL}/vaccines`);
    return res.json();
  },
  createVaccine: async (vaccine: Vaccine): Promise<Vaccine> => {
    const res = await fetch(`${API_BASE_URL}/vaccines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vaccine),
    });
    return res.json();
  },

  // HU09, HU12: Crear y modificar eventos médicos
  createMedicalEvent: async (event: MedicalEvent): Promise<MedicalEvent> => {
    const res = await fetch(`${API_BASE_URL}/medical-events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    return res.json();
  },

  // HU11: Obtener el historial por ID de mascota
  getMedicalHistoryByPet: async (petId: number): Promise<MedicalHistory> => {
    const res = await fetch(`${API_BASE_URL}/medical-histories/pet/${petId}`);
    if (!res.ok) throw new Error('Historial no encontrado');
    return res.json();
  }
};