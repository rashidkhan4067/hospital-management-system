import React, { useState, useMemo } from 'react';
import { 
   UserPlus, Search, FileText, Filter, Calendar, 
   Activity, CheckCircle, Clock, ArrowRightLeft,
   User, Database, ShieldCheck, Hospital, Plus
} from 'lucide-react';
import { 
   Badge, Button, Card, PageHeader, FilterBar, AdminTable 
} from '@/shared/components/ui';
import AdminPage from '@/shared/components/layout/AdminPage';
import UnifiedHeroCTA from '@/shared/components/common/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/shared/components/common/UnifiedKpiGrid';
import { useWards } from '../hooks/useWards';
import { ADMISSION_STATUS } from '../constants/wardConstants';
import AdmissionModal from '../components/AdmissionModal';

/**
 * 🏥 ADMISSIONS COMMAND CENTER
 * Central node for managing all patient spatial records and clinical intake history.
 * Designed for maximum consistency with the Al Shifaa administrative design system.
 */
export default function AdmissionsPage() {
   const { admissions, loading, refresh } = useWards();
   const [searchTerm, setSearchTerm] = useState('');
   const [statusTab, setStatusTab] = useState('ALL');
   const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);

   // ─── Computational Logic ───
   const filteredAdmissions = useMemo(() => {
      return (admissions || []).filter(a => {
         const matchesSearch = a.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               a.patient_id?.toLowerCase().includes(searchTerm.toLowerCase());
         const matchesStatus = statusTab === 'ALL' || a.status === statusTab;
         return matchesSearch && matchesStatus;
      });
   }, [admissions, searchTerm, statusTab]);

   const columns = [
      {
         header: 'Patient Shard',
         key: 'patient',
         render: (row) => (
             <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-white/10 italic">
                     <User size={20} />
                 </div>
                 <div className="flex flex-col">
                     <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase italic leading-none">{row.patient_name}</span>
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {row.patient_id}</span>
                 </div>
             </div>
         )
      },
      {
         header: 'Spatial Position',
         key: 'position',
         render: (row) => (
             <div className="flex flex-col">
                 <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase italic leading-none">{row.ward_name}</span>
                 <Badge className="w-fit bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-black mt-1 px-2 py-0.5 rounded-md italic">Bed {row.bed_number}</Badge>
             </div>
         )
      },
      {
         header: 'Intake Temporal',
         key: 'admitted_at',
         render: (row) => (
             <div className="flex items-center gap-2">
                 <Clock size={12} className="text-slate-400" />
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter italic">
                     {new Date(row.admitted_at).toLocaleDateString()} • {new Date(row.admitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </span>
             </div>
         )
      },
      {
         header: 'Node Status',
         key: 'status',
         render: (row) => {
             const statusMap = {
                 'ACTIVE': { bg: 'bg-emerald-500/10', text: 'text-emerald-500', label: 'Active Node' },
                 'DISCHARGED': { bg: 'bg-slate-500/10', text: 'text-slate-500', label: 'Historical' },
                 'TRANSFERRED': { bg: 'bg-indigo-500/10', text: 'text-indigo-500', label: 'Migrated' }
             };
             const s = statusMap[row.status] || statusMap.DISCHARGED;
             return (
                 <Badge className={`px-4 py-1.5 rounded-full border-none text-[9px] font-black uppercase italic ${s.bg} ${s.text}`}>
                     {s.label}
                 </Badge>
             );
         }
      },
      {
         header: 'Operational Actions',
         key: 'actions',
         render: (row) => (
             <div className="flex items-center gap-2">
                 <Button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-accent-primary p-0 border-none transition-transform hover:scale-110">
                     <FileText size={14} />
                 </Button>
                 {row.status === 'ACTIVE' && (
                     <Button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-indigo-500 p-0 border-none transition-transform hover:scale-110">
                         <ArrowRightLeft size={14} />
                     </Button>
                 )}
             </div>
         )
      }
   ];

   const stats = [
      { title: 'Active Admissions', value: (admissions || []).filter(a => a.status === 'ACTIVE').length, icon: Activity, color: 'text-emerald-500' },
      { title: 'Temporal Intake', value: (admissions || []).filter(a => new Date(a.admitted_at).toDateString() === new Date().toDateString()).length, icon: Clock, color: 'text-indigo-500', trend: 'Nodes Today' },
      { title: 'Total Clinical Records', value: (admissions || []).length, icon: Database, color: 'text-slate-500' }
   ];

   return (
      <AdminPage>
         <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20">
            
            {/* 🛸 COMMAND HUB: Row 1 — Header */}
            <PageHeader 
               title="Admission Command"
               subtitle="Clinical Spatial Records • Patient Node History"
               status="Live Database"
               actions={
                  <Button 
                    onClick={() => setIsAdmissionModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/25 border-none hover:brightness-110 transition-all font-display italic"
                  >
                     <UserPlus size={14} strokeWidth={3} /> Process Intake
                  </Button>
               }
            />

            {/* 🌠 PERSISTENT HUB: Row 2 — Unified Hero CTA */}
            <UnifiedHeroCTA 
               compact
               title={<>Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Intake Hub.</span></>}
               subtitle="Register patient clinical nodes, manage spatial propagation protocols, and synchronize historical intake matrices across Al Shifaa."
               pillPrefix="Admission Registry"
               pillIcon={Hospital}
               actions={[
                  { title: 'Process Intake', subtitle: 'Spatial Allocation', icon: Plus, onClick: () => setIsAdmissionModalOpen(true), variant: 'primary' },
                  { title: 'Audit Records', subtitle: 'Telemetry Logs', icon: FileText, onClick: () => {} },
               ]}
            />

            {/* 🛰 KPI & ANALYTICS Hub */}
            <UnifiedKpiGrid stats={stats} loading={loading} />

            {/* 🛰 Master Control Matrix */}
            <div className="w-full">
               <FilterBar 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  activeTab={statusTab}
                  setActiveTab={setStatusTab}
                  tabs={ADMISSION_STATUS}
                  placeholder="Search by patient name, ID, or spatial node..."
               />
            </div>

            {/* 🗃 MASTER RECORDS TABLE */}
            <Card className="rounded-[3rem] p-4 bg-white/40 dark:bg-slate-900/5 backdrop-blur-3xl border border-slate-200/50 dark:border-white/5 overflow-hidden shadow-2als relative">
               <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
               <AdminTable 
                  columns={columns}
                  data={filteredAdmissions}
                  isLoading={loading}
               />
            </Card>
         </div>

         {/* 🏗 MODAL INITIALIZATION */}
         <AdmissionModal 
            isOpen={isAdmissionModalOpen}
            onClose={() => setIsAdmissionModalOpen(false)}
            onAdmit={(data) => { console.log('Admitting:', data); refresh(); }}
            wards={[]} // TODO: Fetch wards
         />
      </AdminPage>
   );
}
