import React from 'react';
import { Plus, Search, Bell, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/core/auth/AuthContext';

/**
 * Row 1 — DashboardHeader
 * Page title + date greeting on left, quick actions on right.
 */
const DashboardHeader = ({ onNewAppointment, onSearch, currentTime }) => {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 mt-4">
      {/* 🏷 Page Anchor & Greeting Matrix */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">
            Clinical Dashboard
          </h1>
          <div className="px-3 py-1 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase italic shadow-sm flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
            Live System
          </div>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 italic">
          Welcome, <span className="text-accent-primary">{user?.displayName?.split(' ')[0] || 'Admin'}</span> · {today}
        </p>
      </div>

      {/* 🛠 Strategic Action Nodes */}
      <div className="flex flex-wrap items-center gap-3 lg:gap-4 bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl p-2 rounded-[1.5rem] border border-slate-200 dark:border-white/10 shadow-2als">
        <div className="relative group hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-accent-primary transition-colors" size={16} />
          <input
            placeholder="Search Intelligence..."
            onClick={onSearch}
            readOnly
            className="pl-11 pr-6 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-white/5 text-[11px] font-black text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-accent-primary/50 transition-all w-48 cursor-pointer"
          />
        </div>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 hidden lg:block" />

        <div className="flex items-center gap-3">
          <button className="relative w-11 h-11 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-accent-primary hover:border-accent-primary/30 transition-all group">
            <Bell size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[8px] font-black flex items-center justify-center border-2 border-white dark:border-slate-800">3</span>
          </button>

          <button
            onClick={onNewAppointment}
            className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-primary/90 hover:scale-105 transition-all shadow-lg shadow-accent-primary/25 border-none"
          >
            <Plus size={16} strokeWidth={3} />
            New Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
