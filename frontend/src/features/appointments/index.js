/**
 * 📅 Appointments Feature Module
 * Strict Encapsulation Layer: Exporting only top-level pages and essential operational hooks.
 */

// Pages
export { default as AppointmentsPage } from './pages/AppointmentsPage';
export { default as UserAppointmentsPage } from './pages/UserAppointmentsPage';

// Essential Hooks
export { useAppointments, useAdminAppointments, useAppointmentOperations } from './hooks/useAppointments';
