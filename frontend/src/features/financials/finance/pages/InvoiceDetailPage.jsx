import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Receipt, 
    Printer, 
    Download, 
    Mail, 
    ShieldCheck, 
    ArrowLeft,
    Clock,
    FileText,
    CheckCircle2,
    Calendar,
    User,
    CreditCard,
    ShieldAlert
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';
import { apiClient } from '@/core/api';
import { UI_TOKENS, CTA_THEMES } from '@/core/config/UI';

/**
 * 🧾 InvoiceDetailPage (Fiscal Dossier)
 * High-fidelity audit view of a clinical transaction / patient invoice.
 * Standardized to Google UI (M3) architecture.
 */
export default function InvoiceDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // ── Load Fiscal Dossier ──
    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await apiClient.get(`/finance/invoices/${id}/`);
                setInvoice(res.data);
            } catch (err) {
                console.error("Fiscal Retrieval Error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchInvoice();
    }, [id]);

    if (isLoading) {
        return (
            <AdminPage className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-50 border-t-[#1a73e8] rounded-full animate-spin" />
            </AdminPage>
        );
    }

    if (!invoice) {
        return (
            <AdminPage className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <ShieldAlert size={48} className="mx-auto text-slate-300 mb-4" />
                    <h2 className="text-xl font-bold text-slate-900">Dossier Not Found</h2>
                    <p className="text-sm text-slate-500 mt-2">The requested fiscal shard does not exist in the registry.</p>
                    <button onClick={() => navigate(-1)} className={CTA_THEMES.PRIMARY + " mt-8"}>Return to Registry</button>
                </div>
            </AdminPage>
        );
    }

    const subtotal = invoice.items?.reduce((acc, item) => acc + parseFloat(item.subtotal), 0) || 0;
    const tax = subtotal * 0.05;

    return (
        <AdminPage className="min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
                
                {/* ── Breadcrumbs & Actions ── */}
                <header className={UI_TOKENS.HEADER}>
                    <div className={UI_TOKENS.HEADER_LEFT}>
                        <button 
                            onClick={() => navigate(-1)}
                            className={CTA_THEMES.GHOST + " mr-2"}
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <span className={UI_TOKENS.TEXT_SECONDARY}>Fiscal Record {invoice.invoice_no}</span>
                            <h1 className={`${UI_TOKENS.TEXT_PRIMARY} text-3xl mt-1 uppercase tracking-tight`}>Invoice Dossier</h1>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className={CTA_THEMES.OUTLINED}>
                            <Printer size={16} className="mr-2" /> Print
                        </button>
                        <button className={CTA_THEMES.PRIMARY}>
                            <Download size={16} className="mr-2" /> Download PDF
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8 items-start">
                    
                    {/* ── Left Content: Dossier Details ── */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                        
                        {/* Transaction Identities */}
                        <section className={UI_TOKENS.SHARD_BASE + " grid grid-cols-1 md:grid-cols-2 gap-10"}>
                            <div className="flex flex-col gap-5">
                                <h3 className={UI_TOKENS.TEXT_SECONDARY + " flex items-center gap-2"}>
                                    <User size={14} className="text-[#1a73e8]" /> Recipient Matrix
                                </h3>
                                <div>
                                    <p className="text-xl font-bold text-slate-900 tracking-tight">{invoice.patient_name || invoice.patient?.full_name}</p>
                                    <p className="text-sm font-bold text-[#1a73e8] mt-1">PID-{invoice.patient?.substring(0,8).toUpperCase() || 'EXTERNAL'}</p>
                                    <p className="text-xs font-medium text-slate-500 mt-2 flex items-center gap-2">
                                        <Mail size={12} /> {invoice.patient_email || 'No email on file'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <h3 className={UI_TOKENS.TEXT_SECONDARY + " flex items-center gap-2"}>
                                    <Clock size={14} className="text-[#1a73e8]" /> Temporal Bounds
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Issued:</span>
                                        <span className="text-sm font-bold text-slate-900">{new Date(invoice.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Due Date:</span>
                                        <span className="text-sm font-bold text-red-500">{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'Immediate'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Currency:</span>
                                        <span className="text-sm font-bold text-slate-900">PKR / Rs.</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Itemization Matrix */}
                        <section className={`${UI_TOKENS.SHARD_BASE} !p-0 overflow-hidden`}>
                            <div className="p-6 md:p-8 border-b border-slate-50">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                                    <FileText size={20} className="text-[#1a73e8]" />
                                    Clinical Registry Shards
                                </h2>
                            </div>

                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-10 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Description</th>
                                        <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Qty</th>
                                        <th className="px-10 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Aggregate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {invoice.items?.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#1a73e8] shrink-0">
                                                        <FileText size={16} />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-900">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-center text-sm font-bold text-slate-500 tabular-nums">{item.quantity}</td>
                                            <td className="px-10 py-6 text-right text-sm font-bold text-slate-900 tabular-nums">Rs. {parseFloat(item.subtotal).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="p-10 bg-slate-50/50 flex flex-col items-end gap-4 border-t border-slate-100">
                                <div className="flex items-center justify-between w-full md:w-72">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                                    <span className="text-sm font-bold text-slate-900 tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between w-full md:w-72">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hospital Surcharge (5%)</span>
                                    <span className="text-sm font-bold text-slate-900 tabular-nums">+ Rs. {tax.toLocaleString()}</span>
                                </div>
                                <div className="h-px bg-slate-200 w-full md:w-72 my-2" />
                                <div className="flex items-center justify-between w-full md:w-80">
                                    <span className="text-base font-bold text-slate-900 uppercase tracking-widest">Total Committed</span>
                                    <span className="text-3xl font-bold text-[#1a73e8] tracking-tight tabular-nums">Rs. {parseFloat(invoice.total_amount).toLocaleString()}</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* ── Right Content: Settlement Status ── */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-8 sticky top-8">
                        
                        {/* Status Card */}
                        <section className={UI_TOKENS.SHARD_BASE}>
                             <h2 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <Receipt size={22} className="text-[#1a73e8]" />
                                Fiscal Settlement
                             </h2>

                             <div className="flex flex-col gap-6 mb-8">
                                <div className={`flex items-center gap-4 p-5 rounded-2xl border ${
                                    invoice.status === 'PAID' 
                                        ? 'bg-green-50 border-green-100 text-green-700' 
                                        : 'bg-amber-50 border-amber-100 text-amber-700'
                                }`}>
                                    <div className={`w-2 h-2 rounded-full ${invoice.status === 'PAID' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                                    <p className="text-[11px] font-bold uppercase tracking-widest">
                                        {invoice.status === 'PAID' ? 'Settled Node' : 'Awaiting Deposit'}
                                    </p>
                                </div>
                                <p className="text-[11px] text-slate-400 font-bold leading-relaxed uppercase tracking-wider">
                                    {invoice.status === 'PAID' 
                                        ? 'Electronic settlement received and confirmed by fiscal gateway.' 
                                        : 'Broadcasted to patient terminal. Payment telemetry pending.'}
                                </p>
                             </div>

                             <div className="h-px bg-slate-50 mb-8" />

                             <div className="flex flex-col gap-3">
                                <button className={CTA_THEMES.PRIMARY + " w-full shadow-lg shadow-blue-500/20"}>Broadcast Reminder</button>
                                <button className={CTA_THEMES.SECONDARY + " w-full"}>
                                    <Mail size={16} className="mr-2" /> Email Record
                                </button>
                             </div>

                             <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                                <ShieldCheck size={14} className="text-green-400" />
                                Compliant with P-VAT (R4)
                             </div>
                        </section>
                        
                        <div className="p-6 rounded-[24px] bg-blue-50 border border-blue-100 flex items-center gap-4">
                            <CreditCard size={20} className="text-[#1a73e8]" />
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Settlement Method</p>
                                <p className="text-sm font-bold text-slate-900">{invoice.payment_method || 'PENDING'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPage>
    );
}
