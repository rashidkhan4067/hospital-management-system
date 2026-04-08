import api from '@/services/apiClient';

/**
 * 💊 GLOBAL PHARMACY INVENTORY SERVICE
 * Orchestrates clinical stock orchestration and medication propagation.
 */
const PharmacyService = {
    /**
     * Retrieves the entire clinical inventory list.
     */
    getInventory: async () => {
        const response = await api.get('pharmacy/inventory/');
        return response.data;
    },

    /**
     * Retrieves specific medication shards by ID.
     */
    getMedicine: async (id) => {
        const response = await api.get(`/pharmacy/inventory/${id}/`);
        return response.data;
    },

    /**
     * Commits a stock replenishment node to the database.
     */
    updateStock: async (id, data) => {
        const response = await api.patch(`/pharmacy/inventory/${id}/`, data);
        return response.data;
    },

    /**
     * Commits a new medication shard to the global inventory.
     */
    createMedicine: async (data) => {
        const response = await api.post('/pharmacy/inventory/', data);
        return response.data;
    },

    /**
     * Identifies critical stock items for reorder warnings.
     */
    getCriticalStock: async () => {
        const response = await api.get('pharmacy/inventory/critical_stock/');
        return response.data;
    }
};

export default PharmacyService;
