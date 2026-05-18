import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShelterRegistrationPage } from '../../src/pages/ShelterRegistrationPage';
import * as shelterService from '../../src/services/shelterService';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../src/services/shelterService');

const mockRender = () => render(
  <BrowserRouter>
    <ShelterRegistrationPage />
  </BrowserRouter>
);

describe('ShelterRegistrationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.history.back = vi.fn();
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

  it('shows validation error if name already exists', async () => {
    vi.mocked(shelterService.checkShelterNameExists).mockResolvedValue(true);
    mockRender();
    
    const nameInput = screen.getByLabelText(/Shelter Name/i);
    fireEvent.change(nameInput, { target: { value: 'Existing Shelter' } });
    fireEvent.blur(nameInput);
    
    await waitFor(() => {
      expect(screen.getByText(/This shelter name already exists/i)).toBeInTheDocument();
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

  it('shows validation error if email already exists', async () => {
    vi.mocked(shelterService.checkShelterEmailExists).mockResolvedValue(true);
    mockRender();
    
    const emailInput = screen.getByLabelText(/Official Email/i);
    fireEvent.change(emailInput, { target: { value: 'existing@email.com' } });
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText(/This shelter email already exists/i)).toBeInTheDocument();
    });
  });

  it('submits successfully and shows success dialog', async () => {
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

    fireEvent.click(screen.getByText('Create Shelter'));

    await waitFor(() => {
      expect(screen.getByText(/Shelter Created Successfully!/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Accept'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('shows error dialog on submission failure', async () => {
    vi.mocked(shelterService.registerShelter).mockRejectedValue({
      response: { data: { message: 'Registration failed' } }
    });
    vi.mocked(shelterService.checkShelterNameExists).mockResolvedValue(false);
    vi.mocked(shelterService.checkShelterEmailExists).mockResolvedValue(false);
    mockRender();
    
    fireEvent.change(screen.getByLabelText(/Shelter Name/i), { target: { value: 'Test Shelter' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Bogotá' } });
    fireEvent.change(screen.getByLabelText(/Official Email/i), { target: { value: 'test@example.com' } });
    
    fireEvent.click(screen.getByText('Create Shelter'));
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to register shelter/i)).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Accept'));
    expect(screen.queryByText(/Failed to register shelter/i)).not.toBeInTheDocument();
  });

  it('shows character counter for description', () => {
    mockRender();
    const descriptionInput = screen.getByLabelText(/About the Shelter/i);
    fireEvent.change(descriptionInput, { target: { value: 'A' } });
    expect(screen.getByText('1/500')).toBeInTheDocument();
  });

  it('calls history.back on cancel', () => {
    mockRender();
    fireEvent.click(screen.getByText('Cancel'));
    expect(globalThis.history.back).toHaveBeenCalled();
  });
});
