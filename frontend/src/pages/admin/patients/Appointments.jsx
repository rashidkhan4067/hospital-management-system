import React, { useState } from 'react';
import { 
  Calendar, 
  Plus,
  Clock,
  UserCheck,
  AlertCircle,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard, TableActions } from '../../../components/ui';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';

import BookVisitModal from '../../../components/modals/admin/clinical/BookVisitModal';
import AppointmentService from '../../../services/admin/AppointmentService';
import { useUI } from '../../../context/UIContext';
import { useAdminAppointments } from '../../../hooks/admin/useAdminAppointments';
import AdminPage from '../../../components/layout/AdminPage';

/**
 * 📅 Schedule Management Orchestrator
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
        addNotification('Appointment Booked', 'New appointment has been added successfully.', 'success');
        setIsModalOpen(false);
        refresh(); 
        resetForm();
    } catch (err) {
        const errorMsg = err.response?.data?.detail || err.response?.data?.start_time?.[0] || 'Could not book appointment.';
        addNotification('Booking Error', errorMsg, 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (appointment, newStatus) => {
    try {
        await AppointmentService.update(appointment.id, { status: newStatus });
        addNotification('Status Updated', `Appointment marked as ${newStatus} successfully.`, 'success');
        refresh();
    } catch (err) {
        addNotification('Sync Error', 'Clinical state update failed.', 'error');
    }
  };

  const filteredAppointments = appointments.filter(a => 
    (a.patient_full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || a.doctor_full_name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || a.status.toUpperCase() === activeTab)
  );

  const columns = [
    { 
        header: 'Patient Name', 
        cell: (a) => (
            <div className="flex flex-col">
                <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none">{a.patient_full_name}</p>
                <p className="text-[8px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mt-1.5 tabular-nums">ID: {a.id}</p>
            </div>
        )
    },
    { 
        header: 'Doctor',
        cell: (a) => <span className="text-[10px] font-black text-accent-primary uppercase italic">{a.doctor_full_name}</span>
    },
    { 
        header: 'Date & Time',
        cell: (a) => (
            <div className="flex items-center gap-2">
                <Clock size={12} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-900 dark:text-white/80 tabular-nums">{a.appointment_date} • {a.start_time}</span>
            </div>
        )
    },
    { 
        header: 'Status',
        cell: (a) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${a.status === 'scheduled' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : a.status === 'completed' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${a.status === 'scheduled' ? 'text-emerald-500' : a.status === 'completed' ? 'text-blue-500' : 'text-rose-500'}`}>{a.status}</span>
            </div>
        )
    },
    { 
        header: 'Type',
        cell: () => <Badge className="bg-slate-50 dark:bg-white/5 text-accent-primary border-none text-[8px] font-black uppercase px-4 italic tracking-widest">Clinic Visit</Badge>
    },
    { 
        header: 'Protocol', 
        cell: (a) => (
            <TableActions 
                row={a}
                actions={[
                    { label: 'View Patient Shard', icon: Eye, onClick: (row) => navigate(`/admin/patients/${row.patient}`) },
                    { label: 'Mark Complete', icon: CheckCircle, onClick: (row) => handleStatusChange(row, 'completed') },
                    { label: 'Cancel Visit', icon: XCircle, onClick: (row) => handleStatusChange(row, 'cancelled'), variant: 'danger' },
                ]}
            />
        )
    },
  ];

  const stats = [
    { title: "Total Appointments", value: loading ? "..." : appointments.length, icon: Calendar, trend: "Sync'd" },
    { title: "Scheduled Nodes", value: loading ? "..." : appointments.filter(a => a.status === 'scheduled').length, icon: UserCheck, trend: "Pending" },
    { title: "Completed Nodes", value: loading ? "..." : appointments.filter(a => a.status === 'completed').length, icon: Clock, trend: "Success" },
    { title: "Cancelled Nodes", value: loading ? "..." : appointments.filter(a => a.status === 'cancelled').length, icon: AlertCircle, trend: "Safe" },
  ];

  return (
    <AdminPage>
      <PageHeader 
        title="Appointments" 
        subtitle="Manage Clinical Visit Shards"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all"
            >
                <Plus size={16} /> Book Appointment
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
                { id: 'ALL', label: 'All Shards' },
                { id: 'SCHEDULED', label: 'Scheduled' },
                { id: 'COMPLETED', label: 'Completed' },
                { id: 'CANCELLED', label: 'Cancelled' }
            ]}
        />

        <AdminTable 
            columns={columns} 
            data={filteredAppointments} 
            isLoading={loading}
            onRowClick={(a) => navigate(`/admin/patients/${a.patient}`)}
        />
      </div>

      <BookVisitModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleBook}
        isSubmitting={isSubmitting}
      />
    </AdminPage>
  );
}
