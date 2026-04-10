import apiClient from '../apiClient';

/**
 * 🏥 Clinical Staff Service
 * Coordinates with the physician registry to retrieve real-time personnel telemetry.
 */
const staffService = {
  /**
   * 📡 GET /api/v1/doctors/on_duty/
   * Fetches the current sequence of medical officers on active shifts.
   */
  getOnDutyStaff: async () => {
    try {
      const response = await apiClient.get('doctors/on_duty/');
      return response.data;
    } catch (error) {
      console.error('🛰️ Staff Telemetry Error:', error);
      throw error;
    }
  },
};

export default staffService;
