import React, { useState } from 'react';
import { 
  Stethoscope, 
  Activity, 
  Award, 
  ShieldCheck,
  Plus,
  Eye,
  Calendar,
  Settings,
  Edit2
} from 'lucide-react';
import { Badge, Button, PageHeader, TableActions, FilterBar } from '@/shared/components/ui';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@/shared/components/ui/AdminTable';
import UnifiedKpiGrid from '@/shared/components/common/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/shared/components/common/UnifiedHeroCTA';
import AdjustShiftModal from '@/features/doctors/components/AdjustShiftModal';
import AddDoctorModal from '../components/list/AddDoctorModal';
import EditDoctorModal from '../components/record/EditDoctorModal';
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { doctors, loading, refresh } = useAdminDoctors();



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
    (d.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || d.specialization?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || (d.is_available ? 'AVAILABLE' : 'OFFLINE') === activeTab)
  );

  const columns = [
    { 
        header: 'Doctor Name', 
        cell: (d) => (
            <div 
                className="flex items-center gap-4 cursor-pointer group" 
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/doctors/${d.id}`);
                }}
            >
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-black group-hover:scale-110 transition-all">
                    {(d.full_name || '??').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none group-hover:text-accent-primary transition-colors">{d.full_name || 'Staff'}</p>
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
                    { label: 'Edit Record', icon: Edit2, onClick: (row) => {
                        setSelectedDoctor(row);
                        setIsEditModalOpen(true);
                    }},
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




  return (
    <AdminPage>
      <PageHeader 
        title="Physician Registry" 
        subtitle="Clinical Provider Matrix Synchronized"
        status="Live Records"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-2 border-none hover:scale-105 transition-all"
            >
                <Plus size={16} /> Add Doctor
            </Button>
        }
      />

      {/* ── Unified Hero CTA ── */}
      <UnifiedHeroCTA 
        title={<>Specialist <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Network.</span></>}
        subtitle={`Managing ${doctors.length} verified clinical specialists across ${[...new Set(doctors.map(d => d.specialization))].length} medical departments.`}
        pillPrefix="Clinical Provider Registry"
        pillIcon={Stethoscope}
        actions={[
          { title: 'Enroll Doctor', subtitle: 'Onboard Specialist', icon: Plus, onClick: () => setIsModalOpen(true) },
          { title: 'Schedules', subtitle: 'Manage Rotations', icon: Calendar, onClick: () => navigate('/admin/doctors/schedule') }
        ]}
      />

      {/* ── Unified KPI Hub ── */}
      <UnifiedKpiGrid 
        loading={loading}
        stats={[
          { title: "Total Doctors", value: doctors.length, icon: Stethoscope, trend: "Current" },
          { title: "Specializations", value: [...new Set(doctors.map(d => d.specialization))].length, icon: Award, trend: "Current" },
          { title: "Available Now", value: doctors.filter(d => d.is_available).length, icon: Activity, trend: "Active" },
          { title: "Verified", value: "100%", icon: ShieldCheck, trend: "Secure" },
        ]}
      />

      <div className="space-y-8 mt-4">
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
            onRowClick={(d) => navigate(`/admin/doctors/${d.id}`)}
        />
      </div>

      <AddDoctorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={refresh}
      />

      <EditDoctorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        doctorId={selectedDoctor?.id}
        initialData={selectedDoctor}
        onRefresh={refresh}
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
