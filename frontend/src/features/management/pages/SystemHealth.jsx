import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Zap, 
  Database, 
  Server, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  ArrowUpRight,
  RefreshCw,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { PageHeader, Button, Card, Badge } from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';

// ─── MOCK TELEMETRY DATA ───────────────────────────────────────────────────

const PERFORMANCE_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  cpu: Math.floor(Math.random() * 30) + 40,
  memory: Math.floor(Math.random() * 20) + 60,
  latency: Math.floor(Math.random() * 50) + 10,
}));

const SYSTEM_LOGS = [
  { id: 1, type: 'success', event: 'Primary Node Sync', time: '2m ago', details: 'Shard-X4 mapped to Ward-7B' },
  { id: 2, type: 'warning', event: 'Archive Propagation', time: '14m ago', details: 'Cold storage indexing at 0.8x speed' },
  { id: 3, type: 'success', event: 'EMR Vector Cache', time: '22m ago', details: 'Purge protocol completed' },
  { id: 4, type: 'error', event: 'Identity Gateway', time: '1h ago', details: 'Unauthorized node attempt blocked' },
];

// ─── SHARD COMPONENTS ────────────────────────────────────────────────────────

const ResourceShard = ({ label, value, icon: Icon, color }) => (
  <Card className="p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 flex flex-col gap-4 shadow-2als transition-transform hover:scale-[1.02] duration-500 overflow-hidden relative group">
     <div className="flex items-center justify-between relative z-10">
        <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-500 group-hover:scale-110 transition-transform`}>
           <Icon size={20} strokeWidth={2.5} />
        </div>
        <div className="flex items-center gap-1.5 opacity-40">
           <div className={`w-1 h-1 rounded-full bg-${color}-500 animate-pulse`} />
           <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Live Pulse</span>
        </div>
     </div>
     <div className="space-y-1 relative z-10">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{label}</p>
        <p className="text-2xl font-black text-slate-900 dark:text-white uppercase italic font-display tracking-tighter">{value}</p>
     </div>
     <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-${color}-500/5 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-1000`} />
  </Card>
);

