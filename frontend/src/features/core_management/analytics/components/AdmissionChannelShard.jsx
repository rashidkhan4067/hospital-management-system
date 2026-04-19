import React from 'react';
import { ShimmerCard } from './AnalyticsSkeleton';
import { motion } from 'framer-motion';
import { 
    Users, TrendingUp, ArrowUpRight, 
    Activity, History, Zap, MonitorPlay
} from 'lucide-react';

/**
 * 🏥 AdmissionChannelShard (Clinical Entry Telemetry)
 * Replaces the abstract workforce balancer with concrete admission sources.
 */
const AdmissionChannelShard = ({ data, isLoading }) => {
    if (isLoading) return <ShimmerCard height="380px" />;
    // Mock simulation if data is missing
    const channels = data || [
        { name: 'Emergency Room', count: 142, trend: '+12%', color: '#D93025' },
        { name: 'OPD Referrals', count: 85, trend: '+5%', color: '#1558D6' },
        { name: 'Direct Admission', count: 42, trend: '-2%', color: '#1AA361' }
    ];

    return (
        <div className="widget" style={{ 
            height: '380px', 
            background: 'linear-gradient(135deg, #ffffff 0%, #fcfdff 100%)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
            <div className="widget-header" style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <div className="flex-1">
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-primary)' }} />
                        Operational Entry
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, letterSpacing: '-0.02em', fontWeight: 700 }}>Admission Channel Flux</div>
                </div>
                <div className="p-2 rounded-xl bg-primary/5 text-primary">
                    <MonitorPlay size={16} />
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-4">
                {channels.map((chan, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-2xl bg-white border border-outline-variant/30 hover:border-primary/20 transition-all group"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${chan.color}10`, color: chan.color }}>
                                    {chan.name.includes('Emergency') ? <Zap size={18} /> : (chan.name.includes('OPD') ? <Activity size={18} /> : <Users size={18} />)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] font-bold text-text-main uppercase tracking-tight">{chan.name}</span>
                                    <span className={`text-[9px] font-bold uppercase tracking-widest ${chan.trend.startsWith('+') ? 'text-success' : 'text-error'}`}>
                                        {chan.trend} Intensity
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[18px] font-bold text-text-main tabular-nums tracking-tighter">{chan.count}</div>
                                <div className="text-[8px] font-bold text-text-sub opacity-30 uppercase">Cases Intake</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-3 px-6 border-t border-outline-variant/30 flex justify-between items-center bg-surface-variant/10">
                <div className="flex items-center gap-1.5 grayscale opacity-40">
                    <History size={10} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Live 24h Window</span>
                </div>
                <ArrowUpRight size={12} className="text-text-sub opacity-20" />
            </div>
        </div>
    );
};

export default AdmissionChannelShard;
