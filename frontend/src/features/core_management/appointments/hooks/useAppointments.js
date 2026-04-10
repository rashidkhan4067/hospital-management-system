import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '../api/appointmentService';

/**
 * 🛰️ useAppointments (Senior Architect Spec)
 */
export function useAppointments(filters = {}) {
  const queryClient = useQueryClient();

  // 🏥 Clinical Registry Query
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['appointments', filters],
    queryFn: () => appointmentService.fetchAppointments(filters),
    staleTime: 60000, 
  });

  // ⛓️ Reschedule Mutation
  const rescheduleMutation = useMutation({
    mutationFn: ({ id, date, time }) => appointmentService.rescheduleAppointment(id, date, time),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    }
  });

  // ➕ Create Mutation
  const createMutation = useMutation({
    mutationFn: (data) => appointmentService.createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    }
  });

  // 🛑 Cancellation
  const cancelMutation = useMutation({
    mutationFn: (id) => appointmentService.cancelAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    }
  });

  return {
    appointments: data || [],
    isLoading,
    error,
    refetch,
    
    rescheduleAppointment: rescheduleMutation.mutate,
    isRescheduling: rescheduleMutation.isLoading,

    createAppointment: createMutation.mutate,
    isCreating: createMutation.isLoading,

    cancelAppointment: cancelMutation.mutate,
    isCancelling: cancelMutation.isLoading
  };
}

/**
 * 🕵️ useDoctorAvailability
 * Returns valid clinical slots for a specific practitioner.
 */
export function useDoctorAvailability(doctor, date) {
    return useQuery({
        queryKey: ['availability', doctor, date],
        queryFn: () => appointmentService.fetchAvailableSlots(doctor, date),
        enabled: !!doctor && !!date,
        staleTime: 0 // Always fresh check
    });
}
