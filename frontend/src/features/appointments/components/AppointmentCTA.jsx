import React from 'react';
import { Calendar, Mic, ArrowRight, Plus, Clock } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * 🌠 AppointmentCTA — High-Fidelity Appointment Greeting Shard
 * Mirrors AnalyticsCTA layout with appointment-specific context.
 */
const AppointmentCTA = ({ onBook, onTalkToSana, appointments = [] }) => {
   const today = new Date().toISOString().split('T')[0];
   const todayCount   = appointments.filter(a => a.appointment_date === today).length;
   const pendingCount = appointments.filter(a => a.status === 'pending' || a.status === 'scheduled').length;

   return (
      <Card className="relative overflow-hidden p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/5 shadow-2als group/cta mb-6">
         {/* 🔮 Atmospheric Neural Glow */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover/cta:bg-accent-primary/20 transition-all duration-1000" />
         <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-accent-primary/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

         <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">

            {/* Left: Appointment Context */}
            <div className="flex-1 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-accent-primary/20 flex items-center justify-center text-accent-primary shadow-inner border border-accent-primary/30">
                     <Calendar size={20} />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent-primary/80 italic">Clinical Scheduling Hub</span>
               </div>

               <div className="space-y-2">
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-none italic uppercase">
                     Appointment <br className="sm:hidden" />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Command Center.</span>
                  </h2>
                  <p className="text-[11px] sm:text-[13px] font-bold text-slate-500 uppercase tracking-widest max-w-xl leading-relaxed">
                     You have <span className="text-accent-primary italic underline underline-offset-4 decoration-accent-primary/30">{todayCount} active sessions</span> scheduled for today with <span className="text-white">{pendingCount} visits</span> pending confirmation across all Al Shifaa departments.
                  </p>
               </div>
            </div>

            {/* Right: Quick Action Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
               <button
                  onClick={onBook}
                  className="group/btn relative px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-primary/50 transition-all duration-500 flex items-center gap-4 text-left overflow-hidden min-w-[200px]"
               >
                  <div className="absolute inset-0 bg-accent-primary/0 group-hover/btn:bg-accent-primary/5 transition-colors" />
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover/btn:scale-110 transition-transform">
                     <Plus size={20} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-white uppercase tracking-wider leading-none">Schedule Hub</p>
                     <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Book Appointment</p>
                  </div>
                  <ArrowRight size={14} className="ml-auto text-slate-600 group-hover/btn:text-accent-primary group-hover/btn:translate-x-1 transition-all" />
               </button>

               <button
                  onClick={onTalkToSana}
                  className="group/btn relative px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-primary/50 transition-all duration-500 flex items-center gap-4 text-left overflow-hidden min-w-[200px]"
               >
                  <div className="absolute inset-0 bg-accent-primary/0 group-hover/btn:bg-accent-primary/5 transition-colors" />
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover/btn:scale-110 transition-transform">
                     <Mic size={20} className="animate-pulse" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-white uppercase tracking-wider leading-none">Neural Dialog</p>
                     <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Sana Voice AI</p>
                  </div>
                  <ArrowRight size={14} className="ml-auto text-slate-600 group-hover/btn:text-accent-primary group-hover/btn:translate-x-1 transition-all" />
               </button>
            </div>

         </div>

         {/* Sparkline */}
         <div className="absolute bottom-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent opacity-50" />
      </Card>
   );
};

export default AppointmentCTA;
