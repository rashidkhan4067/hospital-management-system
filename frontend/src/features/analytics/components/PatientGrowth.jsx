import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnalyticsChart from './AnalyticsChart';
import { REVENUE_DATA } from '../api/constants';
import { useAnalytics } from '../context/AnalyticsContext';

export default function PatientGrowth({ loading }) {
  const { filters } = useAnalytics();
  
  const data = useMemo(() => {
    const multiplier = filters.department === 'All Departments' ? 1 : 0.6;
    return REVENUE_DATA.map((d, i) => ({ 
      month: d.month, 
      growth: Math.round((120 + i * 45) * multiplier + Math.random() * 20) 
    }));
  }, [filters.department]);

  return (
    <AnalyticsChart title="Patient Growth Trend" subtitle="Monthly Registry Expansion" loading={loading}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00838f" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#00838f" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f4" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 500, fill: '#5f6368' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 500, fill: '#5f6368' }} />
          <Tooltip contentStyle={{ borderRadius: '12', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
          <Area 
            type="monotone" 
            dataKey="growth" 
            stroke="#00838f" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorGrowth)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </AnalyticsChart>
  );
}
