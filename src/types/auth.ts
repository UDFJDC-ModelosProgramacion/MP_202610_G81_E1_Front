export type UserRole = 'ADOPTER' | 'VETERINARIAN' | 'ADMIN';

export interface User {
  id?: number;
  name?: string;
  email: string;
  role: UserRole;
  token?: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  user: User;
  token: string;
}
