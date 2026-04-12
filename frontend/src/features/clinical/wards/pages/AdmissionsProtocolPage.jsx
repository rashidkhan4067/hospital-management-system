import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    BedDouble, 
    ClipboardCheck, 
    ArrowRight, 
    UserPlus, 
    ShieldPlus, 
    Building2,
    CheckCircle2,
    Users2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';

/**
 * 🛌 AdmissionsProtocolPage (In-patient Onboarding)
 * Streamlined workflow for transitioning patients from ER/OPD to Ward assignment.
 */
export default function AdmissionsProtocolPage() {
    const navigate = useNavigate();
    const [isConfirmed, setIsConfirmed] = useState(false);

    if (isConfirmed) {
        return (
            <AdminPage className="min-h-[80vh] flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center max-w-sm"
                >
                    <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-8">
                        <UserPlus size={40} />
                    </div>
                    <h1 className="text-2xl font-bold text-text-main mb-3">Admission Authorized</h1>
                    <p className="text-sm text-text-sub mb-8">
                        Patient has been officially admitted to <strong>ICU Ward 2, Bed 14</strong>. Staff notification broadcasted.
                    </p>
                    <button onClick={() => navigate('/admin/clinical/wards')} className="w-full h-12 bg-primary text-white rounded-full font-bold text-[13px] hover:brightness-110">View Ward Matrix</button>
                </motion.div>
            </AdminPage>
        );
    }

    return (
        <AdminPage className="min-h-screen">
            <div className="max-w-4xl mx-auto px-4 py-8 lg:py-16">
                
                {/* ── Header ── */}
                <header className="mb-12 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <BedDouble size={16} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Boarding Matrix v2.0</span>
                    </div>
                    <h1 className="text-4xl font-black text-text-main tracking-tight mb-2">Patient Admission Protocol</h1>
                    <p className="text-text-sub font-medium opacity-60">Initialize inpatient tracking and allocate facility resources.</p>
                </header>

                <div className="bg-surface-bright border border-outline-variant rounded-[48px] p-8 md:p-12 elev-2 flex flex-col gap-10">
                    
                    {/* Select Patient Section */}
                    <div className="flex flex-col gap-4">
                        <label className="text-[11px] font-bold text-text-sub uppercase tracking-widest flex items-center gap-2 ml-1">
                            <Users2 size={12} /> Search Admitting Identity
                        </label>
                        <div className="p-5 rounded-3xl bg-surface-variant/30 border border-outline-variant border-dashed flex items-center justify-between group cursor-pointer hover:bg-surface-variant/50 transition-colors">
                            <span className="text-sm font-medium text-text-sub opacity-50">Select patient for admission...</span>
                            <div className="w-10 h-10 rounded-2xl bg-white border border-outline-variant flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <ArrowRight size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Ward Assignment Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-4">
                            <label className="text-[11px] font-bold text-text-sub uppercase tracking-widest flex items-center gap-2 ml-1">
                                <Building2 size={12} /> Destination Ward
                            </label>
                            <select className="h-14 px-6 rounded-2xl bg-surface-variant/30 border border-outline-variant focus:border-primary outline-none text-sm font-bold text-text-main transition-colors">
                                <option>General Ward A (Level 2)</option>
                                <option>ICU / Critical Critical (Level 4)</option>
                                <option>Surgical Post-Op (Level 3)</option>
                                <option>Pediatrics (Level 1)</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="text-[11px] font-bold text-text-sub uppercase tracking-widest flex items-center gap-2 ml-1">
                                <ClipboardCheck size={12} /> Priority Level
                            </label>
                            <div className="flex gap-2">
                                <button className="flex-1 h-14 rounded-2xl bg-surface-variant/30 border border-outline-variant text-[11px] font-bold text-text-sub hover:bg-surface-variant transition-colors">Routine</button>
                                <button className="flex-1 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">Urgent</button>
                                <button className="flex-1 h-14 rounded-2xl bg-error/10 border border-error/20 text-[11px] font-bold text-error">Critical</button>
                            </div>
                        </div>
                    </div>

                    {/* Protocol Checklist */}
                    <div className="flex flex-col gap-4">
                        <label className="text-[11px] font-bold text-text-sub uppercase tracking-widest flex items-center gap-2 ml-1">
                           <ShieldPlus size={12} /> Boarding Readiness Checklist
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {['Clinical Vitals Synced', 'Consent Forms Signed', 'Insurance Authorized', 'Attending Notified'].map((txt) => (
                                <div key={txt} className="flex items-center gap-3 p-4 rounded-2xl bg-surface-variant/20 border border-outline-variant/20">
                                    <div className="w-5 h-5 rounded-full bg-success/20 text-success flex items-center justify-center">
                                         <CheckCircle2 size={12} />
                                    </div>
                                    <span className="text-[11px] font-bold text-text-main uppercase tracking-tight">{txt}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-outline-variant/30" />

                    <button 
                        onClick={() => setIsConfirmed(true)}
                        className="w-full h-16 bg-primary text-white rounded-[32px] font-black text-sm uppercase tracking-widest elev-2 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4"
                    >
                        Initialize Hospital Admission
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </AdminPage>
    );
}
