import { useQuery } from '@tanstack/react-query';
import DashboardService from '../api/dashboardService';

/**
 * 🛰️ Neural Intelligence Hook
 * Synchronizes the Sana AI stats with live server telemetry.
 * Leverages TanStack Query for optimal caching and reactive state.
 */
export const useSanaStats = () => {
    const { data: sanaStats, isLoading, isError, refetch } = useQuery({
        queryKey: ['sana-ai', 'live-intelligence'],
        queryFn: () => DashboardService.getSanaStats(),
        staleTime: 1000 * 30, // 30 seconds
        refetchInterval: 1000 * 60, // Auto-sync every minute
    });

    return {
        stats: sanaStats || { voiceBookings: 0, successRate: 0, avgResponse: 0 },
        loading: isLoading,
        error: isError,
        refresh: refetch
    };
};

export default useSanaStats;
