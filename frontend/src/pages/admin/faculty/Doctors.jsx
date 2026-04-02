import React, { useState } from 'react';
import { 
  Stethoscope, 
  Search, 
  Calendar, 
  UserPlus, 
  Activity, 
  Award, 
  ShieldCheck,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '../../../components/ui';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';

import AddUserModal from '../../../components/features/admin/AddUserModal';
import UserService from '../../../services/admin/UserService';
import { useUI } from '../../../context/UIContext';

import { useAdminDoctors } from '../../../hooks/admin/useAdminDoctors';
import { useNavigate } from 'react-router-dom';

/**
 * 🧛 Specialist Physician Hub (Doctor Management)
 * Managing medical credentials, specialized cohorts, and scheduling availability.
 */
export default function AdminDoctors() {
  const navigate = useNavigate();
  const { addNotification } = useUI();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { doctors, loading, refresh } = useAdminDoctors();

  const handleAuthorize = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await UserService.create(formData);
        addNotification('Specialist Authorized', 'New physician shard successfully committed to the clinical faculty registry.', 'success');
        setIsModalOpen(false);
        refresh(); 
        resetForm();
    } catch (err) {
        addNotification('Registry Failure', 'Could not propagate physician shard to systems.', 'error');
        console.error(err);
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
        header: 'Specialist Identity', 
        cell: (d) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-black">
                    {(d.user_full_name || '??').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{d.user_full_name}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">DR-{d.id} • {d.experience_years} YRS EXP</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Specialization Matrix',
        cell: (d) => (
            <Badge className="bg-bg-base dark:bg-white/5 text-accent-primary border-none text-[8px] font-black uppercase px-4">
                {d.specialization_display || d.specialization}
            </Badge>
        )
    },
    { 
        header: 'Operational Status',
        cell: (d) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${d.is_available ? 'bg-emerald-500 shadow-emerald-500' : 'bg-amber-500 shadow-amber-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{d.is_available ? 'Available' : 'Away'}</span>
            </div>
        )
    },
    { 
        header: 'Shift Yield', 
        cell: (d) => <div className="flex items-center gap-1.5"><Activity size={12} className="text-blue-500" /> <span className="text-[11px] font-black italic">{d.consultation_fee} USD</span></div>
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
    { title: "Authorized MDs", value: loading ? "..." : doctors.length, icon: Stethoscope, trend: "Sync'd", color: "var(--accent-primary)" },
    { title: "Active Specialties", value: [...new Set(doctors.map(d => d.specialization))].length, icon: Award, trend: "Stable", color: "#10b981" },
    { title: "Clinical Capacity", value: "98.2%", icon: Activity, trend: "Optimal", color: "#6366f1" },
    { title: "Security Protocols", value: "Level 9", icon: ShieldCheck, trend: "Hardened", color: "#f43f5e" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Specialist Physician Hub" 
        subtitle="Global Medical Faculty Registry"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none"
            >
                <Plus size={14} /> Authorize Specialist
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
            { id: 'ALL', label: 'Global Faculty' },
            { id: 'AVAILABLE', label: 'Available Shards' },
            { id: 'OFFLINE', label: 'Away / Shift-End' }
        ]}
      />

      <AdminTable 
        columns={columns} 
        data={filteredDoctors} 
        isLoading={loading}
      />

      <AddUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleAuthorize}
        isSubmitting={isSubmitting}
        initialRole="doctor"
      />
    </div>
  );
}
