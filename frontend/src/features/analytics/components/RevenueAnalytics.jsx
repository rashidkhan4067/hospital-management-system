import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import AnalyticsChart from './AnalyticsChart';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { ChartSkeleton } from './AnalyticsSkeleton';

export default function RevenueAnalytics() {
  const { data, isLoading } = useAnalyticsData();

  if (isLoading) return <ChartSkeleton />;

  const chartData = data?.revenueData || [];

  if (chartData.length === 0) {
    return (
      <AnalyticsChart title="Operational Economics" subtitle="Revenue Flux Partition">
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2">
            <span className="text-sm font-medium">No revenue data for this selection</span>
        </div>
      </AnalyticsChart>
    );
  }

  return (
    <AnalyticsChart 
      title="Operational Economics" 
      subtitle="Revenue Flux Partition"
    >
      <div className="flex-1 w-full h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f4" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
              tickFormatter={(val) => `PKR ${val >= 1000000 ? (val / 1000000).toFixed(1) + 'M' : (val / 1000).toFixed(0) + 'K'}`}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-4 flex flex-col gap-1 min-w-[140px]">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{payload[0].payload.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#1A73E8]" />
                        <span className="text-sm font-black text-slate-900">
                          PKR {payload[0].value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} barSize={32}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#1A73E8" fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsChart>
  );
}
