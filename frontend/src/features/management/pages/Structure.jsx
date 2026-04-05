import React, { useState } from 'react';
import { 
  Building2, 
  Map, 
  Database, 
  Zap, 
  ShieldAlert, 
  Settings, 
  MoreHorizontal, 
  Plus, 
  ArrowUpRight,
  Activity,
  Layers,
  Search,
  CheckCircle,
  Globe,
  Radio,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button, Card, Badge } from '@/shared/components/ui';
import AdminPage from '@/shared/components/layout/AdminPage';
import UnifiedHeroCTA from '@/shared/components/common/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/shared/components/common/UnifiedKpiGrid';

// ─── SHARD COMPONENTS ────────────────────────────────────────────────────────

const TopologyNode = ({ label, icon: Icon, value, status, trend }) => (
  <Card className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als transition-all hover:scale-[1.02] duration-500 overflow-hidden relative group italic">
     <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
     <div className="flex items-center justify-between relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-black/20 flex items-center justify-center text-slate-400 group-hover:text-accent-primary group-hover:bg-accent-primary/10 transition-all duration-500">
           <Icon size={24} strokeWidth={2.5} />
        </div>
        <Badge className={`bg-${status === 'Live' ? 'emerald' : 'amber'}-500/10 text-${status === 'Live' ? 'emerald' : 'amber'}-500 border-none px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest`}>
           {status}
        </Badge>
     </div>
     <div className="mt-8 space-y-1 relative z-10">
        <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <div className="flex items-baseline gap-3">
           <h4 className="text-3xl font-black text-slate-900 dark:text-white uppercase font-display tracking-tighter">{value}</h4>
           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{trend}</span>
        </div>
     </div>
  </Card>
);

const UnitShard = ({ name, type, head, load }) => (
  <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-transparent hover:border-accent-primary/20 transition-all group cursor-pointer relative overflow-hidden italic">
     <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-accent-primary shadow-sm group-hover:scale-110 transition-transform">
              <Building2 size={20} strokeWidth={2.5} />
           </div>
           <div className="space-y-0.5">
              <p className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tighter font-display leading-none">{name}</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-60 leading-none">{type} Shard</p>
           </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-40">Load Pulse</p>
           <div className="w-20 h-1.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full bg-accent-primary rounded-full`} style={{ width: `${load}%` }} />
           </div>
        </div>
     </div>
     <div className="mt-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 border border-slate-100 dark:border-white/5 shadow-sm">
              <Activity size={10} />
           </div>
           <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{head}</span>
        </div>
        <button className="text-[9px] font-black uppercase text-accent-primary hover:underline transition-all">Configure Node</button>
     </div>
  </div>
);

// ─── MAIN HUB ────────────────────────────────────────────────────────────────

