import React from 'react';
import { ShimmerCard } from './AnalyticsSkeleton';
import { motion } from 'framer-motion';
import { 
    Clock, Timer, ArrowRight,
    FlaskConical, Syringe, Pill
} from 'lucide-react';

/**
 * ⚡ ClinicalQueueVelocity (Operational Throughput)
 * Replaces re-admission rates with real-time wait time telemetry.
 */
const ClinicalQueueVelocity = ({ data, isLoading }) => {
    if (isLoading) return <ShimmerCard height="380px" />;
    const queues = data || [
        { name: 'Diagnostic Lab', wait: '22', target: '30', icon: <FlaskConical size={18} />, color: '#1558D6' },
        { name: 'ER Triage', wait: '12', target: '15', icon: <Syringe size={18} />, color: '#D93025' },
        { name: 'Main Pharmacy', wait: '45', target: '20', icon: <Pill size={18} />, color: '#7A4F00' }
    ];

    return (
        <div className="widget" style={{ 
            height: '380px', 
            background: 'linear-gradient(135deg, #ffffff 0%, #fcfdff 100%)',
            display: 'flex', flexDirection: 'column'
        }}>
            <div className="widget-header" style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <div className="flex-1">
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-error)' }} />
                        Service Velocity
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, letterSpacing: '-0.02em', fontWeight: 700 }}>Clinical Throughput</div>
                </div>
                <Timer size={18} className="text-text-sub opacity-20" />
            </div>

            <div className="flex-1 p-6 flex flex-col gap-6">
                {queues.map((q, i) => {
                    const isDelayed = parseInt(q.wait) > parseInt(q.target);
                    const progress = Math.min((parseInt(q.wait) / parseInt(q.target)) * 100, 100);

                    return (
                        <div key={i} className="flex flex-col gap-3">
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${q.color}08`, color: q.color }}>
                                        {q.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-bold text-text-main uppercase tracking-tight">{q.name}</span>
                                        <span className="text-[9px] font-bold text-text-sub opacity-30 uppercase tracking-widest">Active Queue Hub</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-[16px] font-bold tabular-nums tracking-tighter ${isDelayed ? 'text-error' : 'text-success'}`}>
                                        {q.wait}<span className="text-[10px] opacity-20 ml-0.5">MIN</span>
                                    </div>
                                    <div className="text-[8px] font-bold text-text-sub opacity-30 uppercase">Goal: {q.target}m</div>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-surface-variant/30 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, ease: "easeOut", delay: i * 0.2 }}
                                    className={`h-full rounded-full ${isDelayed ? 'bg-error' : 'bg-primary'}`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 px-6 border-t border-outline-variant/30 flex items-center justify-center gap-2 text-[9px] font-bold text-primary uppercase tracking-[0.2em] hover:bg-primary/5 cursor-pointer transition-all">
                Registry Protocol Sync <ArrowRight size={12} />
            </div>
        </div>
    );
};

export default ClinicalQueueVelocity;
