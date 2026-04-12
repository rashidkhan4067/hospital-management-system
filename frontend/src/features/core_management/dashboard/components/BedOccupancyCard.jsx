import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    Activity, Bed, ShieldPlus, Baby,
    Heart, UserPlus, ArrowUpRight, AlertCircle,
    RefreshCw, TrendingUp, TrendingDown, Minus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ─── Occupancy thresholds ─── */
const getOccupancyMeta = (pct) => {
    if (pct >= 90) return {
        color:    'var(--m3-error)',
        bgCls:    'bg-error-container',
        textCls:  'text-error',
        ringCls:  'ring-error/20',
        label:    'Critical',
        trend:    <TrendingUp size={11} aria-hidden="true" />,
    };
    if (pct >= 75) return {
        color:    'var(--m3-warning)',
        bgCls:    'bg-warning-container',
        textCls:  'text-warning',
        ringCls:  'ring-warning/20',
        label:    'High',
        trend:    <TrendingUp size={11} aria-hidden="true" />,
    };
    if (pct >= 50) return {
        color:    'var(--m3-primary)',
        bgCls:    'bg-primary-container',
        textCls:  'text-primary',
        ringCls:  'ring-primary/20',
        label:    'Moderate',
        trend:    <Minus size={11} aria-hidden="true" />,
    };
    return {
        color:    'var(--m3-success)',
        bgCls:    'bg-success-container',
        textCls:  'text-success',
        ringCls:  'ring-success/20',
        label:    'Available',
        trend:    <TrendingDown size={11} aria-hidden="true" />,
    };
};

const WARDS = [
    { name: 'ICU / Acute Care',  occupancy: 92, total: 12,  occupied: 11, icon: Activity  },
    { name: 'General Ward',      occupancy: 65, total: 120, occupied: 78, icon: Bed        },
    { name: 'Surgical Wing',     occupancy: 42, total: 45,  occupied: 19, icon: ShieldPlus },
    { name: 'Maternity Unit',    occupancy: 78, total: 25,  occupied: 19, icon: Baby       },
    { name: 'Pediatric Ward',    occupancy: 55, total: 30,  occupied: 16, icon: Heart      },
    { name: 'Private Suites',    occupancy: 30, total: 10,  occupied: 3,  icon: UserPlus   },
];

const SUMMARY_STATS = [
    { label: 'Aggregate Occupancy', value: '62.4%',    note: '+2.1% vs yesterday' },
    { label: 'Available Beds',      value: '84 Units',  note: '28% of total capacity' },
    { label: 'Projected Discharges',value: '12 Patients',note: 'Next 6 hours' },
    { label: 'Admission Queue',     value: '28 In Queue',note: '5 urgent priority' },
];

/* ─── Single ward row ─── */
const WardRow = ({ ward, idx }) => {
    const meta = getOccupancyMeta(ward.occupancy);
    const WardIcon = ward.icon;
    const free = ward.total - ward.occupied;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07, duration: 0.24, ease: [0.2, 0, 0, 1] }}
            className="flex flex-col gap-3"
        >
            {/* ── Ward label row ── */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    {/* Icon chip */}
                    <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${meta.bgCls} ${meta.textCls}`}
                        aria-hidden="true"
                    >
                        <WardIcon size={16} strokeWidth={2} />
                    </div>
                    {/* Name */}
                    <span className="text-[13px] font-semibold text-text-main truncate">
                        {ward.name}
                    </span>
                </div>

                {/* Right cluster: label + pct */}
                <div className="flex items-center gap-2 shrink-0">
                    <span
                        className={`m3-pill text-[9px] font-bold ${meta.bgCls} ${meta.textCls}`}
                        aria-label={`${meta.label} occupancy`}
                    >
                        {meta.label}
                    </span>
                    <span
                        className={`text-sm font-bold tabular ${meta.textCls}`}
                        aria-label={`${ward.occupancy}% occupied`}
                    >
                        {ward.occupancy}%
                    </span>
                </div>
            </div>

            {/* ── Progress track ── */}
            <div
                className="relative h-2 w-full bg-surface-variant rounded-full overflow-hidden"
                role="progressbar"
                aria-label={`${ward.name} bed occupancy`}
                aria-valuenow={ward.occupancy}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ward.occupancy}%` }}
                    transition={{ delay: 0.2 + idx * 0.07, duration: 0.9, ease: [0.2, 0, 0, 1] }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ backgroundColor: meta.color }}
                >
                    {/* Shimmer on critical */}
                    {ward.occupancy >= 90 && (
                        <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            aria-hidden="true"
                        />
                    )}
                </motion.div>
            </div>

            {/* ── Bed count sub-row ── */}
            <div className="flex items-center justify-between px-0.5">
                <span className="text-[10px] font-medium text-text-sub opacity-60">
                    {ward.occupied} of {ward.total} beds occupied
                </span>
                <span
                    className={`text-[10px] font-semibold ${free <= 2 ? 'text-error' : 'text-text-sub opacity-50'}`}
                >
                    {free} free
                </span>
            </div>
        </motion.div>
    );
};

