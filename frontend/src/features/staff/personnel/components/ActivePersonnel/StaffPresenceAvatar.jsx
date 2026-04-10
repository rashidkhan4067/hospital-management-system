import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 👤 StaffPresenceAvatar
 * High-fidelity employee identity node with live presence status indicator.
 */
const StaffPresenceAvatar = ({ staff }) => {
  const isAvailable = staff.status === 'Available';

  return (
    <div className="relative group/doc cursor-pointer">
      <motion.div 
        whileHover={{ scale: 1.1, rotate: -3 }}
        className="w-12 h-12 rounded-[18px] bg-white dark:bg-slate-800 p-0.5 border border-slate-100 dark:border-white/5 overflow-hidden shadow-xl relative z-0"
      >
        <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-100 dark:bg-slate-700">
          <img 
            src={staff.avatar} 
            className="w-full h-full object-cover grayscale group-hover/doc:grayscale-0 transition-all duration-700 scale-110 group-hover/doc:scale-100" 
            alt={staff.name} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
          {!staff.avatar && (
            <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-slate-400">
              {staff.initials}
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover/doc:opacity-100 transition-opacity" />
      </motion.div>
      
      {/* 🟢 Live Presence Indicator */}
      <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 shadow-2xl z-10 ${
        isAvailable ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-amber-500 shadow-[0_0_12px_#f59e0b]'
      }`}>
        <div className={`w-full h-full rounded-full animate-ping opacity-40 ${
          isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
        }`} />
      </div>

      {/* 🏷️ Identity Hover Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/doc:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-2 group-hover/doc:translate-y-0 z-50">
           <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg shadow-2xl border border-white/10 whitespace-nowrap">
                <p className="text-[10px] font-black italic">{staff.name}</p>
                <p className="text-[7px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{staff.location}</p>
           </div>
           <div className="w-2 h-2 bg-slate-900 rotate-45 mx-auto -mt-1 border-r border-b border-white/10" />
      </div>
    </div>
  );
};

export default StaffPresenceAvatar;
