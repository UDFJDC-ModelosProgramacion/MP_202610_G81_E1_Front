import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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
});
