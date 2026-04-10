import apiClient from '../apiClient';

/**
 * 🛰️ Activity & Event Stream Service
 * Monitors system-wide events and administrative audit trails.
 */
const activityService = {
  /**
   * GET /api/v1/dashboard/activity/feed/
   * Fetches the unified real-time event stream.
   */
  getLiveActivityFeed: async () => {
    try {
      const response = await apiClient.get('dashboard/activity/feed/');
      return response.data;
    } catch (error) {
      console.error('🛰️ Activity Feed Retrieval Failure:', error);
      throw error;
    }
  }
};

export default activityService;
