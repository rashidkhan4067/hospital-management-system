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
  Lock
} from 'lucide-react';
import { PageHeader, Button, Card, Badge } from '../../components/ui';
import AdminTable from '../../components/features/admin/AdminTable';
import FilterBar from '../../components/features/admin/FilterBar';

/**
 * 🔒 System Security Audit Matrix
 * Unified console for clinical access logs and intrusion node monitoring.
 */
export default function SecurityAudit() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const logs = [
    { id: 'AUD-4421', user: 'Dr. Sarah Smith', action: 'Accessed Patient Record: PAT-4421', ip: '192.168.1.42', status: 'Authorized', time: '5m ago' },
    { id: 'AUD-1102', user: 'Unknown Identity', action: 'Failed Login Attempt (Node 7)', ip: '10.0.0.12', status: 'Intrusion-Alert', time: '12m ago' },
    { id: 'AUD-2947', user: 'Technician Roy Batty', action: 'Modified Financial Shard: INV-8821', ip: '192.168.1.99', status: 'Authorized', time: '25m ago' },
    { id: 'AUD-9921', user: 'System-Auto', action: 'Encrypted Clinical Backups', ip: 'WE-CENT-01', status: 'Authorized', time: '1h ago' },
    { id: 'AUD-8821', user: 'Dr. Bruce Wayne', action: 'Emergency Neural Config Overide', ip: '192.168.1.1', status: 'Secure-Override', time: '2h ago' },
  ].filter(l => 
    (l.user.toLowerCase().includes(searchTerm.toLowerCase()) || l.action.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || l.status.toUpperCase().replace('-', '') === activeTab)
  );

  const columns = [
    { 
        header: 'Audit Shard (Event)', 
        cell: (l) => (
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${l.status === 'Intrusion-Alert' ? 'bg-rose-500/10 text-rose-500' : 'bg-accent-primary/10 text-accent-primary'}`}>
                    {l.status === 'Intrusion-Alert' ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
                </div>
                <div className="flex flex-col max-w-[400px]">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none truncate">{l.action}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{l.id} • Terminal: {l.ip}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Human Node', 
        cell: (l) => (
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-bg-base dark:bg-white/5 flex items-center justify-center text-slate-400">
                    <User size={12} />
                </div>
                <span className="text-[10px] font-black uppercase text-slate-400">{l.user}</span>
            </div>
        )
    },
    { 
        header: 'Access Protocol',
        cell: (l) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${l.status === 'Authorized' ? 'bg-emerald-500 shadow-emerald-500' : l.status === 'Secure-Override' ? 'bg-blue-500 shadow-blue-500' : 'bg-rose-500 shadow-rose-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{l.status}</span>
            </div>
        )
    },
    { header: 'Propagation', cell: (l) => <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{l.time}</span> },
    { 
        header: 'Audit Trace', 
        cell: () => (
            <button className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest hover:text-accent-primary hover:underline transition-all">
                Full Shard <ChevronRight size={10} />
            </button>
        )
    },
  ];

  const stats = [
     { title: "Security Protocols", value: "24 Active", status: "Success", icon: ShieldCheck },
     { title: "Network Shards", value: "1,482 Logs", status: "Neutral", icon: Terminal },
     { title: "Threat Detection", value: "0 Critical", status: "Success", icon: Activity },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Security Audit Matrix" 
        subtitle="Global Clinical Access & Intrusion Node Registry"
        actions={
            <div className="flex items-center gap-3">
               <Button className="bg-bg-base dark:bg-white/5 text-text-primary dark:text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-none">
                  Rotate Keys
               </Button>
               <Button className="bg-rose-500 text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 border-none flex items-center gap-2 animate-pulse">
                  <ShieldAlert size={14} /> Full Lockout
               </Button>
            </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s, i) => <StatMini key={i} {...s} />)}
      </div>

      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
            { id: 'ALL', label: 'Global Audit Registry' },
            { id: 'AUTHORIZED', label: 'Secure Access' },
            { id: 'SECUREOVERRIDE', label: 'Admin Overrides' },
            { id: 'INTRUSIONALERT', label: 'Threat Mitigation' }
        ]}
      />

      <AdminTable columns={columns} data={logs} />
    </div>
  );
}

function StatMini({ title, value, status, icon: Icon }) {
  const colors = {
    Success: 'text-emerald-500',
    Neutral: 'text-accent-primary',
    Failure: 'text-rose-500'
  }
  return (
    <Card className={`p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm flex flex-col items-center justify-center text-center space-y-4 group hover:shadow-xl hover:-translate-y-1 transition-all`}>
        <div className={`w-14 h-14 rounded-2xl bg-bg-base dark:bg-white/5 flex items-center justify-center ${colors[status]} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
           {Icon && <Icon size={24}/>}
        </div>
        <div className="space-y-1">
           <h4 className="text-2xl font-black italic tracking-tighter leading-none dark:text-white uppercase">{value}</h4>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</p>
        </div>
    </Card>
  )
}
