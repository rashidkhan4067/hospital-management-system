import api from '@/core/api/apiClient';

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
  
  // Optional: If you have a backend endpoint to invalidate tokens
  // return api.post('/auth/logout/');
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