const LogShard = ({ log }) => {
  const colors = {
    success: 'emerald',
    warning: 'amber',
    error: 'rose'
  };
  const Icon = log.type === 'error' ? AlertCircle : (log.type === 'warning' ? Zap : CheckCircle);
  
  return (
    <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-black/20 rounded-[2rem] border border-transparent hover:border-accent-primary/10 transition-all group italic">
       <div className="flex items-center gap-5">
          <div className={`w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-${colors[log.type]}-500 shadow-sm`}>
             <Icon size={18} strokeWidth={2.5} />
          </div>
          <div className="space-y-0.5">
             <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{log.event}</p>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60 leading-none">{log.details}</p>
          </div>
       </div>
       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-40">{log.time}</span>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function SystemHealth() {
  const kpis = [
    { label: 'System Vitals', value: 'OPTIMAL', icon: Activity, trend: '+99.2%', status: 'success' },
    { label: 'Neural Delay', value: '14.2ms', icon: Clock, trend: 'Stable', status: 'processing' },
    { label: 'Data Registry', value: '42.1 TB', icon: Database, trend: '82%', status: 'success' },
    { label: 'Grid Response', value: 'Ultra-Low', icon: Zap, trend: '-2.4%', status: 'success' },
  ];

  return (
    <AdminPage>
      <div className="space-y-8 animate-in fade-in duration-1000 italic pb-20">
        
        <PageHeader 
          title="System Vitality Hub" 
          subtitle="Institutional Core Diagnostics & Shard Performance Matrix"
          actions={
            <div className="flex items-center gap-3">
               <button className="p-3 bg-white dark:bg-slate-900 rounded-2xl text-slate-400 hover:text-accent-primary transition-all shadow-2als border border-slate-50 dark:border-white/5">
                  <Terminal size={18} strokeWidth={2.5} />
               </button>
               <Button className="bg-accent-primary text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/25 border-none hover:rotate-2 transition-transform">
                  <RefreshCw size={16}/> Refresh Grid Data
               </Button>
            </div>
          }
        />

        <UnifiedHeroCTA 
          compact
          title={<>Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Intelligence.</span></>}
          subtitle="Real-time performance metrics and infrastructure status. Monitoring the clinical grid's neural core and cross-departmental synchronization."
          pillPrefix="Vitality Pulse Matrix"
          pillIcon={Activity}
          actions={[
             { title: 'Re-Index', subtitle: 'Metadata Force', icon: Layers, onClick: () => {} },
             { title: 'Purge Cache', subtitle: 'Neural Reset', icon: RefreshCw, onClick: () => {} }
          ]}
        />

        <UnifiedKpiGrid loading={false} stats={kpis} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <ResourceShard label="CPU Core Array" value="42%" icon={Cpu} color="accent" />
           <ResourceShard label="Memory Propagation" value="6.4 GB" icon={Server} color="blue" />
           <ResourceShard label="Storage Density" value="82.4%" icon={HardDrive} color="amber" />
           <ResourceShard label="Network Throughput" value="1.2 Gb/s" icon={Zap} color="emerald" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
           
           {/* 📈 PERFORMANCE TELEMETRY */}
           <Card className="lg:col-span-8 p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als space-y-10 relative overflow-hidden group">
              <div className="flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-accent-primary rounded-full shadow-lg" />
                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white font-display">Neural Performance Spectrum</h3>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-accent-primary" />
                       <span className="text-[10px] font-black uppercase text-slate-400 italic">CPU Load</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-blue-500" />
                       <span className="text-[10px] font-black uppercase text-slate-400 italic">Memory Link</span>
                    </div>
                 </div>
              </div>

              <div className="h-[350px] w-full relative z-10">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PERFORMANCE_DATA}>
                       <defs>
                          <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="time" hide />
                       <YAxis hide domain={[0, 100]} />
                       <Tooltip 
                          contentStyle={{ 
                             backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                             border: 'none', 
                             borderRadius: '1.5rem',
                             fontSize: '10px',
                             fontWeight: 'bold',
                             textTransform: 'uppercase',
                             fontStyle: 'italic',
                             color: 'white'
                          }} 
                       />
                       <Area 
                          type="monotone" 
                          dataKey="cpu" 
                          stroke="#14b8a6" 
                          strokeWidth={4}
                          fillOpacity={1} 
                          fill="url(#colorCpu)" 
                       />
                       <Area 
                          type="monotone" 
                          dataKey="memory" 
                          stroke="#3b82f6" 
                          strokeWidth={4}
                          fillOpacity={1} 
                          fill="url(#colorMem)" 
                       />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </Card>

           {/* 📜 SYSTEM LOG STREAM */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-slate-300 rounded-full" />
                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white font-display">Log Shards</h3>
                 </div>
                 <button className="text-[10px] font-black uppercase text-accent-primary italic hover:underline">View Ledger</button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                 {SYSTEM_LOGS.map(log => (
                    <LogShard key={log.id} log={log} />
                 ))}
              </div>

              <Card className="p-8 rounded-[3rem] bg-slate-900 border-none relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                 <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12">
                       <ShieldCheck size={20} className="text-white" />
                    </div>
                    <div className="space-y-1">
                       <p className="text-[12px] font-black text-white uppercase italic tracking-tighter">Security Protocol L9</p>
                       <p className="text-[8px] font-black text-white/40 uppercase tracking-widest italic">Fully Active & Encrypted</p>
                    </div>
                 </div>
                 <Button className="w-full mt-8 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl py-4 text-[9px] font-black uppercase tracking-[0.4em] transition-all relative z-10 italic font-display">
                    Audit Safety Shards
                 </Button>
              </Card>
           </div>
        </div>

      </div>
    </AdminPage>
  );
}
