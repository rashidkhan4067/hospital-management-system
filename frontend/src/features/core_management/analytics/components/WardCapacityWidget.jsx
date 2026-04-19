import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from 'recharts';

import { ShimmerCard } from './AnalyticsSkeleton';

/**
 * 🏥 WardCapacityWidget (Institutional Pulse Standard)
 * Visualizes bed occupancy and clinical load across wards.
 */
const WardCapacityWidget = ({ data, isLoading }) => {
    if (isLoading) return <ShimmerCard height="380px" />;
    // Simulated data if not provided
    const displayData = data || [
        { name: 'General Ward', occupied: 45, total: 60, status: 'Stable' },
        { name: 'ICU', occupied: 8, total: 10, status: 'Critical' },
        { name: 'Paediatrics', occupied: 12, total: 20, status: 'Stable' },
        { name: 'Maternity', occupied: 15, total: 15, status: 'Full' },
    ];

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
                position: 'absolute', top: -100, right: -100, width: 300, height: 300,
                background: 'rgba(217, 48, 37, 0.02)',
                borderRadius: '100%', filter: 'blur(60px)', pointerEvents: 'none'
            }} />

            {/* 🛡️ Strategic Header */}
            <div className="widget-header" style={{ 
                padding: '20px 24px', 
                borderBottom: '1px solid rgba(0,0,0,0.04)',
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)',
                zIndex: 1
            }}>
                <div className="flex-1">
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-error)' }} />
                        Clinical Infrastructure
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, letterSpacing: '-0.02em', fontWeight: 700 }}>Ward Occupancy</div>
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--m3-error)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    Live Sensors
                </div>
            </div>

            {/* 📊 Matrix Content */}
            <div className="flex-1 overflow-hidden z-1">
                <div className="h-full overflow-y-auto custom-scrollbar p-6">
                    <div className="flex flex-col gap-5">
                        {displayData.map((ward, i) => {
                            const percent = (ward.occupied / ward.total) * 100;
                            const isCritical = percent > 85;
                            return (
                                <div key={i} className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white border border-outline-variant/30 hover:border-error/20 hover:shadow-lg transition-all cursor-default group">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-bold text-text-main uppercase tracking-tight group-hover:text-error transition-colors">{ward.name}</span>
                                            <span className="text-[9px] font-bold text-text-sub opacity-40 uppercase tracking-widest">{ward.status} Shard</span>
                                        </div>
                                        <div className="text-right flex items-baseline gap-1">
                                            <span className={`text-[15px] font-bold tabular-nums tracking-tighter ${isCritical ? 'text-error animate-pulse' : 'text-text-main'}`}>
                                                {ward.occupied}
                                            </span>
                                            <span className="text-[10px] font-bold text-text-sub opacity-20 uppercase">/ {ward.total} Beds</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 bg-surface-variant/30 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percent}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className={`h-full rounded-full ${isCritical ? 'bg-error' : 'bg-primary'}`}
                                            style={{ boxShadow: isCritical ? '0 0 10px rgba(217, 48, 37, 0.4)' : 'none' }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 📟 Intelligence Footer */}
            <div style={{ 
                padding: '12px 24px', 
                borderTop: '1px solid rgba(0,0,0,0.04)', 
                background: 'rgba(255,255,255,0.6)', 
                backdropFilter: 'blur(5px)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                zIndex: 1
            }}>
                <span className="text-[9px] font-bold text-text-sub opacity-40 uppercase tracking-[0.2em]">Institutional Bed Sensor Trace Active</span>
                <span className="text-[8px] font-bold text-text-sub/20 uppercase tracking-tighter">Node WARD-v4.2</span>
            </div>
        </div>
    );
};

export default WardCapacityWidget;
