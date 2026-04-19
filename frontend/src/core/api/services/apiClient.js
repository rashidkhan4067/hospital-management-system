import axios from 'axios';
import { 
  getAccessToken, 
  getRefreshToken, 
  setAccessToken, 
  clearAuthSession 
} from '@/core/auth/authUtils';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let onTokenRefreshed = null;
export const setOnTokenRefreshed = (fn) => {
  onTokenRefreshed = fn;
};

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Expired Tokens)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) {
          clearAuthSession();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Silent refresh attempt using clean axios instance
        const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh/`, { 
          refresh: refreshToken 
        });

        const newAccessToken = refreshResponse.data.access;
        const newRefreshToken = refreshResponse.data.refresh || refreshToken;
        
        setAccessToken(newAccessToken);
        if (onTokenRefreshed) onTokenRefreshed(newAccessToken, newRefreshToken);

        // Retry original request with fresh token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshError) {    
        clearAuthSession();
        if (onTokenRefreshed) onTokenRefreshed(null, null);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
