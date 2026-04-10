import api from '@/core/api/services/apiClient';

export const login = async (credentials) => {
  const response = await api.post('auth/login/', credentials);
  if (response.data.access) {
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('auth/register/', userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) throw new Error('No refresh token');
  
  const response = await api.post('auth/refresh/', { refresh });
  if (response.data.access) {
    localStorage.setItem('accessToken', response.data.access);
  }
  return response.data;
};

/**
 * 🛰️ Google Authentication Endpoint
 * Sends the access token from Google to the backend.
 */
export const googleLogin = async (token) => {
  const response = await api.post('auth/google/', { access_token: token });
  if (response.data.access) {
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
  }
  return response.data;
};

/**
 * 🪄 Magic Link Authentication Endpoints
 */
export const sendMagicLink = async (email) => {
  const response = await api.post('auth/magic-link/send/', { email });
  return response.data;
};

export const verifyMagicLink = async (token) => {
  const response = await api.post('auth/magic-link/verify/', { token });
  if (response.data.access) {
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
  }
  return response.data;
};


