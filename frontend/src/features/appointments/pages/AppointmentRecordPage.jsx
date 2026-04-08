import React, { useEffect, useState, useCallback } from 'react';
import { 
  ChevronLeft, Calendar, Clock, User, Stethoscope, 
  MapPin, Edit2, CheckCircle2, History, Zap, 
  FileText, Activity, Users, Video
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader, Button, Badge, Card } from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';

// ── Modular Appointment Shards ──────────────────────────────────────────────
import AppointmentSummaryCard from '../components/record/AppointmentSummaryCard';
import AppointmentTimeline from '../components/record/AppointmentTimeline';

// ── Hooks & Services ────────────────────────────────────────────────────────
import appointmentService from '@/features/appointments/api/appointmentService';
import { useNotifications } from '@/hooks/useNotifications';

/**
 * 🛰 Appointment Record Page
 * High-fidelity clinical hub for individual appointment orchestration.
 * Implements the 4:8 split command center design system check mapping.
 */
export default function AppointmentRecordPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addNotifications } = useNotifications();
  
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧪 Mock Load Logic for Parity
  const loadAppointment = useCallback(async () => {
    try {
      setLoading(true);
      // Simulating API propagation
      setTimeout(() => {
          setAppointment({
              id: id,
              doctor_name: 'Dr. Sarah Connor',
              patient_name: 'Ellen Ripley',
              patient_id: 'PAT-8821',
              date: '2026-04-10',
              time: '14:30',
              status: 'CONFIRMED',
              type: 'Clinical Consultation',
              department: 'Neurology Shard',
              room: 'Node 402',
              notes: 'Patient reports recurring neural dissonance in the parietal lobe matrix. Protocol update required.',
              logs: [
                  { time: '14:30', event: 'Appointment Shard Synchronized', status: 'Success' },
                  { time: '10:00', event: 'Inception of Clinical Node', status: 'Initialized' },
              ]
          });
          setLoading(false);
      }, 600);
    } catch {
      // addNotifications('Error', 'Failed to synchronize appointment shard.', 'error');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadAppointment();
  }, [id, loadAppointment]);

  if (loading && !appointment) return <Loading />;
  if (!appointment) return null;

  const kpis = [
      { title: 'Date Matrix', value: appointment.date, icon: Calendar, color: 'text-accent-primary' },
      { title: 'Time Shard',   value: appointment.time, icon: Clock, color: 'text-accent-secondary' },
      { title: 'Node Status',  value: appointment.status, icon: CheckCircle2, color: 'text-emerald-500' },
      { title: 'Clinical Hub', value: appointment.department, icon: Stethoscope, color: 'text-indigo-500' }
  ];

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000">

        {/* 🛸 COMMAND CLUSTER: Row 1 — Header */}
        <PageHeader 
          title={`APPT-ID #${id}`}
          subtitle={`${appointment.type} Matrix · Synchronized Node`}
          status="Appointment Telemetry"
          actions={<AppointmentHeaderActions onBack={() => navigate('/admin/appointments')} />}
        />

        {/* 🌠 PERSISTENT HUB: Row 2 — Hero CTA */}
        <UnifiedHeroCTA 
          compact
          title={<>Appointment Shard <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Registry.</span></>}
          pillPrefix="Clinical Orchestration"
          pillIcon={Calendar}
          subtitle={`This clinical node is scheduled for ${appointment.date} at ${appointment.time}. Status represents absolute parity in the neurology hub matrix.`}
          actions={[
             { title: 'Change Status', subtitle: 'Update Shard', icon: CheckCircle2, onClick: () => {} },
             { title: 'Reschedule',    subtitle: 'Temporal Shift', icon: Clock, onClick: () => {} },
             { title: 'Abort Shard',   subtitle: 'Delete Node', icon: History, variant: 'danger', onClick: () => {} },
          ]}
        />

        {/* 🛰 KPI GRID */}
        <UnifiedKpiGrid stats={kpis} loading={loading} />

        {/* 🏗 CLUSTER ASSEMBLY: 4:8 Modular Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
           
           {/* LEFT - Participant Matrix (4 cols) */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              <AppointmentSummaryCard appointment={appointment} />
              
              <Card className="p-8 rounded-[2.5rem] bg-indigo-600 dark:bg-indigo-900/40 text-white flex flex-col gap-6 relative overflow-hidden group shadow-2als border-none">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full pointer-events-none" />
                 <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12 italic">
                       <Video size={18} />
                    </div>
                    <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display">Telemedical Shard</h4>
                 </div>
                 <p className="text-[10px] font-black italic text-indigo-50/60 leading-relaxed uppercase tracking-wide opacity-80 relative z-10">
                    Neural sync stable. Provider node ready for digital diagnostic propagation.
                 </p>
                 <Button className="w-full bg-white text-indigo-600 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-none transition-all hover:scale-[1.02] active:scale-95 italic">
                    Establish Video Link
                 </Button>
              </Card>
           </div>

           {/* RIGHT - Content Hub (8 cols) */}
           <div className="lg:col-span-8 flex flex-col gap-6">
              <AppointmentTimeline logs={appointment.logs} />
              
              <Card className="p-10 rounded-[3rem] bg-white dark:bg-white/[0.03] space-y-8 border border-slate-200 dark:border-white/5 relative overflow-hidden group">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/10 shadow-inner italic">
                       <FileText size={20} />
                    </div>
                    <h4 className="text-[14px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic font-display">Clinical Notes Shard</h4>
                 </div>
                 <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 relative">
                    <p className="text-[11px] font-black text-slate-600 dark:text-slate-300 leading-relaxed italic uppercase tracking-wide opacity-80">
                        {appointment.notes}
                    </p>
                 </div>
                 <div className="flex items-center gap-4 relative z-10 pt-4 border-t border-slate-100 dark:border-white/5">
                    <Button className="bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-white/40 border-none px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all font-display italic">
                       <Edit2 size={12} className="mr-2" /> Modify Narrative
                    </Button>
                 </div>
              </Card>
           </div>

        </div>
      </div>
    </AdminPage>
  );
}

/** 🛸 UI SUB-COMPONENT: Header Actions */
function AppointmentHeaderActions({ onBack }) {
    return (
        <div className="flex items-center gap-2">
            <Button 
                onClick={onBack}
                className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-white/5 text-slate-500 dark:text-white/60 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm font-display italic"
            >
                <ChevronLeft size={14} /> Global Registry
            </Button>
            <Button 
                className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/25 border-none hover:brightness-110 transition-all font-display italic"
            >
                <Edit2 size={14} /> Recalibrate Node
            </Button>
        </div>
    );
}

function Loading() {
    return (
        <AdminPage>
            <div className="flex items-center justify-center min-h-[70vh]">
                <div className="flex flex-col items-center gap-5">
                    <div className="w-14 h-14 rounded-[1.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-accent-primary animate-spin shadow-inner">
                        <Zap size={24} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/30 italic font-display">
                        Synchronizing Appointment Node...
                    </p>
                </div>
            </div>
        </AdminPage>
    );
}
