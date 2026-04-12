import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Pill, ShoppingCart, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ListSkeleton } from '@/components/primitives/Skeleton';

const FALLBACK_STOCKS = [
    { id: 1, name: 'Amoxicillin 500mg',  current: 12,  threshold: 50,   unit: 'Tabs'  },
    { id: 2, name: 'Paracetamol 500mg',  current: 450, threshold: 1000, unit: 'Tabs'  },
    { id: 3, name: 'Insulin Glargine',   current: 5,   threshold: 25,   unit: 'Vials' },
    { id: 4, name: 'Salbutamol Inhaler', current: 8,   threshold: 20,   unit: 'Puffs' },
    { id: 5, name: 'Metformin 850mg',    current: 120, threshold: 500,  unit: 'Tabs'  },
];

/**
 * 💊 PharmacyStockCard (Critical Inventory Node — Audit Fixes)
 *
 * Issues Fixed:
 * ─ Accessibility/CRITICAL — Progress bars had no role=progressbar or aria-values.
 *   Each stock bar now correctly annotated with ARIA.
 * ─ Accessibility/HIGH — "Reorder" button had no accessible label (icon + text,
 *   but context was ambiguous). Added aria-label with drug name.
 * ─ Accessibility/HIGH — Stock color (bg-error / bg-warning) from inline Tailwind 
 *   class string injection at runtime. Replaced with CSS var() inline style.
 * ─ UX/MEDIUM — "Access Procurement Hub" button used bg-slate-900 (hardcoded,
 *   breaks dark mode). Replaced with M3 primary filled button style.
 * ─ Performance/LOW — No AbortController on fetch.  Added.
 * ─ Design/LOW — Inventory list used gap-6 between items creating too much whitespace
 *   on smaller cards. Changed to gap-4 (16px, still 8px multiple).
 */
const PharmacyStockCard = () => {
    const navigate = useNavigate();
    const [stocks, setStocks]       = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadStocks = useCallback(async (signal) => {
        try {
            // Replace with: await apiClient.get('/pharmacy/inventory/?low_stock=true', { signal })
            await new Promise(r => setTimeout(r, 600));
            setStocks(FALLBACK_STOCKS);
        } catch (err) {
            if (err.name !== 'CanceledError') setStocks(FALLBACK_STOCKS);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const ctrl = new AbortController();
        loadStocks(ctrl.signal);
        return () => ctrl.abort();
    }, [loadStocks]);

    const getStockColor = (pct) =>
        pct < 20 ? 'var(--m3-error)' : 'var(--m3-warning)';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            className="bg-surface-bright border border-outline-variant rounded-[24px] p-6 elev-1 flex flex-col h-full"
        >
            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2" aria-hidden="true">
                        <div className="w-1.5 h-1.5 rounded-full bg-error/50" />
                        <span className="m3-label-sm text-text-sub opacity-60">Inventory Risk</span>
                    </div>
                    <h2 className="text-xl font-bold text-text-main tracking-tight">Pharmacy Low Stock</h2>
                </div>

                <div
                    className="w-9 h-9 rounded-xl bg-error-container flex items-center justify-center text-error"
                    aria-hidden="true"
                >
                    <AlertTriangle size={17} />
                </div>
            </div>

            {/* ── Stock list ── */}
            {isLoading ? (
                <div className="flex-1"><ListSkeleton rows={5} /></div>
            ) : (
                <ul
                    className="flex flex-col gap-4 flex-1"
                    role="list"
                    aria-label="Low stock pharmacy items"
                >
                    {stocks.map((item, idx) => {
                        const pct   = Math.min((item.current / item.threshold) * 100, 100);
                        const color = getStockColor(pct);
                        return (
                            <li key={item.id} className="flex flex-col gap-1.5" role="listitem">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div
                                            className="w-8 h-8 rounded-xl bg-surface-variant flex items-center justify-center text-text-sub shrink-0"
                                            aria-hidden="true"
                                        >
                                            <Pill size={14} />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-semibold text-text-main truncate">
                                                {item.name}
                                            </span>
                                            <span className="text-[10px] font-medium text-text-sub opacity-60 uppercase tracking-wide">
                                                {item.current} {item.unit} · Min {item.threshold}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate('/admin/pharmacy/orders/new')}
                                        aria-label={`Reorder ${item.name}`}
                                        className="flex items-center gap-1.5 h-8 px-3 rounded-full
                                            text-[10px] font-semibold text-text-sub
                                            border border-outline-variant hover:border-primary/30 hover:text-primary
                                            bg-surface-variant/40 hover:bg-surface-bright
                                            transition-colors shrink-0
                                            outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        Reorder
                                        <ShoppingCart size={11} aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Stock bar */}
                                <div
                                    className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden"
                                    role="progressbar"
                                    aria-label={`${item.name} stock level`}
                                    aria-valuenow={Math.round(pct)}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pct}%` }}
                                        transition={{ delay: idx * 0.08, duration: 1, ease: [0.2, 0, 0, 1] }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* ── Footer CTA ── */}
            <button
                onClick={() => navigate('/admin/pharmacy')}
                className="mt-8 w-full h-11 bg-primary text-white rounded-2xl
                    text-[11px] font-semibold uppercase tracking-wider
                    flex items-center justify-center gap-2
                    hover:brightness-110 active:scale-[0.98]
                    elev-1 shadow-primary/20 transition-colors
                    outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Access pharmacy procurement hub"
            >
                Procurement Hub
                <ArrowRight size={15} aria-hidden="true" />
            </button>
        </motion.div>
    );
};

export default PharmacyStockCard;
