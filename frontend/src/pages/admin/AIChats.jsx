import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Mic, 
  Bot, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';
import { PageHeader, Button, Card, Badge } from '../../components/ui';
import AdminTable from '../../components/features/admin/AdminTable';
import FilterBar from '../../components/features/admin/FilterBar';

/**
 * 🛰️ AI Intent Chat Analysis Hub
 * Real-time monitoring of Sana AI conversation threads and intent resolution.
 */
export default function AIChats() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const chats = [
    { id: 'CHT-4421', user: 'Dr. Sarah Smith', intent: 'Fetch Patient Record', query: "Show me Ellen Ripley's medical history", time: '2m ago', resolution: 'Success' },
    { id: 'CHT-1102', user: 'Nurse John', intent: 'Schedule Appointment', query: "Book Sarah Connor for 10 AM", time: '12m ago', resolution: 'Success' },
    { id: 'CHT-2947', user: 'Dr. Bruce Wayne', intent: 'Diagnostic Query', query: "Analyze neural scan of Roy Batty", time: '25m ago', resolution: 'Critical-Review' },
    { id: 'CHT-9921', user: 'Technician Deckard', intent: 'Inventory Check', query: "How many Zine-04 vials left?", time: '1h ago', resolution: 'Success' },
    { id: 'CHT-8821', user: 'Dr. Roy Batty', intent: 'System Command', query: "Initiate sector lockout", time: '2h ago', resolution: 'Access-Denied' },
  ].filter(c => 
    (c.user.toLowerCase().includes(searchTerm.toLowerCase()) || c.query.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || c.resolution.toUpperCase().replace('-', '') === activeTab)
  );

  const columns = [
    { 
        header: 'Intelligence Thread', 
        cell: (c) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-black">
                    <MessageSquare size={16} />
                </div>
                <div className="flex flex-col max-w-[300px]">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none truncate italic">"{c.query}"</p>
                    <p className="text-[8px] font-bold text-accent-primary uppercase tracking-[0.2em] mt-1.5">{c.intent}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Human Node', 
        cell: (c) => (
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-bg-base dark:bg-white/5 flex items-center justify-center text-slate-400">
                    <User size={12} />
                </div>
                <span className="text-[10px] font-black uppercase text-slate-400">{c.user}</span>
            </div>
        )
    },
    { 
        header: 'Intent Resolution',
        cell: (c) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${c.resolution === 'Success' ? 'bg-emerald-500 shadow-emerald-500' : c.resolution === 'Access-Denied' ? 'bg-rose-500 shadow-rose-500' : 'bg-amber-500 shadow-amber-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{c.resolution}</span>
            </div>
        )
    },
    { header: 'Propagation', cell: (c) => <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.time}</span> },
    { 
        header: 'Audit', 
        cell: () => (
            <button className="flex items-center gap-2 text-[8px] font-black text-accent-primary uppercase tracking-widest hover:underline decoration-accent-primary/40 decoration-2 transition-all">
                Full Log <ChevronRight size={10} />
            </button>
        )
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Intent Analysis Registry" 
        subtitle="Global Neural Thread Propagation & Resolution Audit"
        actions={
            <Button className="bg-bg-base dark:bg-white/5 text-text-primary dark:text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-none">
                Export Session Matrix
            </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsMini label="Neural Resolves" value="12,482" status="Success" />
        <StatsMini label="Denied Intents" value="42" status="Failure" />
        <StatsMini label="Pending Audit" value="156" status="Processing" />
      </div>

      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
            { id: 'ALL', label: 'Global Intent Thread' },
            { id: 'SUCCESS', label: 'Resolved Node' },
            { id: 'CRITICALREVIEW', label: 'High Priority' },
            { id: 'ACCESSDENIED', label: 'Authorization Denied' }
        ]}
      />

      <AdminTable columns={columns} data={chats} />
    </div>
  );
}

function StatsMini({ label, value, status }) {
  const colors = {
    Success: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    Failure: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    Processing: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  }
  return (
    <Card className={`p-6 border rounded-[32px] bg-white dark:bg-slate-900/40 shadow-sm flex items-center justify-between ${colors[status]}`}>
       <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{label}</p>
          <p className="text-2xl font-black italic tracking-tighter leading-none">{value}</p>
       </div>
       <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900/40 border border-transparent shadow shadow-black/5 flex items-center justify-center">
          <Bot size={18} />
       </div>
    </Card>
  )
}
