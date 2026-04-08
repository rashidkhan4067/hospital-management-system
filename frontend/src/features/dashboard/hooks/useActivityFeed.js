import { useQuery } from '@tanstack/react-query';
import activityService from '../../../services/modules/activityService';

/**
 * 📡 Custom Hook: useActivityFeed
 * Orchestrates the real-time event stream lifecycle.
 * Implements architectural polling for systemic awareness.
 */
export const useActivityFeed = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboard', 'activity-feed'],
        queryFn: () => activityService.getLiveActivityFeed(),
        refetchInterval: 15000, // 15s Event Polling
        staleTime: 10000,
    });

    return {
        activities: data || [],
        isLoading,
        error
    };
};
