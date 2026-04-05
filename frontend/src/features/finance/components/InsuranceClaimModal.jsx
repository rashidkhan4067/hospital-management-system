import React from 'react';
import { ShieldCheck, User, Briefcase, FileText, Plus, Zap } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import TransactionModal from './TransactionModal';

/**
 * 🛡️ Insurance Claim Modal
 * High-fidelity hub for managing clinical insurance nodes.
 * Professional registry for filing and tracking clinical policy claims check mapping.
 */
export default function InsuranceClaimModal({ 
    isOpen, 
    onClose, 
    onAction, 
    isSubmitting, 
    invoice = {},
    formData = {},
    setFormData
}) {
    const handleUpdate = (field, value) => {
        setFormData?.({ ...formData, [field]: value });
    };

    return (
        <TransactionModal
            isOpen={isOpen}
            onClose={onClose}
            title="Policy Node Registry"
            subtitle={`Filing claim for INV-${invoice.id?.toString().padStart(6, '0')}`}
            icon={ShieldCheck}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={onAction} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                
                {/* 1. Policy Identity Node */}
                <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Policy Selection Shard</label>
                    <div className="relative group">
                        <select 
                            required
                            className="w-full bg-slate-50 dark:bg-slate-900/40 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all appearance-none cursor-pointer text-slate-900 dark:text-white h-[53px] italic uppercase"
                            value={formData.policy || ''}
                            onChange={(e) => handleUpdate('policy', e.target.value)}
                        >
                            <option value="">Select Insurance Provider Node</option>
                            <option value="ALLIANZ">Allianz Health Matrix</option>
                            <option value="EFU">EFU Clinical Ledger</option>
                            <option value="JUBILEE">Jubilee Life Shard</option>
                            <option value="ADAMJEE">Adamjee Health Node</option>
                        </select>
                        <ShieldCheck size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-accent-primary pointer-events-none group-focus-within:rotate-12 transition-all" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Policy Number Shard</label>
                        <div className="relative group">
                            <input 
                                required
                                placeholder="POL-8292-XXXX"
                                className="w-full bg-slate-50 dark:bg-slate-900/40 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white h-[53px] italic"
                                value={formData.policy_number || ''}
                                onChange={(e) => handleUpdate('policy_number', e.target.value)}
                            />
                            <FileText size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-secondary" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Claim Intensity</label>
                        <select 
                            required
                            className="w-full bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white h-[53px] italic uppercase"
                            value={formData.priority || 'NORMAL'}
                            onChange={(e) => handleUpdate('priority', e.target.value)}
                        >
                            <option value="NORMAL">Standard Processing</option>
                            <option value="URGENT">Accelerated Registry</option>
                            <option value="CRITICAL">Immediate Propagation</option>
                        </select>
                    </div>
                </div>

                {/* 2. Fiscal Adjustment Shard */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Adjusted Claim Coverage (%)</label>
                    <div className="flex items-center gap-4">
                        <input 
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            className="flex-1 accent-accent-primary"
                            value={formData.coverage || 80}
                            onChange={(e) => handleUpdate('coverage', e.target.value)}
                        />
                        <div className="w-16 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary text-[12px] font-black tabular-nums border border-accent-primary/10">
                            {formData.coverage || 80}%
                        </div>
                    </div>
                </div>

                {/* 3. Global Node Commit */}
                <div className="pt-4">
                    <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-accent-primary text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl shadow-accent-primary/25 border-none hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 italic font-display"
                    >
                        {isSubmitting ? 'Propagating Claim Shard...' : 'Commit Claim Registry'}
                    </Button>
                </div>

                <div className="flex items-center justify-center gap-3 opacity-30 mt-2">
                    <Zap size={14} className="text-accent-secondary" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Real-time Payer Synchronization Active</span>
                </div>
            </form>
        </TransactionModal>
    );
}
