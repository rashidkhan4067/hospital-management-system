import { useQuery } from '@tanstack/react-query';
import appointmentService from '../api/appointmentService';

/**
 * 🛰️ Custom Hook: useTodaysAppointments
 * Orchestrates the retrieval and transformation of today's clinical schedule.
 */
export const useTodaysAppointments = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['appointments', 'today'],
        queryFn: () => appointmentService.getTodaysAppointments(),
        staleTime: 60000, // 1 minute
    });

    // ── Data Transformation Matrix ──────────────────────────────────────────
    const appointments = (data || []).map(appt => ({
        id: appt.id,
        patientName: appt.patient?.full_name || 'Anonymous Node',
        doctorName: appt.doctor?.full_name || 'Unassigned',
        department: appt.doctor?.specialization_display || 'General',
        time: appt.start_time ? appt.start_time.slice(0, 5) : '--:--',
        status: (appt.status || 'scheduled').toLowerCase()
    }));

    return {
        appointments,
        loading: isLoading,
        error
    };
};
