import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, Plus, FlaskConical, Calendar, User, 
    ShieldCheck, ClipboardList, Info, ChevronRight, 
    CheckCircle2, X, Loader2, FileText, Printer, 
    Activity, Globe, Sparkles, Landmark, Zap,
    Fingerprint, AlertCircle, ArrowUpRight, UserCheck
} from 'lucide-react';
import M3TextField from '@/components/primitives/M3TextField';
import api from '@/core/api/apiClient';
import { useModalStore } from '@/core/store/useModalStore';

const CONTEXT_OPTIONS = [
    { value: 'WALKIN', label: 'Walk-in', icon: Globe },
    { value: 'APPOINTMENT', label: 'Appointment', icon: Calendar },
    { value: 'ADMISSION', label: 'Admission', icon: Activity }
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
 * 🧪 NewLabOrderForm - Rapid Diagnostic Requisition
 * Optimized for <1 minute clinical order creation.
 */
export default function NewLabOrderForm({ onFormStateChange, onClose }) {
    const [step, setStep] = useState(0); // 0: Identity, 1: Details, 2: Confirmation
    const [loading, setLoading] = useState(false);
    const [patientFound, setPatientFound] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [cnicSearch, setCnicSearch] = useState('');
    const [tests, setTests] = useState([]);
    const [submittedOrder, setSubmittedOrder] = useState(null);

    const [formData, setFormData] = useState({
        patient: null,
        patientName: '',
        context_type: 'WALKIN',
        tests: [],
        doctor_notes: ''
    });

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const { data } = await api.get('lab/tests/');
                setTests(data.results || []);
            } catch (err) { console.error(err); }
        };
        fetchTests();
    }, []);

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

    const toggleTest = (testId) => {
        const current = [...formData.tests];
        const idx = current.indexOf(testId);
        if (idx > -1) current.splice(idx, 1);
        else current.push(testId);
        setFormData(p => ({ ...p, tests: current }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const { data } = await api.post('lab/orders/', formData);
            setSubmittedOrder(data);
            setStep(2); // Jump to confirmation
        } catch (err) { 
            console.error(err); 
        } finally { 
            setLoading(false); 
        }
    };

    // Update Global Modal Footer
    useEffect(() => {
        if (onFormStateChange) {
            onFormStateChange({
                data: formData,
                isValid: step === 1 && formData.patientName && formData.tests.length > 0,
                hideFooter: step !== 1, // Only show footer on details step
                submitLabel: "Create Lab Order",
                onSubmit: handleSubmit
            });
        }
    }, [formData, step, onFormStateChange]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col p-5 bg-white max-h-[75vh] overflow-y-auto custom-scrollbar">
            {step < 2 && <Stepper currentStep={step} />}

            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div key="l-step-0" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} 
                        className="flex flex-col items-center justify-center text-center space-y-6 py-2"
                    >
                        <div className="w-16 h-16 bg-blue-50 text-[#0051d9] rounded-2xl flex items-center justify-center shadow-inner relative">
                          <FlaskConical size={32} strokeWidth={1.5} />
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
                               {loading ? <Activity size={16} className="animate-spin" /> : "Search"}
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
                              {hasSearched && !patientFound ? (
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
                              ) : hasSearched && patientFound ? (
                                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4 w-full text-left mt-4">
                                   <div className="flex items-center gap-2 px-1">
                                      <AlertCircle size={14} className="text-amber-600" />
                                      <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600">Existing record found</span>
                                   </div>

                                   <div className="relative p-5 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
                                      <div className="flex flex-col gap-4">
                                         <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#0051d9] text-white flex items-center justify-center text-xl font-bold">
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
                )}

                {step === 1 && (
                    <motion.div key="l-step-1" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                             <div className="flex flex-col">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Node</span>
                                <span className="text-sm font-bold text-slate-800">{formData.patientName}</span>
                             </div>
                             <button onClick={()=>{setStep(0); setHasSearched(false);}} className="text-[9px] font-bold text-[#0051d9] uppercase tracking-widest bg-blue-50 hover:underline px-3 py-1.5 rounded-lg flex items-center gap-1">Reset</button>
                        </div>

                        {/* Context Selection */}
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                             <SectionHeader title="Clinical Context" />
                             <div className="grid grid-cols-3 gap-2">
                                {CONTEXT_OPTIONS.map(opt => (
                                    <button 
                                        key={opt.value} onClick={(e) => { e.preventDefault(); setFormData(p=>({...p, context_type: opt.value})); }}
                                        className={`h-11 rounded-xl border transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest
                                            ${formData.context_type === opt.value ? 'bg-[#0051d9] border-[#0051d9] text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}
                                    >
                                        <opt.icon size={14} /> {opt.label}
                                    </button>
                                ))}
                             </div>
                        </div>

                        {/* Lab Test Selection */}
                        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-4">
                             <SectionHeader title="Diagnostic Matrix Selection" />
                             <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                                {tests.map(test => (
                                    <button 
                                        key={test.id} onClick={(e) => { e.preventDefault(); toggleTest(test.id); }}
                                        className={`flex items-center justify-between p-3 rounded-xl border transition-all group
                                            ${formData.tests.includes(test.id) ? 'bg-blue-50 border-[#0051d9]/30 text-[#0051d9]' : 'bg-white border-slate-50 text-slate-500 hover:border-slate-200'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${formData.tests.includes(test.id) ? 'bg-[#0051d9] text-white' : 'bg-slate-50 text-slate-300'}`}>
                                                <FlaskConical size={16} />
                                            </div>
                                            <div className="flex flex-col text-left">
                                                <span className="text-[11px] font-bold leading-none mb-1 uppercase tracking-tight">{test.name}</span>
                                                <span className="text-[9px] opacity-60 font-medium uppercase tracking-widest">{test.category}</span>
                                            </div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${formData.tests.includes(test.id) ? 'bg-[#0051d9] border-[#0051d9]' : 'bg-slate-100 border-transparent group-hover:border-slate-300'}`}>
                                            {formData.tests.includes(test.id) && <CheckCircle2 size={12} className="text-white" />}
                                        </div>
                                    </button>
                                ))}
                             </div>
                        </div>

                        {/* Doctor Notes */}
                        <div className="space-y-2 px-1 pb-4">
                            <SectionHeader title="Clinical Instructions" />
                            <textarea 
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium focus:bg-white focus:border-[#0051d9]/20 shadow-inner outline-none transition-all resize-none min-h-[80px]"
                                placeholder="Enter specific clinical directives or symptomatic context..."
                                value={formData.doctor_notes} onChange={(e)=>setFormData(p=>({...p, doctor_notes: e.target.value}))}
                            />
                        </div>
                    </motion.div>
                )}

                {step === 2 && submittedOrder && (
                    <motion.div key="l-step-2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-6 pt-6 pb-2">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner relative">
                            <CheckCircle2 size={40} strokeWidth={2.5} />
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-sm"><Sparkles size={16}/></motion.div>
                        </div>
                        
                        <div className="space-y-1">
                            <h3 className="text-xl font-black text-slate-900 tracking-tighter">Order Requisition Active</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{submittedOrder.order_id}</p>
                        </div>

                        <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-left space-y-4">
                             <div className="flex justify-between border-b border-slate-200/50 pb-3">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Requisition Node</span>
                                <span className="text-[10px] font-bold text-slate-800">{submittedOrder.patient_name}</span>
                             </div>
                             <div className="space-y-1.5">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-2">Entrusted Diagnostics</span>
                                {submittedOrder.test_names.map((tn, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-700 bg-white p-2 rounded-xl shadow-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0051d9]" /> {tn}
                                    </div>
                                ))}
                             </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 w-full pt-4">
                            <button className="h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">
                                <Printer size={18} /> Print Slip
                            </button>
                            <button onClick={onClose} className="h-14 bg-white border border-slate-200 text-slate-900 rounded-2xl flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-blue-50/20 transition-all">
                                Close Matrix
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {step < 2 && (
                <div className="pt-8 pb-4 opacity-10 flex items-center justify-center gap-2">
                    <Landmark size={14} />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Institutional Diagnostic Shard</span>
                </div>
            )}
        </motion.div>
    );
}
