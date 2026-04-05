import React from 'react';
import { Badge, AdminTable } from '@/shared/components/ui';
import { Receipt, FileText } from 'lucide-react';

/**
 * 🧾 Invoice Registry Shard
 * Themed table for systematic clinical billing.
 * Synchronized with accent-primary and accent-secondary tokens check mapping.
 */
export default function InvoiceTable({ data, loading, onAction }) {
    const columns = [
        { 
            header: 'Billing Instance', 
            key: 'invoice',
            render: (t) => (
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm italic">
                        <Receipt size={20} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none italic font-display">{t.patient_name}</p>
                        <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1.5 leading-none italic tracking-tighter">INV-#{t.id?.toString().padStart(6, '0')}</p>
                    </div>
                </div>
            )
        },
        { 
            header: 'Patient Registry', 
            key: 'patient',
            render: (t) => (
                <div className="flex flex-col">
                    <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase italic leading-none">{t.patient_name}</span>
                    <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5 opacity-60 italic">ID: {t.patient}</span>
                </div>
            )
        },
        { 
            header: 'Value Shard', 
            key: 'amount',
            render: (t) => (
                <div className="flex flex-col">
                    <span className="text-[14px] font-black text-slate-900 dark:text-white tabular-nums italic tracking-tighter uppercase leading-none">Rs. {Number(t.amount).toLocaleString()}</span>
                    <span className="text-[8px] font-bold text-accent-primary uppercase italic tracking-widest mt-1.5 font-display">{t.method} Protocol</span>
                </div>
            )
        },
        { 
            header: 'Node Status',
            key: 'status',
            render: (t) => {
                const s = t.status.toLowerCase();
                return (
                    <Badge className={`px-4 py-1.5 rounded-full border-none text-[9px] font-black uppercase italic ${
                        s === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 
                        s === 'pending' ? 'bg-amber-500/10 text-amber-500 animate-pulse' : 
                        'bg-slate-500/10 text-slate-400'
                    }`}>
                        {s}
                    </Badge>
                );
            }
        },
        { 
            header: 'Audit Shard', 
            key: 'action',
            render: (t) => (
                <button 
                  onClick={() => onAction?.('view', t)}
                  className="flex items-center gap-2 text-[9px] font-black text-accent-secondary uppercase tracking-widest hover:brightness-110 transition-all italic underline underline-offset-4 decoration-accent-secondary/30 font-display"
                >
                    <FileText size={14} /> View Node Shard
                </button>
            )
        }
    ];

    return (
        <AdminTable 
            columns={columns} 
            data={data} 
            isLoading={loading}
        />
    );
}
