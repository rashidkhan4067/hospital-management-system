import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUpRight, Clock, ChevronRight, Stethoscope, User2 } from 'lucide-react';
import { apiClient } from '@/core/api';
import { ListSkeleton } from '@/components/primitives/Skeleton';
import { useNavigate } from 'react-router-dom';

/* ─── Status config: Google-style semantic tokens ─── */
const STATUS = {
    'In-Progress': {
        dot:   'bg-primary',
        ring:  'ring-primary/25',
        badge: 'bg-primary-container text-primary',
        label: 'In Progress',
    },
    'Confirmed': {
        dot:   'bg-success',
        ring:  'ring-success/25',
        badge: 'bg-success-container text-success',
        label: 'Confirmed',
    },
    'Completed': {
        dot:   'bg-outline',
        ring:  'ring-outline/20',
        badge: 'bg-surface-variant text-text-sub',
        label: 'Completed',
    },
    'Pending': {
        dot:   'bg-warning',
        ring:  'ring-warning/25',
        badge: 'bg-warning-container text-warning',
        label: 'Pending',
    },
    'Cancelled': {
        dot:   'bg-error',
        ring:  'ring-error/25',
        badge: 'bg-error-container text-error',
        label: 'Cancelled',
    },
};

/* ─── Type → color accent (M3 tonal badge)  ─── */
const TYPE_COLOR = {
    Consultation: 'text-primary',
    Surgery:      'text-error',
    'Check-up':   'text-success',
    'Follow-up':  'text-warning',
    Radiology:    'text-[#6750A4]',
};

const FALLBACK = [
    { id: 'APP-001', patient: 'Khalil Ibrahim',  doctor: 'Dr. Sarah Smith',  time: '14:30', date: 'Today', status: 'In-Progress', type: 'Consultation' },
    { id: 'APP-002', patient: 'Amina Shah',       doctor: 'Dr. John Doe',     time: '15:15', date: 'Today', status: 'Confirmed',   type: 'Surgery'       },
    { id: 'APP-003', patient: 'Yasin Malik',      doctor: 'Dr. Emily Blunt',  time: '16:00', date: 'Today', status: 'Pending',     type: 'Check-up'      },
    { id: 'APP-004', patient: 'Zahra Khan',       doctor: 'Dr. Sarah Smith',  time: '16:45', date: 'Today', status: 'Completed',   type: 'Follow-up'     },
    { id: 'APP-005', patient: 'Omar Abdullah',    doctor: 'Dr. Alan Rick',    time: '17:30', date: 'Today', status: 'Confirmed',   type: 'Radiology'     },
];

/* ─── Sub-component: single appointment row ─── */
const AppointmentRow = ({ app, idx, onClick }) => {
    const name   = app.patient?.full_name || app.patient;
    const doctor = app.doctor?.full_name  || app.doctor;
    const status = app.status_display     || app.status;
    const cfg    = STATUS[status] ?? STATUS.Pending;

    return (
        <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06, duration: 0.22, ease: [0.2, 0, 0, 1] }}
            onClick={onClick}
            aria-label={`${name} · ${app.type} · ${app.time} · ${cfg.label}`}
            className="w-full group flex items-stretch gap-0 text-left
                hover:bg-surface-variant/40 active:bg-surface-variant/70
                rounded-2xl transition-colors duration-150
                outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        >
            {/* ── Time column ── */}
            <div className="flex flex-col items-center justify-start pt-4 pb-3 pl-3 pr-4 gap-1 shrink-0 w-[68px]">
                <span className="text-sm font-bold text-text-main tabular leading-none">
                    {app.time ?? app.start_time?.substring(0, 5)}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-text-sub opacity-50">
                    {app.date ?? 'Today'}
                </span>
                {/* timeline dot + line */}
                <div className="flex flex-col items-center mt-2 flex-1">
                    <div className={`w-2.5 h-2.5 rounded-full ring-4 shrink-0 ${cfg.dot} ${cfg.ring}`} aria-hidden="true" />
                    {idx < FALLBACK.length - 1 && (
                        <div className="w-px flex-1 bg-outline-variant/50 mt-1.5" aria-hidden="true" />
                    )}
                </div>
            </div>

            {/* ── Content ── */}
            <div className="flex items-center flex-1 min-w-0 gap-3 py-3.5 pr-3 border-b border-outline-variant/30 group-last:border-0">
                {/* Patient avatar */}
                <div
                    className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-primary text-xs font-bold shrink-0"
                    aria-hidden="true"
                >
                    {name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>

                {/* Name + doctor */}
                <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[13px] font-semibold text-text-main truncate leading-tight">
                        {name}
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                        <User2 size={9} className="text-text-sub opacity-40 shrink-0" aria-hidden="true" />
                        <span className="text-[11px] text-text-sub opacity-60 truncate">{doctor}</span>
                    </div>
                </div>

                {/* Type + badge */}
                <div className="flex flex-col items-end gap-1.5 shrink-0 pl-2">
                    <span className={`text-[9px] font-bold uppercase tracking-widest opacity-70 ${TYPE_COLOR[app.type] ?? 'text-text-sub'}`}>
                        {app.type ?? 'Consultation'}
                    </span>
                    <span className={`m3-pill text-[9px] font-bold py-0.5 px-2 ${cfg.badge}`}>
                        {cfg.label}
                    </span>
                </div>
            </div>
        </motion.button>
    );
};

