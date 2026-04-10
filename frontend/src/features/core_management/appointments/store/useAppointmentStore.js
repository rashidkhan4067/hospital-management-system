import { create } from 'zustand';

/**
 * 🕹️ useAppointmentStore (Senior Architect Spec)
 * Encapsulated state management for the Appointments module.
 * Features atomic shards for data, selection, and UI orchestration.
 */
export const useAppointmentStore = create((set) => ({
  // ─── Data Shard ──────────────────
  appointments: [],
  totalRecords: 0,
  
  // ─── UI & View Shard ─────────────
  viewMode: 'agenda',
  isSheetOpen: false,
  isSchedulerOpen: false,
  
  // ─── Selection Shard ─────────────
  selectedAppointment: null,
  
  // ─── Lifecycle Shard ─────────────
  isLoading: false,
  error: null,

  // ─── Actions ─────────────────────
  
  setAppointments: (data, count) => set({ 
    appointments: data, 
    totalRecords: count,
    isLoading: false 
  }),

  selectAppointment: (appointment) => set({ 
    selectedAppointment: appointment,
    isSheetOpen: !!appointment 
  }),

  setViewMode: (mode) => set({ viewMode: mode }),
  
  setSheetOpen: (isOpen) => set({ isSheetOpen: isOpen }),
  
  setSchedulerOpen: (isOpen) => set({ isSchedulerOpen: isOpen }),

  setLoading: (status) => set({ isLoading: status }),

  setError: (err) => set({ error: err, isLoading: false }),

  // 🧹 Strategic Reset
  resetSelection: () => set({ 
    selectedAppointment: null, 
    isSheetOpen: false 
  })

}));
