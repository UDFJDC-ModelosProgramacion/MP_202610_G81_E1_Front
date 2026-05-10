import axios from 'axios';
import { type ShelterDTO } from '../types/shelter';

const API_URL = 'http://localhost:8999/api/shelters';

export const registerShelter = async (shelterData: Omit<ShelterDTO, 'id'>): Promise<ShelterDTO> => {
  const response = await axios.post<ShelterDTO>(API_URL, shelterData);
  return response.data;
};

export const checkShelterNameExists = async (name: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/check-name?name=${name}`);
    return response.data.exists;
  } catch (error) {
    console.error('Error checking shelter name existence:', error);
    return false; // Assume not exists on error to allow submission
  }
};

export const checkShelterEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/check-email?email=${email}`);
    return response.data.exists;
  } catch (error) {
    console.error('Error checking shelter email existence:', error);
    return false; // Assume not exists on error to allow submission
  }
};


