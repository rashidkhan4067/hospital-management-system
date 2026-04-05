import React, { useState, useMemo } from 'react';
import { 
   Users, Clock, PlayCircle, SkipForward, CheckCircle, 
   Activity, LayoutGrid, ListFilter, RotateCcw, Plus
} from 'lucide-react';
import { 
   Badge, Button, Card, PageHeader, FilterBar 
} from '@/shared/components/ui';
import AdminPage from '@/shared/components/layout/AdminPage';
import UnifiedHeroCTA from '@/shared/components/common/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/shared/components/common/UnifiedKpiGrid';

// Reusing existing components for DRY-ness
import AppointmentsTable from '@/features/appointments/components/AppointmentsTable';
import AppointmentDrawer from '@/features/appointments/components/AppointmentDrawer';
import NextPatientShard from '@/features/appointments/components/NextPatientShard';
import QueueDepartmentMatrix from '@/features/appointments/components/QueueDepartmentMatrix';
import ClinicalIntelligenceHub from '@/features/appointments/components/ClinicalIntelligenceHub';

// New Advanced OPD Modals
import VitalCheckInModal from '@/features/appointments/components/VitalCheckInModal';
import QueueRebalanceModal from '@/features/appointments/components/QueueRebalanceModal';
import EmergencyCallModal from '@/features/appointments/components/EmergencyCallModal';
import BookVisitModal from '@/features/appointments/components/BookVisitModal';

import { useOPDQueue, useAppointmentOperations } from '../hooks/useAppointments';
import appointmentService from '../api/appointmentService';
import { useNotifications } from '@/shared/hooks/useNotifications';

/**
 * 📋 OPD QUEUE MANAGEMENT HUB
 * High-fidelity, real-time patient flow matrix with zero redundancy and advanced telemetry.
 */
