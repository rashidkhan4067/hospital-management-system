import React, { useState, useMemo } from 'react';
import { 
  Users, Stethoscope, Briefcase, Activity, ShieldCheck, 
  Search, Download, Trash2, Edit3, Eye, CheckCircle, 
  XCircle, Clock, Zap, ArrowUpRight, UserPlus, Heart, Shield
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
import UserIdentityTable from '@/features/identity/components/UserIdentityTable';
import { 
    RoleDistributionShard,
    SecurityAuditShard,
    ActivityPulseShard
} from '@/features/identity/components/IdentityShards';

// 🔮 MODALS HUB
import AddUserModal from '@/features/identity/components/AddUserModal';
import UserDetailModal from '@/features/identity/components/UserDetailModal';
import EditUserModal from '@/features/identity/components/EditUserModal';
import DeleteConfirmModal from '@/features/identity/components/DeleteConfirmModal';

// 🎣 DATA HOOKS
import UserService from '@/features/identity/api/userService';
import { useUI } from '@/core/ui/UIContext';
import { useAdminUsers } from '@/features/identity/hooks/useUsers';
import { useNavigate } from 'react-router-dom';

/**
 * 🏥 Personnel Registry Hub
 * Specialized orchestrator for hospital staff nodes. Optimized for DRY.
 */
export default function StaffPage() {
  const navigate = useNavigate();
  const { addNotification } = useUI();
  const { users: rawUsers, loading, refresh } = useAdminUsers();

  // 🧪 Personnel Cluster (Excludes Patients)
  const staff = useMemo(() => {
    return rawUsers.filter(u => u.role !== 'patient');
  }, [rawUsers]);

  // UI State Shards
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 🚀 PROTOCOLS
  const handleProvision = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await UserService.create(formData);
        addNotification('Personnel Provisioned', 'Node initialized successfully.', 'success');
        setIsAddModalOpen(false);
        refresh(); 
        resetForm();
    } catch { addNotification('Error', 'Provisioning error.', 'error'); } 
    finally { setIsSubmitting(false); }
  };

  const handleUpdate = async (formData) => {
    setIsSubmitting(true);
    try {
        await UserService.update(selectedUser.id, formData);
        addNotification('Refactor Success', 'Identity node updated.', 'success');
        setIsEditModalOpen(false);
        refresh();
    } catch { addNotification('Error', 'Refactor error.', 'error'); } 
    finally { setIsSubmitting(false); }
  };

  const handleToggleStatus = async (user) => {
    try {
        await UserService.update(user.id, { is_active: !user.is_active });
        addNotification('Pulse Synchronized', `Node ${user.is_active ? 'deactivated' : 'activated'}.`, 'success');
        refresh();
    } catch { addNotification('Error', 'Sync failure.', 'error'); }
  };

  const handleDelete = async (user) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
        await UserService.delete(user.id);
        addNotification('Purge Success', 'Identity shard eliminated.', 'success');
        setIsDeleteModalOpen(false);
        refresh();
    } catch { addNotification('Error', 'Purge failure.', 'error'); } 
    finally { setIsSubmitting(false); }
  };

  const filteredStaff = useMemo(() => {
    return staff.filter(u => 
      (u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       u.id?.toString().includes(searchTerm)) &&
      (activeTab === 'ALL' || u.role?.toUpperCase() === activeTab)
    );
  }, [staff, searchTerm, activeTab]);

  const kpis = [
      { title: 'Personnel Nodes', value: staff.length, icon: Users, color: 'text-slate-900 dark:text-white', trend: 'Full Deployment' },
      { title: 'Clinical Nodes', value: staff.filter(u => u.role === 'doctor').length, icon: Stethoscope, color: 'text-accent-primary', trend: 'Active Pulse' },
      { title: 'Security Shards', value: staff.filter(u => u.role === 'admin').length, icon: ShieldCheck, color: 'text-orange-500', trend: 'Verifying' },
      { title: 'Duty Index', value: '94%', icon: Zap, color: 'text-emerald-500', trend: 'Optimal' }
  ];

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000">
        
        <PageHeader 
          title="Personnel Command Matrix"
          subtitle="Management and orchestration of clinical and auxiliary staff nodes."
          status="Live Shard Engine"
          actions={
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate('/admin/staff/roster')}
                className="hidden md:flex items-center gap-2 px-5 py-3 bg-white dark:bg-white/5 text-slate-500 dark:text-white/60 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-white/10 hover:border-slate-300 transition-all font-display italic"
              >
                <Clock size={14} /> Duty Roster
              </Button>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/25 border-none hover:scale-105 transition-all font-display italic"
              >
                <UserPlus size={16} strokeWidth={3} /> Register Staff
              </Button>
            </div>
          }
        />

        <UnifiedHeroCTA 
          compact
          title={<>Personnel <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Orchestration.</span></>}
          subtitle={`Coordinating ${staff.length} professional nodes across the Al Shifaa administrative matrix. Real-time shift tracking and duty synchronization enabled.`}
          pillPrefix="Personnel Registry Shard"
          pillIcon={Shield}
          actions={[
             { title: 'Global Export', subtitle: 'CSV Ledger Matrix', icon: Download, onClick: () => {} },
             { title: 'Leave Matrix',  subtitle: 'Absence Node',    icon: Activity,  onClick: () => navigate('/admin/staff/leaves') }
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
                placeholder="Search staff nodes..."
                tabs={[
                    { id: 'ALL', label: 'All Clusters' },
                    { id: 'DOCTOR', label: 'Clinicians' },
                    { id: 'ADMIN', label: 'Commanders' },
                    { id: 'STAFF', label: 'Auxiliary' }
                ]}
              />

              <UserIdentityTable 
                data={filteredStaff}
                loading={loading}
                onView={(u) => { setSelectedUser(u); setIsDetailModalOpen(true); }}
                onEdit={(u) => { setSelectedUser(u); setIsEditModalOpen(true); }}
                onToggleStatus={handleToggleStatus}
                onDelete={(u) => { setSelectedUser(u); setIsDeleteModalOpen(true); }}
              />
           </div>

           <div className="lg:col-span-4 flex flex-col gap-6">
              <RoleDistributionShard users={staff} loading={loading} />
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
