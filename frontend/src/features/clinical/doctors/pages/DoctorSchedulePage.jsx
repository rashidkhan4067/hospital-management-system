import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Stethoscope, 
  Search, 
  CheckCircle2, 
  AlertTriangle,
  MoreHorizontal,
  ChevronLeft,
  Filter
} from 'lucide-react';
import { PageHeader, Button, Card, Badge } from '@/components/primitives';
import AdminTable from '@/components/primitives/AdminTable';
import FilterBar from '@/components/primitives/FilterBar';
import AdjustShiftModal from '@/features/clinical/doctors/components/AdjustShiftModal';
import { doctorService } from '@/features/clinical/doctors/api/doctorService';
import { useAdminDoctors } from '@/features/clinical/doctors/hooks/useDoctors';
import { useUI } from '@/core/ui/UIContext';

/**
 * 📅 Specialist Availability Matrix (Doctor Schedule)
 * Clean, data-driven console for managing physician shift protocols.
 * Connected to live clinical registry for real-time shift alignment.
 */
export default function DoctorSchedule() {
  const { addNotification } = useUI();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { doctors, loading, refresh } = useAdminDoctors();

  const handleAdjustAction = async (doctorId, formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await doctorService.update(doctorId, formData);
        addNotification('Protocol Shard Updated', 'Physician shift alignment instructions have been successfully propagated.', 'success');
        setIsModalOpen(false);
        refresh();
        resetForm();
    } catch (err) {
        addNotification('Protocol Sync Failure', 'Could not synchronize physician availability shards.', 'error');
        console.error(err);
    } finally {
        setIsSubmitting(false);
    }
  };

  const openAdjustModal = (doctor = null) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  // 🧪 Helper to determine current operational phase (Simplified clinical logic)
  const getPhase = (doctor) => {
    if (!doctor.is_available) return 'OFFLINE';
    const now = new Date();
    const currentTimeStr = now.toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5); // "14:30"
    
    if (doctor.consultation_start_time && doctor.consultation_end_time) {
        if (currentTimeStr >= doctor.consultation_start_time && currentTimeStr <= doctor.consultation_end_time) {
            return 'ON-DUTY';
        }
        return 'REST-PHASE';
    }
    return 'AVAILABLE';
  };

  const filteredSchedules = doctors.filter(d => 
    (d.user_full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || d.specialization?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || getPhase(d).replace('-', '') === activeTab)
  ).map(d => ({
    ...d,
    phase: getPhase(d),
    shift: d.consultation_start_time ? `${d.consultation_start_time} - ${d.consultation_end_time}` : 'On-Call',
    load: d.is_available ? '45%' : '0%' // Mock load for now, will connect to appt density later
  }));

  const columns = [
    { 
        header: 'Faculty Identity', 
        cell: (s) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-black uppercase text-[10px]">
                    {(s.user_full_name || '??').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{s.user_full_name}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">{s.specialization_display || s.specialization}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Operational Shift',
        cell: (s) => (
            <div className="flex items-center gap-2">
                <Clock size={12} className="text-accent-primary" />
                <span className="text-[11px] font-black text-text-primary dark:text-white uppercase tracking-tight">{s.shift}</span>
            </div>
        )
    },
    { 
        header: 'Network Load',
        cell: (s) => (
            <div className="flex flex-col gap-1.5 w-20">
                <div className="flex justify-between items-center text-[7px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Task Load</span>
                    <span>{s.load}</span>
                </div>
                <div className="w-full h-1 bg-bg-base dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-primary rounded-full transition-all duration-1000" style={{ width: s.load }} />
                </div>
            </div>
        )
    },
    { 
        header: 'Current Phase',
        cell: (s) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${s.phase === 'ON-DUTY' ? 'bg-emerald-500 shadow-emerald-500' : s.phase === 'AVAILABLE' ? 'bg-blue-500 shadow-blue-500' : 'bg-slate-300 shadow-slate-300'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{s.phase}</span>
            </div>
        )
    },
    { 
        header: 'Actions', 
        cell: (s) => (
            <button 
                onClick={() => openAdjustModal(s)}
                className="p-3 rounded-xl bg-bg-base dark:bg-slate-800/40 text-text-secondary hover:text-accent-primary transition-all"
            >
                <MoreHorizontal size={14} />
            </button>
        )
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Availability Matrix" 
        subtitle="Global Physician Shift Alignment Central"
        actions={
            <Button 
                onClick={() => openAdjustModal()}
                className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none"
            >
                Adjust Protocols
            </Button>
        }
      />

      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
            { id: 'ALL', label: 'Global Faculty' },
            { id: 'ONDUTY', label: 'In-Session' },
            { id: 'AVAILABLE', label: 'Rest-Phase / Available' }
        ]}
      />

      <AdminTable 
        columns={columns} 
        data={filteredSchedules} 
        isLoading={loading}
      />

      <AdjustShiftModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleAdjustAction}
        isSubmitting={isSubmitting}
        selectedDoctor={selectedDoctor}
      />
    </div>
  );
}

