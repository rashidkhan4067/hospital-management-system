/**
 * 🛰 Al Shifaa Central Service Registry
 * Exports the Infrastructure and Domain-based API modules.
 */

export { default as api } from './apiClient';
export { default as BaseService } from './BaseService';

// 🏥 Domain Services
export { default as AppointmentService } from './modules/appointmentService';
export { default as UserService } from './modules/userService';
export { default as DashboardService } from './modules/dashboardService';
