import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { 
  getVeterinarians, 
  getVeterinarianById, 
  registerVaccine, 
  getMedicalHistoryByPetId 
} from '../../src/services/veterinarianService';

vi.mock('axios');

describe('veterinarianService', () => {
  it('should fetch all veterinarians', async () => {
    const mockVets = [{ id: 1, name: 'Dr. Test', specialty: 'General', availability: 'Mon-Fri', phone: '123', email: 'test@test.com' }];
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

  it('HU07 - should register a new vaccine successfully via POST', async () => {
    const payload = { name: 'Antirrábica', description: 'Dosis anual' };
    vi.mocked(axios.post).mockResolvedValue({ data: { id: 99, ...payload } });

    const result = await registerVaccine(payload);
    expect(result.id).toBe(99);
    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/vaccines'), payload);
  });

  it('HU11 - should get medical history by pet id', async () => {
    const mockHistory = { id: 200, petId: 3, events: [], vaccinationReports: [] };
    vi.mocked(axios.get).mockResolvedValue({ data: mockHistory });

    const result = await getMedicalHistoryByPetId(3);
    expect(result.petId).toBe(3);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/medical-histories/pet/3'));
  });
});