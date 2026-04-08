import React from 'react';
import { TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/primitives';

const mockData = [
   { month: 'JAN', billed: 450000, collected: 410000 },
   { month: 'FEB', billed: 520000, collected: 480000 },
   { month: 'MAR', billed: 480000, collected: 460000 },
   { month: 'APR', billed: 610000, collected: 520000 },
   { month: 'MAY', billed: 580000, collected: 560000 },
   { month: 'JUN', billed: 650000, collected: 620000 },
];

/**
 * 📊 Revenue Cycle Shard
 * Themed telemetry for clinical revenue tracking.
 * Sync'd with accent-primary and accent-secondary variables check mapping.
 */
export default function RevenueCycleShard({ data = mockData }) {
   return (
      <Card className="p-8 lg:p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-8 group">
         <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none transition-colors group-hover:bg-accent-primary/10" />
         
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-inner group-hover:scale-110 transition-transform italic shrink-0">
                  <TrendingUp size={24} strokeWidth={2.5} />
               </div>
               <div className="flex flex-col">
                  <h3 className="text-xl lg:text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none font-display">Revenue Cycle</h3>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-2 opacity-60 italic">Billed vs Collected Velocity Shard</p>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent-secondary shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                  <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Billed Matrix</span>
               </div>
               <div className="flex items-center gap-2 ml-4">
                  <div className="w-3 h-3 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(20,184,166,0.4)]" />
                  <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Collected Shard</span>
               </div>
            </div>
         </div>

         <div className="w-full h-72 lg:h-80 relative z-10 mt-4">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                     <linearGradient id="colorBilled" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} vertical={false} />
                  <XAxis 
                     dataKey="month" 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b' }}
                     dy={10}
                  />
                  <YAxis hide={true} />
                  <Tooltip 
                     contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.98)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '24px',
                        padding: '16px',
                        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)'
                     }} 
                     itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                  />
                  <Area type="monotone" dataKey="billed" stroke="#3B82F6" strokeWidth={5} fill="url(#colorBilled)" />
                  <Area type="monotone" dataKey="collected" stroke="#14B8A6" strokeWidth={5} fill="url(#colorCollected)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </Card>
   );
}
