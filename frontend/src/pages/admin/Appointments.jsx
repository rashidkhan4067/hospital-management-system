import React, { useState } from 'react';
import { 
  Calendar, 
  Plus,
  Clock,
  UserCheck,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '../../components/ui';
import AdminTable from '../../components/features/admin/AdminTable';
import FilterBar from '../../components/features/admin/FilterBar';

/**
 * 📅 Schedule Management Orchestrator
 * High-fidelity interface for cross-departmental scheduling.
 */
export default function AdminAppointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const appointments = [
    { id: 'APT-1029', patient: 'Sarah Connor', doctor: 'Dr. Sarah Smith', time: '10:30 AM', date: '2026-04-02', type: 'Clinical', status: 'In-Session' },
    { id: 'APT-1030', patient: 'Ellen Ripley', doctor: 'Dr. Bruce Wayne', time: '11:15 AM', date: '2026-04-02', type: 'Scan', status: 'Waiting' },
    { id: 'APT-1031', patient: 'Tony Stark', doctor: 'Dr. Sarah Smith', time: '12:00 PM', date: '2026-04-02', type: 'Review', status: 'Confirmed' },
    { id: 'APT-1032', patient: 'Rick Deckard', doctor: 'Dr. Bruce Wayne', time: '02:30 PM', date: '2026-04-03', type: 'Clinical', status: 'Pending' },
    { id: 'APT-1033', patient: 'Roy Batty', doctor: 'Dr. Sarah Smith', time: '03:45 PM', date: '2026-04-03', type: 'Biometry', status: 'Cancelled' },
  ].filter(a => 
    (a.patient.toLowerCase().includes(searchTerm.toLowerCase()) || a.id.includes(searchTerm)) &&
    (activeTab === 'ALL' || a.status.toUpperCase().replace('-', '') === activeTab)
  );

  const columns = [
    { 
        header: 'Patient Node', 
        cell: (a) => (
            <div className="flex flex-col">
                <p className="text-[11px] font-black text-text-primary dark:text-white uppercase leading-none">{a.patient}</p>
                <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">{a.id}</p>
            </div>
        )
    },
    { 
        header: 'Assigned Specialist',
        cell: (a) => <span className="text-[10px] font-black text-accent-primary uppercase italic">{a.doctor}</span>
    },
    { 
        header: 'Schedule Shard',
        cell: (a) => (
            <div className="flex items-center gap-2">
                <Clock size={12} className="text-text-secondary/40" />
                <span className="text-[10px] font-bold text-text-primary dark:text-white/80">{a.date} • {a.time}</span>
            </div>
        )
    },
    { 
        header: 'Operational Status',
        cell: (a) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${a.status === 'In-Session' ? 'bg-blue-500 shadow-blue-500' : a.status === 'Pending' ? 'bg-amber-500 shadow-amber-500' : a.status === 'Cancelled' ? 'bg-rose-500 shadow-rose-500' : 'bg-emerald-500 shadow-emerald-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{a.status}</span>
            </div>
        )
    },
    { 
        header: 'Class',
        cell: (a) => <Badge className="bg-bg-base dark:bg-white/5 text-text-primary dark:text-white/40 border-none text-[8px] font-black uppercase">{a.type}</Badge>
    },
    { 
        header: 'Actions', 
        cell: () => (
            <button className="p-3 rounded-xl bg-bg-base dark:bg-slate-800/40 text-text-secondary hover:text-accent-primary transition-all">
                <MoreHorizontal size={14} />
            </button>
        )
    },
  ];

  const stats = [
    { title: "Today's Load", value: "156", icon: Calendar, trend: "+4.2%", color: "var(--accent-primary)" },
    { title: "Confirmed Visits", value: "89", icon: UserCheck, trend: "+12", color: "#10b981" },
    { title: "Average Wait", value: "24m", icon: Clock, trend: "-5m", color: "#6366f1" },
    { title: "Cancellations", value: "4", icon: AlertCircle, trend: "Stable", color: "#f43f5e" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Schedule Orchestration" 
        subtitle="Inter-Departmental Visit Matrix"
        actions={
            <Button className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none">
                <Plus size={14} /> Schedule Visit
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
            { id: 'ALL', label: 'Global Schedule' },
            { id: 'INSESSION', label: 'Active Sessions' },
            { id: 'WAITING', label: 'Waiting Lounge' },
            { id: 'CONFIRMED', label: 'Confirmed' }
        ]}
      />

      <AdminTable columns={columns} data={appointments} />
    </div>
  );
}
