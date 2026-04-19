import React from 'react';
// motion/AnimatePresence still needed for mobile drawer
import { AnimatePresence } from 'framer-motion';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebar } from './useSidebar';
import { NAV_SECTIONS } from './sidebarNav';
import SidebarGroup from './SidebarGroup';
import SidebarDrawer from './SidebarDrawer';
import { useAuthStore } from '@/core/store/useAuthStore';
import { useUIStore } from '@/core/store/useUIStore';

// ─── Read sidebar preference sync, before any React render ───────────────────
// This eliminates the Zustand-persist rehydration flash entirely:
// the value here is read ONCE at module load, before the component mounts.
const _readSidebarPref = () => {
  try {
    // Try Zustand's own storage key first
    const z = localStorage.getItem('shifaa-ui-storage');
    if (z) {
      const parsed = JSON.parse(z);
      if (typeof parsed?.state?.isSidebarExpanded === 'boolean')
        return parsed.state.isSidebarExpanded;
    }
    // Fallback: UIContext's legacy key
    const legacy = localStorage.getItem('sidebar_collapsed');
    if (legacy !== null) return !JSON.parse(legacy);
  } catch {}
  return window.innerWidth >= 1280; // safe default for first-ever visit
};

// Module-level constant — evaluated ONCE before any component renders
const INITIAL_EXPANDED = _readSidebarPref();

/**
 * 🛰️ AdminSidebar (MD3 Master Orchestrator)
 * Responsive Navigation Framework for Shifaa HMS.
 * Implements 280px Expanded, 80px Rail, and 0px Hidden states.
 */
const AdminSidebar = () => {
  const { user, logout } = useAuthStore();
  const {
    isExpanded,
    toggleSidebar,
    isMobile,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isGroupOpen,
    toggleGroup
  } = useSidebar();

  // isMounted: suppress transition on first render, enable after paint
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => { setIsMounted(true); }, []);

  // Use INITIAL_EXPANDED for the very first render to avoid flash;
  // after mount, follow the live Zustand store for toggle interactions.
  const effectiveExpanded = isMounted ? isExpanded : INITIAL_EXPANDED;
  const width = isMobile ? 0 : (effectiveExpanded ? 280 : 80);


  // 🏥 Branding Cluster Component
  const BrandHead = () => (
    <div className={`flex items-center gap-4 px-6 h-[72px] mb-4 border-b border-outline-variant/30 ${!effectiveExpanded && !isMobile ? 'justify-center p-0' : ''}`}>
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-xl font-black shadow-lg shadow-primary/20 shrink-0">
        S
      </div>
      {(effectiveExpanded || isMobile) && (
        <div className="flex flex-col">
          <span className="text-[18px] font-black text-primary tracking-tight leading-none uppercase">Shifaa</span>
          <span className="text-[10px] font-bold text-text-sub tracking-[0.2em] opacity-40 uppercase">Intelligence Matrix</span>
        </div>
      )}
    </div>
  );

  // 👤 Profile Command Cluster Component
  const ProfileCommand = () => {
    return (
      <div className={`mt-auto bg-surface border-t border-outline-variant/30 p-4 ${!effectiveExpanded && !isMobile ? 'flex flex-col items-center gap-6 p-2' : ''}`}>
        <div className={`flex items-center gap-4 ${effectiveExpanded ? 'px-2 py-2 mb-4 bg-surface-variant/20 rounded-2xl' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary text-sm font-black ring-1 ring-primary/10 shrink-0">
            {user?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AD'}
          </div>
          {(effectiveExpanded || isMobile) && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-text-main truncate group-hover:text-primary transition-colors">{user?.full_name || 'Director Rashid'}</span>
              <span className="text-[10px] font-black text-text-sub uppercase tracking-[0.1em] opacity-60 truncate">{user?.role || 'Administrator'}</span>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className={`w-full flex items-center transition-all hover:bg-error/5 text-[#B3261E] rounded-full group ${effectiveExpanded || isMobile ? 'gap-4 px-4 py-3 bg-surface-variant/10' : 'justify-center w-12 h-12 hover:bg-error/10 mx-auto'}`}
          title="Command Logout"
        >
          <LogOut size={20} className="shrink-0 group-hover:scale-110 transition-transform" />
          {(effectiveExpanded || isMobile) && (
            <span className="text-[11px] font-black uppercase tracking-[0.4em] scale-90 -translate-x-1 underline-offset-4 decoration-2">Logout System</span>
          )}
        </button>

        {/* 🔘 Expansion Toggle (MD3 Standard Rail Control) */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={`mt-4 w-full flex items-center transition-all hover:bg-primary/5 text-text-sub rounded-full group ${effectiveExpanded ? 'gap-4 px-4 py-3' : 'justify-center w-12 h-12 mx-auto'}`}
          >
            {effectiveExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            {effectiveExpanded && <span className="text-xs font-bold uppercase tracking-[0.1em] text-text-sub/60">Collapse Console</span>}
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {/* 🧭 Structural Navigation Layer (Permanent Rail/Drawer) */}
      {!isMobile && (
        <aside
          style={{
            width,
            transition: isMounted.current ? 'width 0.3s cubic-bezier(0.2,0,0,1)' : 'none',
          }}
          className="h-screen bg-surface flex flex-col border-r border-outline-variant/40 shrink-0 relative z-[101] overflow-hidden"
          aria-label="Admin Navigation Console"
        >
          <BrandHead />

          <div className="flex-1 overflow-y-auto px-1 custom-scrollbar scroll-smooth">
            {NAV_SECTIONS.map((section) => (
              <SidebarGroup
                key={section.id}
                label={section.label}
                items={section.items}
                isExpanded={effectiveExpanded}
                isMobile={false}
                isOpen={isGroupOpen(section.id)}
                onToggle={() => toggleGroup(section.id)}
              />
            ))}
          </div>

          <ProfileCommand />
        </aside>
      )}

      {/* 📱 Mobile Drawer Infrastructure */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <SidebarDrawer
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            user={user}
            logout={logout}
          >
            <BrandHead />
            <div className="flex-1 overflow-y-auto px-1 custom-scrollbar">
              {NAV_SECTIONS.map((section) => (
                <SidebarGroup
                  key={section.id}
                  label={section.label}
                  items={section.items}
                  isExpanded={true}
                  isMobile={true}
                  isOpen={isGroupOpen(section.id)}
                  onNavigate={() => setIsMobileMenuOpen(false)}
                  onToggle={() => toggleGroup(section.id)}
                />
              ))}
            </div>
            <ProfileCommand />
          </SidebarDrawer>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;

