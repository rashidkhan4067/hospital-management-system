import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BedDouble } from 'lucide-react';
import { Card } from '@/components/primitives';

/**
 * Row 4 Right — BedStatus
 * Available/occupied beds count as a donut chart.
 */
const BedStatus = ({ onNavigate }) => {
  const available = 42;
  const occupied  = 28;
  const total     = available + occupied;

  const data = [
    { name: 'Available', value: available, color: '#14b8a6' },
    { name: 'Occupied',  value: occupied,  color: '#f59e0b' },
  ];

  return (
    <Card className="p-5 sm:p-7 rounded-3xl sm:rounded-[2.5rem] bg-white/70 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl cursor-pointer hover:border-accent-primary/20 transition-all h-full shadow-xl" onClick={onNavigate}>
      <div className="flex items-center gap-2 mb-6">
        <BedDouble size={13} className="text-accent-primary" />
        <h3 className="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-white leading-none">Bed Status</h3>
      </div>

      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="relative w-24 h-24 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={28} outerRadius={40} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
                {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [`${v} beds`, n]} contentStyle={{ borderRadius: '12px', fontSize: '10px', fontWeight: 800, border: 'none', background: '#0f172a', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-black text-slate-900 dark:text-white leading-none">{total}</span>
            <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 flex-1">
          {data.map((d, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{d.name}</span>
              </div>
              <span className="text-[12px] font-black text-slate-800 dark:text-white tabular-nums">{d.value}</span>
            </div>
          ))}
          <div className="h-px bg-slate-100 dark:bg-white/5" />
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            Occupancy: <span className="text-amber-500 font-black">{Math.round((occupied / total) * 100)}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BedStatus;
