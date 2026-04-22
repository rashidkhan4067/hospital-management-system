import React from 'react';
import { motion } from 'framer-motion';
import { ShimmerCard } from './AnalyticsSkeleton';

/**
 * 🔥 ResourceUtilizationHeatmap (Institutional Density Matrix)
 * Visualizes bed occupancy across wards and shifts using a color-density grid.
 */
const ResourceUtilizationHeatmap = ({ data, isLoading }) => {
    if (isLoading) return <ShimmerCard height="380px" />;

    const shifts = ['Morning', 'Afternoon', 'Evening', 'Night'];
    const heatmapData = data || [];

    const getColor = (value) => {
        if (value >= 100) return 'bg-error text-white shadow-[inset_0_0_12px_rgba(255,255,255,0.2)]';
        if (value >= 90)  return 'bg-amber-600 text-white';
        if (value >= 75)  return 'bg-amber-400 text-slate-800';
        if (value >= 50)  return 'bg-emerald-400 text-slate-800';
        return 'bg-emerald-100 text-emerald-800';
    };

    return (
        <div className="widget" style={{ 
            height: '380px',
            background: 'linear-gradient(135deg, #ffffff 0%, #fcfdff 100%)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
        }}>
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
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-success)' }} />
                        Infrastructure Density
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, letterSpacing: '-0.02em', fontWeight: 700 }}>Bed Utilization Heatmap</div>
                </div>
                <div className="px-2 py-1 bg-slate-900 text-white rounded text-[8px] font-black uppercase tracking-tighter shadow-sm">
                    Shift Sync
                </div>
            </div>

            {/* 🌡️ Heatmap Matrix */}
            <div className="flex-1 p-6 z-1 overflow-hidden">
                <div className="h-full flex flex-col">
                    {/* Shift Labels */}
                    <div className="grid grid-cols-12 gap-1 mb-2">
                        <div className="col-span-4" />
                        {shifts.map(s => (
                            <div key={s} className="col-span-2 text-[8px] font-black text-slate-300 uppercase tracking-widest text-center">
                                {s}
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                        <div className="space-y-1">
                            {heatmapData.map((row, i) => (
                                <motion.div 
                                    key={row.ward}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="grid grid-cols-12 items-center gap-1 group"
                                >
                                    <div className="col-span-4 py-2 pr-3">
                                        <span className="text-[10px] font-bold text-slate-700 truncate block group-hover:text-primary transition-colors">
                                            {row.ward}
                                        </span>
                                    </div>
                                    <div className={`col-span-2 h-8 rounded-md flex items-center justify-center text-[9px] font-black transition-all ${getColor(row.morning)}`}>
                                        {row.morning}%
                                    </div>
                                    <div className={`col-span-2 h-8 rounded-md flex items-center justify-center text-[9px] font-black transition-all ${getColor(row.afternoon)}`}>
                                        {row.afternoon}%
                                    </div>
                                    <div className={`col-span-2 h-8 rounded-md flex items-center justify-center text-[9px] font-black transition-all ${getColor(row.evening)}`}>
                                        {row.evening}%
                                    </div>
                                    <div className={`col-span-2 h-8 rounded-md flex items-center justify-center text-[9px] font-black transition-all ${getColor(row.night)}`}>
                                        {row.night}%
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 📟 Footer Legend */}
            <div className="px-6 py-3 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded bg-emerald-400" />
                        <span className="text-[8px] font-bold text-slate-400 uppercase">Optimal</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded bg-amber-400" />
                        <span className="text-[8px] font-bold text-slate-400 uppercase">Loaded</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded bg-error shadow-[0_0_5px_rgba(217,48,37,0.3)]" />
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Critical</span>
                    </div>
                </div>
                <span className="text-[8px] font-bold text-slate-200">Matrix BI-HEAT-v1</span>
            </div>
        </div>
    );
};

export default ResourceUtilizationHeatmap;
