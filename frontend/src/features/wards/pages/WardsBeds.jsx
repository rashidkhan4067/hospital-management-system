import React, { useState, useMemo } from 'react';
import { 
   LayoutGrid, Plus, FileText, UserPlus, Activity, 
   BedIcon, Hospital, Users, Lock, ShieldCheck,
   Filter, ArrowRightLeft, Mic, AlertCircle, Map
} from 'lucide-react';
import { 
   Badge, Button, Card, PageHeader, FilterBar 
} from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';

// Advanced Ward Shards
import WardCard from '../components/WardCard';
import AdmittedPatientShard from '../components/AdmittedPatientShard';
import WardSidebar from '../components/WardSidebar';
import { WARD_TYPES } from '../constants/wardConstants';
import { useWards } from '../hooks/useWards';

// Modals
import WardModal from '../components/WardModal';
import BedModal from '../components/BedModal';
import AdmissionModal from '../components/AdmissionModal';
import TransferModal from '../components/TransferModal';

/**
 * 🏥 WARD & BED MANAGEMENT HUB
 * High-fidelity clinical node orchestration with real-time occupancy telemetry.
 */
export default function WardsBeds() {
   const { 
      overview, by_type, ward_matrix, admissions, 
      loading, error, refresh 
   } = useWards();

   const [activeTab, setActiveTab] = useState('ALL');
   const [searchTerm, setSearchTerm] = useState('');

   // Modal States
   const [isWardModalOpen, setIsWardModalOpen] = useState(false);
   const [isBedModalOpen, setIsBedModalOpen] = useState(false);
   const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
   const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
   const [selectedAdmission, setSelectedAdmission] = useState(null);

   // ─── Computational Logic ───
   const filteredWards = useMemo(() => {
      return (ward_matrix || []).filter(w => {
         const matchesTab = activeTab === 'ALL' || w.type?.toUpperCase() === activeTab;
         const matchesSearch = w.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               w.code?.toLowerCase().includes(searchTerm.toLowerCase());
         return matchesTab && matchesSearch;
      });
   }, [ward_matrix, activeTab, searchTerm]);

   // Handlers
   const handleTransferInitiation = (admission) => {
      setSelectedAdmission(admission);
      setIsTransferModalOpen(true);
   };

   return (
      <AdminPage>
         <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20">
            
            {/* 🛸 COMMAND HUB: Row 1 — Header */}
            <PageHeader 
               title="Ward & Bed Hub"
               subtitle={`${ward_matrix?.length || 0} Wards Active • Floor Registry Synchronized`}
               status="Live Registry"
               actions={
                  <div className="flex items-center gap-2">
                     <Button 
                        className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 text-slate-700 dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-white/10 hover:border-slate-300 transition-all shadow-sm italic"
                     >
                        <FileText size={14} className="text-accent-primary" /> Reports
                     </Button>
                     <Button 
                        onClick={() => setIsAdmissionModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/25 border-none hover:brightness-110 transition-all font-display italic"
                     >
                        <UserPlus size={14} strokeWidth={3} /> Admit Patient
                     </Button>
                  </div>
               }
            />

            {/* 🌠 PERSISTENT HUB: Row 2 — High-Fidelity Hero CTA */}
            <UnifiedHeroCTA 
               compact
               title={<>Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Spatial Node.</span></>}
               subtitle="Orchestrate clinical ward shards, manage bed allocation matrix, and optimize spatial utilization across Al Shifaa facility."
               pillPrefix="Hospital Spatial Registry"
               pillIcon={Hospital}
               actions={[
                  { title: 'Admit Patient', subtitle: 'Spatial Allocation', icon: UserPlus, onClick: () => setIsAdmissionModalOpen(true), variant: 'primary' },
                  { title: 'Initialize Ward', subtitle: 'Deployment Node', icon: Plus, onClick: () => setIsWardModalOpen(true) },
               ]}
            />

            {/* 🛰 KPI & ANALYTICS Hub */}
            <UnifiedKpiGrid 
               loading={loading}
               stats={[
                  { title: 'Total Beds',    value: overview?.total_beds || '...', icon: BedIcon, trend: `Across ${ward_matrix?.length || 0} Wards`, color: 'text-indigo-500' },
                  { title: 'Occupied',      value: overview?.occupied || '...',    icon: Activity, trend: `${overview?.occupancy_rate || 0}% Rate`, color: 'text-rose-500' },
                  { title: 'Available',     value: overview?.available || '...',   icon: ShieldCheck, trend: 'Ready for Admission', color: 'text-emerald-500' },
                  { title: 'ICU Beds',       value: overview?.icu_stats || '...', icon: Lock, trend: 'Critical Care Nodes', color: 'text-violet-500' }
               ]}
            />

            {/* 🛰 Master Control Matrix */}
            <div className="w-full">
               <FilterBar 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  placeholder="Filter by ward name, code, or department..."
                  tabs={WARD_TYPES}
               />
            </div>

            {/* 🏗 UNIFIED ASSEMBLY: Row 4 (8:4 Split) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
               
               {/* 🏥 CLINICAL OPERATIONS HUB (Left Space) */}
               <div className="lg:col-span-8 flex flex-col gap-8 lg:gap-10">
                  
                  {/* Primary Ward Grid */}
                  {filteredWards.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                         {filteredWards.map((ward, idx) => (
                             <WardCard key={idx} ward={ward} />
                         ))}
                      </div>
                  ) : (
                      <div className="p-20 text-center bg-white/50 dark:bg-slate-900/10 rounded-[3rem] border border-dashed border-slate-200 dark:border-white/5 shadow-inner">
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic leading-none">No active ward nodes matching criteria.</p>
                      </div>
                  )}

                  {/* High-density Admission Matrix */}
                  <div className="bg-white/40 dark:bg-slate-900/5 backdrop-blur-3xl rounded-[3rem] border border-slate-200/50 dark:border-white/5 p-4 lg:p-6 shadow-2xl overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
                      <AdmittedPatientShard 
                        admissions={admissions} 
                        onTransfer={handleTransferInitiation}
                      />
                  </div>
               </div>

               {/* 🛰 SIDEBAR INTELLIGENCE CLUSTER (Right Space) */}
               <div className="lg:col-span-4 h-full relative">
                  <WardSidebar 
                     byType={by_type} 
                     onAdmit={() => setIsAdmissionModalOpen(true)}
                     onTransfer={() => {
                        if (admissions?.length > 0) {
                           handleTransferInitiation(admissions[0]);
                        } else {
                           alert('No active admissions found for migration.');
                        }
                     }}
                  />
               </div>

            </div>
         </div>

         {/* 🏗 MODAL INITIALIZATION */}
         <WardModal 
            isOpen={isWardModalOpen} 
            onClose={() => setIsWardModalOpen(false)} 
            onSave={(data) => { console.log('Saving Ward:', data); refresh(); }} 
         />
         
         <BedModal 
            isOpen={isBedModalOpen} 
            onClose={() => setIsBedModalOpen(false)} 
            wards={ward_matrix || []}
            onSave={(data) => { console.log('Saving Bed:', data); refresh(); }} 
         />

         <AdmissionModal 
            isOpen={isAdmissionModalOpen} 
            onClose={() => setIsAdmissionModalOpen(false)} 
            wards={ward_matrix || []}
            patients={[]} 
            onAdmit={(data) => { console.log('Admitting Patient:', data); refresh(); }} 
         />

         <TransferModal 
            isOpen={isTransferModalOpen}
            onClose={() => setIsTransferModalOpen(false)}
            admission={selectedAdmission}
            wards={ward_matrix || []}
            onTransfer={(data) => { console.log('Transferring:', data); refresh(); }}
         />
      </AdminPage>
   );
}
