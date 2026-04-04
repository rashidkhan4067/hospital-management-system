import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/shared/components/ui';

/**
 * Row 4 Right — WeeklyChart
 * Bar chart Mon–Sun showing appointment count per day using Recharts.
 */
const WeeklyChart = ({ data = [] }) => {
  const fallback = [
    { name: 'Mon', value: 24 },
    { name: 'Tue', value: 18 },
    { name: 'Wed', value: 32 },
    { name: 'Thu', value: 27 },
    { name: 'Fri', value: 35 },
    { name: 'Sat', value: 14 },
    { name: 'Sun', value: 8  },
  ];

  const chartData = data.length > 0 ? data : fallback;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-[10px] font-black uppercase shadow-xl border border-white/10">
          {label}: <span className="text-accent-primary">{payload[0].value}</span> visits
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-5 sm:p-7 rounded-3xl sm:rounded-[2.5rem] bg-white/70 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl h-full shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-primary" />
          <h3 className="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-white leading-none">Weekly Chart</h3>
        </div>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">This Week</span>
      </div>

      <div className="flex-1 min-h-[160px]">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={chartData} barSize={18}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 9, fontWeight: 800, fill: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(20,184,166,0.05)', radius: 6 }} />
            <Bar
              dataKey="value"
              fill="var(--color-accent-primary, #14b8a6)"
              radius={[6, 6, 0, 0]}
              opacity={0.85}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Analytics Summary */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 grid grid-cols-2 gap-4">
          <div className="space-y-1">
              <p className="text-[10px] font-black italic uppercase tracking-widest text-slate-400">Total Visits</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white tabular-nums leading-none">
                {chartData.reduce((acc, curr) => acc + curr.value, 0)}
              </p>
          </div>
          <div className="space-y-1 border-l border-slate-100 dark:border-white/5 pl-4">
              <p className="text-[10px] font-black italic uppercase tracking-widest text-slate-400">Busiest Day</p>
              <p className="text-2xl font-black text-accent-primary italic uppercase leading-none">
                {chartData.reduce((prev, current) => (prev.value > current.value) ? prev : current).name}
              </p>
          </div>
      </div>
    </Card>
  );
};

export default WeeklyChart;
