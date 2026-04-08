import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AnalyticsService from '@/features/analytics/api/analyticsService';

/**
 * ⚡ ADMIN ANALYTICS HOOK
 * Encourages separation of concerns by encapsulating complex aggregation and load states.
 * Powered by TanStack Query for unified server-state synchronization.
 */
export const useAdminAnalytics = () => {
    const query = useQuery({
        queryKey: ['analytics', 'admin'],
        queryFn: async () => {
            const [clinical, financial, pulseData] = await Promise.all([
                AnalyticsService.getClinicalTrends(),
                AnalyticsService.getFinancialTrends(),
                AnalyticsService.getGlobalPulse()
            ]);
            
            return {
                clinicalTrends: clinical.results || clinical,
                financialTrends: financial.results || financial,
                pulse: pulseData
            };
        },
        staleTime: 1000 * 60 * 5, // 5 min
    });

    return {
        ...query,
        clinicalTrends: query.data?.clinicalTrends || [],
        financialTrends: query.data?.financialTrends || [],
        pulse: query.data?.pulse || null,
        loading: query.isLoading,
        refresh: query.refetch
    };
};

export default useAdminAnalytics;
