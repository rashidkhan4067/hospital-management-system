import React from 'react';
import { Download, Receipt, Eye, Printer, FileText } from 'lucide-react';
import { TableActions } from '../../../ui';
import AdminTable from '../AdminTable';

/**
 * 📊 Transaction Matrix Shard
 * Specialized high-fidelity table for financial audit orchestration.
 */
export default function TransactionTable({ data, loading, onAction }) {
    const columns = [
        { 
            header: 'Billing Instance', 
            cell: (t) => (
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/10 flex items-center justify-center text-accent-primary">
                        <Receipt size={18} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none">{t.patient_name || 'Generic Shard'}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 tabular-nums">{t.transaction_id || `TXN-${t.id}`}</p>
                    </div>
                </div>
            )
        },
        { 
            header: 'Value Matrix',
            cell: (t) => (
                <span className={`text-[15px] font-black tracking-tighter tabular-nums ${
                    t.type === 'EXPENSE' ? 'text-rose-500' : 'text-slate-900 dark:text-white'
                }`}>
                    {t.type === 'EXPENSE' ? '-' : '+'} Rs. {Number(t.amount || 0).toLocaleString()}
                </span>
            )
        },
        { 
            header: 'Protocol',
            cell: (t) => <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic tracking-tight">{t.method} Shard</span>
        },
        { 
            header: 'Status',
            cell: (t) => (
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${t.status === 'completed' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : t.status === 'failed' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${t.status === 'completed' ? 'text-emerald-500' : t.status === 'failed' ? 'text-rose-500' : 'text-amber-500'}`}>{t.status}</span>
                </div>
            )
        },
        { header: 'Issued On', cell: (t) => <span className="text-[10px] font-bold text-slate-400 tabular-nums uppercase">{new Date(t.timestamp).toLocaleDateString()}</span> },
        { 
            header: 'Matrix Action', 
            cell: (t) => (
                <TableActions 
                    row={t}
                    actions={[
                        { label: 'View Receipt', icon: Eye, onClick: () => onAction?.('view', t) },
                        { label: 'Export Shard', icon: Download, onClick: () => onAction?.('export', t) },
                        { label: 'Print Registry', icon: Printer, onClick: () => onAction?.('print', t) },
                        { label: 'Audit Details', icon: FileText, onClick: () => onAction?.('audit', t) },
                    ]}
                />
            )
        },
    ];

    return (
        <AdminTable 
            columns={columns} 
            data={data} 
            isLoading={loading}
        />
    );
}
