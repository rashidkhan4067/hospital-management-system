import React from 'react';
import { Plus, Mic, Search, Calendar, Bell } from 'lucide-react';
import { Button } from '@/shared/components/ui';

/**
 * 🛰 AppointmentHeader — Role-aware greeting & Quick Actions
 * Based on Blueprint row 1.
 */
const AppointmentHeader = ({ onBook, onTalkToSana, searchTerm, setSearchTerm, userRole = 'admin' }) => {
   const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
   });

   return (
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 mt-4">
         {/* 🏷 Role-Aware Greeting Matrix */}
         <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
               <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">
                  {userRole === 'patient' ? 'My Appointments' : 'Clinical Appointments'}
               </h1>
               <div className="px-3 py-1 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase italic shadow-sm flex items-center gap-2">
                  <Calendar size={12} /> Live Dashboard
               </div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 italic">
               {today} • <span className="text-accent-primary italic">Operational Status: Nominal</span>
            </p>
         </div>

         {/* 🛠 Quick Actions Bar */}
         <div className="flex flex-wrap items-center gap-3 lg:gap-4 bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl p-2 rounded-[1.5rem] border border-slate-200 dark:border-white/10 shadow-2als">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-accent-primary transition-colors" size={16} />
               <input 
                  type="text"
                  placeholder="Search patient / doctor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-6 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 text-[11px] font-black text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-accent-primary/50 transition-all w-full lg:w-64"
               />
            </div>

            <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 hidden lg:block" />

            <div className="flex items-center gap-3">
               <Button 
                  onClick={onBook}
                  className="bg-accent-primary hover:bg-accent-primary/90 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 border-none flex items-center gap-2"
               >
                  <Plus size={16} /> Book New
               </Button>
               <Button 
                  onClick={onTalkToSana}
                  className="bg-slate-900 dark:bg-white/5 hover:bg-slate-800 dark:hover:bg-white/10 text-white dark:text-accent-primary px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg border border-slate-700 dark:border-accent-primary/30 flex items-center gap-2"
               >
                  <Mic size={16} className="animate-pulse" /> Talk to Sana
               </Button>
            </div>
         </div>
      </div>
   );
};

export default AppointmentHeader;
