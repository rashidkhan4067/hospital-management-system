import React from 'react';
import { TrendingUp, Clock, CheckCircle, XCircle, Activity, Calendar } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Card } from '@/shared/components/ui';
import { UI_TOKENS } from '@/core/config/UI';

// 📈 Local Mock Sparkline Generator
const mockSparkline = (base, range) => 
  Array.from({ length: 8 }, () => ({ val: base + Math.floor(Math.random() * range) }));

/**
 * 🛰 AppointmentMiniStats — High-density Metric UI Shards
 * Refactored to match Al Shifaa administrative command center stats.
 * Based on Blueprint row 4 (Admin view).
 */
const AppointmentMiniStats = ({ appointments = [] }) => {
   const total = appointments.length;
   const scheduled = appointments.filter(a => a.status === 'scheduled' || a.status === 'pending').length;
   const completed = appointments.filter(a => a.status === 'completed').length;
   const cancelled = appointments.filter(a => a.status === 'cancelled').length;

   const metrics = [
      { l: 'Total Appointments', v: total.toLocaleString(), i: Calendar, c: '#2dd4bf', b: 'bg-accent-primary/10', trend: '+12.4%', up: true, data: mockSparkline(4000, 800) },
      { l: 'Scheduled Shards', v: scheduled.toLocaleString(), i: Clock, c: '#f59e0b', b: 'bg-amber-500/10', trend: 'Pending', up: true, data: mockSparkline(80, 20) },
      { l: 'Clinical Archives', v: completed.toLocaleString(), i: CheckCircle, c: '#10b981', b: 'bg-emerald-500/10', trend: '+2.1%', up: true, data: mockSparkline(90, 10) },
      { l: 'Terminated Task', v: cancelled.toLocaleString(), i: XCircle, c: '#f43f5e', b: 'bg-rose-500/10', trend: '-0.4%', up: false, data: mockSparkline(1, 2) }
   ];

   return (
      <div className="flex flex-col gap-4">
         {metrics.map((m, idx) => (
            <Card key={idx} className="relative overflow-hidden group/metric p-5 min-h-[110px] flex items-center gap-5 bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2als transition-all hover:scale-[1.02]">
               <div className={UI_TOKENS.GLOW_ACCENT} />
               
               {/* 🚀 Portal Icon (Metric UI Standard) */}
               <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-xl group-hover/metric:scale-110 transition-transform" 
                  style={{ color: m.c }}
               >
                  <m.i size={20} strokeWidth={2.5} />
               </div>

               <div className="flex flex-col min-w-0 flex-1 relative z-10 transition-transform">
                  <div className="flex items-baseline gap-2">
                     <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none italic uppercase tabular-nums">
                        {m.v}
                     </h3>
                     <div className={`text-[8px] font-black uppercase flex items-center gap-1 italic ${m.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {m.trend}
                     </div>
                  </div>
                  <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic mt-2 opacity-60 group-hover/metric:opacity-100 transition-opacity">
                     {m.l}
                  </p>
               </div>

               {/* 📈 Integrated Sparkline (Background) */}
               <div className="absolute bottom-1 left-0 right-0 h-10 opacity-20 pointer-events-none group-hover/metric:opacity-40 transition-opacity translate-y-2">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={m.data}>
                        <Line 
                           type="monotone" 
                           dataKey="val" 
                           stroke={m.c} 
                           strokeWidth={2.5} 
                           dot={false}
                           animationDuration={2000}
                        />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </Card>
         ))}
      </div>
   );
};

export default AppointmentMiniStats;
