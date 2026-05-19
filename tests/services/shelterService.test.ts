import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { registerShelter, checkShelterNameExists, checkShelterEmailExists } from '../../src/services/shelterService';

vi.mock('axios');

describe('shelterService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('registerShelter should call POST correctly', async () => {
    const mockShelter = { id: 1, name: 'Test Shelter' };
    (axios.post as any).mockResolvedValue({ data: mockShelter });
    
    const result = await registerShelter({ name: 'Test Shelter' } as any);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockShelter);
  });

  it('checkShelterNameExists should return true if exists', async () => {
    (axios.get as any).mockResolvedValue({ data: { exists: true } });
    
    const result = await checkShelterNameExists('Test');
    expect(result).toBe(true);
  });

  it('checkShelterNameExists should return false if not exists', async () => {
    (axios.get as any).mockResolvedValue({ data: { exists: false } });
    
    const result = await checkShelterNameExists('Test');
    expect(result).toBe(false);
  });

  it('checkShelterNameExists should return false on error', async () => {
    (axios.get as any).mockRejectedValue(new Error('Network error'));
    
    const result = await checkShelterNameExists('Test');
    expect(result).toBe(false);
  });

  it('checkShelterEmailExists should return true if exists', async () => {
    (axios.get as any).mockResolvedValue({ data: { exists: true } });
    
    const result = await checkShelterEmailExists('test@example.com');
    expect(result).toBe(true);
  });

  it('checkShelterEmailExists should return false if not exists', async () => {
    (axios.get as any).mockResolvedValue({ data: { exists: false } });
    
    const result = await checkShelterEmailExists('test@example.com');
    expect(result).toBe(false);
  });

  it('checkShelterEmailExists should return false on error', async () => {
    (axios.get as any).mockRejectedValue(new Error('Network error'));
    
    const result = await checkShelterEmailExists('test@example.com');
    expect(result).toBe(false);
  });
});
