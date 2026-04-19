import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Beaker, Activity, ShieldCheck, Microscope,
  User, AlertCircle, Clock, Search,
  Zap, Info, UserCheck, FlaskConical, TestTube,
  FileText, UserPlus
} from 'lucide-react';
import M3TextField from '@/components/primitives/M3TextField';
import M3Select from '@/components/primitives/M3Select';
import ClinicalLookup from '@/components/primitives/ClinicalLookup';
import api from '@/core/api/apiClient';
import { useModalStore } from '@/core/store/useModalStore';

const LAB_PRIORITIES = [
  { value: 'routine', label: 'Routine Analysis' },
  { value: 'urgent', label: 'Urgent (STAT)' },
  { value: 'critical', label: 'Critical / ALERT' }
];

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-4 my-6 px-1">
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">
      {title}
    </span>
    <div className="h-[1px] w-full bg-slate-100" />
  </div>
);

export default function LabOrderForm({ onFormStateChange, formErrors = {} }) {
  const [formData, setFormData] = useState({
    patient: null,
    test: null,
    doctor: null,
    priority: 'routine',
    clinical_notes: ''
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const openModal = useModalStore(state => state.openModal);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePatientSelect = (p) => {
    setSelectedPatient(p);
    setFormData(prev => ({ ...prev, patient: p.id }));
  };

  const handleTestSelect = (t) => {
    setSelectedTest(t);
    setFormData(prev => ({ ...prev, test: t.id }));
  };

  const isValid = formData.patient && formData.test && formData.doctor;

  useEffect(() => {
    if (onFormStateChange) {
      onFormStateChange({
        data: formData,
        isValid,
        title: "Lab Requisition",
        subtitle: "DIAGNOSTIC TEST REQUISITION · CLINICAL LAB",
        submitLabel: "Create Lab Order",
        successMessage: "Laboratory order successfully requisitioned."
      });
    }
  }, [formData, isValid, onFormStateChange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col p-4 bg-white max-h-[75vh] overflow-y-auto custom-scrollbar"
    >
      <SectionHeader title="Patient Identity" />

      <div className="px-1">
        <ClinicalLookup
          label=""
          icon={Search}
          endpoint="patients/profiles/"
          onSelect={handlePatientSelect}
          placeholder="Search Patient by Name, MRN, or ID..."
          className="bg-slate-50 border-slate-100 rounded-xl"
        />

        <AnimatePresence mode="wait">
          {selectedPatient && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-6 relative pl-6 pr-4 py-5 bg-white border border-slate-100 rounded-[20px] shadow-sm overflow-hidden"
            >
              <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#0051d9] rounded-r-full" />
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0051d9] flex items-center justify-center text-xl font-black shrink-0">
                  {selectedPatient.full_name?.charAt(0).toUpperCase()}
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-4 flex-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</span>
                    <span className="text-sm font-bold text-slate-800 uppercase tracking-tight">{selectedPatient.full_name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">MRN Number</span>
                    <span className="text-sm font-bold text-[#0051d9]">#{selectedPatient.mrn}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SectionHeader title="Diagnostic Shard" />

      <div className="grid grid-cols-2 gap-6 px-1">
        <ClinicalLookup
          label="Diagnostic Test *"
          icon={TestTube}
          endpoint="lab/tests/"
          onSelect={handleTestSelect}
          placeholder="Search CBC, Lipid, glucose..."
          required
        />

        <ClinicalLookup
          label="Referring Physician *"
          icon={UserCheck}
          endpoint="doctors/"
          onSelect={(d) => setFormData(prev => ({ ...prev, doctor: d.id }))}
          placeholder="Search Physician..."
          required
        />
      </div>

      <AnimatePresence mode="wait">
        {selectedTest && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 px-5 py-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap size={16} className="text-emerald-600" />
              <span className="text-[11px] font-black uppercase text-emerald-800">{selectedTest.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-emerald-600 uppercase">Estimated Turnaround</span>
                <span className="text-[10px] font-bold text-emerald-900">{selectedTest.turnaround_time}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 space-y-6 px-1">
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Requisition Priority</span>
          <div className="flex gap-3">
            {LAB_PRIORITIES.map(p => (
              <button
                key={p.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, priority: p.value }))}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-2 
                     ${formData.priority === p.value
                    ? 'bg-blue-50 border-blue-200 text-[#0051d9] shadow-sm'
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
              >
                <ShieldCheck size={14} strokeWidth={2.5} /> {p.label}
              </button>
            ))}
          </div>
        </div>

        <M3TextField
          label="Clinical Indications / Notes"
          placeholder="Special instructions or symptoms..."
          name="clinical_notes"
          icon={FileText}
          multiline
          rows={2}
          onChange={onChange}
          value={formData.clinical_notes || ''}
          fullWidth
        />
      </div>

      <div className="h-6" />
    </motion.div>
  );
}
