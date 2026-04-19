import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, ShoppingCart, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/core/api';
import { useDataStore } from '@/core/store/useDataStore';

const FALLBACK = [
    { id: 1, name: 'Amoxicillin 500mg',  current: 12,  threshold: 50,   unit: 'Tabs'  },
    { id: 2, name: 'Paracetamol 500mg',  current: 450, threshold: 1000, unit: 'Tabs'  },
    { id: 3, name: 'Insulin Glargine',   current: 5,   threshold: 25,   unit: 'Vials' },
    { id: 4, name: 'Salbutamol Inhaler', current: 8,   threshold: 20,   unit: 'Units' },
    { id: 5, name: 'Metformin 850mg',    current: 120, threshold: 500,  unit: 'Tabs'  },
];

const stockMeta = (pct) => {
    if (pct < 20) return { color: 'var(--m3-error)',   bg: 'var(--m3-error-container)',   label: 'Critical' };
    if (pct < 40) return { color: 'var(--m3-warning)', bg: 'var(--m3-warning-container)', label: 'Low'      };
    return             { color: 'var(--m3-success)',  bg: 'var(--m3-success-container)', label: 'OK'       };
};

const PharmacyStockCard = () => {
    const [stocks,   setStocks]   = useState([]);
    const [loading,  setLoading]  = useState(true);
    const navigate = useNavigate();
    const filters  = useDataStore(s => s.filters);

    const load = useCallback(async (signal) => {
        setLoading(true);
        try {
            const res  = await apiClient.get('/pharmacy/inventory/', { 
                signal, 
                params: { 
                    ordering: 'stock_quantity', 
                    limit: 8,
                    search: filters.searchQuery || undefined,
                } 
            });
            const data = res.data?.results || res.data;
            
            if (Array.isArray(data) && data.length > 0) {
                const mapped = data.map(item => ({
                    id:        item.id,
                    name:      item.name,
                    current:   item.stock_quantity,
                    threshold: item.reorder_level || 50,
                    unit:      item.unit || 'Units'
                }));
                setStocks(mapped);
            } else {
                setStocks(FALLBACK);
            }
        } catch (e) {
            if (e.name !== 'CanceledError') setStocks(FALLBACK);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        const ctrl = new AbortController();
        load(ctrl.signal);
        return () => ctrl.abort();
    }, [load]);

    const critCount = stocks.filter(s => {
        const pct = (s.current / s.threshold) * 100;
        return pct < 20;
    }).length;

    return (
        <div className="widget" style={{ height: '380px' }}>
            {/* Critical alert strip */}
            {!loading && critCount > 0 && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'var(--m3-error-container)',
                    padding: '5px 16px',
                    borderBottom: '1px solid var(--m3-outline-variant)',
                    flexShrink: 0
                }}>
                    <AlertTriangle size={12} style={{ color: 'var(--m3-error)', flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--m3-error)' }}>
                        {critCount} items critically low
                    </span>
                </div>
            )}

            {/* Header */}
            <div className="widget-header" style={{ flexShrink: 0 }}>
                <div>
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-error)' }} />
                        Inventory Risk
                    </div>
                    <div className="widget-title" style={{ marginTop: 2 }}>Low Stock</div>
                </div>
                <button className="ghost-link" onClick={() => navigate('/admin/pharmacy')} aria-label="View all inventory">
                    Inventory →
                </button>
            </div>

            {/* List */}
            <div className="widget-body" style={{ minHeight: 0 }}>
                <div className="widget-scroll-area">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 0', alignItems: 'center' }}>
                                <div className="sk" style={{ width: 28, height: 28, borderRadius: 8 }} />
                                <div style={{ flex: 1 }}>
                                    <div className="sk" style={{ height: 10, width: '70%', marginBottom: 4 }} />
                                    <div className="sk" style={{ height: 4, width: '100%', borderRadius: 999 }} />
                                </div>
                                <div className="sk" style={{ width: 36, height: 18, borderRadius: 999 }} />
                            </div>
                        ))
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <AnimatePresence mode="popLayout">
                                {stocks.map((item, i) => {
                                    const pct  = Math.min(Math.round((item.current / item.threshold) * 100), 100);
                                    const meta = stockMeta(pct);
                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -6 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            style={{ 
                                                padding: '10px 0', 
                                                borderBottom: '1px solid var(--m3-outline-variant)',
                                                display: 'flex', flexDirection: 'column', gap: 6
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{
                                                    width: 28, height: 28, borderRadius: 8,
                                                    background: 'var(--m3-surface-variant)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: 'var(--m3-text-sub)', flexShrink: 0
                                                }}>
                                                    <Pill size={14} />
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--m3-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.name}
                                                    </div>
                                                    <div style={{ fontSize: 10, color: 'var(--m3-text-sub)', fontWeight: 600 }}>
                                                        {item.current} / {item.threshold} {item.unit}
                                                    </div>
                                                </div>
                                                <div className="chip" style={{ background: meta.bg, color: meta.color, border: 'none' }}>
                                                    {meta.label}
                                                </div>
                                            </div>
                                            <div style={{ height: 4, background: 'var(--m3-surface-variant)', borderRadius: 99, overflow: 'hidden', marginLeft: 36 }}>
                                                <div style={{ height: '100%', width: `${pct}%`, background: meta.color, borderRadius: 99 }} />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Footer CTA */}
                <button
                    onClick={() => navigate('/admin/pharmacy/orders/new')}
                    style={{
                        marginTop: 14, width: '100%', height: 38,
                        background: 'var(--m3-primary)', color: '#fff',
                        borderRadius: 12, border: 'none', cursor: 'pointer',
                        fontSize: 12, fontWeight: 800, letterSpacing: '0.02em',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        flexShrink: 0
                    }}
                >
                    <ShoppingCart size={14} />
                    New Supply Order
                </button>
            </div>
        </div>
    );
};

export default PharmacyStockCard;
