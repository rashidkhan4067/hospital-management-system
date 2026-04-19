import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X, ArrowRight } from 'lucide-react';
import { useUIStore } from '@/core/store/useUIStore';

const TYPE_CFG = {
    Critical: {
        banner: 'bg-error-container border-error/20',
        bar:    'bg-error',
        icon:   'bg-error text-white',
        badge:  'text-error',
        glow:   'bg-error/5',
        btn:    'bg-error text-white hover:brightness-110 shadow-error/20',
        dismiss: 'hover:bg-error/10 hover:text-error',
    },
    Warning: {
        banner: 'bg-warning-container border-warning/20',
        bar:    'bg-warning',
        icon:   'bg-warning text-white',
        badge:  'text-warning',
        glow:   'bg-warning/5',
        btn:    'bg-warning text-white hover:brightness-110 shadow-warning/20',
        dismiss: 'hover:bg-warning/10 hover:text-warning',
    },
    Info: {
        banner: 'bg-primary-container border-primary/20',
        bar:    'bg-primary',
        icon:   'bg-primary text-white',
        badge:  'text-primary',
        glow:   'bg-primary/5',
        btn:    'bg-primary text-white hover:brightness-110 shadow-primary/20',
        dismiss: 'hover:bg-primary/10 hover:text-primary',
    },
};

const SystemAlertNode = ({ message, type = 'Critical', onDismiss, dept = 'Blood Bank' }) => {
    const [dismissed, setDismissed] = useState(false);
    const openAlertDrawer = useUIStore(s => s.openAlertDrawer);

    const handleOpenDetail = useCallback((e) => {
        e.stopPropagation();
        openAlertDrawer({
            message,
            severity: type,
            dept,
            time: 'Just Now',
            source: 'Live Monitoring System',
            ward: 'All Affected Zones'
        });
    }, [message, type, dept, openAlertDrawer]);

    const handleDismiss = useCallback((e) => {
        e.stopPropagation();
        setDismissed(true);
        onDismiss?.();
    }, [onDismiss]);

    if (!message || dismissed) return null;

    const cfg = TYPE_CFG[type] ?? TYPE_CFG.Critical;

    return (
        <AnimatePresence>
            <motion.div
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                onClick={handleOpenDetail}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.26, ease: [0.2, 0, 0, 1] }}
                className={`relative overflow-hidden border rounded-[24px] elev-1 cursor-pointer group/banner transition-shadow hover:shadow-xl ${cfg.banner}`}
            >
                {/* Left accent bar */}
                <div className={`absolute top-0 left-0 w-1 h-full ${cfg.bar} rounded-l-[24px]`} aria-hidden="true" />

                {/* Ambient glow blob */}
                <div className={`absolute -top-16 -left-16 w-48 h-48 ${cfg.glow} rounded-full blur-3xl pointer-events-none group-hover/banner:scale-110 transition-transform`} aria-hidden="true" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 pl-7 relative z-10">
                    {/* Body */}
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${cfg.icon} elev-1`}
                            aria-hidden="true"
                        >
                            <ShieldAlert
                                size={20}
                                strokeWidth={2.5}
                                className={type === 'Critical' ? 'animate-pulse' : ''}
                            />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${cfg.badge}`}>
                                    {type === 'Critical' ? '⚠️' : type === 'Warning' ? '⚡' : 'ℹ️'} Priority Alert
                                </span>
                                <time className="text-[10px] font-medium text-text-sub opacity-50">Just Now</time>
                            </div>
                            <p className="text-sm font-semibold text-text-main leading-snug max-w-xl group-hover/banner:text-primary transition-colors">
                                {message}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={handleOpenDetail}
                            className={`flex items-center gap-2 h-9 px-5 rounded-full
                                text-[11px] font-bold uppercase tracking-wide
                                active:scale-[0.97] elev-1 transition-all
                                outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                                ${cfg.btn}`}
                            aria-label={`Execute protocol for: ${message}`}
                        >
                            Respond
                            <ArrowRight size={13} aria-hidden="true" />
                        </button>
                        <button
                            onClick={handleDismiss}
                            aria-label="Dismiss this alert"
                            className={`w-9 h-9 rounded-full flex items-center justify-center
                                text-text-sub transition-colors border border-transparent
                                hover:border-current/20
                                outline-none focus-visible:ring-2 focus-visible:ring-current
                                ${cfg.dismiss}`}
                        >
                            <X size={15} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SystemAlertNode;
