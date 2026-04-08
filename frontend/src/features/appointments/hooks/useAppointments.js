import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppointmentService } from '@/services'; // 🛰 Import from Domain Service Hub

/**
 * 📅 ADMIN APPOINTMENT HOOK
 * Enforces real-time clinical scheduling propagation for the administrative hub.
 * Powered by TanStack Query & Centralized Domain Services.
 */
export const useAdminAppointments = (filters = {}) => {
    return useQuery({
        queryKey: ['appointments', 'admin', filters],
        queryFn: async () => {
            const [apptsRes, statsRes] = await Promise.all([
                AppointmentService.getAll(filters),
                AppointmentService.getStats()
            ]);
            return {
                appointments: apptsRes.data.results || apptsRes.data,
                stats: statsRes
            };
        },
        keepPreviousData: true,
    });
};

/**
 * 📋 OPD QUEUE HOOK
 * Specifically tuned for the real-time patient flow matrix.
 */
export const useOPDQueue = () => {
    return useQuery({
        queryKey: ['appointments', 'queue'],
        queryFn: () => AppointmentService.getQueue(),
        refetchInterval: 60000,
    });
};

/**
 * 🏥 APPOINTMENT OPERATIONS HOOK
 * Isolated logic for updating appointment state across the medical matrix.
 */
export const useAppointmentOperations = (addNotification) => {
    const queryClient = useQueryClient();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const updateMutation = useMutation({
        mutationFn: ({ id, status }) => AppointmentService.update(id, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            if (addNotification) {
                addNotification('Pulse Synchronized', 'Medical node updated across clinical matrix.', 'success');
            }
        },
        onError: () => {
            if (addNotification) {
                addNotification('Matrix Error', 'Failed to update patient node.', 'error');
            }
        }
    });

    const handleStatusUpdate = (appt, status) => {
        updateMutation.mutate({ id: appt.id, status });
    };

    const handleViewDetail = (appt) => {
        setSelectedAppointment(appt);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedAppointment(null);
    };

    return {
        selectedAppointment,
        isDrawerOpen,
        handleStatusUpdate,
        handleViewDetail,
        handleCloseDrawer,
        isUpdating: updateMutation.isLoading
    };
};

export const useAppointments = useAdminAppointments;
export default useAdminAppointments;
