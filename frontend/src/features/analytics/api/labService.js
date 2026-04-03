import api from '@/core/api/apiClient';

/**
 * 🧪 GLOBAL LABORATORY DIAGNOSTIC SERVICE
 * Orchestrates clinical test registries and patient findings.
 */
const LaboratoryService = {
    /**
     * Retrieves all available laboratory tests and pricing.
     */
    getTests: async () => {
        const response = await api.get('/lab/tests/');
        return response.data;
    },

    /**
     * Retrieves clinical finding snapshots (patient reports).
     */
    getResults: async () => {
        const response = await api.get('/lab/results/');
        return response.data;
    },

    /**
     * Commits a new diagnostic finding node to the patient's record.
     */
    createResult: async (data) => {
        const response = await api.post('/lab/results/', data);
        return response.data;
    }
};

export default LaboratoryService;
