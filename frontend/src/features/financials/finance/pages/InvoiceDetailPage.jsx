import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Receipt, Printer, Download, Mail, ShieldCheck, 
    ArrowLeft, Clock, FileText, CheckCircle2, Calendar, 
    User, CreditCard, ShieldAlert, Phone, MapPin, Globe,
    Activity, ChevronDown, CheckCheck, Hash, Building2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';
import api from '@/core/api/apiClient';
import Loading from '@/components/composed/Loading';

/**
 * 🧾 InvoiceDetailPage (Clinical Fiscal Report)
 * Industry-standard financial document view with formal itemization 
 * and integrated export workflows.
 */
export default function InvoiceDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await api.get(`/finance/invoices/${id}/`);
                setInvoice(res.data);
            } catch (err) {
                console.error("Fiscal Retrieval Error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchInvoice();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    if (isLoading) return <Loading />;

    if (!invoice) {
        return (
            <AdminPage className="min-h-screen flex items-center justify-center">
                <div className="text-center p-12">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">Dossier Missing</h2>
                    <p className="text-[13px] text-slate-500 max-w-sm mb-8">The requested institutional ledger record could not be located in our fiscal shards.</p>
                    <button onClick={() => navigate(-1)} className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black uppercase text-[12px] tracking-widest hover:bg-black transition-all">Registry Index</button>
                </div>
            </AdminPage>
        );
    }

    return (
        <AdminPage className="bg-[#f8f9fc] print:bg-white">
            {/* ── Floating Dashboard Navigation (Hidden on Print) ── */}
            <div className="max-w-[1000px] mx-auto pt-10 pb-6 flex items-center justify-between px-4 print:hidden">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Ledger Registry
                </button>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handlePrint}
                        className="h-11 px-6 bg-white border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-3"
                    >
                        <Printer size={16} /> Print Report
                    </button>
                    <button className="h-11 px-6 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-black transition-all flex items-center gap-3 active:scale-95">
                        <Download size={16} /> Export PDF
                    </button>
                </div>
            </div>

            {/* ── The Formal Invoice Sheet ── */}
            <div className="max-w-[1000px] mx-auto px-4 pb-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-slate-100 rounded-[48px] shadow-2xl shadow-slate-200/50 overflow-hidden print:border-0 print:shadow-none print:rounded-none"
                >
                    {/* Invoice Formal Header */}
                    <div className="p-12 md:p-16 border-b-2 border-slate-50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-16 opacity-[0.03]">
                            <Building2 size={280} />
                        </div>
                        
                        <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 bg-[#0051d9] text-white rounded-[24px] flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-100">
                                        AS
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-black text-slate-900 leading-none">Al-Shifaa Institutional</h1>
                                        <p className="text-[10px] font-black text-[#0051d9] uppercase tracking-[0.2em] mt-2">Clinical Healthcare Shard</p>
                                    </div>
                                </div>
                                <div className="space-y-1.5 grayscale opacity-60">
                                    <p className="text-[12px] font-bold flex items-center gap-3"><MapPin size={12} /> Institutional Square, Sector G, Islamabad</p>
                                    <p className="text-[12px] font-bold flex items-center gap-3"><Phone size={12} /> +92 (51) 9200-EMR</p>
                                    <p className="text-[12px] font-bold flex items-center gap-3"><Globe size={12} /> clinical.alshifaa.org</p>
                                </div>
                            </div>
                            
                            <div className="text-left md:text-right">
                                <h2 className="text-5xl font-black text-slate-800 tracking-tighter mb-4">INVOICE</h2>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Document Registry</p>
                                    <p className="text-xl font-black text-slate-900">#{invoice.invoice_no}</p>
                                    <div className="pt-4 flex md:justify-end gap-3">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${invoice.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                            {invoice.status === 'PAID' ? 'Ledger Settled' : 'Awaiting Payment'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bill To Shard */}
                    <div className="bg-slate-50/50 px-12 md:px-16 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Recipient Identity</span>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#0051d9] font-black text-xl shadow-sm">
                                    {invoice.patient_name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-lg font-black text-slate-900 tracking-tight">{invoice.patient_name}</p>
                                    <p className="text-[11px] font-black text-[#0051d9] uppercase tracking-widest mt-1">PID-#{invoice.patient_details?.mrn || 'EXT-IDX'}</p>
                                    <p className="text-[12px] font-bold text-slate-500 mt-1">{invoice.patient_details?.address || 'Medical Ward Allocation'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 md:pl-12">
                            <div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Issue Shard</span>
                                <p className="text-[13px] font-black text-slate-900">{new Date(invoice.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Payment Channel</span>
                                <p className="text-[13px] font-black text-slate-900 capitalize">{invoice.payment_method || 'Awaiting Selection'}</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Due Date</span>
                                <p className="text-[13px] font-black text-red-500">{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('en-GB') : 'Immediate Settlement'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Itemized Clinical Matrix */}
                    <div className="px-12 md:px-16 py-12">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-slate-900/5">
                                    <th className="py-6 px-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Clinical Service / Shard</th>
                                    <th className="py-6 px-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Protocol Type</th>
                                    <th className="py-6 px-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Qty</th>
                                    <th className="py-6 px-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Aggregate (Rs.)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {invoice.items?.map((item, idx) => (
                                    <tr key={idx} className="group">
                                        <td className="py-8 px-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0051d9] group-hover:bg-blue-50 transition-all">
                                                    <Hash size={16} />
                                                </div>
                                                <span className="text-[14px] font-black text-slate-800 tracking-tight">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-8 px-4 text-center">
                                            <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">
                                                {item.item_type || 'Procedure'}
                                            </span>
                                        </td>
                                        <td className="py-8 px-4 text-center text-[14px] font-black text-slate-500">{item.quantity}</td>
                                        <td className="py-8 px-4 text-right text-[15px] font-black text-slate-900 tracking-tight">Rs. {parseFloat(item.subtotal).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Financial Footer Aggregation */}
                    <div className="bg-slate-900 p-12 md:p-16 flex flex-col md:flex-row justify-between gap-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 p-16 opacity-5">
                            <ShieldCheck size={180} />
                        </div>
                        
                        <div className="relative z-10 flex flex-col justify-end">
                            <div className="flex items-center gap-3 mb-6">
                                <CheckCheck size={24} className="text-emerald-400" />
                                <h3 className="text-lg font-black uppercase tracking-widest">Digital Verification Shard</h3>
                            </div>
                            <p className="text-[11px] font-bold text-slate-400 max-w-sm leading-relaxed uppercase tracking-widest opacity-60">
                                THIS IS A COMPUTER GENERATED FISCAL DOCUMENT. INSTITUTIONAL STAMP AND DIGITAL SIGNATURE ARE ENCRYPTED IN THE QR SHARD.
                            </p>
                        </div>
                        
                        <div className="relative z-10 space-y-4 md:w-96">
                            <div className="flex justify-between items-center opacity-40">
                                <span className="text-[11px] font-black uppercase tracking-widest">Ledger Subtotal</span>
                                <span className="text-[14px] font-black">Rs. {invoice.items?.reduce((a, b) => a + parseFloat(b.subtotal), 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center opacity-30 border-b border-white/10 pb-4">
                                <span className="text-[11px] font-black uppercase tracking-widest">Incident Tax (5%)</span>
                                <span className="text-[14px] font-black">+ Rs. {invoice.tax_amount?.toLocaleString() || '0'}</span>
                            </div>
                            <div className="flex justify-between items-end pt-4">
                                <div className="flex flex-col">
                                   <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">Institutional Total Payable</span>
                                   <span className="text-5xl font-black tracking-tighter leading-none">
                                      {parseFloat(invoice.total_amount).toLocaleString()}
                                   </span>
                                </div>
                                <span className="text-2xl font-black text-white/20 mb-1">PKR</span>
                            </div>
                        </div>
                    </div>

                    {/* Final Stamp Section */}
                    <div className="p-12 border-t border-slate-100 flex justify-between items-center text-slate-300">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 border-4 border-slate-50 rounded-full flex items-center justify-center mb-2 opacity-50">
                                <ShieldCheck size={40} />
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-widest">Auth Shard</span>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">System Audit Path</p>
                            <p className="text-[8px] font-mono uppercase opacity-40">{id}</p>
                        </div>
                    </div>
                </motion.div>
                
                {/* Secondary Actions */}
                <div className="mt-8 flex items-center justify-center gap-8 print:hidden">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0051d9] transition-colors group">
                        <Mail size={16} className="group-hover:-translate-y-1 transition-transform" />
                        Broadcast via Email
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0051d9] transition-colors group">
                        <ShieldCheck size={16} className="group-hover:scale-110 transition-transform" />
                        Verify Hash Shard
                    </button>
                </div>
            </div>
        </AdminPage>
    );
}
