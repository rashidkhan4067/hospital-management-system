import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Users, Activity, Wallet, Calendar, Filter } from 'lucide-react';
import { Card, Button, PageHeader, StatsCard } from '../../../components/ui';
import { motion } from 'framer-motion';
import AdminPage from '../../../components/layout/AdminPage'; // ✨ THE BASE FILE

import { useAdminAnalytics } from '../../../hooks/admin/useAdminAnalytics';

/**
 * 📊 Protocol Analytics & Intelligence Hub
 */
export default function Stats() {
  const { pulse, clinicalTrends, loading } = useAdminAnalytics();

  const stats = [
    { 
        title: 'Global Throughput', 
        value: loading ? '...' : (pulse?.clinical?.today?.total_patients || '0'), 
        icon: Users, 
        trend: pulse?.clinical?.delta || '+0.0%' 
    },
    { 
        title: 'Daily Appointments', 
        value: loading ? '...' : (pulse?.clinical?.today?.appointments || '0'), 
        icon: Calendar, 
        trend: 'Steady' 
    },
    { 
        title: 'Net Revenue', 
        value: loading ? '...' : `Rs. ${((pulse?.financial?.today?.total_revenue || 0) / 1000).toFixed(1)}k`, 
        icon: Wallet, 
        trend: pulse?.financial?.delta || 'Steady' 
    },
    { 
        title: 'Current Admissions', 
        value: loading ? '...' : (pulse?.clinical?.today?.admissions || '0'), 
        icon: Activity, 
        trend: 'Live' 
    },
  ];

  const chartData = clinicalTrends?.length > 0 ? clinicalTrends.slice(0, 12).reverse() : Array(12).fill({ total_patients: 0 });

  return (
    <AdminPage>
      <PageHeader 
        title="Protocol Analytics" 
        subtitle="Global Clinical Intelligence & Throughput Shards"
        actions={
            <div className="flex items-center gap-4 bg-white dark:bg-slate-800/40 p-1.5 rounded-2xl border border-slate-200/40 shadow-xl backdrop-blur-3xl shrink-0">
                <Button className="bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border-none">
                   <Filter size={14} /> Refine Matrix
                </Button>
                <div className="w-px h-8 bg-slate-200 dark:bg-white/10 self-center mx-1" />
                <Button className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all">
                   <BarChart3 size={18} /> Generate Index
                </Button>
            </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[600px] animate-in slide-in-from-bottom duration-1000 delay-200">
        <Card className="lg:col-span-8 matrix-card p-12 border-none flex flex-col gap-10 relative overflow-hidden">
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-6">
              <div className="space-y-2">
                 <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Clinical Productivity Shard</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-display">Time-series variance of resource throughput (V2.1.2)</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-black/20 p-2 rounded-2xl border border-slate-100 dark:border-white/5">
                 <Button className="px-6 py-3 rounded-xl bg-accent-primary text-white text-[10px] font-black uppercase shadow-lg border-none hover:brightness-110 transition-all">Monthly</Button>
                 <Button className="px-6 py-3 rounded-xl text-slate-400 text-[10px] font-black uppercase border-none hover:text-accent-primary transition-colors">Quarterly</Button>
              </div>
           </div>

           <div className="flex-1 flex items-end justify-between gap-1 md:gap-4 relative z-10 px-4 pt-14 pb-10">
              {chartData.map((node, i) => {
                const maxVal = Math.max(...chartData.map(d => d.total_patients || 0), 1);
                const height = ((node.total_patients || 0) / maxVal) * 100;
                return (
                    <div key={i} className="flex-1 relative group h-full flex flex-col justify-end">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(height, 8)}%` }}
                        transition={{ delay: i * 0.05, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full bg-accent-primary/10 group-hover:bg-accent-primary/30 rounded-t-2xl transition-all relative overflow-hidden group-hover:scale-x-110 origin-bottom"
                      >
                        <div className="absolute inset-x-0 bottom-0 bg-accent-primary h-full opacity-30 group-hover:opacity-80 transition-opacity" />
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-black text-white tabular-nums transition-all -translate-y-2 group-hover:translate-y-0">{node.total_patients}</div>
                      </motion.div>
                      <p className="text-[9px] font-black text-slate-400 text-center mt-6 uppercase tracking-widest tabular-nums opacity-60 group-hover:opacity-100 transition-opacity">{node.date?.split('-')[2] || `M${i+1}`}</p>
                    </div>
                )
              })}
           </div>
        </Card>

        <div className="lg:col-span-4 flex flex-col gap-10">
           <Card className="matrix-card p-10 border-none space-y-10 flex-1 hover:brightness-105 transition-all group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 blur-[80px] rounded-full group-hover:scale-150 transition-transform" />
              <div className="space-y-4 relative z-10">
                 <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white flex items-center gap-4">
                    <Activity size={24} className="text-emerald-500 animate-pulse" /> System Uptime Node
                 </h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.1em] opacity-80 leading-relaxed">Real-time status of clinical shards and matrix gateways across the clinical network.</p>
              </div>

              <div className="space-y-12 pt-6 relative z-10">
                 {[
                   { label: 'OPD Matrix Grid', status: 'Optimal', load: '12%', color: 'emerald' },
                   { label: 'Revenue Kernel Pulse', status: 'Stable', load: '64%', color: 'accent' },
                   { label: 'Voice AI Shard Sync', status: 'Optimal', load: '04%', color: 'emerald' },
                   { label: 'Identity Gate Flow', status: 'Optimal', load: '18%', color: 'emerald' },
                 ].map(item => (
                   <div key={item.label} className="space-y-4 group/item">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase italic tracking-[0.2em] transition-colors">
                         <span className="text-slate-400 group-hover/item:text-accent-primary">{item.label}</span>
                         <span className={item.color === 'emerald' ? 'text-emerald-500' : 'text-accent-primary'}>{item.status}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden flex">
                         <div className={`h-full group-hover/item:brightness-110 transition-all rounded-full ${item.color === 'emerald' ? 'bg-emerald-500' : 'bg-accent-primary'}`} style={{ width: item.load }} />
                      </div>
                      <div className="flex justify-between text-[8px] font-black uppercase opacity-40 italic tracking-widest">
                         <span>Load: {item.load}</span>
                         <span>Latency: 0.0${Math.floor(Math.random()*9)}s</span>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </AdminPage>
  );
}

