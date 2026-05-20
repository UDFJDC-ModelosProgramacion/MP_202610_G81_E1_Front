import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TestLandingPage } from '../../src/pages/TestLandingPage';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate,
  };
});

describe('TestLandingPage', () => {
  it('renders page title', () => {
    render(
      <BrowserRouter>
        <TestLandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Developer Test Environment')).toBeInTheDocument();
  });

  it('renders all module cards', () => {
    render(
      <BrowserRouter>
        <TestLandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Módulo de Mascotas (HU01)')).toBeInTheDocument();
    expect(screen.getByText('Registro de Refugios (HU03)')).toBeInTheDocument();
    expect(screen.getByText('Registro de Adoptante (HU24)')).toBeInTheDocument();
    expect(screen.getByText('Registrar Adopción (HU28)')).toBeInTheDocument();
    expect(screen.getByText('Actualizar Convivencia (HU30)')).toBeInTheDocument();
    expect(screen.getByText('Consulta de Veterinarios (HU04)')).toBeInTheDocument();
    expect(screen.getByText('Centro de Notificaciones (HU16-18)')).toBeInTheDocument();
    expect(screen.getByText('Mensajería (HU19)')).toBeInTheDocument();
    expect(screen.getByText('Gestión de Reseñas (HU20-22)')).toBeInTheDocument();
    expect(screen.getByText('Eventos de Refugio (HU23)')).toBeInTheDocument();
    expect(screen.getByText('Catálogo y Control de Vacunas (HU07, HU10, HU14)')).toBeInTheDocument();
    expect(screen.getByText('Historias Clínicas e Historial (HU08, HU11, HU15)')).toBeInTheDocument();
    expect(screen.getByText('Eventos Médicos (HU09, HU12)')).toBeInTheDocument();
    expect(screen.getByText('Administración Crítica (HU13)')).toBeInTheDocument();

  });

  it('renders module descriptions', () => {
    render(
      <BrowserRouter>
        <TestLandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Gestión y visualización de mascotas/)).toBeInTheDocument();
  });

  it('renders Disponible badges for active modules', () => {
    render(
      <BrowserRouter>
        <TestLandingPage />
      </BrowserRouter>
    );
    const badges = screen.getAllByText('Disponible');
    expect(badges.length).toBe(14);
  });

  it('navigates to module path when clicked', () => {
    render(
      <BrowserRouter>
        <TestLandingPage />
      </BrowserRouter>
    );
    const petModule = screen.getByText('Módulo de Mascotas (HU01)');
    fireEvent.click(petModule);
    expect(mockNavigate).toHaveBeenCalledWith('/pets');
  });
});
