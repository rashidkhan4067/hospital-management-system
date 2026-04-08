import apiClient from '../apiClient';

/**
 * 🛰️ Presence & Staff Orchestration Service
 * Real-time monitoring of clinical availability and zone-based workloads.
 */
const presenceService = {
  /**
   * GET /api/v1/doctors/presence/
   * Fetches the live personnel presence matrix and zone-based mission counts.
   */
  getLivePresenceData: async () => {
    try {
      const response = await apiClient.get('doctors/presence/');
      return response.data;
    } catch (error) {
      console.error('🛰️ Presence Matrix Retrieval Failure:', error);
      throw error;
    }
  }
};

export default presenceService;
