import React, { useState } from 'react';
import { 
  Mic, 
  Bot, 
  Activity, 
  Terminal, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  MoreHorizontal,
  Code
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '../../components/ui';
import AdminTable from '../../components/features/admin/AdminTable';
import FilterBar from '../../components/features/admin/FilterBar';

/**
 * 🛰️ Sana AI Command Hub (Logs & Processing)
 * Monitoring neural network performance and real-time assistant propagation.
 */
export default function AdminAILogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const logs = [
    { id: 'LOG-4421', event: 'Voice Intent: Patient Registry', node: 'Neural-01', confidence: '98.2%', status: 'Success', time: '2m ago' },
    { id: 'LOG-1102', event: 'Diagnosis Shard: Hypertension', node: 'Clinical-AI', confidence: '94.5%', status: 'Success', time: '12m ago' },
    { id: 'LOG-2947', event: 'Audio Interference: High-DB', node: 'Gate-01', confidence: '12.0%', status: 'Retrying', time: '24m ago' },
    { id: 'LOG-9921', event: 'Neural Record: Syncing Matrix', node: 'Kernel', confidence: '100%', status: 'Success', time: '1h ago' },
    { id: 'LOG-8821', event: 'Voice Intent: Fetch Dr. Wayne', node: 'Neural-02', confidence: '89.1%', status: 'Failure', time: '2h ago' },
  ].filter(l => 
    (l.event.toLowerCase().includes(searchTerm.toLowerCase()) || l.node.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || l.status.toUpperCase() === activeTab)
  );

  const columns = [
    { 
        header: 'Neural Event Shard', 
        cell: (l) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center animate-pulse group-hover:scale-110 transition-all duration-300">
                    <Zap size={16} />
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{l.event}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">{l.id} • {l.time}</p>
                </div>
            </div>
        )
    },
    { header: 'Processing Node', cell: (l) => <Badge className="bg-bg-base dark:bg-white/5 text-text-primary dark:text-white/40 border-none text-[8px] font-black uppercase">{l.node}</Badge> },
    { 
        header: 'Confidence Flux',
        cell: (l) => (
            <div className="flex flex-col gap-1.5 w-24">
                <div className="flex justify-between items-center text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Flux</span>
                    <span>{l.confidence}</span>
                </div>
                <div className="w-full h-1 bg-bg-base dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-primary rounded-full" style={{ width: l.confidence }} />
                </div>
            </div>
        )
    },
    { 
        header: 'Status',
        cell: (l) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${l.status === 'Success' ? 'bg-emerald-500 shadow-emerald-500' : l.status === 'Failure' ? 'bg-rose-500 shadow-rose-500' : 'bg-amber-500 shadow-amber-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{l.status}</span>
            </div>
        )
    },
    { 
        header: 'Actions', 
        cell: () => (
            <button className="p-3 rounded-xl bg-bg-base dark:bg-slate-800/40 text-text-secondary hover:text-accent-primary transition-all">
                <Terminal size={14} />
            </button>
        )
    },
  ];

  const stats = [
    { title: "AI Intents", value: "12,482", icon: Mic, trend: "+12.5%", color: "var(--accent-primary)" },
    { title: "Neural Success", value: "98.9%", icon: ShieldCheck, trend: "+0.5%", color: "#10b981" },
    { title: "Active Nodes", value: "42", icon: Cpu, trend: "Stable", color: "#6366f1" },
    { title: "Global Latency", value: "24ms", icon: Activity, trend: "-5ms", color: "#f43f5e" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Sana AI Command Hub" 
        subtitle="Real-time Neural Propagation Console"
        actions={
            <Button className="bg-bg-base dark:bg-white/5 text-text-primary dark:text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-none">
                Re-Train Model
            </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
            { id: 'ALL', label: 'Global Logs' },
            { id: 'SUCCESS', label: 'Neural Resolution' },
            { id: 'RETRYING', label: 'Processing' },
            { id: 'FAILURE', label: 'Failure Nodes' }
        ]}
      />

      <AdminTable columns={columns} data={logs} />
    </div>
  );
}
