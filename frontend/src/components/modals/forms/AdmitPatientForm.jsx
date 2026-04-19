import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Clock, Search, Calendar, User, 
  MapPin, Stethoscope, ShieldCheck, CheckCircle2,
  ChevronRight, Info, Building2, Bed, AlertCircle,
  CreditCard, ClipboardList, UserCheck, DoorOpen, Zap, Landmark, ArrowUpRight, Loader2
} from 'lucide-react';
import api from '@/core/api/apiClient';
import M3TextField from '@/components/primitives/M3TextField';
import M3Select from '@/components/primitives/M3Select';
import ClinicalLookup from '@/components/primitives/ClinicalLookup';
import { useModalStore } from '@/core/store/useModalStore';

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

export default function AdmitPatientForm({ onFormStateChange, initialPatient, formErrors = {} }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [patientFound, setPatientFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [cnicSearch, setCnicSearch] = useState('');

  const [formData, setFormData] = useState({
    patient: initialPatient?.id || null,
    patientName: initialPatient?.full_name || '',
    admission_date: new Date().toISOString().slice(0, 16),
    source: 'outpatient',
    ward: '',
    room: '',
    bed: '',
    primary_diagnosis: '',
    admitted_by: '',
    severity: 'mild',
    clinical_notes: '',
    is_emergency: false
  });

  const [wards, setWards] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);

  useEffect(() => {
    if (initialPatient) {
      setPatientFound(true);
    }
    // Fetch base clinical nodes
    api.get('wards/wards/').then(res => {
      const data = res.data?.results || res.data;
      setWards(Array.isArray(data) ? data : []);
    });
  }, [initialPatient]);

  // Reactive Hierarchy: Ward -> Room -> Bed
  useEffect(() => {
    if (formData.ward) {
      api.get(`wards/rooms/?ward_id=${formData.ward}`).then(res => {
        const data = res.data?.results || res.data;
        setRooms(Array.isArray(data) ? data : []);
      });
    } else { setRooms([]); updateField('room', ''); updateField('bed', ''); }
  }, [formData.ward]);

  useEffect(() => {
    if (formData.room) {
      api.get(`wards/beds/?room_id=${formData.room}&status=available`).then(res => {
        const data = res.data?.results || res.data;
        setBeds(Array.isArray(data) ? data : []);
      });
    } else { setBeds([]); updateField('bed', ''); }
  }, [formData.room]);

  const handleSearch = async () => {
      if (!cnicSearch || cnicSearch.length < 5) return;
      setLoading(true);
      setHasSearched(false);
      try {
          const { data } = await api.get(`patients/profiles/?search=${cnicSearch}`);
          if (data.results?.length > 0) {
              const p = data.results[0];
              setFormData(prev => ({ ...prev, patient: p.id, patientName: p.full_name }));
              setPatientFound(true);
          } else {
              setPatientFound(false);
          }
          setHasSearched(true);
      } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const updateField = (name, value) => setFormData(prev => ({ ...prev, [name]: value }));
  const handleDoctorSelect = (doctor) => updateField('admitted_by', doctor.id);

  const isValid = formData.patient && formData.ward && 
                  formData.room && formData.bed && formData.primary_diagnosis && formData.admitted_by;

  useEffect(() => {
    if (onFormStateChange) {
      onFormStateChange({
        data: formData,
        isValid: step === 1 && isValid,
        title: "Patient Admission",
        subtitle: step === 0 ? "Identity Intake" : "Resource Allotment",
        submitLabel: step === 0 ? "Verify ID" : "Admit Patient",
        successMessage: "Patient admitted to inward facility.",
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
              <motion.div key="a-step-0" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} 
                  className="flex flex-col items-center justify-center text-center space-y-6 py-2"
              >
                  <div className="w-16 h-16 bg-blue-50 text-[#0051d9] rounded-2xl flex items-center justify-center shadow-inner relative">
                    <Activity size={32} strokeWidth={1.5} />
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
                                  Proceed to Matrix <ArrowUpRight size={16} strokeWidth={2.5} />
                                </button>
                             </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                  </div>
              </motion.div>
          ) : (
              <motion.div key="a-step-1" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Node</span>
                          <span className="text-sm font-bold text-slate-800">{formData.patientName}</span>
                       </div>
                       <button onClick={()=>{setStep(0); setHasSearched(false);}} className="text-[9px] font-bold text-[#0051d9] uppercase tracking-widest bg-blue-50 hover:underline px-3 py-1.5 rounded-lg flex items-center gap-1">Reset</button>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <SectionHeader title="Clinical Matrix" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <M3TextField 
                          label="Admission Time" 
                          type="datetime-local" 
                          name="admission_date" 
                          icon={Clock}
                          onChange={(e) => updateField('admission_date', e.target.value)} 
                          value={formData.admission_date || ''} 
                          required 
                          className="w-full bg-white h-11"
                        />
                        <ClinicalLookup 
                          label="Lead Physician" 
                          endpoint="doctors/" 
                          icon={UserCheck}
                          onSelect={handleDoctorSelect} 
                          placeholder="Select lead consultant..." 
                          required 
                          className="bg-white h-11"
                        />
                      </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <SectionHeader title="Resource Allocation" />
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-2">
                        <div className="md:col-span-5">
                          <M3Select 
                              label="Ward"
                              icon={Building2}
                              options={wards?.map(w => ({ 
                                value: w.id || '', 
                                label: w.name || `Ward ${w.id || 'N/A'}` 
                              })) || []}
                              value={formData.ward || ''}
                              onChange={(e) => updateField('ward', e.target.value)}
                              placeholder={wards.length === 0 ? "Scanning Matrix..." : "Select Ward"}
                              required
                              className="bg-white h-11"
                          />
                        </div>
                        <div className="md:col-span-4">
                           <M3Select 
                              label="Room"
                              icon={DoorOpen}
                              options={rooms?.map(r => ({ 
                                value: r.id || '', 
                                label: `Room ${r.room_number || r.id || 'N/A'}` 
                              })) || []}
                              value={formData.room || ''}
                              onChange={(e) => updateField('room', e.target.value)}
                              disabled={!formData.ward}
                              placeholder={formData.ward ? (rooms.length === 0 ? "No Rooms" : "Room") : "Select Ward First"}
                              required
                              className="bg-white h-11"
                           />
                        </div>
                        <div className="md:col-span-3">
                           <M3Select 
                              label="Bed"
                              icon={Bed}
                              options={beds?.map(b => ({ 
                                value: b.id || '', 
                                label: `Bed ${b.bed_number || b.id || 'N/A'}` 
                              })) || []}
                              value={formData.bed || ''}
                              onChange={(e) => updateField('bed', e.target.value)}
                              disabled={!formData.room}
                              placeholder={formData.room ? (beds.length === 0 ? "No Beds" : "Bed") : "Slot"}
                              required
                              className="bg-white h-11"
                           />
                        </div>
                      </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl mb-4">
                      <SectionHeader title="Clinical Context" />
                      <M3TextField 
                          label="Primary Diagnosis" 
                          placeholder="Document clinical reason for intake..." 
                          name="primary_diagnosis" 
                          icon={Stethoscope}
                          onChange={(e) => updateField('primary_diagnosis', e.target.value)} 
                          value={formData.primary_diagnosis || ''} 
                          fullWidth 
                          required
                          className="bg-white h-11 mt-2"
                      />
                  </div>
              </motion.div>
          )}
      </AnimatePresence>

      {step === 0 && (
          <div className="pt-8 pb-4 opacity-10 flex items-center justify-center gap-2">
              <Landmark size={14} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Institutional Medical Shard</span>
          </div>
      )}
    </motion.div>
  );
}
