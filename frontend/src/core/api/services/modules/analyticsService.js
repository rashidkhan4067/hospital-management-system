import apiClient from '../apiClient';

/**
 * 📊 Analytics & Intelligence Service
 * Orchestrates clinical and financial telemetry snapshots for the Command Center.
 */
const analyticsService = {
  /**
   * 📉 GET /api/v1/analytics/clinical-metrics/
   * Fetches the chronological sequence of patient volume and clinical growth nodes.
   */
  getWeeklyVisitStats: async () => {
    try {
      // Fetching the last 7 clinical telemetry nodes
      const response = await apiClient.get('analytics/clinical/');
      return response.data.results || response.data;
    } catch (error) {
      console.error('🛰️ Analytics Telemetry Error:', error);
      throw error;
    }
  },

  /**
   * 🧠 GET /api/v1/analytics/pulse/
   * Retrieves the real-time AI-driven "Pulse" of the entire hospital.
   */
  getGlobalIntelligencePulse: async () => {
    try {
      const response = await apiClient.get('analytics/pulse/');
      return response.data;
    } catch (error) {
      console.error('🧠 Intelligence Pulse Error:', error);
      throw error;
    }
  }
};

export default analyticsService;
