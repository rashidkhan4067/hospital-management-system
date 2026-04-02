import api from '../apiClient';

/**
 * 🧛 Identity Registry Service
 * Specialized handler for global personnel provisioning and account orchestration.
 */
class UserService {
    endpoint = '/accounts/users/';

    /**
     * getAll - Retrieve the global identity matrix
     */
    async getAll() {
        const response = await api.get(this.endpoint);
        return response.data;
    }

    /**
     * create - Provision a new high-fidelity identity
     */
    async create(userData) {
        const response = await api.post(this.endpoint, userData);
        return response.data;
    }

    /**
     * update - Modify an existing identity shard
     */
    async update(id, userData) {
        const response = await api.patch(`${this.endpoint}${id}/`, userData);
        return response.data;
    }

    /**
     * delete - Terminate an identity shard
     */
    async delete(id) {
        await api.delete(`${this.endpoint}${id}/`);
    }
}

export default new UserService();
