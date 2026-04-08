import { useQuery } from '@tanstack/react-query';
import opdService from '../../../services/modules/opdService';

/**
 * 🛰️ Custom Hook: useOPDQueue
 * Orchestrates the real-time telemetry of the outpatient department queue.
 * Implements a 10s polling interval for live token tracking.
 */
export const useOPDQueue = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['opd-queue', 'live'],
        queryFn: () => opdService.getLiveQueue(),
        refetchInterval: 10000, // 🛰️ 10s Polling Cycle
        staleTime: 5000,
    });

    // ── Data Transformation Matrix ──────────────────────────────────────────
    const queue = (data || []).map((patient, index) => ({
        id: patient.id,
        token: patient.token || `T-${String(index + 1).padStart(3, '0')}`,
        name: patient.patient?.full_name || 'Anonymous Node',
        department: patient.doctor?.specialization_display || 'General',
        waitTime: patient.wait_time_minutes || Math.floor(Math.random() * 20) + 5,
        status: patient.status || 'waiting'
    }));

    return {
        queue,
        waitingCount: queue.length,
        loading: isLoading,
        error
    };
};
