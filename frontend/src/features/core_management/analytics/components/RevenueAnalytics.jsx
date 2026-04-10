import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Rectangle } from 'recharts';
import AnalyticsChart from './AnalyticsChart';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { ChartSkeleton } from './AnalyticsSkeleton';

/**
 * 📊 RevenueAnalytics (Proper Geometry Edition)
 */
const RevenueAnalytics = () => {
    const { data, isLoading, filters } = useAnalyticsData();

    if (isLoading) return <ChartSkeleton />;

    const chartData = data?.revenueData || [];

    const CustomBar = (props) => {
        return <Rectangle {...props} radius={[12, 12, 0, 0]} fillOpacity={0.95} />;
    };

    return (
        <AnalyticsChart
            title="Operational Economics"
            subtitle={`Revenue Flux Partition (${filters.dateRange})`}
        >
            <div className="flex-1 w-full h-[360px] pt-8">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#137333" stopOpacity={1} />
                                <stop offset="95%" stopColor="#137333" stopOpacity={0.7} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#CAC4D0" opacity={0.2} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fontWeight: 800, fill: '#5F6368' }}
                            dy={15}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fontWeight: 800, fill: '#5F6368' }}
                            tickFormatter={(val) => `PKR ${(val / 1000).toFixed(0)}k`}
                            dx={-15}
                        />
                        <Tooltip
                            cursor={{ fill: '#E8F0FE', fillOpacity: 0.5 }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white border border-[#CAC4D0]/30 shadow-2xl rounded-2xl p-4 flex flex-col gap-1 transition-all">
                                            <span className="text-[10px] font-black text-[#5F6368] uppercase tracking-widest leading-none mb-1">{payload[0].payload.name}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                                                <span className="text-base font-black text-[#1C1B1F] tracking-tighter">
                                                    PKR {payload[0].value.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="revenue"
                            shape={<CustomBar />}
                            barSize={32}
                            animationDuration={1500}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="url(#barGradient)" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </AnalyticsChart>
    );
};

export default RevenueAnalytics;
