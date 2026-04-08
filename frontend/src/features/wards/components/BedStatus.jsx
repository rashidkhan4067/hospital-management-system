import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { LayoutGrid, RefreshCw, Activity, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/primitives';
import { useBedStatus } from '../hooks/useBedStatus';

/**
 * 🛏️ BedStatus (Dynamic Capacity Monitor)
 * Visualizes systemic bed availability and occupancy rates using high-fidelity donuts.
 * Orchestrates real-time spatial telemetry from the ward registry.
 */
const BedStatus = memo(() => {
    const navigate = useNavigate();
    const { 
        chartData, 
        totalBeds, 
        availableCount, 
        occupiedCount, 
        occupancyRate, 
        isLoading, 
        error 
    } = useBedStatus();

    /**
     * 🦴 SKELETON MONITOR
     * Layout-accurate pulsing donut and metrics.
     */
    if (isLoading) {
        return (
            <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl p-7 space-y-6 h-full min-h-[300px]">
                <div className="flex justify-between items-center">
                    <div className="h-6 w-32 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                    <div className="h-4 w-16 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                </div>
                <div className="flex-1 flex items-center justify-center py-6">
                    <div className="w-40 h-40 rounded-full border-[10px] border-slate-100 dark:border-white/5 animate-pulse flex items-center justify-center">
                        <div className="h-4 w-12 bg-slate-200 dark:bg-white/5 rounded-full" />
                    </div>
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="rounded-[2.5rem] bg-rose-500/5 border border-rose-500/20 p-7 text-center space-y-4 h-full">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto">
                    <RefreshCw size={24} className="animate-spin" />
                </div>
                <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest italic">Spatial Logic Lost</h3>
                <p className="text-[8px] text-rose-400/60 font-bold uppercase tracking-widest px-4">Failed to synchronize clinical bed telemetry.</p>
            </Card>
        );
    }

    return (
        <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl flex flex-col group/bed overflow-hidden h-full">
            
            {/* 👽 Mission HUD: Capacity Header */}
            <div className="px-7 pt-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500">
                        <LayoutGrid size={20} />
                    </div>
                    <div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-800 dark:text-white leading-none">Bed Capacity</h4>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            Live Ward Status
                        </p>
                    </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[9px] font-black text-sky-500 uppercase tracking-widest border border-slate-200 dark:border-white/10">
                    OCCUPANCY: {occupancyRate}
                </div>
            </div>

            {/* 🥯 DONUT VISUALIZATION ENGINE */}
            <div 
                className="flex-1 relative min-h-[160px] cursor-pointer"
                onClick={() => navigate('/admin/wards')}
            >
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">TOTAL</span>
                    <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
                        {totalBeds}
                    </span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            innerRadius={55}
                            outerRadius={75}
                            paddingAngle={8}
                            dataKey="value"
                            startAngle={90}
                            endAngle={450}
                            animationDuration={1500}
                        >
                            {chartData.map((entry, index) => (
                                <Cell 
                                    key={index} 
                                    fill={entry.color} 
                                    stroke="none"
                                    className="transition-all duration-300 opacity-80 group-hover/bed:opacity-100"
                                />
                            ))}
                        </Pie>
                        <Tooltip 
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-slate-900 border border-white/10 px-3 py-2 rounded-xl shadow-2xl backdrop-blur-md">
                                            <p className="text-[10px] font-black text-white italic">{payload[0].name.toUpperCase()}</p>
                                            <p className="text-[14px] font-black" style={{ color: payload[0].payload.color }}>{payload[0].value} BEDS</p>
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                                {Math.round((payload[0].value / totalBeds) * 100)}% SHARE
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* 📊 KPI SHARD FOOTER */}
            <div className="px-7 pb-7 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group/row cursor-pointer" onClick={() => navigate('/admin/wards?status=available')}>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic group-hover/row:text-slate-600 transition-colors">Available</span>
                    </div>
                    <span className="text-xl font-black text-slate-800 dark:text-white tabular-nums group-hover/row:scale-110 transition-transform origin-right">{availableCount}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 group/row cursor-pointer" onClick={() => navigate('/admin/wards?status=occupied')}>
                    <div className="flex items-center gap-3">
                        <ShieldAlert size={16} className="text-amber-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic group-hover/row:text-slate-600 transition-colors">Occupied</span>
                    </div>
                    <span className="text-xl font-black text-slate-800 dark:text-white tabular-nums group-hover/row:scale-110 transition-transform origin-right">{occupiedCount}</span>
                </div>
            </div>
        </Card>
    );
});

BedStatus.displayName = 'BedStatus';

export default BedStatus;
