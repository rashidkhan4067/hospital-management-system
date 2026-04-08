import React, { memo } from 'react';
import { Heart, LogOut, ChevronLeft, ChevronRight, User, X } from 'lucide-react';
import { useAuth } from '@/core/auth/AuthContext';
import { useUI } from '@/core/ui/UIContext';
import { ROLES } from '@/core/constants';
import { getNavigationByRole, COMMON_NAV } from '@/core/constants/navigation';
import SidebarLink from '@/components/primitives/SidebarLink';
import { motion, AnimatePresence } from 'framer-motion';

// 🚀 Importing Elite Admin Control Lateral
import AdminSidebar from './AdminSidebar';


/**
 * Enhanced Universal Sidebar: Unified, DRY architecture for Doctors, Patients, and Admin
 * Features: Hardened Mobile Drawers, Desktop Collapse, and Tooltip Shards.
 */
const Sidebar = memo(() => {
  const { role, logout, user } = useAuth();
  const { isSidebarCollapsed, toggleSidebarCollapse, isMobileMenuOpen, setIsMobileMenuOpen, isMobile } = useUI();

  // 🛡️ ELITE ADMIN BYPASS
  if (role === ROLES.ADMIN) return <AdminSidebar />;

  const { primary } = getNavigationByRole(role);

  return (
    <>
      {/* 📱 Mobile Overlay Shard - High Z-Index */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[2000] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ 
          width: isMobile ? 260 : (isSidebarCollapsed ? 80 : 256),
          x: isMobile ? (isMobileMenuOpen ? 0 : -260) : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 lg:sticky lg:top-0 h-full lg:h-screen bg-slate-50 dark:bg-slate-900/90 border-r border-slate-200 dark:border-white/5 z-[2001] flex flex-col shrink-0 shadow-[10px_0_40px_rgba(0,0,0,0.05)] transition-all font-sans overflow-visible"
      >
        <div className="p-6 min-h-[80px] flex items-center justify-between overflow-hidden">
          <div className="sidebar-brand flex items-center gap-3 px-2 text-slate-900 dark:text-white font-extrabold text-2xl tracking-tighter shrink-0">
            <Heart className="text-blue-600 shrink-0" fill="currentColor" /> 
            {(!isSidebarCollapsed || isMobile) && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Al Shifaa</motion.span>}
          </div>
          
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* 🔘 Collapse Shard (Desktop Only) */}
        {!isMobile && (
          <button 
            onClick={toggleSidebarCollapse}
            className="absolute -right-3.5 top-10 w-7 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:scale-110 transition-all shadow-xl z-[2002] hidden lg:flex"
          >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}

        <nav className="sidebar-links flex flex-col gap-1 px-4 py-8 flex-1 overflow-y-auto custom-scrollbar">
          {primary.map((link) => (
             <SidebarLink key={link.to} {...link} isCollapsed={!isMobile ? isSidebarCollapsed : false} />
          ))}
        </nav>

        <div className="sidebar-footer mt-auto p-4 border-t border-slate-200 dark:border-white/5 space-y-4">
          <div className={`flex items-center gap-3 px-4 overflow-hidden`}>
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                {user?.photoURL ? <img src={user.photoURL} alt="pfp" className="w-full h-full object-cover rounded-full" /> : <User size={16} />}
              </div>
              {(!isSidebarCollapsed || isMobile) && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col min-w-0">
                  <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase truncate">{user?.displayName || 'User'}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest truncate">{role}</span>
                </motion.div>
              )}
           </div>

          <div className="flex flex-col gap-1">
            {COMMON_NAV.map((link) => (
              <SidebarLink key={link.to} {...link} isCollapsed={!isMobile ? isSidebarCollapsed : false} />
            ))}
            
            <button 
              onClick={logout}
              className={`flex items-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 font-medium text-sm ${isSidebarCollapsed && !isMobile ? 'justify-center p-3' : 'gap-4 px-6 py-4 mt-2'}`}
            >
              <LogOut size={20} className="shrink-0" />
              {(!isSidebarCollapsed || isMobile) && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
});

export default Sidebar;
