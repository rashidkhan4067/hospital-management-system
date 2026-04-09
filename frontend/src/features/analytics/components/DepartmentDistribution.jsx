import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AnalyticsChart from './AnalyticsChart';
import { M3_COLORS } from '../api/constants';

import { useAnalytics } from '../context/AnalyticsContext';

const DEPT_DATA = [
  { name: 'Cardiology', value: 35 },
  { name: 'General', value: 45 },
  { name: 'ENT', value: 15 },
  { name: 'ICU', value: 5 },
];

export default function DepartmentDistribution({ loading }) {
  const { updateFilter } = useAnalytics();

  const handleSliceClick = (data) => {
    updateFilter('department', data.name);
  };

  return (
    <AnalyticsChart title="Unit Load Distribution" subtitle="Active Appointment Shards" loading={loading}>
      <div className="flex-1 w-full h-[320px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={DEPT_DATA}
              cx="50%"
              cy="45%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={6}
              dataKey="value"
              onClick={handleSliceClick}
              className="cursor-pointer outline-none"
              stroke="#fff"
              strokeWidth={2}
              labelLine={{ stroke: '#cbd5e1', strokeWidth: 1.5, length: 15 }}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                 const RADIAN = Math.PI / 180;
                 const radius = outerRadius + 20;
                 const x = cx + radius * Math.cos(-midAngle * RADIAN);
                 const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
                 return (
                   <text 
                     x={x} 
                     y={y} 
                     fill="#64748b" 
                     textAnchor={x > cx ? 'start' : 'end'} 
                     dominantBaseline="central"
                     className="text-[11px] font-black"
                   >
                     {`${(percent * 100).toFixed(0)}%`}
                   </text>
                 );
               }}
            >
              {M3_COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
            />
            <Legend 
               verticalAlign="bottom" 
               align="center"
               height={40} 
               iconType="circle" 
               wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '30px' }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsChart>
  );
}
