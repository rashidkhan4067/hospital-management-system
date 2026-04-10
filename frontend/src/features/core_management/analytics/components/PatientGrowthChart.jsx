import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnalyticsChart from './AnalyticsChart';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { ChartSkeleton } from './AnalyticsSkeleton';

/**
 * 📈 PatientGrowthChart (Responsive Hierarchy)
 * Optimizes height for mobile command centers.
 */
const PatientGrowthChart = () => {
    const { data, isLoading, filters } = useAnalyticsData();

    if (isLoading) return <ChartSkeleton />;

    const chartData = data?.patientTrend || [];

    return (
        <AnalyticsChart
            title="Registry Trajectory"
            subtitle={`New Patients Over Time (${filters.dateRange})`}
            // 🏷️ Responsive Height Logic: h-80 on mobile, double on desktop for dual-card alignment
            className="h-80 lg:h-[calc(20rem*2+2rem)]"
        >
            <div className="w-full h-full pt-4">
                <ResponsiveContainer width="100%" height="95%">
                    <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1A73E8" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#1A73E8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#CAC4D0" opacity={0.2} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fontWeight: 700, fill: '#5F6368' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fontWeight: 700, fill: '#5F6368' }}
                            dx={-10}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white border border-[#CAC4D0]/30 shadow-2xl rounded-2xl p-4 flex flex-col gap-1">
                                            <span className="text-[10px] font-black text-text-sub uppercase tracking-widest">{payload[0].payload.name}</span>
                                            <span className="text-lg font-black text-[#1C1B1F]">{payload[0].value.toLocaleString()} Patients</span>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#1A73E8"
                            strokeWidth={4}
                            fill="url(#areaGradient)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </AnalyticsChart>
    );
};

export default PatientGrowthChart;
