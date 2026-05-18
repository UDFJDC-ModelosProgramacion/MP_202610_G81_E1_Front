import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getAllTrialCohabitations, getTrialCohabitationById, updateTrialCohabitation } from '../../src/services/trialCohabitationService';

vi.mock('axios');

describe('trialCohabitationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAllTrialCohabitations should call GET correctly', async () => {
    const mockData = [{ id: 1, status: 'PENDIENTE' }];
    (axios.get as any).mockResolvedValue({ data: mockData });
    
    const result = await getAllTrialCohabitations();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
  });

  it('getTrialCohabitationById should call GET with ID correctly', async () => {
    const mockData = { id: 1, status: 'PENDIENTE' };
    (axios.get as any).mockResolvedValue({ data: mockData });
    
    const result = await getTrialCohabitationById(1);
    expect(result).toEqual(mockData);
  });

  it('updateTrialCohabitation should call PUT correctly', async () => {
    const mockData = { id: 1, status: 'EXITOSA' };
    (axios.put as any).mockResolvedValue({ data: mockData });
    
    const result = await updateTrialCohabitation(1, mockData as any);
    expect(axios.put).toHaveBeenCalledWith(expect.stringContaining1'), mockData);
    expect(result).toEqual(mockData);
  });
});
