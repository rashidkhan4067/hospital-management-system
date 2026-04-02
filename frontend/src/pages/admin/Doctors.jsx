import React, { useState } from 'react';
import { 
  Stethoscope, 
  Search, 
  Calendar, 
  UserPlus, 
  Activity, 
  Award, 
  ShieldCheck,
  MoreHorizontal
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '../../components/ui';
import AdminTable from '../../components/features/admin/AdminTable';
import FilterBar from '../../components/features/admin/FilterBar';

/**
 * 🧛 Specialist Physician Hub (Doctor Management)
 * Managing medical credentials, specialized cohorts, and scheduling availability.
 */
export default function AdminDoctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const doctors = [
    { id: 'DR-4421', name: 'Dr. Sarah Smith', specialty: 'Cardiology', credentials: 'MD, PhD', status: 'In-Session', rating: '5.0' },
    { id: 'DR-1102', name: 'Dr. Bruce Wayne', specialty: 'Neurology', credentials: 'MD', status: 'Available', rating: '4.9' },
    { id: 'DR-2947', name: 'Dr. Ellen Ripley', specialty: 'General-OPD', credentials: 'MD', status: 'On Leave', rating: '4.8' },
    { id: 'DR-9921', name: 'Dr. Rick Deckard', specialty: 'Diagnostics', credentials: 'MD, ScD', status: 'Available', rating: '4.7' },
    { id: 'DR-8821', name: 'Dr. Roy Batty', specialty: 'Replication', credentials: 'PhD', status: 'Available', rating: '5.0' },
  ].filter(d => 
    (d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || d.status.toUpperCase().replace(' ', '') === activeTab)
  );

  const columns = [
    { 
        header: 'Specialist Identity', 
        cell: (d) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-black">
                    {d.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{d.name}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">{d.id} • {d.credentials}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Specialty Shard',
        cell: (d) => <Badge className="bg-bg-base dark:bg-white/5 text-accent-primary border-none text-[8px] font-black uppercase px-4">{d.specialty}</Badge>
    },
    { 
        header: 'Operational Status',
        cell: (d) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${d.status === 'Available' ? 'bg-emerald-500 shadow-emerald-500' : d.status === 'In-Session' ? 'bg-blue-500 shadow-blue-500' : 'bg-amber-500 shadow-amber-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{d.status}</span>
            </div>
        )
    },
    { 
        header: 'Patient Auth Index', 
        cell: (d) => <div className="flex items-center gap-1.5"><Award size={12} className="text-amber-500" /> <span className="text-[11px] font-black">{d.rating}</span></div>
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
    { title: "Authorized MDs", value: "242", icon: Stethoscope, trend: "+4", color: "var(--accent-primary)" },
    { title: "Active Registries", value: "48", icon: Award, trend: "Stable", color: "#10b981" },
    { title: "Clinical Capacity", value: "92.4%", icon: Activity, trend: "+1.2%", color: "#6366f1" },
    { title: "Pending Credentials", value: "3", icon: ShieldCheck, trend: "-2", color: "#f43f5e" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Specialist Physician Hub" 
        subtitle="Global Medical Faculty Registry"
        actions={
            <Button className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none">
                <UserPlus size={14} /> Authorize Specialist
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
            { id: 'ALL', label: 'Global Faculty' },
            { id: 'AVAILABLE', label: 'Available Shards' },
            { id: 'INSESSION', label: 'Active Sessions' },
            { id: 'ONLEAVE', label: 'Away / Shift-End' }
        ]}
      />

      <AdminTable columns={columns} data={doctors} />
    </div>
  );
}
