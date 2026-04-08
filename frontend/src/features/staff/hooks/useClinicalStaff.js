import { useQuery } from '@tanstack/react-query';
import staffService from '../../../services/modules/staffService';

/**
 * 🕵️‍♂️ Custom Hook: useClinicalStaff
 * Orchestrates the real-time monitoring of clinical personnel across the hospital.
 * Implements a 30s polling cycle to capture status changes (e.g., Surgery → On Duty).
 */
export const useClinicalStaff = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['staff', 'on-duty'],
        queryFn: () => staffService.getOnDutyStaff(),
        refetchInterval: 30000, // 🛰️ 30s Polling Cycle
        staleTime: 15000,
    });

    /**
     * 🎨 Utility: Status Color Sharding
     * Maps personnel status to distinct visual tokens.
     */
    const getStatusStyles = (status) => {
        const normalized = status?.toUpperCase() || 'OFF DUTY';
        const config = {
            'ON DUTY': 'text-emerald-500 bg-emerald-500/10',
            'IN SURGERY': 'text-rose-500 bg-rose-500/10',
            'ON BREAK': 'text-amber-500 bg-amber-500/10',
            'IN LAB': 'text-sky-500 bg-sky-500/10',
        };
        return config[normalized] || 'text-slate-400 bg-slate-400/10';
    };

    return {
        staff: data || [],
        isLoading,
        error,
        getStatusStyles,
    };
};
