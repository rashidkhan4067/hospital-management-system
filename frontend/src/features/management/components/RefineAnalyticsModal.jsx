import React, { useState } from 'react';
import { 
    Filter,
    Calendar,
    Target,
    Activity,
    Layers,
    Shield,
    Database,
    Clock,
    Zap
} from 'lucide-react';
import { Button, Modal } from '@/shared/components/ui';

/**
 * 🧹 Refine Matrix Modal
 * Precision filtering of analytical shards and data kernels.
 */
export default function RefineAnalyticsModal({ isOpen, onClose, onAction, isSubmitting }) {
    const [filters, setFilters] = useState({
        metricRange: '30D',
        dataSensitivity: 'L3',
        visualResolution: 'high',
        optimizeFor: 'speed'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAction(filters);
    };

    const sidebar = (
        <div className="flex flex-col h-full">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary mb-6">Matrix Optimization</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Filter size={18} />
                </div>
                <div>
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">Precision Gateway</p>
                    <p className="text-[8px] font-bold text-text-secondary uppercase mt-1 tracking-widest">Protocol tuning</p>
                </div>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-2 text-text-secondary/40">
                <Zap size={14} className="text-amber-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-widest">Al Shifaa Engine v4.2</span>
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Refine Analytics Matrix"
            subtitle="Protocol Selection & Precision Tuning"
            icon={Target}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    {/* Range Selection */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Temporal Shard Size</label>
                        <div className="grid grid-cols-4 gap-4">
                            {['24H', '7D', '30D', '90D'].map(range => (
                                <button
                                    key={range}
                                    type="button"
                                    onClick={() => setFilters({ ...filters, metricRange: range })}
                                    className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        filters.metricRange === range 
                                        ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-105' 
                                        : 'bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-accent-primary'
                                    }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Data Sensitivity */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Data Depth Control</label>
                        <div className="relative group">
                            <select
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 pl-14 rounded-3xl border border-slate-200 dark:border-white/5 text-[11px] font-black uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none cursor-pointer h-16 shadow-inner"
                                value={filters.dataSensitivity}
                                onChange={(e) => setFilters({ ...filters, dataSensitivity: e.target.value })}
                            >
                                <option value="L1">L1: Operational Pulse</option>
                                <option value="L2">L2: Transactional Mesh</option>
                                <option value="L3" selected>L3: Advanced Analytical Shard</option>
                                <option value="L4">L4: Forensic Identity Audit</option>
                            </select>
                            <Shield size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors" />
                        </div>
                    </div>

                    {/* Optimization toggle */}
                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Logic Optimization</label>
                            <div className="flex bg-slate-50 dark:bg-white/5 p-2 rounded-2xl border border-slate-200 dark:border-white/5">
                                <button
                                    type="button"
                                    onClick={() => setFilters({ ...filters, optimizeFor: 'speed' })}
                                    className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${filters.optimizeFor === 'speed' ? 'bg-white dark:bg-slate-800 text-accent-primary shadow-sm' : 'text-slate-400'}`}
                                >
                                    Speed
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFilters({ ...filters, optimizeFor: 'accuracy' })}
                                    className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${filters.optimizeFor === 'accuracy' ? 'bg-white dark:bg-slate-800 text-accent-primary shadow-sm' : 'text-slate-400'}`}
                                >
                                    Accuracy
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Visual Refresh Node</label>
                            <button
                                type="button"
                                onClick={() => setFilters({ ...filters, visualResolution: filters.visualResolution === 'high' ? 'standard' : 'high' })}
                                className={`w-full py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 ${
                                    filters.visualResolution === 'high' 
                                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' 
                                    : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-400'
                                }`}
                            >
                                <Zap size={14} className={filters.visualResolution === 'high' ? 'fill-emerald-500 anim-pulse' : ''} />
                                High Fidelity Render
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-end gap-6">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-none"
                    >
                        Decline
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-accent-primary text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/25 border-none hover:scale-105 active:scale-95 transition-all"
                    >
                        Sync New Matrix
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
