import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
   Calendar, Plus, Clock, UserCheck, AlertCircle, Eye, CheckCircle, XCircle,
   Download, Trash2, Edit3, Mic, Activity
} from 'lucide-react';
import { 
   Badge,
   Button, 
   Card,
   PageHeader,
   TableActions,
   FilterBar 
} from '@/components/primitives';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';

// Feature components
import AppointmentsTable from '@/features/appointments/components/AppointmentsTable';
import AppointmentDrawer from '@/features/appointments/components/AppointmentDrawer';
import UpcomingAppointments from '@/features/appointments/components/UpcomingAppointments';
import SanaVoiceBooking from '@/features/appointments/components/SanaVoiceBooking';
import DoctorAvailability from '@/features/appointments/components/DoctorAvailability';
import ClinicalIntelligenceHub from '@/features/appointments/components/ClinicalIntelligenceHub';

import BookVisitModal from '@/features/appointments/components/BookVisitModal';
import AppointmentService from '@/features/appointments/api/appointmentService';
import { useNotifications } from '@/hooks/useNotifications';
import { useAdminAppointments, useAppointmentOperations } from '@/features/appointments/hooks/useAppointments';
import AdminPage from '@/layouts/AdminPage';


/**
 * 📅 Al Shifaa Advanced Appointments Hub
 * Final High-fidelity, unified diagnostic matrix with Hero CTA.
 */
