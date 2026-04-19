import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    AlertCircle, Zap, ShieldAlert, Activity, 
    X, CheckCircle2, Info 
} from 'lucide-react';

/**
 * 🛰️ InstitutionalAlertStream (Clinical Command Standard)
 * High-fidelity alert feed modeled after the core dashboard's intelligence system.
 */
const InstitutionalAlertStream = ({ data, isLoading }) => {
    const [dismissed, setDismissed] = useState(new Set());

    if (isLoading) {
        return (
            <div className="widget" style={{ height: '380px' }}>
                <div className="widget-header">
                    <div className="sk" style={{ height: 20, width: 140 }} />
                </div>
                <div className="widget-body p-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--m3-outline-variant)' }}>
                            <div className="sk" style={{ width: 34, height: 34, borderRadius: 10 }} />
                            <div style={{ flex: 1 }}>
                                <div className="sk" style={{ height: 10, width: '70%', marginBottom: 5 }} />
                                <div className="sk" style={{ height: 8, width: '40%' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // 🧬 Severity Configurations
    const SEV = {
        critical: { Icon: ShieldAlert, color: 'var(--m3-error)',   bg: 'var(--m3-error-container)'   },
        warning:  { Icon: AlertCircle, color: 'var(--m3-warning)', bg: 'var(--m3-warning-container)' },
        info:     { Icon: Zap,         color: 'var(--m3-primary)', bg: 'var(--m3-primary-container)' },
        success:  { Icon: CheckCircle2, color: 'var(--m3-success)', bg: 'var(--m3-success-container)' },
    };

    // Simulated alerts if no data provided
    const rawAlerts = data || [
        { id: 1, type: 'critical', msg: 'Ward B: Oxygen supply below 15%', source: 'Infrastructure Engine', time: '2m ago' },
        { id: 2, type: 'warning', msg: 'Pharmacy: Stockout risk for Insulin (Vials)', source: 'Logistics AI', time: '14m ago' },
        { id: 3, type: 'info', msg: 'OPD: High volume detected in Station 4', source: 'Flow Analytics', time: '28m ago' },
        { id: 4, type: 'success', msg: 'System: Backup sync completed for Node 04', source: 'Cite-PK Cloud', time: '1h ago' },
    ];

    const alerts = rawAlerts.filter(a => !dismissed.has(a.id));
    const criticalCount = alerts.filter(a => a.type === 'critical').length;

    return (
        <div className="widget" style={{ 
            height: '380px', 
            background: 'linear-gradient(135deg, #ffffff 0%, #fcfdff 100%)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* ✨ Ambient Aura */}
            <div style={{
                position: 'absolute', top: -100, left: -100, width: 300, height: 300,
                background: 'rgba(217, 48, 37, 0.03)',
                borderRadius: '100%', filter: 'blur(60px)', pointerEvents: 'none'
            }} />

            {/* 🛡️ Strategic Header */}
            <div className="widget-header" style={{ 
                padding: '20px 24px', 
                borderBottom: '1px solid rgba(0,0,0,0.04)',
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)',
                zIndex: 10
            }}>
                <div className="flex-1">
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-error)' }} />
                        Operational Intelligence
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, letterSpacing: '-0.02em', fontWeight: 700 }}>Clinical Alert Feed</div>
                </div>
                
                <div className="flex items-center gap-2">
                    {criticalCount > 0 && (
                        <div className="px-3 py-1 bg-error/10 text-error text-[10px] font-bold uppercase tracking-widest rounded-lg border border-error/10 animate-pulse">
                            {criticalCount} Critical
                        </div>
                    )}
                    <div className="px-3 py-1 bg-surface-variant/40 text-text-sub text-[10px] font-bold uppercase tracking-widest rounded-lg border border-outline-variant/30">
                        {alerts.length} Active
                    </div>
                </div>
            </div>

            {/* 📟 Feed Content */}
            <div className="flex-1 overflow-hidden z-1">
                <div className="h-full overflow-y-auto custom-scrollbar p-6">
                    {alerts.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-40 text-center">
                            <CheckCircle2 size={32} className="text-success mb-3" />
                            <p className="text-sm font-bold text-text-main tracking-tighter">All Systems Sync'd</p>
                            <p className="text-[10px] font-bold text-text-sub uppercase tracking-widest mt-1">No active anomalies detected</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <AnimatePresence mode="popLayout">
                                {alerts.map((alert) => {
                                    const S = SEV[alert.type] || SEV.info;
                                    
                                    return (
                                        <motion.div
                                            key={alert.id}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="group flex gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-black/5 hover:translate-x-1 transition-all cursor-default mb-2 border border-transparent hover:border-outline-variant/10"
                                        >
                                            <div 
                                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                                style={{ background: S.bg, color: S.color }}
                                            >
                                                <S.Icon size={16} strokeWidth={2.5} />
                                            </div>

                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <div className="text-[12px] font-bold text-text-main leading-tight group-hover:text-primary transition-colors">
                                                    {alert.msg}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[9px] font-bold uppercase tracking-[0.05em]" style={{ color: S.color }}>
                                                        {alert.type}
                                                    </span>
                                                    <div className="w-1 h-1 rounded-full bg-outline-variant/30" />
                                                    <span className="text-[9px] font-bold text-text-sub opacity-40 uppercase">
                                                        {alert.source} • {alert.time}
                                                    </span>
                                                </div>
                                            </div>

                                            <button 
                                                onClick={() => setDismissed(prev => new Set([...prev, alert.id]))}
                                                className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-error/5 text-text-sub hover:text-error transition-all"
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

            {/* 📟 Flux Footer */}
            <div style={{ 
                padding: '12px 24px', 
                borderTop: '1px solid rgba(0,0,0,0.04)', 
                background: 'rgba(255,255,255,0.6)', 
                backdropFilter: 'blur(5px)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                zIndex: 10
            }}>
                <div className="flex items-center gap-2">
                    <Activity size={10} className="text-success animate-pulse" />
                    <span className="text-[9px] font-bold text-text-sub opacity-40 uppercase tracking-[0.2em]">Real-time Telemetry Active</span>
                </div>
                <span className="text-[8px] font-bold text-text-sub/20 uppercase tracking-tighter">Node MD-ALERT-v2</span>
            </div>
        </div>
    );
};

export default InstitutionalAlertStream;
