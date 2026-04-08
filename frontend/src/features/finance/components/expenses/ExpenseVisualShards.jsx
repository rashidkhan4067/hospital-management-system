import React from 'react';
import { Activity, Wallet, ArrowUpRight, TrendingDown } from 'lucide-react';
import { Card } from '@/components/primitives';

/**
 * 🛰 ExpenseVisualShards — Aesthetic fiscal telemetry
 */
export const OutflowVolumeShard = ({ stats }) => (
    <Card className="lg:col-span-2 p-8 rounded-[48px] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2xals relative overflow-hidden flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter leading-none">Global Outflow Matrix</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-60">Synchronized Expenditure per Fiscal Node</p>
            </div>
        </div>
        <div className="flex items-end gap-3 h-32 relative z-10">
            {stats?.map((node, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                    <div 
                        className="w-full bg-rose-500/10 rounded-t-xl group-hover:bg-rose-500 transition-all relative border border-rose-500/5 group-hover:border-rose-500/20"
                        style={{ height: `${(node.value / Math.max(...stats.map(d => d.value))) * 100}%` }}
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black text-rose-500 italic">Rs.{node.value}k</div>
                    </div>
                    <span className="text-[7px] font-black uppercase text-slate-400 truncate w-full text-center tracking-tighter italic">{node.label}</span>
                </div>
            ))}
        </div>
    </Card>
);

export const ThresholdShard = () => (
    <Card className="lg:col-span-1 p-8 rounded-[48px] bg-slate-900 text-white border-none flex flex-col gap-6 shadow-2als relative overflow-hidden group">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-primary/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-[3s]" />
        <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 italic">
                <TrendingDown size={20} className="text-emerald-500 rotate-12" />
            </div>
            <h4 className="text-[12px] font-black uppercase italic tracking-[0.2em] leading-none">Velocity Cap</h4>
        </div>
        <div className="space-y-1 relative z-10">
            <p className="text-3xl font-black italic tracking-tighter leading-none group-hover:tracking-normal transition-all text-emerald-500">Stable</p>
            <p className="text-[9px] font-bold uppercase opacity-60 tracking-widest mt-1">Outflow is within 15% of projection.</p>
        </div>
        <button className="mt-auto w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-4 text-[9px] font-black uppercase tracking-widest transition-all relative z-10 italic">
            Audit Thresholds
        </button>
    </Card>
);

export const FiscalContextNotice = () => (
    <Card className="p-5 lg:p-6 rounded-[2.5rem] bg-accent-primary text-white flex flex-col gap-4 relative overflow-hidden group shadow-xl shadow-accent-primary/10 border-none italic">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20 shadow-sm">
                <Wallet size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <h4 className="text-[12px] font-black uppercase italic tracking-[0.2em] leading-none">Fiscal Hub</h4>
        </div>
        <p className="text-[10px] font-black italic text-white/90 leading-relaxed uppercase tracking-wide opacity-80">
            Outflow synchronization 100% efficient. Credentials verified against federal standards.
        </p>
    </Card>
);
