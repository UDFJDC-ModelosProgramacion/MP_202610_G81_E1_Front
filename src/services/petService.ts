import axios from 'axios';
import { type PetDTO } from '../types/pet'; 

const API_URL = 'http://localhost:8999/api/pets';

export const getAvailablePets = async (): Promise<PetDTO[]> => {
  const response = await axios.get<PetDTO[]>(API_URL);
  return response.data;
};;
