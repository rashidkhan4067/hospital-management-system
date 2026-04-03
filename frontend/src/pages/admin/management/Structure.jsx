import React from 'react';
import { Settings, MoreHorizontal, ShieldAlert, Key, Fingerprint, Lock, Activity, Database, Zap } from 'lucide-react';
import { Card, Button, PageHeader, StatsCard } from '../../../components/ui';
import { motion } from 'framer-motion';
import { useAdminSystem } from '../../../hooks/admin/useAdminSystem';
import AdminPage from '../../../components/layout/AdminPage'; // ✨ THE BASE FILE

/**
 * 🗺️ System Topology & Master Configuration
 */
export default function Structure() {
  const { departments, alerts, auditLogs, loading } = useAdminSystem();

  const sections = [
    { title: 'Identity Gateways', icon: Fingerprint, trend: 'Secure', value: 'L5 Auth', color: 'accent' },
    { title: 'Clinical Unit Nodes', icon: Database, value: departments.length, trend: 'Operational' },
    { title: 'Alert Node Pulse', icon: Zap, value: alerts.length, trend: 'Live' },
    { title: 'Security Audit Shards', icon: ShieldAlert, value: auditLogs.length, trend: 'Verified' },
  ];

  return (
    <AdminPage>
      <PageHeader 
        title="System Topology" 
        subtitle="Master Configuration Matrix & Clinical Grid Orchestration"
        actions={
            <Button className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all">
                <Settings size={18} /> Deploy Configuration Shard
            </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {sections.map((section, i) => <StatsCard key={i} {...section} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-bottom duration-1000 delay-200">
        <section className="lg:col-span-8 space-y-10">
           <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-5">
                 <div className="w-1.5 h-8 bg-accent-primary rounded-full shadow-lg" />
                 <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Protocol Constants</h2>
              </div>
           </div>

           <div className="grid grid-cols-1 gap-6">
              {[
                { label: 'Clinical Redundancy Factor', value: '0.82', desc: 'Auto-shard replication coefficient' },
                { label: 'Entropy Shield Level', value: 'Level 5', desc: 'Neural core encryption strength' },
                { label: 'Latency Buffer (MAX)', value: '250ms', desc: 'Global timeout for clinical shards' },
                { label: 'Archive Propagation Delay', value: '42s', desc: 'Cold storage indexing speed' },
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[32px] group hover:border-accent-primary/20 hover:translate-x-2 transition-all duration-500 shadow-sm"
                >
                   <div className="space-y-1">
                      <p className="text-[13px] font-black uppercase italic text-slate-900 dark:text-white tracking-tight">{item.label}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase opacity-60 italic tracking-widest">{item.desc}</p>
                   </div>
                   <div className="flex items-center gap-8">
                      <p className="text-2xl font-black text-accent-primary italic tabular-nums">{item.value}</p>
                      <button className="p-3 bg-slate-50 dark:bg-black/20 rounded-xl hover:text-accent-primary transition-all shadow-inner"><MoreHorizontal size={16} /></button>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>

        <section className="lg:col-span-4 flex flex-col gap-10">
           <Card className="matrix-card p-10 border-none space-y-10 flex-1 hover:brightness-105 transition-all group overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 blur-[80px] rounded-full group-hover:scale-150 transition-transform" />
              <div className="space-y-4 relative z-10">
                 <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white flex items-center gap-4">
                    <ShieldAlert size={24} className="text-rose-500" /> Security Shards
                 </h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.1em] opacity-80 leading-relaxed">Global system configuration and security level benchmarks.</p>
              </div>

              <div className="space-y-12 pt-6 relative z-10">
                 <div className="space-y-6">
                    <div className="flex justify-between text-[11px] font-black uppercase italic tracking-widest">
                       <span className="text-slate-400">Encryption Pulse</span>
                       <span className="text-accent-primary tabular-nums">99.9%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '99.9%' }}
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-accent-primary rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
                    </div>
                 </div>
                 
                 <div className="bg-slate-50 dark:bg-black/20 p-10 rounded-[40px] border border-slate-100 dark:border-white/5 space-y-8 shadow-inner">
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-rose-500 shadow-lg">
                          <Activity size={28} />
                       </div>
                       <div className="space-y-1">
                          <p className="text-[12px] font-black uppercase italic text-slate-900 dark:text-white">Global Protocol Alert</p>
                          <p className="text-[9px] font-black uppercase text-slate-400 italic">System Heartbeat: Optimal</p>
                       </div>
                    </div>
                    <hr className="border-slate-100 dark:border-white/5" />
                    <Button className="w-full bg-rose-500/10 text-rose-500 py-5 rounded-[22px] text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 border-none hover:bg-rose-500 hover:text-white transition-all shadow-xl shadow-rose-500/10">
                       <Lock size={16} fill="currentColor" /> Kill All Shards
                    </Button>
                 </div>
              </div>
           </Card>
        </section>
      </div>
    </AdminPage>
  );
}

