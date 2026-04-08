import React from 'react';
import { Card, Badge, Button } from '@/components/primitives';
import { 
    CreditCard, Calendar, Clock, User, 
    FileText, ShieldCheck, Zap, Download, Printer 
} from 'lucide-react';

/**
 * 🛰 Billing Summary Shard
 * Professional detail overview of an invoice node.
 * Designed for the Billing Record Page side column check mapping mapping.
 */
export default function BillingSummaryShard({ invoice = {} }) {
    return (
        <Card className="p-8 rounded-[2.5rem] bg-white dark:bg-white/[0.03] space-y-8 border border-slate-200 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-secondary/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-accent-secondary/10 border border-accent-secondary/20 flex items-center justify-center text-accent-secondary shadow-inner transition-transform group-hover:scale-110">
                    <FileText size={28} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-[14px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic font-display leading-none">Invoice Node</h3>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-60 italic">Fiscal Propagation Matrix</p>
                </div>
            </div>

            <div className="space-y-5 pt-4 border-t border-slate-100 dark:border-white/5 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <Calendar size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Issued Node</span>
                    </div>
                    <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tabular-nums">{invoice.date || '2026-04-05'}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Temporal Cycle</span>
                    </div>
                    <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase italic">30 Days Maturity</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <CreditCard size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Channel Mode</span>
                    </div>
                    <Badge className="bg-accent-secondary/10 text-accent-secondary text-[8px] font-black uppercase italic border-none px-3">{invoice.method || 'Digital Shard'}</Badge>
                </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col gap-5 relative z-10">
                <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Clinical Identity</span>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-secondary/20 text-[10px] font-black flex items-center justify-center text-accent-secondary italic">PA</div>
                        <span className="text-[12px] font-black text-slate-800 dark:text-white uppercase italic">{invoice.patient_name || 'Relative Node'}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Billed Node Lead</span>
                    <span className="text-[12px] font-black text-slate-800 dark:text-white uppercase italic">Finance Orchestrator Hub</span>
                </div>
            </div>

            <div className="flex gap-4">
                <Button className="flex-1 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/30 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-none hover:bg-slate-200 dark:hover:bg-white/10 transition-all font-display italic">
                    <Download size={14} className="mr-2" /> PDF Shard
                </Button>
                <Button className="flex-1 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/30 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-none hover:bg-slate-200 dark:hover:bg-white/10 transition-all font-display italic">
                    <Printer size={14} className="mr-2" /> Thermal Link
                </Button>
            </div>
            
            <div className="mt-8 p-4 rounded-2xl bg-emerald-500/5 text-emerald-500 flex items-center gap-2 opacity-80 border border-emerald-500/10">
                <ShieldCheck size={14} className="animate-pulse" strokeWidth={3} />
                <span className="text-[8px] font-black uppercase tracking-[0.2em] font-display leading-none">Global Fiscal Node Verified</span>
            </div>
        </Card>
    );
}
