import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AnalyticsChart from './AnalyticsChart';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { ChartSkeleton } from './AnalyticsSkeleton';

/**
 * 🥧 DepartmentDistribution (Proper Geometry Edition)
 * Features an 'Inner-Label' pattern to prevent external clipping.
 */
const DepartmentDistribution = () => {
    const { data, isLoading, filters } = useAnalyticsData();

    if (isLoading) return <ChartSkeleton />;

    const chartData = data?.deptDistribution || [];

    const COLORS = [
        '#1A73E8',   // OPD
        '#137333',   // IPD
        '#B3261E'    // ICU
    ];

    return (
        <AnalyticsChart 
            title="Unit Partitioning" 
            subtitle={`Clinical Load Distribution (${filters.dateRange})`}
        >
            <div className="flex-1 w-full h-[360px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%" // Centralized to prevent cutoff
                            innerRadius={75}
                            outerRadius={105}
                            paddingAngle={6}
                            dataKey="value"
                            stroke="none"
                            animationBegin={200}
                            animationDuration={1500}
                            label={false} // Disabled external labels to prevent runaway orphans
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        
                        <Tooltip 
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white border border-[#CAC4D0]/30 shadow-2xl rounded-2xl p-4 flex flex-col gap-1 transition-all">
                                            <span className="text-[10px] font-black text-[#5F6368] uppercase tracking-widest">
                                                {payload[0].name}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: payload[0].payload.fill }} />
                                                <span className="text-sm font-black text-[#1C1B1F]">
                                                    {payload[0].value.toFixed(1)}% Saturation
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        
                        <Legend 
                            verticalAlign="bottom" 
                            align="center"
                            iconType="circle"
                            wrapperStyle={{ 
                                fontSize: '10px', 
                                fontWeight: 800, 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.2em',
                                color: '#5F6368',
                                paddingTop: '30px'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* 🎯 Central Intelligence Node (Replaces orphaned labels) */}
                <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <span className="text-[10px] font-black uppercase text-text-sub opacity-40 block tracking-widest leading-none mb-1">Total</span>
                    <span className="text-3xl font-black text-text-main tracking-tighter leading-none">100%</span>
                </div>
            </div>
        </AnalyticsChart>
    );
};

export default DepartmentDistribution;
