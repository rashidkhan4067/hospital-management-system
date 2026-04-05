import React from 'react';
import { Card, Badge, Button } from '@/shared/components/ui';
import { Wallet, Calendar, User, Tag, FileText, ChevronRight, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

/**
 * 🛰 ExpenseDetailsCard — High-fidelity fiscal summary
 */
export default function ExpenseDetailsCard({ expense }) {
    if (!expense) return null;

    const items = [
        { label: 'Category Node', value: expense.category, icon: Tag },
        { label: 'Entity / Vendor', value: expense.vendor, icon: User },
        { label: 'Effective Date', value: expense.date, icon: Calendar },
        { label: 'Fiscal Reference', value: expense.reference, icon: FileText },
    ];

    return (
        <Card className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-2als relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col gap-8 relative z-10">
                {/* Header Shard */}
                <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-accent-primary flex items-center justify-center text-white border border-white/10 shadow-lg group-hover:rotate-6 transition-transform italic">
                        <Wallet size={24} />
                    </div>
                </div>

                {/* Amount Matrix */}
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic group-hover:text-accent-primary transition-colors">Committed Value</p>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter tabular-nums leading-none">
                        Rs. {Number(expense.amount).toLocaleString()}
                    </h2>
                </div>

                {/* Metadata Hub */}
                <div className="grid grid-cols-1 gap-5 py-6 border-y border-slate-100 dark:border-white/5">
                    {items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between group/item">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover/item:text-accent-primary transition-colors">
                                    <item.icon size={14} />
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{item.label}</span>
                            </div>
                            <span className="text-[11px] font-black text-slate-900 dark:text-white tracking-tight uppercase italic">{item.value}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={16} className="text-emerald-500" />
                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-wider italic">Audit Verified Node</p>
                        </div>
                        <CheckCircle size={14} className="text-emerald-500" />
                    </div>
                    
                    <Button className="w-full bg-slate-900 dark:bg-white/10 text-white py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-none transition-all hover:brightness-110 active:scale-95 italic font-display">
                        Download Ledger Receipt <ArrowRight size={12} className="ml-2 inline-block" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}

function CheckCircle({ size, className }) {
    return <Clock size={size} className={className} />; // Replace with real check if needed
}
