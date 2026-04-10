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
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-outline-variant)" opacity={0.3} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 500, fill: 'var(--color-text-sub)' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 500, fill: 'var(--color-text-sub)' }} />
          <Tooltip 
            contentStyle={{ 
                borderRadius: '16px', 
                border: '1px solid var(--color-outline-variant)', 
                backgroundColor: 'var(--color-surface-bright)',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                fontSize: '12px',
                fontWeight: 'bold',
                color: 'var(--color-text-main)'
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="growth" 
            stroke="var(--color-primary)" 
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
