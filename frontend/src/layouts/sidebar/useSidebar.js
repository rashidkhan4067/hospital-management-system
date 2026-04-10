import { useUIStore } from '@/core/store/useUIStore';


/**
 * 🛰️ useSidebar (Zustand MD3 Adapter)
 * Wraps the central UI store for consistent navigation logic.
 */
export const useSidebar = () => {
  const isExpanded = useUIStore((state) => state.isSidebarExpanded);
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const setIsMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);
  
  const openGroups = useUIStore((state) => state.openGroups);
  const toggleGroup = useUIStore((state) => state.toggleGroup);

  // Persistence is now handled by Zustand middleware
  return {
    isExpanded,
    isMobile: window.innerWidth < 768,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleSidebar,
    isGroupOpen: (groupId) => !!openGroups[groupId],
    toggleGroup
  };
};


