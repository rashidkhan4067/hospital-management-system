import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    ReceiptText, 
    Printer, 
    Download, 
    CreditCard, 
    Plus, 
    Trash2, 
    ShieldCheck, 
    FileText,
    Percent,
    ArrowUpRight,
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';

/**
 * 🧾 GenerateInvoicePage (Financial Matrix Node)
 * Professional medical billing interface for itemized clinical invoicing.
 */
export default function GenerateInvoicePage() {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDone, setIsDone] = useState(false);

    // Mock line items
    const [items, setItems] = useState([
        { id: 1, desc: 'Consultation Fee (Specialist)', qty: 1, rate: 2500 },
        { id: 2, desc: 'Diagnostic Lab: Lipid Profile', qty: 1, rate: 1800 },
        { id: 3, desc: 'Medication: Amoxicillin 500mg', qty: 2, rate: 450 },
    ]);

    const subtotal = items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const finalize = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsDone(true);
        }, 1800);
    };

    if (isDone) {
        return (
            <AdminPage className="min-h-[85vh] flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center max-w-sm"
                >
                    <div className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-8">
                        <ShieldCheck size={40} />
                    </div>
                    <h1 className="text-2xl font-bold text-text-main mb-3">Invoice Finalized</h1>
                    <p className="text-sm text-text-sub mb-8">
                        Transaction <strong>#INV-77291</strong> has been recorded. The digital receipt was sent to the patient.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => navigate('/admin/financials')} className="w-full h-12 bg-primary text-white rounded-full font-bold text-[13px] hover:brightness-110 shadow-lg shadow-primary/20">Go to Financial Dashboard</button>
                        <button className="w-full h-12 bg-surface-variant/50 text-text-main rounded-full font-bold text-[13px] flex items-center justify-center gap-2 border border-outline-variant/50">
                            <Download size={16} /> Download PDF
                        </button>
                    </div>
                </motion.div>
            </AdminPage>
        );
    }

    return (
        <AdminPage className="min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
                
                {/* ── Page Header ── */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-warning">
                            <Plus size={14} strokeWidth={3} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">New Fiscal Transaction</span>
                        </div>
                        <h1 className="text-4xl font-black text-text-main tracking-tight">Generate Patient Invoice</h1>
                        <p className="text-text-sub font-medium opacity-60">Aggregate clinical services and pharmacy expenditures.</p>
                    </div>

                    <div className="flex gap-3">
                        <button className="h-12 px-6 rounded-2xl bg-surface-variant/50 hover:bg-surface-variant flex items-center gap-2 text-[12px] font-bold text-text-main border border-outline-variant/30 transition-colors">
                            <Printer size={16} />
                            Preview
                        </button>
                        <button className="h-12 px-6 rounded-2xl bg-surface-variant/50 hover:bg-surface-variant flex items-center gap-2 text-[12px] font-bold text-text-main border border-outline-variant/30 transition-colors">
                            <Download size={16} />
                            Export
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8">
                    
                    {/* ── Left: Invoice Editor ── */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                        
                        {/* Patient Link */}
                        <div className="bg-surface-bright border border-outline-variant rounded-[32px] p-6 elev-1 flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">AK</div>
                                <div>
                                    <p className="text-xs font-bold text-text-main">Ali Khan</p>
                                    <p className="text-[10px] text-text-sub">PID: 772-19283 · Clinical Dept: Cardiology</p>
                                </div>
                            </div>
                            <div className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                Change Patient
                                <ArrowUpRight size={12} />
                            </div>
                        </div>

                        {/* Line Items Matrix */}
                        <div className="bg-surface-bright border border-outline-variant rounded-[40px] overflow-hidden elev-2">
                             <table className="w-full text-left">
                                <thead className="bg-surface-variant/30 border-b border-outline-variant">
                                    <tr className="text-[10px] uppercase font-bold text-text-sub tracking-widest">
                                        <th className="px-8 py-5">Service / Item Details</th>
                                        <th className="px-6 py-5">Qty</th>
                                        <th className="px-6 py-5">Unit Price</th>
                                        <th className="px-8 py-5 text-right">Aggregate</th>
                                        <th className="px-4 py-5"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id} className="border-b border-outline-variant/30 hover:bg-surface-variant/10 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 rounded bg-surface-variant/50 flex items-center justify-center"><FileText size={12} className="text-text-sub" /></div>
                                                    <span className="text-[13px] font-semibold text-text-main">{item.desc}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-[13px] font-mono text-text-sub">{item.qty}</td>
                                            <td className="px-6 py-5 text-[13px] font-mono text-text-sub">PKR {item.rate.toLocaleString()}</td>
                                            <td className="px-8 py-5 text-[13px] font-bold text-text-main text-right">PKR {(item.qty * item.rate).toLocaleString()}</td>
                                            <td className="px-4 py-5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="text-error hover:scale-110 transition-transform"><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                             </table>
                             
                             <button className="w-full py-6 flex items-center justify-center gap-2 text-primary hover:bg-primary/5 transition-colors border-t border-outline-variant/30 border-dashed">
                                <Plus size={18} />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Add Clinical Service</span>
                             </button>
                        </div>
                    </div>

                    {/* ── Right: Totals & Settlement ── */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-surface-bright border border-outline-variant rounded-[40px] p-8 md:p-10 elev-2 flex flex-col gap-8">
                            <h2 className="text-xl font-bold text-text-main tracking-tight">Settlement Summary</h2>
                            
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between text-[13px]">
                                    <span className="text-text-sub font-medium">Subtotal</span>
                                    <span className="text-text-main font-mono">PKR {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-[13px]">
                                    <div className="flex items-center gap-2 text-text-sub font-medium">
                                        Clinical Tax <span className="text-[10px] font-bold bg-surface-variant px-1.5 py-0.5 rounded">5%</span>
                                    </div>
                                    <span className="text-text-main font-mono">+ PKR {tax.toLocaleString()}</span>
                                </div>
                                <div className="h-px bg-outline-variant/50 my-2" />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-text-main">Grand Total</span>
                                    <span className="text-2xl font-black text-primary font-mono tracking-tighter">PKR {total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button className="h-12 w-full rounded-2xl bg-surface-variant/50 border border-outline-variant/30 text-[11px] font-bold text-text-sub flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors">
                                    <Percent size={14} />
                                    Apply Charity/Discount
                                </button>
                                <button className="h-12 w-full rounded-2xl bg-surface-variant/50 border border-outline-variant/30 text-[11px] font-bold text-text-sub flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors">
                                    <CreditCard size={14} />
                                    Payment Verified (Insurance)
                                </button>
                            </div>

                            <button 
                                onClick={finalize}
                                disabled={isProcessing}
                                className="w-full h-14 bg-primary text-white rounded-[24px] font-bold text-sm elev-2 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Syncing Registry...
                                    </>
                                ) : (
                                    <>
                                        <ReceiptText size={18} />
                                        Finalize & Sync
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-2 text-[10px] text-text-sub font-medium opacity-40">
                                <CheckCircle2 size={12} />
                                Financial Compliance (IFRS) Active
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPage>
    );
}
