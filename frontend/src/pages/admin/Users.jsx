import React, { useState } from 'react';
import { 
  Users, 
  UserPlus,
  Activity,
  Stethoscope,
  Briefcase,
  MoreHorizontal
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import AdminTable from '../../components/features/admin/AdminTable';
import FilterBar from '../../components/features/admin/FilterBar';

/**
 * 🏢 Elite User Registry Control
 * Fully refactored for modularity and scalability (DRY).
 */
export default function AdminUsers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const users = [
    { id: 'DR-4421', name: 'Dr. Sarah Smith', role: 'Doctor', dept: 'Cardiology', status: 'Active', email: 's.smith@alshifaa.com' },
    { id: 'ST-1102', name: 'John Doe', role: 'Staff', dept: 'Administration', status: 'On Leave', email: 'j.doe@alshifaa.com' },
    { id: 'SH-2947', name: 'Ellen Ripley', role: 'Patient', dept: 'OPD', status: 'Active', email: 'ripley@weyland.com' },
    { id: 'DR-9921', name: 'Dr. Bruce Wayne', role: 'Doctor', dept: 'Neurology', status: 'Active', email: 'b.wayne@alshifaa.com' },
    { id: 'SH-8821', name: 'Tony Stark', role: 'Patient', dept: 'Emergency', status: 'Critical', email: 'tony@stark.com' },
  ].filter(u => 
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.id.includes(searchTerm)) &&
    (activeTab === 'ALL' || u.role.toUpperCase() === activeTab)
  );

  const columns = [
    { 
        header: 'Identity Node', 
        cell: (u) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary text-[10px] font-black group-hover:rotate-6 transition-all duration-500">
                    {u.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{u.name}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">{u.id}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Operational Role',
        cell: (u) => (
            <Badge className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.15em] border-none shadow-sm ${
                u.role === 'Doctor' ? 'bg-blue-500/10 text-blue-500' : 
                u.role === 'Staff' ? 'bg-indigo-500/10 text-indigo-500' :
                'bg-emerald-500/10 text-emerald-500'
             }`}>
                {u.role}
             </Badge>
        )
    },
    { header: 'Module/Dept', accessor: 'dept' },
    { 
        header: 'Status',
        cell: (u) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${u.status === 'Active' ? 'bg-emerald-500 shadow-emerald-500' : u.status === 'Critical' ? 'bg-rose-500 shadow-rose-500' : 'bg-amber-500 shadow-amber-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{u.status}</span>
            </div>
        )
    },
    { header: 'Contact Shard', cell: (u) => <span className="text-[10px] font-bold text-text-secondary dark:text-white/20 italic">{u.email}</span> },
    { 
        header: 'Actions', 
        cell: () => (
            <button className="p-3 rounded-xl bg-bg-base dark:bg-slate-800/40 text-text-secondary hover:text-accent-primary transition-all shadow-inner group/btn">
                <MoreHorizontal size={14} className="group-hover/btn:scale-110 transition-transform" />
            </button>
        )
    },
  ];

  const stats = [
    { title: "Total Personnel", value: "1,284", icon: Users, trend: "+24", color: "var(--accent-primary)" },
    { title: "Medical Units", value: "482", icon: Stethoscope, trend: "+4", color: "#10b981" },
    { title: "Support Staff", value: "156", icon: Briefcase, trend: "Stable", color: "#f43f5e" },
    { title: "Active Patients", value: "646", icon: Activity, trend: "+12%", color: "#64748b" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="User Matrix Control" 
        subtitle="Global Human Capital Index"
        actions={
            <Button 
                onClick={() => navigate('/admin/users/add')}
                className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none"
            >
                <UserPlus size={14} /> Provision Identity
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
            { id: 'ALL', label: 'All Personnel' },
            { id: 'DOCTOR', label: 'Authorized Doctors' },
            { id: 'STAFF', label: 'Medical Staff' },
            { id: 'PATIENT', label: 'Civilian Patients' }
        ]}
      />

      <AdminTable columns={columns} data={users} />
    </div>
  );
}

