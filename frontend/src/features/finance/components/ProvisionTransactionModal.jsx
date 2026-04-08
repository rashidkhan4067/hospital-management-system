import React from 'react';
import { Activity, ArrowRight, CreditCard, DollarSign, Briefcase } from 'lucide-react';
import { Button } from '@/components/primitives';
import TransactionModal from './TransactionModal';

/**
 * 💹 Fiscal Initialization Hub
 * Modular provisioner for committing new financial shards with design parity.
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
            title="Fiscal Protocol"
            subtitle="Secure financial shard synchronization"
            icon={CreditCard}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={onAction} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Relational Identity Shard</label>
                    <div className="relative group">
                        <select 
                            required
                            className="w-full bg-slate-50 dark:bg-[#0f1117] p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all appearance-none cursor-pointer text-slate-900 dark:text-white h-[53px] italic uppercase"
                            value={formData.patient}
                            onChange={(e) => setFormData({...formData, patient: e.target.value})}
                        >
                            <option value="">Select Target Identity Matrix</option>
                            {patients.map(p => (
                                <option key={p.id} value={p.id}>{p.full_name || p.name}</option>
                            ))}
                        </select>
                        <ArrowRight size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-accent-primary transition-colors" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Value Matrix (PKR)</label>
                        <div className="relative group">
                            <input 
                                type="number"
                                required
                                placeholder="0.00"
                                className="w-full bg-slate-50 dark:bg-[#0f1117] p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[13px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white italic h-[53px]"
                                value={formData.amount}
                                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-primary flex items-center justify-center">
                               <DollarSign size={16} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Audit Node Category</label>
                        <select 
                            className="w-full bg-slate-50 dark:bg-[#0f1117] p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black outline-none focus:border-accent-primary transition-all cursor-pointer text-slate-900 dark:text-white italic uppercase h-[53px] appearance-none"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <option value="INCOME">Clinical Revenue Hub</option>
                            <option value="EXPENSE">System Outflow Shard</option>
                            <option value="REFUND">Relational Refund Node</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Payment Shard Sync Channel</label>
                    <div className="relative group">
                        <select 
                            className="w-full bg-slate-50 dark:bg-[#0f1117] p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black outline-none focus:border-accent-primary transition-all cursor-pointer text-slate-900 dark:text-white italic uppercase h-[53px] appearance-none"
                            value={formData.method}
                            onChange={(e) => setFormData({...formData, method: e.target.value})}
                        >
                            <option value="CARD">Digital Stripe Matrix</option>
                            <option value="CASH">Physical Currency Hub</option>
                            <option value="INSURANCE">Insurance Policy Node</option>
                            <option value="TRANSFER">Internal Node Transfer</option>
                        </select>
                        <Briefcase size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-accent-primary transition-colors" />
                    </div>
                </div>

                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-accent-primary text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl shadow-accent-primary/25 border-none hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 italic font-display"
                >
                    {isSubmitting ? 'Synchronizing Fiscal Node...' : 'Commit Protocol Shard'}
                </Button>
            </form>
        </TransactionModal>
    );
}
