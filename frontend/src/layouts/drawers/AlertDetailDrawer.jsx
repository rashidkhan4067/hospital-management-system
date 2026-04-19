import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Clock, MapPin, CheckCircle2, UserPlus, ExternalLink, MessageCircle } from 'lucide-react';
import { useUIStore } from '@/core/store/useUIStore';

import { apiClient } from '@/core/api';

/**
 * 🛰️ AlertDetailDrawer (MD3 Implementation)
 * Provides a high-urgency detail investigation surface for priority system events.
 * Features: Right-side slide animation, backdrop blur, and contextual action hub.
 */
const AlertDetailDrawer = () => {
    const { 
        isAlertDrawerOpen, 
        activeAlert, 
        closeAlertDrawer,
        addNotification 
    } = useUIStore();

    const [isProcessing, setIsProcessing] = React.useState(false);

    if (!activeAlert && !isAlertDrawerOpen) return null;

    const handleAction = async (label, actionType) => {
        setIsProcessing(true);
        try {
            const res = await apiClient.post('dashboard/activity/action/', {
                action: actionType,
                alert_id: activeAlert.id
            });
            addNotification('Protocol Executed', res.data.detail, 'success');
            if (actionType === 'acknowledge') {
                closeAlertDrawer();
            }
        } catch (e) {
            addNotification('Protocol Failed', 'Unable to reach clinical registry.', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    const severityColor = activeAlert?.severity === 'Critical' ? 'var(--m3-error)' : 
                         activeAlert?.severity === 'Warning' ? 'var(--m3-warning)' : 'var(--m3-primary)';
    
    const severityBg = activeAlert?.severity === 'Critical' ? 'var(--m3-error-container)' : 
                       activeAlert?.severity === 'Warning' ? 'var(--m3-warning-container)' : 'var(--m3-primary-container)';

    return (
        <AnimatePresence>
            {isAlertDrawerOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeAlertDrawer}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[2000]"
                        aria-hidden="true"
                    />

                    {/* Drawer Surface */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="alert-drawer-title"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-[400px] max-w-full bg-surface-bright shadow-2xl z-[2001] flex flex-col border-l border-outline-variant"
                    >
                        {/* ⚡ Header */}
                        <div className="p-6 border-b border-outline-variant relative overflow-hidden">
                            {/* Ambient background glow */}
                            <div 
                                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px]" 
                                style={{ background: severityColor, opacity: 0.1 }}
                            />

                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                                        style={{ background: severityBg, color: severityColor }}
                                    >
                                        <ShieldAlert size={20} strokeWidth={2.5} className={activeAlert?.severity === 'Critical' ? 'animate-pulse' : ''} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span 
                                            id="alert-drawer-title"
                                            className="text-[10px] font-black uppercase tracking-[0.2em]"
                                            style={{ color: severityColor }}
                                        >
                                            {activeAlert?.severity || 'Priority'} Alert
                                        </span>
                                        <h2 className="text-xl font-black text-text-main leading-tight -mt-0.5">
                                            Event Details
                                        </h2>
                                    </div>
                                </div>

                                <button 
                                    onClick={closeAlertDrawer}
                                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-variant/50 transition-colors text-text-sub"
                                    aria-label="Close drawer"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* 📝 Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                            {/* Alert Message Block */}
                            <section className="space-y-4">
                                <div className="p-4 rounded-2xl bg-surface-variant/30 border border-outline-variant/50">
                                    <p className="text-base font-bold text-text-main leading-relaxed">
                                        {activeAlert?.message || 'No alert message provided.'}
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <DetailChip icon={MapPin} label="Affected Dept" value={activeAlert?.dept || 'Blood Bank'} color={severityColor} />
                                    <DetailChip icon={Clock} label="Timestamp" value={activeAlert?.time || 'Just Now'} color={severityColor} />
                                </div>
                            </section>

                            <div className="w-full h-px bg-outline-variant/40" />

                            {/* Alert Source & Meta */}
                            <section className="space-y-4">
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-text-sub opacity-60">Metadata Analysis</h3>
                                <div className="space-y-4">
                                    <InfoRow label="Protocol Level" value={activeAlert?.severity === 'Critical' ? 'Level 1 (Immediate Action)' : 'Level 2 (Active Monitor)'} />
                                    <InfoRow label="Source Module" value={activeAlert?.source || 'Registry Core'} />
                                    <InfoRow label="Affected Area" value={activeAlert?.ward || 'Central Storage A-4'} />
                                </div>
                            </section>

                            {/* 🎯 Quick Actions Matrix */}
                            <section className="pt-4 space-y-3">
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-text-sub opacity-60 mb-2">Emergency Hub</h3>
                                
                                <ActionButton 
                                    icon={MessageCircle} 
                                    label="Respond" 
                                    primary 
                                    disabled={isProcessing}
                                    onClick={() => handleAction('Respond', 'respond')} 
                                    color={severityColor}
                                    bg={severityBg}
                                />
                                <ActionButton 
                                    icon={CheckCircle2} 
                                    label="Acknowledge Alert" 
                                    disabled={isProcessing}
                                    onClick={() => handleAction('Acknowledge', 'acknowledge')} 
                                />
                                <ActionButton 
                                    icon={UserPlus} 
                                    label="Assign Staff" 
                                    disabled={isProcessing}
                                    onClick={() => handleAction('Assign Staff', 'assign')} 
                                />
                                <ActionButton 
                                    icon={ExternalLink} 
                                    label="View Related Module" 
                                    disabled={isProcessing}
                                    onClick={() => handleAction('Open Module', 'view_module')} 
                                />
                            </section>
                        </div>

                        {/* 🦶 Footer */}
                        <div className="p-6 bg-surface-variant/20 border-t border-outline-variant">
                            <button 
                                onClick={closeAlertDrawer}
                                className="w-full py-4 text-[11px] font-black uppercase tracking-[0.1em] text-text-sub hover:text-text-main transition-colors"
                            >
                                Dismiss Review
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const DetailChip = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-bright border border-outline-variant/60 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.05)]">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-variant/50" style={{ color }}>
            <Icon size={14} />
        </div>
        <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-text-sub opacity-60 leading-none mb-1">{label}</span>
            <span className="text-[12px] font-black text-text-main truncate leading-none">{value}</span>
        </div>
    </div>
);

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-1">
        <span className="text-xs font-semibold text-text-sub">{label}</span>
        <span className="text-xs font-black text-text-main">{value}</span>
    </div>
);

const ActionButton = ({ icon: Icon, label, primary, onClick, color, bg, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`
            w-full flex items-center gap-4 p-4 rounded-2xl transition-all border
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'}
            ${primary 
                ? 'shadow-md ring-1 ring-white/20' 
                : 'bg-surface-bright hover:bg-surface-variant/40 border-outline-variant/50 text-text-main'
            }
        `}
        style={primary && !disabled ? { background: bg, color: color, borderColor: 'transparent' } : {}}
    >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${primary ? 'bg-white/20' : 'bg-surface-variant/50 text-text-sub'}`}>
            <Icon size={18} />
        </div>
        <span className="text-sm font-black tracking-tight">{label}</span>
    </button>
);

export default AlertDetailDrawer;