/* ─── Main component ─── */
import { useDataStore } from '@/core/store/useDataStore';

const RecentAppointmentsCard = () => {
    const navigate = useNavigate();
    const globalFilters = useDataStore(state => state.filters);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading]       = useState(true);

    const load = useCallback(async (signal) => {
        setIsLoading(true);
        try {
            const res  = await apiClient.get('/appointments/', { 
                signal,
                params: {
                    limit: 5,
                    department: globalFilters.department !== 'All' ? globalFilters.department : undefined,
                    range: globalFilters.dateRange,
                    search: globalFilters.searchQuery
                }
            });
            const data = res.data.results || res.data;
            setAppointments(Array.isArray(data) && data.length ? data.slice(0, 5) : FALLBACK);
        } catch (err) {
            if (err.name !== 'CanceledError') setAppointments(FALLBACK);
        } finally {
            setIsLoading(false);
        }
    }, [globalFilters]);

    useEffect(() => {
        const ctrl = new AbortController();
        load(ctrl.signal);
        return () => ctrl.abort();
    }, [load]);

    /* Next shift time (static for now) */
    const nextShift = '18:00';

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            className="w-full h-full bg-surface-bright border border-outline-variant rounded-[24px] elev-1 flex flex-col overflow-hidden"
        >
            {/* ══ Header ══ */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4">
                {/* Left */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2" aria-hidden="true">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        <span className="m3-label-sm text-text-sub opacity-55">Clinical Schedule</span>
                    </div>
                    <h2 className="text-[22px] font-bold text-text-main tracking-tight leading-snug">
                        Daily Appointments
                    </h2>
                </div>

                {/* Right cluster */}
                <div className="flex items-center gap-2 mt-1 shrink-0">
                    {/* Next shift pill */}
                    <div
                        className="flex items-center gap-1.5 px-3 py-2 bg-surface-variant/60 rounded-2xl border border-outline-variant/50"
                        aria-label={`Next shift at ${nextShift}`}
                    >
                        <Clock size={12} className="text-primary opacity-60" aria-hidden="true" />
                        <span className="text-[10px] font-semibold text-text-sub uppercase tracking-wide">
                            Next Shift: {nextShift}
                        </span>
                    </div>

                    {/* View all */}
                    <button
                        onClick={() => navigate('/admin/appointments')}
                        aria-label="View full appointment schedule"
                        className="flex items-center gap-1 text-[11px] font-semibold text-primary
                            hover:text-primary-hover transition-colors
                            outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm"
                    >
                        View Schedule
                        <ArrowUpRight size={14} aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* ══ Date strip ══ */}
            <div className="mx-6 mb-2 flex items-center gap-2.5 px-3 py-2.5 bg-primary/5 border border-primary/10 rounded-2xl">
                <Calendar size={14} className="text-primary shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-semibold text-primary">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long', month: 'long', day: 'numeric'
                    })}
                </span>
                <span className="ml-auto m3-pill bg-primary-container text-primary text-[9px]">
                    {appointments.length} scheduled
                </span>
            </div>

            {/* ══ Timeline list ══ */}
            <div
                className="flex-1 overflow-y-auto px-3 custom-scrollbar"
                role="list"
                aria-label="Today's appointments"
            >
                {isLoading ? (
                    <div className="p-3"><ListSkeleton rows={5} /></div>
                ) : appointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-text-sub opacity-40">
                        <Calendar size={36} strokeWidth={1.5} aria-hidden="true" />
                        <p className="mt-3 text-[11px] font-bold uppercase tracking-widest">No Appointments Today</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {appointments.map((app, idx) => (
                            <div key={app.id} role="listitem">
                                <AppointmentRow
                                    app={app}
                                    idx={idx}
                                    onClick={() => navigate(`/admin/appointments/${app.id}`)}
                                />
                            </div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* ══ Footer CTA ══ */}
            <div className="px-6 pt-4 pb-6">
                <button
                    onClick={() => navigate('/admin/appointments?view=theater')}
                    aria-label="Coordinate master theater operations"
                    className="w-full flex items-center justify-between px-5 h-12
                        bg-surface-variant/50 hover:bg-surface-variant
                        border border-outline-variant/40 hover:border-primary/20
                        rounded-2xl transition-colors group
                        outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    <span className="text-[11px] font-semibold text-text-sub group-hover:text-primary uppercase tracking-widest transition-colors">
                        Coordinate Master Theater Operations
                    </span>
                    <ChevronRight size={16} className="text-text-sub group-hover:text-primary transition-colors shrink-0" aria-hidden="true" />
                </button>
            </div>
        </motion.div>
    );
};

export default RecentAppointmentsCard;
