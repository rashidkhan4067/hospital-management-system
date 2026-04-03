import React, { useState, useMemo, useCallback } from 'react';
import { 
  Users, 
  UserPlus,
  Heart,
  Activity,
  Eye,
  ShieldPlus,
  Calendar,
  Trash2
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard, TableActions } from '@/shared/components/ui';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@/shared/components/ui/AdminTable';
import FilterBar from '@/shared/components/ui/FilterBar';
import AdminPage from '@/shared/components/layout/AdminPage';

// 🔮 Modals
import DeleteConfirmModal from '@/features/identity/components/DeleteConfirmModal';
import AddUserModal from '@/features/identity/components/AddUserModal';
import { useNotifications } from '@/shared/hooks/useNotifications';
import UserService from '@/features/identity/api/userService';

// 🎣 Data Hooks
import { useAdminPatients } from '@/features/patients/hooks/usePatients';
import { useAdminStats } from '@/features/dashboard/hooks/useStats';

/**
 * 🩺 Patient Management
 * Screen to manage all patients and their medical history.
 */
export default function AdminPatients({ autoOpenAdd = false }) {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  
  // 🧭 UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(autoOpenAdd);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🎣 Data Hooks
  const { patients, loading: patientsLoading, refresh } = useAdminPatients();
  const { stats: statsSummary, loading: statsLoading } = useAdminStats();

  const loading = patientsLoading || statsLoading;

  // Delete Patient Record
  const handleDelete = useCallback(async (patient) => {
    setIsSubmitting(true);
    try {
        await UserService.delete(patient.id);
        addNotification('Patient Deleted', `Patient record has been removed.`, 'success');
        setIsDeleteModalOpen(false);
        refresh();
    } catch (err) {
        addNotification('Error', 'Failed to delete record.', 'error');
    } finally {
        setIsSubmitting(false);
    }
  }, [refresh, addNotification]);

  const openDelete = useCallback((patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  }, []);

  // Filter List of Patients
  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
        const matchesSearch = p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             p.id?.toString().includes(searchTerm);
        
        if (activeTab === 'CRITICAL') return matchesSearch && p.is_admitted;
        if (activeTab === 'STABLE') return matchesSearch && !p.is_admitted;
        
        return matchesSearch;
    });
  }, [patients, searchTerm, activeTab]);

  // Dashboard Stats
  const stats = useMemo(() => [
    { title: "Total Patients", value: loading ? "..." : statsSummary?.counts?.patients ?? 0, icon: Users, trend: "Tracking" },
    { title: "Admitted", value: loading ? "..." : statsSummary?.counts?.active_admissions ?? 0, icon: Heart, trend: "Live" },
    { title: "New Patients", value: loading ? "..." : (patients.length > 5 ? 5 : patients.length), icon: UserPlus, trend: "Current" },
    { title: "System Status", value: "Online", icon: Activity, trend: "Live" },
  ], [loading, statsSummary, patients.length]);

  const columns = [
    { 
        header: 'Patient Profile', 
        cell: (p) => (
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate(`/admin/patients/${p.id}`)}>
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary text-[10px] font-black uppercase group-hover:scale-110 transition-all">
                    {(p.full_name || '??').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none group-hover:text-accent-primary transition-colors">{p.full_name || 'Anonymous'}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 tabular-nums">ID: {p.id} • {p.gender || 'N/A'}</p>
                </div>
            </div>
        )
    },
    { header: 'Blood Type', accessor: 'blood_group', cell: (p) => <Badge className="bg-rose-500/10 text-rose-500 border-none text-[9px] px-3 py-1 font-black uppercase tracking-[0.2em]">{p.blood_group || '??'}</Badge> },
    { header: 'Last Visit', accessor: 'updated_at', cell: (p) => <span className="text-[10px] font-bold text-slate-400 tabular-nums">{new Date(p.updated_at).toLocaleDateString()}</span> },
    { 
        header: 'Patient Status',
        accessor: 'is_admitted',
        cell: (p) => (
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${p.is_admitted ? 'bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${p.is_admitted ? 'text-rose-500' : 'text-emerald-500'}`}>{p.is_admitted ? 'Admitted' : 'Outpatient'}</span>
            </div>
        )
    },
    { header: 'Contact', accessor: 'phone', cell: (p) => <span className="text-[10px] font-black text-slate-500 tracking-[0.1em] tabular-nums">{p.phone}</span> },
    { 
        header: 'Actions', 
        cell: (p) => (
            <TableActions 
                row={p}
                actions={[
                    { label: 'View Record', icon: Eye, onClick: (row) => navigate(`/admin/patients/${row.id}`) },
                    { label: 'Activity', icon: Activity, onClick: (row) => navigate(`/admin/patients/${row.id}/appointments`) },
                    { label: 'Book Visit', icon: Calendar, onClick: (row) => navigate(`/admin/appointments/add?patient=${row.id}`) },
                    { label: 'Edit Patient', icon: ShieldPlus, onClick: (row) => navigate(`/admin/patients/edit/${row.id}`) },
                    { label: 'Delete Record', icon: Trash2, onClick: openDelete, variant: 'danger' },
                ]}
            />
        )
    },
  ];

  return (
    <AdminPage>
      <PageHeader 
        title="Patients" 
        subtitle="Manage Hospital Patient Records"
        actions={
            <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all"
            >
                <UserPlus size={16} /> Add Patient
            </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      <div className="space-y-10 mt-10">
        <FilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
                { id: 'ALL', label: 'All Patients' },
                { id: 'STABLE', label: 'Verified Patients' },
                { id: 'CRITICAL', label: 'Admitted' }
            ]}
        />

        <AdminTable 
            columns={columns} 
            data={filteredPatients} 
            isLoading={loading}
        />
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onRefresh={refresh}
        initialRole="patient"
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onAction={handleDelete}
        isSubmitting={isSubmitting}
        item={selectedPatient}
        title="Delete Patient Record"
      />
    </AdminPage>
  );
}
