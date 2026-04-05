import React from 'react';
import { Calendar, Clock, MapPin, XCircle, Bell, ChevronRight } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * 🛰 UpcomingAppointments — Compact visit cards
 * Based on Blueprint row 4 (Patient view).
 */
const UpcomingAppointments = ({ appointments = [], onCancel }) => {
   const upcoming = appointments.filter(a => a.status === 'scheduled' || a.status === 'pending').slice(0, 3);

   return (
      <Card className="p-6 lg:p-8 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-6 group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-3xl pointer-events-none" />
         
         <div className="flex items-center justify-between relative z-10 shrink-0">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-inner group-hover:scale-110 transition-transform">
                  <Bell size={24} strokeWidth={2.5} />
               </div>
               <div className="flex flex-col">
                  <h3 className="text-xl lg:text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">Upcoming</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Visit Queue Matrix</p>
               </div>
            </div>
         </div>

         <div className="space-y-4 relative z-10">
            {upcoming.length > 0 ? upcoming.map((a, idx) => (
               <div key={idx} className="p-5 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-accent-primary/30 transition-all cursor-pointer group/card flex flex-col gap-4 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <p className="text-[11px] font-black text-accent-primary uppercase italic tracking-tighter leading-none">Medical Personnel</p>
                        <p className="text-base lg:text-lg font-black text-slate-900 dark:text-white italic mt-1 uppercase tracking-tight">{a.doctor?.full_name || 'Dr. Assigned'}</p>
                     </div>
                     <button onClick={() => onCancel(a)} className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                        <XCircle size={16} />
                     </button>
                  </div>

                  <div className="flex items-center gap-6 pt-2 border-t border-slate-200 dark:border-white/5">
                     <div className="flex items-center gap-2">
                        <Clock size={16} className="text-slate-400" />
                        <span className="text-[11px] font-black text-slate-900 dark:text-white/80 italic uppercase tracking-widest tabular-nums">{a.start_time || '09:00 AM'}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="text-[11px] font-black text-slate-900 dark:text-white/80 italic uppercase tracking-widest tabular-nums">{a.appointment_date}</span>
                     </div>
                  </div>
               </div>
            )) : (
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center italic py-10 opacity-60">No pending visits detected in clinical archive.</p>
            )}
         </div>

         <button className="mt-2 w-full py-4 rounded-2xl bg-accent-primary text-[10px] font-black uppercase text-white hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent-primary/20 border-none">
            Complete Archive Matrix <ChevronRight size={16} className="text-white" />
         </button>
      </Card>
   );
};

export default UpcomingAppointments;
