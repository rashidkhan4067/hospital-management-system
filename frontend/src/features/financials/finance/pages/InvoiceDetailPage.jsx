import React from 'react';
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
    User
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';

/**
 * 🧾 InvoiceDetailPage (Fiscal Dossier)
 * High-fidelity audit view of a clinical transaction / patient invoice.
 */
export default function InvoiceDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Mock invoice data
    const invoice = {
        id: id || 'INV-2026-9921',
        date: 'May 14, 2026',
        due_date: 'May 21, 2026',
        status: 'Unpaid',
        patient: {
            name: 'Ali Khan',
            id: 'PID-10293',
            email: 'ali.khan@nexus.com'
        },
        items: [
            { id: 1, desc: 'Consultation Fee (Cardiology)', qty: 1, rate: 3000 },
            { id: 2, desc: 'Diagnostic: ECG Shard Analysis', qty: 1, rate: 2500 },
            { id: 3, desc: 'Lab: Complete Blood Count', qty: 1, rate: 1200 },
        ],
        summary: {
            subtotal: 6700,
            tax: 335,
            total: 7035
        }
    };

    return (
        <AdminPage className="min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
                
                {/* ── Breadcrumbs & Actions ── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-full bg-surface-variant/50 hover:bg-surface-variant flex items-center justify-center transition-colors border border-outline-variant/30"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-text-main tracking-tight uppercase leading-none mb-2">{invoice.id}</h1>
                            <div className="flex items-center gap-2">
                                <span className="m3-pill bg-warning-container text-warning uppercase font-black text-[9px] px-3">{invoice.status}</span>
                                <span className="text-[11px] font-bold text-text-sub opacity-50 flex items-center gap-1">
                                   <Calendar size={12} /> Issued {invoice.date}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="h-12 px-6 rounded-2xl bg-surface-variant/50 hover:bg-surface-variant flex items-center gap-2 text-[12px] font-bold text-text-main border border-outline-variant/30 transition-colors">
                            <Printer size={16} />
                            Print
                        </button>
                        <button className="h-12 px-6 rounded-2xl bg-primary text-white flex items-center gap-2 text-[12px] font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                            <Download size={16} />
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    
                    {/* ── Left Content: Dossier Details ── */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                        
                        {/* Transaction Identities */}
                        <div className="bg-surface-bright border border-outline-variant rounded-[40px] p-8 md:p-10 elev-1 grid grid-cols-2 gap-8">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-[10px] font-black text-text-sub uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                    <User size={12} className="text-primary" /> Recipient Matrix
                                </h3>
                                <div>
                                    <p className="text-lg font-black text-text-main uppercase tracking-tight">{invoice.patient.name}</p>
                                    <p className="text-xs font-bold text-primary mb-2">{invoice.patient.id}</p>
                                    <p className="text-xs font-medium text-text-sub opacity-60 underline underline-offset-4">{invoice.patient.email}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-[10px] font-black text-text-sub uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                    <Clock size={12} className="text-primary" /> Temporal Bounds
                                </h3>
                                <div>
                                    <p className="text-xs font-bold text-text-main mb-1 flex items-center justify-between">
                                        <span className="opacity-40 uppercase tracking-widest">Issued On:</span>
                                        <span>{invoice.date}</span>
                                    </p>
                                    <p className="text-xs font-bold text-text-main mb-1 flex items-center justify-between">
                                        <span className="opacity-40 uppercase tracking-widest">Due Date:</span>
                                        <span className="text-error">{invoice.due_date}</span>
                                    </p>
                                    <p className="text-xs font-bold text-text-main flex items-center justify-between">
                                        <span className="opacity-40 uppercase tracking-widest">Currency:</span>
                                        <span>PKR / Rs.</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Itemization Matrix */}
                        <div className="bg-surface-bright border border-outline-variant rounded-[48px] overflow-hidden elev-2">
                             <table className="w-full text-left">
                                <thead className="bg-surface-variant/30 border-b border-outline-variant">
                                    <tr className="text-[10px] uppercase font-bold text-text-sub tracking-widest">
                                        <th className="px-10 py-6">Clinical Registry Shard</th>
                                        <th className="px-6 py-6 text-center">Qty</th>
                                        <th className="px-10 py-6 text-right">Aggregate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.items.map((item) => (
                                        <tr key={item.id} className="border-b border-outline-variant/20 hover:bg-surface-variant/5 transition-colors">
                                            <td className="px-10 py-6 flex items-center gap-4">
                                                <div className="w-6 h-6 rounded-lg bg-surface-variant/40 flex items-center justify-center text-text-sub opacity-30"><FileText size={14} /></div>
                                                <span className="text-[13px] font-black text-text-main uppercase tracking-tight italic">{item.desc}</span>
                                            </td>
                                            <td className="px-6 py-6 text-center text-[13px] font-mono text-text-sub tracking-widest">{item.qty}</td>
                                            <td className="px-10 py-6 text-[13px] font-black text-text-main text-right tabular-nums tracking-tighter italic">Rs. {item.rate.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                             </table>

                             <div className="p-8 md:p-10 bg-surface-variant/10 flex flex-col items-end gap-3">
                                <div className="flex items-center justify-between w-full md:w-64">
                                    <span className="text-[10px] font-black text-text-sub uppercase tracking-widest">Subtotal</span>
                                    <span className="text-[13px] font-black text-text-main tabular-nums italic">Rs. {invoice.summary.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between w-full md:w-64">
                                    <span className="text-[10px] font-black text-text-sub uppercase tracking-widest flex items-center gap-1.5">Hospital Surcharge <span className="bg-surface-variant px-1 rounded-sm text-[8px]">5%</span></span>
                                    <span className="text-[13px] font-black text-text-main tabular-nums italic">+ Rs. {invoice.summary.tax.toLocaleString()}</span>
                                </div>
                                <div className="h-px bg-outline-variant/60 w-full md:w-64 my-2" />
                                <div className="flex items-center justify-between w-full md:w-80">
                                    <span className="text-sm font-black text-text-main uppercase tracking-widest">Total Committed</span>
                                    <span className="text-3xl font-black text-primary tracking-tighter tabular-nums italic">Rs. {invoice.summary.total.toLocaleString()}</span>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* ── Right Content: Settlement Status ── */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                        
                        {/* Status Card */}
                        <div className="bg-surface-bright border border-outline-variant rounded-[40px] p-8 md:p-10 elev-2 flex flex-col gap-8">
                             <h2 className="text-xl font-bold text-text-main tracking-tight flex items-center gap-3">
                                <Receipt size={22} className="text-primary" />
                                Fiscal Settlement
                             </h2>

                             <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 text-warning p-4 rounded-3xl bg-warning/5 border border-warning/10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
                                    <p className="text-[11px] font-black uppercase tracking-widest">Awaiting Deposit Node</p>
                                </div>
                                <p className="text-[11px] text-text-sub font-medium opacity-60 leading-relaxed uppercase tracking-wider">The electronic dossier has been broadcasted to the patient's terminal. No payment telemetry received.</p>
                             </div>

                             <div className="h-px bg-outline-variant/30" />

                             <div className="flex flex-col gap-3">
                                <button className="h-14 bg-primary text-white rounded-[24px] font-black text-[13px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">Broadcast Reminder</button>
                                <button className="h-14 bg-surface-variant/50 text-text-main rounded-[24px] font-black text-[13px] uppercase tracking-[0.2em] border border-outline-variant/30 hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
                                    <Mail size={16} /> Send Email Record
                                </button>
                             </div>

                             <div className="flex items-center justify-center gap-2 text-[10px] text-text-sub font-bold opacity-30 uppercase tracking-[0.1em]">
                                <ShieldCheck size={14} />
                                Compliant with P-VAT (R4)
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPage>
    );
}
