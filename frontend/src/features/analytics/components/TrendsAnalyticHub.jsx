import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BarChart as BarChartIcon, Activity, Clock, Globe, TrendingUp } from 'lucide-react';
import { Card } from '@/shared/components/ui';
import { UI_TOKENS } from '@/core/config/UI';
import SanaAIAnalyticsCard from '@/features/analytics/components/SanaAIAnalyticsCard';

const COLORS = ['#14b8a6', '#0ea5e9', '#6366f1', '#f43f5e', '#f59e0b'];

/**
 * 📈 TrendsAnalyticHub — Clinical Trend Matrix
 * Tightened component heights and font sizes to remove blank space.
 */
const TrendsAnalyticHub = ({ trendData = [] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full animate-in slide-in-from-bottom-8 duration-1000 items-start">
      
      {/* 📊 Main Charts Area (Left Column) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Appointments Trend Shard — Reduced height & tightened padding */}
        <Card className={`${UI_TOKENS.SHARD_BASE} p-6 flex flex-col gap-6`}>
          <div className={UI_TOKENS.GLOW_ACCENT} />
          
          <div className="flex items-center justify-between relative z-10 shrink-0">
            <div className="space-y-0.5">
              <h3 className={`${UI_TOKENS.TEXT_PRIMARY} text-lg flex items-center gap-3`}>
                <BarChartIcon className="text-accent-primary" size={20} /> Appointments Trend
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60 italic">Web vs Voice booking distribution</p>
            </div>
          </div>

          <div className="h-[220px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'black' }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #ffffff10', color: '#fff', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'black' }}
                />
                <Bar dataKey="web" stackId="a" fill="#2dd4bf" radius={[0, 0, 0, 0]} />
                <Bar dataKey="voice" stackId="a" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Hourly Intelligence Heatmap — Further reduced height */}
        <Card className={`${UI_TOKENS.SHARD_BASE} p-5 flex flex-col gap-4`}>
           <div className="flex items-center gap-3 mb-0 relative z-10">
              <Clock className="text-accent-primary" size={18} />
              <div>
                <h3 className={`${UI_TOKENS.TEXT_PRIMARY} text-base`}>Hourly Intelligence Heatmap</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Peak booking density (8AM - 8PM)</p>
              </div>
           </div>

           <div className="grid grid-cols-7 gap-1.5 h-[120px]">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="flex flex-col gap-1">
                  <div className="h-4 flex items-center justify-center mb-1">
                      <span className="text-[8px] font-black uppercase text-slate-500">{day}</span>
                  </div>
                  {[0,1,2].map((i) => (
                    <div 
                        key={i} 
                        className={`flex-1 rounded-lg border border-white/5 opacity-50 transition-all cursor-crosshair group relative ${i === 1 ? 'bg-accent-primary/60 hover:opacity-100' : 'bg-accent-primary/10 hover:opacity-30'}`}
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
                    </div>
                  ))}
                </div>
              ))}
           </div>
        </Card>

        {/* 🚀 New Shard: Clinical Throughput Intelligence — Fills the Blank Space */}
        <Card className={`${UI_TOKENS.SHARD_BASE} p-5 flex flex-col gap-4 bg-slate-900 shadow-2xl border-accent-primary/20`}>
           <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-3xl pointer-events-none" />
           <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20">
                    <TrendingUp size={20} />
                 </div>
                 <div>
                    <h3 className="text-white text-base font-black italic uppercase leading-none">Throughput Intelligence</h3>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Real-time Clinical Velocity</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 {[
                    { l: 'Admissions', v: '142', c: 'text-accent-primary' },
                    { l: 'Discharges', v: '128', c: 'text-indigo-400' }
                 ].map((stat) => (
                    <div key={stat.l} className="text-right">
                       <p className="text-[8px] font-black uppercase text-slate-500">{stat.l}</p>
                       <p className={`text-lg font-black italic tabular-nums ${stat.c}`}>{stat.v}</p>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="grid grid-cols-4 gap-4 mt-2">
              {[
                 { label: 'OPD Flow', value: '94%', color: '#2dd4bf' },
                 { label: 'Surgery', value: '88%', color: '#0ea5e9' },
                 { label: 'ER Intake', value: '72%', color: '#6366f1' },
                 { label: 'Lab Sync', value: '98%', color: '#14b8a6' }
              ].map((item) => (
                 <div key={item.label} className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
                    <span className="text-[8px] font-black uppercase text-slate-500 tracking-tighter">{item.label}</span>
                    <div className="text-sm font-black text-white italic">{item.value}</div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full rounded-full opacity-60" style={{ width: item.value, background: item.color }} />
                    </div>
                 </div>
              ))}
           </div>
        </Card>
      </div>

      {/* 🛰 Sidebar Matrix (Right Column) */}
      <div className="lg:col-span-4 flex flex-col gap-6 h-full">
        
        {/* Sana AI Intelligence Shard */}
        <SanaAIAnalyticsCard />

        {/* Global Status Matrix */}
        <Card className={`${UI_TOKENS.SHARD_BASE} p-6 min-h-[380px] flex flex-col gap-6`}>
           <div className={UI_TOKENS.GLOW_ACCENT} />
           
           <div className="space-y-0.5 relative z-10">
              <h3 className={`${UI_TOKENS.TEXT_PRIMARY} text-lg flex items-center gap-3`}>
                <Globe className="text-accent-primary/80" size={20} /> Status Matrix
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Efficiency Breakdown</p>
           </div>

           <div className="flex-1 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie 
                      data={[
                        { name: 'Confirmed', value: 450 },
                        { name: 'Pending', value: 300 },
                        { name: 'Cancelled', value: 150 }
                      ]} 
                      cx="50%" cy="50%" 
                      innerRadius={60} 
                      outerRadius={85} 
                      paddingAngle={8} 
                      dataKey="value"
                      stroke="none"
                    >
                       {[0,1,2].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                       ))}
                    </Pie>
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #ffffff10', color: '#fff', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'black' }}
                    />
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="text-center">
                    <p className="text-[8px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.2em] leading-none">Efficiency</p>
                    <p className="text-xl font-black italic text-slate-900 dark:text-white mt-1 tabular-nums">94.2%</p>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-3 pt-4 mt-auto relative z-10 border-t border-white/5">
                {[
                 { l: 'Confirm', v: '65%', c: '#2dd4bf' },
                 { l: 'Pending', v: '22%', c: '#0ea5e9' }
               ].map((s) => (
                 <div key={s.l} className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.c }} />
                        {s.l}
                    </div>
                    <p className="text-xs font-black text-slate-900 dark:text-white tabular-nums">{s.v}</p>
                 </div>
               ))}
           </div>
        </Card>

        {/* Channel Velocity Shard */}
        <Card className={`${UI_TOKENS.SHARD_BASE} p-6 min-h-[250px] flex flex-col gap-6`}>
           <div className="flex items-center gap-4 relative z-10">
              <Activity className="text-accent-primary" size={20} />
              <div>
                <h3 className={`${UI_TOKENS.TEXT_PRIMARY} text-lg`}>Channel Velocity</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Voice adoption</p>
              </div>
           </div>

           <div className="h-24 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={trendData}>
                    <Line type="monotone" dataKey="web" stroke="#2dd4bf" strokeWidth={3} dot={false} strokeDasharray="5 5" opacity={0.3} />
                    <Line type="monotone" dataKey="voice" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 3, fill: '#0ea5e9', strokeWidth: 0 }} />
                 </LineChart>
              </ResponsiveContainer>
           </div>

           <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 flex flex-col items-center">
                 <p className="text-[8px] font-black uppercase text-slate-500">Peak Growth</p>
                 <p className="text-sm font-black text-slate-900 dark:text-white italic">+12.4%</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 flex flex-col items-center">
                 <p className="text-[8px] font-black uppercase text-slate-500">Avg Intake</p>
                 <p className="text-sm font-black text-slate-900 dark:text-white italic">842/d</p>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default TrendsAnalyticHub;
