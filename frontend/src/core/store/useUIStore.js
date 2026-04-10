import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 🛰️ UI State Command Center (Zustand MD3 Spec)
 * Manages sidebars, themes, and global telemetry notifications.
 */
export const useUIStore = create(
  persist(
    (set) => ({
      isSidebarExpanded: window.innerWidth > 1280,
      isMobileMenuOpen: false,
      isGlobalLoading: false,
      globalError: null,
      notifications: [],
      openGroups: {},

      // Telemetry Controls

      setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),
      setGlobalError: (error) => set({ globalError: error }),

      // Navigation Logic
      toggleGroup: (groupId) => set((state) => ({
        openGroups: {
          ...state.openGroups,
          [groupId]: !state.openGroups[groupId]
        }
      })),



      // Layout Controls
      setSidebarExpanded: (expanded) => set({ isSidebarExpanded: expanded }),
      toggleSidebar: () => set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

      // Notification Protocol
      addNotification: (title, message, type = 'info') => {
        const id = Date.now().toString();
        set((state) => ({
          notifications: [...state.notifications, { id, title, message, type, timestamp: new Date() }]
        }));
        // Auto-pruning after 5s
        setTimeout(() => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id)
          }));
        }, 5000);
      },
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
      })),
    }),
    {
      name: 'shifaa-ui-storage',
      partialize: (state) => ({ 
        isSidebarExpanded: state.isSidebarExpanded,
        openGroups: state.openGroups
      }),
    }

  )
);
