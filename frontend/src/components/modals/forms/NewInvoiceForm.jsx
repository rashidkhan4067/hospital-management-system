import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, Plus, Trash2, Receipt, Calendar, User, 
    ShieldCheck, Calculator, Info, UserPlus, Fingerprint,
    ChevronRight, CheckCircle2, History, Banknote,
    Clock, Hash, FileText, Printer, Download, X,
    Activity, ArrowRight, Loader2, CreditCard, Wallet, Globe, ShoppingBag,
    Zap, Sparkles, AlertCircle, ArrowLeft, UserCheck, Landmark, Phone, Mail, Heart, MapPin, Lock, Users,
    PlusCircle
} from 'lucide-react';
import M3TextField from '@/components/primitives/M3TextField';
import M3Select from '@/components/primitives/M3Select';
import api from '@/core/api/apiClient';
import { useModalStore } from '@/core/store/useModalStore';

const SERVICE_CATALOGUE = [
    { name: 'Nursing Care (24h)', price: 5000, type: 'PROCEDURE', code: 'NS-01' },
    { name: 'Complete Blood Count (CBC)', price: 1500, type: 'LAB_TEST', code: 'LB-90' },
    { name: 'Standard Room Charge', price: 3000, type: 'OTHER', code: 'RM-G' }
];

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
 * 🧾 NewInvoiceForm - Date-Safe & Professional
 */
