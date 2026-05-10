import axios from 'axios';
import { type ShelterDTO } from '../types/shelter';

const API_URL = 'http://localhost:8999/api/shelters';

export const registerShelter = async (shelterData: Omit<ShelterDTO, 'id'>): Promise<ShelterDTO> => {
  const response = await axios.post<ShelterDTO>(API_URL, shelterData);
  return response.data;
};

