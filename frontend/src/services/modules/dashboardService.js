import apiClient from '../apiClient';

/**
 * 📊 Al Shifaa Dashboard Intelligence Service
 * Stateless Data Access Layer for high-level clinical metrics.
 */
const DashboardService = {
  // 🛰 Primary Operational Shards
  getDashboardStats: () => apiClient.get('dashboard/executive/summary/').then(r => r.data),
  
  // 📋 Appointments Operational Summary
  getAppointmentsSummary: () => apiClient.get('dashboard/appointments-summary/').then(r => r.data),
  
  // 🏥 Ward & Bed Allocation Matrix
  getWardStats: () => apiClient.get('dashboard/ward-stats/').then(r => r.data),
};

export default DashboardService;
