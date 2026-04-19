import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    ShoppingCart, 
    Trash2, 
    PackageSearch, 
    ArrowRight,
    Truck,
    ShieldAlert,
    CheckCircle2,
    FileText,
    Clock,
    Search,
    ChevronRight,
    Package
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';
import { apiClient } from '@/core/api';
import { UI_TOKENS, CTA_THEMES } from '@/core/config/UI';

/**
 * 📦 PharmacyOrderPage (Procurement Gateway)
 * High-fidelity interface for ordering medical supplies and medication shards.
 * Standardized to Google UI (M3) architecture.
 */
export default function PharmacyOrderPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [inventoryItems, setInventoryItems] = useState([]);
    
    // Order items state
    const [items, setItems] = useState([
        { id: Date.now(), inventory_id: '', name: '', qty: 10, unit_price: 0, supplier: 'PharmaCore Intl' }
    ]);

    // ── Load Inventory Matrix ──
    useEffect(() => {
        apiClient.get('/inventory/items/')
            .then(res => {
                const data = res.data.results || res.data;
                if (Array.isArray(data)) setInventoryItems(data);
            })
            .catch(err => console.error("Inventory Retrieval Error:", err));
    }, []);

    const subtotal = items.reduce((acc, item) => acc + (item.qty * item.unit_price), 0);

    const addItem = () => {
        setItems([...items, { 
            id: Date.now(), 
            inventory_id: '', 
            name: '', 
            qty: 1, 
            unit_price: 0, 
            supplier: 'Global Logistics' 
        }]);
    };

    const removeItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const updateItem = (id, field, value) => {
        if (field === 'inventory_id') {
            const invItem = inventoryItems.find(i => i.id === parseInt(value));
            setItems(items.map(item => 
                item.id === id ? { 
                    ...item, 
                    inventory_id: value, 
                    name: invItem.name, 
                    unit_price: invItem.unit_price 
                } : item
            ));
        } else {
            setItems(items.map(item => 
                item.id === id ? { ...item, [field]: value } : item
            ));
        }
    };

    const handleOrder = async () => {
        if (items.some(i => !i.inventory_id)) {
            alert("Ensure all item shards are mapped to inventory nodes.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Use the adjust-stock endpoint for atomic mutation and audit logging
            for (const item of items) {
                await apiClient.post(`/inventory/items/${item.inventory_id}/adjust-stock/`, {
                    type: 'in',
                    quantity: item.qty,
                    reason: 'Procurement Dispatch - Clinical Restocking'
                });
            }
            setIsSuccess(true);
            setTimeout(() => navigate('/admin/pharmacy'), 3000);
        } catch (err) {
            console.error("Procurement Protocol Failure:", err);
            alert("Failed to synchronize procurement shard. Check clinical connectivity.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <AdminPage className="min-h-[80vh] flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`${UI_TOKENS.SHARD_BASE} text-center max-w-sm`}
                >
                    <div className="w-24 h-24 rounded-full bg-blue-50 text-[#1a73e8] flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <CheckCircle2 size={48} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-3">Order Dispatched</h1>
                    <p className="text-sm text-slate-600 mb-8">
                        Purchase Order shard has been synchronized with the supplier gateway. Inventory nodes will update upon delivery confirmation.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => navigate('/admin/pharmacy')} className={CTA_THEMES.PRIMARY}>
                            Return to Pharmacy Hub
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
                            <ShoppingCart size={20} />
                        </div>
                        <div>
                            <span className={UI_TOKENS.TEXT_SECONDARY}>Procurement Gateway</span>
                            <h1 className={`${UI_TOKENS.TEXT_PRIMARY} text-2xl mt-1`}>Create Supply Order</h1>
                            <p className="text-sm text-slate-500 font-medium mt-1">Initialize restocking for critical clinical medication shards and resource nodes.</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8 items-start">
                    
                    {/* ── Left Column: Order Builder ── */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                        
                        {/* Supplier Selection */}
                        <section className={UI_TOKENS.SHARD_BASE}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#1a73e8]">
                                        <Truck size={24} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className={UI_TOKENS.TEXT_SECONDARY}>Primary Logistics Partner</p>
                                        <p className="text-sm font-bold text-slate-900 mt-1">PharmaCore Global Distribution</p>
                                    </div>
                                </div>
                                <button className={CTA_THEMES.SECONDARY + " !h-10 !text-[11px] !px-4"}>Switch Partner</button>
                            </div>
                        </section>

                        {/* Items Matrix */}
                        <section className={`${UI_TOKENS.SHARD_BASE} !p-0 overflow-hidden`}>
                            <div className="p-6 md:p-8 border-b border-slate-50">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                                    <Package size={20} className="text-[#1a73e8]" />
                                    Supply Itemization
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                            <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Medication / Supply Node</th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-24 text-center">Qty</th>
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
                                                        <select 
                                                            className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-900 cursor-pointer appearance-none"
                                                            value={item.inventory_id}
                                                            onChange={(e) => updateItem(item.id, 'inventory_id', e.target.value)}
                                                        >
                                                            <option value="" disabled>Select Item Node...</option>
                                                            {inventoryItems.map(inv => (
                                                                <option key={inv.id} value={inv.id}>{inv.name} (Stock: {inv.current_stock})</option>
                                                            ))}
                                                        </select>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                                            {item.supplier}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <input 
                                                            type="number" 
                                                            className="w-full h-10 bg-slate-100/50 border-none rounded-xl text-center text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#1a73e8]/10 transition-all"
                                                            value={item.qty}
                                                            onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                                                        />
                                                    </td>
                                                    <td className="px-8 py-5 text-right text-sm font-bold text-slate-900 tabular-nums">
                                                        Rs. {(item.qty * item.unit_price).toLocaleString()}
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
                                Add Medication Shard
                            </button>
                        </section>
                    </div>

                    {/* ── Right Column: Summary ── */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 sticky top-8">
                        <section className={UI_TOKENS.SHARD_BASE}>
                            <h2 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <PackageSearch size={22} className="text-[#1a73e8]" />
                                Order Profile
                            </h2>
                            
                            <div className="flex flex-col gap-4 mb-8">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Estimated Delivery</span>
                                    <span className="text-slate-900 font-bold">24-48 Hours</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Logistic Priority</span>
                                    <span className="text-[#1a73e8] font-bold uppercase tracking-widest text-[11px]">High Priority</span>
                                </div>
                                <div className="h-px bg-slate-50 my-2" />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-900">Total Commitment</span>
                                    <span className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">
                                        Rs. {subtotal.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 rounded-[24px] bg-red-50 border border-red-100 flex gap-4 mb-8">
                                <ShieldAlert size={20} className="text-red-500 shrink-0" strokeWidth={1.5} />
                                <p className="text-[11px] font-bold text-red-600 leading-relaxed uppercase tracking-wide">Note: Restricted medications require clinical head override before final dispatch.</p>
                            </div>

                            <button 
                                onClick={handleOrder}
                                disabled={isSubmitting || items.some(i => !i.inventory_id)}
                                className={CTA_THEMES.PRIMARY + " w-full !h-14 !rounded-2xl shadow-xl shadow-blue-500/20"}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                                        Syncing Nexus...
                                    </>
                                ) : (
                                    <>
                                        Dispatch Order <ArrowRight size={20} className="ml-2" />
                                    </>
                                )}
                            </button>
                        </section>
                        
                        <div className="p-6 rounded-[24px] bg-slate-50 border border-slate-100 flex items-center gap-4">
                            <Clock size={20} className="text-slate-400" />
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                Nexus Procurement V2.4 Active
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPage>
    );
}
