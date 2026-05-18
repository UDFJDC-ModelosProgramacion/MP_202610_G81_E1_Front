import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { getVeterinarians, getVeterinarianById } from '../src/services/veterinarianService';

vi.mock('axios');

describe('veterinarianService', () => {
  it('should fetch all veterinarians', async () => {
    const mockVets = [
      { id: 1, name: 'Dr. Test', specialty: 'General', availability: 'Mon-Fri', phone: '123', email: 'test@test.com' }
    ];
    vi.mocked(axios.get).mockResolvedValue({ data: mockVets });

    const result = await getVeterinarians();
    expect(result).toEqual(mockVets);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/veterinarians'));
  });

  it('should fetch veterinarian by id', async () => {
    const mockVet = { id: 1, name: 'Dr. Test', specialty: 'General', availability: 'Mon-Fri', phone: '123', email: 'test@test.com' };
    vi.mocked(axios.get).mockResolvedValue({ data: mockVet });

    const result = await getVeterinarianById(1);
    expect(result).toEqual(mockVet);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/veterinarians/1'));
  });
});
