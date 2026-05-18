import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShelterRegistrationPage } from '../../src/pages/ShelterRegistrationPage';
import * as shelterService from '../../src/services/shelterService';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../src/services/shelterService');

const mockRender = () => render(
  <BrowserRouter>
    <ShelterRegistrationPage />
  </BrowserRouter>
);

describe('ShelterRegistrationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page title', () => {
    mockRender();
    expect(screen.getByText('Add New Shelter Profile')).toBeInTheDocument();
  });

  it('renders form fields', () => {
    mockRender();
    expect(screen.getByLabelText(/Shelter Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Official Email/i)).toBeInTheDocument();
  });

  it('shows validation error for empty name on blur', async () => {
    vi.mocked(shelterService.checkShelterNameExists).mockResolvedValue(false);
    mockRender();
    
    const nameInput = screen.getByLabelText(/Shelter Name/i);
    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);
    
    await waitFor(() => {
      expect(screen.getByText('Shelter name is required')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    mockRender();
    
    const emailInput = screen.getByLabelText(/Official Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('shows success dialog on successful submission', async () => {
    vi.mocked(shelterService.registerShelter).mockResolvedValue({} as any);
    vi.mocked(shelterService.checkShelterNameExists).mockResolvedValue(false);
    vi.mocked(shelterService.checkShelterEmailExists).mockResolvedValue(false);
    mockRender();
    
    fireEvent.change(screen.getByLabelText(/Shelter Name/i), { target: { value: 'Test Shelter' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Bogotá' } });
    fireEvent.change(screen.getByLabelText(/Official Email/i), { target: { value: 'test@example.com' } });
    
    fireEvent.blur(screen.getByLabelText(/Shelter Name/i));
    fireEvent.blur(screen.getByLabelText(/Official Email/i));
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Shelter')).toBeInTheDocument();
    });
  });

  it('shows character counter for description', () => {
    mockRender();
    expect(screen.getByText('0/500')).toBeInTheDocument();
  });
});
