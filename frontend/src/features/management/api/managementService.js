import api from '@/core/api/apiClient';

/**
 * System Management Service
 * Handles departments, alerts, audit logs, and system config calls.
 */
class SystemService {
  // ── Departments ──────────────────────────────────────────────────────────
  async getDepartments() {
    const res = await api.get('system/departments/');
    return res.data;
  }

  async createDepartment(data) {
    const res = await api.post('system/departments/', data);
    return res.data;
  }

  async updateDepartment(id, data) {
    const res = await api.patch(`system/departments/${id}/`, data);
    return res.data;
  }

  async deleteDepartment(id) {
    const res = await api.delete(`system/departments/${id}/`);
    return res.data;
  }

  // ── Alerts ───────────────────────────────────────────────────────────────
  async getAlerts() {
    const res = await api.get('system/alerts/');
    return res.data;
  }

  async createAlert(data) {
    const res = await api.post('system/alerts/', data);
    return res.data;
  }

  // ── Audit Logs ───────────────────────────────────────────────────────────
  async getAuditLogs() {
    const res = await api.get('system/audit-logs/');
    return res.data;
  }

  // ── System Config ─────────────────────────────────────────────────────────
  async getConfig(key) {
    const res = await api.get(`system/config/${key}/`);
    return res.data;
  }

  async updateConfig(key, data) {
    const res = await api.put(`system/config/${key}/`, data);
    return res.data;
  }

  async post(endpoint, data) {
    const res = await api.post(endpoint, data);
    return res.data;
  }
}

export const systemService = new SystemService();
export default systemService;
