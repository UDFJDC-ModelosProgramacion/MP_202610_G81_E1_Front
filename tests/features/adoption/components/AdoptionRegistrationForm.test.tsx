import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdoptionRegistrationForm } from '../../../../src/features/adoption/components/AdoptionRegistrationForm';
import * as adoptionService from '../../../../src/services/adoptionService';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../../../src/services/adoptionService');

const mockRender = () => render(
  <BrowserRouter>
    <AdoptionRegistrationForm />
  </BrowserRouter>
);

describe('AdoptionRegistrationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock history.back
    globalThis.history.back = vi.fn();
  });

  it('renders form title', () => {
    mockRender();
    expect(screen.getByText('Register Formal Adoption')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    mockRender();
    expect(screen.getByLabelText(/Adoption Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Adoption Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Adopter ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pet ID/i)).toBeInTheDocument();
  });

  it('shows validation error for empty date', async () => {
    mockRender();
    const dateInput = screen.getByLabelText(/Adoption Date/i);
    fireEvent.focus(dateInput);
    fireEvent.blur(dateInput);
    
    await waitFor(() => {
      expect(screen.getByText('Adoption date is required')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid adopter ID', async () => {
    mockRender();
    const adopterIdInput = screen.getByLabelText(/Adopter ID/i);
    fireEvent.change(adopterIdInput, { target: { value: '' } });
    fireEvent.blur(adopterIdInput);
    
    await waitFor(() => {
      expect(screen.getByText(/A valid adopter ID is required/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid pet ID', async () => {
    mockRender();
    const petIdInput = screen.getByLabelText(/Pet ID/i);
    fireEvent.change(petIdInput, { target: { value: '0' } });
    fireEvent.blur(petIdInput);
    
    await waitFor(() => {
      expect(screen.getByText(/A valid pet ID is required/i)).toBeInTheDocument();
    });
  });

  it('submits successfully and shows success dialog', async () => {
    vi.mocked(adoptionService.registerAdoption).mockResolvedValue({} as any);
    mockRender();
    
    fireEvent.change(screen.getByLabelText(/Adoption Date/i), { target: { value: '2024-05-20' } });
    fireEvent.change(screen.getByLabelText(/Adopter ID/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Pet ID/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/Adoption Status/i), { target: { value: 'COMPLETED' } });
    
    fireEvent.click(screen.getByText('Register Adoption'));
    
    await waitFor(() => {
      expect(screen.getByText(/Adoption Registered Successfully!/i)).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Accept'));
    expect(globalThis.history.back).toHaveBeenCalled();
  });

  it('shows error dialog on submission failure', async () => {
    vi.mocked(adoptionService.registerAdoption).mockRejectedValue({
      response: { data: { message: 'Custom error message' } }
    });
    mockRender();
    
    fireEvent.change(screen.getByLabelText(/Adoption Date/i), { target: { value: '2024-05-20' } });
    fireEvent.change(screen.getByLabelText(/Adopter ID/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Pet ID/i), { target: { value: '5' } });
    
    fireEvent.click(screen.getByText('Register Adoption'));
    
    await waitFor(() => {
      expect(screen.getByText('Custom error message')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Accept'));
    expect(screen.queryByText('Custom error message')).not.toBeInTheDocument();
  });

  it('shows default error message on submission failure without message', async () => {
    vi.mocked(adoptionService.registerAdoption).mockRejectedValue(new Error('Generic error'));
    mockRender();
    
    fireEvent.change(screen.getByLabelText(/Adoption Date/i), { target: { value: '2024-05-20' } });
    fireEvent.change(screen.getByLabelText(/Adopter ID/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Pet ID/i), { target: { value: '5' } });
    
    fireEvent.click(screen.getByText('Register Adoption'));
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to register adoption/i)).toBeInTheDocument();
    });
  });

  it('returns early if form is invalid on submit', async () => {
    mockRender();
    fireEvent.click(screen.getByText('Register Adoption'));
    expect(adoptionService.registerAdoption).not.toHaveBeenCalled();
  });

  it('calls history.back on cancel', () => {
    mockRender();
    fireEvent.click(screen.getByText('Cancel'));
    expect(globalThis.history.back).toHaveBeenCalled();
  });
});
