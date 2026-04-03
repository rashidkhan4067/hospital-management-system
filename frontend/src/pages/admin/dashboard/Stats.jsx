import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Users, Activity, Wallet, Calendar, Sparkles, Filter } from 'lucide-react';
import { Card, Button } from '../../../components/ui';
import { motion } from 'framer-motion';

import { useAdminAnalytics } from '../../../hooks/admin/useAdminAnalytics';

export default function ProtocolAnalytics() {
  const { pulse, clinicalTrends, loading, error } = useAdminAnalytics();

  const stats = [
    { 
        title: 'Global Throughput', 
        value: loading ? '...' : (pulse?.clinical?.today?.total_patients || '0'), 
        trend: pulse?.clinical?.delta || '+0.0%', 
        icon: <Users />, 
        color: 'accent' 
    },
    { 
        title: 'Daily Appointments', 
        value: loading ? '...' : (pulse?.clinical?.today?.appointments || '0'), 
        trend: pulse?.clinical?.delta || '0.0%', 
        icon: <Calendar />, 
        color: 'emerald' 
    },
    { 
        title: 'Net Revenue', 
        value: loading ? '...' : `$${((pulse?.financial?.today?.total_revenue || 0) / 1000).toFixed(1)}k`, 
        trend: pulse?.financial?.delta || 'Steady', 
        icon: <Wallet />, 
        color: 'amber' 
    },
    { 
        title: 'Current Admissions', 
        value: loading ? '...' : (pulse?.clinical?.today?.admissions || '0'), 
        trend: 'Live', 
        icon: <Activity />, 
        color: 'rose' 
    },
  ];

  const chartData = clinicalTrends?.length > 0 ? clinicalTrends.slice(0, 12).reverse() : Array(12).fill({ total_patients: 0 });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2">
         <div className="space-y-1">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-6 bg-accent-primary rounded-full shadow-lg shadow-accent-primary/20" />
               <h1 className="text-xl md:text-2xl font-black text-text-primary dark:text-white tracking-tight uppercase italic font-display">Protocol Analytics</h1>
            </div>
            <p className="text-[9px] font-bold text-text-secondary dark:text-white/30 uppercase tracking-[0.3em] ml-5 opacity-60">System Intelligence Reports Hub</p>
         </div>

         <div className="flex items-center gap-3">
            <div className="bg-bg-offset dark:bg-slate-800/40 p-1 rounded-2xl border border-white/5 flex items-center shadow-sm">
                <Button className="bg-white dark:bg-white/5 text-text-primary dark:text-white px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border-none">
                   <Filter size={14} /> Refine Matrix
                </Button>
                <Button className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none">
                   <BarChart3 size={16} /> Generate Index
                </Button>
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-8 bg-bg-offset dark:bg-slate-800/40 border border-white/5 rounded-[40px] relative overflow-hidden group hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-[22px] bg-${stat.color}-500/10 text-${stat.color}-500 flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform`}>
                  {stat.icon && React.cloneElement(stat.icon, { size: 28, strokeWidth: 2 })}
                </div>
                <div className={`flex items-center gap-1.5 ${stat.trend.startsWith('+') ? 'text-emerald-500' : stat.trend.startsWith('-') ? 'text-rose-500' : 'text-slate-400'} text-[10px] font-black uppercase tracking-widest`}>
                   {stat.trend.startsWith('+') ? <TrendingUp size={14} /> : stat.trend.startsWith('-') ? <TrendingDown size={14} /> : <Activity size={14} />}
                   {stat.trend}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-text-secondary dark:text-white/20 uppercase tracking-[0.3em] italic">{stat.title}</p>
                <h2 className="text-3xl font-black text-text-primary dark:text-white uppercase italic tracking-tighter">{stat.value}</h2>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 bg-bg-offset dark:bg-slate-800/40 border border-white/5 rounded-[48px] p-10 flex flex-col gap-10 relative overflow-hidden min-h-[500px]">
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-4">
              <div className="space-y-1">
                 <h3 className="text-2xl font-black italic uppercase tracking-tight">Clinical Productivity Graph</h3>
                 <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] opacity-60 font-display">Time-series variance of shard throughput (V2.1.2)</p>
              </div>
              <div className="flex items-center gap-4 bg-bg-base dark:bg-black/20 p-2 rounded-2xl border border-white/5">
                 <Button className="px-5 py-2.5 rounded-xl bg-accent-primary text-white text-[9px] font-black uppercase shadow-lg shadow-accent-primary/20 border-none">Monthly</Button>
                 <Button className="px-5 py-2.5 rounded-xl text-text-secondary text-[9px] font-black uppercase border-none">Quarterly</Button>
              </div>
           </div>

           <div className="flex-1 flex items-end justify-between gap-1 md:gap-3 relative z-10 px-4 pt-10">
              {chartData.map((node, i) => {
                const maxVal = Math.max(...chartData.map(d => d.total_patients || 0), 1);
                const height = ((node.total_patients || 0) / maxVal) * 100;
                return (
                    <div key={i} className="flex-1 relative group h-full flex flex-col justify-end">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(height, 5)}%` }}
                        transition={{ delay: i * 0.05, duration: 1 }}
                        className="w-full bg-accent-primary/20 group-hover:bg-accent-primary rounded-t-2xl transition-all relative overflow-hidden"
                      >
                        <div className="absolute inset-x-0 bottom-0 bg-accent-primary h-full opacity-40 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[8px] font-black text-white">{node.total_patients}</div>
                      </motion.div>
                      <p className="text-[8px] font-black text-text-secondary/40 text-center mt-4 uppercase tracking-tighter truncate">{node.date?.split('-')[2] || `M${i+1}`}</p>
                    </div>
                )
              })}
           </div>
        </Card>

        <div className="lg:col-span-4 flex flex-col gap-8">
           <Card className="p-8 bg-bg-offset dark:bg-slate-800/40 border border-white/5 rounded-[44px] space-y-8 flex-1 relative overflow-hidden hover:bg-bg-base dark:hover:bg-white/5 transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full group-hover:scale-125 transition-transform" />
              <div className="space-y-4">
                 <h2 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-3">
                    <Activity size={20} className="text-emerald-500" /> System Uptime
                 </h2>
                 <p className="text-xs font-bold text-text-secondary uppercase tracking-[0.1em] opacity-60">Real-time status of clinical shards and matrix gateways across the network.</p>
              </div>

              <div className="space-y-10 pt-4">
                 {[
                   { label: 'OPD Matrix', status: 'Optimal', load: '12%', color: 'emerald' },
                   { label: 'Revenue Kernel', status: 'Stable', load: '64%', color: 'accent' },
                   { label: 'Voice AI Shard', status: 'Optimal', load: '04%', color: 'emerald' },
                   { label: 'Identity Gate', status: 'Optimal', load: '18%', color: 'emerald' },
                 ].map(item => (
                   <div key={item.label} className="space-y-4 group/item">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase italic tracking-widest">
                         <span className="text-text-primary dark:text-white opacity-80 group-hover/item:text-accent-primary transition-colors">{item.label}</span>
                         <span className={`text-${item.color}-500`}>{item.status}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                         <div className={`h-full bg-${item.color}-500 rounded-full shadow-[0_0_10px] shadow-${item.color}-500/20`} style={{ width: item.load }} />
                      </div>
                      <div className="flex justify-between text-[8px] font-black uppercase opacity-40">
                         <span>CPU Util: {item.load}</span>
                         <span>Relay 0.0${Math.floor(Math.random()*9)}s</span>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
