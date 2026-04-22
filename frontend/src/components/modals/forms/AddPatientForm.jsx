import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Phone, User, Fingerprint, Heart, 
  MapPin, Users, Lock, 
  ChevronRight, Search, Activity, Mail, Calendar, 
  ArrowLeft, CheckCircle2, AlertCircle, Info, Landmark,
  TrendingUp, Clock, UserCheck, Eye, ArrowUpRight
} from 'lucide-react';
import api from '@/core/api/apiClient';
import M3TextField from '@/components/primitives/M3TextField';
import M3Select from '@/components/primitives/M3Select';
import { useModalStore } from '@/core/store/useModalStore';

const BLOOD_GROUPS = [
  { value: "A+", label: "A+" }, { value: "A-", label: "A-" },
  { value: "B+", label: "B+" }, { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" }, { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" }, { value: "O-", label: "O-" }
];

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
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

export default function AddPatientForm({ onFormStateChange, formErrors = {}, initialName = '' }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: initialName && isNaN(initialName.charAt(0)) ? initialName : '',
    cnic: initialName && !isNaN(initialName.charAt(0)) ? initialName : '',
    date_of_birth: '',
    age: '',
    gender: '',
    blood_group: '',
    email: '',
    phone_number: '',
    password: '',
    address: '',
    privacy_consent: false
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { closeModal } = useModalStore();

  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    if (name === 'fullName' && value && !/^[a-zA-Z\s]{3,50}$/.test(value)) {
      error = 'Name must be 3-50 letters only.';
    }
    if (name === 'cnic' && value && !/^\d{5}-\d{7}-\d{1}$/.test(value) && !/^\d{13}$/.test(value)) {
      error = 'ID must be 13 digits (XXXXX-XXXXXXX-X).';
    }
    if (name === 'phone_number' && value && !/^\+?\d{10,15}$/.test(value)) {
      error = 'Enter a valid clinical contact number.';
    }
    setValidationErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleDobChange = (e) => {
    const dob = e.target.value;
    const { name, value } = e.target;
    let age = '';
    if (dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    }
    setFormData(prev => ({ ...prev, [name]: value, age: Math.max(0, age) }));
  };

  const handleIdentityVerify = async (term) => {
    const searchTarget = term || formData.cnic || formData.fullName;
    const cleanedSearch = searchTarget?.replace(/-/g, '') || '';
    if (cleanedSearch.length < 2) return;
    
    setIsSearching(true);
    setHasSearched(false);
    try {
      const { data } = await api.get(`patients/profiles/?search=${cleanedSearch}`);
      const results = data.results || [];
      setSearchResults(results);
      setHasSearched(true);
      
      // ⚡ Strategic Optimization: If unique match found, stay on Step 0 but show result clearly
      // If no match found and we're in "Register" mode, we could auto-advance but it's safer to show "Available"
    } catch (err) { 
      console.error("Identity verification failure", err); 
    } finally { 
      setIsSearching(false); 
    }
  };

  useEffect(() => {
    if (initialName) {
      handleIdentityVerify(initialName);
    }
  }, [initialName]);

  const onSearchClick = () => handleIdentityVerify();

  const isValid = step === 1 && formData.fullName && formData.cnic && formData.email && 
                  formData.phone_number && formData.password && formData.privacy_consent &&
                  !Object.values(validationErrors).some(err => !!err);

  useEffect(() => {
    if (onFormStateChange) {
      onFormStateChange({
        data: formData,
        isValid,
        title: "Patient Registration",
        subtitle: step === 0 ? "Identity Verification" : "Profile Creation",
        submitLabel: step === 0 ? "Verify ID" : "Register Patient",
        successMessage: "Patient successfully onboarded.",
        hideFooter: step === 0
      });
    }
  }, [formData, isValid, step, hasSearched, searchResults, onFormStateChange, validationErrors]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getStatusColor = (patient) => {
    if (patient.is_admitted) return 'bg-indigo-100 text-indigo-700';
    return 'bg-emerald-100 text-emerald-700';
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col p-5 bg-white max-h-[75vh] overflow-y-auto custom-scrollbar"
    >
      <Stepper currentStep={step} />

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div 
            key="step-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex flex-col items-center justify-center text-center space-y-6 py-2"
          >
            <div className="w-16 h-16 bg-blue-50 text-[#0051d9] rounded-2xl flex items-center justify-center shadow-inner relative">
              <Fingerprint size={32} strokeWidth={1.5} />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                 <Search size={12} className="text-slate-400" />
              </div>
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight text-center">Identity Intake</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-[240px] mx-auto text-center leading-relaxed">Search clinical registry or proceed with new record</p>
            </div>

            <div className="w-full max-w-sm space-y-4">
               <div className="relative group">
                 <input 
                   type="text"
                   name="cnic"
                   placeholder="XXXXX-XXXXXXX-X"
                   value={formData.cnic || ''}
                   onChange={onChange}
                   className={`w-full h-14 text-center bg-slate-50 border-2 focus:bg-white rounded-xl text-lg font-bold text-slate-800 placeholder:text-slate-200 transition-all outline-none
                     ${validationErrors.cnic ? 'border-red-100' : 'border-transparent focus:border-[#0051d9]/20'}`}
                   onKeyDown={(e) => e.key === 'Enter' && handleIdentityVerify()}
                 />
                 <button 
                   onClick={() => handleIdentityVerify()}
                   disabled={isSearching || (formData.cnic?.length || 0) < 2}
                   className="absolute right-2 top-2 bottom-2 px-5 bg-[#0051d9] text-white rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-md active:scale-95 disabled:opacity-30 transition-all"
                 >
                   {isSearching ? <Activity size={16} className="animate-spin" /> : "Search"}
                 </button>
               </div>
               {validationErrors.cnic && <span className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{validationErrors.cnic}</span>}
               
               <div className="flex items-center gap-4 py-2">
                  <div className="h-[1px] flex-1 bg-slate-100" />
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Or</span>
                  <div className="h-[1px] flex-1 bg-slate-100" />
               </div>

               <button 
                 onClick={() => setStep(1)}
                 className="w-full py-3.5 bg-white border-2 border-slate-100 hover:border-[#0051d9]/20 hover:bg-blue-50/30 text-[#0051d9] rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
               >
                 <UserCheck size={16} className="text-[#0051d9]" />
                 Register New Patient
               </button>
            </div>

            <div className="w-full max-w-sm">
                <AnimatePresence mode="wait">
                  {hasSearched && searchResults.length === 0 ? (
                    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center gap-4">
                       <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-bold uppercase tracking-widest">
                          <CheckCircle2 size={12} strokeWidth={3} /> Available for registration
                       </div>
                       <button onClick={() => setStep(1)} className="w-full py-3 bg-slate-900 text-white rounded-xl text-[12px] font-bold uppercase tracking-widest shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 group">
                         Start Entry <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                       </button>
                    </motion.div>
                  ) : hasSearched && searchResults.length > 0 ? (
                    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4 w-full text-left">
                       <div className="flex items-center gap-2 px-1">
                          <AlertCircle size={14} className="text-amber-600" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600">Existing record found</span>
                       </div>

                       <div className="relative p-5 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
                          <div className="flex flex-col gap-4">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#0051d9] text-white flex items-center justify-center text-xl font-bold">
                                   {searchResults[0].full_name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                   <h3 className="text-base font-bold text-slate-800 truncate leading-none mb-1.5">{searchResults[0].full_name}</h3>
                                   <div className="flex items-center gap-2">
                                      <span className="text-[9px] font-bold text-[#0051d9] uppercase tracking-widest bg-blue-50 px-1.5 py-0.5 rounded">MRN #{searchResults[0].mrn}</span>
                                      <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${getStatusColor(searchResults[0])}`}>
                                         {searchResults[0].is_admitted ? 'Admitted' : 'Active'}
                                      </span>
                                   </div>
                                </div>
                             </div>

                             <div className="grid grid-cols-3 gap-2 border-t border-slate-200/50 pt-4">
                                <div>
                                   <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Born</span>
                                   <span className="text-[10px] font-bold text-slate-700 truncate block">{formatDate(searchResults[0].date_of_birth)}</span>
                                </div>
                                <div>
                                   <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block text-center">Gender</span>
                                   <span className="text-[10px] font-bold text-slate-700 capitalize text-center block">{searchResults[0].gender}</span>
                                </div>
                                <div>
                                   <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block text-right">Blood</span>
                                   <span className="text-[10px] font-bold text-red-600 text-right block">{searchResults[0].blood_group || '--'}</span>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => {
                              const { openModal, clearModals } = useModalStore.getState();
                              clearModals();
                              setTimeout(() => openModal('ADMIT_PATIENT', { initialPatient: searchResults[0] }), 50);
                            }}
                            className="w-full py-3 bg-slate-900 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md"
                          >
                            Proceed to Admit <ArrowUpRight size={16} strokeWidth={2.5} />
                          </button>
                          
                          <div className="flex gap-2">
                             <button 
                               onClick={() => closeModal()}
                               className="flex-1 py-3 border border-slate-100 text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all"
                             >
                               Cancel
                             </button>
                             <button 
                               onClick={() => {
                                 closeModal();
                                 window.location.href = `/admin/patients/${searchResults[0].id}`;
                               }}
                               className="flex-1 py-3 bg-blue-50 text-[#0051d9] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-100 transition-all flex items-center justify-center gap-1.5"
                             >
                               Profile <ChevronRight size={12} strokeWidth={3} />
                             </button>
                          </div>
                       </div>
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 opacity-15">
                      <Landmark size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Institutional Verification Matrix</span>
                    </div>
                  )}
                </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="step-1"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col space-y-6"
          >
            {/* Header Intelligence Node */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Onboarding Node</span>
                 <span className="text-sm font-bold text-slate-800">{formData.fullName || "New Profiling"}</span>
              </div>
              <button 
                onClick={() => setStep(0)} 
                className="text-[9px] font-bold text-[#0051d9] uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-1.5"
              >
                <ArrowLeft size={12} strokeWidth={3} />
                Back to Shards
              </button>
            </div>

            {/* 📋 Identity Card */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
              <SectionHeader title="Core Identity" />
              <div className="space-y-4">
                <M3TextField label="Legal Name *" placeholder="Patient Full Name" icon={User} required fullWidth name="fullName" onChange={onChange} value={formData.fullName || ''} className="bg-white h-11" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <M3TextField label="Phone Number *" type="tel" icon={Phone} placeholder="+92 XXX XXXXXXX" required name="phone_number" onChange={onChange} value={formData.phone_number || ''} className="bg-white h-11" />
                   <M3TextField label="Clinical ID (CNIC) *" icon={Fingerprint} placeholder="XXXXX-XXXXXXX-X" required name="cnic" onChange={onChange} value={formData.cnic || ''} className="bg-white h-11" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <M3TextField label="Birth Date *" type="date" icon={Calendar} required name="date_of_birth" onChange={handleDobChange} value={formData.date_of_birth || ''} className="bg-white h-11" />
                   <M3Select label="Gender *" icon={Users} options={GENDERS} value={formData.gender || ''} onChange={(e) => setFormData(p => ({ ...p, gender: e.target.value }))} placeholder="Select" required className="bg-white h-11" />
                </div>
              </div>
            </div>

            {/* 🛡️ Secure Registry Data */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
              <SectionHeader title="Clinical Profile" />
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <M3TextField label="Email Address *" type="email" icon={Mail} placeholder="name@clinic.com" required name="email" onChange={onChange} value={formData.email || ''} className="bg-white h-11" />
                   <M3Select label="Blood Group" icon={Heart} options={BLOOD_GROUPS} value={formData.blood_group || ''} onChange={(e) => setFormData(p => ({ ...p, blood_group: e.target.value }))} placeholder="Select" className="bg-white h-11" />
                </div>

                <M3TextField label="Physical Address" placeholder="Residential detail..." icon={MapPin} fullWidth name="address" onChange={onChange} value={formData.address || ''} className="bg-white h-11" />

                <M3TextField label="Access Password *" type="password" icon={Lock} placeholder="••••••••" required name="password" onChange={onChange} value={formData.password || ''} className="bg-white h-11" />

                {/* Privacy Shard */}
                <div 
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between
                    ${formData.privacy_consent ? 'bg-white border-[#0051d9]/20 shadow-sm' : 'bg-white/50 border-transparent hover:border-slate-100'}`}
                  onClick={() => setFormData(p => ({ ...p, privacy_consent: !p.privacy_consent }))}
                >
                   <div className="flex items-center gap-3">
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${formData.privacy_consent ? 'bg-[#0051d9] text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                       <ShieldCheck size={16} />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[10px] font-black uppercase text-slate-800 tracking-tight leading-none mb-1">Authorization</span>
                       <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter leading-none">Accept PHI metadata terms</span>
                     </div>
                   </div>
                   <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.privacy_consent ? 'bg-[#0051d9] border-[#0051d9]' : 'bg-white border-slate-200'}`}>
                     {formData.privacy_consent && <div className="w-2 h-2 rounded-full bg-white" />}
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
