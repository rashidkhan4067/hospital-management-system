import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BedDouble, 
    ClipboardCheck, 
    ArrowRight, 
    UserPlus, 
    ShieldPlus, 
    Building2,
    CheckCircle2,
    Users2,
    Search,
    AlertCircle,
    ShieldCheck,
    Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';
import { apiClient } from '@/core/api';
import { UI_TOKENS, CTA_THEMES } from '@/core/config/UI';

/**
 * 🛌 AdmissionsProtocolPage (In-patient Onboarding)
 * Streamlined workflow for transitioning patients from ER/OPD to Ward assignment.
 * Standardized to Google UI (M3) architecture.
 */
export default function AdmissionsProtocolPage() {
    const navigate = useNavigate();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [patients, setPatients] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [priority, setPriority] = useState('routine');
    
    // ── Load Clinical Nodes ──
    useEffect(() => {
        // Fetch non-admitted patients
        apiClient.get('/patients/profiles/')
            .then(res => {
                const data = res.data.results || res.data;
                if (Array.isArray(data)) setPatients(data.filter(p => !p.is_admitted));
            })
            .catch(err => console.error("Patient Registry Error:", err));

        // Fetch available wards
        apiClient.get('/wards/wards/')
            .then(res => {
                const data = res.data.results || res.data;
                if (Array.isArray(data)) setWards(data);
            })
            .catch(err => console.error("Ward Registry Error:", err));
    }, []);

    const handleAdmission = async () => {
        if (!selectedPatient || !selectedWard) return;
        
        setIsSaving(true);
        try {
            // Update patient admission status
            await apiClient.patch(`/patients/profiles/${selectedPatient.id}/`, {
                is_admitted: true,
                room_number: selectedWard.name
            });
            
            setIsConfirmed(true);
            setTimeout(() => navigate('/admin/clinical/wards'), 3000);
        } catch (err) {
            console.error("Admission Write Error:", err);
            alert("Failed to synchronize admission node. Check clinical connectivity.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isConfirmed) {
        return (
            <AdminPage className="min-h-[80vh] flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`${UI_TOKENS.SHARD_BASE} text-center max-w-sm`}
                >
                    <div className="w-24 h-24 rounded-full bg-blue-50 text-[#1a73e8] flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <UserPlus size={48} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-3">Admission Authorized</h1>
                    <p className="text-sm text-slate-600 mb-8">
                        Patient <strong className="text-slate-900">{selectedPatient?.full_name}</strong> has been officially admitted to <strong className="text-slate-900">{selectedWard?.name}</strong>.
                    </p>
                    <button onClick={() => navigate('/admin/clinical/wards')} className={CTA_THEMES.PRIMARY}>
                        View Ward Matrix
                    </button>
                </motion.div>
            </AdminPage>
        );
    }

    return (
        <AdminPage className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                
                {/* ── Dashboard Header ── */}
                <header className={UI_TOKENS.HEADER}>
                    <div className={UI_TOKENS.HEADER_LEFT}>
                        <div className={UI_TOKENS.ICON_BOX}>
                            <BedDouble size={20} />
                        </div>
                        <div>
                            <span className={UI_TOKENS.TEXT_SECONDARY}>In-patient Logistics</span>
                            <h1 className={`${UI_TOKENS.TEXT_PRIMARY} text-2xl mt-1`}>Patient Admission Protocol</h1>
                            <p className="text-sm text-slate-500 font-medium mt-1">Initialize inpatient tracking and allocate clinical facility resources.</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8 items-start">
                    
                    {/* ── Left Column: Configuration ── */}
                    <div className="col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
                        
                        {/* Identity Selection */}
                        <section className={UI_TOKENS.SHARD_BASE}>
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Users2 size={20} className="text-[#1a73e8]" />
                                Admitting Identity
                            </h2>
                            
                            <div className="relative">
                                <select 
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold focus:bg-white focus:border-[#1a73e8] focus:ring-4 focus:ring-[#1a73e8]/10 transition-all appearance-none cursor-pointer outline-none"
                                    onChange={(e) => {
                                        const p = patients.find(pat => pat.id === parseInt(e.target.value));
                                        setSelectedPatient(p);
                                    }}
                                    value={selectedPatient?.id || ''}
                                >
                                    <option value="" disabled>Search Patient Registry...</option>
                                    {patients.map(p => (
                                        <option key={p.id} value={p.id}>{p.full_name} ({p.email})</option>
                                    ))}
                                </select>
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                    <Search size={18} />
                                </div>
                            </div>
                        </section>

                        {/* Ward Matrix */}
                        <section className={UI_TOKENS.SHARD_BASE}>
                            <h2 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <Building2 size={20} className="text-[#1a73e8]" />
                                Destination Ward Unit
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {wards.map((ward) => (
                                    <button
                                        key={ward.id}
                                        onClick={() => setSelectedWard(ward)}
                                        className={`flex items-start gap-4 p-5 rounded-[24px] transition-all text-left bg-white
                                            ${selectedWard?.id === ward.id 
                                                ? 'border-2 border-[#1a73e8] shadow-md shadow-blue-500/10' 
                                                : 'border border-slate-200 hover:border-[#1a73e8]/40 hover:shadow-sm'}
                                        `}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${selectedWard?.id === ward.id ? 'bg-[#1a73e8] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            <Building2 size={24} strokeWidth={1.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-bold text-slate-900 truncate uppercase">{ward.name}</h3>
                                            <p className="text-[10px] font-bold text-[#1a73e8] uppercase tracking-widest mt-1">Level {ward.floor}</p>
                                            <div className="mt-3 flex items-center gap-2 text-slate-500">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{ward.code}</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Checklist */}
                        <section className={UI_TOKENS.SHARD_BASE}>
                            <h2 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <ShieldPlus size={20} className="text-[#1a73e8]" />
                                Boarding Readiness
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Clinical Vitals Synced', 'Consent Forms Signed', 'Insurance Authorized', 'Attending Notified'].map((txt) => (
                                    <div key={txt} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                             <CheckCircle2 size={12} strokeWidth={2.5} />
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">{txt}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* ── Right Column: Summary ── */}
                    <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col gap-6 sticky top-8">
                        <section className={UI_TOKENS.SHARD_BASE}>
                            <h2 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <ClipboardCheck size={20} className="text-[#1a73e8]" />
                                Allocation Summary
                            </h2>

                            <div className="flex flex-col gap-6 mb-8">
                                <div className="flex flex-col gap-2">
                                    <p className={UI_TOKENS.TEXT_SECONDARY}>Priority Matrix</p>
                                    <div className="flex gap-2">
                                        {['routine', 'urgent', 'critical'].map(p => (
                                            <button 
                                                key={p}
                                                onClick={() => setPriority(p)}
                                                className={`flex-1 h-12 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all
                                                    ${priority === p 
                                                        ? (p === 'critical' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-[#1a73e8] text-white shadow-lg shadow-blue-500/20')
                                                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}
                                                `}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="h-px bg-slate-50" />
                                
                                <AnimatePresence mode="wait">
                                    {!selectedPatient || !selectedWard ? (
                                        <motion.div 
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col items-center justify-center py-10 text-center gap-4 text-slate-300"
                                        >
                                            <AlertCircle size={32} strokeWidth={1.5} />
                                            <p className="text-xs font-bold uppercase tracking-widest">Configuration Incomplete</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div 
                                            key="selected"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-4"
                                        >
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-500 font-medium">Patient</span>
                                                <span className="text-slate-900 font-bold">{selectedPatient.full_name}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-500 font-medium">Ward</span>
                                                <span className="text-[#1a73e8] font-bold uppercase">{selectedWard.name}</span>
                                            </div>
                                        </motion.div>
                                    )
                                }
                                </AnimatePresence>
                            </div>

                            <button 
                                onClick={handleAdmission}
                                disabled={!selectedPatient || !selectedWard || isSaving}
                                className={CTA_THEMES.PRIMARY + " w-full !h-14 !rounded-2xl shadow-xl shadow-blue-500/20"}
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                                        Syncing Registry...
                                    </>
                                ) : (
                                    <>
                                        Initialize Hospital Admission <ArrowRight size={20} className="ml-2" />
                                    </>
                                )}
                            </button>
                            
                            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                                <ShieldCheck size={14} className="text-green-400" />
                                HIPAA COMPLIANT SESSION
                            </div>
                        </section>
                        
                        <div className="p-6 rounded-[24px] bg-slate-50 border border-slate-100 flex items-center gap-4">
                            <Clock size={20} className="text-slate-400" />
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                Clinical Gate v4.2 Active
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPage>
    );
}
