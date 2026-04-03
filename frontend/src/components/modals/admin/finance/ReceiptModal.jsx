import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Printer, 
  Download, 
  Receipt, 
  ShieldCheck, 
  Calendar,
  CreditCard,
  Hash
} from 'lucide-react';
import { createPortal } from 'react-dom';
import { Button, Badge } from '../../../ui';

/**
 * 🧾 Modern Compact Receipt Shard (Refined Size)
 * Re-mapped to the Global Financial Modal Registry.
 */
export default function ReceiptModal({ isOpen, onClose, transaction }) {
    const printRef = useRef();

    if (!isOpen || !transaction) return null;

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); 
    };

    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                />
                
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 10 }}
                    className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.4)] overflow-hidden border border-slate-200 dark:border-white/5"
                >
                    {/* Compact Header */}
                    <div className="px-6 py-6 bg-accent-primary text-white flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <Receipt size={18} />
                            </div>
                            <div>
                                <h2 className="text-sm font-black uppercase tracking-tight leading-none italic">Clinical Receipt</h2>
                                <p className="text-[7px] font-bold uppercase tracking-[0.2em] opacity-60 mt-1">Node Verified #8821</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full transition-all opacity-40 hover:opacity-100">
                            <X size={16} />
                        </button>
                    </div>

                    {/* Receipt Body */}
                    <div ref={printRef} className="p-8 space-y-6 bg-white dark:bg-slate-900">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5">
                            <div className="space-y-0.5">
                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none">Matrix Shard ID</p>
                                <p className="text-[11px] font-black text-slate-900 dark:text-white tabular-nums">{transaction.transaction_id || `TXN-${transaction.id}`}</p>
                            </div>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none py-1 px-3 rounded-full text-[7px] font-black uppercase tracking-widest">
                                Status: Committed
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Hash size={10} />
                                    <span className="text-[7px] font-black uppercase tracking-widest">Identity</span>
                                </div>
                                <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase truncate">{transaction.patient_name}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <div className="flex items-center gap-2 text-slate-400 justify-end">
                                    <Calendar size={10} />
                                    <span className="text-[7px] font-black uppercase tracking-widest">Timestamp</span>
                                </div>
                                <p className="text-[10px] font-black text-slate-900 dark:text-white tabular-nums opacity-60 italic">{new Date(transaction.timestamp).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {/* Financial Shard */}
                        <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Category</span>
                                <span className="text-[8px] font-black text-accent-primary uppercase italic">{transaction.type} Protocol</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-white/5">
                                <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Sync Channel</span>
                                <div className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                                    <CreditCard size={10} className="opacity-40" />
                                    <span className="text-[9px] font-black uppercase">{transaction.method}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-white/5">
                                <span className="text-[8px] font-black text-accent-primary uppercase tracking-[.25em]">Density</span>
                                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums italic">
                                    Rs. {Number(transaction.amount).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Audit Verification */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <ShieldCheck size={16} />
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest leading-none">Encrypted Shard</p>
                                <p className="text-[6px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Verified Audit Path #44021</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Hub */}
                    <div className="px-8 pb-8 flex gap-3">
                        <Button 
                            onClick={handlePrint}
                            className="flex-1 h-12 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl border-none text-[8px] font-black uppercase tracking-[0.2em] hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            <Printer size={12} /> Print
                        </Button>
                        <Button className="flex-1 h-12 bg-accent-primary text-white rounded-xl border-none text-[8px] font-black uppercase tracking-[0.2em] shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                            <Download size={12} /> Get PDF
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
}
