import BaseService from '@/services/BaseService';

/**
 * 🛰️ Global System Service (OOPS: Inheritance)
 * Handles hospital structure, alerts, and security settings.
 */
class SystemService extends BaseService {
  constructor() {
    super('system/');
  }

  /**
   * 🏥 Hospital Departments
   */
  async getDepartments() {
    return this.getAll({ path: '/system/departments/' });
  }

  async createDepartment(data) {
    return this.create({ path: '/system/departments/', data });
  }

  /**
   * 🚨 Alerts & Notifications
   */
  async getAlerts() {
    return this.getAll({ path: '/system/alerts/' });
  }

  async createAlert(data) {
    return this.create({ path: '/system/alerts/', data });
  }

  /**
   * 🔐 Security Logs
   */
  async getAuditLogs() {
    return this.getAll({ path: '/system/audit-logs/' });
  }

  /**
   * ⚙️ System Configuration
   */
  async getConfig(key) {
    return this.getById(key, { path: `/system/config/${key}/` });
  }

  async updateConfig(key, data) {
    return this.update(key, data, { path: `/system/config/${key}/` });
  }
}

const systemService = new SystemService();
export { systemService };
export default systemService;
