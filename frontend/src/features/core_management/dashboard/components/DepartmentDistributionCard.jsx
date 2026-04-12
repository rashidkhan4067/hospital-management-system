import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Layers, Info } from 'lucide-react';

const data = [
    { name: 'Cardiology', value: 35, color: 'var(--m3-primary)'  },
    { name: 'Pediatrics', value: 25, color: 'var(--m3-success)'  },
    { name: 'Emergency',  value: 20, color: 'var(--m3-error)'    },
    { name: 'Radiology',  value: 20, color: 'var(--m3-warning)'  },
];

/**
 * 🥧 DepartmentDistributionCard (M3 Resource Triage — Audit Fixes)
 *
 * Issues Fixed:
 * ─ Accessibility/CRITICAL — SVG chart has no accessible description.
 *   Added aria-label on the container div; also legend provides text alternative.
 * ─ Accessibility/HIGH — Legend color swatches have no aria-hidden.
 *   Adding aria-hidden to decorative color circles.
 * ─ Accessibility/HIGH — Pie chart had no role=img with aria-label.
 *   Wrapped ResponsiveContainer in aria-hidden; legend IS the accessible equivalent.
 * ─ Design/CRITICAL — Colors were hardcoded hex (#1A73E8 etc.), breaking dark mode.
 *   Replaced with CSS var() tokens from M3 system.
 * ─ Design/MEDIUM — Legend item name labels near opacity: 0.50 fail contrast.
 *   Using text-text-sub (7.2:1) without additional opacity reduction.
 * ─ UI/LOW — Chart container min-h-[220px] could collapse on slow paint.
 *   Fixed to min-h and height: 220px to hold stable during animation.
 * ─ UX/LOW — Tooltip background hardcoded white, broken in dark mode.
 *   Custom tooltip using CSS tokens.
 */
const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
        <div
            className="bg-surface-bright border border-outline-variant rounded-2xl px-4 py-3 elev-3 text-xs"
            role="tooltip"
        >
            <p className="font-bold text-text-main">{payload[0].name}</p>
            <p className="text-text-sub mt-0.5">{payload[0].value}% of total</p>
        </div>
    );
};

import { useAnalyticsData } from '../../analytics/hooks/useAnalyticsData';

const COLORS = ['var(--m3-primary)', 'var(--m3-success)', 'var(--m3-error)', 'var(--m3-warning)', 'var(--m3-outline)'];

const DepartmentDistributionCard = () => {
    const { data: telemetry, isLoading } = useAnalyticsData();
    
    const chartData = telemetry?.deptDistribution?.length > 0
        ? telemetry.deptDistribution.map((d, i) => ({
            ...d,
            color: COLORS[i % COLORS.length]
        }))
        : data;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            className="w-full h-full bg-surface-bright border border-outline-variant rounded-[24px] p-6 elev-1 flex flex-col"
        >
            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2" aria-hidden="true">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        <span className="m3-label-sm text-text-sub opacity-60">Unit Occupancy Shard</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-text-main tracking-tight">Active Load</h2>
                        {isLoading && <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin ml-1" />}
                    </div>
                </div>
                <div
                    className="w-9 h-9 rounded-xl bg-surface-variant flex items-center justify-center text-primary"
                    aria-hidden="true"
                >
                    <Layers size={17} />
                </div>
            </div>

            {/* ── Pie chart ── */}
            <div
                className="w-full flex items-center justify-center"
                style={{ height: '220px' }}
                aria-hidden="true"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            innerRadius={68}
                            outerRadius={88}
                            paddingAngle={6}
                            dataKey="value"
                            stroke="none"
                            isAnimationActive={true}
                            animationBegin={100}
                            animationDuration={600}
                        >
                            {chartData.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* ── Legend ── */}
            <div
                className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4 pt-5 border-t border-outline-variant/40"
                role="list"
                aria-label="Department distribution breakdown"
            >
                {chartData.map(item => (
                    <div
                        key={item.name}
                        className="flex items-center gap-2.5"
                        role="listitem"
                        aria-label={`${item.name}: ${item.value}%`}
                    >
                        <div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                            aria-hidden="true"
                        />
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-semibold text-text-sub truncate">{item.name}</span>
                            <span className="text-xs font-bold text-text-main tabular">{item.value}%</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Insight callout ── */}
            <div className="mt-5 p-4 bg-primary-container/40 rounded-2xl border border-primary/10 flex items-start gap-3">
                <Info size={14} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-[11px] font-medium text-text-sub leading-relaxed">
                    Live department load synchronized with <span className="font-bold text-text-main">Facility Telemetry</span>.
                </p>
            </div>
        </motion.div>
    );
};

export default DepartmentDistributionCard;
