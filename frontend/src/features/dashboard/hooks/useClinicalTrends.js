import { useQuery } from '@tanstack/react-query';
import DashboardService from '../api/dashboardService';

/**
 * 📈 Clinical Throughput Hook
 * Synchronizes the clinical trend matrix with server-state.
 * Supports reactive range toggling (7d / mo).
 * 
 * @param {string} range - '7d' | 'mo'
 */
export const useClinicalTrends = (range = '7d') => {
    const { data: trendData = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['clinical-trends', range],
        queryFn: () => DashboardService.getClinicalTrends(range),
        staleTime: 1000 * 60 * 5, // 5 minutes
        keepPreviousData: true,
    });

    return {
        trendData,
        loading: isLoading,
        error: isError,
        refresh: refetch
    };
};

export default useClinicalTrends;
