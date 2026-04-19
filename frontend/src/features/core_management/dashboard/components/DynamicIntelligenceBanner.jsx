import React, { useState, useEffect, useCallback } from 'react'; // Refresh
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Sparkles, ChevronRight, ChevronLeft, ArrowRight, X } from 'lucide-react';
import { apiClient } from '@/core/api';
import { useUIStore } from '@/core/store/useUIStore';

/**
 * 🛰️ DynamicIntelligenceBanner
 * An AI-driven alert rotation system that intelligently cycles through 
 * system insights and priority warnings.
 */
const DynamicIntelligenceBanner = () => {
    const [alerts, setAlerts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const openAlertDrawer = useUIStore(s => s.openAlertDrawer);

    const BASELINE_ALERT = {
        id: 'ai_baseline',
        status: 'info',
        title: 'AI: Clinical Stability Hub',
        description: 'System-wide telemetry within normal parameters. Flow optimization active.',
        dept: 'Command Center',
        source: 'Predictive Pulse'
    };

    const fetchAlerts = useCallback(async () => {
        try {
            const res = await apiClient.get('/dashboard/activity/feed/');
            // Filter only high priority or AI alerts
            const filtered = res.data.filter(a => 
                a.status === 'danger' || a.status === 'warning' || a.id.startsWith('ai_') || a.id.startsWith('alert_')
            );
            if (filtered.length === 0) {
                setAlerts([BASELINE_ALERT]);
            } else {
                setAlerts(filtered);
            }
        } catch (e) {
            console.error('Failed to fetch intelligence feed', e);
            setAlerts([BASELINE_ALERT]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAlerts();
        const id = setInterval(fetchAlerts, 60000); // Pulse every minute
        return () => clearInterval(id);
    }, [fetchAlerts]);

    // Auto-cycle logic
    useEffect(() => {
        if (alerts.length <= 1) return;
        const id = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % alerts.length);
        }, 8000); // 8s per insight
        return () => clearInterval(id);
    }, [alerts]);

    if (loading || alerts.length === 0) return null;

    const current = alerts[currentIndex] || alerts[0] || BASELINE_ALERT;
    
    const severityMap = {
        danger:  { bg: 'bg-error-container/40',  text: 'text-error',   bar: 'bg-error',   glow: 'bg-error/5' },
        warning: { bg: 'bg-warning-container/40', text: 'text-warning', bar: 'bg-warning', glow: 'bg-warning/5' },
        info:    { bg: 'bg-primary-container/40', text: 'text-primary', bar: 'bg-primary', glow: 'bg-primary/5' },
    };

    const cfg = severityMap[current?.status] || severityMap.info;

    return (
        <div className="relative group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 10, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.99 }}
                    transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                    onClick={() => openAlertDrawer({
                        message: current.description,
                        severity: current.status === 'danger' ? 'Critical' : (current.status === 'warning' ? 'Warning' : 'Info'),
                        dept: current.dept,
                        source: current.source,
                        time: 'Live'
                    })}
                    className={`relative overflow-hidden border border-outline-variant/30 rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 sm:pl-7 cursor-pointer hover:shadow-xl transition-all ${cfg.bg}`}
                >
                    {/* Left Intelligence bar */}
                    <div className={`absolute top-0 left-0 w-1.5 h-full ${cfg.bar} opacity-60`} />
                    
                    {/* Atmospheric Glow */}
                    <div className={`absolute -top-24 -left-24 w-48 h-48 ${cfg.glow} rounded-full blur-3xl`} />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 relative z-10">
                        <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                            {/* Icon Logic */}
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${current.id.startsWith('ai_') ? 'bg-primary text-white' : 'bg-surface-bright ' + cfg.text}`}>
                                {current.id.startsWith('ai_') ? <Sparkles size={20} /> : <ShieldAlert size={20} />}
                            </div>

                            <div className="flex flex-col min-w-0">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                    <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] ${cfg.text}`}>
                                        {current.title}
                                    </span>
                                    <span className="hidden sm:block w-1 h-1 rounded-full bg-outline-variant opacity-40" />
                                    <span className="text-[9px] sm:text-[10px] font-bold text-text-sub opacity-50 uppercase tracking-wider">
                                         {current.source}
                                    </span>
                                </div>
                                <p className="text-[13px] sm:text-[14px] font-bold text-text-main leading-tight mt-1 sm:mt-0.5 line-clamp-2 md:line-clamp-1">
                                    {current.description}
                                </p>
                            </div>
                        </div>

                        {/* Controls & Nav */}
                        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-black/5">
                            {alerts.length > 1 && (
                                <div className="flex items-center gap-2 pr-4 md:border-r border-outline-variant/30">
                                    <div className="flex gap-0.5">
                                        {alerts.map((_, idx) => (
                                            <div key={idx} className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-4 bg-primary' : 'w-1 bg-outline-variant/30'}`} />
                                        ))}
                                    </div>
                                    <span className="text-[10px] sm:text-[11px] font-black text-text-sub tabular-nums opacity-60">
                                        {currentIndex + 1}/{alerts.length}
                                    </span>
                                </div>
                            )}

                            <button className={`flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-sm ${current.id.startsWith('ai_') ? 'bg-primary text-white' : 'bg-surface-bright text-text-main border border-outline-variant/50'}`}>
                                Protocol
                                <ArrowRight size={13} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Manual Shifters (shown on hover) */}
            {alerts.length > 1 && (
                <div className="absolute top-1/2 -translate-y-1/2 -left-3 -right-3 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <NavBtn icon={ChevronLeft} onClick={() => setCurrentIndex(p => (p - 1 + alerts.length) % alerts.length)} />
                    <NavBtn icon={ChevronRight} onClick={() => setCurrentIndex(p => (p + 1) % alerts.length)} />
                </div>
            )}
        </div>
    );
};

const NavBtn = ({ icon: Icon, onClick }) => (
    <button 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className="w-8 h-8 rounded-full bg-surface-bright border border-outline-variant shadow-md flex items-center justify-center text-text-sub hover:text-primary transition-all pointer-events-auto active:scale-90"
    >
        <Icon size={14} />
    </button>
);

export default DynamicIntelligenceBanner;
