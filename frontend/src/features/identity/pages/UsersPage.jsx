import React, { useState, useMemo, useCallback } from 'react';
import { UserPlus } from 'lucide-react';
import { Button, PageHeader } from '@/shared/components/ui';
import AdminTable from '@/shared/components/ui/AdminTable';
import FilterBar from '@/shared/components/ui/FilterBar';
import AdminPage from '@/shared/components/layout/AdminPage';

// Modals Hub
import AddUserModal from '@/features/identity/components/AddUserModal';
import UserDetailModal from '@/features/identity/components/UserDetailModal';
import EditUserModal from '@/features/identity/components/EditUserModal';
import DeleteConfirmModal from '@/features/identity/components/DeleteConfirmModal';

// Extracted Sub-Components
import UsersStats from '@/features/identity/components/UsersStats';
import { useUsersColumns } from '@/features/identity/components/useUsersColumns';

// Services & Global State
import UserService from '@/features/identity/api/userService';
import { useUI } from '@/core/ui/UIContext';
import { useAdminUsers } from '@/features/identity/hooks/useUsers';

/**
 * 🏢 Elite User Registry Control Hub
 * Optimized for high-density administrative orchestration and identity auditing.
 */
export default function AdminUsers({ mode = 'global', autoOpenAdd = false }) {
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

  // 🛠️ Diagnostic Pulse
  const debugLog = (protocol, shard) => {
    console.log(`[IDENTITY CORE] Executing ${protocol} on node:`, shard);
  };

  // 🚀 Protocol: Identity Provisioning
  const handleProvision = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await UserService.create(formData);
        addNotification('User Added', 'User account created successfully.', 'success');
        setIsAddModalOpen(false);
        refresh(); 
        resetForm();
    } catch (err) {
        addNotification('Error', 'Failed to create user account.', 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  // 📝 Protocol: Identity Refactor
  const handleUpdate = async (formData) => {
    setIsSubmitting(true);
    try {
        await UserService.update(selectedUser.id, formData);
        addNotification('User Updated', 'User profile updated successfully.', 'success');
        setIsEditModalOpen(false);
        refresh();
    } catch (err) {
        addNotification('Error', 'Failed to update user profile.', 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  // 🔒 Protocol: State Deactivation
  const handleToggleStatus = async (user) => {
    try {
        await UserService.update(user.id, { is_active: !user.is_active });
        addNotification('Status Updated', `User account ${user.is_active ? 'deactivated' : 'activated'}.`, 'success');
        refresh();
    } catch (err) {
        addNotification('Error', 'Status update failed.', 'error');
    }
  };

  // ☢️ Protocol: Identity Termination
  const handleDelete = async (user) => {
    if (!user) return;
    setIsSubmitting(true);
    debugLog('PURGE_START', user.id);
    try {
        await UserService.delete(user.id);
        addNotification('User Deleted', `Account has been permanently deleted.`, 'success');
        setIsDeleteModalOpen(false);
        refresh();
    } catch (err) {
        console.error('[PURGE ERROR]', err);
        addNotification('Error', 'Failed to delete user account.', 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  const openDetails = useCallback((user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  }, []);

  const openEdit = useCallback((user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }, []);

  const openDelete = useCallback((user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      (u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.id?.toString().includes(searchTerm)) &&
      (activeTab === 'ALL' || u.role?.toUpperCase() === activeTab)
    );
  }, [users, searchTerm, activeTab]);

  const columns = useUsersColumns({ openDetails, openEdit, handleToggleStatus, openDelete });

  return (
    <AdminPage>
      <PageHeader 
        title={isPersonnelMode ? "Hospital Personnel" : "User Accounts"} 
        subtitle={isPersonnelMode ? "Manage Hospital Staff & Doctors" : "Manage All Registered Users"}
        actions={
            <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 active:scale-95 transition-all"
            >
                <UserPlus size={16} /> {isPersonnelMode ? "Add Staff" : "Add User"}
            </Button>
        }
      />

      <UsersStats loading={loading} users={users} />

      <div className="space-y-10">
        <FilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
                { id: 'ALL', label: 'All Users' },
                { id: 'DOCTOR', label: 'Doctors' },
                { id: 'STAFF', label: 'Staff' },
                { id: 'PATIENT', label: 'Patients' },
                { id: 'ADMIN', label: 'Admins' }
            ]}
        />

        <AdminTable 
            columns={columns} 
            data={filteredUsers} 
            isLoading={loading}
            onRowClick={(u) => {
                debugLog('ROW_INTERACTION', u);
                openDetails(u);
            }}
        />
      </div>

      {/* 🔮 Modals Dispatcher Matrix */}
      <AddUserModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAction={handleProvision}
        isSubmitting={isSubmitting}
      />

      <UserDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        user={selectedUser}
      />

      <EditUserModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onAction={handleUpdate}
        isSubmitting={isSubmitting}
        user={selectedUser}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onAction={handleDelete}
        isSubmitting={isSubmitting}
        item={selectedUser}
      />

    </AdminPage>
  );
}
