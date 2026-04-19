import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 🛰️ SidebarItem (MD3 Standard)
 * Implementation of Google Material 3 Navigation Item behavior.
 * Supports active indicators, badges, and AI-specific highlights.
 */
const SidebarItem = ({ 
  label, 
  path, 
  icon: Icon, 
  badge, 
  pulse, 
  isAI, 
  isExpanded, 
  onNavigate 
}) => {
  const location = useLocation();
  const isActive = location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));

  // 🎨 MD3 Color Tokens
  const primary = isAI ? 'var(--m3-text-main)' : 'var(--m3-primary)';
  const onPrimaryContainer = isAI ? 'var(--m3-text-main)' : 'var(--m3-text-main)'; // Using text main for consistency in contrast
  const primaryContainer = isAI ? 'var(--m3-surface-variant)' : 'var(--m3-primary-container)';
  const onSurfaceVariant = 'var(--m3-text-sub)';

  return (
    <NavLink 
      to={path} 
      onClick={onNavigate}
      className={`relative flex items-center h-14 w-full group transition-all duration-300 ${isExpanded ? 'px-4' : 'justify-center'}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* 🔮 Active State Indicator Shard */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            layoutId="sidebar-active-pill"
            className="absolute inset-y-1.5 left-3 right-3 rounded-[28px] z-0"
            style={{ backgroundColor: primaryContainer }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </AnimatePresence>

      {/* 🔘 Hover Interaction Overlay */}
      <div className="absolute inset-y-1.5 left-3 right-3 rounded-[28px] bg-primary opacity-0 group-hover:opacity-8 transition-opacity z-1" />

      {/* 🧭 Icon Hub */}
      <div className={`relative z-10 flex items-center transition-all ${isExpanded ? 'ml-4 gap-4' : 'justify-center w-14 h-14 rounded-full'}`}>
        <div className={`flex items-center justify-center ${isActive ? '' : ''}`}>
           <Icon fill={isActive} style={{ color: isActive ? primary : onSurfaceVariant }} />
        </div>

        {/* 🏷️ Label Cluster */}
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-grow flex items-center justify-between overflow-hidden"
          >
            <span className={`text-sm font-medium tracking-tight whitespace-nowrap ${isActive ? 'font-bold' : ''}`} style={{ color: isActive ? onPrimaryContainer : onSurfaceVariant }}>
              {label}
            </span>

            <div className="flex items-center gap-2">
                {pulse && (
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                )}
                {badge && (
                    <span className="min-w-[18px] h-[18px] px-1 bg-error text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white">
                        {badge}
                    </span>
                )}
            </div>
          </motion.div>
        )}
      </div>

      {/* 🫧 MD3 Rail Tooltip */}
      {!isExpanded && (
        <div className="absolute left-[calc(100%+8px)] px-3 py-1.5 bg-text-sub text-surface-bright text-[11px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[250] shadow-xl pointer-events-none">
            {label}
            {badge && <span className="ml-2 text-primary-container font-black">· {badge}</span>}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-text-sub" />
        </div>
      )}
    </NavLink>
  );
};

export default SidebarItem;
