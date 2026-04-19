import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    CheckCircle2,
    Users,
    Search,
    ChevronRight,
    X,
    Calculator
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';
import { apiClient } from '@/core/api';
import { UI_TOKENS, CTA_THEMES } from '@/core/config/UI';

/**
 * 🧾 GenerateInvoicePage (Financial Matrix Node)
 * Professional medical billing interface for itemized clinical invoicing.
 * Standardized to Google UI (M3) architecture.
 */
export default function GenerateInvoicePage() {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Line items state
    const [items, setItems] = useState([
        { id: Date.now(), name: 'General Consultation', qty: 1, unit_price: 1500, type: 'CONSULTATION' }
    ]);

    // ── Load Patient Registry ──
    useEffect(() => {
        apiClient.get('/patients/profiles/')
            .then(res => {
                const data = res.data.results || res.data;
                if (Array.isArray(data)) setPatients(data);
            })
            .catch(err => console.error("Patient Retrieval Error:", err));
    }, []);

    const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const addItem = () => {
        setItems([...items, { 
            id: Date.now(), 
            name: '', 
            quantity: 1, 
            unit_price: 0, 
            item_type: 'OTHER' 
        }]);
    };

    const removeItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const updateItem = (id, field, value) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const finalize = async () => {
        if (!selectedPatient) {
            alert("Select a patient node to initialize the fiscal shard.");
            return;
        }
        
        setIsProcessing(true);
        try {
            // Create the base invoice node
            const invoiceRes = await apiClient.post('/finance/invoices/', {
                patient: selectedPatient.id,
                due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            });
            
            const invoiceId = invoiceRes.data.id;
            
            // Post line item shards using the specialized add-item action
            for (const item of items) {
                await apiClient.post(`/finance/invoices/${invoiceId}/add-item/`, {
                    name: item.name || 'Clinical Service Shard',
                    item_type: item.item_type || 'OTHER',
                    quantity: item.quantity || 1,
                    unit_price: item.unit_price || 0
                });
            }
            
            setIsDone(true);
            setTimeout(() => navigate('/admin/financials'), 3000);
        } catch (err) {
            console.error("Fiscal Registry Failure:", err);
            alert("Failed to synchronize fiscal node. Ensure all item descriptors are complete.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (isDone) {
        return (
            <AdminPage className="min-h-[85vh] flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`${UI_TOKENS.SHARD_BASE} text-center max-w-sm`}
                >
                    <div className="w-24 h-24 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <CheckCircle2 size={48} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-3">Invoice Finalized</h1>
                    <p className="text-sm text-slate-600 mb-8">
                        The fiscal record has been synchronized with the registry. Digital receipt dispatched to <strong className="text-slate-900">{selectedPatient?.full_name}</strong>.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => navigate('/admin/financials')} className={CTA_THEMES.PRIMARY}>
                            Return to Dashboard
                        </button>
                    </div>
                </motion.div>
            </AdminPage>
        );
    }

    return (
        <AdminPage className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                
                {/* ── Dashboard Header ── */}
                <header className={UI_TOKENS.HEADER}>
                    <div className={UI_TOKENS.HEADER_LEFT}>
                        <div className={UI_TOKENS.ICON_BOX}>
                            <ReceiptText size={20} />
                        </div>
                        <div>
                            <span className={UI_TOKENS.TEXT_SECONDARY}>Fiscal Matrix</span>
                            <h1 className={`${UI_TOKENS.TEXT_PRIMARY} text-2xl mt-1`}>Generate Clinical Invoice</h1>
                            <p className="text-sm text-slate-500 font-medium mt-1">Aggregate clinical encounters and pharmacy expenditures into a unified shard.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className={CTA_THEMES.OUTLINED}>
                            <Printer size={16} className="mr-2" /> Preview
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8 items-start">
                    
                    {/* ── Left Column: Editor ── */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                        
                        {/* 👤 Patient Identity Selection */}
                        <section className={UI_TOKENS.SHARD_BASE}>
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Users size={20} className="text-[#1a73e8]" />
                                Patient Recipient
                            </h2>
                            
                            <div className="relative">
                                <select 
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold focus:bg-white focus:border-[#1a73e8] focus:ring-4 focus:ring-[#1a73e8]/10 transition-all appearance-none cursor-pointer outline-none"
                                    onChange={(e) => {
                                        const p = patients.find(pat => pat.id === parseInt(e.target.value));
                                        setSelectedPatient(p);
                                    }}
                                    value={selectedPatient?.id || ''}
                                >
                                    <option value="" disabled>Select Patient Node...</option>
                                    {patients.map(p => (
                                        <option key={p.id} value={p.id}>{p.full_name} ({p.email})</option>
                                    ))}
                                </select>
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                    <Search size={18} />
                                </div>
                            </div>
                        </section>

                        {/* 📋 Line Items Matrix */}
                        <section className={`${UI_TOKENS.SHARD_BASE} !p-0 overflow-hidden`}>
                            <div className="p-6 md:p-8 border-b border-slate-50">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                                    <FileText size={20} className="text-[#1a73e8]" />
                                    Billable Shards
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                            <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Service / Item</th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-24 text-center">Qty</th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-40">Unit Price</th>
                                            <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Aggregate</th>
                                            <th className="px-4 py-4 w-16"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        <AnimatePresence initial={false}>
                                            {items.map((item) => (
                                                <motion.tr 
                                                    key={item.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="group hover:bg-slate-50/50 transition-colors"
                                                >
                                                    <td className="px-8 py-5">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Service description..."
                                                            className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-900 placeholder:text-slate-300"
                                                            value={item.name}
                                                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <input 
                                                            type="number" 
                                                            className="w-full h-10 bg-slate-100/50 border-none rounded-xl text-center text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#1a73e8]/10 transition-all"
                                                            value={item.quantity}
                                                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">Rs.</span>
                                                            <input 
                                                                type="number" 
                                                                className="w-full h-10 pl-8 bg-slate-100/50 border-none rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#1a73e8]/10 transition-all"
                                                                value={item.unit_price}
                                                                onChange={(e) => updateItem(item.id, 'unit_price', parseFloat(e.target.value) || 0)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-right text-sm font-bold text-slate-900 tabular-nums">
                                                        Rs. {(item.quantity * item.unit_price).toLocaleString()}
                                                    </td>
                                                    <td className="px-4 py-5">
                                                        <button 
                                                            onClick={() => removeItem(item.id)}
                                                            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>

                            <button 
                                onClick={addItem}
                                className="w-full py-6 flex items-center justify-center gap-2 text-[#1a73e8] hover:bg-blue-50/50 transition-colors border-t border-slate-50 font-bold text-[11px] uppercase tracking-widest"
                            >
                                <Plus size={16} />
                                Add Clinical Entry
                            </button>
                        </section>
                    </div>

                    {/* ── Right Column: Summary ── */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 sticky top-8">
                        <section className={UI_TOKENS.SHARD_BASE}>
                            <h2 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <Calculator size={20} className="text-[#1a73e8]" />
                                Settlement Summary
                            </h2>
                            
                            <div className="flex flex-col gap-4 mb-8">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Subtotal</span>
                                    <span className="text-slate-900 font-bold tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                                        Clinical Tax <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">5%</span>
                                    </div>
                                    <span className="text-slate-900 font-bold tabular-nums">+ Rs. {tax.toLocaleString()}</span>
                                </div>
                                <div className="h-px bg-slate-50 my-2" />
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-bold text-slate-900">Grand Total</span>
                                    <span className="text-3xl font-bold text-[#1a73e8] tracking-tight tabular-nums">
                                        Rs. {total.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 mb-8">
                                <button className={CTA_THEMES.SECONDARY + " w-full !h-11 !text-[11px] uppercase tracking-widest"}>
                                    <Percent size={14} className="mr-2" /> Apply Discount
                                </button>
                                <button className={CTA_THEMES.OUTLINED + " w-full !h-11 !text-[11px] uppercase tracking-widest"}>
                                    <CreditCard size={14} className="mr-2" /> Insurance Node
                                </button>
                            </div>

                            <button 
                                onClick={finalize}
                                disabled={isProcessing || !selectedPatient || items.some(i => !i.name)}
                                className={CTA_THEMES.PRIMARY + " w-full !h-14 !rounded-2xl shadow-xl shadow-blue-500/20"}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                                        Finalizing...
                                    </>
                                ) : (
                                    <>
                                        <ReceiptText size={18} className="mr-2" /> Finalize & Sync
                                    </>
                                )}
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                <ShieldCheck size={14} className="text-green-500" />
                                Financial Compliance (IFRS) Active
                            </div>
                        </section>
                        
                        {selectedPatient && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-5 rounded-[24px] bg-blue-50 border border-blue-100 flex items-start gap-4"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1a73e8] shrink-0 font-bold text-xs border border-blue-100">
                                    {selectedPatient.full_name?.[0]}
                                00
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Recipient</p>
                                    <p className="text-sm font-bold text-slate-900">{selectedPatient.full_name}</p>
                                    <p className="text-[11px] text-[#1a73e8] font-bold mt-1 uppercase">{selectedPatient.email}</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </AdminPage>
    );
}


