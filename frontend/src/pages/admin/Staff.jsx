import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Briefcase, 
  ShieldCheck, 
  MoreHorizontal,
  Stethoscope,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, PageHeader, StatsCard } from '../../components/ui';
import AdminTable from '../../components/features/admin/AdminTable';
import FilterBar from '../../components/features/admin/FilterBar';

/**
 * 💼 Operational Staff Matrix
 * Specialized management hub for medical and support personnel.
 */
export default function AdminStaff() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const staffMembers = [
    { id: 'ST-4421', name: 'Dr. Sarah Smith', role: 'Chief Cardiologist', shifting: 'Day-Shift', status: 'Active', email: 's.smith@alshifaa.com' },
    { id: 'ST-1102', name: 'John Doe', role: 'Head of IT', shifting: 'On-Call', status: 'On Leave', email: 'j.doe@alshifaa.com' },
    { id: 'ST-2947', name: 'Ellen Ripley', role: 'Senior Nurse', shifting: 'Night-Shift', status: 'Active', email: 'ripley@alshifaa.com' },
    { id: 'ST-9921', name: 'Dr. Bruce Wayne', role: 'Neurologist', shifting: 'Day-Shift', status: 'Active', email: 'b.wayne@alshifaa.com' },
    { id: 'ST-8821', name: 'Tony Stark', role: 'Tech Consultant', shifting: 'Flexible', status: 'Away', email: 'tony@stark.com' },
  ].filter(s => 
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.includes(searchTerm)) &&
    (activeTab === 'ALL' || s.status.toUpperCase().replace(' ', '') === activeTab)
  );

  const columns = [
    { 
        header: 'Personnel Identity', 
        cell: (s) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary text-[10px] font-black uppercase">
                    {s.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{s.name}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">{s.id}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Operational Role',
        cell: (s) => (
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-text-primary dark:text-white uppercase tracking-tight">{s.role}</span>
                <span className="text-[8px] font-bold text-accent-primary uppercase tracking-widest italic">{s.shifting}</span>
            </div>
        )
    },
    { 
        header: 'Status',
        cell: (s) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${s.status === 'Active' ? 'bg-emerald-500 shadow-emerald-500' : s.status === 'Away' ? 'bg-rose-500 shadow-rose-500' : 'bg-amber-500 shadow-amber-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{s.status}</span>
            </div>
        )
    },
    { header: 'Contact Shard', cell: (s) => <span className="text-[10px] font-bold text-text-secondary dark:text-white/20 italic">{s.email}</span> },
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
    { title: "Total Staff", value: "482", icon: Users, trend: "+12", color: "var(--accent-primary)" },
    { title: "On-Duty Now", value: "156", icon: Activity, trend: "Stable", color: "#10b981" },
    { title: "Support Force", value: "84", icon: Briefcase, trend: "-2", color: "#6366f1" },
    { title: "Medical Elite", value: "242", icon: Stethoscope, trend: "+4", color: "#f43f5e" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Staff Matrix Hub" 
        subtitle="Global Workforce Management Interface"
        actions={
            <Button 
                onClick={() => navigate('/admin/users/add')}
                className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none"
            >
                <UserPlus size={14} /> Onboard Personnel
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
            { id: 'ALL', label: 'Global Force' },
            { id: 'ACTIVE', label: 'In-Service' },
            { id: 'ONLEAVE', label: 'On Leave' },
            { id: 'AWAY', label: 'Away / Shift-End' }
        ]}
      />

      <AdminTable columns={columns} data={staffMembers} />
    </div>
  );
}