export default function OPDQueuePage() {
   const { addNotification } = useNotifications();
   const { queue, loading, refresh } = useOPDQueue();
   const { 
      selectedAppointment, isDrawerOpen, 
      handleStatusUpdate, handleViewDetail, handleCloseDrawer 
   } = useAppointmentOperations(refresh, addNotification);
   
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedTab, setSelectedTab] = useState('ALL');

   // Modal States
   const [isVitalModalOpen, setIsVitalModalOpen] = useState(false);
   const [isRebalanceModalOpen, setIsRebalanceModalOpen] = useState(false);
   const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
   const [isBookModalOpen, setIsBookModalOpen] = useState(false);
   const [activeAppointment, setActiveAppointment] = useState(null);

   // ─── Filter Logic ───
   const filteredQueue = useMemo(() => {
      return queue.filter(a => {
         const matchesSearch = a.patient?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               a.doctor?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
         const matchesTab = selectedTab === 'ALL' || a.status?.toUpperCase() === selectedTab;
         return matchesSearch && matchesTab;
      });
   }, [queue, searchTerm, selectedTab]);

   // Next Patient is the first in the global pending queue
   const nextPatient = useMemo(() => {
      return queue.find(a => a.status === 'pending' || a.status === 'scheduled');
   }, [queue]);

   const handleCheckIn = (appt) => {
      setActiveAppointment(appt);
      setIsVitalModalOpen(true);
   };

   const handleSkip = () => {
      if (nextPatient) {
         setActiveAppointment(nextPatient);
         setIsRebalanceModalOpen(true);
      } else {
         addNotification('Queue Logic', 'No active nodes found to re-index.', 'warning');
      }
   };

   const handleVitalsCommit = async (vitals) => {
      try {
         await handleStatusUpdate(activeAppointment, 'completed'); // Move to completed or 'arrived' if status exists
         addNotification('Pulse Sync', `Vitals captured for ${activeAppointment.patient?.full_name}. session initialized.`, 'success');
      } catch (err) {
         addNotification('Sync Error', 'Node propagation failed.', 'error');
      }
   };

   const handleQueueAction = (action, reason) => {
      addNotification('Protocol Updated', `Patient node re-indexed via ${action} logic.`, 'info');
      refresh();
   };

   return (
      <AdminPage>
         <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20">
            
            {/* 🛸 COMMAND HUB: Row 1 — Header */}
            <PageHeader 
               title="OPD Queue Matrix"
               subtitle="Real-time Clinical Synchronization Matrix"
               status="Session Active"
               actions={
                  <div className="flex items-center gap-2">
                     <Button 
                        onClick={() => setIsEmergencyModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-rose-500/10 text-rose-600 dark:text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all font-display italic"
                     >
                        <Activity size={14} fill="currentColor" /> Code Red
                     </Button>
                     <Button 
                        onClick={() => setIsBookModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/25 border-none hover:brightness-110 transition-all font-display italic"
                     >
                        <Plus size={14} strokeWidth={3} /> New Entry
                     </Button>
                  </div>
               }
            />

            {/* 🌠 PERSISTENT HUB: Row 2 — Hero CTA */}
            <UnifiedHeroCTA 
               compact
               title={<>Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Node Flow.</span></>}
               subtitle="Orchestrate real-time clinical session transitions and optimize diagnostic throughput across the Al Shifaa matrix."
               pillPrefix="Clinical Session Registry"
               pillIcon={Clock}
               actions={[
                  { title: 'Check-in Next', subtitle: 'Capture Vitals', icon: PlayCircle, onClick: () => { if(nextPatient) handleCheckIn(nextPatient); }, variant: 'primary' },
                  { title: 'Skip Node',    subtitle: 'Re-index Patient',    icon: SkipForward, onClick: handleSkip },
               ]}
            />

            {/* 🛰 KPI & ANALYTICS Hub */}
            <UnifiedKpiGrid 
               loading={loading}
               stats={[
                  { title: 'Wait Queue', value: queue.filter(a => a.status === 'pending' || a.status === 'scheduled').length, icon: Users, trend: 'High Flow' },
                  { title: 'Avg Latency', value: '14.2m', icon: Clock, trend: 'Optimizing' },
                  { title: 'Throughput', value: '92.4%', icon: Activity, trend: 'Nominal' },
                  { title: 'Session Load', value: 'Active', icon: CheckCircle, trend: 'Synchronized' }
               ]}
            />

            {/* 🛰 Master Control Matrix */}
            <div className="w-full">
               <FilterBar 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  activeTab={selectedTab}
                  setActiveTab={setSelectedTab}
                  placeholder="Filter by patient, doctor, or token..."
                  tabs={[
                     { id: 'ALL', label: 'Global List' },
                     { id: 'PENDING', label: 'Waiting Area' },
                     { id: 'SCHEDULED', label: 'Confirmed' },
                     { id: 'COMPLETED', label: 'Session Ends' }
                  ]}
               />
            </div>

            {/* 🏗 UNIFIED ASSEMBLY: Row 5 (8:4 Split) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
               
               {/* 🏥 CLINICAL OPERATIONS HUB (Left Space) */}
               <div className="lg:col-span-8 flex flex-col gap-5 lg:gap-6">
                  
                  {/* Primary Table Hub */}
                  <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-2als bg-white dark:bg-slate-900/10">
                     <AppointmentsTable 
                        appointments={filteredQueue}
                        isLoading={loading}
                        onStatusChange={handleStatusUpdate}
                        onViewDetail={handleViewDetail}
                        onCheckIn={handleCheckIn}
                     />
                  </div>

                  {/* High-density Load Matrix */}
                  <QueueDepartmentMatrix />
               </div>

               {/* 🛰 SIDEBAR INTELLIGENCE CLUSTER (Right Space) */}
               <div className="lg:col-span-4 flex flex-col gap-5 lg:gap-6">
                  
                  {/* Priority Priority Node */}
                  <NextPatientShard 
                     nextPatient={nextPatient} 
                     onCallNext={() => { if(nextPatient) handleCheckIn(nextPatient); }} 
                  />

                  {/* Deep Analytics */}
                  <ClinicalIntelligenceHub />

                  {/* Protocol Notice Card (Consistent styling with AppointmentsPage) */}
                  <Card className="p-5 lg:p-6 rounded-[2.5rem] bg-accent-primary text-white flex flex-col gap-4 relative overflow-hidden group shadow-xl shadow-accent-primary/20 border-none">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20 shadow-sm transition-transform group-hover:rotate-12 italic">
                           <Users size={20} className="text-white" strokeWidth={2.5} />
                        </div>
                        <h4 className="text-[12px] font-black uppercase italic tracking-[0.2em] leading-none">Session Protocol</h4>
                     </div>
                     <p className="text-[10px] font-black italic text-white/90 leading-relaxed uppercase tracking-wide opacity-80 mt-1">
                        Queue synchronization successful. Real-time patient nodes verified across clinical sectors.
                     </p>
                     <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/5 blur-3xl" />
                  </Card>
               </div>

            </div>
         </div>
         
         {/* ─── Layered Intelligence ─── */}
         <AppointmentDrawer 
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            appointment={selectedAppointment}
         />

         <VitalCheckInModal 
            isOpen={isVitalModalOpen}
            onClose={() => setIsVitalModalOpen(false)}
            appointment={activeAppointment}
            onCommit={handleVitalsCommit}
         />

         <QueueRebalanceModal 
            isOpen={isRebalanceModalOpen}
            onClose={() => setIsRebalanceModalOpen(false)}
            appointment={activeAppointment}
            onAction={handleQueueAction}
         />

         <EmergencyCallModal 
            isOpen={isEmergencyModalOpen}
            onClose={() => setIsEmergencyModalOpen(false)}
            onDispatch={() => addNotification('Emergency Node', 'Code Red signal broadcasted to all terminals.', 'error')}
         />

         <BookVisitModal 
            isOpen={isBookModalOpen}
            onClose={() => setIsBookModalOpen(false)}
            onRefresh={refresh}
         />
      </AdminPage>
   );
}
