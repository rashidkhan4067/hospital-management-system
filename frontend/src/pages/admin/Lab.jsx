import React, { useState } from 'react';
import { 
  FlaskConical, 
  Plus,
  Search, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  MoreHorizontal,
  FileText
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '../../components/ui';
import AdminTable from '../../components/features/admin/AdminTable';
import FilterBar from '../../components/features/admin/FilterBar';

import { useAdminLab } from '../../hooks/admin/useAdminLab';

/**
 * 🧪 Laboratory Management Hub
 * Real-time clinical test processing and results propagation.
 */
export default function AdminLab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const { tests, results, loading, refresh } = useAdminLab();

  const filteredResults = results.filter(r => 
    (r.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) || r.test_name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || r.status.toUpperCase() === activeTab)
  );

  const columns = [
    { 
        header: 'Analysis Node', 
        cell: (r) => (
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <FlaskConical size={20} />
                </div>
                <div className="flex flex-col">
                    <p className="text-[13px] font-black text-text-primary dark:text-white uppercase leading-none">{r.test_name}</p>
                    <p className="text-[9px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-[0.2em] mt-2">UUID-{r.id}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Patient Hub', 
        cell: (r) => (
            <div className="flex flex-col">
                <span className="text-[12px] font-black text-text-primary dark:text-white/80 uppercase">{r.patient_name}</span>
                <span className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1">Clinical ID: {r.patient}</span>
            </div>
        )
    },
    { 
        header: 'Clinical Lead', 
        cell: (r) => <span className="text-[11px] font-extrabold text-accent-primary uppercase italic">{r.doctor_name || 'System Auto'}</span> 
    },
    { 
        header: 'Status Shard',
        cell: (r) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${r.status === 'completed' ? 'bg-emerald-500 shadow-emerald-500' : r.status === 'processing' ? 'bg-amber-500 shadow-amber-500' : 'bg-rose-500 shadow-rose-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{r.status}</span>
            </div>
        )
    },
    { 
        header: 'Result Hub', 
        cell: (r) => (
            <button className="flex items-center gap-2 text-[9px] font-extrabold text-accent-primary uppercase tracking-widest hover:underline decoration-accent-primary/40 decoration-2 transition-all">
                <FileText size={14} /> {r.status === 'completed' ? 'View Matrix' : 'Tracking...'}
            </button>
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

  const stats = [
    { title: "Network Tests", value: loading ? "..." : results.length, icon: FlaskConical, trend: "Sync'd", color: "var(--accent-primary)" },
    { title: "Completed Reports", value: loading ? "..." : results.filter(r => r.status === 'completed').length, icon: CheckCircle2, trend: "Finalized", color: "#10b981" },
    { title: "Active Samples", value: loading ? "..." : results.filter(r => r.status === 'processing').length, icon: Clock, trend: "Real-time", color: "#6366f1" },
    { title: "Diagnostic Yield", value: "98.8%", icon: Activity, trend: "Stable", color: "#f43f5e" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Lab Analysis Matrix" 
        subtitle="Global Clinical Results Propagation"
        actions={
            <Button className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none">
                <Plus size={14} /> Request Test Shard
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
            { id: 'ALL', label: 'Global Matrix' },
            { id: 'PROCESSING', label: 'In-Lab Sync' },
            { id: 'COMPLETED', label: 'Archived Node' },
            { id: 'PENDING', label: 'Diagnostic Queue' }
        ]}
      />

      <AdminTable 
        columns={columns} 
        data={filteredResults} 
        isLoading={loading}
      />
    </div>
  );
}
