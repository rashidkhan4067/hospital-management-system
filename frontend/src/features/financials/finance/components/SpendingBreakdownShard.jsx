import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/primitives';
import { PieChart as PieIcon } from 'lucide-react';

const mockData = [
  { name: 'Medical Supplies', value: 45000, color: '#3B82F6' },
  { name: 'Staff Salaries', value: 850000, color: '#14B8A6' },
  { name: 'Infrastructure', value: 120000, color: '#F59E0B' },
  { name: 'Digital Matrix', value: 35000, color: '#8B5CF6' },
];

/**
 * 📊 Spending Breakdown Shard
 * High-fidelity pie matrix for fiscal outflow analytics.
 */
export default function SpendingBreakdownShard({ data = mockData }) {
  return (
    <Card className="p-8 lg:p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-8 group">
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none transition-colors group-hover:bg-accent-primary/10" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-inner group-hover:scale-110 transition-transform italic shrink-0">
            <PieIcon size={24} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl lg:text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none font-display">Outflow Matrix</h3>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-2 opacity-60 italic">Expenditure Shard Distribution</p>
          </div>
        </div>
      </div>

      <div className="w-full h-72 lg:h-80 relative z-10 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.98)', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                borderRadius: '24px',
                padding: '16px',
                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)'
              }} 
              itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
            />
            <Legend 
              verticalAlign="bottom" 
              align="center" 
              iconType="circle"
              formatter={(value) => (
                <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic ml-1">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-auto flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 relative z-10">
          <p className="text-[10px] font-black uppercase text-slate-400 italic">Total Logged Matrix</p>
          <p className="text-xl font-black text-slate-900 dark:text-white italic tabular-nums leading-none">
            Rs. {data.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
          </p>
      </div>
    </Card>
  );
}
