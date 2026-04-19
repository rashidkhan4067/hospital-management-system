import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, User, Stethoscope, AlertCircle, 
  Video, MapPin, Activity, ShieldCheck, ChevronRight,
  Search, UserCheck, CheckCircle2,
  Info, ClipboardList, Target, Hash, Zap, Landmark, ArrowUpRight, Loader2
} from 'lucide-react';
import M3TextField from '@/components/primitives/M3TextField';
import M3Select from '@/components/primitives/M3Select';
import ClinicalLookup from '@/components/primitives/ClinicalLookup';
import api from '@/core/api/apiClient';
import { useModalStore } from '@/core/store/useModalStore';

const APPOINTMENT_TYPES = [
    { value: 'in_person', label: 'In-Person', icon: MapPin },
    { value: 'telehealth', label: 'Virtual', icon: Video },
    { value: 'follow_up', label: 'Follow-up', icon: Calendar }
];

const PRIORITIES = [
    { value: 'routine', label: 'Routine Analysis' },
    { value: 'urgent', label: 'Urgent (STAT)' },
    { value: 'emergency', label: 'Emergency' }
];

const Stepper = ({ currentStep }) => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[0, 1].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 
            ${currentStep >= s ? 'bg-[#0051d9] text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
            {currentStep > s ? <CheckCircle2 size={14} strokeWidth={3} /> : s + 1}
          </div>
          {s === 0 && (
            <div className={`w-10 h-[2px] mx-1.5 rounded-full transition-all duration-300 
              ${currentStep > 0 ? 'bg-[#0051d9]' : 'bg-slate-100'}`} />
          )}
        </div>
      ))}
    </div>
);

const SectionHeader = ({ title }) => (
    <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#0051d9] animate-pulse" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
            {title}
        </span>
    </div>
);

/**
 * 📅 BookAppointmentForm (Clinical Scheduling Node)
 */
