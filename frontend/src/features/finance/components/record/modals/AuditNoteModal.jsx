import React, { useState } from 'react';
import { ShieldCheck, FileText, Activity, Stethoscope, Briefcase, Users as UsersIcon } from 'lucide-react';
import { Button, Modal } from '@/shared/components/ui';

/**
 * 📝 AuditNoteModal
 * Secure fiscal observation commit matrix with design parity.
 */
export default function AuditNoteModal({ isOpen, onClose, txn, onRefresh }) {
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
        }, 1200);
    };

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 italic">Fiscal Observation</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 mb-8 animate-in fade-in zoom-in-95 duration-500 shadow-accent-primary/5">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
                    <FileText size={18} />
                </div>
                <div>
                    <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-tight font-display italic">Audit Shard</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest leading-none italic italic">New node observation</p>
                </div>
            </div>

            <div className="space-y-4 px-2 pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Protocol</span>
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">Fiscal Sync</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Shard Status</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase italic">Active Log</span>
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
            title="Fiscal Observation"
            subtitle="Secure audit note commit matrix"
            icon={FileText}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Audit Note Shard</label>
                    <textarea 
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Establish fiscal observations here..."
                        className="w-full bg-slate-50 dark:bg-[#0f1117] p-5 rounded-[2rem] border border-slate-200 dark:border-white/5 text-[12px] font-bold outline-none focus:border-accent-primary focus:shadow-[0_0_15px_rgba(45,212,191,0.1)] transition-all text-slate-900 dark:text-white uppercase placeholder:text-slate-300 italic min-h-[200px] resize-none"
                        required
                    />
                </div>

                <div className="p-5 rounded-2xl bg-accent-primary/5 border border-accent-primary/10 flex items-center gap-4 opacity-80">
                   <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                      <Activity size={18} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-700 dark:text-white uppercase tracking-tight italic font-display">Protocol Authorization</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">Identified Signature Shard Required</p>
                   </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-primary text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none italic font-display"
                >
                    {isSubmitting ? 'Synchronizing Observation...' : 'Commit Audit Shard'}
                </Button>
            </form>
        </Modal>
    );
}
