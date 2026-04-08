import React, { useState } from 'react';
import { X, Wallet, Tag, Calendar, User, FileText, CheckCircle, Zap } from 'lucide-react';
import { Button, Card } from '@/components/primitives';

/**
 * 🌌 ExpenseModal — Fiscal Entry Node
 * Premium modal for logging clinical and operational expenses.
 */
export default function ExpenseModal({ isOpen, onClose, onRefresh }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Operating',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        vendor: '',
        description: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate fiscal propagation delay
        setTimeout(() => {
            setLoading(false);
            onRefresh?.();
            onClose();
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 animate-in fade-in duration-300">
            {/* Backdrop Shard */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Shard */}
            <Card className="relative w-full max-w-2xl bg-white dark:bg-[#0A0D10] border-none rounded-[3rem] shadow-2xals overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                
                {/* Visual Left Shard (Aesthetic Context) */}
                <div className="w-full md:w-[35%] bg-slate-900 text-white p-8 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/20 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                    
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10 mb-6 italic group-hover:rotate-6 transition-transform">
                            <Wallet size={24} />
                        </div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none mb-2">Fiscal Log Node</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">System-wide expenditure synchronization engine.</p>
                    </div>

                    <div className="relative z-10 mt-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle size={14} className="text-emerald-500" />
                                <p className="text-[9px] font-black uppercase tracking-wider italic text-slate-300">Audit Compliance Meta</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle size={14} className="text-emerald-500" />
                                <p className="text-[9px] font-black uppercase tracking-wider italic text-slate-300">Real-time Balance Adjustment</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Zap size={14} className="text-accent-primary" />
                                <p className="text-[9px] font-black uppercase tracking-wider italic text-slate-400">Propagating to Analytics Hub</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto relative z-10 text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 italic">
                        Al Shifaa Financials v4.2
                    </div>
                </div>

                {/* Interaction Right Shard (Form) */}
                <div className="flex-1 p-8 lg:p-10 flex flex-col">
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all z-20"
                    >
                        <X size={20} />
                    </button>

                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
                        <div className="space-y-1 mb-2">
                           <h4 className="text-[12px] font-black uppercase italic tracking-widest text-accent-primary leading-none">Expenditure Entry</h4>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Provide accurate telemetry for the fiscal matrix.</p>
                        </div>

                        {/* Input Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5 flex flex-col">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 italic group-hover:text-accent-primary transition-colors">Expense Description</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors">
                                        <FileText size={14} />
                                    </div>
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="e.g. Server Maintenance"
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-[13px] font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all font-display italic"
                                        value={formData.title}
                                        onChange={e => setFormData({...formData, title: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 flex flex-col">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 italic">Category Node</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors">
                                        <Tag size={14} />
                                    </div>
                                    <select 
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-[13px] font-bold text-slate-900 dark:text-white focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all font-display italic appearance-none"
                                        value={formData.category}
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                    >
                                        <option value="Operating">Operating</option>
                                        <option value="Inventory">Inventory Shard</option>
                                        <option value="Salary">Payroll Matrix</option>
                                        <option value="Maintenance">Infrastructure</option>
                                        <option value="Software">Digital Assets</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5 flex flex-col">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 italic">Fiscal Value (Rs.)</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors">
                                        <Wallet size={14} />
                                    </div>
                                    <input 
                                        required
                                        type="number" 
                                        placeholder="0.00"
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-[13px] font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all font-display italic"
                                        value={formData.amount}
                                        onChange={e => setFormData({...formData, amount: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 flex flex-col">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 italic">Effective Date</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors">
                                        <Calendar size={14} />
                                    </div>
                                    <input 
                                        type="date" 
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-[13px] font-bold text-slate-900 dark:text-white focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all font-display italic"
                                        value={formData.date}
                                        onChange={e => setFormData({...formData, date: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 space-y-1.5 flex flex-col">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 italic">Entity Shard (Vendor / Staff)</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors">
                                        <User size={14} />
                                    </div>
                                    <input 
                                        placeholder="Identification of fiscal recipient..."
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-[13px] font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all font-display italic"
                                        value={formData.vendor}
                                        onChange={e => setFormData({...formData, vendor: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CTA Cluster */}
                        <div className="mt-auto pt-4 flex gap-4">
                            <Button 
                                type="button" 
                                onClick={onClose}
                                className="flex-1 bg-white dark:bg-white/5 text-slate-500 dark:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 rounded-2xl py-6 text-[10px] font-black uppercase tracking-widest italic transition-all group font-display"
                            >
                                <X size={14} className="mr-2 group-hover:rotate-90 transition-transform" /> Abort Node
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="flex-[1.5] bg-accent-primary text-white border-none hover:brightness-110 rounded-2xl py-6 text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-accent-primary/20 transition-all active:scale-95 flex items-center justify-center font-display"
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <CheckCircle size={14} className="mr-2" /> Dispatch Entry
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
}
