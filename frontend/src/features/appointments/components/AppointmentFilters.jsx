import React from 'react';
import { Filter, Calendar, Users, SlidersHorizontal, Search, Phone, Globe, Share2 } from 'lucide-react';
import { Button } from '@/shared/components/ui';

/**
 * 🛰 AppointmentFilters — Filter & Search Row
 * Based on Blueprint row 2.
 */
const AppointmentFilters = ({ activeTab, setActiveTab, filters, setFilters }) => {
   const tabs = [
      { id: 'ALL', label: 'All Global' },
      { id: 'SCHEDULED', label: 'Confirmed' },
      { id: 'PENDING', label: 'Pending' },
      { id: 'CANCELLED', label: 'Cancelled' }
   ];

   const options = [
      { label: 'This Week', icon: Calendar },
      { label: 'Dr. Sarah Ahmed', icon: Users },
      { label: 'Channel: Web', icon: Globe },
   ];

   return (
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 bg-white/50 dark:bg-slate-900/10 backdrop-blur-3xl p-4 lg:p-6 rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-2als">
         
         {/* 🏷 Status Filter Tabs */}
         <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm scrollbar-hide overflow-x-auto shrink-0">
            {tabs.map((tab) => (
               <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 min-w-max ${
                     activeTab === tab.id 
                        ? 'bg-slate-900 text-white dark:bg-accent-primary dark:text-white shadow-lg' 
                        : 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
               >
                  {tab.label}
               </button>
            ))}
         </div>

         {/* ⚙ Operational Filters */}
         <div className="flex items-center gap-3 lg:gap-4 scrollbar-hide overflow-x-auto min-w-0 flex-1 lg:justify-end">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-sm min-w-max">
               <Calendar size={14} className="text-accent-primary" /> Today
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-sm min-w-max">
               <Users size={14} className="text-indigo-400" /> All Doctors
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-sm min-w-max">
               <SlidersHorizontal size={14} className="text-emerald-500" /> More Settings
            </div>
            
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10 hidden lg:block mx-1" />

            <div className="flex items-center gap-4 shrink-0">
               <div className="flex flex-col text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Active Filters</p>
                  <p className="text-[14px] font-black text-slate-900 dark:text-white italic tracking-tighter tabular-nums mt-1 uppercase">04 Combined</p>
               </div>
               <button className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                  <Globe size={18} />
               </button>
            </div>
         </div>
      </div>
   );
};

export default AppointmentFilters;
