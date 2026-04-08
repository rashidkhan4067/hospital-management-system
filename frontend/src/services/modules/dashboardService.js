import api from '../apiClient';

/**
 * 📊 Al Shifaa Dashboard Intelligence Service
 * Stateless Data Access Layer for high-level clinical metrics.
 */
const DashboardService = {
  // 🛰 Primary Operational Shards
  getDashboardStats: () => api.get('/dashboard/stats/').then(r => r.data),
  
  // 📋 Appointments Operational Summary
  getAppointmentsSummary: () => api.get('/dashboard/appointments-summary/').then(r => r.data),
  
  // 🏥 Ward & Bed Allocation Matrix
  getWardStats: () => api.get('/dashboard/ward-stats/').then(r => r.data),
};

export default DashboardService;
