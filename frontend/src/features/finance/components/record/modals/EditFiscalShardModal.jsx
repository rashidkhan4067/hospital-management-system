import React, { useState, useEffect } from 'react';
import { Edit3, DollarSign, Activity, CreditCard, ShieldCheck, Stethoscope, Briefcase, Users as UsersIcon } from 'lucide-react';
import { Button, Modal } from '@/shared/components/ui';

/**
 * 🛠 EditFiscalShardModal
 * Unified modification portal for established fiscal shards with design parity.
 */
export default function EditFiscalShardModal({ isOpen, onClose, txn, onRefresh }) {
    const [formData, setFormData] = useState({
        amount: '',
        type: '',
        method: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (txn) {
            setFormData({
                amount: txn.amount || '',
                type: txn.type || '',
                method: txn.method || '',
                description: txn.description || ''
            });
        }
    }, [txn]);

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
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 italic">Shard Recalibration</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 mb-8 animate-in fade-in zoom-in-95 duration-500 shadow-accent-primary/5">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
                    <Edit3 size={18} />
                </div>
                <div>
                    <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-tight font-display italic">Recalibrate Shard</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest leading-none italic italic">ID #{txn?.id}</p>
                </div>
            </div>

            <div className="space-y-4 px-2 pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Protocol</span>
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase transition-all">ID Recalibration</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Shard Status</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase italic italic">Authorized Node</span>
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
            title="Recalibrate Fiscal Node"
            subtitle="Secure modification of established fiscal shard"
            icon={Edit3}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Value Matrix (PKR)</label>
                        <div className="relative group">
                            <input 
                                type="number"
                                required
                                className="w-full bg-slate-50 dark:bg-[#0f1117] p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[13px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white italic h-[53px]"
                                value={formData.amount}
                                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-primary">
                               <DollarSign size={16} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Audit Category Node</label>
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
                        <CreditCard size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-accent-primary transition-colors" />
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-between opacity-80 italic">
                   <div className="flex items-center gap-3">
                      <ShieldCheck size={14} className="text-accent-primary" />
                      <span className="text-[10px] font-black uppercase text-slate-500">Recalibration Authorization Hardened</span>
                   </div>
                   <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-primary text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none italic font-display"
                >
                    {isSubmitting ? 'Synchronizing Recalibration...' : 'Commit Recalibration Protocol'}
                </Button>
            </form>
        </Modal>
    );
}
