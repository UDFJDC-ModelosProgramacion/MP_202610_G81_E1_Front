import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { registerAdoption, getAllAdoptions, getAdoptionById } from '../../src/services/adoptionService';

vi.mock('axios');

describe('adoptionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('registerAdoption should call POST correctly', async () => {
    const mockAdoption = { id: 1, petId: 1, adopterId: 1 };
    (axios.post as any).mockResolvedValue({ data: mockAdoption });
    
    const result = await registerAdoption({ petId: 1, adopterId: 1 } as any);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockAdoption);
  });

  it('getAllAdoptions should call GET correctly', async () => {
    const mockAdoptions = [{ id: 1, petId: 1, adopterId: 1 }];
    (axios.get as any).mockResolvedValue({ data: mockAdoptions });
    
    const result = await getAllAdoptions();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockAdoptions);
  });

  it('getAdoptionById should call GET with ID correctly', async () => {
    const mockAdoption = { id: 1, petId: 1, adopterId: 1 };
    (axios.get as any).mockResolvedValue({ data: mockAdoption });
    
    const result = await getAdoptionById(1);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/1'));
    expect(result).toEqual(mockAdoption);
  });
});
