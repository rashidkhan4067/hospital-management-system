import React from 'react';
import { CreditCard, DollarSign, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import TransactionModal from './TransactionModal';

/**
 * 💳 Settle Payment Modal
 * High-fidelity hub for processing clinical fiscal nodes.
 * Specialized for marking invoices as cleared check mapping.
 */
export default function SettlePaymentModal({ 
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
            title="Fiscal Settlement"
            subtitle={`Consolidating INV-${invoice.id?.toString().padStart(6, '0')}`}
            icon={CreditCard}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={onAction} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                
                {/* 1. Value Node Overview */}
                <div className="p-7 rounded-[2.5rem] bg-accent-primary/10 border border-accent-primary/10 flex flex-col items-center justify-center gap-4 group">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary/60 italic leading-none">Settlement Shard Amount</p>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter tabular-nums leading-none">Rs. {Number(invoice.amount).toLocaleString()}</span>
                        <Zap size={20} className="text-accent-primary animate-pulse fill-accent-primary" />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Payment Protocol Channel</label>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { id: 'CASH', label: 'Physical Matrix', sub: 'Hub Node' },
                            { id: 'CARD', label: 'Digital Stripe', sub: 'External Shard' },
                            { id: 'TRANSFER', label: 'Node Sync', sub: 'Internal Protocol' },
                            { id: 'INSURANCE', label: 'Policy Node', sub: 'Claim Registry' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleUpdate('method', item.id)}
                                className={`p-5 rounded-3xl border flex flex-col items-start gap-1 transition-all ${
                                    formData.method === item.id 
                                    ? 'bg-accent-primary border-accent-primary text-white shadow-xl shadow-accent-primary/20' 
                                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-white/5 text-slate-400 hover:border-slate-300 dark:hover:border-white/20'
                                }`}
                            >
                                <span className={`text-[12px] font-black uppercase italic tracking-tighter ${formData.method === item.id ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{item.label}</span>
                                <p className={`text-[8px] font-bold uppercase tracking-widest leading-none ${formData.method === item.id ? 'text-white/60' : 'text-slate-400 dark:text-slate-500'}`}>{item.sub}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Audit Node Metadata */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Node Synchronization Note</label>
                    <div className="relative">
                        <textarea 
                            placeholder="Add clinical audit note or settlement reference..."
                            className="w-full bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white min-h-[100px] italic resize-none"
                            value={formData.note || ''}
                            onChange={(e) => handleUpdate('note', e.target.value)}
                        />
                    </div>
                </div>

                {/* 3. Global Commit Shard */}
                <div className="pt-4">
                    <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-accent-primary text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl shadow-accent-primary/25 border-none hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 italic font-display"
                    >
                        {isSubmitting ? 'Synchronizing Fiscal Registry...' : 'Finalize Settlement Shard'}
                    </Button>
                </div>

                <div className="flex items-center justify-center gap-2 opacity-40">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Clinical Audit Standard Verified</span>
                </div>
            </form>
        </TransactionModal>
    );
}
