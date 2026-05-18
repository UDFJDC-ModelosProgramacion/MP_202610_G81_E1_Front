import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LandingPage } from '../../src/pages/LandingPage';
import { BrowserRouter } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as any),
    useNavigate: () => vi.fn(),
  };
});

describe('LandingPage', () => {
  it('renders page title', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Pet Adoption System')).toBeInTheDocument();
  });

  it('renders all module cards', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Módulo de Mascotas (HU01)')).toBeInTheDocument();
    expect(screen.getByText('Registro de Refugios (HU03)')).toBeInTheDocument();
    expect(screen.getByText('Registro de Adoptante (HU24)')).toBeInTheDocument();
    expect(screen.getByText('Registrar Adopción (HU28)')).toBeInTheDocument();
    expect(screen.getByText('Actualizar Convivencia (HU30)')).toBeInTheDocument();
    expect(screen.getByText('Consulta de Veterinarios')).toBeInTheDocument();
  });

  it('renders module descriptions', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Gestión y visualización de mascotas/)).toBeInTheDocument();
  });

  it('renders Disponible badges for active modules', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    const badges = screen.getAllByText('Disponible');
    expect(badges.length).toBe(6);
  });
});
