import api from '../apiClient';

/**
 * 👥 Al Shifaa User & Identity Service
 * Stateless Data Access Layer for security and personnel nodes.
 */
const UserService = {
  // 🛰 Identity Retrieval
  getMe: () => api.get('auth/users/me/'),
  
  // 🏢 Global Personnel Matrix
  getAll: (params = {}) => api.get('users/', { params }),
  
  // 🔬 Clinical Detail Shard
  getById: (id) => api.get(`users/${id}/`),
  
  // 🛡 User Modification Protocol
  update: (id, data) => api.patch(`users/${id}/`, data),
  
  // 🚫 Access Rescission
  delete: (id) => api.delete(`users/${id}/`),

  // 📉 System Statistics Shard
  getStats: () => api.get('users/stats/').then(r => r.data),
};

export default UserService;
