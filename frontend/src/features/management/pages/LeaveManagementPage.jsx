import React, { useState } from 'react';
import { 
  Calendar, Clock, Shield, Download, 
  Plus, Search, Filter, Activity, Plane, 
  Briefcase, Heart, UserPlus
} from 'lucide-react';
import { 
  Button, 
  PageHeader,
  Card 
} from '@/shared/components/ui';
import AdminPage from '@/shared/components/layout/AdminPage';
import UnifiedKpiGrid from '@/shared/components/common/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/shared/components/common/UnifiedHeroCTA';

// 🏗️ FEATURE SHARDS
import { 
  LeaveBalanceShard, 
  LeaveRequestMatrix, 
  AbsenceTrendShard 
} from '../components/LeaveShards';

/**
 * 🏖️ Leave Management Page — High-fidelity absence orchestration
 */
export default function LeaveManagementPage() {
  const kpis = [
      { title: 'Pending Approval', value: '14', icon: Clock, color: 'text-orange-500', trend: 'Critical Node' },
      { title: 'Currently Absent', value: '08', icon: Plane, color: 'text-accent-primary', trend: 'Stable Load' },
      { title: 'Healthcare Sick', value: '05', icon: Heart, color: 'text-rose-500', trend: 'High Priority' },
      { title: 'Institutional Flow', value: '92%', icon: Activity, color: 'text-emerald-500', trend: 'Within Threshold' }
  ];

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000 italic">
        
        {/* 🛸 COMMAND HUB: Row 1 — Header */}
        <PageHeader 
          title="Absence Orchestration"
          subtitle="Management and prioritization of institutional leave requests and personnel availability."
          status="Operational Flow: Stable"
          actions={
            <div className="flex items-center gap-2">
              <Button
                className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-accent-primary/25 border-none font-display italic"
              >
                <Plus size={16} strokeWidth={3} /> Provision Request
              </Button>
            </div>
          }
        />

        {/* 🌠 PERSISTENT HUB: Row 2 — Hero CTA */}
        <UnifiedHeroCTA 
          compact
          title={<>Personnel <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Absence Node.</span></>}
          subtitle="Synchronizing institutional clinical capacity through automated leave orchestration. All personnel nodes currently tracked within the Al Shifaa administrative matrix."
          pillPrefix="Institutional Capacity Shard"
          pillIcon={Briefcase}
          actions={[
             { title: 'Balance Export', subtitle: 'CSV Ledger Matrix', icon: Download, onClick: () => {} },
             { title: 'Policy Shard',   subtitle: 'Protocol Matrix', icon: Shield,   onClick: () => {} }
          ]}
        />

        {/* 🛰 KPI Hub */}
        <UnifiedKpiGrid loading={false} stats={kpis} />

        {/* 📊 Balance Row */}
        <div className="w-full">
           <LeaveBalanceShard />
        </div>

        {/* 🏗 REGISTRY ASSEMBLY: 8:4 Modular Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
           
           {/* LEFT - Absence Matrix Ledger (8 cols) */}
           <div className="lg:col-span-8 flex flex-col gap-6">
              <LeaveRequestMatrix />
           </div>

           {/* RIGHT - Context Shards (4 cols) */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              <AbsenceTrendShard />

              <Card className="p-8 rounded-[2.5rem] bg-indigo-600 text-white border-none flex flex-col gap-6 shadow-2als relative overflow-hidden group italic">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                  <div className="flex items-center gap-4 relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12 italic">
                          <UserPlus size={18} className="text-white" />
                      </div>
                      <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display text-white">Proxy Node</h4>
                  </div>
                  
                  <div className="mt-2 space-y-1 relative z-10">
                      <p className="text-2xl font-black italic tracking-tighter leading-tight text-white uppercase font-display">Auto-Assign Pulse</p>
                      <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest italic opacity-80 mt-2">Automatically identifying professional nodes to cover absent shards within the clinical matrix.</p>
                  </div>

                  <button className="mt-auto w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl py-4 text-[9px] font-black uppercase tracking-widest transition-all relative z-10 italic font-display">
                      Initialize Proxy Matrix
                  </button>
              </Card>
           </div>
        </div>

      </div>
    </AdminPage>
  );
}
