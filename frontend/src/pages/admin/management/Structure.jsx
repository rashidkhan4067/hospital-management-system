import React from 'react';
import { Settings, MoreHorizontal, ShieldAlert, Key, Fingerprint, Lock, Activity, Database, Cloud, Zap } from 'lucide-react';
import { Card, Button } from '../../../components/ui';
import { motion } from 'framer-motion';
import { useAdminSystem } from '../../../hooks/admin/useAdminSystem';
import PageLoader from '../../../components/common/Loading';

export default function SystemTopology() {
  const { departments, alerts, auditLogs, loading } = useAdminSystem();

  if (loading) return <PageLoader />;

  const sections = [
    { title: 'Identity Gateways', icon: <Fingerprint />, color: 'accent', status: 'Secure', description: 'Modify global OAuth2.0 and identity mapping shards.' },
    { title: 'Clinical Unit Nodes', icon: <Database />, color: 'indigo', status: `${departments.length} Units`, description: `${departments.filter(d => d.is_active).length} active unit shards synchronized.` },
    { title: 'Alert Node Pulse', icon: <Zap />, color: 'amber', status: `${alerts.length} Alerts`, description: `Propagated global notifications across the network.` },
    { title: 'Security Audit Ledger', icon: <ShieldAlert />, color: 'blue', status: `${auditLogs.length} Events`, description: 'Immutable access events captured in real-time.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2">
         <div className="space-y-1">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-6 bg-accent-primary rounded-full shadow-lg shadow-accent-primary/20" />
               <h1 className="text-xl md:text-2xl font-black text-text-primary dark:text-white tracking-tight uppercase italic font-display">System Topology</h1>
            </div>
            <p className="text-[9px] font-bold text-text-secondary dark:text-white/30 uppercase tracking-[0.3em] ml-5 opacity-60">Master Configuration Table</p>
         </div>

         <Button className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2">
            <Settings size={16} /> Deploy Configuration
         </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-8 bg-bg-offset dark:bg-slate-800/40 border border-white/5 rounded-[44px] relative overflow-hidden group hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-bg-base dark:bg-white/5 flex items-center justify-center border border-white/5 shadow-inner text-${section.color}-500 group-hover:rotate-6 transition-transform`}>
                  {section.icon && React.cloneElement(section.icon, { size: 28 })}
                </div>
                <div className="px-3 py-1 rounded-full bg-white/10 text-[8px] font-black uppercase tracking-widest text-emerald-500">{section.status}</div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-black text-text-primary dark:text-white uppercase italic tracking-tight">{section.title}</h3>
                <p className="text-[10px] font-bold text-text-secondary leading-relaxed uppercase opacity-40">{section.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        <section className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-4">
                 <div className="w-1 h-8 bg-accent-primary rounded-full" />
                 <h2 className="text-lg font-black italic uppercase tracking-tight">Protocol Constants</h2>
              </div>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Clinical Redundancy Factor', value: '0.82', desc: 'Auto-shard replication coefficient' },
                { label: 'Entropy Shield Level', value: 'Level 5', desc: 'Neural core encryption strength' },
                { label: 'Latency Buffer (MAX)', value: '250ms', desc: 'Global timeout for clinical shards' },
                { label: 'Archive Propagation Delay', value: '42s', desc: 'Cold storage indexing speed' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-6 bg-bg-offset dark:bg-slate-800/40 border border-white/5 rounded-[32px] group hover:bg-white/10">
                   <div className="space-y-1">
                      <p className="text-[12px] font-black uppercase italic text-text-primary">{item.label}</p>
                      <p className="text-[9px] font-black text-text-secondary uppercase opacity-40 italic tracking-widest">{item.desc}</p>
                   </div>
                   <div className="flex items-center gap-6">
                      <p className="text-xl font-black text-accent-primary italic">{item.value}</p>
                      <button className="p-3 bg-bg-base dark:bg-black/20 rounded-xl hover:text-accent-primary transition-all shadow-inner"><MoreHorizontal size={14} /></button>
                   </div>
                </div>
              ))}
           </div>
        </section>

        <section className="lg:col-span-4 space-y-8">
           <Card className="p-8 bg-bg-offset dark:bg-slate-800/40 border border-white/5 rounded-[44px] space-y-8 h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full group-hover:scale-125 transition-transform" />
              <div className="space-y-4">
                 <h2 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-3">
                    <ShieldAlert size={20} className="text-rose-500" /> Security Shards
                 </h2>
                 <p className="text-xs font-bold text-text-secondary uppercase tracking-[0.1em] opacity-60">Global system configuration and security level benchmarks.</p>
              </div>

              <div className="space-y-10 pt-4">
                 <div className="space-y-6">
                    <div className="flex justify-between text-[11px] font-black uppercase italic">
                       <span>Encryption Strength</span>
                       <span className="text-accent-primary">99.9%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '99.9%' }}
                        className="h-full bg-accent-primary rounded-full shadow-[0_0_15px_rgba(var(--color-accent-primary),0.5)]" />
                    </div>
                 </div>
                 
                 <div className="bg-bg-base dark:bg-black/20 p-8 rounded-[40px] border border-white/5 space-y-6">
                    <div className="flex items-center gap-4">
                       <Activity size={24} className="text-rose-500" />
                       <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase italic">Protocol Alert</p>
                          <p className="text-[8px] font-black uppercase text-text-secondary opacity-40">System Heartbeat active</p>
                       </div>
                    </div>
                    <hr className="border-white/5" />
                    <Button className="w-full bg-rose-500/10 text-rose-500 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                       <Lock size={14} /> Terminate All Shards
                    </Button>
                 </div>
              </div>
           </Card>
        </section>
      </div>
    </div>
  );
}
