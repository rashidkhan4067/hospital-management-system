import React from 'react';
import { Card, Button } from '@/components/primitives';
import { 
    Plus, CreditCard, Receipt, FileText, 
    ShieldCheck, Zap, Activity, Filter,
    Download, PieChart, TrendingUp
} from 'lucide-react';
import UnifiedProtocolShard from '@/components/composed/UnifiedProtocolShard';

/**
 * 🛰 BILLING SIDEBAR SHARD
 * High-fidelity command node for invoice orchestration.
 * Unified with core accent theme variables.
 */
export default function BillingSidebar({ onCreateInvoice, stats = {} }) {
    return (
        <div className="flex flex-col gap-6 w-full sticky top-8 pb-10">
            
            {/* 1. Quick Financial Actions */}
            <Card className="p-7 rounded-[2.5rem] bg-slate-900 border border-slate-800 text-white flex flex-col gap-4 relative overflow-hidden group shadow-2als transition-all hover:bg-slate-950">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[80px] rounded-full pointer-events-none" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] italic leading-none opacity-40">Fiscal Actions</h4>
                
                <div className="flex flex-col gap-3.5 relative z-10">
                    <button 
                        onClick={onCreateInvoice}
                        className="w-full py-4 rounded-2xl bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-black/10 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 border-none"
                    >
                        <Plus size={16} strokeWidth={3} /> Create Invoice
                    </button>
                    <button 
                        className="w-full py-4 rounded-2xl bg-white/10 text-white text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-3 transition-all hover:bg-white/20 border-none"
                    >
                        <Download size={16} /> Batch Export
                    </button>
                </div>
            </Card>

            {/* 2. Collection Velocity Matrix */}
            <Card className="p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic leading-none">Collection Velocity</h4>
                    <TrendingUp size={14} className="text-accent-primary" />
                </div>
                <div className="space-y-6">
                    {[
                        { label: 'Patient Pay', value: stats.patient_pay || 0, color: 'bg-accent-primary', total: 100 },
                        { label: 'Insurance', value: stats.insurance || 0, color: 'bg-accent-secondary', total: 100 },
                        { label: 'Other Subsidy', value: stats.subsidy || 0, color: 'bg-amber-500', total: 100 }
                    ].map((item, idx) => (
                        <div key={idx} className="space-y-3">
                            <div className="flex justify-between text-[11px] font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-none">
                                <span>{item.label}</span>
                                <span className={item.color.replace('bg-', 'text-') + ' tabular-nums'}>{item.value}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner flex">
                                <div 
                                    className={`h-full transition-all duration-1000 ${item.color}`}
                                    style={{ width: `${item.value}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* 3. Aging Registry Legend */}
            <Card className="p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm space-y-6">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic leading-none">Aging Registry</h4>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { label: '0-30 Days', value: '72%', status: 'optimal', color: 'text-accent-primary' },
                        { label: '31-60 Days', value: '18%', status: 'buffer', color: 'text-accent-secondary' },
                        { label: '61-90 Days', value: '6%', status: 'alert', color: 'text-orange-500' },
                        { label: 'Over 90', value: '4%', status: 'critical', color: 'text-rose-500' }
                    ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col gap-2">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">{item.label}</span>
                            <span className={`text-[14px] font-black italic tracking-tighter tabular-nums leading-none ${item.color}`}>{item.value}</span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* 4. Financial Protocol Shard */}
            <UnifiedProtocolShard 
                variant="primary"
                title="Fiscal Protocol"
                message="All billing operations follow strict clinical audit standardization."
                icon={ShieldCheck}
            />

        </div>
    );
}
