import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Stethoscope } from 'lucide-react';
import { apiClient } from '@/core/api';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '@/core/store/useDataStore';

const STATUS = {
    'In-Progress': { dot: 'var(--m3-primary)',  bg: 'var(--m3-primary-container)',  color: 'var(--m3-primary)',  label: 'Active'    },
    'Confirmed':   { dot: 'var(--m3-success)',  bg: 'var(--m3-success-container)',  color: 'var(--m3-success)',  label: 'Confirmed' },
    'Completed':   { dot: 'var(--m3-outline)',  bg: 'var(--m3-surface-variant)',    color: 'var(--m3-text-sub)', label: 'Done'      },
    'Pending':     { dot: 'var(--m3-warning)',  bg: 'var(--m3-warning-container)',  color: 'var(--m3-warning)',  label: 'Pending'   },
    'Cancelled':   { dot: 'var(--m3-error)',    bg: 'var(--m3-error-container)',    color: 'var(--m3-error)',    label: 'Cancelled' },
};

const FALLBACK = [
    { id: 'APP-001', patient: 'Khalil Ibrahim', doctor: 'Dr. Sarah Smith', time: '14:30', status: 'In-Progress', type: 'Consultation' },
    { id: 'APP-002', patient: 'Amina Shah',     doctor: 'Dr. John Doe',   time: '15:15', status: 'Confirmed',   type: 'Surgery'       },
    { id: 'APP-003', patient: 'Yasin Malik',    doctor: 'Dr. Emily Blunt',time: '16:00', status: 'Pending',     type: 'Check-up'      },
    { id: 'APP-004', patient: 'Zahra Khan',     doctor: 'Dr. Sarah Smith',time: '16:45', status: 'Completed',   type: 'Follow-up'     },
    { id: 'APP-005', patient: 'Omar Abdullah',  doctor: 'Dr. Alan Rick',  time: '17:30', status: 'Confirmed',   type: 'Radiology'     },
];

const RecentAppointmentsCard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const filters  = useDataStore(s => s.filters);

    const load = useCallback(async (signal, isBackground = false) => {
        if (!isBackground) setLoading(true);
        try {
            const res  = await apiClient.get('/appointments/', { 
                signal, 
                params: { 
                    ordering: '-start_time', 
                    limit: 10,
                    department: filters.department !== 'All' ? filters.department : undefined,
                } 
            });
            const data = res.data?.results || res.data;
            
            if (Array.isArray(data) && data.length > 0) {
                const mapped = data.map(item => ({
                    id:      item.id,
                    patient: item.patient?.full_name || 'Anonymous',
                    doctor:  item.doctor?.full_name || 'Assigned Physician',
                    time:    item.start_time?.slice(0, 5) || '00:00',
                    status:  item.status_display || item.status || 'Pending',
                    type:    item.notes?.slice(0, 20) || 'Consultation'
                }));
                setAppointments(mapped);
            } else {
                setAppointments(FALLBACK);
            }
        } catch (e) {
            if (e.name !== 'CanceledError') setAppointments(FALLBACK);
        } finally {
            if (!isBackground) setLoading(false);
        }
    }, [filters.department]);

    useEffect(() => {
        const ctrl = new AbortController();
        load(ctrl.signal);
        const timer = setInterval(() => {
            const c = new AbortController(); load(c.signal, true);
        }, 60_000);
        return () => { ctrl.abort(); clearInterval(timer); };
    }, [load]);

    const activeCount = appointments.filter(a => a.status === 'In-Progress').length;

    return (
        <div className="widget" style={{ height: '380px' }}>
            {/* Header */}
            <div className="widget-header">
                <div>
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-primary)' }} />
                        Today's Schedule
                    </div>
                    <div className="widget-title" style={{ marginTop: 2 }}>Appointments</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {activeCount > 0 && (
                        <div className="chip" style={{
                            background: 'var(--m3-primary-container)',
                            color: 'var(--m3-primary)',
                        }}>
                            {activeCount} active
                        </div>
                    )}
                    <button className="ghost-link" onClick={() => navigate('/admin/appointments')} aria-label="View all appointments">
                        All →
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="widget-body">
                <div className="widget-scroll-area">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 0', alignItems: 'center' }} aria-hidden="true">
                                <div className="sk" style={{ width: 3, height: 36, borderRadius: 3 }} />
                                <div style={{ flex: 1 }}>
                                    <div className="sk" style={{ height: 10, width: '70%', marginBottom: 4 }} />
                                    <div className="sk" style={{ height: 8, width: '50%' }} />
                                </div>
                                <div className="sk" style={{ width: 40, height: 18, borderRadius: 999 }} />
                            </div>
                        ))
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} role="list" aria-label="Today's appointments">
                            <AnimatePresence mode="popLayout">
                                {appointments.map((appt, i) => {
                                    const s = STATUS[appt.status] || STATUS['Pending'];
                                    return (
                                        <motion.li
                                            key={appt.id}
                                            initial={{ opacity: 0, x: -6 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: i * 0.04, duration: 0.18 }}
                                            role="listitem"
                                        >
                                            <button
                                                className="widget-row-btn"
                                                onClick={() => navigate(`/admin/appointments/${appt.id}`)}
                                                aria-label={`${appt.patient} · ${appt.time} · ${s.label}`}
                                            >
                                                {/* Status bar */}
                                                <div style={{
                                                    width: 3, height: 36, borderRadius: 3,
                                                    background: s.dot, flexShrink: 0,
                                                }} aria-hidden="true" />

                                                {/* Info */}
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{
                                                        fontSize: 13, fontWeight: 600, color: 'var(--m3-text-main)',
                                                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                    }}>
                                                        {typeof appt.patient === 'object' ? (appt.patient?.full_name || appt.patient?.name || 'Unknown Patient') : appt.patient}
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                                                        <Stethoscope size={10} style={{ color: 'var(--m3-text-sub)', opacity: 0.5, flexShrink: 0 }} aria-hidden="true" />
                                                        <span style={{
                                                            fontSize: 11, color: 'var(--m3-text-sub)', opacity: 0.7,
                                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                        }}>
                                                            {typeof appt.doctor === 'object' ? (appt.doctor?.full_name || appt.doctor?.name || 'Unknown Doctor') : appt.doctor}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Right column */}
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, flexShrink: 0 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                                        <Clock size={10} style={{ color: 'var(--m3-text-sub)', opacity: 0.5 }} aria-hidden="true" />
                                                        <time style={{ fontSize: 11, fontWeight: 700, color: 'var(--m3-text-main)', fontVariantNumeric: 'tabular-nums' }}>
                                                            {appt.time}
                                                        </time>
                                                    </div>
                                                    <div className="chip" style={{ background: s.bg, color: s.color }}>
                                                        {s.label}
                                                    </div>
                                                </div>
                                            </button>
                                        </motion.li>
                                    );
                                })}
                            </AnimatePresence>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecentAppointmentsCard;
