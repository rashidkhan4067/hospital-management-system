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
import { PageHeader, Button, Card, Badge } from '../../components/ui';
import AdminTable from '../../components/features/admin/AdminTable';
import FilterBar from '../../components/features/admin/FilterBar';

/**
 * 📅 Specialist Availability Matrix (Doctor Schedule)
 * Clean, data-driven console for managing physician shift protocols.
 */
export default function DoctorSchedule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const schedules = [
    { id: 'SCH-4421', doctor: 'Dr. Sarah Smith', specialty: 'Cardiology', shift: '08:00 - 16:00', status: 'On-Duty', load: '85%' },
    { id: 'SCH-1102', doctor: 'Dr. Bruce Wayne', specialty: 'Neurology', shift: '12:00 - 20:00', status: 'On-Duty', load: '40%' },
    { id: 'SCH-2947', doctor: 'Dr. Ellen Ripley', specialty: 'General-OPD', shift: '20:00 - 04:00', status: 'Rest-Phase', load: '0%' },
    { id: 'SCH-9921', doctor: 'Dr. Rick Deckard', specialty: 'Diagnostics', shift: '08:00 - 16:00', status: 'On-Duty', load: '95%' },
    { id: 'SCH-8821', doctor: 'Dr. Roy Batty', specialty: 'Replication', shift: 'On-Call', status: 'Available', load: '10%' },
  ].filter(s => 
    (s.doctor.toLowerCase().includes(searchTerm.toLowerCase()) || s.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || s.status.toUpperCase().replace('-', '') === activeTab)
  );

  const columns = [
    { 
        header: 'Faculty Identity', 
        cell: (s) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary font-black uppercase text-[10px]">
                    {s.doctor.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{s.doctor}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">{s.specialty}</p>
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
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${s.status === 'On-Duty' ? 'bg-emerald-500 shadow-emerald-500' : s.status === 'Available' ? 'bg-blue-500 shadow-blue-500' : 'bg-slate-300 shadow-slate-300'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{s.status}</span>
            </div>
        )
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

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Availability Matrix" 
        subtitle="Global Physician Shift Alignment Central"
        actions={
            <Button className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none">
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

      <AdminTable columns={columns} data={schedules} />
    </div>
  );
}
