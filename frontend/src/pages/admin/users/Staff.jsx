import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  MoreHorizontal,
  Stethoscope,
  Activity,
  Plus
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '../../../components/ui';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';
import AddUserModal from '../../../components/modals/admin/identity/AddUserModal';
import UserService from '../../../services/admin/UserService';
import { useUI } from '../../../context/UIContext';
import { useAdminUsers } from '../../../hooks/admin/useAdminUsers';
import AdminPage from '../../../components/layout/AdminPage'; // ✨ THE BASE FILE

/**
 * 💼 Operational Staff Matrix
 */
export default function AdminStaff() {
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
        addNotification('Personnel Onboarded', 'Staff credentials successfully initialized.', 'success');
        setIsModalOpen(false);
        refresh(); 
        resetForm();
    } catch (err) {
        addNotification('Error', 'Personnel propagation failed.', 'error');
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
        header: 'Staff Identity', 
        cell: (s) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary text-[10px] font-black uppercase">
                    {(s.full_name || '??').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none">{s.full_name}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 tabular-nums">ID: {s.id}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Duty Shard',
        cell: (s) => (
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{s.role}</span>
                <span className="text-[8px] font-bold text-accent-primary uppercase tracking-widest italic opacity-60">Hospital Node</span>
            </div>
        )
    },
    { 
        header: 'Status Node',
        cell: (s) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${s.is_active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`} />
                <span className={`text-[10px] font-black uppercase tracking-tight ${s.is_active ? 'text-emerald-500' : 'text-rose-500'}`}>{s.is_active ? 'Active' : 'Offline'}</span>
            </div>
        )
    },
    { header: 'Email Shard', cell: (s) => <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tabular-nums italic">{s.email}</span> },
    { 
        header: 'Protocol', 
        cell: () => (
            <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-slate-400 hover:text-accent-primary transition-all shadow-inner">
                <MoreHorizontal size={14} />
            </button>
        )
    },
  ];

  const stats = [
    { title: "Personnel Total", value: loading ? "..." : users.filter(u => u.role !== 'patient').length, icon: Users, trend: "Sync'd" },
    { title: "Active Shards", value: loading ? "..." : users.filter(u => u.is_active && u.role !== 'patient').length, icon: Activity, trend: "Live Tracking" },
    { title: "Administrative Force", value: loading ? "..." : users.filter(u => u.role === 'staff').length, icon: Briefcase, trend: "Stable" },
    { title: "Clinician Force", value: loading ? "..." : users.filter(u => u.role === 'doctor').length, icon: Stethoscope, trend: "Authorized" },
  ];

  return (
    <AdminPage>
      <PageHeader 
        title="Hospital Personnel" 
        subtitle="Manage Global Staff & Clinical Support Shards"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-2 border-none hover:scale-105 transition-all"
            >
                <Plus size={16} /> Onboard Personnel
            </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      <div className="space-y-10">
        <FilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
                { id: 'ALL', label: 'All Personnel' },
                { id: 'ACTIVE', label: 'Operational' },
                { id: 'AWAY', label: 'Away Shards' }
            ]}
        />

        <AdminTable 
            columns={columns} 
            data={staffMembers} 
            isLoading={loading}
        />
      </div>

      <AddUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleOnboard}
        isSubmitting={isSubmitting}
        initialRole="staff"
      />
    </AdminPage>
  );
}
