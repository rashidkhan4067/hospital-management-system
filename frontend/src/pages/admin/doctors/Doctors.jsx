import React, { useState } from 'react';
import { 
  Stethoscope, 
  Activity, 
  Award, 
  ShieldCheck,
  Plus,
  Eye,
  Calendar,
  Settings
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard, TableActions } from '../../../components/ui';
import { useNavigate } from 'react-router-dom';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';
import AdjustShiftModal from '../../../components/modals/admin/clinical/AdjustShiftModal';
import AddUserModal from '../../../components/modals/admin/identity/AddUserModal';
import UserService from '../../../services/admin/UserService';
import { useUI } from '../../../context/UIContext';
import { useAdminDoctors } from '../../../hooks/admin/useAdminDoctors';
import AdminPage from '../../../components/layout/AdminPage';

/**
 * 🧛 Specialist Physician Hub (Doctor Management)
 */
export default function AdminDoctors() {
  const navigate = useNavigate();
  const { addNotification } = useUI();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { doctors, loading, refresh } = useAdminDoctors();

  const handleAuthorize = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await UserService.create(formData);
        addNotification('Doctor Authorized', 'New physician credentials committed to system node.', 'success');
        setIsModalOpen(false);
        refresh(); 
        resetForm();
    } catch (err) {
        addNotification('Error', 'Clinical shard propagation failed.', 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleAdjustShift = async (id, data, callback) => {
    setIsSubmitting(true);
    try {
        await UserService.update(id, data);
        addNotification('Clinical protocol updated.', 'Physician shift shards re-aligned.', 'success');
        setIsShiftModalOpen(false);
        refresh();
        callback();
    } catch (err) {
        addNotification('Matrix Sync Error', 'Could not re-align physician node.', 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  const filteredDoctors = doctors.filter(d => 
    (d.user_full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || d.specialization?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || (d.is_available ? 'AVAILABLE' : 'OFFLINE') === activeTab)
  );

  const columns = [
    { 
        header: 'Clinical Lead', 
        cell: (d) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-black">
                    {(d.user_full_name || '??').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none">{d.user_full_name}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 tabular-nums">ID: {d.id} • {d.experience_years}Y EXP</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Specialization Shard',
        cell: (d) => (
            <Badge className="bg-slate-50 dark:bg-white/5 text-accent-primary border-none text-[8px] font-black uppercase px-4 py-1">
                {d.specialization_display || d.specialization}
            </Badge>
        )
    },
    { 
        header: 'Availability Node',
        cell: (d) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${d.is_available ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${d.is_available ? 'text-emerald-500' : 'text-amber-500'}`}>{d.is_available ? 'Active' : 'Offline'}</span>
            </div>
        )
    },
    { 
        header: 'Fee Matrix', 
        cell: (d) => <span className="text-[11px] font-black italic tabular-nums text-slate-900 dark:text-white">Rs. {d.consultation_fee}</span>
    },
    { 
        header: 'Protocol', 
        cell: (d) => (
            <TableActions 
                row={d}
                actions={[
                    { label: 'Adjust Protocols', icon: Settings, onClick: (row) => {
                        setSelectedDoctor(row);
                        setIsShiftModalOpen(true);
                    }},
                    { label: 'View Schedule', icon: Calendar, onClick: (row) => navigate(`/admin/doctors/schedule`) },
                ]}
            />
        )
    },
  ];

  const stats = [
    { title: "Total Physicians", value: loading ? "..." : doctors.length, icon: Stethoscope, trend: "Sync'd" },
    { title: "Active Specialties", value: [...new Set(doctors.map(d => d.specialization))].length, icon: Award, trend: "Stable" },
    { title: "Availability Node", value: "98.2%", icon: Activity, trend: "High" },
    { title: "Credential Sync", value: "Verified", icon: ShieldCheck, trend: "Secure" },
  ];

  return (
    <AdminPage>
      <PageHeader 
        title="Physician Matrix" 
        subtitle="Manage Hospital Specialist Credentials"
        actions={
            <Button 
                onClick={() => {
                    setIsModalOpen(true);
                }}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-2 border-none hover:scale-105 transition-all"
            >
                <Plus size={16} /> Authorize Doctor
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
                { id: 'ALL', label: 'All Specialists' },
                { id: 'AVAILABLE', label: 'Online Shards' },
                { id: 'OFFLINE', label: 'Offline Shards' }
            ]}
        />

        <AdminTable 
            columns={columns} 
            data={filteredDoctors} 
            isLoading={loading}
            onRowClick={(d) => navigate(`/admin/doctors/edit/${d.id}`)}
        />
      </div>

      <AddUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleAuthorize}
        isSubmitting={isSubmitting}
        initialRole="doctor"
      />

      <AdjustShiftModal
        isOpen={isShiftModalOpen}
        onClose={() => setIsShiftModalOpen(false)}
        onAction={handleAdjustShift}
        isSubmitting={isSubmitting}
        selectedDoctor={selectedDoctor}
      />
    </AdminPage>
  );
}
