import { useQuery } from '@tanstack/react-query';
import DashboardService from '../api/dashboardService';

/**
 * 💹 Financial Telemetry Hook
 * Powered by TanStack Query for unified server-state synchronization.
 * Handles loading, error, and stale-while-revalidate protocols.
 * 
 * @param {string} range - Time projection for the financial matrix.
 */
export const useRevenueData = (range = '6mo') => {
    const { data: revenueData = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['revenue', range],
        queryFn: () => DashboardService.getRevenueData(range),
        staleTime: 1000 * 60 * 5, // 5 minutes fresh
        retry: 2,
    });

    return {
        revenueData,
        loading: isLoading,
        error: isError,
        refresh: refetch
    };
};

export default useRevenueData;
