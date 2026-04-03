import api from '../apiClient';

/**
 * 📅 Schedule Orchestrator Service
 * Specialized handler for clinical visit shards and appointment matrix management.
 */
class AppointmentService {
    endpoint = '/appointments/';

    /**
     * getAll - Retrieve the global visit matrix
     */
    async getAll() {
        const response = await api.get(this.endpoint);
        return response.data;
    }

    /**
     * create - Provision a new clinical visit shard
     */
    async create(data) {
        const response = await api.post(this.endpoint, data);
        return response.data;
    }

    /**
     * update - Synchronize a visit shard with new clinical metadata (e.g., status)
     */
    async update(id, data) {
        const response = await api.patch(`${this.endpoint}${id}/`, data);
        return response.data;
    }

    /**
     * cancel - Terminate a visit shard with audit reason
     */
    async cancel(id, reason) {
        const response = await api.patch(`${this.endpoint}${id}/cancel/`, { cancellation_reason: reason });
        return response.data;
    }
}

export default new AppointmentService();
