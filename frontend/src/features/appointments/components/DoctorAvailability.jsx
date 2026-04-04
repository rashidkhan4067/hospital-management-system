import React from 'react';
import { UserCheck, Clock, Calendar, ChevronRight, Activity } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * 🛰 DoctorAvailability — High-density Personnel Matrix
 */
const DoctorAvailability = ({ doctors = [] }) => {
   const availability = [
      { name: 'Dr. Sarah Ahmed', specialism: 'Cardiology', available: true, slots: 5, time: '09:00 AM - 12:00 PM' },
      { name: 'Dr. Michael Chen', specialism: 'Neurology', available: true, slots: 2, time: '10:30 AM - 01:00 PM' },
      { name: 'Dr. Aisha Khan', specialism: 'Pediatrics', available: false, slots: 0, time: 'Consultation Full' },
      { name: 'Dr. Robert Wilson', specialism: 'Orthopedics', available: true, slots: 8, time: '02:00 PM - 05:00 PM' }
   ];

   return (
      <Card className="p-5 lg:p-6 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2als flex flex-col gap-6 group overflow-hidden">
         <div className="flex items-center justify-between relative z-10 shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20 shadow-inner group-hover:scale-110 transition-transform italic shrink-0">
                  <UserCheck size={20} strokeWidth={2.5} />
               </div>
               <div className="flex flex-col">
                  <h3 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">Availability</h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Live Personnel Hub</p>
               </div>
            </div>
            <button className="w-8 h-8 rounded-lg bg-indigo-500/5 text-indigo-400 hover:bg-indigo-500 hover:text-white flex items-center justify-center transition-all">
               <Activity size={14} />
            </button>
         </div>

         <div className="space-y-3 relative z-10">
            {availability.map((doc, idx) => (
               <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between group/doc hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-crosshair">
                  <div className="flex items-center gap-3">
                     <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs uppercase shadow-lg border-2 border-white dark:border-slate-900 shrink-0 ${doc.available ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                        {doc.name.charAt(4)}
                     </div>
                     <div className="flex flex-col min-w-0">
                        <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase italic tracking-tighter truncate leading-none">{doc.name}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60 leading-none">{doc.specialism}</p>
                     </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                     <span className={`text-[9px] font-black uppercase italic ${doc.available ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {doc.available ? `${doc.slots} Slots` : 'Closed'}
                     </span>
                     <p className="text-[7.5px] font-bold text-slate-400 uppercase tracking-[0.1em] mt-0.5 italic tabular-nums leading-none">{doc.time}</p>
                  </div>
               </div>
            ))}
         </div>

         <button className="w-full py-4 rounded-2xl bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-indigo-500/20 border-none flex items-center justify-center gap-2">
            Open Global Availability Matrix <ChevronRight size={14} />
         </button>
      </Card>
   );
};

export default DoctorAvailability;
