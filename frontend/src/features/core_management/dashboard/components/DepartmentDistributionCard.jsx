import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAnalyticsData } from '../../analytics/hooks/useAnalyticsData';

const PALETTE = [
    'var(--m3-primary)',
    'var(--m3-success)',
    'var(--m3-error)',
    'var(--m3-warning)',
    'var(--m3-outline)',
];

const FALLBACK = [
    { name: 'Cardiology', value: 35 },
    { name: 'Pediatrics', value: 25 },
    { name: 'Emergency',  value: 20 },
    { name: 'Radiology',  value: 20 },
];

const Tip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="widget" style={{ padding: '6px 10px', borderRadius: 8, fontSize: 11 }} role="tooltip">
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: payload[0].payload.color, display: 'block' }} aria-hidden="true" />
                <strong style={{ color: 'var(--m3-text-main)' }}>{payload[0].name}</strong>
            </div>
            <div style={{ color: 'var(--m3-text-sub)', marginTop: 2 }}>{payload[0].value}% of total</div>
        </div>
    );
};

const DepartmentDistributionCard = () => {
    const { data: telemetry, isLoading } = useAnalyticsData();
    const navigate = useNavigate();

    const chartData = (telemetry?.deptDistribution?.length > 0)
        ? telemetry.deptDistribution.map((d, i) => ({
            name:  d.name,
            value: typeof d.value === 'number' ? d.value : Math.round(parseFloat(d.value) || 0),
            color: PALETTE[i % PALETTE.length],
        }))
        : FALLBACK.map((d, i) => ({ ...d, color: PALETTE[i] }));

    const total = chartData.reduce((s, d) => s + d.value, 0) || 100;

    return (
        <div className="widget" style={{ height: '380px' }}>
            {/* Header */}
            <div className="widget-header" style={{ flexShrink: 0 }}>
                <div>
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-primary)' }} />
                        Dept. Distribution
                    </div>
                    <div className="widget-title" style={{ marginTop: 2 }}>Active Load</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {isLoading && (
                        <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--m3-primary)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} aria-hidden="true" />
                    )}
                    <button className="ghost-link" onClick={() => navigate('/admin/analytics?type=departments')} aria-label="View department breakdown">
                        Detail →
                    </button>
                </div>
            </div>

            <div className="widget-body">
                {/* Donut chart */}
                <div
                    style={{ height: 150 }}
                    aria-hidden="true"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                innerRadius="52%"
                                outerRadius="75%"
                                paddingAngle={4}
                                dataKey="value"
                                stroke="none"
                                animationDuration={600}
                            >
                                {chartData.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<Tip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar-strip legend */}
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}
                    role="list"
                    aria-label="Department load breakdown"
                >
                    {chartData.map((item, i) => {
                        const pct = Math.round((item.value / total) * 100);
                        return (
                            <div
                                key={item.name}
                                role="listitem"
                                aria-label={`${item.name}: ${pct}%`}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{
                                            width: 8, height: 8, borderRadius: '50%',
                                            background: item.color, display: 'block', flexShrink: 0,
                                        }} aria-hidden="true" />
                                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--m3-text-main)' }}>
                                            {item.name}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 900, color: item.color, fontVariantNumeric: 'tabular-nums' }}>
                                        {pct}%
                                    </span>
                                </div>
                                <div
                                    className="progress-track"
                                    style={{ background: 'var(--m3-surface-variant)' }}
                                    role="progressbar"
                                    aria-valuenow={pct}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label={`${item.name} load`}
                                >
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pct}%` }}
                                        transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease: [0.2, 0, 0, 1] }}
                                        className="progress-fill"
                                        style={{ background: item.color }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DepartmentDistributionCard;
