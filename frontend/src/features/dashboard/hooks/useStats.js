import { useState, useEffect, useCallback } from 'react';
import analyticsService from '@/features/analytics/api/analyticsService';

/**
 * 🎣 EXECUTIVE ANALYTICS HOOK
 * Provides live counts and system status for the main Admin Command center.
 */
export const useAdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await analyticsService.getExecutiveSummary();
      setStats(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('System could not translate executive metrics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refresh: fetchStats };
};

export default useAdminStats;
