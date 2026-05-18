import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdoptionRegistrationForm } from '../../../../src/features/adoption/components/AdoptionRegistrationForm';
import * as adoptionService from '../../../../src/services/adoptionService';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../src/services/adoptionService');

const mockRender = () => render(
  <BrowserRouter>
    <AdoptionRegistrationForm />
  </BrowserRouter>
);

describe('AdoptionRegistrationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
    fireEvent.focus(adopterIdInput);
    fireEvent.blur(adopterIdInput);
    
    await waitFor(() => {
      expect(screen.getByText(/A valid adopter ID is required/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid pet ID', async () => {
    mockRender();
    const petIdInput = screen.getByLabelText(/Pet ID/i);
    fireEvent.focus(petIdInput);
    fireEvent.blur(petIdInput);
    
    await waitFor(() => {
      expect(screen.getByText(/A valid pet ID is required/i)).toBeInTheDocument();
    });
  });
});
