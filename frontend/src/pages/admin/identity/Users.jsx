import React, { useState } from 'react';
import { 
  Users, 
  UserPlus,
  Activity,
  Stethoscope,
  Briefcase,
  MoreHorizontal
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '../../../components/ui';
import { useNavigate } from 'react-router-dom';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';

import AddUserModal from '../../../components/features/admin/AddUserModal';
import UserService from '../../../services/admin/UserService';
import { useUI } from '../../../context/UIContext';
import { useAdminUsers } from '../../../hooks/admin/useAdminUsers';

/**
 * 🏢 Elite User Registry Control
 * Fully refactored for modularity and scalability (DRY).
 */
export default function AdminUsers() {
  const navigate = useNavigate();
  const { addNotification } = useUI();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { users, loading, refresh } = useAdminUsers();

  const handleProvision = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await UserService.create(formData);
        addNotification('Identity Authorized', 'Global account shard successfully provisioned to systems.', 'success');
        setIsModalOpen(false);
        refresh(); // Update registry matrix
        resetForm(); // Clear dialog internal state
    } catch (err) {
        addNotification('Auth Protocol Failure', 'Could not propagate identity node to clinical database.', 'error');
        console.error(err);
    } finally {
        setIsSubmitting(false);
    }
  };

  const filteredUsers = users.filter(u => 
    (u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.id?.toString().includes(searchTerm)) &&
    (activeTab === 'ALL' || u.role?.toUpperCase() === activeTab)
  );

  const columns = [
    { 
        header: 'Identity Node', 
        cell: (u) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary text-[10px] font-black group-hover:rotate-6 transition-all duration-500">
                    {(u.full_name || '??').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{u.full_name}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">ID-{u.id}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Operational Role',
        cell: (u) => (
            <Badge className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.15em] border-none shadow-sm ${
                u.role === 'doctor' ? 'bg-blue-500/10 text-blue-500' : 
                u.role === 'staff' ? 'bg-indigo-500/10 text-indigo-500' :
                'bg-emerald-500/10 text-emerald-500'
             }`}>
                {u.role}
             </Badge>
        )
    },
    { header: 'Identity Gateway', cell: (u) => <span className="text-[10px] font-bold text-text-secondary dark:text-white/20 italic">{u.email}</span> },
    { 
        header: 'Security Shard',
        cell: (u) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${u.is_active ? 'bg-emerald-500 shadow-emerald-500' : 'bg-amber-500 shadow-amber-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{u.is_active ? 'Authenticated' : 'Locked'}</span>
            </div>
        )
    },
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
    { title: "Total Personnel", value: loading ? "..." : users.length, icon: Users, trend: "Sync'd", color: "var(--accent-primary)" },
    { title: "Authorized MDs", value: loading ? "..." : users.filter(u => u.role === 'doctor').length, icon: Stethoscope, trend: "Active", color: "#10b981" },
    { title: "Medical Staff", value: loading ? "..." : users.filter(u => u.role === 'staff').length, icon: Briefcase, trend: "Sync'd", color: "#6366f1" },
    { title: "Civilian Nodes", value: loading ? "..." : users.filter(u => u.role === 'patient').length, icon: Activity, trend: "Live", color: "#f43f5e" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="User Matrix Control" 
        subtitle="Global Human Capital Index"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
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
            { id: 'ALL', label: 'Global Faculty' },
            { id: 'DOCTOR', label: 'Authorized MDs' },
            { id: 'STAFF', label: 'Operational Staff' },
            { id: 'PATIENT', label: 'Civilian Nodes' }
        ]}
      />

      <AdminTable 
        columns={columns} 
        data={filteredUsers} 
        isLoading={loading}
      />

      {/* 🔮 MODULAR IDENTITY PORTAL */}
      <AddUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleProvision}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

