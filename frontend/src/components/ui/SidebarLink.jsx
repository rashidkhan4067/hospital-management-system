import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 🏨 Enterprise Sidebar Link
 * Supports expanded/collapsed states with tooltips and high-contrast professional styling.
 */
const SidebarLink = ({ to, label, icon: Icon, isCollapsed, variant = 'base', end = false }) => {
  return (
    <NavLink 
      to={to} 
      end={end}
      className={({ isActive }) => `
        flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative
        ${isActive 
          ? 'bg-accent-primary/5 text-accent-primary shadow-sm border border-accent-primary/10' 
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}
        ${isCollapsed ? 'justify-center px-0 w-12 mx-auto' : 'px-4'}
      `}
    >
      {({ isActive }) => (
        <>
          <div className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 opacity-80'}`}>
             <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-accent-primary' : 'text-current'} />
          </div>

          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-[11px] font-black tracking-tight uppercase font-sans italic truncate whitespace-nowrap"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* 🔘 Active Indicator Shard */}
          {isActive && !isCollapsed && (
            <motion.div 
              layoutId="sideActive"
              className="absolute right-4 w-1 h-4 bg-accent-primary rounded-full shadow-[0_0_10px_rgba(var(--color-accent-primary),0.4)]" 
            />
          )}

          {/* 🧊 Tooltip (Only for Collapsed State) */}
          {isCollapsed && (
            <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 z-[1100] shadow-2xl whitespace-nowrap border border-white/10">
              {label}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-white/10 w-2 h-2 bg-slate-900 rotate-45" />
            </div>
          )}
        </>
      )}
    </NavLink>
  );
};

export default SidebarLink;
