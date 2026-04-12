import { STORAGE_KEYS } from '@/core/constants';

/**
 * 🔐 Clinical Auth Utilities
 * Managed storage for tokens, roles, and user metadata.
 */

// 🟢 Single Token Accessors
export const getAccessToken = () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
export const getRefreshToken = () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

export const setAccessToken = (token) => {
  if (token) localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};

/**
 * 📦 Session Pipeline
 */
export const setAuthSession = (accessToken, refreshToken, userData) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(STORAGE_KEYS.USER_ROLE, userData?.role || 'patient');
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
};

export const clearAuthSession = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  localStorage.removeItem('shifaa-auth-storage'); // Clears core store
  localStorage.removeItem('shifaa_key'); // Clears older dev key
};

export const getStoredUser = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};
