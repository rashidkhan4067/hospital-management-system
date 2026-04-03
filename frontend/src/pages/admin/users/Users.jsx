import React, { useState } from 'react';
import { 
  Users, 
  UserPlus,
  Activity,
  Stethoscope,
  Briefcase,
  Eye,
  ShieldAlert,
  Edit2,
  Trash2
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard, TableActions } from '../../../components/ui';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';
import AddUserModal from '../../../components/modals/admin/identity/AddUserModal';
import UserService from '../../../services/admin/UserService';
import { useUI } from '../../../context/UIContext';
import { useAdminUsers } from '../../../hooks/admin/useAdminUsers';
import AdminPage from '../../../components/layout/AdminPage';

/**
 * 🏢 Elite User Registry Control
 */
export default function AdminUsers() {
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
        addNotification('User Shard Initialized', 'Account credentials committed successfully.', 'success');
        setIsModalOpen(false);
        refresh(); 
        resetForm();
    } catch (err) {
        addNotification('Error', 'Propagation fail on identity node.', 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (user) => {
    try {
        await UserService.update(user.id, { is_active: !user.is_active });
        addNotification('Node State Modified', `User identity ${user.is_active ? 'deactivated' : 'activated'} successfully.`, 'success');
        refresh();
    } catch (err) {
        addNotification('Sync Error', 'Could not modify node propagation state.', 'error');
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
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary text-[10px] font-black group-hover:rotate-6 transition-all duration-500">
                    {(u.full_name || '??').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none">{u.full_name}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 tabular-nums">ID: {u.id}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Role Shard',
        cell: (u) => (
            <Badge className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.15em] border-none ${
                u.role === 'doctor' ? 'bg-blue-500/10 text-blue-500' : 
                u.role === 'staff' ? 'bg-indigo-500/10 text-indigo-500' :
                'bg-emerald-500/10 text-emerald-500'
            }`}>
                {u.role}
             </Badge>
        )
    },
    { header: 'Email Sync', cell: (u) => <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tabular-nums lowercase italic">{u.email}</span> },
    { 
        header: 'Health Node',
        cell: (u) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${u.is_active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${u.is_active ? 'text-emerald-500' : 'text-amber-500'}`}>{u.is_active ? 'Active' : 'Locked'}</span>
            </div>
        )
    },
    { 
        header: 'Protocol', 
        cell: (u) => (
            <TableActions 
                row={u}
                actions={[
                    { label: 'View Shard', icon: Eye, onClick: (row) => console.log('View', row) },
                    { label: 'Modify Credentials', icon: Edit2, onClick: (row) => console.log('Edit', row) },
                    { 
                        label: u.is_active ? 'Deactivate Node' : 'Activate Node', 
                        icon: ShieldAlert, 
                        onClick: handleToggleStatus,
                        variant: u.is_active ? 'danger' : 'success'
                    },
                    { label: 'Terminate Identity', icon: Trash2, onClick: (row) => console.log('Delete', row), variant: 'danger' },
                ]}
            />
        )
    },
  ];

  const stats = [
    { title: "Global Identities", value: loading ? "..." : users.length, icon: Users, trend: "Sync'd" },
    { title: "Clinical Shards", value: loading ? "..." : users.filter(u => u.role === 'doctor').length, icon: Stethoscope, trend: "Total" },
    { title: "Management Shards", value: loading ? "..." : users.filter(u => u.role === 'staff').length, icon: Briefcase, trend: "Total" },
    { title: "Relational Shards", value: loading ? "..." : users.filter(u => u.role === 'patient').length, icon: Activity, trend: "Total" },
  ];

  return (
    <AdminPage>
      <PageHeader 
        title="Identity Management" 
        subtitle="Control Global Hospital User Nodes"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all"
            >
                <UserPlus size={16} /> Provision Shard
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
                { id: 'ALL', label: 'All Identities' },
                { id: 'DOCTOR', label: 'Clinicians' },
                { id: 'STAFF', label: 'Administrative' },
                { id: 'PATIENT', label: 'Relational' }
            ]}
        />

        <AdminTable 
            columns={columns} 
            data={filteredUsers} 
            isLoading={loading}
        />
      </div>

      <AddUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleProvision}
        isSubmitting={isSubmitting}
      />
    </AdminPage>
  );
}
