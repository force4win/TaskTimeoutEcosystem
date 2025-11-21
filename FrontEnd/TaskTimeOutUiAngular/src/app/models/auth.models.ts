export interface LoginCredentials {
  username: string;
  password: string;
}

export interface JwtResponse {
  accessToken: string; // Changed from 'token'
  type: string;
  id: number;
  username: string;
  roles: string[];
}
