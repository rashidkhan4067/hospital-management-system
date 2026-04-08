import React, { useEffect, useState, useCallback } from 'react';
import {
  ChevronLeft, Plus, Edit2, Activity, Calendar, FileText,
  ClipboardList, Pill, Stethoscope, Upload, Users, Heart,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, PageHeader, Badge, Card } from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';

import patientService from '@/features/patients/api/patientService';
import { useNotifications } from '@/hooks/useNotifications';

// ── Modular EMR Shards ───────────────────────────────────────────────────────
import PatientProfileCard from '../components/emr/PatientProfileCard';
import PatientVitals from '../components/emr/PatientVitals';
import MedicalHistory from '../components/emr/MedicalHistory';
import CurrentMedications from '../components/emr/CurrentMedications';
import AppointmentHistory from '../components/emr/AppointmentHistory';
import ClinicalNotes from '../components/emr/ClinicalNotes';
import PatientDocuments from '../components/emr/PatientDocuments';

// ── Clinical Modals ──────────────────────────────────────────────────────────
import AddClinicalNoteModal from '../components/emr/modals/AddClinicalNoteModal';
import VitalsUpdateModal from '../components/emr/modals/VitalsUpdateModal';
import UploadReportModal from '../components/emr/modals/UploadReportModal';
import AddPrescriptionModal from '../components/emr/modals/AddPrescriptionModal';
import EditPatientModal from '../components/emr/modals/EditPatientModal';

const TABS = [
  { id: 'overview',      label: 'Overview',    icon: Activity },
  { id: 'appointments',  label: 'Appointments', icon: Calendar },
  { id: 'prescriptions', label: 'Medications',  icon: Pill },
  { id: 'notes',         label: 'Notes',        icon: ClipboardList },
  { id: 'documents',     label: 'Documents',    icon: FileText },
];

