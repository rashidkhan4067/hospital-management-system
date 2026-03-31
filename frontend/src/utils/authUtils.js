/**
 * @file utils/authUtils.js
 * @description Helpers for authentication and token handling.
 */
import { STORAGE_KEYS } from '../constants';

/**
 * Handle saving all auth data at once
 */
export const setAuthSession = (accessToken, refreshToken, userData) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(STORAGE_KEYS.USER_ROLE, userData.role);
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
};

/**
 * Clean up auth storage
 */
export const clearAuthSession = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
};

/**
 * Get access token from storage
 */
export const getAccessToken = () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

/**
 * Get refresh token from storage
 */
export const getRefreshToken = () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

/**
 * Get current user data from storage
 */
export const getStoredUser = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};
