import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { LayoutGrid, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/features/dashboard/components/DashboardCard';
import EmptyState from '@/features/dashboard/components/EmptyState';
import { useBedStatus } from '../hooks/useBedStatus';
import { useTheme } from '@/core/theme/ThemeContext';

/**
 * 🛏️ BedStatus (Dynamic Capacity Monitor)
 */
const BedStatus = memo(() => {
    // 🛰️ Systemic Status Monitor Initialized
    const [statusFilter, setStatusFilter] = useState('all');
    const navigate = useNavigate();
    const { accentColor } = useTheme();
    const { 
        chartData, 
        wards: rawWards = [],
        stats,
        totalBeds, 
        occupancyRate, 
        isLoading
    } = useBedStatus(statusFilter);

    // 🧠 Priority Intelligence: Pin critical wards (zero free beds) to top
    const wards = React.useMemo(() => {
        return [...rawWards].sort((a, b) => {
            if (a.available === 0 && b.available > 0) return -1;
            if (a.available > 0 && b.available === 0) return 1;
            return 0;
        });
    }, [rawWards]);

    const hasCritical = wards.some(ward => ward.available === 0);

    return (
        <DashboardCard 
            title="Ward Inventory" 
            subtitle="Clinical Capacity Monitor"
            icon={LayoutGrid}
            loading={isLoading && wards.length === 0}
            scrollable
            fadingEdges
            badge="TELEMETRY ACTIVE"
            alert={hasCritical}
            alertLevel="critical"
            actions={
                <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl">
                    {['all', 'available', 'occupied'].map((f) => (
                        <button 
                            key={f}
                            onClick={(e) => { e.stopPropagation(); setStatusFilter(f); }}
                            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${statusFilter === f ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 font-medium'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            }
            footer={
                <button 
                    onClick={() => navigate('/admin/wards')}
                    className="w-full h-11 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110 shadow-xl flex items-center justify-center gap-3"
                >
                    Ward Management <LayoutGrid size={14} strokeWidth={3} />
                </button>
            }
        >
            <div className="flex flex-col h-full bg-white dark:bg-slate-900">
                {(!wards || wards.length === 0) ? (
                    <EmptyState 
                        title="SYSTEM NOMINAL" 
                        subtitle="Clinical capacity within parameters." 
                        icon={Building2} 
                    />
                ) : (  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] font-bold text-[#64748b] dark:text-slate-500 uppercase tracking-[0.3em] mb-1.5 opacity-60">Facility Load</span>
                        <span className="text-4xl font-black text-[#0f172a] dark:text-white tabular-nums tracking-tighter leading-none">
                            {occupancyRate || '0%'}
                        </span>
                    </div>
                )}
                {/* 🥯 DONUT VISUALIZATION ENGINE */}
                <div 
                    className="relative h-[180px] cursor-pointer mb-10 shrink-0"
                    onClick={() => navigate('/admin/wards')}
                >
                    {chartData.length > 0 && (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    innerRadius={70}
                                    outerRadius={85}
                                    paddingAngle={8}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={450}
                                    animationDuration={1500}
                                    stroke="none"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell 
                                            key={index} 
                                            fill={entry.color || '#cbd5e1'} 
                                            className="transition-all duration-300 hover:brightness-110"
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* 🛡️ STICKY HEADER MATRIX */}
                <div className="sticky top-0 z-20 bg-white dark:bg-slate-900 pb-4 mb-4 border-b border-slate-100 dark:border-white/5 flex justify-between px-2">
                    <span className="text-[10px] font-black text-[#64748b] dark:text-slate-500 uppercase tracking-widest">Clinical Ward</span>
                    <span className="text-[10px] font-black text-[#64748b] dark:text-slate-500 uppercase tracking-widest">Status</span>
                </div>

                {/* 📋 WARD REGISTRY LIST */}
                <AnimatePresence mode="popLayout" initial={false}>
                    <div className="space-y-3">
                        {wards.map((ward) => (
                            <motion.div 
                                key={ward.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex items-center justify-between p-4 rounded-[24px] bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer group/row hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                                onClick={() => navigate(`/admin/wards?id=${ward.id}`)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full ${ward.available > 0 ? 'bg-emerald-500/20 ring-2 ring-emerald-500/50' : 'bg-rose-500 shadow-[0_0_12px_#f43f5e] ring-2 ring-rose-500/20 animate-pulse'}`} />
                                    <div>
                                        <p className="text-[12px] font-black text-[#0f172a] dark:text-white uppercase tracking-[0.1em] leading-none mb-1.5">{ward.name}</p>
                                        <p className="text-[9px] font-bold text-[#64748b] dark:text-slate-500 uppercase tracking-widest">Capacity: {ward.occupied}/{ward.beds}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end shrink-0">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${ward.available > 5 ? 'bg-emerald-500/10 text-emerald-500' : ward.available > 0 ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                        {ward.available === 0 ? 'CRITICAL' : `${ward.available} FREE`}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>
        </DashboardCard>
    );
});

BedStatus.displayName = 'BedStatus';
export default BedStatus;
