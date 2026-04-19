import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarItem from './SidebarItem';

/**
 * 📂 SidebarGroup (MD3 Implementation)
 * Enforces section categorization with collapsible hierarchies.
 * Features: Chevron rotation, 1px separation lines, and tonal label hierarchy.
 */
const SidebarGroup = ({ 
  label, 
  items, 
  isOpen, 
  onToggle, 
  isExpanded, 
  isMobile,
  onNavigate 
}) => {
  return (
    <div className="flex flex-col mb-4 overflow-hidden">
      {/* 🧭 Section Divider Line (MD3 Spec) */}
      <div className="w-full h-px bg-outline-variant/30 mx-0 my-2" />

      {/* 🏷️ Group Category Header */}
      {isExpanded ? (
        <button 
          onClick={onToggle}
          className="flex items-center justify-between px-6 py-4 hover:bg-surface-variant/40 rounded-full transition-all group"
          aria-expanded={isOpen}
        >
          <div className="flex flex-col items-start">
             <span className="text-[11px] font-black uppercase tracking-[0.15em] text-text-sub opacity-70 group-hover:opacity-100 transition-opacity">
                {label}
             </span>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-text-sub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
               <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </button>
      ) : (
        <div className="flex justify-center my-4">
             <div className="w-6 h-px bg-outline-variant/40 rounded-full" />
        </div>
      )}

      {/* 🧱 Item Grid Shell */}
      <AnimatePresence initial={false}>
        {(isOpen || !isExpanded) && (
          <motion.div
            initial={isExpanded ? { height: 0, opacity: 0 } : {}}
            animate={{ height: "auto", opacity: 1 }}
            exit={isExpanded ? { height: 0, opacity: 0 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col gap-1 overflow-hidden"
          >
            {items.map((item) => (
              <SidebarItem 
                key={item.path} 
                {...item} 
                isExpanded={isExpanded} 
                onNavigate={onNavigate}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarGroup;
