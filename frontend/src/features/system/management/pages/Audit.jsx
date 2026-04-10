import React, { useState } from 'react';
import { 
  ShieldCheck, 
  History, 
  Search, 
  Activity, 
  AlertCircle, 
  Terminal, 
  ShieldAlert, 
  ChevronRight,
  User,
  MoreHorizontal,
  Lock,
  Zap,
  Fingerprint,
  Database,
  Download,
  RefreshCw,
  Filter,
  Eye,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button, Card, Badge, Avatar } from '@/components/primitives';
import AdminTable from '@/components/primitives/AdminTable';
import AdminPage from '@/layouts/AdminPage';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';

import { useAdminSystem } from '@/features/system/management/hooks/useSystem';
import PageLoader from '@/components/composed/Loading';

/**
 * 🔒 Security Audit Matrix
 * High-fidelity overwatch for clinical access logs and intrusion detection.
 */
export default function Audit() {
  const { auditLogs, loading } = useAdminSystem();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  if (loading) return <PageLoader />;

  const filteredLogs = auditLogs.filter(l => 
    (l.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) || l.action.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || l.status.toUpperCase() === activeTab)
  );

  const kpis = [
    { label: 'Security Protocols', value: '24 ACTIVE', icon: ShieldCheck, trend: 'L9 Verified', status: 'success' },
    { label: 'Threat Pulse', value: 'ZERO', icon: Activity, trend: 'Optimal', status: 'success' },
    { label: 'Identity Nodes', value: '1,482', icon: Fingerprint, trend: '+42 Today', status: 'processing' },
    { label: 'Audit Density', value: 'High', icon: Database, trend: '98.2%', status: 'success' },
  ];

  const columns = [
    { 
        header: 'Audit Shard (Event)', 
        cell: (l) => (
            <div className="flex items-center gap-5 italic group/row">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover/row:scale-110 duration-500 shadow-sm ${l.status === 'Intrusion-Alert' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                    {l.status === 'Intrusion-Alert' ? <ShieldAlert size={20} strokeWidth={2.5} /> : <ShieldCheck size={20} strokeWidth={2.5} />}
                </div>
                <div className="flex flex-col">
                    <p className="text-[13px] font-black text-slate-900 dark:text-white uppercase leading-none tracking-tighter font-display mb-1.5">{l.action}</p>
                    <div className="flex items-center gap-2 opacity-50">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em]">{l.id}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] italic">IP: {l.ip}</span>
                    </div>
                </div>
            </div>
        )
    },
    { 
        header: 'Human Node', 
        cell: (l) => (
            <div className="flex items-center gap-3 italic">
                <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-accent-primary transition-all border border-transparent group-hover:border-accent-primary/10">
                    <User size={16} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase text-slate-900 dark:text-white tracking-widest leading-none">{l.user_name || 'System Shard'}</span>
                    <span className="text-[7px] font-bold text-slate-400 uppercase mt-1">Verified Identity</span>
                </div>
            </div>
        )
    },
    { 
        header: 'Access Protocol',
        cell: (l) => (
            <div className="flex items-center gap-3 italic">
                <div className={`w-2 h-2 rounded-full shadow-lg ${l.status === 'Success' ? 'bg-emerald-500 shadow-emerald-500/30 animate-pulse' : 'bg-rose-500 shadow-rose-500/30 animate-pulse'}`} />
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${l.status === 'Success' ? 'text-emerald-500' : 'text-rose-500'}`}>{l.status}</span>
            </div>
        )
    },
    { 
        header: 'Propagation', 
        cell: (l) => (
            <div className="flex flex-col italic">
                <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">{new Date(l.timestamp).toLocaleTimeString()}</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1 tracking-tighter opacity-60">{new Date(l.timestamp).toLocaleDateString()}</span>
            </div>
        )
    },
    { 
        header: 'Trace', 
        cell: () => (
            <div className="flex items-center gap-2">
                <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-accent-primary hover:bg-white dark:hover:bg-slate-900 shadow-sm transition-all group/btn">
                    <Eye size={16} />
                </button>
                <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-900 shadow-sm transition-all group/btn">
                    <MoreHorizontal size={16} />
                </button>
            </div>
        )
    },
  ];

  return (
    <AdminPage>
      <div className="space-y-8 animate-in fade-in duration-1000 italic pb-20">
        
        <PageHeader 
          title="Security Audit Matrix" 
          subtitle="Global Institutional Traceability & Intrusion Detection Command"
          actions={
            <div className="flex items-center gap-3">
               <button className="p-3 bg-white dark:bg-slate-900 rounded-2xl text-slate-400 hover:text-accent-primary transition-all shadow-2als border border-slate-50 dark:border-white/5">
                  <Download size={18} strokeWidth={2.5} />
               </button>
               <Button className="bg-rose-500 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-rose-500/25 border-none hover:translate-y-[-2px] transition-all flex items-center gap-2">
                  <ShieldAlert size={16}/> Protocol Lockout
               </Button>
            </div>
          }
        />

        <UnifiedHeroCTA 
          compact
          title={<>Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Overwatch.</span></>}
          subtitle="Monitoring global access shards across the clinical grid. Full traceability enabled for every neural interaction and record modification."
          pillPrefix="Encryption Level 9"
          pillIcon={Lock}
          actions={[
             { title: 'Rotate Keys',  subtitle: 'Shard Cycle', icon: RefreshCw, onClick: () => {} },
             { title: 'Threat Map', subtitle: 'Gird Viz',    icon: Activity,  onClick: () => {} }
          ]}
        />

        <UnifiedKpiGrid loading={false} stats={kpis} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 py-4">
           <div className="flex items-center gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide no-scrollbar">
              {['ALL', 'SUCCESS', 'INTRUSIONALERT', 'OVERRIDE'].map((tab) => (
                 <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap shadow-sm ${
                       activeTab === tab 
                       ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 scale-105 italic border-none' 
                       : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-50 dark:border-white/5 hover:text-accent-primary'
                    }`}
                 >
                    {tab === 'ALL' ? 'Global Registry' : tab === 'INTRUSIONALERT' ? 'Threat Alerts' : tab.replace('ALERT', '') + ' Logs'}
                 </button>
              ))}
           </div>

           <div className="relative group min-w-[320px]">
              <input 
                type="text" 
                placeholder="Identify Shard..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-accent-primary/10 transition-all shadow-2als italic"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors" size={16} strokeWidth={2.5} />
           </div>
        </div>

        <Card className="p-0 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als overflow-hidden">
           <AdminTable 
              columns={columns} 
              data={filteredLogs} 
              loading={false}
           />
        </Card>

      </div>
    </AdminPage>
  );
}

