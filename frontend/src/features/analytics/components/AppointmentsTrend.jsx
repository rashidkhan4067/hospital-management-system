import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnalyticsChart from './AnalyticsChart';
import { useAnalytics } from '../context/AnalyticsContext';
import { APPOINTMENT_DATA } from '../api/constants';

export default function AppointmentsTrend({ loading }) {
  const { filters } = useAnalytics();

  const data = useMemo(() => 
    APPOINTMENT_DATA.map(d => ({ 
      ...d, 
      count: filters.department === 'All Departments' ? d.count : Math.round(d.count * 0.45) 
    })), [filters.department]);

  return (
    <AnalyticsChart title="Appointments Trend" subtitle="Temporal Volume Shard" loading={loading}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f4" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 500, fill: '#5f6368' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 500, fill: '#5f6368' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '12', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            cursor={{ stroke: '#1a73e8', strokeWidth: 1 }}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#1a73e8" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#1a73e8', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </AnalyticsChart>
  );
}
