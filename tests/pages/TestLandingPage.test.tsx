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
    expect(screen.getByText('Consulta de Veterinarios')).toBeInTheDocument();
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
    expect(badges.length).toBe(6);
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
