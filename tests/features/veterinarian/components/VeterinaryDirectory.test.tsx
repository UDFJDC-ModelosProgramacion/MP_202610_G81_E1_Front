import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { VeterinaryDirectory } from '../../../../src/features/veterinarian/components/VeterinaryDirectory';
import * as vetService from '../../../../src/services/veterinarianService';

vi.mock('../../../../src/services/veterinarianService');

describe('VeterinaryDirectory Component', () => {
  it('should render loading state initially', () => {
    vi.mocked(vetService.getVeterinarians).mockReturnValue(new Promise(() => {}));
    render(<VeterinaryDirectory selectedSpecialty="all" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render veterinarians list after loading', async () => {
    const mockVets = [
      { id: 1, name: 'Dr. Test', specialty: 'Surgery', availability: 'Mon-Fri', phone: '123', email: 'test@test.com' }
    ];
    vi.mocked(vetService.getVeterinarians).mockResolvedValue(mockVets as any);

    render(<VeterinaryDirectory selectedSpecialty="all" />);

    await waitFor(() => {
      expect(screen.getByText('Dr. Test')).toBeInTheDocument();
    });
  });

  it('should render error state when API fails', async () => {
    vi.mocked(vetService.getVeterinarians).mockRejectedValue(new Error('API Error'));

    render(<VeterinaryDirectory selectedSpecialty="all" />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load veterinarians/i)).toBeInTheDocument();
    });
  });

  it('should filter veterinarians by search query', async () => {
    const mockVets = [
      { id: 1, name: 'Dr. Andrea', specialty: 'Pediatrics', availability: 'Mon-Fri', phone: '123', email: 'a@a.com' },
      { id: 2, name: 'Dr. Carlos', specialty: 'Surgery', availability: 'Mon-Sat', phone: '456', email: 'c@c.com' }
    ];
    vi.mocked(vetService.getVeterinarians).mockResolvedValue(mockVets as any);

    render(<VeterinaryDirectory selectedSpecialty="all" />);
    
    await waitFor(() => {
      expect(screen.getByText('Dr. Andrea')).toBeInTheDocument();
      expect(screen.getByText('Dr. Carlos')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/Search by specialty or name/i);
    fireEvent.change(searchInput, { target: { value: 'Andrea' } });

    expect(screen.getByText('Dr. Andrea')).toBeInTheDocument();
    expect(screen.queryByText('Dr. Carlos')).not.toBeInTheDocument();
  });

  it('should show "No veterinarians found" message when filter returns empty results', async () => {
    const mockVets = [
      { id: 1, name: 'Dr. Andrea', specialty: 'Pediatrics', availability: 'Mon-Fri', phone: '123', email: 'a@a.com' }
    ];
    vi.mocked(vetService.getVeterinarians).mockResolvedValue(mockVets as any);

    render(<VeterinaryDirectory selectedSpecialty="Surgery" />);
    
    await waitFor(() => {
      expect(screen.getByText(/No veterinarians found matching your criteria/i)).toBeInTheDocument();
    });
  });

  it('should filter by specialty prop correctly', async () => {
    const mockVets = [
      { id: 1, name: 'Dr. Andrea', specialty: 'Pediatrics', availability: 'Mon-Fri', phone: '123', email: 'a@a.com' },
      { id: 2, name: 'Dr. Carlos', specialty: 'Surgery', availability: 'Mon-Sat', phone: '456', email: 'c@c.com' }
    ];
    vi.mocked(vetService.getVeterinarians).mockResolvedValue(mockVets as any);

    render(<VeterinaryDirectory selectedSpecialty="Surgery" />);
    
    await waitFor(() => {
      expect(screen.getByText('Dr. Carlos')).toBeInTheDocument();
      expect(screen.queryByText('Dr. Andrea')).not.toBeInTheDocument();
    });
  });
});
