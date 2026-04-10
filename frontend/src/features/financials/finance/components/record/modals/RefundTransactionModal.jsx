import React, { useState } from 'react';
import { RefreshCcw, ShieldCheck, AlertTriangle, DollarSign, Activity, Stethoscope, Briefcase, Users as UsersIcon } from 'lucide-react';
import { Button, Modal } from '@/components/primitives';

/**
 * ☢️ RefundTransactionModal
 * Secure fiscal reversal protocol with design parity.
 */
export default function RefundTransactionModal({ isOpen, onClose, txn, onRefresh }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reason, setReason] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
            if (onRefresh) onRefresh();
        }, 1500);
    };

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-400 mb-6 italic">Reversal Protocol</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-rose-500/10 space-y-4 mb-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 shadow-inner">
                    <RefreshCcw size={18} />
                </div>
                <div>
                    <p className="text-[12px] font-black text-rose-900 dark:text-rose-500 uppercase tracking-tight font-display italic">Fiscal Reversal</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest leading-none italic">Shard purgal node active</p>
                </div>
            </div>

            <div className="space-y-4 px-2 pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Reversal Sum</span>
                    <span className="text-[10px] font-black text-rose-500 uppercase italic">Rs. {txn?.amount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Shard Registry</span>
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">ID #{txn?.id}</span>
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
            title="Fiscal Reversal"
            subtitle="Purge relational transaction shard"
            icon={RefreshCcw}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="p-5 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-5">
                   <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                      <AlertTriangle size={22} />
                   </div>
                   <div>
                      <p className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-tight font-display italic">Destructive Shard Protocol</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 leading-relaxed">
                         Proceeding with this reversal will permanently negate the fiscal value shard associated with this identity.
                      </p>
                   </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Reversal Justification Matrix</label>
                    <textarea 
                        required
                        rows="4"
                        placeholder="Establish reversal intent..."
                        className="w-full bg-slate-50 dark:bg-[#0f1117] p-5 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-rose-500 transition-all text-slate-900 dark:text-white uppercase placeholder:text-slate-300 italic resize-none"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </div>

                <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-between opacity-80 italic">
                   <div className="flex items-center gap-3">
                      <ShieldCheck size={14} className="text-rose-500" />
                      <span className="text-[10px] font-black uppercase text-slate-500">L9 Reversal Authorization</span>
                   </div>
                   <div className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-[8px] font-black uppercase tracking-widest">
                      Audit Lock Active
                   </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-rose-500 text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl shadow-rose-500/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none italic font-display"
                >
                    {isSubmitting ? 'Purging Fiscal Shard...' : 'Commit Reversal Protocol'}
                </Button>
            </form>
        </Modal>
    );
}
