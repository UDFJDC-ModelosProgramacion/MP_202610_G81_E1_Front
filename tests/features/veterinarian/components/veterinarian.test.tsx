import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
// IMPORTANTE: Esto repara los errores de 'toBeInTheDocument'
import '@testing-library/jest-dom'; 

import { MedicalHistorySection } from '../../../../src/features/veterinarian/components/MedicalHistorySection';
import * as service from '../../../../src/services/veterinarianService';

vi.mock('../../../../../src/services/veterinarianService');

describe('Pruebas de Componente - UI de Gestión Médica', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('HU08 - Debe renderizar el botón de apertura si el servicio responde con error 404', async () => {
    vi.spyOn(service, 'getMedicalHistoryByPetId').mockRejectedValueOnce(new Error('Not Found'));

    render(<MedicalHistorySection petId={3} />);

    const emptyState = await screen.findByTestId('empty-state');
    expect(emptyState).toBeInTheDocument();
    expect(screen.getByText(/Aperturar Historia Clínica/i)).toBeInTheDocument();
  });

  test('HU11 - Debe pintar el listado de eventos médicos si la mascota tiene expediente activo', async () => {
    vi.spyOn(service, 'getMedicalHistoryByPetId').mockResolvedValueOnce({
      id: 200,
      petId: 3,
      events: [{ id: 1, eventDate: '2026-05-19', description: 'Limpieza dental profiláctica.', medicalHistoryId: 200 }],
      vaccinationReports: []
    });
    vi.spyOn(service, 'getAllVaccines').mockResolvedValueOnce([]);

    render(<MedicalHistorySection petId={3} />);

    const dashboard = await screen.findByTestId('clinical-dashboard');
    expect(dashboard).toBeInTheDocument();
    expect(screen.getByText('Limpieza dental profiláctica.')).toBeInTheDocument();
  });
});