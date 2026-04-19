import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 🛰️ Global Clinical Intelligence Store
 * The "Single Source of Truth" for all administrative telemetry in the HMS.
 */
export const useDataStore = create(
  persist(
    (set) => ({
      // ─── Operational Filters (Shared Globally) ──────────────────
      filters: {
        dateRange: 'Today',
        status: 'all',
        department: 'All',
        doctor: 'All Doctors', // 🏥 New Segment: Provider-level drill-down
        searchQuery: ''
      },

      // ─── Telemetry Shard ──────────────────
      telemetry: {
        patients: { total: 0, trend: 0, isUp: true },
        appointments: { total: 0, trend: 0, isUp: true },
        revenue: { total: 0, trend: 0, isUp: true },
        doctors: { total: 0, trend: 0, isUp: true },
        loading: false,
        error: null,
        lastUpdated: null
      },

      // ─── Operational Actions ──────────────────
      selectedModule: 'all',
      setModule: (module) => set({ selectedModule: module }),
      
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),

      updateTelemetry: (data) => set((state) => ({
        telemetry: { ...state.telemetry, ...data, lastUpdated: new Date().toISOString() }
      })),

      resetFilters: () => set({
        filters: {
          dateRange: 'Today',
          status: 'all',
          department: 'All',
          doctor: 'All Doctors',
          searchQuery: ''
        }
      }),

      // Sync Protocol (URL -> Store)
      syncFiltersFromUrl: (params) => {
        if (!params || params.size === 0) return; // Prevent reset on clean URL refresh
        
        const dateRange = params.get('range') || 'Today';
        const department = params.get('unit') || 'All';
        const doctor = params.get('doctor') || 'All Doctors';
        
        set((state) => ({
            filters: { ...state.filters, dateRange, department, doctor }
        }));
      }
    }),

    {
      name: 'shifaa-clinical-intelligence',
      partialize: (state) => ({ 
        selectedModule: state.selectedModule,
        filters: state.filters,
        telemetry: state.telemetry 
      }),
    }
  )
);
