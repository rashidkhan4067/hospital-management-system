import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import appointmentService from '../api/appointmentService';

/**
 * 🛰️ useAppointments (The Clinical Telemetry Orchestrator)
 * Manages the caching lifecycle and real-time synchronization of appointment data.
 */
export function useAppointments(filters = {}) {
    const queryClient = useQueryClient();

    // 📡 Primary Telemetry Subscription
    const query = useQuery({
        queryKey: ['appointments', filters],
        queryFn: () => appointmentService.fetchAppointments(filters),
        staleTime: 60 * 1000, // 1 minute fresh state
        refetchInterval: 30 * 1000, // 30s pulse sync
    });

    // 🟢 Mutation: Create (with Cache Invalidation)
    const createMutation = useMutation({
        mutationFn: ({ data, key }) => appointmentService.createAppointment(data, key),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            queryClient.invalidateQueries({ queryKey: ['clinical-telemetry'] }); // Sync dashboard
        }
    });

    // 🟡 Mutation: Patch (Update)
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => appointmentService.reschedule(id, data.date, data.time),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
        }
    });

    // 🔴 Mutation: Finalize/Cancel
    const statusMutation = useMutation({
        mutationFn: ({ id, action, payload }) => {
            if (action === 'cancel') return appointmentService.cancel(id, payload);
            if (action === 'complete') return appointmentService.complete(id, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            queryClient.invalidateQueries({ queryKey: ['clinical-telemetry'] });
        }
    });

    return {
        ...query,
        createAppointment: createMutation.mutateAsync,
        updateAppointment: updateMutation.mutateAsync,
        updateStatus: statusMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending
    };
}
