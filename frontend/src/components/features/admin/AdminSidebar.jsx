import React, { useEffect } from 'react';
import { Activity, LogOut, ChevronLeft, ChevronRight, User, X } from 'lucide-react';
import SidebarLink from '../../ui/SidebarLink';
import { ADMIN_NAV } from '../../../constants/navigation';
import { useAuth } from '../../../context/AuthContext';
import { useUI } from '../../../context/UIContext';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 🍏 Elite Admin Sidebar HUB
 * Features Dual-State (Expanded/Collapsed), Mobile Drawer, and Categorical Matrix.
 */
export default function AdminSidebar() {
  const { logout, user } = useAuth();
  const { 
    isSidebarCollapsed, 
    toggleSidebarCollapse, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen,
    windowWidth 
  } = useUI();

  const isMobile = windowWidth < 1024;

  return (
    <>
      {/* 📱 Mobile Overlay Shard - High Z-Index & Interactive Dimmer */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[5000] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ 
          // Use windowWidth for reactive layout calculations
          width: isMobile ? 280 : (isSidebarCollapsed ? 80 : 288),
          x: isMobile ? (isMobileMenuOpen ? 0 : -280) : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 lg:sticky lg:top-0 h-full lg:h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-white/5 z-[5001] flex flex-col shrink-0 shadow-[10px_0_40px_rgba(37,99,235,0.05)] font-sans overflow-visible transition-colors`}
      >
        
        {/* 🚀 System Console Branding */}
        <div className="p-6 pb-2 min-h-[100px] flex items-center justify-between">
          <div className="flex items-center gap-4 px-2 overflow-hidden">
            <div className="w-10 h-10 bg-accent-primary rounded-xl flex items-center justify-center shadow-lg shadow-accent-primary/20 shrink-0">
               <Activity size={20} className="text-white relative z-10" />
            </div>
            {(!isSidebarCollapsed || isMobile) && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col whitespace-nowrap"
              >
                <span className="text-lg font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none font-display">Al Shifaa</span>
                <span className="text-[8px] font-black text-accent-primary uppercase tracking-[0.2em] mt-1.5 italic opacity-60">Admin HUB L9</span>
              </motion.div>
            )}
          </div>

          {/* Close button for mobile - Explicit Touch Point */}
          {isMobile && (
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-red-500 transition-colors"
              aria-label="Close Mobile Nav"
            >
              <X size={20} strokeWidth={3} />
            </button>
          )}
        </div>

        {/* 🔘 Collapse Shards - Desktop Only Toggle */}
        {!isMobile && (
          <button 
            onClick={toggleSidebarCollapse}
            className="absolute -right-3.5 top-12 w-7 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-accent-primary hover:scale-110 transition-all shadow-xl z-[5002] flex"
            aria-label={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}

        {/* 🛠️ Nav Matrix Hub */}
        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar space-y-8 py-8 scroll-smooth h-full">
          {ADMIN_NAV.map((section) => (
            <div key={section.category} className="space-y-1">
              {(!isSidebarCollapsed || isMobile) && (
                <div className="px-4 pb-2 flex items-center gap-4">
                   <p className="text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.4em] italic truncate">{section.category}</p>
                   <div className="h-px flex-1 bg-slate-100 dark:bg-white/5 opacity-50" />
                </div>
              )}
              
              <div className="flex flex-col gap-1">
                {section.items.map(link => (
                  <SidebarLink 
                    key={link.to} 
                    {...link} 
                    isCollapsed={!isMobile && isSidebarCollapsed}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)} // Close on navigate
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 🔮 Identity Trace Shard */}
        <div className="p-4 bg-slate-50/50 dark:bg-black/20 border-t border-slate-200 dark:border-white/5 relative z-10 space-y-4">
           <div className={`flex items-center gap-4 px-4 overflow-hidden`}>
              <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 shadow-inner">
                {user?.photoURL ? <img src={user.photoURL} alt="pfp" className="w-full h-full object-cover rounded-full" /> : <User size={18} />}
              </div>
              {(!isSidebarCollapsed || isMobile) && (
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase truncate">{user?.displayName || 'Admin'}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest truncate">{user?.role}</span>
                </div>
              )}
           </div>

           <button 
             onClick={logout}
             className={`w-full flex items-center rounded-xl bg-red-500/5 text-red-500 hover:bg-red-500/10 transition-all duration-300 font-sans italic text-[11px] font-black uppercase tracking-tight group ${!isMobile && isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-3.5'}`}
           >
             <div className="flex items-center gap-3">
               <LogOut size={16} strokeWidth={2.5} />
               {(!isSidebarCollapsed || isMobile) && <span>Terminate</span>}
             </div>
           </button>
        </div>
      </motion.aside>
    </>
  );
}
