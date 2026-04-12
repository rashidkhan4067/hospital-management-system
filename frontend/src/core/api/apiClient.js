import axios from 'axios';
import { 
  getAccessToken, 
  getRefreshToken, 
  setAccessToken, 
  clearAuthSession 
} from '@/core/auth/authUtils';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        isRefreshing = false;
        clearAuthSession();
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      return new Promise(function (resolve, reject) {
        axios
          .post(`${BASE_URL}/auth/refresh/`, { refresh: refreshToken })
          .then(({ data }) => {
            setAccessToken(data.access);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            processQueue(null, data.access);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            clearAuthSession();
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
