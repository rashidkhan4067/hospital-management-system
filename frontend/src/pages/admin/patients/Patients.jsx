import React, { useState } from 'react';
import { 
  Users, 
  UserPlus,
  Heart,
  Activity,
  Eye,
  ShieldPlus,
  Calendar
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard, TableActions } from '../../../components/ui';
import { useNavigate } from 'react-router-dom';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';
import AdminPage from '../../../components/layout/AdminPage';

// 🎣 CLINICAL DATA HOOKS
import { useAdminPatients } from '../../../hooks/admin/useAdminPatients';
import { useAdminStats } from '../../../hooks/admin/useAdminStats';

/**
 * 🩺 Patient Management Module
 */
export default function AdminPatients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  
  const { patients, loading: patientsLoading } = useAdminPatients();
  const { stats: statsSummary, loading: statsLoading } = useAdminStats();

  const loading = patientsLoading || statsLoading;

  const filteredPatients = patients.filter(p => 
    p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id?.toString().includes(searchTerm)
  );

  const columns = [
    { 
        header: 'Patient Profile', 
        cell: (p) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary text-[10px] font-black uppercase">
                    {(p.full_name || '??').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none">{p.full_name || 'Anonymous'}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 tabular-nums">ID: {p.id} • {p.gender || 'N/A'}</p>
                </div>
            </div>
        )
    },
    { header: 'Blood Grp', accessor: 'blood_group', cell: (p) => <Badge className="bg-rose-500/10 text-rose-500 border-none text-[9px] px-3 py-1 font-black uppercase tracking-[0.2em]">{p.blood_group || '??'}</Badge> },
    { header: 'Last Activity', accessor: 'updated_at', cell: (p) => <span className="text-[10px] font-bold text-slate-400 tabular-nums">{new Date(p.updated_at).toLocaleDateString()}</span> },
    { 
        header: 'Health Node',
        accessor: 'is_admitted',
        cell: (p) => (
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${p.is_admitted ? 'bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${p.is_admitted ? 'text-rose-500' : 'text-emerald-500'}`}>{p.is_admitted ? 'Admitted' : 'Normal'}</span>
            </div>
        )
    },
    { header: 'Contact Shard', accessor: 'phone', cell: (p) => <span className="text-[10px] font-black text-slate-500 tracking-[0.1em] tabular-nums">{p.phone}</span> },
    { 
        header: 'Protocol', 
        cell: (p) => (
            <TableActions 
                row={p}
                actions={[
                    { label: 'View Shard', icon: Eye, onClick: (row) => navigate(`/admin/patients/${row.id}`) },
                    { label: 'Live Pulse', icon: Activity, onClick: (row) => navigate(`/admin/patients/${row.id}/appointments`) },
                    { label: 'Book Visit', icon: Calendar, onClick: (row) => navigate(`/admin/appointments/add?patient=${row.id}`) },
                    { label: 'Modify Record', icon: ShieldPlus, onClick: (row) => navigate(`/admin/patients/edit/${row.id}`) },
                ]}
            />
        )
    },
  ];

  const stats = [
    { title: "Total Shards", value: loading ? "..." : statsSummary?.counts?.patients ?? 0, icon: Users, trend: "Live Tracking" },
    { title: "Active Inpatients", value: loading ? "..." : statsSummary?.counts?.active_admissions ?? 0, icon: Heart, trend: "Critical" },
    { title: "New Propagation", value: loading ? "..." : (patients.length > 5 ? 5 : patients.length), icon: UserPlus, trend: "Current" },
    { title: "Network Quality", value: "94.2%", icon: Activity, trend: "Verified" },
  ];

  return (
    <AdminPage>
      <PageHeader 
        title="Patients" 
        subtitle="Manage Clinical Identity Shards"
        actions={
            <Button 
                onClick={() => navigate('/admin/patients/add')}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all"
            >
                <UserPlus size={16} /> Register Identity
            </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      <div className="space-y-10">
        <FilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
                { id: 'ALL', label: 'All Shards' },
                { id: 'STABLE', label: 'Verified Patients' },
                { id: 'RECOVERING', label: 'In Recovery' },
                { id: 'CRITICAL', label: 'Active Inpatients' }
            ]}
        />

        <AdminTable 
            columns={columns} 
            data={filteredPatients} 
            isLoading={loading}
            onRowClick={(p) => navigate(`/admin/patients/${p.id}`)}
        />
      </div>
    </AdminPage>
  );
}
