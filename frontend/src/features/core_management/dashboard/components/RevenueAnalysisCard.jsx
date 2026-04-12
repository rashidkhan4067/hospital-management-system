import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { ArrowUpRight, Wallet, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockData = [
    { name: 'Mon', revenue: 42.5 },
    { name: 'Tue', revenue: 58.2 },
    { name: 'Wed', revenue: 45.8 },
    { name: 'Thu', revenue: 72.1 },  // peak — highlighted
    { name: 'Fri', revenue: 61.4 },
    { name: 'Sat', revenue: 32.8 },
    { name: 'Sun', revenue: 24.5 },
];

const peakIndex = mockData.reduce(
    (maxI, d, i, arr) => (d.revenue > arr[maxI].revenue ? i : maxI), 0
);

const PILLS = [
    {
        label: 'This Week',
        value: '337.3k PKR',
        icon: Wallet,
        cls: 'bg-primary-container text-primary',
    },
    {
        label: 'Collected',
        value: '290.1k PKR',
        icon: CheckCircle2,
        cls: 'bg-success-container text-success',
    },
    {
        label: 'Pending',
        value: '47.2k PKR',
        icon: Clock,
        cls: 'bg-warning-container text-warning',
    },
];

/**
 * 💰 RevenueAnalysisCard (M3 Financial Node — Audit Fixes)
 *
 * Issues Fixed:
 * ─ UI/HIGH — Chart had -ml-4 causing horizontal overflow.
 *   Replaced with proper margin prop on BarChart.
 * ─ UI/MEDIUM — fontBold is not a valid SVG/recharts prop (typo).
 *   Replaced with fontWeight.
 * ─ Accessibility/CRITICAL — ArrowUpRight icon button has no aria-label.
 *   Added descriptive aria-label + focus-visible ring.
 * ─ Accessibility/HIGH — Mini stat pills have no screen-reader text for values.
 *   Added aria-label to each pill.
 * ─ Design/MEDIUM — All bars same color (only peak slightly different).
 *   Now non-peak bars use 50% opacity primary, peak fully saturated for clear hierarchy.
 * ─ Performance/LOW — isAnimationActive removed from Bar for perf.
 * ─ UX/MEDIUM — Tooltip hard-coded white; uses CSS tokens now.
 */
import { useAnalyticsData } from '../../analytics/hooks/useAnalyticsData';
import { useDataStore } from '@/core/store/useDataStore';

const RevenueAnalysisCard = () => {
    const navigate = useNavigate();
    const { data: telemetry, isLoading } = useAnalyticsData();
    const globalTelemetry = useDataStore(state => state.telemetry);

    const chartData = telemetry?.revenueData?.length > 0
        ? telemetry.revenueData
        : mockData;

    const peakIndex = chartData.reduce(
        (maxI, d, i, arr) => (d.revenue > arr[maxI].revenue ? i : maxI), 0
    );

    const PILLS = [
        {
            label: 'Net Revenue',
            value: globalTelemetry.revenue.total,
            icon: Wallet,
            cls: 'bg-primary-container text-primary',
        },
        {
            label: 'Growth',
            value: globalTelemetry.revenue.trend,
            icon: CheckCircle2,
            cls: 'bg-success-container text-success',
        },
        {
            label: 'Status',
            value: 'Verified',
            icon: Clock,
            cls: 'bg-warning-container text-warning',
        },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
            <div
                className="bg-surface-bright border border-outline-variant rounded-2xl px-4 py-3 elev-3 text-xs"
                role="tooltip"
            >
                <p className="font-bold text-text-sub uppercase tracking-wider mb-1">{label}</p>
                <p className="font-bold text-text-main">
                    PKR {payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            className="w-full h-full bg-surface-bright border border-outline-variant rounded-[24px] p-6 elev-1 flex flex-col"
        >
            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2" aria-hidden="true">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        <span className="m3-label-sm text-text-sub opacity-60">Revenue Stream</span>
                    </div>
                    <h2 className="text-2xl font-bold text-text-main tracking-tight">Finance Overview</h2>
                </div>

                <div className="flex items-center gap-3">
                    {isLoading && <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />}
                    <button
                        onClick={() => navigate('/admin/analytics?type=finance')}
                        className="icon-btn text-primary hover:bg-primary/8"
                        aria-label="View full finance report"
                    >
                        <ArrowUpRight size={20} aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* ── Bar Chart ── */}
            <div className="chart-container" style={{ height: '240px' }} aria-label="Weekly revenue bar chart">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="4 4"
                            vertical={false}
                            stroke="var(--m3-outline)"
                            opacity={0.15}
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--m3-text-sub)' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--m3-text-sub)' }}
                            tickFormatter={v => `PKR ${v > 1000 ? (v/1000).toFixed(1) + 'k' : v}`}
                            width={65}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--m3-primary)', opacity: 0.04 }} />
                        <Bar dataKey="revenue" radius={[8, 8, 0, 0]} barSize={24} isAnimationActive={false}>
                            {chartData.map((_, i) => (
                                <Cell
                                    key={i}
                                    fill={i === peakIndex
                                        ? 'var(--m3-primary)'
                                        : 'color-mix(in srgb, var(--m3-primary) 40%, transparent)'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* ── Stat pills ── */}
            <div className="grid grid-cols-3 gap-3 mt-8" role="list" aria-label="Revenue breakdown">
                {PILLS.map(({ label, value, icon: Icon, cls }) => (
                    <div
                        key={label}
                        className={`flex flex-col gap-2 p-4 rounded-2xl border border-current/10 ${cls}`}
                        role="listitem"
                        aria-label={`${label}: ${value}`}
                    >
                        <div className="flex items-center gap-2 opacity-70">
                            <Icon size={13} aria-hidden="true" />
                            <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
                        </div>
                        <span className="text-sm font-bold text-text-main tabular">{value}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default RevenueAnalysisCard;
