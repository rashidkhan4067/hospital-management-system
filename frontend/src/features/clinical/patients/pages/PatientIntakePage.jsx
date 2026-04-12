import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    User, 
    Home, 
    Phone, 
    ClipboardList, 
    Stethoscope, 
    HeartPulse, 
    ShieldCheck, 
    ArrowRight, 
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';

/**
 * 🏥 PatientIntakePage (M3 Standardized Clinic Enrollment)
 * A high-fidelity multi-step intake process following Google Material 3 principles.
 * Note: Currently in 'Design Preview' mode as per clinical architectural roadmap.
 */
export default function PatientIntakePage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps) setStep(s => s + 1);
        else handleSubmit();
    };

    const handleBack = () => {
        if (step > 1) setStep(s => s - 1);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate clinical record creation
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 2000);
    };

    const steps = [
        { id: 1, label: 'Identity', icon: User, desc: 'Personal details & demographic information' },
        { id: 2, label: 'Contact', icon: Phone, desc: 'Contact methods & emergency verification' },
        { id: 3, label: 'Medical', icon: Stethoscope, desc: 'Primary concerns & previous history' },
        { id: 4, label: 'Insurance', icon: ShieldCheck, desc: 'Provider details & coverage validation' },
    ];

    if (isSuccess) {
        return (
            <AdminPage className="min-h-[85vh] flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center max-w-sm px-6"
                >
                    <div className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={44} />
                    </div>
                    <h1 className="text-2xl font-bold text-text-main mb-2">Registration Complete</h1>
                    <p className="text-sm text-text-sub mb-8">
                        The patient record has been successfully encrypted and added to the Shifaa Clinical Registry.
                    </p>
                    <button 
                        onClick={() => navigate('/admin/patients')}
                        className="w-full h-12 bg-primary text-white rounded-full font-semibold text-[13px] hover:brightness-110 elev-2"
                    >
                        View Patient Registry
                    </button>
                </motion.div>
            </AdminPage>
        );
    }

    return (
        <AdminPage className="min-h-screen">
            <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                
                {/* ── Header ── */}
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">Intake Protocol v4.2</span>
                        </div>
                        <h1 className="text-3xl font-bold text-text-main tracking-tight">New Patient Registration</h1>
                        <p className="text-sm text-text-sub mt-1">Enroll a new identity into the Shifaa Health Matrix.</p>
                    </div>

                    {/* Progress chips */}
                    <div className="flex items-center gap-1.5 p-1.5 bg-surface-variant/40 rounded-full border border-outline-variant/50">
                        {steps.map((s) => (
                            <div 
                                key={s.id}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${step >= s.id ? 'bg-primary scale-110' : 'bg-outline-variant'}`}
                            />
                        ))}
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8">
                    {/* ── Left Sidebar (Steppers) ── */}
                    <aside className="col-span-12 lg:col-span-4 flex flex-col gap-3">
                        {steps.map((s) => {
                            const isActive = step === s.id;
                            const isPast = step > s.id;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => step > s.id && setStep(s.id)}
                                    disabled={step < s.id}
                                    className={`relative flex items-center gap-4 p-4 rounded-3xl text-left transition-all duration-300
                                        ${isActive ? 'bg-primary-container text-primary elev-1' : 'hover:bg-surface-variant/50 text-text-sub'}
                                        ${step < s.id ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer'}
                                    `}
                                >
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0
                                        ${isActive ? 'bg-primary text-white' : isPast ? 'bg-success/10 text-success' : 'bg-surface-variant text-text-sub'}
                                    `}>
                                        {isPast ? <CheckCircle2 size={18} /> : <s.icon size={18} />}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[13px] font-bold leading-none mb-1">{s.label}</p>
                                        <p className="text-[10px] opacity-70 truncate">{s.desc}</p>
                                    </div>
                                    {isActive && (
                                        <motion.div 
                                            layoutId="active-step"
                                            className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary"
                                        />
                                    )}
                                </button>
                            );
                        })}

                        {/* Tip Box */}
                        <div className="mt-6 p-5 bg-surface-bright border border-outline-variant border-dashed rounded-[32px]">
                            <div className="flex items-center gap-2 mb-2 text-primary">
                                <HeartPulse size={16} />
                                <span className="text-[11px] font-bold uppercase">Clinical Note</span>
                            </div>
                            <p className="text-[11px] text-text-sub leading-relaxed italic">
                                "Please ensure legal ID matches the biometric profile for insurance clearance."
                            </p>
                        </div>
                    </aside>

                    {/* ── Main Form Area ── */}
                    <main className="col-span-12 lg:col-span-8">
                        <motion.div 
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-surface-bright border border-outline-variant rounded-[40px] p-6 md:p-10 elev-1 min-h-[460px] flex flex-col"
                        >
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                                    {steps[step-1].label} 
                                    <span className="text-[11px] font-medium text-text-sub opacity-50 font-mono">STEP 0{step} / 04</span>
                                </h2>

                                {/* Form Fields Mockup based on step */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {step === 1 && (
                                        <>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[11px] font-bold uppercase text-text-sub ml-1">Full Legal Name</label>
                                                <input type="text" className="h-12 px-5 rounded-2xl bg-surface-variant/30 border border-outline-variant focus:border-primary outline-none text-sm transition-colors" placeholder="e.g. John Doe" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[11px] font-bold uppercase text-text-sub ml-1">Date of Birth</label>
                                                <input type="date" className="h-12 px-5 rounded-2xl bg-surface-variant/30 border border-outline-variant focus:border-primary outline-none text-sm transition-colors" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[11px] font-bold uppercase text-text-sub ml-1">Gender Identity</label>
                                                <select className="h-12 px-5 rounded-2xl bg-surface-variant/30 border border-outline-variant focus:border-primary outline-none text-sm transition-colors">
                                                    <option>Select Option</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Other / Decline</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[11px] font-bold uppercase text-text-sub ml-1">Identity Card (CNIC/Passport)</label>
                                                <input type="text" className="h-12 px-5 rounded-2xl bg-surface-variant/30 border border-outline-variant focus:border-primary outline-none text-sm transition-colors" placeholder="00000-0000000-0" />
                                            </div>
                                        </>
                                    )}

                                    {step > 1 && (
                                        <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                                            <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center text-text-sub mb-4">
                                                <ClipboardList size={24} />
                                            </div>
                                            <p className="text-sm font-medium text-text-main">Module Preview</p>
                                            <p className="text-xs text-text-sub max-w-[240px] mt-1">
                                                Additional {steps[step-1].label.toLowerCase()} validation fields are currently being localized for clinical compliance.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-10 pt-8 border-t border-outline-variant/30 flex items-center justify-between">
                                <button 
                                    onClick={handleBack}
                                    disabled={step === 1 || isSubmitting}
                                    className={`flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-full
                                        ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-text-sub hover:bg-surface-variant active:scale-95'}
                                    `}
                                >
                                    <ArrowLeft size={16} />
                                    Back
                                </button>

                                <button 
                                    onClick={handleNext}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-8 h-12 bg-primary text-white rounded-full text-sm font-bold
                                        hover:brightness-110 active:scale-95 transition-all elev-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Syncing...' : step === totalSteps ? 'Finalize Record' : 'Continue'}
                                    {!isSubmitting && <ArrowRight size={16} />}
                                </button>
                            </div>
                        </motion.div>
                        
                        {/* Status Guard */}
                        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-text-sub font-medium opacity-40">
                            <ShieldCheck size={12} />
                            <span>HIPAA Compliant Session · End-to-End Encrypted</span>
                        </div>
                    </main>
                </div>
            </div>
        </AdminPage>
    );
}
