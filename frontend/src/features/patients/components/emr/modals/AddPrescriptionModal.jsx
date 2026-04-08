import React, { useState } from 'react';
import { Pill, Plus, Clock, Activity, Stethoscope, Briefcase, Users as UsersIcon } from 'lucide-react';
import { Button, Modal } from '@/components/primitives';

/**
 * 💊 AddPrescriptionModal
 * Unified medication establishment portal with design parity.
 */
export default function AddPrescriptionModal({ isOpen, onClose, onRefresh }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [med, setMed] = useState({ name: '', dosage: '', freq: '1-0-1', timing: 'After Meals' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
            if (onRefresh) onRefresh();
        }, 1000);
    };

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Prescription Protocol</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <Pill size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-slate-900 dark:text-white truncate">Medication Shard</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest leading-none italic">New clinical protocol</p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Process Node</span>
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">Protocol Establish</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Shard Status</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase italic">Valid Cycle</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 opacity-20 grayscale mt-auto pt-8">
                <Stethoscope size={16} />
                <Briefcase size={16} />
                <UsersIcon size={16} />
            </div>
        </React.Fragment>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Prescription Protocol"
            subtitle="Establish new medication clinical shard"
            icon={Pill}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-5">
                    <InputField label="Medication Name" placeholder="Chemical Logic" value={med.name} onChange={(v) => setMed({...med, name: v})} required />
                    <InputField label="Dosage Matrix" placeholder="500mg / 10ml" value={med.dosage} onChange={(v) => setMed({...med, dosage: v})} required />
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <InputField label="Frequency Shard" placeholder="1-0-1" value={med.freq} onChange={(v) => setMed({...med, freq: v})} required />
                    <InputField label="Administration Timing" placeholder="After Meals" value={med.timing} onChange={(v) => setMed({...med, timing: v})} required />
                </div>

                <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 flex items-center justify-between opacity-80 italic">
                   <div className="flex items-center gap-3">
                      <Clock size={14} className="text-violet-500" />
                      <span className="text-[10px] font-black uppercase text-slate-500">Chronotherapeutic Timing Protocol</span>
                   </div>
                   <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-primary text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none italic"
                >
                    {isSubmitting ? 'Synchronizing Medication Shard...' : 'Establish Prescription Node'}
                </Button>
            </form>
        </Modal>
    );
}

function InputField({ label, ...props }) {
    return (
        <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">{label}</label>
            <input 
                {...props}
                className="w-full bg-slate-50 dark:bg-[#0f1117] p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary focus:shadow-[0_0_15px_rgba(45,212,191,0.1)] transition-all text-slate-900 dark:text-white uppercase placeholder:text-slate-300 italic"
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
}
