import api from '../apiClient';

/**
 * 📅 Al Shifaa Appointment Domain Service
 * Stateless Data Access Layer for clinical scheduling nodes.
 */
const AppointmentService = {
  // 🛰 Primary Result Matrix
  getAll: (filters = {}) => api.get('/appointments/', { params: filters }),
  
  // 🔬 Diagnostic Shard
  getById: (id) => api.get(`/appointments/${id}/`),
  
  // 📝 Protocol Modification
  create: (data) => api.post('/appointments/', data),
  
  // 🛡 Node Synchronization
  update: (id, data) => api.patch(`/appointments/${id}/`, data),
  
  // 🚫 Node Termination
  delete: (id) => api.delete(`/appointments/${id}/`),

  // 📉 Clinical Intelligence Shards
  getStats: () => api.get('/appointments/stats/').then(r => r.data),
  getQueue: () => api.get('/appointments/queue/').then(r => r.data),
};

export default AppointmentService;
