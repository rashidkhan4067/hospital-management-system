import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Plus, 
    ShoppingCart, 
    Trash2, 
    PackageSearch, 
    ArrowRight,
    Truck,
    ShieldAlert,
    CheckCircle2,
    FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';

/**
 * 📦 PharmacyOrderPage (Procurement Gateway)
 * High-fidelity interface for ordering medical supplies and medication shards.
 */
export default function PharmacyOrderPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [items, setItems] = useState([
        { id: 1, name: 'Amoxicillin 500mg (Batch C)', qty: 50, supplier: 'PharmaCore Intl' },
        { id: 2, name: 'Insulin Glargine Vials', qty: 20, supplier: 'BioMed Systems' },
    ]);

    const handleOrder = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <AdminPage className="min-h-[80vh] flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center max-w-sm"
                >
                    <div className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} />
                    </div>
                    <h1 className="text-2xl font-bold text-text-main mb-3">Order Dispatched</h1>
                    <p className="text-sm text-text-sub mb-8">
                        Purchase Order <strong>#PO-99283</strong> has been synchronized with the supplier gateway.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => navigate('/admin/pharmacy')} className="w-full h-12 bg-primary text-white rounded-full font-bold text-[13px] hover:brightness-110">Return to Pharmacy Hub</button>
                    </div>
                </motion.div>
            </AdminPage>
        );
    }

    return (
        <AdminPage className="min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
                
                {/* ── Page Header ── */}
                <header className="mb-12">
                    <div className="flex items-center gap-2 mb-3 text-primary">
                        <ShoppingCart size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Procurement Gateway</span>
                    </div>
                    <h1 className="text-4xl font-black text-text-main tracking-tight">Create Supply Order</h1>
                    <p className="text-text-sub font-medium opacity-60">Initialize restocking for critical clinical medication shards.</p>
                </header>

                <div className="grid grid-cols-12 gap-8">
                    
                    {/* ── Left: Order Builder ── */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                        
                        {/* Supplier Selection */}
                        <div className="bg-surface-bright border border-outline-variant rounded-[32px] p-6 elev-1 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-surface-variant flex items-center justify-center text-text-sub">
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-main uppercase tracking-widest leading-none mb-1">Primary Logistics Partner</p>
                                    <p className="text-sm font-bold text-primary">PharmaCore Global Distribution</p>
                                </div>
                            </div>
                            <button className="text-[10px] font-bold text-primary px-4 py-2 bg-primary/5 rounded-full uppercase tracking-widest">Switch</button>
                        </div>

                        {/* Items Matrix */}
                        <div className="bg-surface-bright border border-outline-variant rounded-[40px] overflow-hidden elev-2">
                             <table className="w-full text-left">
                                <thead className="bg-surface-variant/30 border-b border-outline-variant">
                                    <tr className="text-[10px] uppercase font-bold text-text-sub tracking-widest">
                                        <th className="px-8 py-5">Medication / Supply Node</th>
                                        <th className="px-6 py-5">Quantity</th>
                                        <th className="px-8 py-5 text-right">Aggregate</th>
                                        <th className="px-4 py-5"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id} className="border-b border-outline-variant/30 hover:bg-surface-variant/10 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white border border-outline-variant flex items-center justify-center text-text-sub opacity-40">
                                                        <FileText size={16} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[13px] font-bold text-text-main">{item.name}</span>
                                                        <span className="text-[10px] text-text-sub">{item.supplier}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <input type="number" defaultValue={item.qty} className="w-20 h-10 px-3 bg-surface-variant/20 border border-outline-variant/50 rounded-xl text-center text-[13px] font-bold outline-none focus:border-primary" />
                                            </td>
                                            <td className="px-8 py-5 text-[13px] font-black text-text-main text-right">PKR {(item.qty * 120).toLocaleString()}</td>
                                            <td className="px-4 py-5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="text-error"><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                             </table>
                             
                             <button className="w-full py-6 flex items-center justify-center gap-2 text-primary hover:bg-primary/5 transition-colors border-t border-outline-variant/30 border-dashed">
                                <Plus size={18} />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Add Medication to Order</span>
                             </button>
                        </div>
                    </div>

                    {/* ── Right: Summary ── */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-surface-bright border border-outline-variant rounded-[40px] p-8 md:p-10 elev-2 flex flex-col gap-8">
                            <h2 className="text-xl font-bold text-text-main tracking-tight flex items-center gap-3">
                                <PackageSearch size={22} className="text-primary" />
                                Order Profile
                            </h2>
                            
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between text-[12px]">
                                    <span className="text-text-sub font-medium">Estimated Delivery</span>
                                    <span className="text-text-main font-bold">24-48 Hours</span>
                                </div>
                                <div className="flex items-center justify-between text-[12px]">
                                    <span className="text-text-sub font-medium">Logistic Priority</span>
                                    <span className="text-warning font-bold uppercase tracking-widest">High</span>
                                </div>
                                <div className="h-px bg-outline-variant/50" />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-text-main">Total Commitment</span>
                                    <span className="text-2xl font-black text-text-main tracking-tighter tabular-nums">PKR 12,400</span>
                                </div>
                            </div>

                            <div className="p-5 rounded-[24px] bg-error/5 border border-error/10 flex gap-4">
                                <ShieldAlert size={20} className="text-error shrink-0" />
                                <p className="text-[10px] font-bold text-error leading-relaxed uppercase tracking-wide">Note: Restricted medications require clinical head override before final dispatch.</p>
                            </div>

                            <button 
                                onClick={handleOrder}
                                disabled={isSubmitting}
                                className="w-full h-16 bg-primary text-white rounded-[28px] font-bold text-sm elev-2 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Syncing Nexus...
                                    </>
                                ) : (
                                    <>
                                        Dispatch Order
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPage>
    );
}
