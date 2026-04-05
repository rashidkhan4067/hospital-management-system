import React from 'react';
import { Receipt, User, DollarSign, Calendar, Briefcase, FileText } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import TransactionModal from './TransactionModal';

/**
 * 🧾 Create Invoice Modal
 * High-fidelity hub for registering new clinical invoices.
 * Standardized with Sidebar-Summary layout and design parity.
 */
export default function CreateInvoiceModal({ 
    isOpen, 
    onClose, 
    onAction, 
    isSubmitting, 
    patients = [],
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
            title="Invoice Registry"
            subtitle="Generating clinical fiscal node"
            icon={Receipt}
            maxWidth="max-w-4xl"
        >
            <form onSubmit={onAction} className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                
                {/* 1. Recipient Shard */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Patient Identity Node</label>
                    <div className="relative group">
                        <select 
                            required
                            className="w-full bg-slate-50 dark:bg-slate-900/40 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all appearance-none cursor-pointer text-slate-900 dark:text-white h-[53px] italic uppercase"
                            value={formData.patient || ''}
                            onChange={(e) => handleUpdate('patient', e.target.value)}
                        >
                            <option value="">Select Target Registry Shard</option>
                            {patients.map(p => (
                                <option key={p.id} value={p.id}>{p.full_name || p.name}</option>
                            ))}
                        </select>
                        <User size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-accent-primary pointer-events-none group-focus-within:rotate-12 transition-all" />
                    </div>
                </div>

                {/* 2. Fiscal Values */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Base Amount (PKR)</label>
                    <div className="relative group">
                        <input 
                            type="number"
                            required
                            placeholder="0.00"
                            className="w-full bg-slate-50 dark:bg-slate-900/40 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[13px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white italic h-[53px]"
                            value={formData.amount || ''}
                            onChange={(e) => handleUpdate('amount', e.target.value)}
                        />
                        <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-primary" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Billing Cycle Node</label>
                    <div className="relative group">
                        <input 
                            type="date"
                            required
                            className="w-full bg-slate-50 dark:bg-slate-900/40 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white h-[53px] italic"
                            onChange={(e) => handleUpdate('due_date', e.target.value)}
                        />
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-secondary" />
                    </div>
                </div>

                {/* 3. Service Taxonomy */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Service Description Shard</label>
                    <textarea 
                        required
                        placeholder="Detail clinical services, consultations, or medication nodes..."
                        className="w-full bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white min-h-[100px] italic resize-none"
                        value={formData.description || ''}
                        onChange={(e) => handleUpdate('description', e.target.value)}
                    />
                </div>

                {/* 4. Protocol Category */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Billing Protocol</label>
                    <div className="grid grid-cols-3 gap-3">
                        {['Standard', 'Urgent', 'Subsidy'].map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => handleUpdate('protocol', type)}
                                className={`py-4 rounded-2xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                                    formData.protocol === type 
                                    ? 'bg-accent-primary/10 border-accent-primary text-accent-primary shadow-lg shadow-accent-primary/5' 
                                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-white/5 text-slate-400'
                                }`}
                            >
                                {type} Node
                            </button>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2 pt-4">
                    <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-accent-primary text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl shadow-accent-primary/25 border-none hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 italic font-display"
                    >
                        {isSubmitting ? 'Synchronizing Invoice Matrix...' : 'Commit Invoice Protocol'}
                    </Button>
                </div>
            </form>
        </TransactionModal>
    );
}
