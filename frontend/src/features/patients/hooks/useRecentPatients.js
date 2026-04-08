import { useQuery } from '@tanstack/react-query';
import patientService from '../api/patientService';
import { getInitials, timeAgo } from '@/utils/formatters';

/**
 * 🛰️ Custom Hook: useRecentPatients
 * Orchestrates the real-time activity feed of newly registered clinical nodes.
 */
export const useRecentPatients = (isSyncActive = true) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['patients', 'recent'],
        queryFn: () => patientService.getRecentPatients(),
        refetchInterval: isSyncActive ? 20000 : false, // 🕒 20s Polling Cycle if sync is active
        staleTime: 10000,
    });

    // ── Data Transformation Matrix ──────────────────────────────────────────
    const patients = (data || []).map(p => ({
        id: p.id,
        name: p.full_name || 'Patient Node',
        initials: getInitials(p.full_name),
        lastActivity: timeAgo(p.created_at),
        doctor: p.doctor_name || 'Medical Officer',
        status: p.is_admitted ? 'Admitted' : 'Outpatient',
        nodeId: p.patient_id || `PX-${String(p.id).slice(0, 4)}`
    }));

    return {
        patients,
        loading: isLoading,
        error
    };
};
