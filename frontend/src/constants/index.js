/**
 * @file constants/index.js
 * @description Centralized app constants for roles, routes, and UI defaults.
 */

export const APPLICATION_NAME = "Al Shifaa Clinic";

export const ROLES = {
  ADMIN: 'admin',
  PATIENT: 'patient',
  DOCTOR: 'doctor',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  DOCTORS: '/doctors',
  MY_APPOINTMENTS: '/my-appointments',
  VOICE: '/voice',
  ADMIN: '/admin',
};

export const APPOINTMENT_STATUS = {
  UPCOMING: 'upcoming',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  PENDING: 'pending',
};

export const STATUS_COLORS = {
  [APPOINTMENT_STATUS.UPCOMING]: '#38bdf8',
  [APPOINTMENT_STATUS.COMPLETED]: '#10b981',
  [APPOINTMENT_STATUS.CANCELLED]: '#ef4444',
  [APPOINTMENT_STATUS.PENDING]: '#f59e0b',
};

export const SPECIALIZATIONS = [
  'General Physician',
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Psychiatry',
  'Dermatology',
];

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_ROLE: 'userRole',
  USER_DATA: 'user',
};

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

/**
 * Returns the default route for a user based on their role
 * @param {string} role 
 * @returns {string} 
 */
export const getRedirectRouteByRole = (role) => {
  return role === ROLES.ADMIN ? ROUTES.ADMIN : ROUTES.DASHBOARD;
};

export * from './theme';