export default function AppointmentsPage() {
   const { addNotification } = useNotifications();
   const [searchParams, setSearchParams] = useSearchParams();
   const [isModalOpen, setIsModalOpen] = useState(false);

   // URL State Nodes - Single Source of Truth
   const status      = searchParams.get('status') || 'ALL';
   const date        = searchParams.get('date');
   const priority    = searchParams.get('priority');
   const searchTerm  = searchParams.get('q') || '';

   // 📡 Synchronized Server State - Auto-refetch on param change
   const { data, isLoading: loading, error, refetch: refresh } = useAdminAppointments({ 
      status: status === 'ALL' ? undefined : status.toLowerCase(),
      date,
      priority
   });

   const { 
      selectedAppointment, isDrawerOpen, 
      handleStatusUpdate, handleViewDetail, handleCloseDrawer 
   } = useAppointmentOperations(addNotification);

   const appointments = data?.appointments || [];
   const stats = data?.stats || null;

   // Reactive Setters (URL Driven)
   const setSearchTerm = (val) => {
      setSearchParams(prev => {
         if (val) prev.set('q', val); else prev.delete('q');
         return prev;
      }, { replace: true });
   };

   const setActiveTab = (val) => {
      setSearchParams(prev => {
         prev.set('status', val);
         return prev;
      }, { replace: true });
   };

   // ─── Filter Matrix ───
   const filteredAppointments = useMemo(() => {
      return appointments.filter(a => {
         const patientName = a.patient?.full_name || '';
         const doctorName = a.doctor?.full_name || '';
         const apptStatus = a.status?.toUpperCase();
         
         const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                               doctorName.toLowerCase().includes(searchTerm.toLowerCase());
                               
         const matchesTab = status === 'ALL' || 
                            apptStatus === status || 
                            (status === 'SCHEDULED' && apptStatus === 'PENDING');

         return matchesSearch && matchesTab;
      });
   }, [appointments, searchTerm, status]);

   return (
      <AdminPage>
         <div className={`flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20`}>
            
            {/* 🛸 COMMAND HUB: Row 1 — Header */}
            <PageHeader 
               title="Clinical Appointments"
               subtitle="Appointment Hub Synchronized"
               status="Live Schedule"
               actions={
                  <div className="flex items-center gap-2">
                     <Button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-primary/90 hover:scale-105 transition-all shadow-lg shadow-accent-primary/25 border-none"
                     >
                        <Plus size={16} strokeWidth={3} /> Book New
                     </Button>
                  </div>
               }
            />

            {/* 🌠 PERSISTENT GREETING: Row 2 — Hero CTA */}
            <UnifiedHeroCTA 
               compact
               title={<>Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Intelligence.</span></>}
               subtitle="Manage clinical sessions, synchronize practitioner availability, and optimize node allocation across the Al Shifaa matrix."
               pillPrefix="Clinical Appointment Registry"
               pillIcon={Calendar}
               actions={[
                  { title: 'New Visit', subtitle: 'Book Clinical Session', icon: Plus, onClick: () => setIsModalOpen(true) },
                  { title: 'Sana Voice', subtitle: 'AI Audio Booking', icon: Mic, onClick: () => {} }
               ]}
            />

            {/* 🛰 KPI Hub */}
            <UnifiedKpiGrid 
               loading={loading}
               stats={[
                  { title: 'Total Visits', value: stats?.overview?.total || appointments.length, icon: Calendar, trend: '+12.4% Up' },
                  { title: 'Confirmed', value: stats?.overview?.scheduled || appointments.filter(a => a.status === 'scheduled').length, icon: CheckCircle, trend: 'Stable' },
                  { title: 'Pending', value: stats?.overview?.pending || appointments.filter(a => a.status === 'pending').length, icon: AlertCircle, trend: 'Ok' },
                  { title: 'Today Load', value: stats?.overview?.today || 'Nominal', icon: Activity, trend: 'Live' }
               ]}
            />

            {/* 🛰 SESSION DENSITY HUB — Admin Intelligence Shard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <Card className="lg:col-span-2 p-8 rounded-[48px] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2xals relative overflow-hidden flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter leading-none">Global Clinical Volume</h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-60">Synchronized Load per Medical Node</p>
                     </div>
                  </div>
                  <div className="flex items-end gap-3 h-32">
                     {stats?.department_volume?.map((dept, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                           <div 
                              className="w-full bg-accent-primary/20 rounded-t-xl group-hover:bg-accent-primary transition-all relative"
                              style={{ height: `${(dept.count / Math.max(...stats.department_volume.map(d => d.count))) * 100}%` }}
                           >
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black text-accent-primary italic">{dept.count}</div>
                           </div>
                           <span className="text-[7px] font-black uppercase text-slate-400 truncate w-full text-center tracking-tighter">{dept.doctor__specialization}</span>
                        </div>
                     ))}
                     {(!stats?.department_volume || stats.department_volume.length === 0) && (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-slate-300 uppercase italic">Awaiting Telemetry...</div>
                     )}
                  </div>
               </Card>
               <Card className="lg:col-span-1 p-8 rounded-[48px] bg-accent-primary text-white border-none flex flex-col gap-6 shadow-2xl shadow-accent-primary/30 relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-[3s]" />
                  <div className="flex items-center gap-4 relative z-10">
                     <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20">
                        <Activity size={20} />
                     </div>
                     <h4 className="text-[12px] font-black uppercase italic tracking-[0.2em] leading-none">Load Protocol</h4>
                  </div>
                  <div className="space-y-1 relative z-10">
                     <p className="text-3xl font-black italic tracking-tighter leading-none">Optimal</p>
                     <p className="text-[9px] font-bold uppercase opacity-60 tracking-widest mt-1">System throughput is within threshold.</p>
                  </div>
                  <button className="mt-auto w-full bg-slate-900/20 hover:bg-slate-900/40 text-white border-none rounded-2xl py-4 text-[9px] font-black uppercase tracking-widest transition-all relative z-10 italic">
                     Optimize Schedule
                  </button>
               </Card>
            </div>

            {/* 🛰 Master Control Matrix */}
            <div className="w-full">
               <FilterBar 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  activeTab={status}
                  setActiveTab={setActiveTab}
                  placeholder="Search patient, doctor, or ID..."
                  tabs={[
                     { id: 'ALL', label: 'All Global' },
                     { id: 'SCHEDULED', label: 'Confirmed' },
                     { id: 'PENDING', label: 'Pending' },
                     { id: 'CANCELLED', label: 'Cancelled' }
                  ]}
               />
            </div>

            {/* 🛰 Unified Assembly */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
               
               {/* 🏥 CLINICAL OPERATIONS HUB (Left Space) */}
               <div className="lg:col-span-8 flex flex-col gap-5 lg:gap-6">
                  
                  {/* 1. Primary Record Matrix */}

                  <AppointmentsTable 
                     appointments={filteredAppointments} 
                     isLoading={loading}
                     onStatusChange={handleStatusUpdate}
                     onViewDetail={handleViewDetail}
                  />

                  {/* 3. Operational Toolbox */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
                     <div className="lg:col-span-1 p-5 rounded-[2.5rem] bg-accent-primary/10 border border-accent-primary/20 flex flex-col gap-3 group cursor-pointer hover:bg-accent-primary transition-all shadow-xl shadow-accent-primary/10">
                        <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-accent-primary shadow-sm transition-transform group-hover:rotate-12 italic">
                           <Download size={16} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black group-hover:text-white text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Global Export</p>
                           <p className="text-[8px] font-bold text-slate-400 group-hover:text-white/60 uppercase tracking-widest mt-1.5 leading-none">Archives Matrix</p>
                        </div>
                     </div>

                     <div className="lg:col-span-2 p-5 lg:p-6 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-5 group shadow-2als">
                        <div className="flex items-center gap-4">
                           <div className="w-11 h-11 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-sm italic">
                              <Trash2 size={20} />
                           </div>
                           <div className="flex flex-col">
                              <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Bulk Dispatch</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none italic">Synchronize medical entries.</p>
                           </div>
                        </div>
                        <Button className="px-6 py-3.5 rounded-2xl bg-accent-primary text-white text-[10px] font-black uppercase tracking-widest border-none shadow-lg shadow-accent-primary/20">Execute Task</Button>
                     </div>
                  </div>

                  {/* 4. Intelligence Hub */}
                  <ClinicalIntelligenceHub />
               </div>

               {/* 🛰 SIDEBAR INTELLIGENCE CLUSTER (Right Space) */}
               <div className="lg:col-span-4 flex flex-col gap-5 lg:gap-6">
                  <UpcomingAppointments 
                     appointments={appointments} 
                     onCancel={(a) => handleStatusUpdate(a, 'cancelled')} 
                  />
                  
                  <SanaVoiceBooking onStart={() => {}} />

                  <DoctorAvailability />
                  
                  {/* Protocol Notice */}
                  <Card className="p-5 lg:p-6 rounded-[2.5rem] bg-orange-500 text-white flex flex-col gap-4 relative overflow-hidden group shadow-xl shadow-orange-500/10 border-none">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20 shadow-sm">
                           <AlertCircle size={20} className="text-white" strokeWidth={2.5} />
                        </div>
                        <h4 className="text-[12px] font-black uppercase italic tracking-[0.2em] leading-none">Protocol Notice</h4>
                     </div>
                     <p className="text-[10px] font-black italic text-white/90 leading-relaxed uppercase tracking-wide opacity-80">
                        Archive sync 100% efficient. Credentials verified.
                     </p>
                  </Card>
               </div>
            </div>
         </div>

         {/* ─── Layered Intelligence ─── */}
         <BookVisitModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onRefresh={refresh}
         />

         <AppointmentDrawer 
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            appointment={selectedAppointment}
         />
      </AdminPage>
   );
}
