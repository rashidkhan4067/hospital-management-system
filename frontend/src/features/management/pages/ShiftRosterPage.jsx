import React, { useState } from 'react';
import { 
  Calendar, Clock, Users, Shield, Download, 
  Plus, Search, Filter, ArrowUpRight, Zap
} from 'lucide-react';
import { 
  Button, 
  PageHeader, 
  Card 
} from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';

// 🏗️ FEATURE SHARDS
import { 
  ShiftTimelineShard, 
  ShiftMatrixShard, 
  OperationalSyncShard 
} from '../components/ShiftComponents';

/**
 * 📅 Shift Roster Page — High-fidelity personnel scheduling matrix
 */
export default function ShiftRosterPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const kpis = [
      { title: 'Active Shifts', value: '03', icon: Clock, color: 'text-orange-500', trend: 'Live Sync' },
      { title: 'Personnel on Duty', value: '42', icon: Users, color: 'text-accent-primary', trend: '+4 Next Shift' },
      { title: 'Node Coverage', value: '98.5%', icon: Shield, color: 'text-emerald-500', trend: 'Optimal' },
      { title: 'Response Pulse', value: '2.4m', icon: Zap, color: 'text-indigo-500', trend: 'High Velocity' }
  ];

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg :px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000 italic">
        
        {/* 🛸 COMMAND CLUSTER: Row 1 — Header */}
        <PageHeader 
          title="Shift Orchestration Hub"
          subtitle="Real-time synchronization of clinical duty cycles and personnel nodes."
          status="Operational Sync Active"
          actions={
            <div className="flex items-center gap-2">
              <Button
                className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-accent-primary/25 border-none font-display italic"
              >
                <Plus size={16} strokeWidth={3} /> Provision New Shift
              </Button>
            </div>
          }
        />

        {/* 🌠 PERSISTENT HUB: Row 2 — Hero CTA */}
        <UnifiedHeroCTA 
          compact
          title={<>Duty <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Synchronization.</span></>}
          subtitle="Optimizing institutional performance through neural-coordinated shift matrices. Current timeline coverage secured across all 12 administrative shards."
          pillPrefix="Institutional Roster Control"
          pillIcon={Calendar}
          actions={[
             { title: 'Full Export',   subtitle: 'XLS Roster Matrix', icon: Download, onClick: () => {} },
             { title: 'Conflict Log', subtitle: 'Audit Registry',    icon: Shield,   onClick: () => {} }
          ]}
        />

        {/* 🛰 KPI Hub */}
        <UnifiedKpiGrid loading={false} stats={kpis} />

        {/* 🏗 ROSTER ASSEMBLY: 8:4 Modular Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
           
           {/* LEFT - Duty Matrix Ledger (8 cols) */}
           <div className="lg:col-span-8 flex flex-col gap-6">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 dark:bg-white/[0.03] p-4 rounded-[2rem] border border-white/10 backdrop-blur-xl">
                 <div className="flex items-center gap-3">
                    <Button variant="outline" className="px-5 py-2.5 rounded-xl border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest italic font-display">Timeline Mode: Weekly</Button>
                    <Button variant="outline" className="px-5 py-2.5 rounded-xl border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest italic font-display opacity-50">Monthly Ledger</Button>
                 </div>
                 <div className="relative w-full sm:w-64 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors" size={16} />
                    <input 
                       type="text" 
                       placeholder="Locate Personnel Node..." 
                       className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-accent-primary/20 outline-none transition-all placeholder:text-slate-400 italic"
                    />
                 </div>
              </div>

              <ShiftMatrixShard selectedDay={selectedDate} />

           </div>

           {/* RIGHT - Context Timeline (4 cols) */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              
              <div className="flex items-center justify-between px-2">
                 <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Timeline Progression</h4>
                 <Filter size={14} className="text-slate-400" />
              </div>

              <ShiftTimelineShard />

              <OperationalSyncShard />

           </div>
        </div>

      </div>
    </AdminPage>
  );
}
