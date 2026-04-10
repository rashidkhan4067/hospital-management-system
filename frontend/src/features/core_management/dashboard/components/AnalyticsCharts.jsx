import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardData } from '../hooks/useDashboardData';
import { useDataStore } from '@/core/store/useDataStore';
import { ArrowRight } from 'lucide-react';

/**
 * 📈 AnalyticsCharts (Google UX Engineered)
 * Features "Interactive Navigation" – every clinical node acts as a gateway to deep analytics.
 */
const AnalyticsCharts = memo(() => {
    const navigate = useNavigate();
    const filters = useDataStore(state => state.filters);
    const { telemetry, isLoading } = useDashboardData();

    // Mapping telemetry to local chart data
    const patientData = [
        { name: '01 May', value: 200 },
        { name: '05 May', value: 240 },
        { name: '10 May', value: 220 },
        { name: '15 May', value: 310 },
        { name: '20 May', value: 280 },
        { name: '25 May', value: 380 },
        { name: '30 May', value: 420 },
    ];

    const revenueData = [
        { name: 'W1', value: 1200000 },
        { name: 'W2', value: 900000 },
        { name: 'W3', value: 1540000 },
        { name: 'W4', value: 1100000 },
    ];

    const departmentData = [
        { name: 'OPD', value: 45, color: '#1A73E8' },
        { name: 'IPD', value: 35, color: '#137333' },
        { name: 'ICU', value: 20, color: '#B00020' },
    ];

    const handleNavigate = (type) => {
        const queryParams = new URLSearchParams({
            range: filters.dateRange,
            unit: filters.department || 'All',
            type: type
        });
        navigate(`/admin/analytics?${queryParams.toString()}`);
    };

    return (
        <div className="relative">
            <AnimatePresence>
                {isLoading && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 bg-white/10 backdrop-blur-[2px] rounded-[32px] flex items-center justify-center font-black text-primary text-xs uppercase tracking-widest"
                    >
                        Syncing Intelligence...
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-8">
                
                {/* 📉 Traffic Center (Drills down to Growth Hub) */}
                <ChartContainer 
                    title="Patient Traffic" 
                    subtitle={`Clinical Volume (${filters.dateRange})`} 
                    iconColor="bg-primary/5 text-primary"
                    onClick={() => handleNavigate('growth')}
                >
                    <ResponsiveContainer width="100%" height={320}>
                        <AreaChart data={patientData}>
                            <defs>
                                <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1A73E8" stopOpacity={0.15}/>
                                    <stop offset="95%" stopColor="#1A73E8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#CAC4D0" opacity={0.2} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#5F6368', fontWeight: 600 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#5F6368', fontWeight: 600 }} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -1px rgb(0 0 0 / 0.1)' }} />
                            <Area type="monotone" dataKey="value" stroke="#1A73E8" strokeWidth={4} fillOpacity={1} fill="url(#colorThroughput)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* 💰 Revenue Center (Drills down to Finance Hub) */}
                    <ChartContainer 
                        title="Financial Performance" 
                        subtitle={`Revenue Ledger`} 
                        iconColor="bg-emerald-50 text-emerald-600"
                        onClick={() => handleNavigate('finance')}
                    >
                        <ResponsiveContainer width="100%" height={240}>
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#CAC4D0" opacity={0.2} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#5F6368', fontWeight: 600 }} />
                                <YAxis hide />
                                <Tooltip cursor={{ fill: '#F1F3F4' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="value" fill="#137333" radius={[8, 8, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>

                    {/* 🏢 Departmental Node (Drills down to Distribution Hub) */}
                    <ChartContainer 
                        title="Unit Distribution" 
                        subtitle="Operational Split" 
                        iconColor="bg-rose-50 text-rose-600"
                        onClick={() => handleNavigate('distribution')}
                    >
                        <div className="flex flex-col items-center">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={departmentData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={56}
                                        outerRadius={80}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {departmentData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -1px rgb(0 0 0 / 0.1)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex flex-wrap justify-center gap-4 mt-6">
                                {departmentData.map((dept, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dept.color }} />
                                        <span className="text-[9px] font-black text-[#5F6368] uppercase tracking-wider">{dept.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ChartContainer>

                </div>
            </div>
        </div>
    );
});

const ChartContainer = ({ title, subtitle, iconColor, children, onClick }) => (
    <motion.div 
        whileHover={{ y: -4, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
        className="bg-white border border-[#CAC4D0]/30 rounded-[32px] p-8 shadow-sm flex flex-col cursor-pointer group relative overflow-hidden"
        onClick={onClick}
    >
        <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-[#5F6368] tracking-[0.2em] opacity-40">{subtitle}</span>
                <h3 className="text-xl font-black text-[#1C1B1F] tracking-tight">{title}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl ${iconColor} flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all`}>
                <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-2 h-2 rounded-full bg-current group-hover:hidden" />
            </div>
        </div>
        <div className="w-full relative z-10">
            {children}
        </div>
        
        {/* Subtle Hover Reveal */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
);

AnalyticsCharts.displayName = 'AnalyticsCharts';
export default AnalyticsCharts;
