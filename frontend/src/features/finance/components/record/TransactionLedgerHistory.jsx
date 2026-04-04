import React from 'react';
import { CreditCard, DollarSign, Activity, Users, ShieldCheck, ArrowRight, Printer, Copy } from 'lucide-react';
import { Badge, Button } from '@/shared/components/ui';

/**
 * 💹 TransactionLedgerHistory
 * Detailed fiscal breakdown for the transaction record page.
 */
export default function TransactionLedgerHistory({ txn }) {
  return (
    <div className="bg-white dark:bg-white/[0.03] rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden transition-all hover:shadow-2xl duration-500 group relative">
      <div className="p-8 lg:p-10">
        <div className="flex items-center justify-between mb-10">
           <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-[1.4rem] bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
                 <DollarSign size={24} />
              </div>
              <div className="flex flex-col gap-1">
                 <h3 className="text-[20px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic font-display">Ledger Matrix</h3>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Node Shard Detailed Breakdown</p>
              </div>
           </div>
           <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-black italic">Protocol Synchronized</Badge>
        </div>

        <div className="space-y-6">
           <LedgerRow label="Initial Consultation Shard" value={txn.amount * 0.7} description="Emergency clinical fee assigned to practitioner shard." />
           <LedgerRow label="Laboratory Diagnostic Sync" value={txn.amount * 0.2} description="Deep biological scan and telemetry matrix entry." />
           <LedgerRow label="Management Facility Sync" value={txn.amount * 0.1} description="Hospital operational faculty overhead sharding." />
        </div>

        <div className="mt-12 p-8 rounded-[1.8rem] bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-between group/total">
           <div className="flex flex-col gap-1">
              <p className="text-[10px] font-black text-accent-primary uppercase tracking-[0.2em] italic">Total Commit Value</p>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Verified Relational Shard</p>
           </div>
           <div className="flex flex-col items-end">
              <p className="text-[22px] font-black text-slate-900 dark:text-white uppercase font-display italic">Rs. {txn.amount.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-1">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest italic">Secured Protocol</span>
              </div>
           </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 space-y-4">
           <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col gap-3">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Clinical Context Matrix</p>
              <p className="text-[12px] font-bold text-slate-700 dark:text-slate-200 leading-relaxed italic">{txn.description}</p>
           </div>
           <div className="flex gap-4">
              <Button className="flex-1 bg-white dark:bg-white/5 text-slate-400 dark:text-white/40 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 hover:border-slate-300 transition-all italic font-display shadow-sm">
                 <Printer size={12} /> Print Node Summary
              </Button>
              <Button className="flex-1 bg-white dark:bg-white/5 text-slate-400 dark:text-white/40 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 hover:border-slate-300 transition-all italic font-display shadow-sm">
                 <Copy size={12} /> Copy Shard Protocol
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}

function LedgerRow({ label, value, description }) {
    return (
        <div className="flex items-start justify-between group/row p-5 rounded-3xl hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent hover:border-slate-100 dark:hover:border-white/10 transition-all duration-300">
            <div className="flex-1 min-w-0">
                <p className="text-[13px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic font-display">{label}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60 italic">{description}</p>
            </div>
            <div className="flex flex-col items-end shrink-0 ml-10">
                <p className="text-[14px] font-black text-slate-900 dark:text-white uppercase font-display italic">Rs. {value.toLocaleString()}</p>
                <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mt-0.5 italic">Shard Matrix Sync</p>
            </div>
        </div>
    );
}
