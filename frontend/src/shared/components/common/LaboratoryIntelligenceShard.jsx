import React from 'react';
import { 
  FlaskConical, Activity, CheckCircle2, Clock, 
  TrendingUp, Zap, Beaker, AlertTriangle, 
  BarChart3, RefreshCw, ShieldCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/shared/components/ui';

const throughputData = [
   { time: '08:00', samples: 24, efficiency: 95 },
   { time: '10:00', samples: 68, efficiency: 92 },
   { time: '12:00', samples: 145, efficiency: 88 },
   { time: '14:00', samples: 112, efficiency: 94 },
   { time: '16:00', samples: 85, efficiency: 97 },
   { time: '18:00', samples: 42, efficiency: 98 },
];

/**
 * 🧪 LaboratoryIntelligenceShard
 * Specialized clinical diagnostic analytics for the Lab Hub.
 * Optimized for theme consistency and dark mode orchestration.
 */
export default function LaboratoryIntelligenceShard() {
   return (
      <Card className="p-6 lg:p-8 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200/50 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-8 group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full pointer-events-none" />
         
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
               <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-inner group-hover:scale-110 transition-transform italic shrink-0">
                  <FlaskConical size={24} lg:size={28} strokeWidth={2.5} />
               </div>
               <div className="flex flex-col min-w-0">
                  <h3 className="text-lg sm:text-xl lg:text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none truncate font-display">Diagnostic Throughput</h3>
                  <p className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1.5 opacity-60 italic">Real-time Lab Calibration Matrix</p>
               </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
               <div className="flex flex-col text-right">
                  <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none italic">Avg. Turnaround</p>
                  <div className="flex items-center justify-end gap-2 mt-1.5 font-display">
                     <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums italic tracking-tighter uppercase leading-none">42.8</span>
                     <span className="text-[8px] sm:text-[10px] font-black text-accent-primary uppercase italic">Min</span>
                  </div>
               </div>
               <div className="w-[1px] h-10 bg-slate-200 dark:bg-white/10" />
               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-sm animate-pulse">
                  <RefreshCw size={18} sm:size={20} />
               </div>
            </div>
         </div>

         {/* 📊 Lab Sample Velocity Chart */}
         <div className="w-full h-48 sm:h-64 lg:h-72 relative z-10 mt-2 px-1">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={throughputData}>
                  <defs>
                     <linearGradient id="colorSamples" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
                  <XAxis 
                     dataKey="time" 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b', textTransform: 'uppercase' }}
                  />
                  <YAxis hide={true} />
                  <Tooltip 
                     contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.98)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '24px',
                        backdropFilter: 'blur(16px)',
                        padding: '16px',
                        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)'
                     }} 
                     itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                     labelStyle={{ color: '#14b8a6', fontSize: '11px', fontWeight: '900', marginBottom: '8px' }}
                  />
                  <Area 
                     type="monotone" 
                     dataKey="samples" 
                     stroke="#14b8a6" 
                     strokeWidth={4}
                     fill="url(#colorSamples)" 
                     animationDuration={2500}
                  />
               </AreaChart>
            </ResponsiveContainer>
         </div>

         {/* 🛰 Laboratory Sub-telemetry Cluster */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10 pt-6 border-t border-slate-100 dark:border-white/5">
            {[
               { label: 'Analyzer Load', value: '74.2%', icon: Beaker, color: 'text-accent-primary', trend: 'Optimal' },
               { label: 'Critical Alerts', value: '03', icon: AlertTriangle, color: 'text-rose-500', trend: 'Handled' },
               { label: 'Protocol Yield', value: '99.9%', icon: ShieldCheck, color: 'text-emerald-500', trend: 'Verified' }
            ].map((stat, idx) => (
               <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                     <stat.icon size={13} className={stat.color} />
                     <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">{stat.label}</span>
                  </div>
                  <div className="flex items-baseline justify-between font-display">
                     <span className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase tabular-nums">{stat.value}</span>
                     <span className={`text-[8px] font-black uppercase italic opacity-60 ${stat.trend === 'Optimal' ? 'text-accent-primary' : 'text-slate-400'}`}>{stat.trend}</span>
                  </div>
               </div>
            ))}
         </div>
      </Card>
   );
}