/* ─── Summary stat chip ─── */
const SummaryChip = ({ stat, idx }) => (
    <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 + idx * 0.07, duration: 0.22 }}
        className="flex flex-col gap-1.5 p-5 bg-surface-variant/40 hover:bg-surface-variant/70
            border border-outline-variant/40 hover:border-outline-variant
            rounded-2xl transition-colors group"
    >
        <span className="m3-label-sm text-text-sub opacity-55">{stat.label}</span>
        <span className="text-xl font-bold text-text-main tracking-tight tabular">{stat.value}</span>
        <span className="text-[10px] font-medium text-text-sub opacity-45">{stat.note}</span>
    </motion.div>
);

/* ═══ Main Component ═══ */
const BedOccupancyCard = () => {
    const navigate = useNavigate();
    const [wards, setWards]         = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    const load = useCallback(async () => {
        setIsLoading(true);
        try {
            await new Promise(r => setTimeout(r, 720));
            setWards(WARDS);
            setLastUpdated(new Date());
        } catch {
            setWards(WARDS);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const criticalCount = wards.filter(w => w.occupancy >= 90).length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            className="w-full bg-surface-bright border border-outline-variant rounded-[28px] elev-1 overflow-hidden"
        >
            {/* ══════════════════════════════════
                HEADER
            ══════════════════════════════════ */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 pt-8 pb-6
                border-b border-outline-variant/40">
                {/* Left */}
                <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                        className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-primary shrink-0"
                        aria-hidden="true"
                    >
                        <Activity size={22} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2" aria-hidden="true">
                            <span className="m3-label-sm text-text-sub opacity-55">Facility Capacity Center</span>
                        </div>
                        <h2 className="text-2xl font-bold text-text-main tracking-tight">
                            Bed Occupancy Inventory
                        </h2>
                    </div>
                </div>

                {/* Right: alerts + actions */}
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Critical alert */}
                    {criticalCount > 0 && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1,   opacity: 1 }}
                            className="flex items-center gap-2 px-4 py-2.5
                                bg-error-container border border-error/20 rounded-2xl"
                            role="status"
                            aria-label={`${criticalCount} ward${criticalCount > 1 ? 's' : ''} at critical occupancy`}
                        >
                            <AlertCircle size={14} className="text-error animate-pulse" aria-hidden="true" />
                            <span className="text-[11px] font-semibold text-error">
                                {criticalCount} ward{criticalCount > 1 ? 's' : ''} critical
                            </span>
                        </motion.div>
                    )}

                    {/* Threshold badge */}
                    <div
                        className="flex items-center gap-2 px-3 py-2 bg-surface-variant/60 rounded-2xl border border-outline-variant/50"
                        aria-label="Alert threshold at 85% occupancy"
                    >
                        <span className="text-[10px] font-semibold text-text-sub uppercase tracking-wide">
                            Threshold: 85%
                        </span>
                    </div>

                    {/* Refresh */}
                    <button
                        onClick={load}
                        disabled={isLoading}
                        aria-label={isLoading ? 'Refreshing occupancy data…' : 'Refresh occupancy data'}
                        className="icon-btn border border-outline-variant text-text-sub hover:text-primary hover:border-primary/30
                            outline-none focus-visible:ring-2 focus-visible:ring-primary
                            disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} aria-hidden="true" />
                    </button>

                    {/* View full */}
                    <button
                        onClick={() => navigate('/admin/clinical/wards')}
                        aria-label="View full bed management system"
                        className="flex items-center gap-2 h-10 px-5 rounded-full
                            bg-primary text-white text-[11px] font-semibold
                            hover:brightness-110 active:scale-[0.97]
                            elev-1 transition-colors
                            outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        View Beds
                        <ArrowUpRight size={14} aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* ══════════════════════════════════
                WARD GRID
            ══════════════════════════════════ */}
            <div className="px-8 py-8">
                {isLoading ? (
                    /* Skeleton grid — exact same shape as real content */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {[0,1,2,3,4,5].map(i => (
                            <div key={i} className="flex flex-col gap-3" aria-hidden="true">
                                <div className="flex items-center gap-3">
                                    <div className="skeleton-shimmer w-9 h-9 rounded-2xl" />
                                    <div className="skeleton-shimmer h-3 w-32 rounded-md" />
                                    <div className="skeleton-shimmer h-5 w-12 rounded-full ml-auto" />
                                </div>
                                <div className="skeleton-shimmer h-2 w-full rounded-full" />
                                <div className="flex justify-between">
                                    <div className="skeleton-shimmer h-2 w-28 rounded-md" />
                                    <div className="skeleton-shimmer h-2 w-10 rounded-md" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                        role="list"
                        aria-label="Ward occupancy details"
                    >
                        {wards.map((ward, idx) => (
                            <div key={ward.name} role="listitem">
                                <WardRow ward={ward} idx={idx} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Last updated */}
                {lastUpdated && !isLoading && (
                    <p className="mt-5 text-[10px] font-medium text-text-sub opacity-40 text-right">
                        Updated {lastUpdated.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                )}
            </div>

            {/* ══════════════════════════════════
                SUMMARY STATS FOOTER
            ══════════════════════════════════ */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4
                    px-8 py-6 border-t border-outline-variant/40 bg-surface-variant/20"
                role="list"
                aria-label="Capacity summary statistics"
            >
                {SUMMARY_STATS.map((stat, idx) => (
                    <div key={stat.label} role="listitem">
                        <SummaryChip stat={stat} idx={idx} />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default BedOccupancyCard;
