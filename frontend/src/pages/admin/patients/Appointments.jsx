import React, { useState } from 'react';
import { 
  Calendar, 
  Plus,
  Clock,
  UserCheck,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '../../../components/ui';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';

import BookVisitModal from '../../../components/features/admin/BookVisitModal';
import AppointmentService from '../../../services/admin/AppointmentService';
import { useUI } from '../../../context/UIContext';

import { useAdminAppointments } from '../../../hooks/admin/useAdminAppointments';

/**
 * 📅 Schedule Management Orchestrator
 * High-fidelity interface for cross-departmental scheduling.
 */
export default function AdminAppointments() {
  const { addNotification } = useUI();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { appointments, loading, refresh } = useAdminAppointments();

  const handleBook = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await AppointmentService.create(formData);
        addNotification('Visit Shard Provisioned', 'New clinical visit successfully committed to the global scheduling matrix.', 'success');
        setIsModalOpen(false);
        refresh(); 
        resetForm();
    } catch (err) {
        const errorMsg = err.response?.data?.detail || err.response?.data?.start_time?.[0] || 'Could not propagate visit shard.';
        addNotification('Scheduling Conflict', errorMsg, 'error');
        console.error(err);
    } finally {
        setIsSubmitting(false);
    }
  };

  const filteredAppointments = appointments.filter(a => 
    (a.patient_full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || a.doctor_full_name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || a.status.toUpperCase() === activeTab)
  );

  const columns = [
    { 
        header: 'Patient Node', 
        cell: (a) => (
            <div className="flex flex-col">
                <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{a.patient_full_name}</p>
                <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">APT-{a.id}</p>
            </div>
        )
    },
    { 
        header: 'Assigned Specialist',
        cell: (a) => <span className="text-[10px] font-black text-accent-primary uppercase italic">{a.doctor_full_name}</span>
    },
    { 
        header: 'Schedule Shard',
        cell: (a) => (
            <div className="flex items-center gap-2">
                <Clock size={12} className="text-text-secondary/40" />
                <span className="text-[10px] font-black text-text-primary dark:text-white/80">{a.appointment_date} • {a.start_time}</span>
            </div>
        )
    },
    { 
        header: 'Operational Status',
        cell: (a) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${a.status === 'scheduled' ? 'bg-emerald-500 shadow-emerald-500' : a.status === 'completed' ? 'bg-blue-500 shadow-blue-500' : 'bg-rose-500 shadow-rose-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{a.status}</span>
            </div>
        )
    },
    { 
        header: 'Complexity',
        cell: (a) => <Badge className="bg-bg-base dark:bg-white/5 text-accent-primary border-none text-[8px] font-black uppercase px-4 italic">Standard</Badge>
    },
    { 
        header: 'Actions', 
        cell: () => (
            <button className="p-3 rounded-xl bg-bg-base dark:bg-slate-800/40 text-text-secondary hover:text-accent-primary transition-all">
                <MoreHorizontal size={14} />
            </button>
        )
    },
  ];

  const stats = [
    { title: "Global Load", value: loading ? "..." : appointments.length, icon: Calendar, trend: "Sync'd", color: "var(--accent-primary)" },
    { title: "Confirmed Visits", value: loading ? "..." : appointments.filter(a => a.status === 'scheduled').length, icon: UserCheck, trend: "Stable", color: "#10b981" },
    { title: "Historical Node", value: loading ? "..." : appointments.filter(a => a.status === 'completed').length, icon: Clock, trend: "+12", color: "#6366f1" },
    { title: "Cancellations", value: loading ? "..." : appointments.filter(a => a.status === 'cancelled').length, icon: AlertCircle, trend: "Safe", color: "#f43f5e" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Schedule Orchestration" 
        subtitle="Inter-Departmental Visit Matrix"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none"
            >
                <Plus size={14} /> Schedule Visit
            </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
            { id: 'ALL', label: 'Global Schedule' },
            { id: 'SCHEDULED', label: 'Scheduled Matrix' },
            { id: 'COMPLETED', label: 'Historical Node' },
            { id: 'CANCELLED', label: 'Terminated Shards' }
        ]}
      />

      <AdminTable 
        columns={columns} 
        data={filteredAppointments} 
        isLoading={loading}
      />

      <BookVisitModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleBook}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
