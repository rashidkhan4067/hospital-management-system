import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Receipt, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ListSkeleton } from '@/components/primitives/Skeleton';

const FALLBACK_INVOICES = [
    { id: 'INV-2024-089', patient: 'Khalid Mansour', amount: 84500, days: 14, status: 'Overdue'  },
    { id: 'INV-2024-102', patient: 'Zahra Ahmed',    amount: 52000, days: 8,  status: 'Overdue'  },
    { id: 'INV-2024-077', patient: 'Omar Farooq',    amount: 31200, days: 22, status: 'Critical' },
    { id: 'INV-2024-115', patient: 'Sana Malik',     amount: 15400, days: 3,  status: 'Pending'  },
    { id: 'INV-2024-095', patient: 'Hamza Khan',     amount: 9800,  days: 12, status: 'Overdue'  },
].sort((a, b) => b.amount - a.amount);

const formatCurrency = (num) =>
    new Intl.NumberFormat('en-PK', {
        style:                'currency',
        currency:             'PKR',
        maximumFractionDigits: 0,
    }).format(num);

/**
 * 🧾 OutstandingInvoicesCard (Fiscal Accountability — Audit Fixes)
 *
 * Issues Fixed:
 * ─ Accessibility/CRITICAL — Invoice rows had no semantic role; act as interactive list.
 *   Added role="list"/"listitem" + keyboard-navigable row buttons.
 * ─ Accessibility/HIGH — Status badge (bg-error/10 text-error) has contrast < 4.5:1
 *   against white background in some theme colors.
 *   Using M3 container token pairs: error-container/error, warning-container/warning.
 * ─ Accessibility/HIGH — Receipt icon button at row start had no label.
 *   aria-hidden added (decorative).
 * ─ UX/MEDIUM — Invoice amount font (text-xs font-black) is too small for financial data.
 *   Increased to text-sm font-bold; amount is key info.
 * ─ Design/MEDIUM — Days overdue badge text "8px" font was below M3 minimum of 10px.
 *   Increased to text-[10px].
 * ─ Performance/LOW — No AbortController on fetch. Added.
 */
const OutstandingInvoicesCard = () => {
    const navigate = useNavigate();
    const [invoices,  setInvoices]  = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadInvoices = useCallback(async (signal) => {
        try {
            // Replace with: await apiClient.get('/finance/invoices/?status=outstanding', { signal })
            await new Promise(r => setTimeout(r, 700));
            setInvoices(FALLBACK_INVOICES);
        } catch (err) {
            if (err.name !== 'CanceledError') setInvoices(FALLBACK_INVOICES);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const ctrl = new AbortController();
        loadInvoices(ctrl.signal);
        return () => ctrl.abort();
    }, [loadInvoices]);

    const getBadgeCls = (days) =>
        days > 20
            ? 'bg-error-container text-error'
            : 'bg-warning-container text-warning';

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            className="bg-surface-bright border border-outline-variant rounded-[24px] p-6 elev-1 flex flex-col h-full"
        >
            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2" aria-hidden="true">
                        <div className="w-1.5 h-1.5 rounded-full bg-warning/40" />
                        <span className="m3-label-sm text-text-sub opacity-60">Finance Registry</span>
                    </div>
                    <h2 className="text-xl font-bold text-text-main tracking-tight">Outstanding Invoices</h2>
                </div>

                <span
                    className="m3-pill bg-warning-container text-warning"
                    aria-label="Accounts receivable pending"
                >
                    A/R Pending
                </span>
            </div>

            {/* ── Invoice list ── */}
            {isLoading ? (
                <div className="flex-1"><ListSkeleton rows={5} /></div>
            ) : (
                <ul
                    className="flex flex-col gap-1 flex-1"
                    role="list"
                    aria-label="Outstanding invoices"
                >
                    {invoices.map((inv, idx) => (
                        <motion.li
                            key={inv.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.04, duration: 0.2 }}
                            role="listitem"
                        >
                            <button
                                onClick={() => navigate(`/admin/financials/invoices/${inv.id}`)}
                                className="w-full group flex items-center gap-3 p-3 rounded-2xl
                                    hover:bg-surface-variant/50 border border-transparent hover:border-outline-variant/50
                                    transition-colors text-left
                                    outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                                aria-label={`Invoice ${inv.id} for ${inv.patient}, ${formatCurrency(inv.amount)}, ${inv.days} days overdue`}
                            >
                                {/* Icon */}
                                <div
                                    className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center text-text-sub
                                        group-hover:bg-primary-container group-hover:text-primary transition-colors shrink-0"
                                    aria-hidden="true"
                                >
                                    <Receipt size={16} />
                                </div>

                                {/* Identity */}
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-sm font-semibold text-text-main truncate">
                                        {inv.patient}
                                    </span>
                                    <span className="text-[10px] font-medium text-text-sub opacity-60 uppercase tracking-wide">
                                        {inv.id}
                                    </span>
                                </div>

                                {/* Amount + Days */}
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <span className="text-sm font-bold text-text-main tabular">
                                        {formatCurrency(inv.amount)}
                                    </span>
                                    <span className={`m3-pill ${getBadgeCls(inv.days)}`}>
                                        {inv.days}d overdue
                                    </span>
                                </div>
                            </button>
                        </motion.li>
                    ))}
                </ul>
            )}

            {/* ── Footer ── */}
            <div className="mt-5 pt-5 border-t border-outline-variant/40">
                <button
                    onClick={() => navigate('/admin/financials')}
                    className="w-full flex items-center justify-between group"
                    aria-label="Access master billing index"
                >
                    <span className="text-[11px] font-semibold text-text-sub group-hover:text-primary uppercase tracking-wide transition-colors">
                        View Billing Index
                    </span>
                    <ArrowUpRight size={14} className="text-text-sub group-hover:text-primary transition-colors" aria-hidden="true" />
                </button>
            </div>
        </motion.div>
    );
};

export default OutstandingInvoicesCard;
