import React from 'react';
import { useAuth } from '@/core/auth/AuthContext';
import { Sparkles, Calendar, Mic, ArrowRight } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * 🌠 AppointmentCTA — Premium Admin Greeting Shard
 * Refined with high-fidelity glassmorphism and clinical context.
 */
const AppointmentCTA = ({ onBook, onTalkToSana, appointments = [] }) => {
   const { user } = useAuth();
   const userName = user?.displayName?.split(' ')[0] || 'Administrator';

   const today = new Date().toISOString().split('T')[0];
   const todayCount = (appointments || []).filter(a => a.appointment_date === today).length;
   const upcomingCount = (appointments || []).filter(a => a.status === 'scheduled' || a.status === 'pending').length;

   const hour = new Date().getHours();
   const timeContext = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

   return (
      <Card className="relative overflow-hidden p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-2als group mb-6">
         {/* 🔮 Atmospheric Neural Glow */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-primary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

         <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">

            {/* Left: Greeting Matrix */}
            <div className="flex-1 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-accent-primary/20 flex items-center justify-center text-accent-primary shadow-inner">
                     <Sparkles size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-primary/80 italic tracking-widest">Clinical Command Hub</span>
               </div>

               <div className="space-y-2">
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-none italic uppercase">
                     Good {timeContext}, <br className="sm:hidden" />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{userName}.</span>
                  </h2>
                  <p className="text-[11px] sm:text-[13px] font-bold text-slate-400 uppercase tracking-widest max-w-2xl leading-relaxed">
                     Clinical protocols synchronized. You have <span className="text-accent-primary italic underline underline-offset-4 decoration-accent-primary/30 decoration-2">{todayCount} scheduled activations</span> for today and <span className="text-white">{upcomingCount} future medical visits</span> archived.
                  </p>
               </div>
            </div>

            {/* Right: Quick Action Nodes (Refined Glassmorphism) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
               <button 
                  onClick={onBook} 
                  className="group/btn relative px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-primary/50 transition-all duration-500 flex items-center gap-4 text-left overflow-hidden min-w-[200px]"
               >
                  <div className="absolute inset-0 bg-accent-primary/0 group-hover/btn:bg-accent-primary/5 transition-colors" />
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover/btn:scale-110 transition-transform italic shrink-0 shadow-inner">
                     <Calendar size={20} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-white uppercase tracking-wider leading-none">Schedule Hub</p>
                     <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Manual Entry</p>
                  </div>
                  <ArrowRight size={14} className="ml-2 text-slate-600 group-hover/btn:text-accent-primary group-hover/btn:translate-x-1 transition-all" />
               </button>

               <button 
                  onClick={onTalkToSana} 
                  className="group/btn relative px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-ai/50 transition-all duration-500 flex items-center gap-4 text-left overflow-hidden min-w-[200px]"
               >
                  <div className="absolute inset-0 bg-accent-ai/0 group-hover/btn:bg-accent-ai/5 transition-colors" />
                  <div className="w-10 h-10 rounded-xl bg-accent-ai/10 flex items-center justify-center text-accent-ai group-hover/btn:scale-110 transition-transform italic shrink-0 shadow-inner">
                     <Mic size={20} className="animate-pulse" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-white uppercase tracking-wider leading-none">Neural Dialog</p>
                     <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Sana Voice AI</p>
                  </div>
                  <ArrowRight size={14} className="ml-2 text-slate-600 group-hover/btn:text-accent-ai group-hover/btn:translate-x-1 transition-all" />
               </button>
            </div>

         </div>

         {/* 🚀 Visual Decoy Sparkline */}
         <div className="absolute bottom-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent opacity-50" />
      </Card>
   );
};

export default AppointmentCTA;
