import { useQuery } from '@tanstack/react-query';
import presenceService from '../../../services/modules/presenceService';

/**
 * 📡 Custom Hook: useActivePersonnel
 * Manages the lifecycle of live staff presence and zone assignments.
 * Implements architectural polling for real-time mission visibility.
 */
export const useActivePersonnel = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['staff', 'live-presence'],
        queryFn: async () => {
            try {
                const res = await presenceService.getLivePresenceData();
                return res || { active_staff: [], zones: [] };
            } catch (e) {
                return { active_staff: [], zones: [] };
            }
        },
        placeholderData: (previousData) => previousData,
        refetchInterval: 10000, 
        staleTime: 5000,
    });

    return {
        activeStaff: data?.active_staff || [],
        zones: data?.zones || [],
        isLoading,
        error
    };
};

