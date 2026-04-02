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
import { Badge, Button, PageHeader, StatsCard } from '../../../components/ui';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';

import AddUserModal from '../../../components/features/admin/AddUserModal';
import UserService from '../../../services/admin/UserService';
import { useUI } from '../../../context/UIContext';
import { Plus } from 'lucide-react';

import { useAdminUsers } from '../../../hooks/admin/useAdminUsers';

/**
 * 💼 Operational Staff Matrix
 * Specialized management hub for medical and support personnel.
 */
export default function AdminStaff() {
  const navigate = useNavigate();
  const { addNotification } = useUI();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { users, loading, refresh } = useAdminUsers();

  const handleOnboard = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await UserService.create(formData);
        addNotification('Personnel Onboarded', 'New operational shard successfully committed to the global faculty registry.', 'success');
        setIsModalOpen(false);
        refresh(); 
        resetForm();
    } catch (err) {
        addNotification('Sync Failure', 'Could not propagate personnel shard to clinical database.', 'error');
        console.error(err);
    } finally {
        setIsSubmitting(false);
    }
  };

  const staffMembers = users.filter(u => u.role !== 'patient').filter(s => 
    (s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || s.id?.toString().includes(searchTerm)) &&
    (activeTab === 'ALL' || (s.is_active ? 'ACTIVE' : 'AWAY') === activeTab)
  );

  const columns = [
    { 
        header: 'Personnel Identity', 
        cell: (s) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary text-[10px] font-black uppercase">
                    {(s.full_name || '??').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{s.full_name}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">ID-{s.id}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Operational Role',
        cell: (s) => (
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-text-primary dark:text-white uppercase tracking-tight">{s.role}</span>
                <span className="text-[8px] font-bold text-accent-primary uppercase tracking-widest italic opacity-60">Standard Protocol</span>
            </div>
        )
    },
    { 
        header: 'Status',
        cell: (s) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${s.is_active ? 'bg-emerald-500 shadow-emerald-500' : 'bg-rose-500 shadow-rose-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{s.is_active ? 'Active' : 'Offline'}</span>
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
    { title: "Total Personnel", value: loading ? "..." : users.filter(u => u.role !== 'patient').length, icon: Users, trend: "Sync'd", color: "var(--accent-primary)" },
    { title: "On-Duty Now", value: loading ? "..." : users.filter(u => u.is_active && u.role !== 'patient').length, icon: Activity, trend: "Live", color: "#10b981" },
    { title: "Support Force", value: loading ? "..." : users.filter(u => u.role === 'staff').length, icon: Briefcase, trend: "Stable", color: "#6366f1" },
    { title: "Medical Elite", value: loading ? "..." : users.filter(u => u.role === 'doctor').length, icon: Stethoscope, trend: "Authorized", color: "#f43f5e" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Staff Matrix Hub" 
        subtitle="Global Workforce Management Interface"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none"
            >
                <Plus size={14} /> Onboard Personnel
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
            { id: 'AWAY', label: 'Away / Shift-End' }
        ]}
      />

      <AdminTable 
        columns={columns} 
        data={staffMembers} 
        isLoading={loading}
      />

      {/* 🔮 MODULAR PERSONNEL PORTAL */}
      <AddUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleOnboard}
        isSubmitting={isSubmitting}
        initialRole="staff"
      />
    </div>
  );
}
