import React from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAnalyticsData } from '../../analytics/hooks/useAnalyticsData';
import { useDataStore }     from '@/core/store/useDataStore';

const FALLBACK = [
    { name: 'Mon', revenue: 42500, expenses: 18000 },
    { name: 'Tue', revenue: 58200, expenses: 21000 },
    { name: 'Wed', revenue: 45800, expenses: 19500 },
    { name: 'Thu', revenue: 72100, expenses: 25000 },
    { name: 'Fri', revenue: 61400, expenses: 22000 },
    { name: 'Sat', revenue: 32800, expenses: 14000 },
    { name: 'Sun', revenue: 24500, expenses: 11000 },
];

const fmt = (n) =>
    n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000   ? `${(n / 1_000).toFixed(0)}k`
    : `${n}`;

const Tip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="widget" style={{ padding: '8px 12px', borderRadius: 10, fontSize: 11 }} role="tooltip">
            <div style={{ fontWeight: 700, color: 'var(--m3-text-sub)', marginBottom: 4 }}>{label}</div>
            {payload.map(p => (
                <div key={p.dataKey} style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                    <span style={{ color: 'var(--m3-text-sub)', textTransform: 'capitalize' }}>{p.name}</span>
                    <strong style={{ color: p.stroke }}>PKR {fmt(p.value)}</strong>
                </div>
            ))}
        </div>
    );
};

const RevenueAnalysisCard = () => {
    const navigate       = useNavigate();
    const { data: telemetry, isLoading } = useAnalyticsData();
    const globalTelemetry = useDataStore(s => s.telemetry);

    const chartData = telemetry?.revenueData?.length > 0
        ? telemetry.revenueData.map((d, i) => ({
            name:     d.name,
            revenue:  d.revenue || d.value || 0,
            expenses: Math.round((d.value || d.revenue || 0) * 0.38),
        }))
        : FALLBACK;

    const totalRev = chartData.reduce((s, d) => s + (d.revenue || 0), 0);
    const totalExp = chartData.reduce((s, d) => s + (d.expenses || 0), 0);
    const netProfit = totalRev - totalExp;

    const stats = [
        { label: 'Revenue',  value: `PKR ${fmt(totalRev)}`,  color: 'var(--m3-primary)',  isUp: true  },
        { label: 'Expenses', value: `PKR ${fmt(totalExp)}`,  color: 'var(--m3-error)',    isUp: false },
        { label: 'Net',      value: `PKR ${fmt(netProfit)}`, color: 'var(--m3-success)',  isUp: true  },
    ];

    return (
        <div className="widget" style={{ height: '380px' }}>
            {/* Header */}
            <div className="widget-header">
                <div>
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-warning)' }} />
                        Financial Analytics
                    </div>
                    <div className="widget-title" style={{ marginTop: 2 }}>Revenue Overview</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px',
                        borderRadius: 999, background: 'var(--m3-success-container)',
                        fontSize: 11, fontWeight: 700, color: 'var(--m3-success)',
                    }}>
                        <TrendingUp size={11} aria-hidden="true" />
                        +18.2%
                    </div>
                    <button className="ghost-link" onClick={() => navigate('/admin/analytics?type=finance')} aria-label="Full finance report">
                        Report →
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="widget-body">
                {/* Stat row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                    {stats.map(({ label, value, color, isUp }) => (
                        <div
                            key={label}
                            style={{
                                padding: '8px 10px',
                                borderRadius: 10,
                                background: 'var(--m3-surface-variant)',
                            }}
                        >
                            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--m3-text-sub)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                {label}
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--m3-text-main)', marginTop: 2, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
                                {value}
                            </div>
                            <div style={{ fontSize: 10, color, fontWeight: 700, marginTop: 2 }}>
                                {isUp ? '↑' : '↓'} vs last week
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart */}
                {isLoading ? (
                    <div className="sk" style={{ height: 160, borderRadius: 10 }} aria-hidden="true" />
                ) : (
                    <div style={{ height: 160 }} role="img" aria-label="Weekly revenue vs expenses area chart">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%"   stopColor="var(--m3-primary)" stopOpacity={0.25} />
                                        <stop offset="100%" stopColor="var(--m3-primary)" stopOpacity={0.01} />
                                    </linearGradient>
                                    <linearGradient id="exp-grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%"   stopColor="var(--m3-error)" stopOpacity={0.18} />
                                        <stop offset="100%" stopColor="var(--m3-error)" stopOpacity={0.01} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--m3-outline)" opacity={0.12} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--m3-text-sub)', fontWeight: 600 }} dy={4} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--m3-text-sub)', fontWeight: 600 }} tickFormatter={fmt} />
                                <Tooltip content={<Tip />} cursor={{ stroke: 'var(--m3-outline)', strokeWidth: 1 }} />
                                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="var(--m3-primary)" strokeWidth={2.5} fill="url(#rev-grad)" dot={false} activeDot={{ r: 4, fill: 'var(--m3-primary)' }} animationDuration={700} />
                                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="var(--m3-error)" strokeWidth={2} strokeDasharray="5 4" fill="url(#exp-grad)" dot={false} activeDot={{ r: 4, fill: 'var(--m3-error)' }} animationDuration={700} animationBegin={100} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Legend */}
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }} aria-hidden="true">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 20, height: 2, background: 'var(--m3-primary)', borderRadius: 2 }} />
                        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--m3-text-sub)' }}>Revenue</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 20, height: 2, background: 'var(--m3-error)', borderRadius: 2, opacity: 0.8, borderTop: '1.5px dashed var(--m3-error)' }} />
                        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--m3-text-sub)' }}>Expenses</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueAnalysisCard;
