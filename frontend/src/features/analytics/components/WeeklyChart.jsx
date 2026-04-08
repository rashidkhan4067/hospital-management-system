import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, RefreshCw, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/primitives';
import { useWeeklyAnalytics } from '../hooks/useWeeklyAnalytics';

/**
 * 📊 WeeklyChart (Analytics Telemetry Module)
 * Visualizes patient visit volume across the week using Recharts.
 * Integrates high-fidelity KPIs with dynamic bar-chart interactions.
 */
const WeeklyChart = memo(() => {
    const navigate = useNavigate();
    const { chartData, totalVisits, busiestDay, isLoading, error } = useWeeklyAnalytics();

    /**
     * 🦴 SKELETON ANALYTICS
     * Layout-accurate pulsing bars for zero-jitter acquisition.
     */
    if (isLoading) {
        return (
            <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl flex flex-col p-8 space-y-8 h-full">
                <div className="flex justify-between items-center">
                    <div className="h-6 w-40 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                    <div className="h-4 w-24 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                </div>
                <div className="flex-1 flex items-end gap-3 px-2 min-h-[200px]">
                    {[1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div key={i} className="flex-1 bg-slate-200 dark:bg-white/5 rounded-t-xl animate-pulse" style={{ height: `${20 + Math.random() * 60}%` }} />
                    ))}
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="rounded-[2.5rem] bg-rose-500/5 border border-rose-500/20 p-8 text-center space-y-4 h-full">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto">
                    <RefreshCw size={24} className="animate-spin" />
                </div>
                <h3 className="text-sm font-black text-rose-500 uppercase tracking-widest italic">Signal Lost</h3>
                <p className="text-[10px] text-rose-400/60 font-bold uppercase tracking-widest leading-relaxed px-4">Failed to synchronize clinical telemetry with the analytics engine.</p>
            </Card>
        );
    }

    return (
        <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl flex flex-col group/analytics overflow-hidden h-full">
            
            {/* 🛸 HUD: Analytics Header */}
            <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <h3 className="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-white leading-none">Weekly Visits</h3>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Operational Pulse Trace</p>
                    </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[8px] font-black text-slate-500 uppercase tracking-widest border border-slate-200 dark:border-white/10">
                    Live
                </div>
            </div>

            {/* 📈 DYNAMIC TELEMETRY AREA */}
            <div 
                className="flex-1 px-8 py-4 min-h-[220px] cursor-pointer"
                onClick={() => navigate('/analytics/visits?range=weekly')}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                        <XAxis 
                            dataKey="name" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }}
                            dy={10}
                        />
                        <Tooltip 
                            cursor={{ fill: 'rgba(245, 158, 11, 0.05)' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-slate-900 border border-white/10 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md">
                                            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">{payload[0].payload.date}</p>
                                            <p className="text-[11px] font-black text-white italic">{payload[0].value} PATIENTS</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar 
                            dataKey="visits" 
                            radius={[8, 8, 0, 0]}
                            isAnimationActive={true}
                            animationDuration={1500}
                        >
                            {chartData.map((entry, index) => (
                                <Cell 
                                    key={index}
                                    fill={entry.visits === Math.max(...chartData.map(d => d.visits)) ? '#f59e0b' : '#fcd34d'}
                                    fillOpacity={0.8}
                                    className="transition-all duration-300 hover:fill-opacity-100"
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 📊 KPI INTELLIGENCE FOOTER */}
            <div className="px-8 pb-8 flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-6 bg-slate-50/10 dark:bg-white/2">
                <div 
                    className="flex flex-col cursor-pointer group/kpi"
                    onClick={() => navigate('/analytics/visits?range=weekly')}
                >
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 group-hover/kpi:text-amber-500 transition-colors">Total Visits</span>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white italic leading-none flex items-baseline gap-2 group-hover/kpi:scale-105 transition-transform origin-left">
                        {totalVisits.toLocaleString()}
                        <span className="text-[10px] font-black text-emerald-500 not-italic">+12%</span>
                    </h4>
                </div>
                
                <div className="w-px h-10 bg-slate-100 dark:bg-white/5" />

                <div className="flex flex-col text-right group/kpi">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 group-hover/kpi:text-rose-500 transition-colors text-right">Busiest Day</span>
                    <h4 className="text-xl font-black text-amber-500 italic leading-none group-hover/kpi:scale-105 transition-transform origin-right">
                        {busiestDay}
                    </h4>
                </div>
            </div>
        </Card>
    );
});

WeeklyChart.displayName = 'WeeklyChart';

export default WeeklyChart;
