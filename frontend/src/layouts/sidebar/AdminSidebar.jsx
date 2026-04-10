import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ChevronLeft, ChevronRight, UserCircle } from 'lucide-react';
import { useSidebar } from './useSidebar';
import { NAV_SECTIONS } from './sidebarNav';
import SidebarGroup from './SidebarGroup';
import SidebarDrawer from './SidebarDrawer';
import { useAuthStore } from '@/core/store/useAuthStore';

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

  const width = isMobile ? 0 : (isExpanded ? 280 : 80);

  // 🏥 Branding Cluster Component
  const BrandHead = () => (
    <div className={`flex items-center gap-4 px-6 h-[72px] mb-4 border-b border-outline-variant/30 ${!isExpanded && !isMobile ? 'justify-center p-0' : ''}`}>
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-xl font-black shadow-lg shadow-primary/20 shrink-0">
        S
      </div>
      {(isExpanded || isMobile) && (
        <div className="flex flex-col">
          <span className="text-[18px] font-black text-[#6750A4] tracking-tight leading-none uppercase">Shifaa</span>
          <span className="text-[10px] font-bold text-[#49454F] tracking-[0.2em] opacity-40 uppercase">Intelligence Matrix</span>
        </div>
      )}
    </div>
  );

  // 👤 Profile Command Cluster Component
  const ProfileCommand = () => {
    const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD';
    return (
      <div className={`mt-auto bg-surface border-t border-outline-variant/30 p-4 ${!isExpanded && !isMobile ? 'flex flex-col items-center gap-6 p-2' : ''}`}>
        <div className={`flex items-center gap-4 ${isExpanded ? 'px-2 py-2 mb-4 bg-surface-variant/20 rounded-2xl' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-[#EADDFF] flex items-center justify-center text-[#21005D] text-sm font-black ring-1 ring-[#6750A4]/10 shrink-0">
            {initials}
          </div>
          {(isExpanded || isMobile) && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#1C1B1F] truncate group-hover:text-primary transition-colors">{user?.name || 'Director Rashid'}</span>
              <span className="text-[10px] font-black text-[#49454F] uppercase tracking-[0.1em] opacity-60 truncate">{user?.role || 'Administrator'}</span>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className={`w-full flex items-center transition-all hover:bg-error/5 text-[#B3261E] rounded-full group ${isExpanded || isMobile ? 'gap-4 px-4 py-3 bg-surface-variant/10' : 'justify-center w-12 h-12 hover:bg-error/10 mx-auto'}`}
          title="Command Logout"
        >
          <LogOut size={20} className="shrink-0 group-hover:scale-110 transition-transform" />
          {(isExpanded || isMobile) && (
            <span className="text-[11px] font-black uppercase tracking-[0.4em] scale-90 -translate-x-1 underline-offset-4 decoration-2">Logout System</span>
          )}
        </button>

        {/* 🔘 Expansion Toggle (MD3 Standard Rail Control) */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={`mt-4 w-full flex items-center transition-all hover:bg-primary/5 text-[#49454F] rounded-full group ${isExpanded ? 'gap-4 px-4 py-3' : 'justify-center w-12 h-12 mx-auto'}`}
          >
            {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            {isExpanded && <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#49454F]/60">Collapse Console</span>}
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {/* 🧭 Structural Navigation Layer (Permanent Rail/Drawer) */}
      {!isMobile && (
        <motion.aside
          initial={false}
          animate={{ width }}
          transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
          className="h-screen bg-[#FEF7FF] flex flex-col border-r border-[#CAC4D0]/40 shrink-0 relative z-[101]"
          aria-label="Admin Navigation Console"
        >
          <BrandHead />

          <div className="flex-1 overflow-y-auto px-1 custom-scrollbar scroll-smooth">
            {NAV_SECTIONS.map((section) => (
              <SidebarGroup
                key={section.id}
                label={section.label}
                items={section.items}
                isExpanded={isExpanded}
                isMobile={false}
                isOpen={isGroupOpen(section.id)}
                onToggle={() => toggleGroup(section.id)}
              />
            ))}
          </div>

          <ProfileCommand />
        </motion.aside>
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

