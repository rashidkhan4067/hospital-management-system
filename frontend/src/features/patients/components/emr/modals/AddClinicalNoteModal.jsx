import React, { useState } from 'react';
import { ClipboardList, Activity, ShieldCheck, FileText, Stethoscope, Briefcase, Users as UsersIcon } from 'lucide-react';
import { Button, Modal } from '@/components/primitives';

/**
 * 📝 AddClinicalNoteModal
 * Secure clinical observation commit matrix with unified design parity.
 */
export default function AddClinicalNoteModal({ isOpen, onClose, onRefresh }) {
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Clinical Observation</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <ClipboardList size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-slate-900 dark:text-white truncate">Observation Shard</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest leading-none italic">New clinical note commit</p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Process Node</span>
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">Note Establishment</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Shard Status</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase italic">Authorized Node</span>
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
            title="Clinical Observation"
            subtitle="Secure diagnostic note commit"
            icon={ClipboardList}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Diagnostic Text Shard</label>
                    <textarea 
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Establish clinical observations here..."
                        className="w-full bg-slate-50 dark:bg-[#0f1117] p-5 rounded-[2rem] border border-slate-200 dark:border-white/5 text-[12px] font-bold outline-none focus:border-accent-primary focus:shadow-[0_0_15px_rgba(45,212,191,0.1)] transition-all text-slate-900 dark:text-white uppercase placeholder:text-slate-300 italic min-h-[200px] resize-none"
                        required
                    />
                </div>

                <div className="p-5 rounded-2xl bg-accent-primary/5 border border-accent-primary/10 flex items-center gap-4 opacity-80">
                   <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                      <Activity size={18} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-700 dark:text-white uppercase tracking-tight italic">Protocol Authorization</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">Identified Signature Shard Required</p>
                   </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-primary text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none italic"
                >
                    {isSubmitting ? 'Synchronizing Observation...' : 'Commit Diagnostic Shard'}
                </Button>
            </form>
        </Modal>
    );
}
