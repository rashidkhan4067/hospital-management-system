import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Receipt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/core/api';
import { useDataStore } from '@/core/store/useDataStore';

const FALLBACK = [
    { id: 'INV-2024-089', patient: 'Khalid Mansour', amount: 84500, days: 14, status: 'Overdue'  },
    { id: 'INV-2024-102', patient: 'Zahra Ahmed',    amount: 52000, days: 8,  status: 'Overdue'  },
    { id: 'INV-2024-077', patient: 'Omar Farooq',    amount: 31200, days: 22, status: 'Critical' },
    { id: 'INV-2024-115', patient: 'Sana Malik',     amount: 15400, days: 3,  status: 'Pending'  },
    { id: 'INV-2024-095', patient: 'Hamza Khan',     amount: 9800,  days: 12, status: 'Overdue'  },
].sort((a, b) => b.amount - a.amount);

const STATUS_CFG = {
    Critical: { bg: 'var(--m3-error-container)',   color: 'var(--m3-error)'   },
    Overdue:  { bg: 'var(--m3-warning-container)', color: 'var(--m3-warning)' },
    Pending:  { bg: 'var(--m3-surface-variant)',   color: 'var(--m3-text-sub)'},
};

const fmtCurr = (n) =>
    new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(n);

const OutstandingInvoicesCard = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading,  setLoading]  = useState(true);
    const navigate = useNavigate();
    const filters  = useDataStore(s => s.filters);

    const load = useCallback(async (signal) => {
        setLoading(true);
        try {
            const res  = await apiClient.get('/finance/invoices/', { 
                signal, 
                params: { 
                    status_in: 'PARTIAL,DUE', 
                    limit: 10,
                    search: filters.searchQuery || undefined,
                    department: filters.department !== 'All' ? filters.department : undefined,
                } 
            });
            const data = res.data?.results || res.data;
            
            if (Array.isArray(data) && data.length > 0) {
                const mapped = data.map(item => ({
                    pk:      item.id,
                    id:      item.invoice_no || `INV-${item.id}`,
                    patient: item.patient_name || 'Anonymous',
                    amount:  parseFloat(item.due_amount) || 0,
                    days:    item.created_at ? Math.floor((new Date() - new Date(item.created_at)) / (1000*60*60*24)) : 0,
                    status:  item.status === 'PARTIAL' ? 'Overdue' : 'Critical'
                }));
                setInvoices(mapped);
            } else {
                setInvoices(FALLBACK);
            }
        } catch (e) {
            if (e.name !== 'CanceledError') setInvoices(FALLBACK);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        const ctrl = new AbortController();
        load(ctrl.signal);
        return () => ctrl.abort();
    }, [load]);

    const totalAR = invoices.reduce((s, inv) => s + (inv.amount || 0), 0);

    return (
        <div className="widget" style={{ height: '380px' }}>
            <div className="widget-header">
                <div>
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-warning)' }} />
                        Accounts Receivable
                    </div>
                    <div className="widget-title" style={{ marginTop: 2 }}>Outstanding</div>
                </div>
                <button className="ghost-link" onClick={() => navigate('/admin/financials/billing')} aria-label="View billing index">
                    Billing →
                </button>
            </div>

            {!loading && (
                <div style={{
                    margin: '8px 16px',
                    padding: '8px 12px',
                    background: 'var(--m3-warning-container)',
                    borderRadius: 10,
                    border: '1px solid color-mix(in srgb, var(--m3-warning) 15%, transparent)',
                    flexShrink: 0
                }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--m3-warning)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Total A/R Pending
                    </div>
                    <div style={{
                        fontSize: 18, fontWeight: 900, color: 'var(--m3-text-main)',
                        marginTop: 2, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em',
                    }}>
                        {fmtCurr(totalAR)}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--m3-text-sub)', opacity: 0.7, marginTop: 1 }}>
                        Across {invoices.length} invoices
                    </div>
                </div>
            )}

            <div className="widget-body">
                <div className="widget-scroll-area">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', alignItems: 'center' }}>
                                <div className="sk" style={{ width: 36, height: 26, borderRadius: 6 }} />
                                <div style={{ flex: 1 }}>
                                    <div className="sk" style={{ height: 10, width: '70%', marginBottom: 4 }} />
                                    <div className="sk" style={{ height: 8, width: '50%' }} />
                                </div>
                                <div className="sk" style={{ width: 50, height: 12, borderRadius: 4 }} />
                            </div>
                        ))
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }} role="list">
                            <AnimatePresence mode="popLayout">
                                {invoices.map((inv, i) => {
                                    const cfg = STATUS_CFG[inv.status] || STATUS_CFG.Pending;
                                    const urgencyPct = Math.min((inv.days / 30) * 100, 100);
                                    return (
                                        <motion.div
                                            key={inv.id}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                        >
                                            <button
                                                className="widget-row-btn"
                                                onClick={() => navigate(`/admin/financials/invoices/${inv.pk}`)}
                                                style={{ borderBottom: '1px solid var(--m3-outline-variant)' }}
                                            >
                                                <div style={{
                                                    width: 38, height: 26, borderRadius: 8,
                                                    background: 'var(--m3-surface-variant)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: 'var(--m3-primary)', flexShrink: 0
                                                }}>
                                                    <Receipt size={14} />
                                                </div>

                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{
                                                        fontSize: 13, fontWeight: 600, color: 'var(--m3-text-main)',
                                                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                                    }}>
                                                        {inv.patient}
                                                    </div>
                                                    <div style={{ fontSize: 11, color: 'var(--m3-text-sub)', opacity: 0.6 }}>
                                                        {inv.id}
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
                                                    <span style={{ fontSize: 12, fontWeight: 900, color: 'var(--m3-text-main)', fontVariantNumeric: 'tabular-nums' }}>
                                                        {fmtCurr(inv.amount)}
                                                    </span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <div style={{ width: 28, height: 3, borderRadius: 999, background: 'var(--m3-surface-variant)', overflow: 'hidden' }}>
                                                            <div style={{ height: '100%', width: `${urgencyPct}%`, background: cfg.color, borderRadius: 999 }} />
                                                        </div>
                                                        <div className="chip" style={{ background: cfg.bg, color: cfg.color }}>
                                                            {inv.days}d
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OutstandingInvoicesCard;
