import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import { apiClient } from '@/core/api';
import { useDataStore } from '@/core/store/useDataStore';
import { useNavigate }  from 'react-router-dom';

const AVATAR_GRADS = [
    'var(--grad-violet)',
    'var(--grad-blue)',
    'var(--grad-emerald)',
    'var(--grad-orange)',
    'var(--grad-rose)',
];

const TYPE = {
    IPD: { bg: 'var(--m3-warning-container)', color: 'var(--m3-warning)' },
    OPD: { bg: 'var(--m3-primary-container)', color: 'var(--m3-primary)' },
};

const initials = (n = '') =>
    n.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);

const FALLBACK = [
    { id: 'PAT-001', full_name: 'Zahra Ahmed',  ward: 'Cardiology',  type: 'IPD', time: '12m' },
    { id: 'PAT-002', full_name: 'Omar Farooq',  ward: 'Emergency',   type: 'IPD', time: '24m' },
    { id: 'PAT-003', full_name: 'Sana Malik',   ward: 'OPD General', type: 'OPD', time: '45m' },
    { id: 'PAT-004', full_name: 'Hamza Khan',   ward: 'Radiology',   type: 'OPD', time: '1h'  },
    { id: 'PAT-005', full_name: 'Ayesha Bibi',  ward: 'ICU-02',      type: 'IPD', time: '2h'  },
];

const RecentAdmissionsCard = () => {
    const [patients,  setPatients]  = useState([]);
    const [loading,   setLoading]   = useState(true);
    const navigate    = useNavigate();
    const filters     = useDataStore(s => s.filters);
    const timerRef    = useRef(null);

    const load = useCallback(async (signal) => {
        setLoading(true);
        try {
            const res  = await apiClient.get('/patients/profiles/', {
                signal,
                params: { 
                    limit: 10, 
                    department: filters.department !== 'All' ? filters.department : undefined,
                    search: filters.searchQuery || undefined,
                },
            });
            const data = res.data?.results || res.data;
            setPatients(Array.isArray(data) && data.length > 0 ? data.slice(0, 10) : FALLBACK);
        } catch (e) {
            if (e.name !== 'CanceledError') setPatients(FALLBACK);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        const ctrl = new AbortController();
        load(ctrl.signal);
        timerRef.current = setInterval(() => {
            const c = new AbortController(); load(c.signal);
        }, 60_000);
        return () => { ctrl.abort(); clearInterval(timerRef.current); };
    }, [load]);

    const ipdCount = patients.filter(p => p.type === 'IPD').length;
    const opdCount = patients.filter(p => p.type === 'OPD').length;

    return (
        <div className="widget" style={{ height: '380px' }}>
            {/* Header */}
            <div className="widget-header">
                <div>
                    <div className="eyebrow">
                        <span className="eyebrow-dot" style={{ background: 'var(--m3-success)' }} />
                        Live Intake
                    </div>
                    <div className="widget-title" style={{ marginTop: 2 }}>Recent Admissions</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button className="ghost-link" onClick={() => navigate('/admin/clinical/admissions')} aria-label="View all admissions">
                        Live View →
                    </button>
                </div>
            </div>

            {/* Summary chips */}
            {!loading && (
                <div style={{ display: 'flex', gap: 6, padding: '8px 16px 0', flexShrink: 0 }}>
                    {[
                        { label: `${ipdCount} IPD`, bg: 'var(--m3-warning-container)', color: 'var(--m3-warning)' },
                        { label: `${opdCount} OPD`, bg: 'var(--m3-primary-container)', color: 'var(--m3-primary)' },
                    ].map(c => (
                        <div key={c.label} className="chip" style={{ background: c.bg, color: c.color, border: 'none' }}>
                            {c.label}
                        </div>
                    ))}
                </div>
            )}

            {/* List */}
            <div className="widget-body">
                <div className="widget-scroll-area">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', alignItems: 'center' }}>
                                <div className="sk" style={{ width: 34, height: 34, borderRadius: '50%' }} />
                                <div style={{ flex: 1 }}>
                                    <div className="sk" style={{ height: 10, width: '60%', marginBottom: 4 }} />
                                    <div className="sk" style={{ height: 8, width: '30%' }} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <AnimatePresence mode="popLayout">
                                {patients.map((p, i) => {
                                    const T = TYPE[p.type] || TYPE.OPD;
                                    return (
                                        <motion.div
                                            key={p.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.03 }}
                                        >
                                            <button
                                                className="widget-row-btn"
                                                onClick={() => navigate(`/admin/clinical/patients/${p.id}`)}
                                                style={{ borderBottom: '1px solid var(--m3-outline-variant)' }}
                                            >
                                                {/* Avatar */}
                                                <div style={{
                                                    width: 34, height: 34, borderRadius: '50%',
                                                    background: AVATAR_GRADS[i % 5],
                                                    color: 'white', display: 'flex',
                                                    alignItems: 'center', justifyContent: 'center',
                                                    fontSize: 10, fontWeight: 800, flexShrink: 0
                                                }}>
                                                    {initials(p.full_name || p.name)}
                                                </div>

                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{
                                                        fontSize: 13, fontWeight: 600, color: 'var(--m3-text-main)',
                                                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                                    }}>
                                                        {p.full_name || p.name}
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--m3-text-sub)' }}>
                                                            <MapPin size={10} /> {p.ward || 'General'}
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--m3-text-sub)' }}>
                                                            <Clock size={10} /> {p.time || 'now'}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="chip" style={{ background: T.bg, color: T.color, border: 'none', marginLeft: 'auto' }}>
                                                    {p.type}
                                                </div>
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecentAdmissionsCard;
