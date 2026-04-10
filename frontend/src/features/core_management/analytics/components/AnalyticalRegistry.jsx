import React from 'react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { Card, Button, Skeleton, EmptyState } from '@/components/primitives';
import { Download, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';

/**
 * 🏗️ AnalyticalRegistry (Tactical Intelligence Ledger)
 * Features surgical empty state handling and onboarding CTAs.
 */
const AnalyticalRegistry = () => {
    const { data, isLoading } = useAnalyticsData();
    const rows = data?.registryData || [];

    if (isLoading) {
        return (
            <Card className="p-0 border-outline/30 rounded-[32px] overflow-hidden">
                <div className="p-8 flex flex-col gap-4">
                    {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-0 border-outline/30 bg-surface-bright rounded-[32px] overflow-hidden transition-all duration-300 shadow-sm">
            {/* 📟 Header Shard */}
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-outline/10">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-primary tracking-[0.2em] mb-1">Tactical Registry</span>
                    <h3 className="text-xl font-black text-text-main tracking-tight">Intelligence Ledger</h3>
                </div>
                {rows.length > 0 && (
                    <Button variant="outlined" size="sm" className="h-10 px-5 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <Download size={14} />
                        Export Ledger
                    </Button>
                )}
            </div>

            {/* 📉 Registry Content */}
            <div className="flex-1 overflow-x-auto min-h-[400px]">
                {rows.length === 0 ? (
                    <div className="flex items-center justify-center h-full min-h-[400px]">
                        <EmptyState 
                            title="Registry Currently Empty"
                            message="We couldn't find any operational records matching your active filter matrix."
                            icon={UserPlus}
                            actionLabel="Add Appointment"
                            onAction={() => console.log('Navigate to Create Appointment')}
                        />
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-surface sticky top-0 z-10">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-sub opacity-60">Patient Identity</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-sub opacity-60">Facility Section</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-sub opacity-60">Practitioner</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-sub opacity-60">Status Signal</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-sub opacity-60 text-right">Revenue Shard</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline/5 font-bold">
                            {rows.map((row) => (
                                <tr key={row.id} className="hover:bg-primary/[0.02] transition-colors group">
                                    <td className="px-8 py-5 text-sm text-text-main group-hover:text-primary transition-colors">{row.patient}</td>
                                    <td className="px-8 py-5 text-[10px] uppercase tracking-wider text-text-sub">{row.dept}</td>
                                    <td className="px-8 py-5 text-xs text-text-main opacity-80">{row.doctor}</td>
                                    <td className="px-8 py-5">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            row.status === 'Completed' ? 'bg-success/10 text-success' :
                                            row.status === 'Pending' ? 'bg-warning/10 text-warning' :
                                            'bg-error/10 text-error'
                                        }`}>
                                            {row.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-black text-text-main text-right">
                                        PKR {row.revenue.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* 📟 Intelligence Pagination */}
            {rows.length > 0 && (
                <div className="p-6 md:p-8 flex items-center justify-between border-t border-outline/10 bg-surface/30">
                    <span className="text-[10px] font-bold text-text-sub uppercase tracking-widest opacity-40">
                        Displaying {rows.length} of {rows.length} Records
                    </span>
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-xl border border-outline/20 flex items-center justify-center text-text-sub hover:bg-white transition-all disabled:opacity-20" disabled>
                            <ChevronLeft size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-xl border border-outline/20 flex items-center justify-center text-text-sub hover:bg-white transition-all disabled:opacity-20" disabled>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default AnalyticalRegistry;