export default function Structure() {
  const kpis = [
    { label: 'Facility Units', value: '18 NODES', icon: Building2, trend: 'Stable', status: 'success' },
    { label: 'Grid Topology', value: 'LIVE', icon: Map, trend: 'Optimized', status: 'success' },
    { label: 'Clinical Flow', value: '88%', icon: Activity, trend: '+4.2%', status: 'processing' },
    { label: 'Security Link', value: 'VERIFIED', icon: ShieldAlert, trend: 'L9 Core', status: 'success' },
  ];

  return (
    <AdminPage>
      <div className="space-y-8 animate-in fade-in duration-1000 italic pb-20">
        
        <PageHeader 
          title="Institutional Topology" 
          subtitle="Master Facility Architecture & Clinical Grid Orchestration"
          actions={
            <div className="flex items-center gap-3">
               <button className="p-3 bg-white dark:bg-slate-900 rounded-2xl text-slate-400 hover:text-accent-primary transition-all shadow-2als border border-slate-50 dark:border-white/5">
                  <Globe size={18} strokeWidth={2.5} />
               </button>
               <Button className="bg-accent-primary text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/25 border-none flex items-center gap-3 hover:scale-105 transition-all">
                  <Plus size={16}/> Provision New Shard
               </Button>
            </div>
          }
        />

        <UnifiedHeroCTA 
          compact
          title={<>Spatial <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Intelligence.</span></>}
          subtitle="Orchestrating the institutional physical matrix. Manage departments, clinical units, and spatial wards through the neural topology hub."
          pillPrefix="Facility Core Command"
          pillIcon={Map}
          actions={[
             { title: 'Graph Sync', subtitle: 'Spatial Matrix', icon: Radio, onClick: () => {} },
             { title: 'Unit Audit',  subtitle: 'Node Density',  icon: Layers, onClick: () => {} }
          ]}
        />

        <UnifiedKpiGrid loading={false} stats={kpis} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <TopologyNode label="Clinical Sector Alpha" value="12" status="Live" trend="Active" icon={Database} />
           <TopologyNode label="Network Gateway Shards" value="4" status="Live" trend="Secure" icon={Radio} />
           <TopologyNode label="Institutional IQ Nodes" value="28" status="Live" trend="+2 New" icon={Cpu} />
           <TopologyNode label="Security Matrix Pulse" value="LVL 9" status="Syncing" trend="Stable" icon={ShieldAlert} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
           
           {/* 🧬 UNIFIED FACILITY MAP */}
           <Card className="lg:col-span-8 p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als space-y-10 relative overflow-hidden group">
              <div className="flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-accent-primary rounded-full shadow-lg" />
                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white font-display">Spatial Shard Directory</h3>
                 </div>
                 <div className="relative group/search">
                    <input 
                      type="text" 
                      placeholder="Find Spatial Node..."
                      className="bg-slate-50 dark:bg-black/20 border-none rounded-2xl py-3 pl-10 pr-6 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-accent-primary/20 transition-all italic w-[280px] shadow-inner"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-accent-primary transition-colors" size={14} />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                 <UnitShard name="Emergency Command" type="CRITICAL" head="Dr. Ibrahim" load={84} />
                 <UnitShard name="Surgical Matrix" type="OPERATIONAL" head="Dr. Sarah" load={42} />
                 <UnitShard name="Pediatric Unit" type="CLINICAL" head="Dr. Ahmed" load={68} />
                 <UnitShard name="Radiology Shard" type="DIAGNOSTIC" head="Dr. Fatima" load={12} />
                 <UnitShard name="Cardiology Node" type="CLINICAL" head="Dr. Omar" load={92} />
                 <UnitShard name="Neural Center" type="RESEARCH" head="Sana AI" load={100} />
                 <UnitShard name="Sector 4 Ward" type="EMERGENCY" head="Nurse Sofia" load={55} />
                 <UnitShard name="Global Pharmacy" type="LOGISTICS" head="Node Hub" load={28} />
              </div>

              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full -z-0" />
           </Card>

           {/* 🛰️ TOPOLOGY ACTIONS */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              <Card className="p-10 rounded-[3rem] bg-slate-900 border-none space-y-10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                 
                 <div className="space-y-6 relative z-10">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12">
                       <Zap size={28} className="text-white" />
                    </div>
                    <div className="space-y-2">
                       <p className="text-2xl font-black italic text-white uppercase font-display tracking-tighter leading-tight">Sync Grid Topology</p>
                       <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest italic leading-relaxed">Propagation of spatial updates to all synchronized clinical nodes within the institutional grid.</p>
                    </div>
                 </div>

                 <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400 tracking-widest italic">
                       <span>Propagation Status</span>
                       <span className="text-accent-primary">Verified</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-accent-primary w-[88%] shadow-[0_0_15px_rgba(20,184,166,0.4)]" />
                    </div>
                 </div>

                 <Button className="w-full bg-white text-slate-900 py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] italic shadow-2xl hover:scale-[1.02] active:scale-95 transition-all border-none font-display relative z-10">
                    Initialize Grid Wave
                 </Button>
              </Card>

              <Card className="flex-1 p-8 rounded-[3rem] bg-amber-500/5 border border-amber-500/10 flex flex-col justify-center gap-6 relative overflow-hidden group italic text-center">
                 <div className="flex flex-col items-center gap-3 text-amber-500">
                    <ShieldAlert size={32} />
                    <h4 className="text-[12px] font-black uppercase tracking-[0.3em]">Neural Recalibration</h4>
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.1em] text-amber-500/70 leading-relaxed">
                    Recursive recalibration of spatial nodes may result in temporary clinical sync delays.
                 </p>
                 <button className="w-full bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-white py-4 rounded-[2rem] border border-amber-500/20 text-[9px] font-black uppercase tracking-[0.5em] transition-all font-display italic">
                    Recalibrate Shard Matrix
                 </button>
              </Card>
           </div>

        </div>

      </div>
    </AdminPage>
  );
}
