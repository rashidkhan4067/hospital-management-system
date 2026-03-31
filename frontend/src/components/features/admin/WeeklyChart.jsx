import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Card } from '../../ui';

export default function WeeklyChart() {
  const monthlyData = [
    { name: 'Jan', patients: 400, appointments: 240 },
    { name: 'Feb', patients: 300, appointments: 139 },
    { name: 'Mar', patients: 200, appointments: 980 },
    { name: 'Apr', patients: 278, appointments: 390 },
    { name: 'May', patients: 189, appointments: 480 },
    { name: 'Jun', patients: 239, appointments: 380 },
    { name: 'Jul', patients: 349, appointments: 430 },
  ];

  return (
    <Card className="glass-panel chart-card p-8 min-h-[400px]">
      <h3 className="text-xl font-bold text-white mb-8 underline underline-offset-8 decoration-indigo-500/50">Growth Analytics</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
            <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
            <Tooltip 
              contentStyle={{ background: 'rgba(10, 10, 20, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)', color: '#fff' }}
              itemStyle={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="patients" stroke="#38bdf8" fillOpacity={1} fill="url(#colorPatients)" />
            <Area type="monotone" dataKey="appointments" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorAppointments)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
