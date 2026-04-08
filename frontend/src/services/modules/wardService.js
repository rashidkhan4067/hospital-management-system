import apiClient from '../apiClient';

/**
 * 🏥 Clinical Ward & Spatial Telemetry Service
 * Orchestrates clinical resource distribution and real-time bed availability.
 */
const wardService = {
    /**
     * GET /api/v1/wards/wards/stats/
     * Fetches systemic occupancy metrics and ward-level distribution nodes.
     */
    getBedAvailability: async () => {
        try {
            const response = await apiClient.get('wards/wards/stats/');
            return response.data;
        } catch (error) {
            console.error('🛰️ Ward Telemetry Retrieval Failure:', error);
            throw error;
        }
    }
};

export default wardService;
