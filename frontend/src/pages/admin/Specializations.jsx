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
import { PageHeader, Button, Card, Badge } from '../../components/ui';
import AdminTable from '../../components/features/admin/AdminTable';
import FilterBar from '../../components/features/admin/FilterBar';

/**
 * 🏥 Clinical Specialty Registry
 * High-fidelity hub for managing medical department specializations.
 */
export default function Specializations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const specializations = [
    { id: 'SPEC-01', name: 'Cardiology', doctors: '42', units: '04', growth: '+12%', budget: '$2.4M' },
    { id: 'SPEC-02', name: 'Neurology', doctors: '24', units: '02', growth: '+5%', budget: '$1.8M' },
    { id: 'SPEC-03', name: 'Oncology', doctors: '36', units: '03', growth: '+18%', budget: '$3.2M' },
    { id: 'SPEC-04', name: 'Emergency-Med', doctors: '68', units: '06', growth: '+22%', budget: '$4.5M' },
    { id: 'SPEC-05', name: 'Diagnostics', doctors: '18', units: '02', growth: '+8%', budget: '$1.2M' },
  ].filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { 
        header: 'Clinical Specialty Shard', 
        cell: (s) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-black">
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
        header: 'Faculty Count', 
        cell: (s) => <span className="text-[11px] font-black">{s.doctors} Specialists</span> 
    },
    { 
        header: 'Net Growth', 
        cell: (s) => <span className="text-emerald-500 font-black text-[10px] uppercase italic">{s.growth}</span> 
    },
    { 
        header: 'Budgetary Node', 
        cell: (s) => <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{s.budget}</span> 
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
        title="Specialization Registry" 
        subtitle="Global Clinical Hierarchy Management Hub"
        actions={
            <Button className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none">
                <Plus size={14} /> Define Specialty
            </Button>
        }
      />

      <Card className="p-12 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm text-center mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-bl-full" />
        <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Total Clinical Range</h3>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-primary underline decoration-emerald-500/0 hover:decoration-emerald-500 transition-all cursor-default">48 Specialist Units Active</p>
      </Card>

      <AdminTable columns={columns} data={specializations} />
    </div>
  );
}
