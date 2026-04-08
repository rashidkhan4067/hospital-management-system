/**
 * 🏥 Clinical Dashboard Module
 * Strict Encapsulation: Only exposing role-dispatchers, pages, and analytical hooks.
 */

// Pages & Dispatchers
export { default as DashboardDispatcher } from './pages/DashboardDispatcher';
export { default as DashboardPage } from './pages/DashboardPage';
export { default as StatsPage } from './pages/StatsPage';
export { default as AdminChatPage } from './pages/AdminChatPage';
export { default as DoctorDashboard } from './pages/DoctorDashboard';
export { default as PatientDashboard } from './pages/PatientDashboard';

// Essential Hooks
export { useStats } from './hooks/useStats';
export { useDashboardActivity } from './hooks/useDashboardActivity';
