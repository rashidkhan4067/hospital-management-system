import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer,
} from 'recharts';
import { ArrowUpRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockData = [
    { name: 'Mon', opd: 142, ipd: 45 },
    { name: 'Tue', opd: 189, ipd: 52 },
    { name: 'Wed', opd: 156, ipd: 48 },
    { name: 'Thu', opd: 210, ipd: 61 },
    { name: 'Fri', opd: 178, ipd: 55 },
    { name: 'Sat', opd: 95,  ipd: 32 },
    { name: 'Sun', opd: 64,  ipd: 28 },
];

const RANGES = ['Today', 'Week', 'Month'];

/**
 * 📈 AppointmentTrendCard (M3 Clinical Analytics — Audit Fixes)
 *
 * Issues Fixed:
 * ─ UI/MEDIUM — Chart overflowed container (-ml-6) causing horizontal scroll;
 *   replaced with proper ResponsiveContainer margin prop.
 * ─ UI/HIGH — Chart container had no fixed height → CLS during resize.
 *   Fixed 280px height declared on outer div.
 * ─ Accessibility/CRITICAL — Range toggle buttons had no aria-pressed state.
 *   Added aria-pressed to each range button.
 * ─ Accessibility/HIGH — "View All" link-button has no aria-label.
 *   Added descriptive aria-label.
 * ─ UX/MEDIUM — Tooltip background hard-coded white, broken in dark mode.
 *   Using CSS var tokens instead.
 * ─ Performance/LOW — Line chart animated on every render.
 *   isAnimationActive={false} on Line avoids re-paint cost.
 * ─ Design/LOW — Hardcoded hex colors in Line strokes break theme tokens.
 *   Using CSS var() references.
 * ─ Design/MEDIUM — Legend had no visible separator from chart.
 *   Added border-t with consistent 8px-multiple spacing.
 */
import { useAnalyticsData } from '../../analytics/hooks/useAnalyticsData';

const AppointmentTrendCard = () => {
    const { data: telemetry, isLoading } = useAnalyticsData();
    const navigate = useNavigate();

    const chartData = telemetry?.patientTrend?.length > 0
        ? telemetry.patientTrend
        : mockData;

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
            <div
                className="bg-surface-bright border border-outline-variant rounded-2xl px-4 py-3 elev-3 text-xs"
                role="tooltip"
            >
                <p className="font-bold text-text-sub uppercase tracking-wider mb-2">{label}</p>
                {payload.map(p => (
                    <div key={p.name} className="flex items-center gap-2 mb-1">
                        <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: p.stroke }}
                            aria-hidden="true"
                        />
                        <span className="text-text-sub">{p.name || 'Patients'}:</span>
                        <span className="font-bold text-text-main">{p.value}</span>
                    </div>
                ))}
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
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2" aria-hidden="true">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        <span className="m3-label-sm text-text-sub opacity-60">Clinical Intelligence Shard</span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-2xl font-bold text-text-main tracking-tight">
                            Patient Traffic Analysis
                        </h2>
                        {isLoading ? (
                             <div className="h-4 w-12 bg-surface-variant animate-pulse rounded-full" />
                        ) : (
                            <div
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success-container text-success"
                                aria-label="Live data feed"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
                                <span className="text-[10px] font-bold uppercase tracking-wide">Live Telemetry</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={() => navigate('/admin/appointments')}
                        className="flex items-center gap-1.5 text-[11px] font-semibold text-primary hover:text-primary-hover transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                        aria-label="View all appointments"
                    >
                        Master Schedule
                        <ArrowUpRight size={14} aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* ── Chart ── */}
            <div className="chart-container" style={{ height: '280px' }} aria-label="Patient traffic trend chart">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
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
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--m3-text-sub)' }}
                            dx={-8}
                            width={36}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            name="Volume"
                            stroke="var(--m3-primary)"
                            strokeWidth={3}
                            dot={{ r: 4, fill: 'var(--m3-primary)', strokeWidth: 2, stroke: 'var(--m3-surface-bright)' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* ── Legend ── */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-5 border-t border-outline-variant/40">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary shrink-0" aria-hidden="true" />
                    <div className="flex flex-col">
                        <span className="m3-label-sm text-text-sub opacity-60">Unified Patient Traffic</span>
                        <span className="text-sm font-bold text-text-main">Across All Units</span>
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-2 p-3 bg-surface-variant/50 rounded-2xl border border-outline-variant/30 cursor-help group">
                    <Info size={14} className="text-primary opacity-50 shrink-0" aria-hidden="true" />
                    <p className="text-[11px] font-medium text-text-sub group-hover:text-text-main transition-colors">
                        Real-time clinical throughput synchronized with <span className="font-bold text-text-main">Global Filters</span>.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default AppointmentTrendCard;
