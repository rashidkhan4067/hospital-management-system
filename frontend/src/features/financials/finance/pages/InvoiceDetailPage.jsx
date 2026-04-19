import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Receipt, Printer, Download, Mail, ShieldCheck, 
    ArrowLeft, Clock, FileText, CheckCircle2, Calendar, 
    User, CreditCard, ShieldAlert, Phone, MapPin, Globe,
    Activity, ChevronRight, CheckCheck, Hash, Building2,
    Briefcase, Landmark, ExternalLink, Sparkles
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '@/core/api/apiClient';
import AdminPage from '@/layouts/AdminPage';
import Loading from '@/components/composed/Loading';

/**
 * 🧾 InvoiceDetailPage (Clinical Fiscal Dossier)
 * Recalibrated for dashboard-style density and MD3 compactness.
 * Follows the high-fidelity institutional standards of Cite-PK.
 */
export default function InvoiceDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('LEGER');

    const { data: invoice, isLoading, error } = useQuery({
        queryKey: ['invoice', id],
        queryFn: async () => {
            const { data } = await api.get(`/finance/invoices/${id}/`);
            return data;
        },
        enabled: !!id
    });

    if (isLoading) return <Loading />;
    if (error || !invoice) return (
        <AdminPage>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
                <div className="w-16 h-16 bg-error-container text-error rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <ShieldAlert size={32} />
                </div>
                <h1 className="text-xl font-black text-text-main mb-2 tracking-tight">Dossier Missing</h1>
                <p className="text-[13px] text-text-sub max-w-sm mb-8 opacity-70">The requested institutional ledger record could not be located.</p>
                <button onClick={() => navigate(-1)} className="chip bg-surface-variant text-text-main py-2 px-6 font-black uppercase text-[10px] tracking-widest transition-all active:scale-95">Registry Index</button>
            </div>
        </AdminPage>
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <AdminPage>
            <main
                id="invoice-intelligence-dossier"
                className="max-w-[1560px] mx-auto p-[clamp(14px,3vw,24px)] flex flex-col gap-[14px]"
            >
                {/* 📂 HEADER: Dossier Identity */}
                <div className="widget p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                            <Receipt size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-lg font-black text-text-main tracking-tight uppercase">Invoice #{invoice.invoice_no}</h1>
                                <span className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${invoice.status === 'PAID' ? 'bg-success-container text-success' : 'bg-warning-container text-warning'}`}>
                                    {invoice.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-[11px] font-bold text-text-sub opacity-60">
                                <span className="flex items-center gap-1.5"><User size={12}/> {invoice.patient_name}</span>
                                <span className="flex items-center gap-1.5"><Calendar size={12}/> {formatDate(invoice.created_at)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 relative z-10">
                       <button onClick={() => navigate(-1)} className="p-2.5 bg-surface-variant hover:bg-surface-variant/80 text-text-main rounded-xl transition-all" title="Back">
                           <ArrowLeft size={18} />
                       </button>
                       <button className="h-10 px-4 bg-primary text-on-primary rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/10 hover:brightness-110 transition-all flex items-center gap-2">
                           <Sparkles size={14} /> Process Action
                       </button>
                    </div>

                    {/* Subtle AI Backdrop */}
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                        <Building2 size={160} />
                    </div>
                </div>

                {/* 📊 GRID: High-Density Telemetry */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-[14px]">
                    
                    {/* LEFT: Financial Summary Shard */}
                    <div className="lg:col-span-4 flex flex-col gap-[14px]">
                        <div className="widget p-6 bg-gradient-to-br from-white to-primary/5 border-primary/10">
                            <div className="eyebrow mb-6">
                                <div className="eyebrow-dot bg-primary" />
                                Fiscal Summary
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-[10px] font-black text-text-sub uppercase tracking-widest mb-1 opacity-50">Total Document Value</div>
                                    <div className="text-3xl font-black text-text-main tracking-tighter">
                                        <span className="text-[14px] font-bold mr-1.5 opacity-30">Rs</span>
                                        {parseFloat(invoice.total_amount).toLocaleString()}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6 bg-surface-variant/30 p-4 rounded-2xl border border-outline-variant/30">
                                    <div>
                                        <div className="text-[9px] font-black text-text-sub uppercase tracking-widest mb-1 opacity-50">Paid flow</div>
                                        <div className="text-lg font-black text-success tabular-nums">Rs. {parseFloat(invoice.paid_amount || 0).toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-black text-text-sub uppercase tracking-widest mb-1 opacity-50">Outstanding</div>
                                        <div className="text-lg font-black text-error tabular-nums">Rs. {parseFloat(invoice.due_amount).toLocaleString()}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-text-sub uppercase tracking-widest opacity-40">
                                    <Clock size={12}/> Due {invoice.due_date ? formatDate(invoice.due_date) : 'on receipt'}
                                </div>
                            </div>
                        </div>

                        {/* Patient Intel Small Card */}
                        <div className="widget p-5 flex-row items-center gap-4 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate(`/admin/patients/${invoice.patient}`)}>
                            <div className="w-12 h-12 rounded-[18px] bg-surface-variant text-primary flex items-center justify-center text-xl font-black shadow-sm flex-shrink-0">
                                {invoice.patient_name?.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[13px] font-black text-text-main truncate uppercase tracking-tight">{invoice.patient_name}</div>
                                <div className="text-[10px] font-bold text-text-sub opacity-50 uppercase tracking-widest mt-0.5">PID-#{invoice.patient_details?.mrn || 'EXT'}</div>
                            </div>
                            <ChevronRight size={16} className="text-outline" />
                        </div>

                        {/* Quick Actions List */}
                        <div className="widget p-3 flex flex-col gap-1">
                            {[
                                { label: 'Print Invoice', icon: Printer, color: 'text-primary' },
                                { label: 'Download PDF', icon: Download, color: 'text-success' },
                                { label: 'Send via Mail', icon: Mail, color: 'text-info' },
                            ].map((action, i) => (
                                <button key={i} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-surface-variant transition-all text-left group">
                                    <div className={`w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                                        <action.icon size={16} />
                                    </div>
                                    <span className="text-[11px] font-black text-text-main uppercase tracking-widest">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Main Ledger Matrix */}
                    <div className="lg:col-span-8 flex flex-col gap-[14px]">
                        <div className="widget flex-1 flex flex-col overflow-hidden min-h-[450px]">
                            {/* Matrix Header */}
                            <div className="px-6 h-14 border-b border-outline-variant/30 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
                                <div className="flex gap-8 h-full">
                                    {['LEGER', 'PAYMENTS', 'RECORDS'].map(tab => (
                                        <button 
                                            key={tab} 
                                            onClick={() => setActiveTab(tab)}
                                            className={`relative h-full text-[10px] font-black uppercase tracking-[0.2em] transition-all
                                                ${activeTab === tab ? 'text-primary' : 'text-text-sub opacity-40 hover:opacity-100'}
                                            `}
                                        >
                                            {tab}
                                            {activeTab === tab && (
                                                <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-[9px] font-black text-text-sub opacity-30 uppercase tracking-[0.3em]">Institutional Matrix V2.0</div>
                            </div>

                            <div className="flex-1 overflow-auto">
                                <div className="p-0">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {activeTab === 'LEGER' ? (
                                                <table className="w-full text-left border-collapse">
                                                    <thead className="bg-surface-variant/10 sticky top-0 z-10 border-b border-outline-variant/20">
                                                        <tr>
                                                            <th className="py-4 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-text-sub opacity-60">Service Node</th>
                                                            <th className="py-4 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-text-sub opacity-60 text-center">Type</th>
                                                            <th className="py-4 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-text-sub opacity-60 text-center">Qty</th>
                                                            <th className="py-4 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-text-sub opacity-60 text-right">Aggregate (Rs)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-outline-variant/10">
                                                        {invoice.items?.map((item, idx) => (
                                                            <tr key={idx} className="hover:bg-primary/[0.02] transition-colors group">
                                                                <td className="py-4 px-6">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-8 h-8 rounded-lg bg-surface-variant/30 flex items-center justify-center text-text-sub group-hover:text-primary transition-colors">
                                                                            <Hash size={14} />
                                                                        </div>
                                                                        <span className="text-[13px] font-black text-text-main tracking-tight uppercase">{item.name}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="py-4 px-6 text-center">
                                                                    <span className="px-2.5 py-0.5 rounded-md bg-surface-variant/50 text-[9px] font-black text-text-sub uppercase tracking-wider">
                                                                        {item.item_type || 'SVC'}
                                                                    </span>
                                                                </td>
                                                                <td className="py-4 px-6 text-center text-[13px] font-bold text-text-sub opacity-70 tabular-nums">{item.quantity}</td>
                                                                <td className="py-4 px-6 text-right text-[14px] font-black text-text-main tracking-tight tabular-nums">{parseFloat(item.subtotal).toLocaleString()}</td>
                                                            </tr>
                                                        ))}
                                                        {/* Total Row */}
                                                        <tr className="bg-surface-variant/5">
                                                            <td colSpan={3} className="py-6 px-6 text-right text-[10px] font-black uppercase tracking-widest text-text-sub">Subtotal Aggregate</td>
                                                            <td className="py-6 px-6 text-right text-base font-black text-text-main tabular-nums">Rs. {parseFloat(invoice.total_amount).toLocaleString()}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-20 opacity-30 text-center">
                                                     <Landmark size={48} className="mb-4" />
                                                     <div className="text-[11px] font-black uppercase tracking-widest">Shard Empty</div>
                                                     <p className="text-[9px] font-bold mt-1">No secondary records found in this context.</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Ledger Footnote */}
                            <div className="h-10 px-6 border-t border-outline-variant/30 flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-text-sub opacity-40">
                                <div className="flex items-center gap-4">
                                    <span>Sync: Stable</span>
                                    <span>Hash: {String(invoice.id).padStart(12, '0')}</span>
                                </div>
                                <span>Cite-PK Institutional Ledger Matrix</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AdminPage>
    );
}
