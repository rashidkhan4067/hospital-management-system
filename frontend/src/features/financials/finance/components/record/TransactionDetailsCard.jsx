import React from 'react';
import { CreditCard, User, Hash, Clock, DollarSign, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/primitives';

/**
 * 💹 TransactionDetailsCard
 * Summary shard for financial telemetry identity.
 */
export default function TransactionDetailsCard({ txn }) {
  return (
    <div className="bg-white dark:bg-white/[0.03] rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.01] duration-500 group relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent-primary/5 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-accent-primary/10 transition-colors duration-700" />
      
      <div className="p-8 lg:p-10 relative">
        {/* Header Shard */}
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-[1.6rem] bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
            <CreditCard size={28} />
          </div>
          <div>
            <h3 className="text-[20px] font-black text-slate-900 dark:text-white uppercase tracking-tight font-display leading-tight italic">Fiscal Hub</h3>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Matrix Committal Node</p>
          </div>
        </div>

        {/* Data Cells Mapping */}
        <div className="space-y-6">
           <DataCell icon={User} label="Relational Identity" value={txn.patient_name} subValue={txn.patient_id} />
           <DataCell icon={Hash} label="Protocol Reference" value={txn.reference} subValue="Blockchain Verified" />
           <DataCell icon={Clock} label="Sync Timestamp" value={txn.timestamp} subValue="Global Shard Parity" />
           <DataCell icon={Activity} label="Channel Hub" value={txn.method} subValue="Stripe / Card Link" />
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col gap-5">
           <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Status Protocol</span>
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-black italic">Committed Node</Badge>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Net Value Shard</span>
              <span className="text-[14px] font-black text-slate-900 dark:text-white uppercase font-display italic">Rs. {txn.amount.toLocaleString()}</span>
           </div>
        </div>
      </div>
    </div>
  );
}

function DataCell({ icon: Icon, label, value, subValue }) {
    return (
        <div className="flex items-center gap-5 group/cell">
            <div className="w-11 h-11 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover/cell:bg-accent-primary/10 group-hover/cell:text-accent-primary transition-all duration-300">
                <Icon size={18} />
            </div>
            <div className="flex-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 opacity-60 italic">{label}</p>
                <p className="text-[13px] font-extrabold text-slate-800 dark:text-white uppercase leading-tight font-display italic">{value}</p>
                {subValue && <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{subValue}</p>}
            </div>
            <ArrowRight size={12} className="text-slate-200 dark:text-white/10 opacity-0 group-hover/cell:opacity-100 transition-all -translate-x-2 group-hover/cell:translate-x-0" />
        </div>
    );
}
