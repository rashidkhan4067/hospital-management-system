import React, { useState, useMemo } from 'react';
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
import { Badge, Button, PageHeader, StatsCard, TableActions } from '@/shared/components/ui';
import AdminTable from '@/shared/components/ui/AdminTable';
import FilterBar from '@/shared/components/ui/FilterBar';

import BookVisitModal from '@/features/appointments/components/BookVisitModal';
import AppointmentService from '@/features/appointments/api/appointmentService';
import { useUI } from '@/core/ui/UIContext';
import { useAdminAppointments } from '@/features/appointments/hooks/useAppointments';
import AdminPage from '@/shared/components/layout/AdminPage';
import { useNavigate } from 'react-router-dom';

/**
 * 📅 Appointment Management
 * Screen to view and manage all hospital visits.
 */
export default function AdminAppointments({ autoOpenAdd = false }) {
  const navigate = useNavigate();
  const { addNotification } = useUI();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(autoOpenAdd);

  const { appointments, loading, refresh } = useAdminAppointments();

  // Change Appointment Status
  const handleStatusChange = async (appointment, newStatus) => {
    try {
        await AppointmentService.update(appointment.id, { status: newStatus });
        addNotification('Status Updated', `Appointment marked as ${newStatus} successfully.`, 'success');
        refresh();
    } catch (err) {
        addNotification('Error', 'Could not update appointment status.', 'error');
    }
  };

  // Filter List of Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(a => {
        const patientName = a.patient?.full_name || '';
        const doctorName = a.doctor?.full_name || '';
        const status = a.status?.toUpperCase();
        
        const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              doctorName.toLowerCase().includes(searchTerm.toLowerCase());
                              
        const matchesTab = activeTab === 'ALL' || 
                           status === activeTab || 
                           (activeTab === 'SCHEDULED' && status === 'PENDING');

        return matchesSearch && matchesTab;
    });
  }, [appointments, searchTerm, activeTab]);

  const columns = [
    { 
        header: 'Patient Name', 
        cell: (a) => (
            <div className="flex flex-col group cursor-pointer" onClick={() => navigate(`/admin/patients/${a.patient?.id}`)}>
                <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none group-hover:text-accent-primary transition-colors">{a.patient?.full_name || 'Anonymous'}</p>
                <p className="text-[8px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mt-1.5 tabular-nums">ID: {a.id}</p>
            </div>
        )
    },
    { 
        header: 'Doctor',
        cell: (a) => <span className="text-[10px] font-black text-accent-primary uppercase italic">{a.doctor?.full_name || 'Unassigned'}</span>
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
        cell: (a) => {
            const status = a.status?.toLowerCase();
            return (
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${status === 'scheduled' || status === 'pending' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : status === 'completed' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'scheduled' || status === 'pending' ? 'text-emerald-500' : status === 'completed' ? 'text-blue-500' : 'text-rose-500'}`}>{a.status_display || a.status}</span>
                </div>
            );
        }
    },
    { 
        header: 'Type',
        cell: () => <Badge className="bg-slate-50 dark:bg-white/5 text-accent-primary border-none text-[8px] font-black uppercase px-4 italic tracking-widest">Clinic Visit</Badge>
    },
    { 
        header: 'Actions', 
        cell: (a) => (
            <TableActions 
                row={a}
                actions={[
                    { label: 'View Patient File', icon: Eye, onClick: (row) => navigate(`/admin/patients/${row.patient?.id}`) },
                    { label: 'Mark Complete', icon: CheckCircle, onClick: (row) => handleStatusChange(row, 'completed') },
                    { label: 'Cancel Visit', icon: XCircle, onClick: (row) => handleStatusChange(row, 'cancelled'), variant: 'danger' },
                ]}
            />
        )
    }
  ];

  const stats = useMemo(() => [
    { title: "Total Appointments", value: loading ? "..." : appointments.length, icon: Calendar, trend: "Current" },
    { title: "Scheduled", value: loading ? "..." : appointments.filter(a => a.status === 'scheduled' || a.status === 'pending').length, icon: UserCheck, trend: "Pending" },
    { title: "Completed", value: loading ? "..." : appointments.filter(a => a.status === 'completed').length, icon: Clock, trend: "Success" },
    { title: "Cancelled", value: loading ? "..." : appointments.filter(a => a.status === 'cancelled').length, icon: AlertCircle, trend: "History" },
  ], [appointments, loading]);

  return (
    <AdminPage>
      <PageHeader 
        title="Appointments" 
        subtitle="Manage Medical Visits"
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
                { id: 'ALL', label: 'All Appointments' },
                { id: 'SCHEDULED', label: 'Scheduled' },
                { id: 'COMPLETED', label: 'Completed' },
                { id: 'CANCELLED', label: 'Cancelled' }
            ]}
        />

        <AdminTable 
            columns={columns} 
            data={filteredAppointments} 
            isLoading={loading}
        />
      </div>

      <BookVisitModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={refresh}
      />
    </AdminPage>
  );
}
