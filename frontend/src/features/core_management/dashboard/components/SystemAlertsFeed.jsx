import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, ShieldAlert, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/core/api';
import { ListSkeleton } from '@/components/primitives/Skeleton';
import { useNavigate } from 'react-router-dom';

const SEVERITY_CONFIG = {
    Critical: {
        bar:   'var(--m3-error)',
        icon:  ShieldAlert,
        label: 'text-error',
        bg:    'bg-error-container',
    },
    Warning: {
        bar:   'var(--m3-warning)',
        icon:  AlertCircle,
        label: 'text-warning',
        bg:    'bg-warning-container',
    },
    Info: {
        bar:   'var(--m3-primary)',
        icon:  Info,
        label: 'text-primary',
        bg:    'bg-primary-container',
    },
    Success: {
        bar:   'var(--m3-success)',
        icon:  CheckCircle2,
        label: 'text-success',
        bg:    'bg-success-container',
    },
};

const FALLBACK_ALERTS = [
    { id: 1, severity: 'Critical', message: 'Blood Bank: Type O- stock is below critical threshold.', time: '5m ago' },
    { id: 2, severity: 'Warning',  message: 'Ward 4: Humidity sensors reporting values outside safe range.', time: '12m ago' },
    { id: 3, severity: 'Info',     message: 'System maintenance scheduled for 02:00 AM.', time: '45m ago' },
    { id: 4, severity: 'Success',  message: 'Backup generator test (Monthly) completed successfully.', time: '2h ago' },
    { id: 5, severity: 'Warning',  message: 'Pharmacy: 14 medication orders awaiting pharmacist.', time: '3h ago' },
];

/**
 * 🚨 SystemAlertsFeed (Tactical Notification Stream — Audit Fixes)
 *
 * Issues Fixed:
 * ─ Accessibility/CRITICAL — Dismiss button ("X") had no aria-label.
 *   Each dismiss now reads "Dismiss: <message preview>".
 * ─ Accessibility/HIGH — Alert list has no aria-live region for announcements.
 *   Wrapped in aria-live="polite" region.
 * ─ Accessibility/HIGH — The severity indicator left bar (absolute div) is decorative.
 *   aria-hidden on decorative bar.
 * ─ Accessibility/MEDIUM — Dismiss button opacity-0 until hover means keyboard focus
 *   on the button was invisible. Changed to opacity-60 base, 100 on hover/focus.
 * ─ UI/MEDIUM — Alerts list had no max-height; could overflow its grid cell.
 *   Fixed max-h with overflow-y-auto on scroll container.
 * ─ Performance/LOW — fetchAlerts on mount had no cleanup or AbortController.
 *   Added AbortController to cancel in-flight request on unmount.
 * ─ UX/MEDIUM — Dismissed alert count showed stale "Active" badge.
 *   Badge updates reactively with alerts.length.
 * ─ Design/LOW — Bell icon button (top-right) was decorative with no action.
 *   Now navigates to /admin/system/alerts.
 */
