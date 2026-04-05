import api from '@/core/api/apiClient';

/**
 * 🏥 Clinical Accommodation Service
 */
class WardsService {
  // ── Wards ────────────────────────────────────────────────────────────────
  async getWards(params = {}) {
    const res = await api.get('wards/wards/', { params });
    return res.data;
  }

  async createWard(data) {
    const res = await api.post('wards/wards/', data);
    return res.data;
  }

  async updateWard(id, data) {
    const res = await api.patch(`wards/wards/${id}/`, data);
    return res.data;
  }

  async deleteWard(id) {
    const res = await api.delete(`wards/wards/${id}/`);
    return res.data;
  }

  // ── Beds ─────────────────────────────────────────────────────────────────
  async getBeds(params = {}) {
    const res = await api.get('wards/beds/', { params });
    return res.data;
  }

  async createBed(data) {
    const res = await api.post('wards/beds/', data);
    return res.data;
  }

  async updateBed(id, data) {
    const res = await api.patch(`wards/beds/${id}/`, data);
    return res.data;
  }

  async deleteBed(id) {
    const res = await api.delete(`wards/beds/${id}/`);
    return res.data;
  }
}

export const wardsService = new WardsService();
export default wardsService;
