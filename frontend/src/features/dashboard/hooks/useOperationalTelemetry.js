import { useQuery } from '@tanstack/react-query';
import telemetryService from '@/services/modules/telemetryService';

/**
 * 🛰️ Custom Hook: useOperationalTelemetry
 * Handles the polling logic and state management for operational shards.
 * @param {boolean} isSyncActive - Determines if auto-refetch/polling is enabled.
 */
export const useOperationalTelemetry = (isSyncActive = false) => {
    const { data: metrics, isLoading, error } = useQuery({
        queryKey: ['operational-metrics'],
        queryFn: () => telemetryService.getOperationalMetrics(),
        refetchInterval: isSyncActive ? 15000 : false, // 15s polling if sync is active
        refetchOnWindowFocus: isSyncActive,
        staleTime: 5000,
    });

    return {
        metrics: metrics || [],
        loading: isLoading,
        error
    };
};
