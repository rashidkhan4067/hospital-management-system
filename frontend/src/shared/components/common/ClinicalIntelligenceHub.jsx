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
 * 🛰 ClinicalIntelligenceHub — Standardized throughput analytics
 * Centralized telemetry shard for visual blank space optimization across all clinical modules.
 */
export default function ClinicalIntelligenceHub({ 
    title = "Throughput Intelligence", 
    subtitle = "Velocity Real-time Matrix",
    waitLabel = "Avg. Waiting Time",
    waitValue = "18.4",
    waitUnit = "Min"
}) {
   return (
      <Card className="p-6 lg:p-8 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-8 group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full pointer-events-none" />
         
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
               <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-inner group-hover:scale-110 transition-transform italic shrink-0">
                  <Activity size={24} lg:size={28} strokeWidth={2.5} />
               </div>
               <div className="flex flex-col min-w-0">
                  <h3 className="text-lg sm:text-xl lg:text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none truncate">{title}</h3>
                  <p className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1.5 opacity-60 italic">{subtitle}</p>
               </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
               <div className="flex flex-col text-right">
                  <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none italic">{waitLabel}</p>
                  <div className="flex items-center justify-end gap-2 mt-1.5">
                     <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums italic tracking-tighter uppercase leading-none">{waitValue}</span>
                     <span className="text-[8px] sm:text-[10px] font-black text-accent-primary uppercase italic">{waitUnit}</span>
                  </div>
               </div>
               <div className="w-[1px] h-10 bg-slate-200 dark:bg-white/10" />
               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-sm animate-pulse">
                  <Zap size={18} sm:size={20} />
               </div>
            </div>
         </div>

         {/* 📊 Main Clinical Curve Chart */}
         <div className="w-full h-48 sm:h-64 lg:h-72 relative z-10 mt-2 px-1">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                     <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorWait" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
                  <XAxis 
                     dataKey="time" 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b', textTransform: 'uppercase' }}
                     dy={12}
                  />
                  <YAxis 
                     axisLine={false}
                     tickLine={false}
                     tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b' }}
                     hide={true}
                  />
                  <Tooltip 
                     cursor={{ stroke: '#14b8a6', strokeWidth: 1, strokeDasharray: '4 4' }}
                     contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                        border: '1px solid rgba(203, 213, 225, 1)', 
                        borderRadius: '24px',
                        backdropFilter: 'blur(16px)',
                        padding: '16px',
                        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
                     }} 
                     itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                     labelStyle={{ fontSize: '12px', fontWeight: '900', color: '#14b8a6', marginBottom: '10px' }}
                  />
                  <Area 
                     type="monotone" 
                     dataKey="load" 
                     stroke="#14b8a6" 
                     strokeWidth={4}
                     fillOpacity={1} 
                     fill="url(#colorLoad)" 
                     animationDuration={3000}
                     activeDot={{ r: 6, stroke: '#14b8a6', strokeWidth: 2, fill: '#fff' }}
                  />
                  <Area 
                     type="monotone" 
                     dataKey="wait" 
                     stroke="#f59e0b" 
                     strokeWidth={2}
                     strokeDasharray="5 5"
                     fillOpacity={1} 
                     fill="url(#colorWait)" 
                     animationDuration={4000}
                  />
               </AreaChart>
            </ResponsiveContainer>
         </div>

         {/* 🛰 Sub-telemetry Matrix */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10 pt-6 border-t border-slate-100 dark:border-white/5">
            {[
               { label: 'OPD Peak Load', value: '82%', icon: Users, color: 'text-accent-primary', up: true, trend: '4.2%' },
               { label: 'Wait Efficiency', value: '94.8%', icon: Clock, color: 'text-emerald-400', up: true, trend: '2.1%' },
               { label: 'Staff Saturation', value: '64.2%', icon: TrendingUp, color: 'text-amber-400', up: false, trend: '1.5%' }
            ].map((stat, idx) => (
               <div key={idx} className={`flex flex-col gap-2 ${idx === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                  <div className="flex items-center gap-2">
                     <stat.icon size={13} className={stat.color} />
                     <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                  </div>
                  <div className="flex items-baseline justify-between font-display">
                     <span className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase tabular-nums">{stat.value}</span>
                     <div className={`flex items-center text-[8px] font-black uppercase italic ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />} {stat.trend}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </Card>
   );
}
