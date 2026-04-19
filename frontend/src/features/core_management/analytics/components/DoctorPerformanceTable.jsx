import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, TrendingUp, ChevronRight, Activity } from 'lucide-react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { TableSkeleton } from './AnalyticsSkeleton';

/**
 * 🩺 DoctorPerformanceCard (Personnel Intelligence Shard)
 * Re-engineered from a rigid table to a modern, compact list-based investigative surface.
 * Aligns with the Dashboard's "Appointment Widget" design language.
 */
const DoctorPerformanceTable = ({ data, isLoading }) => {
    const rawData = data || [];

    const AVATAR_GRADS = [
        'linear-gradient(135deg, #1558D6 0%, #4285F4 100%)',
        'linear-gradient(135deg, #1AA361 0%, #34A853 100%)',
        'linear-gradient(135deg, #D93025 0%, #EA4335 100%)',
        'linear-gradient(135deg, #7A4F00 0%, #FBBC04 100%)',
        'linear-gradient(135deg, #6200EE 0%, #BB86FC 100%)',
    ];

    const sortedData = useMemo(() => {
        return [...rawData].sort((a, b) => b.caseload - a.caseload).slice(0, 5);
    }, [rawData]);

    if (isLoading) return <TableSkeleton />;

    return (
        <div className="widget" style={{ 
            height: '380px', 
            background: 'linear-gradient(135deg, #ffffff 0%, #fcfdff 100%)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
            <div className="widget-header" style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <div className="flex-1">
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-success)' }} />
                        Personnel Intelligence
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, letterSpacing: '-0.02em', fontWeight: 700 }}>Practitioner High-Flyers</div>
                </div>
                <button className="p-2 rounded-xl bg-success/5 text-success hover:bg-success/10 transition-all">
                    <Activity size={16} />
                </button>
            </div>

            <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto custom-scrollbar px-3 py-2">
                    <AnimatePresence mode="popLayout">
                        {sortedData.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-10">
                                <User size={32} strokeWidth={1.5} />
                                <span className="text-[11px] font-bold mt-2 uppercase tracking-widest">No Active Feedback</span>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {sortedData.map((doc, i) => (
                                    <motion.div
                                        key={`doc-${doc.id}-${i}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group p-3 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-success/5 transition-all cursor-pointer border border-transparent hover:border-outline-variant/20 flex items-center gap-4"
                                    >
                                        {/* Avatar Shard */}
                                        <div 
                                            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-[12px] shadow-sm flex-shrink-0"
                                            style={{ background: AVATAR_GRADS[i % 5] }}
                                        >
                                            {doc.doctor?.charAt(0)}
                                        </div>

                                        {/* Identity Cluster */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
                                                <span className="text-[13px] font-bold text-text-main group-hover:text-primary transition-colors">{doc.doctor}</span>
                                                {doc.rating >= 4.8 && <Star size={10} className="fill-warning text-warning" />}
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[9px] font-bold text-text-sub opacity-30 uppercase tracking-tighter">Clinical Efficiency</span>
                                                <div className="w-1 h-1 rounded-full bg-outline-variant/40" />
                                                <span className="text-[10px] font-bold text-success tabular-nums">{doc.rating} Score</span>
                                            </div>
                                        </div>

                                        {/* Stats Shard */}
                                        <div className="text-right flex-shrink-0 flex items-center gap-4">
                                            <div className="flex flex-col items-end px-2 border-r border-outline-variant/10">
                                                <span className="text-[14px] font-bold text-text-main tabular-nums tracking-tighter">{doc.caseload}</span>
                                                <span className="text-[8px] font-bold text-text-sub opacity-20 uppercase">Units</span>
                                            </div>
                                            <ChevronRight size={14} className="text-text-sub opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="p-3 px-6 border-t border-outline-variant/30 flex justify-between items-center bg-surface-variant/10">
                <div className="flex items-center gap-1.5 opacity-40 grayscale">
                    <TrendingUp size={10} />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-text-sub">Performance Audit Nominal</span>
                </div>
                <button className="text-[9px] font-bold text-primary uppercase tracking-widest hover:underline flex items-center gap-1">
                    All Nodes <ChevronRight size={10} />
                </button>
            </div>
        </div>
    );
};

export default DoctorPerformanceTable;
