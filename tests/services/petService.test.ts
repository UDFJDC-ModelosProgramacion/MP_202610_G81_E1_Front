import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getAvailablePets } from '../../src/services/petService';

vi.mock('axios');

describe('petService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAvailablePets should call GET correctly with default status', async () => {
    const mockPets = [{ id: 1, name: 'Dog' }];
    (axios.get as any).mockResolvedValue({ data: mockPets });
    
    const result = await getAvailablePets();
    expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
      params: { status: 'AVAILABLE' }
    });
    expect(result).toEqual(mockPets);
  });

  it('getAvailablePets should pass filters to API', async () => {
    const mockPets = [{ id: 1, name: 'Dog' }];
    (axios.get as any).mockResolvedValue({ data: mockPets });
    
    const result = await getAvailablePets({ species: 'dog', size: 'large' });
    expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
      params: { status: 'AVAILABLE', species: 'dog', size: 'large' }
    });
    expect(result).toEqual(mockPets);
  });
});
