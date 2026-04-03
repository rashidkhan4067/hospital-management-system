import React from 'react';
import { ChevronDown, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavbarProfileMenu({ user, logout, isOpen, onToggle, close }) {
  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300"
      >
        <div className="w-9 h-9 rounded-xl bg-accent-primary/10 border border-accent-primary/20 p-0.5 shadow-sm overflow-hidden shrink-0">
           <img 
             src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=transparent&color=0f172a&bold=true`} 
             className="w-full h-full rounded-lg object-cover" 
             alt="pfp" 
           />
        </div>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-500 hidden sm:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-14 right-0 w-64 glass-card z-[100] origin-top-right shadow-[0_20px_50px_rgba(37,99,235,0.15)]"
          >
             <div className="p-4 bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated Shard</p>
                <p className="text-xs font-black text-slate-900 dark:text-white truncate uppercase italic">{user?.email}</p>
             </div>
             <div className="p-2">
                <Link 
                  to="/admin/profile" 
                  onClick={close}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-[11px] font-black uppercase italic group dark:text-white"
                >
                   <User size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" /> Profile Control
                </Link>
                <button onClick={logout} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors text-[11px] font-black uppercase italic group">
                   <LogOut size={14} className="group-hover:rotate-12 transition-transform" /> Sign Out Shard
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
