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
import { Badge, Button, PageHeader, StatsCard, TableActions } from '@/shared/components/ui';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@/shared/components/ui/AdminTable';
import FilterBar from '@/shared/components/ui/FilterBar';
import AdjustShiftModal from '@/features/doctors/components/AdjustShiftModal';
import AddUserModal from '@/features/identity/components/AddUserModal';
import UserService from '@/features/identity/api/userService';
import { useUI } from '@/core/ui/UIContext';
import { useAdminDoctors } from '@/features/doctors/hooks/useDoctors';
import AdminPage from '@/shared/components/layout/AdminPage';

/**
 * 🧛 Specialist Physician Hub (Doctor Management)
 */
export default function AdminDoctors({ autoOpenAdd = false }) {
  const navigate = useNavigate();
  const { addNotification } = useUI();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(autoOpenAdd);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { doctors, loading, refresh } = useAdminDoctors();

  const handleAuthorize = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await UserService.create(formData);
        addNotification('Doctor Added', 'New doctor account created successfully.', 'success');
        setIsModalOpen(false);
        refresh(); 
        resetForm();
    } catch (err) {
        addNotification('Error', 'Failed to create doctor account.', 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleAdjustShift = async (id, data, callback) => {
    setIsSubmitting(true);
    try {
        await UserService.update(id, data);
        addNotification('Shift Updated', 'Doctor schedule updated successfully.', 'success');
        setIsShiftModalOpen(false);
        refresh();
        callback();
    } catch (err) {
        addNotification('Error', 'Could not update schedule.', 'error');
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
        header: 'Doctor Name', 
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
        header: 'Specialization',
        cell: (d) => (
            <Badge className="bg-slate-50 dark:bg-white/5 text-accent-primary border-none text-[8px] font-black uppercase px-4 py-1">
                {d.specialization_display || d.specialization}
            </Badge>
        )
    },
    { 
        header: 'Status',
        cell: (d) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${d.is_available ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${d.is_available ? 'text-emerald-500' : 'text-amber-500'}`}>{d.is_available ? 'Active' : 'Offline'}</span>
            </div>
        )
    },
    { 
        header: 'Consultation Fee', 
        cell: (d) => <span className="text-[11px] font-black italic tabular-nums text-slate-900 dark:text-white">Rs. {d.consultation_fee}</span>
    },
    { 
        header: 'Actions', 
        cell: (d) => (
            <TableActions 
                row={d}
                actions={[
                    { label: 'Update Schedule', icon: Settings, onClick: (row) => {
                        setSelectedDoctor(row);
                        setIsShiftModalOpen(true);
                    }},
                    { label: 'View Appointments', icon: Calendar, onClick: (row) => navigate(`/admin/doctors/schedule`) },
                ]}
            />
        )
    },
  ];

  const stats = [
    { title: "Total Doctors", value: loading ? "..." : doctors.length, icon: Stethoscope, trend: "Current" },
    { title: "Specializations", value: [...new Set(doctors.map(d => d.specialization))].length, icon: Award, trend: "Current" },
    { title: "Available Now", value: doctors.filter(d => d.is_available).length, icon: Activity, trend: "Active" },
    { title: "Verified", value: "100%", icon: ShieldCheck, trend: "Secure" },
  ];

  return (
    <AdminPage>
      <PageHeader 
        title="Doctors" 
        subtitle="Manage Hospital Doctors & Specializations"
        actions={
            <Button 
                onClick={() => {
                    setIsModalOpen(true);
                }}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-2 border-none hover:scale-105 transition-all"
            >
                <Plus size={16} /> Add Doctor
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
                { id: 'ALL', label: 'All Doctors' },
                { id: 'AVAILABLE', label: 'Online' },
                { id: 'OFFLINE', label: 'Offline' }
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
