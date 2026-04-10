import React, { useState } from 'react';
import { 
  Globe, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Bell, 
  Send, 
  Sliders, 
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  CheckCircle,
  Clock,
  Mic,
  Settings,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { PageHeader, Button, Card, Badge } from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';

// ─── MOCK GATEWAY DATA ────────────────────────────────────────────────────────

const DISPATCH_STATS = [
  { name: 'SMS', volume: 4200, success: 98, color: '#14b8a6' },
  { name: 'Email', volume: 12500, success: 99.8, color: '#3b82f6' },
  { name: 'Push', volume: 8900, success: 94.2, color: '#8b5cf6' },
  { name: 'Sana Voice', volume: 1200, success: 100, color: '#f59e0b' },
];

// ─── SHARD COMPONENTS ────────────────────────────────────────────────────────

const GatewayShard = ({ title, icon: Icon, description, status, health }) => (
  <Card className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als transition-all hover:scale-[1.02] duration-500 overflow-hidden relative group italic">
     <div className="flex items-center justify-between relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-black/20 flex items-center justify-center text-slate-400 group-hover:text-accent-primary group-hover:bg-accent-primary/10 transition-all duration-500">
           <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col items-end gap-1.5">
           <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest italic">Live Gateway</Badge>
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-40">{health}% Health</span>
        </div>
     </div>
     
     <div className="mt-8 space-y-4 relative z-10">
        <div>
           <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase font-display tracking-tighter italic leading-tight">{title}</h4>
           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-70 mt-1">{description}</p>
        </div>
        <div className="pt-4 flex items-center justify-between border-t border-slate-50 dark:border-white/5">
           <button className="text-[10px] font-black uppercase text-accent-primary hover:underline transition-all">Protocol Setup</button>
           <button className={`w-10 h-5 rounded-full relative transition-all ${status ? 'bg-accent-primary' : 'bg-slate-200'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${status ? 'left-5.5' : 'left-0.5'}`} />
           </button>
        </div>
     </div>
     <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent-primary/5 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
  </Card>
);

// ─── MAIN HUB ────────────────────────────────────────────────────────────────

export default function GatewaySettings() {
  const kpis = [
    { label: 'Dispatch Success', value: '98.8%', icon: Send, trend: '+0.4%', status: 'success' },
    { label: 'Gateway Shards', value: '04 LIVE', icon: Globe, trend: 'Optimal', status: 'success' },
    { label: 'Neural IQ Sync', value: 'ULTRA', icon: Sliders, trend: 'Stable', status: 'processing' },
    { label: 'Security Pulse', value: 'L9 CORE', icon: ShieldCheck, trend: 'Encrypted', status: 'success' },
  ];

  return (
    <AdminPage>
      <div className="space-y-8 animate-in fade-in duration-1000 italic pb-20">
        
        <PageHeader 
          title="Communication Gateway" 
          subtitle="Multi-Channel Shard Orchestration & Institutional Dispatcher Hub"
          actions={
            <div className="flex items-center gap-3">
               <button className="p-3 bg-white dark:bg-slate-900 rounded-2xl text-slate-400 hover:text-accent-primary transition-all shadow-2als border border-slate-50 dark:border-white/5">
                  <RefreshCw size={18} strokeWidth={2.5} />
               </button>
               <Button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl border-none hover:scale-105 transition-all">
                  <Plus size={16}/> Register Gateway Node
               </Button>
            </div>
          }
        />

        <UnifiedHeroCTA 
          compact
          title={<>Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Propagation.</span></>}
          subtitle="Master institutional communication matrix. Orchestrate real-time clinical alerts, SMS protocols, and Sana AI Voice notification shards."
          pillPrefix="Gateway Flux Hub"
          pillIcon={Bell}
          actions={[
             { title: 'Test Dispatch', subtitle: 'Global Ping', icon: Zap, onClick: () => {} },
             { title: 'Security Audit',  subtitle: 'API Registry',  icon: Lock, onClick: () => {} }
          ]}
        />

        <UnifiedKpiGrid loading={false} stats={kpis} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <GatewayShard title="SMS Protocol" icon={Smartphone} description="Global cellular shard link" status={true} health={100} />
           <GatewayShard title="Email SMTP" icon={Mail} description="Institutional mail relay node" status={true} health={99} />
           <GatewayShard title="Neural Push" icon={MessageSquare} description="In-app clinical dispatcher" status={true} health={94} />
           <GatewayShard title="Sana Voice" icon={Mic} description="AI voice notification matrix" status={false} health={0} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
           
           {/* 📊 DISPATCH TELEMETRY */}
           <Card className="lg:col-span-8 p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als space-y-10 relative overflow-hidden group">
              <div className="flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-accent-primary rounded-full shadow-lg" />
                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white font-display">Dispatch Flux Matrix</h3>
                 </div>
                 <div className="flex items-center gap-6 text-[10px] font-black uppercase text-slate-400 italic">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent-primary" /> Success Vol %</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-white/10" /> Load Tier</span>
                 </div>
              </div>

              <div className="h-[350px] w-full relative z-10 mt-10">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DISPATCH_STATS}>
                       <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false}
                          tick={{ fontSize: 10, fontWeight: '900', fill: '#94a3b8', textAnchor: 'middle' }}
                       />
                       <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ 
                             backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                             border: 'none', 
                             borderRadius: '1.5rem',
                             fontSize: '10px',
                             fontWeight: 'bold',
                             textTransform: 'uppercase',
                             fontStyle: 'italic'
                          }}
                       />
                       <Bar 
                          dataKey="volume" 
                          radius={[20, 20, 20, 20]} 
                          barSize={60}
                       >
                          {DISPATCH_STATS.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </Card>

           {/* 🛡️ SECURITY SHARD & WHITELIST */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              <Card className="p-8 rounded-[3rem] bg-slate-900 border-none space-y-10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                 
                 <div className="space-y-6 relative z-10 italic">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12">
                          <Settings size={24} className="text-white" />
                       </div>
                       <h4 className="text-lg font-black text-white uppercase font-display tracking-tighter">Gateway Security</h4>
                    </div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">Identity verification and node whitelisting for all inbound clinical dispatch requests.</p>
                 </div>

                 <div className="space-y-3 relative z-10 italic">
                    <WhitelistItem ip="192.168.1.1" label="Main Institutional Hub" status="Verified" />
                    <WhitelistItem ip="45.12.98.22" label="Sana AI Voice Core" status="Verified" />
                    <WhitelistItem ip="88.24.11.04" label="Global SMS Shard" status="Proxy" />
                 </div>

                 <Button className="w-full bg-accent-primary text-white py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] italic shadow-2xl hover:scale-[1.02] transition-all border-none font-display relative z-10">
                    Propagate Whitelist
                 </Button>
              </Card>

              <Card className="flex-1 p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 flex flex-col justify-center gap-4 relative overflow-hidden group italic text-center">
                 <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-black/20 flex items-center justify-center text-slate-400 mx-auto mb-2">
                    <Sliders size={20} />
                 </div>
                 <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">Neural Throttling</h4>
                 <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-primary w-[14%]" />
                 </div>
                 <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Load: 14.2 ops/s</p>
              </Card>
           </div>

        </div>

      </div>
    </AdminPage>
  );
}

function WhitelistItem({ ip, label, status }) {
   return (
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 group/item hover:bg-white/10 transition-colors">
         <div className="flex flex-col">
            <span className="text-[11px] font-black text-white uppercase tracking-tighter leading-none">{ip}</span>
            <span className="text-[7px] font-bold text-white/40 uppercase tracking-widest mt-1 opacity-60 leading-none">{label}</span>
         </div>
         <Badge className={`bg-${status === 'Verified' ? 'emerald' : 'amber'}-500/10 text-${status === 'Verified' ? 'emerald' : 'amber'}-500 border-none px-3 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest`}>
            {status}
         </Badge>
      </div>
   );
}
