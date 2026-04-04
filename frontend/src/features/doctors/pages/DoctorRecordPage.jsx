import React, { useEffect, useState, useCallback } from 'react';
import { 
  ChevronLeft, Stethoscope, Calendar, Award, Clock, DollarSign, Edit2, 
  Briefcase, Activity, Plus, History, Star, Users
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader, Button, Badge, Card } from '@/shared/components/ui';
import AdminPage from '@/shared/components/layout/AdminPage';
import UnifiedHeroCTA from '@/shared/components/common/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/shared/components/common/UnifiedKpiGrid';

import DoctorService from '@/features/doctors/api/doctorService';
import { useNotifications } from '@/shared/hooks/useNotifications';

// ── Modular Practitioner Shards ──────────────────────────────────────────────
import DoctorProfileCard from '../components/record/DoctorProfileCard';
import DoctorSchedule from '../components/record/DoctorSchedule';
import DoctorHistory from '../components/record/DoctorHistory';

// ── Practitioner Modals ──────────────────────────────────────────────────────
import EditDoctorModal from '../components/record/EditDoctorModal';

const TABS = [
  { id: 'overview',     label: 'Overview',      icon: Activity },
  { id: 'appointments', label: 'Appointments',  icon: Calendar },
  { id: 'schedule',     label: 'Clinical Shard', icon: Clock },
];

export default function DoctorRecord() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addNotification } = useNotifications();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DoctorService.getById(id);
      setDoctor({
          ...data,
          name: data.user?.full_name || data.full_name || 'Anonymous Doctor',
          specialization: (data.specialization_display || data.specialization || 'General Practice').replace(/ (NODE|SHARD)$/i, ''),
          experience: data.experience_years || 0,
          fee: data.consultation_fee || 0,
          status: data.is_available ? 'Available' : 'On Leave',
          email: data.user?.email || data.email || 'doctor@hospital.com',
          phone: data.user?.phone || data.phone || 'No Contact',
          initials: (data.user?.full_name || data.full_name || 'D').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
          schedule: data.schedule || [
            { day: 'Monday', time: '09:00 AM - 05:00 PM', status: 'Active' },
            { day: 'Wednesday', time: '09:00 AM - 05:00 PM', status: 'Active' },
            { day: 'Friday', time: '09:00 AM - 02:00 PM', status: 'Active' },
          ],
          history: data.history || [
            { date: '2026-04-03', patient: 'Ellen Ripley', type: 'Consultation', status: 'Completed' },
            { date: '2026-04-02', patient: 'John Doe',     type: 'Follow-up',    status: 'Completed' },
            { date: '2026-04-01', patient: 'Sarah Connor', type: 'Emergency',    status: 'Completed' },
          ]
      });
    } catch {
      addNotification('Error', 'Failed to load doctor profile.', 'error');
    } finally {
      setLoading(false);
    }
  }, [id, addNotification]);

  useEffect(() => {
    if (id) load();
  }, [id, load]);

  if (loading && !doctor) return <Loading />;
  if (!doctor) return null;

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20">

        {/* ── Row 1: Header ─────────────────────────────────────────────────── */}
        <PageHeader 
          title={doctor.name}
          subtitle={`${doctor.specialization} · ID #${id}`}
          status="Clinical Practitioner"
          actions={
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => navigate('/admin/doctors')}
                className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-white/5 text-slate-500 dark:text-white/60 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm"
              >
                <ChevronLeft size={14} /> Back to Registry
              </Button>
              <Button 
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/25 border-none hover:brightness-110 transition-all italic"
              >
                <Edit2 size={14} /> Edit Identity
              </Button>
            </div>
          }
        />

        {/* ── Row 2: Hero CTA ───────────────────────────────────────────────── */}
        <UnifiedHeroCTA 
          compact
          title={<>Dr. {doctor.name.split(' ').pop()}'s <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Clinical Identity.</span></>}
          subtitle={`${doctor.specialization} · Lead Practitioner with ${doctor.experience} years of clinical logic established within the hospital hub.`}
          pillPrefix="Practitioner Profile"
          pillIcon={Briefcase}
          actions={[
            { title: 'Update Schedule', subtitle: 'Calibrate Rotation', icon: Clock, onClick: () => {} },
            { title: 'View Analytics',   subtitle: 'Efficiency Matrix',  icon: Activity, onClick: () => {} },
          ]}
        />

        {/* ── Row 3: KPI Matrix ─────────────────────────────────────────────── */}
        <UnifiedKpiGrid
           items={[
              { label: 'Total Patients', value: '1,240', icon: Users, color: 'text-accent-primary' },
              { label: 'Avg Rating',    value: '4.9/5', icon: Star, color: 'text-amber-500' },
              { label: 'Completion',    value: '98%',   icon: CheckCircle2, color: 'text-emerald-500' },
              { label: 'Efficiency',    value: 'Nominal', icon: Activity, color: 'text-sky-500' }
           ]}
           className="mb-2"
        />

        {/* ── Row 4: Main 4-col + 8-col Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* LEFT — Identity Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <DoctorProfileCard 
               doctor={doctor} 
               id={id} 
               initials={doctor.initials} 
               onEdit={() => setIsEditModalOpen(true)} 
            />
            <DoctorSchedule schedule={doctor.schedule} />
          </div>

          {/* RIGHT — Practitioner Content (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            
            {/* Tab Bar */}
            <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/[0.06] p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar">
              {TABS.map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                      active
                        ? 'bg-accent-primary text-white shadow-md shadow-accent-primary/30'
                        : 'text-slate-400 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-white/70'
                    }`}
                  >
                    <Icon size={13} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Panel */}
            <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/[0.06] p-8 lg:p-10 min-h-[500px] relative overflow-hidden">
               <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex justify-between items-center mb-10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-[1.2rem] bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                           {TABS.find(t => t.id === activeTab).icon && React.createElement(TABS.find(t => t.id === activeTab).icon, { size: 22 })}
                        </div>
                        <div>
                           <h3 className="text-[18px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic">
                              Practitioner {activeTab} Hub
                           </h3>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Established Professional Log Matrix</p>
                        </div>
                     </div>
                  </div>

                  <div className="mt-8">
                     {activeTab === 'overview' && <DoctorHistory history={doctor.history} />}
                     {activeTab === 'appointments' && <DoctorHistory history={doctor.history} />}
                     {activeTab === 'schedule' && <DoctorSchedule schedule={doctor.schedule} />}
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Practitioner Modals ── */}
      <EditDoctorModal 
         isOpen={isEditModalOpen} 
         onClose={() => setIsEditModalOpen(false)} 
         doctorId={id} 
         initialData={doctor} 
         onRefresh={load} 
      />

    </AdminPage>
  );
}

function Loading() {
  return (
    <AdminPage>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-[1.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-accent-primary animate-spin shadow-inner">
             <Stethoscope size={24} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/30 italic">
            Synchronizing Practitioner Record...
          </p>
        </div>
      </div>
    </AdminPage>
  );
}

function CheckCircle2(props) {
   return (
     <svg
       {...props}
       xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
     >
       <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
       <path d="m9 12 2 2 4-4" />
     </svg>
   )
 }
