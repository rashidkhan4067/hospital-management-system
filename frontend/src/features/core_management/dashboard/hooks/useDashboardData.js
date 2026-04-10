import { useDataStore } from '@/core/store/useDataStore';
import { useAnalyticsData } from '../../analytics/hooks/useAnalyticsData';

/**
 * 🛰️ useDashboardData (Architectural Subscriber Hook)
 * Subscribes to the Unified Clinical Telemetry Engine.
 * This guarantees the Dashboard and Analytics never show conflicting data.
 */
export function useDashboardData() {
  // We invoke the orchestrator hook to ensure data is fetched/synced
  // Because both use the same QueryKey, this will NOT create duplicate API calls.
  const { isLoading, isError, refetch } = useAnalyticsData();
  
  // We read the "Ground Truth" directly from the Global Store
  const telemetry = useDataStore(state => state.telemetry);
  const filters = useDataStore(state => state.filters);

  return {
    telemetry,
    filters,
    isLoading,
    isError,
    refetch: () => {
        // Trigger a global refresh
        refetch();
    }
  };
}
