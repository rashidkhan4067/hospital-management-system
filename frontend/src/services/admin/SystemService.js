import { BaseClinicalService } from '../BaseService';

/**
 * 🛰️ Global System Control Service
 * Handles clinical units, alerts, and security nodes.
 */
class SystemService extends BaseClinicalService {
    constructor() {
        super('system/');
    }

    // 🏥 Clinical Units (Departments)
    async getDepartments() {
        return this.get('system/departments/');
    }

    async createDepartment(data) {
        return this.post('system/departments/', data);
    }

    async getAlerts() {
        return this.get('system/alerts/');
    }

    async createAlert(data) {
        return this.post('system/alerts/', data);
    }

    async getAuditLogs() {
        return this.get('system/audit-logs/');
    }

    async getConfig(key) {
        return this.get(`system/config/${key}/`);
    }

    async updateConfig(key, data) {
        return this.patch(`system/config/${key}/`, data);
    }
}

export const systemService = new SystemService();
