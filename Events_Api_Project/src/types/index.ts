export interface Event {
  id: string;
  title: string;
  name?: string;
  description: string;
  date: string;
  location: string;
  image?: string;
}

export interface EventFormData {
  name: string;
  description: string;
  date: string;
  location: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  token?: string;
  message?: string;
  error?: string;
}

export interface ApiError {
  message?: string;
  error?: string;
}
