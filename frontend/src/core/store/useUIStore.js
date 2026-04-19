import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * 🛰️ UI State Command Center (Zustand MD3 Spec)
 * Manages sidebars, themes, and global telemetry notifications.
 *
 * ⚠️  isSidebarExpanded defaults to `true` (expanded).
 *     Zustand `persist` will immediately overwrite this with the value
 *     stored in localStorage on the first rehydration tick, so there
 *     is no visible flash — the user's preference is restored before
 *     the first paint on subsequent visits.
 */
// ─── Synchronous localStorage read ───────────────────────────────────────────
// Zustand `persist` rehydrates asynchronously (after mount), which causes a
// one-frame flash with the default value. Reading the stored key here means
// the very first render already has the user's saved preference.
const _getInitialSidebarState = () => {
  try {
    const raw = localStorage.getItem('shifaa-ui-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed?.state?.isSidebarExpanded === 'boolean') {
        return parsed.state.isSidebarExpanded;
      }
    }
  } catch {}
  return true; // safe default = expanded
};

export const useUIStore = create(
  persist(
    (set) => ({
      isSidebarExpanded: _getInitialSidebarState(),
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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        isSidebarExpanded: state.isSidebarExpanded,
        openGroups: state.openGroups
      }),
    }
  )
);
