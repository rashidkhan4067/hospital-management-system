import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Receipt, Printer, Download, Mail, ShieldCheck, 
    Clock, FileText, CheckCircle2, User, Hash, ChevronRight,
    Search, AlertCircle, Building2, Phone, MapPin, Globe, CreditCard
} from 'lucide-react';
import api from '@/core/api/apiClient';
import Loading from '@/components/composed/Loading';

/**
 * 🧾 InvoiceReportView (Standard Google Clinical Report)
 * A premium, read-only billing record following strict MD3 design principles.
 */
export default function InvoiceReportView({ onFormStateChange, invoiceId = null }) {
    const [invoice, setInvoice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await api.get(`/finance/invoices/${invoiceId}/`);
                setInvoice(res.data);
            } catch (err) {
                console.error("Retrieval error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        if (invoiceId) fetchInvoice();
    }, [invoiceId]);

    useEffect(() => {
        if (onFormStateChange) {
            onFormStateChange({
                isValid: false,
                hideFooter: true,
                title: "Invoice report",
                subtitle: `ID · ${invoice?.invoice_no || '...'}`
            });
        }
    }, [onFormStateChange, invoice]);

    if (isLoading) return <div className="h-[400px] flex items-center justify-center bg-white"><Loading /></div>;

    if (!invoice) {
        return (
            <div className="flex flex-col items-center justify-center p-20 text-center bg-white">
                <AlertCircle size={48} className="text-slate-200 mb-6" />
                <h3 className="text-[14px] font-medium text-slate-900 mb-2">Invoice not found</h3>
                <p className="text-[13px] text-slate-500 max-w-xs leading-relaxed">The requested billing record could not be retrieved from the clinical registry.</p>
            </div>
        );
    }

    const subtotal = invoice.items?.reduce((acc, item) => acc + parseFloat(item.subtotal), 0) || 0;
    const itemsCount = invoice.items?.length || 0;

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col bg-[#fef7ff] min-h-[80vh] overflow-y-auto custom-scrollbar print:bg-white print:overflow-visible"
        >
            <style>
                {`
                @media print {
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    body { background: white !important; }
                    .document-sheet { 
                        box-shadow: none !important; 
                        border: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        width: 100% !important;
                    }
                }
                `}
            </style>

            {/* Top controls */}
            <div className="no-print sticky top-0 z-50 px-8 py-4 bg-white/80 backdrop-blur-xl border-b border-slate-100/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <FileText size={18} />
                    </div>
                    <div>
                        <span className="text-[12px] font-semibold text-slate-900 block leading-none mb-1">Billing record</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{invoice.invoice_no}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => window.print()}
                        className="px-6 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full text-[12px] font-medium transition-all"
                    >
                        Print
                    </button>
                    <button 
                        onClick={() => window.print()}
                        className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white rounded-full text-[12px] font-medium shadow-lg transition-all flex items-center gap-2 group"
                    >
                        <Download size={16} /> PDF report
                    </button>
                </div>
            </div>

            {/* Document sheet */}
            <div className="document-sheet flex-1 max-w-[850px] mx-auto my-12 p-16 bg-white shadow-sm border border-slate-100 rounded-[56px] relative overflow-hidden print:my-0 print:border-none print:shadow-none print:rounded-none">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-16 pb-12 border-b border-slate-50">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-[#0051d9] text-white flex items-center justify-center font-bold text-2xl rounded-[20px] shadow-lg shadow-blue-100">
                                AS
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-0.5">Al-Shifaa hospital</h1>
                                <p className="text-[12px] font-medium text-blue-600">Digital clinical network</p>
                            </div>
                        </div>
                        <div className="space-y-1.5 text-slate-500 font-medium text-[11px]">
                            <div className="flex items-center gap-2">Sector F-8, Islamabad, Pakistan</div>
                            <div className="flex items-center gap-2">+92 (51) 234-5678</div>
                            <div className="flex items-center gap-2 italic">Official billing record</div>
                        </div>
                    </div>

                    <div className="text-right space-y-4">
                        <div className={`inline-flex px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider
                            ${invoice.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                            {invoice.status}
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-3xl font-normal text-slate-900 tracking-tight tabular-nums">#{invoice.invoice_no}</h2>
                            <p className="text-[11px] font-medium text-slate-400">Transaction ID</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-20 mb-16">
                    {/* Recipient */}
                    <div className="space-y-4">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Patient details</p>
                        <div className="bg-slate-50/50 p-7 rounded-[32px] border border-slate-50">
                            <h3 className="text-[16px] font-bold text-slate-900 mb-1">{invoice.patient_name}</h3>
                            <p className="text-[12px] text-slate-500 mb-4">MRN: {invoice.patient_details?.mrn || 'N/A'}</p>
                            <div className="flex gap-4 text-[11px] font-medium text-slate-400">
                                <span className="capitalize">{invoice.patient_details?.gender}</span>
                                <span>•</span>
                                <span>Patient record active</span>
                            </div>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-4">
                         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Issuance info</p>
                         <div className="grid grid-cols-2 gap-8 pt-2">
                             <div>
                                 <p className="text-[11px] text-slate-400 mb-1">Date issued</p>
                                 <p className="text-[13px] font-semibold text-slate-900">{new Date(invoice.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                             </div>
                             <div>
                                 <p className="text-[11px] text-slate-400 mb-1">Payment</p>
                                 <p className="text-[13px] font-semibold text-slate-900 capitalize">{invoice.payment_method}</p>
                             </div>
                             <div>
                                 <p className="text-[11px] text-slate-400 mb-1">Reg node</p>
                                 <p className="text-[13px] font-semibold text-slate-900">Node-A14</p>
                             </div>
                             <div>
                                 <p className="text-[11px] text-slate-400 mb-1">Due date</p>
                                 <p className="text-[13px] font-semibold text-blue-600">{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('en-GB') : 'Due on receipt'}</p>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Items table */}
                <div className="mb-16">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-6">Line items ({itemsCount})</p>
                    <div className="border border-slate-50 rounded-[32px] overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400">Description</th>
                                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 text-center">Qty</th>
                                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 text-right">Unit price</th>
                                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {invoice.items?.map((item, idx) => (
                                    <tr key={idx} className="group">
                                        <td className="px-8 py-6">
                                            <p className="text-[14px] font-semibold text-slate-800 mb-0.5">{item.name}</p>
                                            <p className="text-[10px] text-slate-400 tabular-nums">Ref: {item.code || 'SVC-00'}</p>
                                        </td>
                                        <td className="px-8 py-6 text-center text-[14px] font-medium text-slate-900">{item.quantity}</td>
                                        <td className="px-8 py-6 text-right text-[14px] font-medium text-slate-500 tabular-nums">{parseFloat(item.unit_price || 0).toLocaleString()}</td>
                                        <td className="px-8 py-6 text-right text-[14px] font-bold text-slate-900 tabular-nums">{(parseFloat(item.unit_price) * item.quantity).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-10">
                    <div className="col-span-3">
                         <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex items-center gap-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                                <Search size={20} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-400 mb-1">Status verification</p>
                                <p className="text-[12px] font-semibold text-slate-800">Electronically signed and verified</p>
                            </div>
                         </div>
                    </div>

                    <div className="col-span-2 space-y-4 pt-2">
                        <div className="flex justify-between items-center text-slate-500 px-2 font-medium">
                            <span className="text-[12px]">Subtotal</span>
                            <span className="text-[14px] tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-500 px-2 font-medium">
                            <span className="text-[12px]">Tax (5%)</span>
                            <span className="text-[14px] tabular-nums">+ {parseFloat(invoice.tax_amount || 0).toLocaleString()}</span>
                        </div>
                        {parseFloat(invoice.discount_amount || 0) > 0 && (
                            <div className="flex justify-between items-center text-emerald-600 px-2 font-medium">
                                <span className="text-[12px]">Consolidated discount</span>
                                <span className="text-[14px] tabular-nums">- {parseFloat(invoice.discount_amount || 0).toLocaleString()}</span>
                            </div>
                        )}
                        
                        <div className="pt-6 border-t border-slate-100">
                             <div className="flex justify-between items-end mb-2 px-2">
                                <span className="text-[12px] font-bold text-slate-900">Amount due</span>
                                <span className="text-3xl font-normal text-slate-900 tabular-nums">Rs. {parseFloat(invoice.total_amount).toLocaleString()}</span>
                             </div>
                             {invoice.paid_amount > 0 && (
                                <div className="flex justify-between items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl mt-4">
                                    <span className="text-[11px] font-bold uppercase tracking-wider">Amount paid</span>
                                    <span className="text-[13px] font-bold tabular-nums">Rs. {parseFloat(invoice.paid_amount).toLocaleString()}</span>
                                </div>
                             )}
                        </div>
                    </div>
                </div>

                {invoice.patient_notes && (
                    <div className="mt-16 pt-8 border-t border-slate-50">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-4">Patient notes</p>
                        <div className="p-8 rounded-[32px] bg-indigo-50/30 border border-indigo-50/50">
                            <p className="text-[14px] text-slate-700 leading-relaxed italic">"{invoice.patient_notes}"</p>
                        </div>
                    </div>
                )}

                {/* Signature */}
                <div className="mt-24 pt-12 border-t border-slate-50 flex justify-between items-end">
                    <div className="flex items-center gap-10">
                         <div className="space-y-4">
                              <div className="w-16 h-1 bg-slate-900 rounded-full mb-8"></div>
                              <p className="text-[11px] font-bold text-slate-900">Authorized personnel</p>
                              <p className="text-[10px] font-medium text-slate-300">Digital issuance supervisor</p>
                         </div>
                    </div>
                    <div className="text-right">
                         <p className="text-[11px] font-medium text-slate-300 leading-relaxed max-w-[220px]">
                            Generated on {new Date().toLocaleDateString()} via clinical record node verification.
                         </p>
                    </div>
                </div>
            </div>

            <p className="no-print text-center text-[10px] font-medium text-slate-400 my-10 animate-pulse">
                Institutional record · Restricted access
            </p>
        </motion.div>
    );
}
