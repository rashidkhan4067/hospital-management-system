import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAnalytics } from '../context/AnalyticsContext';
import AnalyticsChart from './AnalyticsChart';

export default function BookingConversion({ loading }) {
  const { filters } = useAnalytics();
  
  const stats = React.useMemo(() => {
    const isFiltered = filters.department !== 'All Departments';
    return {
      booked: isFiltered ? 450 : 1284,
      completed: isFiltered ? 398 : 1135,
      rate: 88.4
    };
  }, [filters.department]);

  const data = [
    { name: 'Completed', value: stats.completed },
    { name: 'Pending/Cancelled', value: stats.booked - stats.completed },
  ];

  return (
    <AnalyticsChart 
      title="Booking Conversion Rate" 
      subtitle="Administrative Finality" 
      loading={loading}
    >
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="w-full h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={450}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
                animationDuration={1500}
              >
                <Cell fill="#1A73E8" />
                <Cell fill="#f1f3f4" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* 📟 Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-4">
          <span className="text-3xl font-black text-slate-900 tracking-tighter">{stats.rate}%</span>
          <span className="text-[9px] uppercase font-black tracking-widest text-[#1A73E8] opacity-60">Success</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Booked</span>
          <span className="text-base font-bold text-slate-900">{stats.booked.toLocaleString()}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Completed</span>
          <span className="text-base font-bold text-[#1A73E8]">{stats.completed.toLocaleString()}</span>
        </div>
      </div>
    </AnalyticsChart>
  );
}
