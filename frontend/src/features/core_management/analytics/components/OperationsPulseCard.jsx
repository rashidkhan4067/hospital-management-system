import React from 'react';
import { ShimmerCard } from './AnalyticsSkeleton';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    Timer, Package, Zap, 
    ArrowUpRight, Activity, 
    ShieldCheck, Clock, FlaskConical
} from 'lucide-react';

/**
 * ⚡ OperationsPulseCard (Google Zen / M3 Standard)
 * Optimized for 380px vertical constraints to prevent content clipping.
 * Features a high-density 2x4 tactical grid with compact card geometry.
 */
const OperationsPulseCard = ({ waitTimes, inventory, isLoading }) => {
    const navigate = useNavigate();
    if (isLoading) return <ShimmerCard height="380px" />;

    const pulseNodes = [
        { label: 'ER Velocity', value: `${waitTimes?.[0]?.value || 12}m`,  icon: Timer,        color: 'var(--m3-error)',    status: 'High' },
        { label: 'OPD Pulse',   value: `${waitTimes?.[1]?.value || 45}m`,  icon: Clock,        color: 'var(--m3-primary)',  status: 'Nominal' },
        { label: 'Lab Shard',   value: `${waitTimes?.[2]?.value || 22}m`,  icon: FlaskConical, color: 'var(--m3-primary)',  status: 'Sync' },
        { label: 'Pharmacy',    value: `${waitTimes?.[3]?.value || 8}m`,   icon: Zap,          color: 'var(--m3-success)',  status: 'Optimal' },
        { label: 'Gloves',      value: inventory?.[0]?.stock || 0,         icon: Package,      color: 'var(--m3-primary)',  status: 'Stable' },
        { label: 'Syringes',    value: inventory?.[1]?.stock || 0,         icon: Package,      color: 'var(--m3-primary)',  status: 'Stable' },
        { label: 'Insulin',     value: inventory?.[2]?.stock || 0,         icon: Package,      color: 'var(--m3-warning)',  status: 'Low' },
        { label: 'Monitoring',  value: 'Active',                            icon: ShieldCheck,  color: 'var(--m3-success)',  status: 'Live' }
    ];

    return (
        <div className="widget" style={{ 
            height: '380px', 
            background: 'white',
            display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
            {/* 🛡️ Header (Compact) */}
            <div className="widget-header" style={{ 
                padding: '16px 20px', 
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                flexShrink: 0
            }}>
                <div>
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-primary)' }} />
                        Operational Intensity
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, fontWeight: 700 }}>Operations Pulse Velocity</div>
                </div>
            </div>

            {/* 📊 Tactical Matrix Grid (Scrollable if needed, but optimized to fit) */}
            <div className="flex-1 p-4 bg-[#fafafb]/50 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {pulseNodes.map((node, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                            className="p-3 rounded-xl bg-white border border-outline-variant/30 hover:shadow-md transition-all flex flex-col justify-between group h-[105px]"
                        >
                            <div className="flex justify-between items-start">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-surface-variant/40 text-primary-main" style={{ color: node.color }}>
                                    <node.icon size={14} strokeWidth={2.5} />
                                </div>
                                <span className="text-[8px] font-bold uppercase tracking-widest opacity-40" style={{ color: node.color }}>{node.status}</span>
                            </div>

                            <div className="mt-2">
                                <div className="text-[18px] font-bold text-text-main tabular-nums tracking-tighter leading-tight group-hover:text-primary transition-colors">
                                    {node.value}
                                </div>
                                <div className="text-[9px] font-bold text-text-sub opacity-30 uppercase tracking-tight truncate">
                                    {node.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 📟 Footer (Compact) */}
            <div style={{ 
                padding: '12px 20px', 
                borderTop: '1px solid rgba(0,0,0,0.05)', 
                background: 'white',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                flexShrink: 0
            }}>
                <div className="flex items-center gap-2">
                    <Activity size={10} className="text-text-sub opacity-30" />
                    <span className="text-[9px] font-bold text-text-sub opacity-30 uppercase tracking-widest">Pulse Nominal</span>
                </div>
                <button 
                    onClick={() => navigate('/admin/inventory')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-variant/40 border border-outline-variant/20 text-text-sub text-[9px] font-bold uppercase tracking-widest hover:text-primary transition-all"
                >
                    Management Hub <ArrowUpRight size={12} />
                </button>
            </div>
        </div>
    );
};

export default OperationsPulseCard;
