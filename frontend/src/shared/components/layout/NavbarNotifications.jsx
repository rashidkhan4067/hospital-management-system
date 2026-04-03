import React from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavbarNotifications({ notifications, isOpen, onToggle }) {
  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors relative group"
      >
        <Bell size={18} className="text-slate-500 group-hover:text-slate-900 transition-colors" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm animate-in zoom-in duration-300">
            {notifications.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-14 right-0 w-80 glass-card z-[100] origin-top-right shadow-[0_20px_50px_rgba(37,99,235,0.15)]"
          >
            <div className="p-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
              <h3 className="text-xs font-black uppercase italic tracking-tight">Clinical Alerts</h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-600 text-[10px] font-black uppercase">
                {notifications.length} Nodes
              </span>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-default">
                    <div className="flex gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        n.type === 'error' ? 'bg-red-500' : 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]'
                      }`} />
                      <div>
                        <p className="text-[11px] font-black translate-y-[-1px] text-slate-900 dark:text-white uppercase leading-tight italic">{n.message}</p>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">Just now • Gate-L01 Shard</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 flex flex-col items-center justify-center gap-4 opacity-40">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                    <Bell size={20} />
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em]">No Active Alerts</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
