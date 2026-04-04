import React from 'react';
import { Activity, Clock, Users, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/shared/components/ui';

const mockChartData = [
   { time: '08:00', load: 12, wait: 15 },
   { time: '10:00', load: 45, wait: 35 },
   { time: '12:00', load: 38, wait: 28 },
   { time: '14:00', load: 65, wait: 42 },
   { time: '16:00', load: 42, wait: 20 },
   { time: '18:00', load: 28, wait: 12 },
   { time: '20:00', load: 15, wait: 8 },
];

/**
 * 🛰 ClinicalIntelligenceHub — High-fidelity through-put analytics
 * Designed to fill major blank spaces with elite telemetry.
 */
const ClinicalIntelligenceHub = () => {
   return (
      <Card className="p-6 lg:p-8 rounded-[2.5rem] bg-white dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-8 group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full pointer-events-none" />
         
         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-inner group-hover:scale-110 transition-transform italic shrink-0">
                  <Activity size={28} strokeWidth={2.5} />
               </div>
               <div className="flex flex-col">
                  <h3 className="text-xl lg:text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">Throughput Intelligence</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1.5 opacity-60">Clinical Velocity Real-time Matrix</p>
               </div>
            </div>

            <div className="flex items-center gap-6">
               <div className="flex flex-col text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Avg. Waiting Time</p>
                  <div className="flex items-center justify-end gap-2 mt-1.5">
                     <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums italic tracking-tighter uppercase leading-none">18.4</span>
                     <span className="text-[10px] font-black text-emerald-500 uppercase italic">Min</span>
                  </div>
               </div>
               <div className="w-[1px] h-10 bg-slate-200 dark:bg-white/10 hidden lg:block" />
               <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-sm animate-pulse">
                  <Zap size={20} />
               </div>
            </div>
         </div>

         {/* 📊 Main Clinical Curve Chart */}
         <div className="w-full h-64 relative z-10 mt-2">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={mockChartData}>
                  <defs>
                     <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <Tooltip 
                     contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                        border: 'none', 
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                        padding: '12px'
                     }} 
                     itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                  />
                  <Area 
                     type="monotone" 
                     dataKey="load" 
                     stroke="#14b8a6" 
                     strokeWidth={4}
                     fillOpacity={1} 
                     fill="url(#colorLoad)" 
                     animationDuration={2500}
                  />
               </AreaChart>
            </ResponsiveContainer>
         </div>

         {/* 🛰 Sub-telemetry Matrix */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 pt-4 border-t border-slate-100 dark:border-white/5">
            {[
               { label: 'OPD Peak Load', value: '82%', icon: Users, color: 'text-indigo-400', up: true, trend: '4.2%' },
               { label: 'Wait Efficiency', value: '94.8%', icon: Clock, color: 'text-emerald-400', up: true, trend: '2.1%' },
               { label: 'Staff Saturation', value: '64.2%', icon: TrendingUp, color: 'text-amber-400', up: false, trend: '1.5%' }
            ].map((stat, idx) => (
               <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                     <stat.icon size={14} className={stat.color} />
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                     <span className="text-xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase tabular-nums">{stat.value}</span>
                     <div className={`flex items-center text-[8px] font-black uppercase italic ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />} {stat.trend}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </Card>
   );
};

export default ClinicalIntelligenceHub;
