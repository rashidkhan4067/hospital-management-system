import React from 'react';
import { Plus, Mic, Search, Filter, Calendar, Activity } from 'lucide-react';
import { Button } from '@/shared/components/ui';

/**
 * AppointmentHeader — Compact 2-tier layout matching AnalyticsHeader
 */
const AppointmentHeader = ({ onBook, onTalkToSana, searchTerm, setSearchTerm, statusFilter, onStatusFilter, userRole = 'admin' }) => {
   const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
   });

   const statuses = ['All', 'Scheduled', 'Completed', 'Pending', 'Cancelled'];

   return (
      <div className="flex flex-col gap-4 w-full mb-8 mt-4">
         {/* ── Top Tier: Title + Actions ── */}
         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left: Page anchor */}
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-3">
                  <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">
                     {userRole === 'patient' ? 'My Appointments' : 'Clinical Appointments'}
                  </h1>
                  <div className="px-3 py-1 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase italic shadow-sm flex items-center gap-2">
                     <Activity size={12} className="animate-pulse" /> Live Schedule
                  </div>
               </div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-0.5 italic">
                  {today} • <span className="text-accent-primary italic">Appointment Hub Synchronized</span>
               </p>
            </div>

            {/* Right: Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl p-2 rounded-[1.5rem] border border-slate-200 dark:border-white/10 shadow-2als">
               <Button
                  onClick={onBook}
                  className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-primary/90 hover:scale-105 transition-all shadow-lg shadow-accent-primary/25 border-none"
               >
                  <Plus size={16} strokeWidth={3} /> Book New
               </Button>
               <Button
                  onClick={onTalkToSana}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white/5 hover:bg-slate-800 dark:hover:bg-white/10 text-white dark:text-accent-primary rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg border border-slate-700 dark:border-accent-primary/30 transition-all"
               >
                  <Mic size={16} className="animate-pulse" /> Talk to Sana
               </Button>
            </div>
         </div>

         {/* ── Bottom Tier: Search + Status Filter Chips ── */}
         <div className="flex flex-wrap items-center gap-3 bg-white/50 dark:bg-slate-900/20 backdrop-blur-xl p-3 rounded-3xl border border-slate-200/50 dark:border-white/5">
            {/* Search */}
            <div className="relative flex-1 min-w-[220px] group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-accent-primary transition-colors" size={14} />
               <input
                  type="text"
                  placeholder="Search patient, doctor, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-5 py-3 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 rounded-2xl text-[11px] font-black text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-accent-primary/50 transition-all shadow-inner"
               />
            </div>

            {/* Status Chips */}
            <div className="hidden md:flex items-center gap-2">
               {statuses.map((s) => (
                  <button
                     key={s}
                     onClick={() => onStatusFilter?.(s)}
                     className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wide transition-all italic border ${
                        statusFilter === s
                           ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20'
                           : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 hover:text-accent-primary hover:border-accent-primary/30'
                     }`}
                  >
                     {s}
                  </button>
               ))}
            </div>

            {/* Filter CTA */}
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all shadow-md italic">
               <Filter size={13} /> Filter
            </button>
         </div>
      </div>
   );
};

export default AppointmentHeader;
