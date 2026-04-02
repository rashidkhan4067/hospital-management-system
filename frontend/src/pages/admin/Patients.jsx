import React, { useState } from 'react';
import { 
  Users, 
  UserPlus,
  Heart,
  Activity,
  History,
  MoreHorizontal,
  Search
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import AdminTable from '../../components/features/admin/AdminTable';
import FilterBar from '../../components/features/admin/FilterBar';

// 🎣 CLINICAL DATA HOOKS
import { useAdminPatients } from '../../hooks/admin/useAdminPatients';
import { useAdminStats } from '../../hooks/admin/useAdminStats';

/**
 * 🩺 Patient Management Module
 * Standardized high-fidelity interface for patient records.
 */
export default function AdminPatients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  
  const { patients, loading: patientsLoading } = useAdminPatients();
  const { stats: statsSummary, loading: statsLoading } = useAdminStats();

  const loading = patientsLoading || statsLoading;

  // Optimized local filtering (searching only)
  const filteredPatients = patients.filter(p => 
    p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id?.toString().includes(searchTerm)
  );

  const columns = [
    { 
        header: 'Patient Identity', 
        cell: (p) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary text-[10px] font-black uppercase">
                    {(p.full_name || '??').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{p.full_name || 'Anonymous Patient'}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">{p.id} • {p.gender || 'N/A'}</p>
                </div>
            </div>
        )
    },
    { header: 'Blood Grp', accessor: 'blood_group', cell: (p) => <Badge className="bg-rose-500/10 text-rose-500 border-none text-[9px] font-black">{p.blood_group || '??'}</Badge> },
    { header: 'Last Update', accessor: 'updated_at', cell: (p) => new Date(p.updated_at).toLocaleDateString() },
    { 
        header: 'Health Status',
        accessor: 'is_admitted',
        cell: (p) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${p.is_admitted ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{p.is_admitted ? 'Admitted' : 'Outpatient'}</span>
            </div>
        )
    },
    { header: 'Contact', accessor: 'phone' },
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
    { title: "Total Patients", value: loading ? "..." : statsSummary?.counts?.patients ?? 0, icon: Users, trend: "Live", color: "var(--accent-primary)" },
    { title: "Critical Care", value: loading ? "..." : statsSummary?.counts?.active_admissions ?? 0, icon: Heart, trend: "Stable", color: "#f43f5e" },
    { title: "New This Week", value: loading ? "..." : (patients.length > 5 ? 5 : patients.length), icon: UserPlus, trend: "Current", color: "#10b981" },
    { title: "Recovery Rate", value: "94.2%", icon: Activity, trend: "In-Transit", color: "#6366f1" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Patient Care Index" 
        subtitle="Medical Record Propagation Hub"
        actions={
            <Button 
                onClick={() => navigate('/admin/patients/add')}
                className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none"
            >
                <UserPlus size={14} /> New Registration
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
            { id: 'ALL', label: 'All Subjects' },
            { id: 'STABLE', label: 'Stable' },
            { id: 'RECOVERING', label: 'Recovering' },
            { id: 'CRITICAL', label: 'Critical Care' }
        ]}
      />

      <AdminTable 
        columns={columns} 
        data={filteredPatients} 
        isLoading={loading}
        onRowClick={(p) => navigate(`/admin/patients/${p.id}`)}
      />
    </div>
  );
}
