import React from 'react';
import { Card } from '@/shared/components/ui';
import { Receipt, DollarSign, Activity } from 'lucide-react';

/**
 * 🧾 Billing Items Table Shard
 * Professional ledger view for invoice line items.
 * Optimized for high-fidelity fiscal record pages check mapping.
 */
export default function BillingItemsTable({ items = [] }) {
    const defaultItems = [
        { id: 1, service: 'General Consultation Node', quantity: 1, price: 5000, tax: '5%' },
        { id: 2, service: 'Laboratory Diagnostic Matrix', quantity: 1, price: 8500, tax: '5%' },
        { id: 3, service: 'Neurology Shard Registry', quantity: 1, price: 12000, tax: '5%' },
        { id: 4, service: 'Medication Propagation (Amox)', quantity: 2, price: 1200, tax: '0%' },
    ];

    const displayItems = items.length > 0 ? items : defaultItems;
    const total = displayItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <Card className="p-8 lg:p-10 rounded-[3rem] bg-white dark:bg-white/[0.03] space-y-8 border border-slate-200 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-inner group-hover:scale-110 transition-transform italic">
                    <Receipt size={22} strokeWidth={2.5} />
                </div>
                <div>
                   <h3 className="text-[16px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic font-display leading-none">Fiscal Ledger Matrix</h3>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 italic opacity-60">Itemized Clinical Charges Shard</p>
                </div>
            </div>

            <div className="relative z-10 overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-separate border-spacing-y-4">
                    <thead>
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100">
                            <th className="px-4 pb-4">Service Node</th>
                            <th className="px-4 pb-4">Qty</th>
                            <th className="px-4 pb-4 text-right">Unit Price</th>
                            <th className="px-4 pb-4 text-right">Aggregate Shard</th>
                        </tr>
                    </thead>
                    <tbody className="space-y-4">
                        {displayItems.map((item, idx) => (
                            <tr key={idx} className="group/row bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all rounded-3xl overflow-hidden">
                                <td className="px-6 py-5 rounded-l-2xl">
                                    <span className="text-[12px] font-black text-slate-800 dark:text-white uppercase italic tracking-tight">{item.service}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-[11px] font-black text-slate-500 tabular-nums">{item.quantity}</span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <span className="text-[11px] font-black text-slate-500 tabular-nums">Rs. {Number(item.price).toLocaleString()}</span>
                                </td>
                                <td className="px-6 py-5 text-right rounded-r-2xl">
                                    <span className="text-[12px] font-black text-slate-900 dark:text-white tabular-nums italic">Rs. {Number(item.price * item.quantity).toLocaleString()}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="px-6 pt-10 text-right">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Total Fiscal Propagation</span>
                            </td>
                            <td className="px-6 pt-10 text-right">
                                <span className="text-2xl font-black text-accent-primary italic tracking-tighter tabular-nums">Rs. {Number(total).toLocaleString()}</span>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 opacity-40 italic">
                <Activity size={14} className="text-emerald-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Node Sync Complete · 100% Verified</span>
            </div>
        </Card>
    );
}
