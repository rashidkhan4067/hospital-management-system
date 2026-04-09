import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  X,
  Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/core/auth/AuthContext';
import { useUI } from '@/core/ui/UIContext';
import { ADMIN_NAV } from '@/core/constants/navigation';

/**
 * 🧭 SideNavigation (Material 3 Spec)
 * Permanent sidebar on desktop, collapsible drawer on mobile.
 * Features: Pill active states, grouped labels, and tonal separation.
 */
export default function SideNavigation() {
  const { user, logout } = useAuth();
  const {
    isSidebarCollapsed,
    toggleSidebarCollapse,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMobile
  } = useUI();

  const sidebarWidth = isSidebarCollapsed ? 80 : 280;

  return (
    <>
      {/* 📱 Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        style={{ width: isMobile ? 280 : sidebarWidth }}
        className={`
          flex flex-col bg-surface border-r border-outline-variant transition-all duration-300 shrink-0 z-[201]
          ${isMobile
            ? 'fixed top-0 left-0 h-screen shadow-xl ' + (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full')
            : 'relative h-screen'}
        `}
      >
        {/* 🏥 Identity & Toggle */}
        <div className={`flex items-center justify-between mb-8 h-16 transition-all ${isSidebarCollapsed && !isMobile ? 'px-0 justify-center border-b border-transparent' : 'px-8 border-b border-outline-variant'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <Stethoscope size={28} strokeWidth={2.5} className="text-primary-blue shrink-0" />
            {(!isSidebarCollapsed || isMobile) && (
              <span className="text-xl font-bold text-text-main tracking-tight whitespace-nowrap">Shifaa HMS</span>
            )}
          </div>


          {isMobile && (
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-text-sub hover:text-red-500 transition-colors">
              <X size={20} />
            </button>
          )}
        </div>

        {/* 🔘 Collapse Toggle (Desktop Only) */}
        {!isMobile && (
          <button
            onClick={toggleSidebarCollapse}
            className="absolute -right-3 top-16 w-6 h-6 bg-surface-bright border border-outline-variant rounded-full flex items-center justify-center text-text-sub hover:text-primary-blue shadow-sm z-[202]"
          >
            {isSidebarCollapsed ? <ChevronRight size={12} strokeWidth={3} /> : <ChevronLeft size={12} strokeWidth={3} />}
          </button>
        )}

        {/* 🛠️ Nav Registry Matrix */}
        <div className="flex-1 overflow-y-auto px-4 space-y-8 scroll-smooth h-full custom-scrollbar">
          {ADMIN_NAV.map((section) => (
            <div key={section.category} className="space-y-1">
              {(!isSidebarCollapsed || isMobile) && (
                <p className="text-[10px] font-bold text-text-sub uppercase tracking-[0.2em] px-5 py-2">
                  {section.category}
                </p>
              )}
              <div className="flex flex-col gap-1">
                {section.items.map(link => (
                  <div key={link.to} className={isSidebarCollapsed && !isMobile ? 'px-0' : 'px-1'}>
                    <NavLink
                      to={link.to}
                      onClick={() => isMobile && setIsMobileMenuOpen(false)}
                    >
                      {({ isActive }) => (
                        <div className={`
                          group flex items-center transition-all duration-300 gap-4
                          ${isSidebarCollapsed && !isMobile
                            ? 'h-12 w-12 rounded-2xl justify-center mx-auto'
                            : 'h-11 rounded-full px-5'}
                          ${isActive
                            ? 'bg-primary-blue text-surface-bright font-semibold'
                            : 'text-text-main hover:bg-outline-variant/20'}
                        `}>
                          <div className="shrink-0">
                            <link.icon
                              size={isSidebarCollapsed && !isMobile ? 22 : 20}
                              strokeWidth={isActive ? 2.5 : 2}
                              className="transition-all"
                            />
                          </div>
                          {(!isSidebarCollapsed || isMobile) && (
                            <span className="text-sm tracking-tight truncate">{link.label}</span>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 👤 Account Matrix Footer */}
        <div className={`p-6 bg-surface border-t border-outline-variant mt-auto transition-all ${isSidebarCollapsed && !isMobile ? 'p-4 flex justify-center' : ''}`}>
          <div className={`flex items-center gap-4 py-2 ${isSidebarCollapsed && !isMobile ? 'px-0' : 'px-2'}`}>
            <div className="w-10 h-10 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center text-text-sub shrink-0 shadow-sm">
              <User size={20} />
            </div>
            {(!isSidebarCollapsed || isMobile) && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-text-main truncate uppercase tracking-tight">{user?.email?.split('@')[0]}</span>
                <span className="text-[10px] font-medium text-text-sub uppercase tracking-widest truncate">Administrator</span>
              </div>
            )}
          </div>

          <button
            onClick={logout}
            className={`w-full flex items-center gap-4 px-5 py-3 mt-4 rounded-full text-text-sub hover:text-red-600 hover:bg-red-500/10 transition-all font-medium text-xs
              ${isSidebarCollapsed && !isMobile ? 'justify-center px-0 w-12 h-12 mx-auto mt-6' : ''}
            `}
          >
            <LogOut size={18} />
            {(!isSidebarCollapsed || isMobile) && <span className="uppercase tracking-widest font-bold">Sign Out</span>}
          </button>
        </div>

      </aside>
    </>
  );
}
