import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, ShieldAlert, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/core/api';
import { useDataStore } from '@/core/store/useDataStore';
import { useUIStore } from '@/core/store/useUIStore';

const SEV = {
    Critical: { Icon: ShieldAlert, color: 'var(--m3-error)',   bg: 'var(--m3-error-container)'   },
    Warning:  { Icon: AlertCircle, color: 'var(--m3-warning)', bg: 'var(--m3-warning-container)' },
    Info:     { Icon: Info,         color: 'var(--m3-primary)', bg: 'var(--m3-primary-container)' },
    Success:  { Icon: CheckCircle2, color: 'var(--m3-success)', bg: 'var(--m3-success-container)' },
};

const FALLBACK = [
    { id: 1, severity: 'Critical', message: 'Blood Bank: Type O− stock below critical threshold.', time: '5m' },
    { id: 2, severity: 'Warning',  message: 'Ward 4: Humidity sensors out of safe range.',          time: '12m' },
    { id: 3, severity: 'Info',     message: 'System maintenance scheduled 02:00 AM.',                time: '45m' },
    { id: 4, severity: 'Success',  message: 'Generator monthly test completed successfully.',         time: '2h' },
    { id: 5, severity: 'Warning',  message: 'Pharmacy: 14 orders awaiting pharmacist review.',       time: '3h' },
];

const SystemAlertsFeed = () => {
    const [alerts,   setAlerts]   = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [dismissed, setDismissed] = useState(new Set());
    const filters = useDataStore(s => s.filters);

    const load = useCallback(async (signal) => {
        setLoading(true);
        try {
            const res  = await apiClient.get('/dashboard/activity/feed/', { 
                signal,
                params: { search: filters.searchQuery || undefined }
            });
            const data = res.data?.results || res.data;
            
            if (Array.isArray(data) && data.length > 0) {
                const mapped = data.map(item => ({
                    id:       item.id,
                    severity: item.status === 'warning' ? 'Warning' : (item.status === 'danger' ? 'Critical' : 'Info'),
                    message:  (item.title ? item.title + ': ' : '') + (item.description || ''),
                    time:     'Just now',
                    target:   item.target_url
                }));
                setAlerts(mapped);
            } else {
                setAlerts(FALLBACK);
            }
        } catch (e) {
            if (e.name !== 'CanceledError') setAlerts(FALLBACK);
        } finally {
            setLoading(false);
        }
    }, [filters.searchQuery]);

    useEffect(() => {
        const ctrl = new AbortController();
        load(ctrl.signal);
        return () => ctrl.abort();
    }, [load]);

    const visible = alerts.filter(a => !dismissed.has(a.id));
    const criticalCount = visible.filter(a => a.severity === 'Critical').length;

    return (
        <div className="widget" style={{ height: '380px' }}>
            <div className="widget-header">
                <div>
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-error)' }} />
                        System Alerts
                    </div>
                    <div className="widget-title" style={{ marginTop: 2 }}>Alert Feed</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {criticalCount > 0 && (
                        <div className="chip" style={{
                            background: 'var(--m3-error-container)',
                            color: 'var(--m3-error)',
                        }}>
                            {criticalCount} critical
                        </div>
                    )}
                    <div
                        className="chip"
                        style={{ background: 'var(--m3-surface-variant)', color: 'var(--m3-text-sub)' }}
                    >
                        {visible.length} active
                    </div>
                </div>
            </div>

            <div className="widget-body">
                <div className="widget-scroll-area">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--m3-outline-variant)' }}>
                                <div className="sk" style={{ width: 32, height: 32, borderRadius: 10 }} />
                                <div style={{ flex: 1 }}>
                                    <div className="sk" style={{ height: 10, width: '80%', marginBottom: 5 }} />
                                    <div className="sk" style={{ height: 8,  width: '40%' }} />
                                </div>
                            </div>
                        ))
                    ) : visible.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', opacity: 0.5 }}>
                            <CheckCircle2 size={32} color="var(--m3-success)" />
                            <div style={{ fontSize: 13, fontWeight: 700, marginTop: 10 }}>All Systems Clear</div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <AnimatePresence mode="popLayout">
                                {visible.map((alert) => {
                                    const S = SEV[alert.severity] || SEV.Info;
                                    const openAlertDrawer = useUIStore.getState().openAlertDrawer;
                                    
                                    return (
                                        <motion.div
                                            key={alert.id}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            onClick={() => openAlertDrawer({
                                                message: alert.message,
                                                severity: alert.severity,
                                                time: alert.time,
                                                dept: alert.message?.split(':')?.[0] || 'Unknown',
                                                source: 'Activity Feed Aggregate',
                                                ward: 'Detected Zone'
                                            })}
                                            style={{
                                                display: 'flex',
                                                gap: 12,
                                                padding: '12px 0',
                                                borderBottom: '1px solid var(--m3-outline-variant)',
                                                cursor: 'pointer'
                                            }}
                                            className="hover:bg-surface-variant/20 transition-colors px-2 rounded-xl"
                                        >
                                            <div
                                                style={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: 10,
                                                    background: S.bg,
                                                    color: S.color,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0
                                                }}
                                            >
                                                <S.Icon size={16} strokeWidth={2.5} />
                                            </div>

                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    color: 'var(--m3-text-main)',
                                                    lineHeight: 1.4
                                                }}>
                                                    {alert.message}
                                                </div>
                                                <div style={{
                                                    fontSize: 10,
                                                    color: 'var(--m3-text-sub)',
                                                    fontWeight: 700,
                                                    marginTop: 4,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.02em'
                                                }}>
                                                    {alert.severity} • {alert.time}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setDismissed(prev => new Set([...prev, alert.id]))}
                                                className="icon-sm"
                                                title="Dismiss alert"
                                            >
                                                <X size={14} />
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

export default SystemAlertsFeed;
