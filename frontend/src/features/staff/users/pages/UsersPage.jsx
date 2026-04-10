import React, { useState, useMemo } from 'react';
import { 
  UserPlus, User, Users, ShieldCheck, Activity, Briefcase, 
  Stethoscope, Download, Shield
} from 'lucide-react';
import { 
  Button, 
  PageHeader, 
  FilterBar 
} from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';

// 🏗️ SHARED IDENTITY COMPONENTS
import UserIdentityTable from '../components/UserIdentityTable';
import { 
  RoleDistributionShard, 
  SecurityAuditShard, 
  ActivityPulseShard 
} from '../components/IdentityShards';

// 🔮 MODALS HUB
import AddUserModal from '@/features/staff/users/components/AddUserModal';
import UserDetailModal from '@/features/staff/users/components/UserDetailModal';
import EditUserModal from '@/features/staff/users/components/EditUserModal';
import DeleteConfirmModal from '@/features/staff/users/components/DeleteConfirmModal';

// 🎣 DATA HOOKS
import UserService from '@/features/staff/users/api/userService';
import { useUI } from '@/core/ui/UIContext';
import { useAdminUsers } from '@/features/staff/users/hooks/useUsers';

/**
 * 🏢 Global User Registry Matrix
 * Premium administrative command center for identity orchestration.
 */
export default function UsersPage({ mode = 'global', autoOpenAdd = false }) {
  const { addNotification } = useUI();
  const { users: rawUsers, loading, refresh } = useAdminUsers();

  const isPersonnelMode = mode === 'personnel';
  const users = useMemo(() => {
    if (isPersonnelMode) return rawUsers.filter(u => u.role !== 'patient');
    return rawUsers;
  }, [rawUsers, isPersonnelMode]);

  // UI State Shards
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(autoOpenAdd);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 🚀 PROTOCOLS
  const handleProvision = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await UserService.create(formData);
        addNotification('Provision Success', 'Node initialized successfully.', 'success');
        setIsAddModalOpen(false);
        refresh(); 
        resetForm();
    } catch { addNotification('Error', 'Provisioning failure.', 'error'); } 
    finally { setIsSubmitting(false); }
  };

  const handleUpdate = async (formData) => {
    setIsSubmitting(true);
    try {
        await UserService.update(selectedUser.id, formData);
        addNotification('Refactor Success', 'Identity matrix updated.', 'success');
        setIsEditModalOpen(false);
        refresh();
    } catch { addNotification('Error', 'Refactor failure.', 'error'); } 
    finally { setIsSubmitting(false); }
  };

  const handleToggleStatus = async (user) => {
    try {
        await UserService.update(user.id, { is_active: !user.is_active });
        addNotification('Pulse Updated', `Node ${user.is_active ? 'deactivated' : 'activated'}.`, 'success');
        refresh();
    } catch { addNotification('Error', 'Pulse sync failed.', 'error'); }
  };

  const handleDelete = async (user) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
        await UserService.delete(user.id);
        addNotification('Purge Success', 'Node eliminated from matrix.', 'success');
        setIsDeleteModalOpen(false);
        refresh();
    } catch { addNotification('Error', 'Purge failure.', 'error'); } 
    finally { setIsSubmitting(false); }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      (u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       u.id?.toString().includes(searchTerm)) &&
      (activeTab === 'ALL' || u.role?.toUpperCase() === activeTab)
    );
  }, [users, searchTerm, activeTab]);

  const kpis = [
      { title: 'Global Nodes', value: users.length, icon: Users, color: 'text-slate-900 dark:text-white', trend: 'Live Registry' },
      { title: 'Clinical Nodes', value: users.filter(u => u.role !== 'patient').length, icon: Stethoscope, color: 'text-accent-primary', trend: 'Verified' },
      { title: 'Active Shards', value: users.filter(u => u.is_active).length, icon: Activity, color: 'text-emerald-500', trend: 'Synchronized' },
      { title: 'Security Tier', value: 'Alpha', icon: ShieldCheck, color: 'text-indigo-500', trend: 'Audit v7.0' }
  ];

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000">
        
        <PageHeader 
          title={isPersonnelMode ? "Personnel Identity Matrix" : "Global Registry Shards"}
          subtitle="Identity orchestration and authentication audit platform."
          status="Live Shard Engine"
          actions={
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-accent-primary/25 border-none font-display italic"
            >
              <UserPlus size={16} strokeWidth={3} /> {isPersonnelMode ? "Provision Staff" : "Register Node"}
            </Button>
          }
        />

        <UnifiedHeroCTA 
          compact
          title={<>Identity <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Orchestration.</span></>}
          subtitle={`Synchronized with ${users.length} active identity nodes. Multi-factor clinical authentication protocols active across all administrative shards.`}
          pillPrefix="Identity Control Shard"
          pillIcon={Shield}
          actions={[
             { title: 'Global Export', subtitle: 'CSV Ledger Matrix', icon: Download, onClick: () => {} },
             { title: 'Security Audit', subtitle: 'Protocol Log',    icon: ShieldCheck, onClick: () => {} }
          ]}
        />

        <UnifiedKpiGrid loading={loading} stats={kpis} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
           <div className="lg:col-span-8 flex flex-col gap-6">
              <FilterBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                placeholder="Search matrix nodes..."
                tabs={[
                    { id: 'ALL', label: 'All Shards' },
                    { id: 'ADMIN', label: 'Commanders' },
                    { id: 'DOCTOR', label: 'Clinicians' },
                    { id: 'STAFF', label: 'Auxiliary' },
                    { id: 'PATIENT', label: 'Patients' }
                ]}
              />

              <UserIdentityTable 
                data={filteredUsers}
                loading={loading}
                onView={(u) => { setSelectedUser(u); setIsDetailModalOpen(true); }}
                onEdit={(u) => { setSelectedUser(u); setIsEditModalOpen(true); }}
                onToggleStatus={handleToggleStatus}
                onDelete={(u) => { setSelectedUser(u); setIsDeleteModalOpen(true); }}
              />
           </div>

           <div className="lg:col-span-4 flex flex-col gap-6">
              <RoleDistributionShard users={users} loading={loading} />
              <SecurityAuditShard />
              <ActivityPulseShard />
           </div>
        </div>
      </div>

      {/* 🔮 MODALS */}
      <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAction={handleProvision} isSubmitting={isSubmitting} />
      <UserDetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} user={selectedUser} />
      <EditUserModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onAction={handleUpdate} isSubmitting={isSubmitting} user={selectedUser} />
      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onAction={handleDelete} isSubmitting={isSubmitting} item={selectedUser} />
    </AdminPage>
  );
}

