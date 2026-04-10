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
import { Badge, Button, Card, PageHeader, TableActions, FilterBar } from '@/components/primitives';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@/components/primitives/AdminTable';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import AdjustShiftModal from '@/features/clinical/doctors/components/AdjustShiftModal';
import AddDoctorModal from '../components/list/AddDoctorModal';
import EditDoctorModal from '../components/record/EditDoctorModal';
import UserService from '@/features/staff/users/api/userService';
import { useUI } from '@/core/ui/UIContext';
import { useAdminDoctors } from '@/features/clinical/doctors/hooks/useDoctors';
import AdminPage from '@/layouts/AdminPage';

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

  const { doctors, stats, loading, refresh } = useAdminDoctors();



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
          { title: "Total Doctors", value: stats?.overview?.total || doctors.length, icon: Stethoscope, trend: "Current" },
          { title: "Specializations", value: stats?.specializations?.length || [...new Set(doctors.map(d => d.specialization))].length, icon: Award, trend: "Current" },
          { title: "Available Now", value: stats?.overview?.active || doctors.filter(d => d.is_available).length, icon: Activity, trend: "Active" },
          { title: "Verified", value: "100%", icon: ShieldCheck, trend: "Secure" },
        ]}
      />

      {/* ── Practitioner Availability Matrix — Admin Intelligence Shard ── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
          <div className="lg:col-span-3">
             <Card className="p-8 rounded-[48px] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2xals relative overflow-hidden flex flex-col gap-8 h-full">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter leading-none">Clinical Node Coverage</h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-60">Real-time Physician Density per Department</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {stats?.specializations?.slice(0, 5).map((spec, i) => (
                        <div key={i} className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black uppercase text-slate-400 truncate">{spec.specialization}</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-slate-900 dark:text-white italic tabular-nums">{spec.count}</span>
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase">({spec.active})</span>
                                </div>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-accent-primary rounded-full" style={{ width: `${(spec.active / spec.count) * 100}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
             </Card>
          </div>
          <div className="lg:col-span-1">
             <Card className="p-8 rounded-[48px] bg-slate-900 dark:bg-slate-800 text-white border-none flex flex-col justify-between h-full relative group overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-[2s]" />
               <div className="space-y-4 relative z-10">
                  <h4 className="text-[11px] font-black text-accent-primary uppercase tracking-[0.3em] italic">Orchestration Notice</h4>
                  <p className="text-sm font-bold leading-relaxed opacity-80 uppercase tracking-tighter italic">Total hospital nodes are currently 98% efficient. No coverage gaps detected in critical wards.</p>
               </div>
               <Button className="w-full bg-white/10 hover:bg-white text-white hover:text-slate-900 border-none rounded-2xl py-4 text-[9px] font-black uppercase tracking-widest transition-all relative z-10">
                  Staffing Report
               </Button>
             </Card>
          </div>
      </div>

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

