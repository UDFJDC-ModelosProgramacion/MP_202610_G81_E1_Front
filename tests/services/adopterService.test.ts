import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { registerAdopter, getAllAdopters, getAdopterById } from '../../src/services/adopterService';

vi.mock('axios');

describe('adopterService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('registerAdopter should call POST correctly', async () => {
    const mockAdopter = { id: 1, name: 'Test Adopter' };
    (axios.post as any).mockResolvedValue({ data: mockAdopter });
    
    const result = await registerAdopter({ name: 'Test Adopter' } as any);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockAdopter);
  });

  it('getAllAdopters should call GET correctly', async () => {
    const mockAdopters = [{ id: 1, name: 'Test Adopter' }];
    (axios.get as any).mockResolvedValue({ data: mockAdopters });
    
    const result = await getAllAdopters();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockAdopters);
  });

  it('getAdopterById should call GET with ID correctly', async () => {
    const mockAdopter = { id: 1, name: 'Test Adopter' };
    (axios.get as any).mockResolvedValue({ data: mockAdopter });
    
    const result = await getAdopterById(1);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/1'));
    expect(result).toEqual(mockAdopter);
  });
});