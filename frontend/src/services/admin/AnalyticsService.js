import api from '../apiClient';

/**
 * 🧠 Global Analytics & Intelligence Engine
 * Orchestrates high-density fetching for clinical and financial trends.
 */
const AnalyticsService = {
    /**
     * Retrieves historical clinical metrics for chart propagation.
     */
    getClinicalTrends: async () => {
        const response = await api.get('/analytics/clinical/');
        return response.data;
    },

    /**
     * Retrieves historical financial metrics for Net Revenue analysis.
     */
    getFinancialTrends: async () => {
        const response = await api.get('/analytics/financial/');
        return response.data;
    },

    /**
     * Fetches the real-time Global Intelligence Pulse (Today vs Yesterday).
     */
    getGlobalPulse: async () => {
        const response = await api.get('/analytics/pulse/');
        return response.data;
    },

    /**
     * 🛰️ High-Performance Executive Summary Shard
     * Aggregates key counts for patients, doctors, and revenue.
     */
    getExecutiveSummary: async () => {
        const response = await api.get('/analytics/pulse/');
        return response.data;
    },

    /**
     * Retrieves recent clinical system audit shards.
     */
    getSystemAudit: async () => {
        const response = await api.get('/ai/logs/');
        return response.data;
    }
};

export default AnalyticsService;