export default function NewInvoiceForm({ onFormStateChange, initialPatient = null, initialName = '' }) {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [patientFound, setPatientFound] = useState(!!initialPatient);
    const [cnicSearch, setCnicSearch] = useState(initialName);
    
    const [appointments, setAppointments] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    
    const [formData, setFormData] = useState({
        patient: initialPatient?.id || null,
        patientName: initialPatient?.full_name || initialName,
        context_type: 'WALKIN',
        context_id: null,
        payment_method: 'CASH',
        // Dates strictly as ISO strings (YYYY-MM-DD) to prevent DateTime collision
        invoice_date: new Date().toISOString().split('T')[0],
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: initialPatient ? [
            { name: 'Walk-in Consultation', unit_price: 2500, quantity: 1 }
        ] : []
    });

    useEffect(() => {
        if (initialPatient) {
            setPatientFound(true);
            fetchPatientContext(initialPatient.id);
        }
    }, [initialPatient]);

    const [hasSearched, setHasSearched] = useState(false);

    // 🔍 Rapid Identity Verification
    const executeAutoSearch = async (term) => {
        if (!term || term.length < 2) return;
        setLoading(true);
        setHasSearched(false);
        try {
            const { data } = await api.get(`patients/profiles/?search=${term}`);
            const results = data.results || [];
            if (results.length === 1) {
                const p = results[0];
                setFormData(prev => ({ ...prev, patient: p.id, patientName: p.full_name }));
                setPatientFound(true);
                fetchPatientContext(p.id);
                setStep(1); // ⚡ Auto-advance to Sharding
            } else if (results.length > 0) {
                const p = results[0];
                setFormData(prev => ({ ...prev, patient: p.id, patientName: p.full_name }));
                setPatientFound(true);
            } else {
                setPatientFound(false);
            }
            setHasSearched(true);
        } catch (err) { 
            console.error(err); 
        } finally { 
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (initialName && !initialPatient) {
            executeAutoSearch(initialName);
        }
    }, [initialName, initialPatient]);

    const handleSearch = () => executeAutoSearch(cnicSearch);

    const fetchPatientContext = async (patientId) => {
        try {
            const [appts, adms] = await Promise.all([
                api.get(`appointments/?patient=${patientId}&status=confirmed`),
                api.get(`wards/admissions/?patient=${patientId}&status=active`)
            ]);
            setAppointments(appts.data.results || []);
            setAdmissions(adms.data.results || []);
        } catch (err) { console.error(err); }
    };

    const handleContextSelection = async (type, id = null) => {
        setFormData(prev => ({ ...prev, context_type: type, context_id: id }));
        
        if (type === 'APPOINTMENT' && id) {
            const appt = appointments.find(a => a.id === parseInt(id));
            if (appt) {
                try {
                    const { data: doctor } = await api.get(`doctors/profiles/${appt.doctor}/`);
                    const fee = parseFloat(doctor.consultation_fee) || 0;
                    const consultationItem = { 
                        name: `Dr. ${doctor.user.full_name} — Consultation`, 
                        unit_price: fee, 
                        quantity: 1,
                        is_automated: true
                    };
                    setFormData(prev => ({
                        ...prev, items: [consultationItem, ...prev.items.filter(i => !i.is_automated)]
                    }));
                } catch (err) { console.error(err); }
            }
        } else if (type === 'WALKIN') {
            setFormData(prev => ({
                ...prev, items: [{ name: 'Standard Walk-in Fee', unit_price: 2500, quantity: 1, is_automated: true }, ...prev.items.filter(i => !i.is_automated)]
            }));
        }
    };

    const addItem = () => setFormData(p => ({ ...p, items: [...p.items, { name: '', unit_price: 0, quantity: 1 }] }));
    const updateItem = (idx, field, val) => { const n = [...formData.items]; n[idx][field] = val; setFormData(p => ({ ...p, items: n })); };
    const removeItem = (idx) => setFormData(p => ({ ...p, items: p.items.filter((_, i) => i !== idx) }));

    const totals = useMemo(() => {
        const subtotal = formData.items.reduce((acc, curr) => acc + (parseFloat(curr.unit_price) * parseInt(curr.quantity)), 0);
        return { total: subtotal + (subtotal * 0.05), tax: (subtotal * 0.05) };
    }, [formData.items]);

    useEffect(() => {
        if (onFormStateChange) {
            onFormStateChange({
                data: { 
                    ...formData, 
                    total_amount: totals.total, 
                    tax_amount: totals.tax,
                    appointment: formData.context_type === 'APPOINTMENT' ? formData.context_id : null,
                    admission: formData.context_type === 'ADMISSION' ? formData.context_id : null
                },
                isValid: step === 1 && formData.patientName && formData.items.length > 0,
                hideFooter: step === 0,
                submitLabel: "Generate Secure Invoice"
            });
        }
    }, [formData, totals, onFormStateChange, step]);

    return (
        <motion.div initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col pb-10">
            <Stepper currentStep={step} />

            <AnimatePresence mode="wait">
                {step === 0 ? (
                    <motion.div key="v-step-0" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} 
                        className="flex flex-col items-center justify-center text-center space-y-6 py-2"
                    >
                        <div className="w-16 h-16 bg-blue-50 text-[#0051d9] rounded-2xl flex items-center justify-center shadow-inner relative">
                          <Receipt size={32} strokeWidth={1.5} />
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
                                        Establish Revenue Shard <ChevronRight size={16} strokeWidth={2.5} />
                                      </button>
                                   </div>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="v-step-1" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                        <div className="flex items-center justify-between mb-1">
                            <SectionHeader title="Revenue Sharding" />
                            <div className="flex gap-2">
                                <div className="px-2 py-1 bg-slate-100 rounded-lg flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase">
                                    <Calendar size={10}/> {formData.invoice_date}
                                </div>
                                <button onClick={()=>setStep(0)} className="text-[9px] font-bold text-[#0051d9] uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-lg">Context Shift</button>
                            </div>
                        </div>

                        {/* Professional Context Selector */}
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                {CONTEXT_OPTIONS.map(opt => (
                                    <button 
                                        key={opt.value} onClick={() => handleContextSelection(opt.value)}
                                        className={`h-11 rounded-lg border transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest
                                            ${formData.context_type === opt.value ? 'bg-[#0051d9] border-[#0051d9] text-white shadow-md' : 'bg-white border-slate-100 text-slate-400'}`}
                                    >
                                        <opt.icon size={14} /> {opt.label}
                                    </button>
                                ))}
                            </div>
                            
                            {formData.context_type === 'APPOINTMENT' && (
                                <M3Select 
                                    label="Link Session" icon={Calendar}
                                    options={appointments.map(a => ({ value: a.id, label: `Dr. ${a.doctor_name} (${a.appointment_date})` }))}
                                    value={formData.context_id || ''} onChange={(e) => handleContextSelection('APPOINTMENT', e.target.value)}
                                    placeholder="Select Appointment..." className="h-11 bg-white shadow-sm"
                                />
                            )}
                        </div>

                        {/* Services Matrix */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <SectionHeader title="Clinical Matrix" />
                                <button onClick={addItem} className="text-[#0051d9] text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 hover:underline"><PlusCircle size={14}/> Inject Logic</button>
                            </div>
                            
                            <div className="space-y-2.5 pb-12">
                                {formData.items.map((item, idx) => (
                                    <div key={idx} className={`grid grid-cols-12 gap-2 p-2.5 rounded-xl border shadow-sm ${item.is_automated ? 'bg-blue-50/50 border-blue-100' : 'bg-white border-slate-100'}`}>
                                        <div className="col-span-6 flex items-center gap-2">
                                            {item.is_automated && <Sparkles size={12} className="text-blue-500" />}
                                            <input 
                                                className="w-full h-9 bg-transparent border-none px-2 text-xs font-bold outline-none"
                                                placeholder="Service..." value={item.name} onChange={(e) => updateItem(idx, 'name', e.target.value)}
                                                readOnly={item.is_automated}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <input type="number" className="w-full h-9 bg-white/50 rounded-lg text-center font-black text-xs outline-none" value={item.quantity} onChange={(e) => updateItem(idx, 'quantity', parseInt(e.target.value))} />
                                        </div>
                                        <div className="col-span-3">
                                            <input type="number" className="w-full h-9 bg-white/50 rounded-lg px-2 text-right font-black text-xs outline-none" value={item.unit_price} onChange={(e) => updateItem(idx, 'unit_price', parseFloat(e.target.value))} readOnly={item.is_automated} />
                                        </div>
                                        <button onClick={()=>removeItem(idx)} className="col-span-1 text-slate-200 hover:text-red-500 flex justify-center items-center h-9"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                             <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl text-white shadow-2xl relative overflow-hidden backdrop-blur-xl">
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Receipt size={100} strokeWidth={1} className="rotate-12"/></div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-6">
                                    <div className="flex items-center gap-2"><Wallet size={14} className="text-blue-400"/><span>Settlement Logic</span></div>
                                    <div className="flex gap-4 p-1 bg-white/5 rounded-xl">
                                        <button onClick={()=>setFormData(p=>({...p, payment_method:'CASH'}))} className={`px-4 py-1.5 rounded-lg text-[9px] transition-all ${formData.payment_method==='CASH' ? 'bg-white text-slate-900 shadow-lg':'text-white/40'}`}>CASH</button>
                                        <button onClick={()=>setFormData(p=>({...p, payment_method:'CARD'}))} className={`px-4 py-1.5 rounded-lg text-[9px] transition-all ${formData.payment_method==='CARD' ? 'bg-white text-slate-900 shadow-lg':'text-white/40'}`}>CARD</button>
                                    </div>
                                </div>
                                <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-end">
                                    <div><p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">Institutional Total</p><p className="text-4xl font-black tracking-tighter tabular-nums text-white">Rs. {totals.total.toLocaleString()}</p></div>
                                    <div className="text-right text-[9px] font-black text-blue-500 uppercase tracking-widest"><Zap size={10} className="inline mr-1"/> Real-time Sync</div>
                                </div>
                             </div>

                             <div className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${formData.items.length > 0 ? 'bg-blue-50 border-[#0051d9]/20 shadow-sm' : 'bg-slate-50 border-transparent opacity-40'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${formData.items.length > 0 ? 'bg-[#0051d9] text-white' : 'bg-slate-200 text-slate-400'}`}><ShieldCheck size={20} /></div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[11px] font-black uppercase text-slate-800 tracking-wider mb-1 block leading-none">Authorization</span>
                                        <span className="text-[10px] text-slate-400 font-medium leading-none tracking-tight">System validated for registry commit.</span>
                                    </div>
                                </div>
                                <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${formData.items.length > 0 ? 'bg-[#0051d9] border-[#0051d9]' : 'bg-white border-slate-200'}`}>{formData.items.length > 0 && <CheckCircle2 size={12} className="text-white" />}</div>
                             </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="h-6" /> 
        </motion.div>
    );
}
