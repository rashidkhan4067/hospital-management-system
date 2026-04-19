import { useUIStore } from '@/core/store/useUIStore';
import { useBreakpoint } from '@/core/hooks/useBreakpoint';

/**
 * 🛰️ useSidebar (Zustand MD3 Adapter)
 * Wraps the central UI store for consistent navigation logic.
 */
export const useSidebar = () => {
  const isExpanded = useUIStore((state) => state.isSidebarExpanded);
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  const isMobile = !useBreakpoint(1024);
  
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const setSidebarExpanded = useUIStore((state) => state.setSidebarExpanded);
  const setIsMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);
  
  const openGroups = useUIStore((state) => state.openGroups);
  const toggleGroup = useUIStore((state) => state.toggleGroup);

  return {
    isExpanded,
    isMobile,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleSidebar,
    setSidebarExpanded,
    isGroupOpen: (groupId) => !!openGroups[groupId],
    toggleGroup
  };
};