export default function PatientRecord() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addNotification } = useNotifications();

  const [patient, setPatient]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [activeTab, setActiveTab]   = useState('overview');

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await patientService.getPatientDetail(id);
      const name = (data.user?.full_name || data.full_name || 'Unknown Patient').replace(/ (NODE|SHARD)$/i, '');
      setPatient({
        ...data,
        name,
        age:       data.age || '—',
        gender:    data.gender || 'N/A',
        bloodType: data.blood_group || 'N/A',
        phone:     data.phone || data.user?.phone || '—',
        email:     data.user?.email || data.email || '—',
        address:   data.address || '—',
        lastVitals: { bpm: '72', bp: '120/80', temp: '36.6', weight: '70', height: '175' },
      });
    } catch {
      addNotification('Error', 'Failed to load patient record.', 'error');
    } finally {
      setLoading(false);
    }
  }, [id, addNotification]);

  useEffect(() => {
    if (id) load();
  }, [id, load]);

  if (loading && !patient) return <Loading />;
  if (!patient) return null;

  const initials = patient.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const statusLabel = patient.is_admitted ? 'Admitted' : 'Outpatient';

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20">

        {/* ── Row 1: Header ─────────────────────────────────────────────────── */}
        <PageHeader
          title={patient.name}
          subtitle={`Patient ID #${id} · ${statusLabel}`}
          status="Clinical Record"
          actions={
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate('/admin/patients')}
                className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-white/5 text-slate-500 dark:text-white/60 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all"
              >
                <ChevronLeft size={14} /> Registry
              </Button>
              <Button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/25 border-none hover:brightness-110 transition-all"
              >
                <Edit2 size={14} /> Edit Identity
              </Button>
            </div>
          }
        />

        {/* ── Row 2: Hero CTA ───────────────────────────────────────────────── */}
        <UnifiedHeroCTA
          compact
          title={<>{patient.name.split(' ')[0]}'s <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Clinical Record.</span></>}
          subtitle={`${statusLabel} · Blood: ${patient.bloodType} · Age: ${patient.age} · Last updated record synchronized across all clinical nodes.`}
          pillPrefix="EMR — Electronic Medical Record"
          pillIcon={Stethoscope}
          actions={[
            { title: 'New Note', subtitle: 'Observe Shard', icon: ClipboardList, onClick: () => setIsNoteModalOpen(true) },
            { title: 'Upload Document', subtitle: 'Lab Reports, Scans', icon: Upload, onClick: () => setIsReportModalOpen(true) },
          ]}
        />

        {/* ── Row 3: Main 4-col + 8-col Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* LEFT — Identity Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <PatientProfileCard 
               patient={patient} 
               id={id} 
               initials={initials} 
               onEdit={() => setIsEditModalOpen(true)} 
            />
            <PatientVitals 
               vitals={patient.lastVitals} 
               onUpdate={() => setIsVitalsModalOpen(true)} 
            />
          </div>

          {/* RIGHT — EMR Content (8 cols) */}
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

            {/* Tab Content Panel with Buttons for Modals */}
            <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/[0.06] p-8 lg:p-10 min-h-[500px] relative overflow-hidden">
               <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex justify-between items-center mb-10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-[1.2rem] bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                           {TABS.find(t => t.id === activeTab).icon && React.createElement(TABS.find(t => t.id === activeTab).icon, { size: 22 })}
                        </div>
                        <div>
                           <h3 className="text-[18px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic">
                              Clinical {activeTab} Hub
                           </h3>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Established Diagnostic Shard Matrix</p>
                        </div>
                     </div>

                     {/* Action Buttons based on Tab */}
                     {activeTab === 'prescriptions' && (
                        <Button onClick={() => setIsPrescriptionModalOpen(true)} className="bg-accent-primary text-white rounded-xl px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] border-none shadow-lg shadow-accent-primary/20 hover:scale-105 transition-all italic">
                           <Plus size={14} className="mr-2" /> New Protocol
                        </Button>
                     )}
                     {activeTab === 'notes' && (
                        <Button onClick={() => setIsNoteModalOpen(true)} className="bg-accent-primary text-white rounded-xl px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] border-none shadow-lg shadow-accent-primary/20 hover:scale-105 transition-all italic">
                           <Plus size={14} className="mr-2" /> Establish Shard
                        </Button>
                     )}
                     {activeTab === 'documents' && (
                        <Button onClick={() => setIsReportModalOpen(true)} className="bg-accent-primary text-white rounded-xl px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] border-none shadow-lg shadow-accent-primary/20 hover:scale-105 transition-all italic">
                           <Upload size={14} className="mr-2" /> Diagnostic Uplink
                        </Button>
                     )}
                  </div>

                  <div className="mt-8">
                     {activeTab === 'overview' && (
                     <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <MedicalHistory />
                        <CurrentMedications medications={patient.medications} onAdd={() => setIsPrescriptionModalOpen(true)} />
                     </div>
                     )}
                     {activeTab === 'appointments'  && <AppointmentHistory history={patient.history} />}
                     {activeTab === 'prescriptions' && <CurrentMedications medications={patient.medications} onAdd={() => setIsPrescriptionModalOpen(true)} />}
                     {activeTab === 'notes'         && <ClinicalNotes />}
                     {activeTab === 'documents'     && <PatientDocuments />}
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── All Required Modals ── */}
      <EditPatientModal 
         isOpen={isEditModalOpen} 
         onClose={() => setIsEditModalOpen(false)} 
         patientId={id} 
         initialData={patient} 
         onRefresh={load} 
      />
      <VitalsUpdateModal 
         isOpen={isVitalsModalOpen} 
         onClose={() => setIsVitalsModalOpen(false)} 
         currentVitals={patient.lastVitals} 
         onRefresh={load} 
      />
      <AddClinicalNoteModal 
         isOpen={isNoteModalOpen} 
         onClose={() => setIsNoteModalOpen(false)} 
         onRefresh={load} 
      />
      <UploadReportModal 
         isOpen={isReportModalOpen} 
         onClose={() => setIsReportModalOpen(false)} 
         onRefresh={load} 
      />
      <AddPrescriptionModal 
         isOpen={isPrescriptionModalOpen} 
         onClose={() => setIsPrescriptionModalOpen(false)} 
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
             <Activity size={24} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/30 italic">
            Synchronizing Clinical Hub...
          </p>
        </div>
      </div>
    </AdminPage>
  );
}