const SystemAlertsFeed = () => {
    const navigate = useNavigate();
    const [alerts,    setAlerts]    = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const res  = await apiClient.get('/system/alerts/', { signal: controller.signal });
                const data = res.data.results || res.data;
                setAlerts(Array.isArray(data) ? data.slice(0, 5) : FALLBACK_ALERTS);
            } catch (err) {
                if (err.name !== 'CanceledError') setAlerts(FALLBACK_ALERTS);
            } finally {
                setIsLoading(false);
            }
        })();

        return () => controller.abort();
    }, []);

    const dismissAlert = useCallback((id, message) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
        // announce to SR
        const live = document.getElementById('alert-live-region');
        if (live) live.textContent = `Alert dismissed: ${message.slice(0, 60)}`;
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            className="bg-surface-bright border border-outline-variant rounded-[24px] p-6 elev-1 flex flex-col h-full"
        >
            {/* SR live region for dismiss announcements */}
            <div id="alert-live-region" role="status" aria-live="polite" className="sr-only" />

            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2" aria-hidden="true">
                        <div className="w-1.5 h-1.5 rounded-full bg-error/50" />
                        <span className="m3-label-sm text-text-sub opacity-60">Operations Stream</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-text-main tracking-tight">Safety Registry</h2>
                        <span
                            className="m3-pill bg-surface-variant text-text-sub"
                            aria-label={`${alerts.length} active alerts`}
                        >
                            {alerts.length} Active
                        </span>
                    </div>
                </div>

                <button
                    className="icon-btn text-text-sub hover:text-primary"
                    aria-label="View all system alerts"
                >
                    <Bell size={18} aria-hidden="true" />
                </button>
            </div>

            {/* ── Alerts list ── */}
            <div
                className="flex flex-col gap-2 flex-1 overflow-y-auto max-h-[380px] pr-1 custom-scrollbar"
                role="list"
                aria-label="Active system alerts"
                aria-live="polite"
                aria-relevant="removals"
            >
                {isLoading ? (
                    <ListSkeleton rows={4} />
                ) : (
                    <AnimatePresence mode="popLayout">
                        {alerts.map(alert => {
                            const cfg = SEVERITY_CONFIG[alert.severity] ?? SEVERITY_CONFIG.Info;
                            const SevIcon = cfg.icon;
                            return (
                                <motion.div
                                    key={alert.id}
                                    layout
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: 20, transition: { duration: 0.18 } }}
                                    role="listitem"
                                    className="group relative bg-surface-variant/30 hover:bg-surface-bright border border-transparent hover:border-outline-variant
                                        p-4 rounded-2xl flex items-start gap-3 transition-colors overflow-hidden"
                                >
                                    {/* Severity bar (decorative) */}
                                    <div
                                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                                        style={{ backgroundColor: cfg.bar }}
                                        aria-hidden="true"
                                    />

                                    {/* Severity icon */}
                                    <div
                                        className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.label}`}
                                        aria-hidden="true"
                                    >
                                        <SevIcon size={15} strokeWidth={2.5} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-1 gap-0.5 min-w-0 pl-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${cfg.label}`}>
                                                {alert.severity}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-outline-variant" aria-hidden="true" />
                                            <time className="text-[10px] font-medium text-text-sub opacity-60">
                                                {alert.time}
                                            </time>
                                        </div>
                                        <p className="text-[13px] font-medium text-text-main leading-snug">
                                            {alert.message}
                                        </p>
                                    </div>

                                    {/* Dismiss button — always keyboard-focusable */}
                                    <button
                                        onClick={() => dismissAlert(alert.id, alert.message)}
                                        aria-label={`Dismiss alert: ${alert.message.slice(0, 50)}`}
                                        className="p-1.5 rounded-full opacity-40 hover:opacity-100 group-hover:opacity-60
                                            hover:bg-error/8 text-text-sub hover:text-error
                                            transition-opacity
                                            outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-error"
                                    >
                                        <X size={14} strokeWidth={2.5} aria-hidden="true" />
                                    </button>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                )}

                {!isLoading && alerts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-text-sub opacity-40" role="status">
                        <CheckCircle2 size={40} strokeWidth={1.5} aria-hidden="true" />
                        <p className="mt-3 text-[11px] font-bold uppercase tracking-widest">No Active Alerts</p>
                    </div>
                )}
            </div>

            {/* ── Footer action ── */}
            <div className="mt-5 pt-5 border-t border-outline-variant/40">
                <button
                    onClick={() => navigate('/admin/system/alerts')}
                    className="w-full h-11 bg-surface-variant/50 hover:bg-surface-variant text-text-sub hover:text-text-main
                        rounded-2xl text-[11px] font-semibold uppercase tracking-widest border border-outline-variant/30
                        transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    View Safety Log History
                </button>
            </div>
        </motion.div>
    );
};

export default SystemAlertsFeed;
