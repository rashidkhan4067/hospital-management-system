import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, Key, Fingerprint, Lock, 
  Plus, Search, Shield, Globe, Terminal, Activity
} from 'lucide-react';
import { 
  Card, 
  Button, 
  PageHeader,
  Badge 
} from '@/shared/components/ui';
import AdminPage from '@/shared/components/layout/AdminPage';
import UnifiedKpiGrid from '@/shared/components/common/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/shared/components/common/UnifiedHeroCTA';
import { useAdminUsers } from '@/features/identity/hooks/useUsers';

// 🏗️ FEATURE SHARDS
import { 
  PermissionMatrixShard, 
  SecurityPulseShard, 
  AccessPolicyShard 
} from '../components/RoleShards';

/**
 * 🔐 Role Architecture Hub — High-fidelity authorization management
 */
export default function RolesPage() {
  const { users, loading } = useAdminUsers();

  const getRoleCount = (roleName) => {
    return users.filter(u => u.role === roleName).length;
  };

  const kpis = [
      { title: 'Auth Nodes', value: '04', icon: Shield, color: 'text-rose-500', trend: 'L5 Verified' },
      { title: 'Global Permits', value: '42', icon: Key, color: 'text-accent-primary', trend: 'Active Pulse' },
      { title: 'System Entropy', value: '99.9%', icon: Activity, color: 'text-emerald-500', trend: 'Stable' },
      { title: 'Security Shards', value: '12', icon: Lock, color: 'text-orange-500', trend: 'Synchronized' }
  ];

  const roles = [
    { title: 'Super Admin', users: users.filter(u => u.is_superuser).length, sensitivity: 'L5', color: 'rose', icon: ShieldAlert, classes: { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/20', glow: 'bg-rose-500/5' } },
    { title: 'Specialist', users: getRoleCount('doctor'), sensitivity: 'L4', color: 'blue', icon: ShieldCheck, classes: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', glow: 'bg-blue-500/5' } },
    { title: 'Clinic Staff', users: getRoleCount('staff'), sensitivity: 'L3', color: 'indigo', icon: Terminal, classes: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', border: 'border-indigo-500/20', glow: 'bg-indigo-500/5' } },
    { title: 'Civilian', users: getRoleCount('patient'), sensitivity: 'L1', color: 'emerald', icon: Globe, classes: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20', glow: 'bg-emerald-500/5' } },
  ];

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000 italic">
        
        {/* 🛸 COMMAND CLUSTER: Row 1 — Header */}
        <PageHeader 
          title="Role Architecture"
          subtitle="Management and synchronization of global authorization shards and security nodes."
          status="Master Protocol: Active"
          actions={
            <div className="flex items-center gap-2">
              <Button
                className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-rose-500/25 border-none font-display italic"
              >
                <ShieldAlert size={16} strokeWidth={3} /> Forge Auth Shard
              </Button>
            </div>
          }
        />

        {/* 🌠 PERSISTENT HUB: Row 2 — Hero CTA */}
        <UnifiedHeroCTA 
          compact
          title={<>Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Authorization.</span></>}
          subtitle="Control global permission shards and protocol levels. Changes propagate through the entire clinical network in real-time. Caution: L5 nodes active."
          pillPrefix="Entropy Control Protocol"
          pillIcon={Fingerprint}
          actions={[
             { title: 'Access Audit', subtitle: 'Security Ledger', icon: Lock, onClick: () => {} },
             { title: 'Seal Matrix',  subtitle: 'Auto-Revoke',     icon: Shield, onClick: () => {} }
          ]}
        />

        {/* 🛰 KPI Hub */}
        <UnifiedKpiGrid loading={false} stats={kpis} />

        {/* 🔐 ROLE NODES: High-Density Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {roles.map((role, i) => (
              <Card key={i} className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als transition-all hover:-translate-y-1 group relative overflow-hidden">
                 <div className={`absolute top-0 right-0 w-24 h-24 ${role.classes.glow} blur-[40px] rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform`} />
                 
                 <div className="flex items-center justify-between relative z-10">
                    <div className={`w-14 h-14 rounded-2xl ${role.classes.bg} flex items-center justify-center ${role.classes.text} border ${role.classes.border} shadow-inner group-hover:rotate-12 transition-transform`}>
                       <role.icon size={26} strokeWidth={2.5} />
                    </div>
                    <Badge variant="outline" className="text-[8px] font-black uppercase italic tracking-widest opacity-60">Tier {role.sensitivity}</Badge>
                 </div>

                 <div className="mt-8 space-y-1 relative z-10">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">{role.title}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Auth Shard</p>
                 </div>

                 <div className="mt-10 grid grid-cols-2 gap-3 relative z-10">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 text-center">
                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">Nodes</span>
                       <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums italic leading-none">{role.users}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 text-center">
                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">Pulse</span>
                       <span className="text-[10px] font-black text-emerald-500 uppercase italic leading-none pt-1 inline-block">Secure</span>
                    </div>
                 </div>
              </Card>
           ))}
        </div>

        {/* 🏗 MATRIX ASSEMBLY: 8:4 Modular Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
           
           {/* LEFT - Permission Matrix (8 cols) */}
           <div className="lg:col-span-8 flex flex-col gap-6">
              <PermissionMatrixShard />
           </div>

           {/* RIGHT - Security Shards (4 cols) */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              <SecurityPulseShard />
              <AccessPolicyShard />
           </div>
        </div>

      </div>
    </AdminPage>
  );
}
