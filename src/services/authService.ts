import axios from 'axios';
import type { LoginResponse, AuthResponse } from '../types/auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  // 1. Check for hardcoded Admin credentials
  if (email === 'admin@gmail.com' && password === 'admin') {
    return {
      user: {
        email: 'admin@gmail.com',
        role: 'ADMIN',
        name: 'Administrator'
      },
      token: 'admin-hardcoded-token'
    };
  }

  // 2. Otherwise, attempt backend authentication
  try {
    const response = await axios.post<AuthResponse>(`${BASE_URL}/auth/login`, {
      email,
      password
    });

    const { token, email: userEmail, role } = response.data;

    return {
      user: {
        email: userEmail,
        role: role,
        name: userEmail.split('@')[0] // Fallback name
      },
      token: token
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
