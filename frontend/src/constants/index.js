/**
 * App-wide constants for roles, API endpoints, etc.
 */

export const ROLES = {
  ADMIN: 'admin',
  PATIENT: 'patient',
  DOCTOR: 'doctor', // Future scope
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  DOCTORS: '/doctors',
  MY_APPOINTMENTS: '/my-appointments',
  ADMIN_STATS: '/admin/stats',
  ADMIN_DOCTORS: '/admin/doctors',
  ADMIN_APPOINTMENTS: '/admin/appointments',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'access_token',
  USER_DATA: 'user_data',
};
