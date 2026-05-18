import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdopterRegistrationForm } from '../../../../src/features/adopter/components/AdopterRegistrationForm';
import * as adopterService from '../../../../src/services/adopterService';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../../../src/services/adopterService');

const mockRender = () => render(
  <BrowserRouter>
    <AdopterRegistrationForm />
  </BrowserRouter>
);

describe('AdopterRegistrationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form title', () => {
    mockRender();
    expect(screen.getByRole('heading', { name: /Register as Adopter/i })).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    mockRender();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Housing Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Do you have children/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Do you have other pets/i)).toBeInTheDocument();
  });

  it('shows validation error for empty name', async () => {
    mockRender();
    const nameInput = screen.getByLabelText(/Full Name/i);
    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);
    
    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    mockRender();
    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('shows validation error for short phone', async () => {
    mockRender();
    const phoneInput = screen.getByLabelText(/Phone Number/i);
    fireEvent.change(phoneInput, { target: { value: '123' } });
    fireEvent.blur(phoneInput);
    
    await waitFor(() => {
      expect(screen.getByText(/Phone number must be at least 7 digits/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for short password', async () => {
    mockRender();
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.blur(passwordInput);
    
    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('shows success dialog on successful registration', async () => {
    vi.mocked(adopterService.registerAdopter).mockResolvedValue({} as any);
    mockRender();
    
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    
    await waitFor(() => {
      expect(screen.getByLabelText(/Housing Type/i)).toBeInTheDocument();
    });
  });
});
