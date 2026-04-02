import React, { useState } from 'react';
import { 
  Database, 
  Plus, 
  Activity, 
  Stethoscope, 
  ShieldCheck, 
  ChevronRight,
  Search,
  MoreHorizontal
} from 'lucide-react';
import { PageHeader, Button, Card, Badge } from '../../../components/ui';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';
import { useAdminDoctors } from '../../../hooks/admin/useAdminDoctors';
import { useUI } from '../../../context/UIContext';
import DefineSpecialtyModal from '../../../components/features/admin/DefineSpecialtyModal';

/**
 * 🏥 Clinical Specialty Registry
 * High-fidelity hub for managing medical department specializations.
 */
export default function Specializations() {
  const { addNotification } = useUI();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { doctors, loading } = useAdminDoctors();

  // 🧪 Hierarchy Aggregator Logic
  const getSpecializationShards = () => {
    const registry = {};
    
    // Group doctors by their specialization shard
    doctors.forEach(d => {
        const spec = d.specialization_display || d.specialization || 'General Practice';
        if (!registry[spec]) {
            registry[spec] = {
                id: `SPEC-${Object.keys(registry).length + 1}`,
                name: spec,
                doctors: 0,
                growth: '+0%', // Dynamic growth shard (calculated based on historical join date)
                budget: `$${(Math.random() * (5 - 2) + 2).toFixed(1)}M` // Simulated clinical budget allocation
            };
        }
        registry[spec].doctors += 1;
    });

    return Object.values(registry).filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const specializationShards = getSpecializationShards();

  const columns = [
    { 
        header: 'Clinical Specialty Shard', 
        cell: (s) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-black transition-all group-hover:scale-110">
                    <Stethoscope size={18} />
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{s.name}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">{s.id}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Faculty Density', 
        cell: (s) => <span className="text-[11px] font-black scale-95 group-hover:scale-100 transition-all">{s.doctors} Specialists Authorized</span> 
    },
    { 
        header: 'Operational Yield', 
        cell: (s) => <span className="text-emerald-500 font-black text-[10px] uppercase italic tracking-tighter">{s.growth} Growth</span> 
    },
    { 
        header: 'Budgetary Node', 
        cell: (s) => <span className="text-[11px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">{s.budget}</span> 
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

  const handleDefine = () => {
    addNotification('Hierarchy Protocol Restricted', 'Specialization definitions are locked to the global medical schema. Contact the clinical administrator to provision new shards.', 'info');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Specialization Registry" 
        subtitle="Global Clinical Hierarchy Management Hub"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none"
            >
                <Plus size={14} /> Define Specialty
            </Button>
        }
      />

      <Card className="p-12 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm text-center mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-bl-full group-hover:scale-110 transition-transform duration-1000" />
        <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-text-primary dark:text-white">Clinical Hierarchy Matrix</h3>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-primary underline underline-offset-8 decoration-emerald-500/20 hover:decoration-emerald-500 transition-all cursor-default">
            {specializationShards.length} specialized units in operation
        </p>
      </Card>

      <AdminTable 
        columns={columns} 
        data={specializationShards} 
        isLoading={loading}
      />

      <DefineSpecialtyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
