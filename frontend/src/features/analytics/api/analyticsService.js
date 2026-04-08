import BaseService from '@/services/BaseService';
import apiClient from '@/services/apiClient';

/**
 * 🏥 Analytics Service (OOPS: Inheritance)
 * Handles all clinical and financial trend analysis.
 */
class AnalyticsService extends BaseService {
  constructor() {
    super('analytics/');
  }

  /**
   * Retrieves clinical trends for charts.
   */
  async getClinicalTrends() {
    const response = await apiClient.get(`${this.endpoint}clinical/`);
    return response.data;
  }

  /**
   * Retrieves financial trends.
   */
  async getFinancialTrends() {
    const response = await apiClient.get(`${this.endpoint}financial/`);
    return response.data;
  }

  /**
   * Fetches the real-time system pulse.
   */
  async getGlobalPulse() {
    return this.getById('pulse');
  }

  /**
   * Retrieves recent system logs.
   */
  async getSystemAudit() {
    const response = await this.getAll({ path: '/ai/logs/' });
    return response;
  }

  /**
   * 📊 DSA: Binary Search for Date Lookup
   * Efficiently finds a trend record by date in a sorted list.
   * Big O: O(log n) compared to O(n) for .find().
   */
  findTrendByDate(trends, targetDate) {
    let left = 0;
    let right = trends.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midDate = trends[mid].date;

      if (midDate === targetDate) return trends[mid];
      if (midDate < targetDate) left = mid + 1;
      else right = mid - 1;
    }
    return null;
  }

  /**
   * 📊 Executive Intelligence Shard
   * Fetches the real-time system pulse for the dashboard KPIs.
   */
  async getExecutiveSummary() {
    const response = await apiClient.get(`${this.endpoint}pulse/`);
    return response.data;
  }

  /**
   * 🛡️ DSA: Aggregate Data (Summation Algorithm)
   * Efficiently sums up values in a single pass.
   */
  calculateTotal(records, key) {
    return records.reduce((acc, curr) => acc + (curr[key] || 0), 0);
  }
}

const analyticsService = new AnalyticsService();
export { analyticsService };
export default analyticsService;
