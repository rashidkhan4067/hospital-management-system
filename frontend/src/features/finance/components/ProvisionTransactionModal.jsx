import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import TransactionModal from './TransactionModal';

/**
 * 💹 Fiscal Initialization Hub
 * Modular provisioner for committing new financial shards.
 * Re-mapped to the Global Financial Modal Registry.
 */
export default function ProvisionTransactionModal({ 
    isOpen, 
    onClose, 
    onAction, 
    isSubmitting, 
    patients = [],
    formData,
    setFormData
}) {
    return (
        <TransactionModal
            isOpen={isOpen}
            onClose={onClose}
            title="Node Protocol"
            subtitle="Fiscal Initialization Hub"
            icon={Activity}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={onAction} className="space-y-8">
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Relational Identity Shard</label>
                    <div className="relative">
                        <select 
                            required
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-[24px] border border-slate-200 dark:border-white/5 text-[13px] font-extrabold outline-none focus:ring-4 focus:ring-accent-primary/10 focus:border-accent-primary transition-all appearance-none cursor-pointer text-slate-900 dark:text-white shadow-inner"
                            value={formData.patient}
                            onChange={(e) => setFormData({...formData, patient: e.target.value})}
                        >
                            <option value="">Select Target Identity</option>
                            {patients.map(p => (
                                <option key={p.id} value={p.id}>{p.full_name}</option>
                            ))}
                        </select>
                        <ArrowRight size={14} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Value Matrix (PKR)</label>
                        <div className="relative">
                            <input 
                                type="number"
                                required
                                placeholder="0.00"
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 pl-14 rounded-[24px] border border-slate-200 dark:border-white/5 text-[16px] font-black outline-none focus:ring-4 focus:ring-accent-primary/10 focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                                value={formData.amount}
                                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            />
                            <span className="absolute left-7 top-1/2 -translate-y-1/2 text-accent-primary font-black text-xs">Rs.</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Audit Shard Category</label>
                        <select 
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-[24px] border border-slate-200 dark:border-white/5 text-[13px] font-extrabold outline-none focus:ring-4 focus:ring-accent-primary/10 focus:border-accent-primary transition-all cursor-pointer text-slate-900 dark:text-white shadow-inner"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <option value="INCOME">Clinical Revenue</option>
                            <option value="EXPENSE">System Outflow</option>
                            <option value="REFUND">Relational Refund</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Payment Shard Sync Channel</label>
                    <select 
                        className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-[24px] border border-slate-200 dark:border-white/5 text-[13px] font-extrabold outline-none focus:ring-4 focus:ring-accent-primary/10 focus:border-accent-primary transition-all cursor-pointer text-slate-900 dark:text-white shadow-inner"
                        value={formData.method}
                        onChange={(e) => setFormData({...formData, method: e.target.value})}
                    >
                        <option value="CARD">Digital Stripe Node</option>
                        <option value="CASH">Physical Currency</option>
                        <option value="INSURANCE">Insurance Policy Sync</option>
                        <option value="TRANSFER">Internal Node Transfer</option>
                    </select>
                </div>

                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-accent-primary text-white p-8 rounded-[32px] text-[12px] font-black uppercase tracking-[0.5em] shadow-2xl shadow-accent-primary/40 border-none hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-10"
                >
                    {isSubmitting ? 'Syncing Node...' : 'Commit Transaction Protocol'}
                </Button>
            </form>
        </TransactionModal>
    );
}