export default function BookAppointmentForm({ onFormStateChange, formErrors = {}, initialPatient = null }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [patientFound, setPatientFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [cnicSearch, setCnicSearch] = useState('');

  const [formData, setFormData] = useState({
      patient_id: initialPatient?.id || null,
      patientName: initialPatient?.full_name || '',
      doctor_id: null,
      appointment_type: 'in_person',
      appointment_date: '',
      start_time: '',
      priority: 'routine',
      notes: ''
  });

  useEffect(() => {
      if (initialPatient) {
        setPatientFound(true);
      }
  }, [initialPatient]);

  const handleSearch = async () => {
      if (!cnicSearch || cnicSearch.length < 5) return;
      setLoading(true);
      setHasSearched(false);
      try {
          const { data } = await api.get(`patients/profiles/?search=${cnicSearch}`);
          if (data.results?.length > 0) {
              const p = data.results[0];
              // 💡 Identity mapping: Appointment model expects User ID, not PatientProfile ID
              const userId = p.user || p.user_details?.id || p.id;
              setFormData(prev => ({ ...prev, patient_id: userId, patientName: p.full_name }));
              setPatientFound(true);
          } else {
              setPatientFound(false);
          }
          setHasSearched(true);
      } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDoctorSelect = (d) => setFormData(prev => ({ ...prev, doctor_id: d.id }));

  const isValid = formData.patient_id && formData.doctor_id && formData.appointment_date && formData.start_time;

  useEffect(() => {
    if (onFormStateChange) {
      const apiPayload = {
          patient_id: formData.patient_id,
          doctor_id: formData.doctor_id,
          appointment_date: formData.appointment_date,
          start_time: formData.start_time,
          priority: formData.priority || 'routine',
          appointment_type: formData.appointment_type || 'in_person',
          notes: formData.notes || 'Routine clinical booking.'
      };

      onFormStateChange({
        data: apiPayload,
        isValid: step === 1 && isValid,
        title: "Schedule Appointment",
        subtitle: step === 0 ? "Identity Intake" : "Temporal Allocation",
        submitLabel: step === 0 ? "Verify ID" : "Confirm Booking",
        successMessage: "Appointment scheduled successfully.",
        hideFooter: step === 0
      });
    }
  }, [formData, isValid, step, onFormStateChange]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col p-5 bg-white max-h-[75vh] overflow-y-auto custom-scrollbar"
    >
      {step < 2 && <Stepper currentStep={step} />}

      <AnimatePresence mode="wait">
          {step === 0 ? (
              <motion.div key="b-step-0" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} 
                  className="flex flex-col items-center justify-center text-center space-y-6 py-2"
              >
                  <div className="w-16 h-16 bg-blue-50 text-[#0051d9] rounded-2xl flex items-center justify-center shadow-inner relative">
                    <Calendar size={32} strokeWidth={1.5} />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                       <Search size={12} className="text-slate-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight text-center">Identity Intake</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-[240px] mx-auto text-center leading-relaxed">Search clinical registry or proceed with quick entry</p>
                  </div>

                  <div className="w-full max-w-sm space-y-4">
                     <div className="relative group">
                       <input 
                         type="text"
                         placeholder="XXXXX-XXXXXXX-X"
                         value={cnicSearch}
                         onChange={(e) => setCnicSearch(e.target.value)}
                         className={`w-full h-14 text-center bg-slate-50 border-2 border-transparent focus:bg-white focus:border-[#0051d9]/20 rounded-xl text-lg font-bold text-slate-800 placeholder:text-slate-200 transition-all outline-none`}
                         onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                       />
                       <button 
                         onClick={handleSearch}
                         disabled={loading || cnicSearch.length < 5}
                         className="absolute right-2 top-2 bottom-2 px-5 bg-[#0051d9] text-white rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-md active:scale-95 disabled:opacity-30 transition-all"
                       >
                         {loading ? <Loader2 size={16} className="animate-spin" /> : "Search"}
                       </button>
                     </div>

                     <div className="flex items-center gap-4 py-2">
                        <div className="h-[1px] flex-1 bg-slate-100" />
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Or</span>
                        <div className="h-[1px] flex-1 bg-slate-100" />
                     </div>

                     <button 
                       onClick={() => {
                         const { openModal } = useModalStore.getState();
                         openModal('ADD_PATIENT', {});
                       }}
                       className="w-full py-3.5 bg-white border-2 border-slate-100 hover:border-[#0051d9]/20 hover:bg-blue-50/30 text-[#0051d9] rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
                     >
                       <UserCheck size={16} className="text-[#0051d9]" />
                       Register New Patient
                     </button>
                  </div>

                  <div className="w-full max-w-sm">
                      <AnimatePresence mode="wait">
                        {(hasSearched || initialPatient) && !(patientFound || initialPatient) ? (
                          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center gap-4 mt-4">
                             <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-bold uppercase tracking-widest">
                                <CheckCircle2 size={12} strokeWidth={3} /> Available for registration
                             </div>
                             <div className="w-full text-left space-y-4">
                                 <button onClick={() => {
                                     const { openModal } = useModalStore.getState();
                                     openModal('ADD_PATIENT', {});
                                 }} className="w-full py-3 bg-slate-900 text-white rounded-xl text-[12px] font-bold uppercase tracking-widest shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2">
                                   Start Entry <ChevronRight size={14} />
                                 </button>
                             </div>
                          </motion.div>
                        ) : (hasSearched || initialPatient) && (patientFound || initialPatient) ? (
                          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4 w-full text-left mt-4">
                             <div className="flex items-center gap-2 px-1">
                                <AlertCircle size={14} className="text-amber-600" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600">Existing record found</span>
                             </div>

                             <div className="relative p-5 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
                                <div className="flex flex-col gap-4">
                                   <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 rounded-xl bg-[#0051d9] text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-100">
                                         {formData.patientName.charAt(0).toUpperCase()}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                         <h3 className="text-base font-bold text-slate-800 truncate leading-none mb-1.5">{formData.patientName}</h3>
                                         <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold text-[#0051d9] uppercase tracking-widest bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-1"><Zap size={10} className="animate-pulse"/> Active Link Verified</span>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                             </div>

                             <div className="flex flex-col gap-2 pt-2">
                                <button 
                                  onClick={() => setStep(1)}
                                  className="w-full py-3 bg-slate-900 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md"
                                >
                                  Proceed to Allocation <ArrowUpRight size={16} strokeWidth={2.5} />
                                </button>
                             </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                  </div>
              </motion.div>
          ) : (
              <motion.div key="b-step-1" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Node</span>
                          <span className="text-sm font-bold text-slate-800">{formData.patientName}</span>
                       </div>
                       <button onClick={()=>{setStep(0); setHasSearched(false);}} className="text-[9px] font-bold text-[#0051d9] uppercase tracking-widest bg-blue-50 hover:underline px-3 py-1.5 rounded-lg flex items-center gap-1">Reset</button>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <SectionHeader title="Temporal Matrix" />
                      
                      <div className="grid grid-cols-3 gap-2 mt-2 mb-4">
                          {APPOINTMENT_TYPES.map(opt => (
                              <button 
                                  key={opt.value} onClick={(e) => { e.preventDefault(); setFormData(p=>({...p, appointment_type: opt.value})); }}
                                  className={`h-11 rounded-lg border transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest
                                      ${formData.appointment_type === opt.value ? 'bg-[#0051d9] border-[#0051d9] text-white shadow-md' : 'bg-white border-slate-100 text-slate-400'}`}
                              >
                                  <opt.icon size={14} /> {opt.label}
                              </button>
                          ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <M3TextField 
                          label="Visit Date" 
                          type="date" 
                          name="appointment_date" 
                          icon={Calendar}
                          required 
                          onChange={onChange} 
                          value={formData.appointment_date || ''} 
                          className="h-11 font-bold bg-white"
                        />
                        <M3TextField 
                          label="Visit Time" 
                          type="time" 
                          name="start_time" 
                          icon={Clock}
                          required 
                          onChange={onChange} 
                          value={formData.start_time || ''} 
                          className="h-11 font-bold bg-white"
                        />
                      </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 mb-4">
                      <SectionHeader title="Specialist Allocation" />
                      <ClinicalLookup 
                        label="Assigned Practitioner" 
                        endpoint="doctors/" 
                        icon={Stethoscope}
                        onSelect={handleDoctorSelect} 
                        placeholder="Select lead consultant..." 
                        required 
                        errorText={formErrors.doctor_id}
                        className="h-11 bg-white text-sm"
                      />
                  </div>
              </motion.div>
          )}
      </AnimatePresence>

      {step === 0 && (
          <div className="pt-8 pb-4 opacity-10 flex items-center justify-center gap-2">
              <Landmark size={14} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Institutional Scheduling Shard</span>
          </div>
      )}
    </motion.div>
  );
}
