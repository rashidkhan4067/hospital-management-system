import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, DollarSign, Bed } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboardData } from '../hooks/useDashboardData';
import { useDataStore }    from '@/core/store/useDataStore';

/* Skeleton for a single KPI card */
const KpiSkeleton = () => (
    <div className="kpi-card" aria-hidden="true" style={{ gap: '10px' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="sk" style={{ width: 36, height: 36, borderRadius: 10 }} />
            <div className="sk" style={{ height: 10, width: '60%' }} />
        </div>
        <div className="sk" style={{ height: 28, width: '50%' }} />
        <div className="sk" style={{ height: 3, width: '100%', borderRadius: 999 }} />
    </div>
);

const COLORS = {
    patients:     { color: 'var(--m3-primary)',  bg: 'var(--m3-primary-container)' },
    appointments: { color: 'var(--m3-success)',  bg: 'var(--m3-success-container)' },
    revenue:      { color: 'var(--m3-warning)',  bg: 'var(--m3-warning-container)' },
    beds:         { color: 'var(--m3-error)',    bg: 'var(--m3-error-container)'   },
};

const KpiGrid = () => {
    const navigate   = useNavigate();
    const { telemetry, isLoading, filters } = useDashboardData();
    const setFilters = useDataStore(s => s.setFilters);

    /* Beds derived stat */
    const bedsPct  = Math.min(((telemetry.appointments.total * 3) / 200) * 100, 100);
    const bedsOcc  = Math.round(bedsPct);
    const bedsLabel = bedsPct >= 85 ? '▲ Critical' : bedsPct >= 70 ? '▲ High' : '▼ Available';

    const kpis = [
        {
            id:    'patients',
            title: filters?.department === 'Emergency' ? 'Emergency Admits' : 'Total Patients',
            value: telemetry.patients.total,
            trend: telemetry.patients.trend,
            isUp:  telemetry.patients.isUp,
            Icon:  Users,
            path:  '/admin/analytics?type=patients',
            range: 'Month',
        },
        {
            id:    'appointments',
            title: filters?.department === 'Emergency' ? 'Walk-in Registrations' : 'Today\'s Appointments',
            value: telemetry.appointments.total,
            trend: telemetry.appointments.trend,
            isUp:  telemetry.appointments.isUp,
            Icon:  Calendar,
            path:  '/admin/appointments',
            range: 'Today',
        },
        {
            id:    'revenue',
            title: filters?.department === 'Emergency' ? 'Emergency Revenue' : 'Revenue Today',
            value: telemetry.revenue.total,
            trend: telemetry.revenue.trend,
            isUp:  telemetry.revenue.isUp,
            Icon:  DollarSign,
            path:  '/admin/analytics?type=finance',
            range: 'Today',
        },
        {
            id:    'beds',
            title: filters?.department === 'Emergency' ? 'ER Bay Status' : 'Bed Occupancy',
            value: `${bedsOcc}%`,
            trend: bedsLabel,
            isUp:  bedsOcc < 85, // Safety first in emergency
            Icon:  Bed,
            path:  '/admin/clinical/wards',
            range: 'Today',
            progressValue: bedsPct,
        },
    ];

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px]" aria-label="Key performance indicators">
            {isLoading
                ? [0, 1, 2, 3].map(i => <KpiSkeleton key={i} />)
                : kpis.map((kpi, idx) => {
                    const c = COLORS[kpi.id];
                    return (
                        <motion.div
                            key={kpi.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.06, duration: 0.25, ease: [0.2, 0, 0, 1] }}
                            onClick={() => {
                                setFilters({ dateRange: kpi.range });
                                navigate(kpi.path);
                            }}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setFilters({ dateRange: kpi.range });
                                    navigate(kpi.path);
                                }
                            }}
                            tabIndex={0}
                            role="button"
                            aria-label={`${kpi.title}: ${kpi.value}`}
                            className="kpi-card"
                        >
                            {/* Icon + label */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div className="kpi-icon" style={{ background: c.bg, color: c.color }} aria-hidden="true">
                                    <kpi.Icon size={17} strokeWidth={2.2} />
                                </div>
                                <span style={{
                                    fontSize: '11px', fontWeight: 700, color: 'var(--m3-text-sub)',
                                    textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.2,
                                }}>
                                    {kpi.title}
                                </span>
                            </div>

                            {/* Value */}
                            <div className="kpi-metric">{kpi.value ?? '—'}</div>

                            {/* Bar + trend */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <div className="kpi-bar-track">
                                    <motion.div
                                        className="kpi-bar-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${kpi.progressValue ?? (kpi.isUp ? 72 : 38)}%` }}
                                        transition={{ delay: idx * 0.06 + 0.15, duration: 0.8, ease: [0.2, 0, 0, 1] }}
                                        style={{ background: c.color }}
                                    />
                                </div>
                                {kpi.trend && (
                                    <span style={{
                                        fontSize: '11px', fontWeight: 700,
                                        color: kpi.isUp ? 'var(--m3-success)' : 'var(--m3-error)',
                                    }}>
                                        {kpi.trend}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    );
                })
            }
        </section>
    );
};

export default KpiGrid;
