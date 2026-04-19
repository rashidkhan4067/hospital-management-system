import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { TrendingUp, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAnalyticsData } from '../../analytics/hooks/useAnalyticsData';

const FALLBACK = [
    { name: 'Mon', opd: 142, ipd: 45, total: 187 },
    { name: 'Tue', opd: 189, ipd: 52, total: 241 },
    { name: 'Wed', opd: 156, ipd: 48, total: 204 },
    { name: 'Thu', opd: 210, ipd: 61, total: 271 },
    { name: 'Fri', opd: 178, ipd: 55, total: 233 },
    { name: 'Sat', opd: 95,  ipd: 32, total: 127 },
    { name: 'Sun', opd: 64,  ipd: 28, total: 92  },
];

const TABS = [
    { id: 'total', label: 'All',  color: 'var(--m3-primary)' },
    { id: 'opd',   label: 'OPD',  color: 'var(--m3-success)' },
    { id: 'ipd',   label: 'IPD',  color: 'var(--m3-warning)' },
];

const Tip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="widget" style={{ padding: '8px 12px', borderRadius: 10, fontSize: 11 }} role="tooltip">
            <div style={{ fontWeight: 700, color: 'var(--m3-text-sub)', marginBottom: 4 }}>{label}</div>
            {payload.map(p => (
                <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                    <span style={{ color: 'var(--m3-text-sub)', textTransform: 'capitalize' }}>{p.name}</span>
                    <strong style={{ color: p.stroke }}>{p.value}</strong>
                </div>
            ))}
        </div>
    );
};

const AppointmentTrendCard = () => {
    const { data: telemetry, isLoading } = useAnalyticsData();
    const navigate = useNavigate();
    const [tab, setTab] = useState('total');

    const data = telemetry?.patientTrend?.length > 0
        ? telemetry.patientTrend.map((d, i) => ({
            name:  d.name || FALLBACK[i]?.name || `D${i+1}`,
            total: d.value || d.total || 0,
            opd:   Math.round((d.value || 0) * 0.75),
            ipd:   Math.round((d.value || 0) * 0.25),
        }))
        : FALLBACK;

    const { color } = TABS.find(t => t.id === tab) || TABS[0];
    const values  = data.map(d => d[tab] || 0);
    const total   = values.reduce((a, b) => a + b, 0);
    const avg     = Math.round(total / values.length);
    const peakDay = data.reduce((m, d) => (d[tab] || 0) > (m.val || 0) ? { name: d.name, val: d[tab] } : m, {});

    return (
        <div className="widget" style={{ height: '380px' }}>
            {/* Header */}
            <div className="widget-header">
                <div>
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-primary)' }} />
                        Clinical Volume
                    </div>
                    <div className="widget-title" style={{ marginTop: 2 }}>Patient Traffic</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {/* Segmented tab */}
                    <div
                        role="tablist"
                        aria-label="Traffic view"
                        style={{
                            display: 'flex', gap: 2, padding: '3px',
                            background: 'var(--m3-surface-variant)',
                            borderRadius: 10,
                        }}
                    >
                        {TABS.map(t => (
                            <button
                                key={t.id}
                                role="tab"
                                aria-selected={tab === t.id}
                                onClick={() => setTab(t.id)}
                                style={{
                                    padding: '3px 10px',
                                    borderRadius: 8,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: tab === t.id ? 'var(--m3-surface-bright)' : 'transparent',
                                    color: tab === t.id ? t.color : 'var(--m3-text-sub)',
                                    boxShadow: tab === t.id ? 'var(--m3-elev-1)' : 'none',
                                    transition: 'all 150ms',
                                    outline: 'none',
                                }}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                    <button
                        className="ghost-link"
                        onClick={() => navigate('/admin/appointments')}
                        aria-label="View all appointments"
                    >
                        All →
                    </button>
                </div>
            </div>

            {/* KPI row */}
            <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                gap: 8, padding: '10px 16px',
            }}>
                {[
                    { label: 'Weekly Total', value: total,       icon: Calendar },
                    { label: 'Daily Avg',    value: avg,         icon: Users    },
                    { label: 'Peak Day',     value: peakDay.name || '—', icon: TrendingUp },
                ].map(({ label, value, icon: Icon }) => (
                    <div
                        key={label}
                        style={{
                            background: 'var(--m3-surface-variant)',
                            borderRadius: 10,
                            padding: '8px 10px',
                        }}
                    >
                        <div style={{ fontSize: 10, color: 'var(--m3-text-sub)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            {label}
                        </div>
                        <div style={{ fontSize: 17, fontWeight: 900, color: 'var(--m3-text-main)', marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>
                            {value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className="chart-wrap widget-body" style={{ paddingTop: 0 }}>
                {isLoading ? (
                    <div className="sk" style={{ height: 180, borderRadius: 10 }} aria-hidden="true" />
                ) : (
                    <div style={{ height: 180 }} aria-label={`${tab} patient traffic chart`} role="img">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                                <defs>
                                    <linearGradient id={`tg-${tab}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%"   stopColor={color} stopOpacity={0.25} />
                                        <stop offset="100%" stopColor={color} stopOpacity={0.01} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--m3-outline)" opacity={0.12} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--m3-text-sub)', fontWeight: 600 }} dy={4} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--m3-text-sub)', fontWeight: 600 }} />
                                <Tooltip content={<Tip />} cursor={{ stroke: color, strokeWidth: 1, opacity: 0.3 }} />
                                {peakDay.name && (
                                    <ReferenceLine x={peakDay.name} stroke={color} strokeDasharray="4 3" opacity={0.4} />
                                )}
                                <Area
                                    type="monotone" dataKey={tab}
                                    stroke={color} strokeWidth={2.5}
                                    fill={`url(#tg-${tab})`}
                                    dot={false}
                                    activeDot={{ r: 5, fill: color, strokeWidth: 0 }}
                                    animationDuration={600}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentTrendCard;
