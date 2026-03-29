import React, { useState } from 'react';
import { Users, UserPlus, Calendar, Activity, TrendingUp } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

export default function AdminStats() {
  const monthlyData = [
    { name: 'Jan', patients: 400, appointments: 240 },
    { name: 'Feb', patients: 300, appointments: 139 },
    { name: 'Mar', patients: 200, appointments: 980 },
    { name: 'Apr', patients: 278, appointments: 390 },
    { name: 'May', patients: 189, appointments: 480 },
    { name: 'Jun', patients: 239, appointments: 380 },
    { name: 'Jul', patients: 349, appointments: 430 },
  ];

  const specializationData = [
    { name: 'Cardiology', value: 45 },
    { name: 'Neurology', value: 30 },
    { name: 'Pediatrics', value: 65 },
    { name: 'Orthopedics', value: 25 },
  ];

  return (
    <div className="page-container animate-enter">
      <div className="dashboard-header">
        <h1 className="text-gradient">System Overview</h1>
        <p className="subtitle">Real-time statistics and insights</p>
      </div>

      <div className="stats-grid">
        <div className="glass-panel stat-card delay-100">
          <div className="stat-icon" style={{ color: '#38bdf8' }}><Users size={32} /></div>
          <div className="stat-info">
            <h4>Total Patients</h4>
            <div className="value">12,450</div>
          </div>
        </div>
        <div className="glass-panel stat-card delay-200">
          <div className="stat-icon" style={{ color: '#10b981' }}><UserPlus size={32} /></div>
          <div className="stat-info">
            <h4>Active Doctors</h4>
            <div className="value">142</div>
          </div>
        </div>
        <div className="glass-panel stat-card delay-300">
          <div className="stat-icon" style={{ color: '#f59e0b' }}><Calendar size={32} /></div>
          <div className="stat-info">
            <h4>Appointments Today</h4>
            <div className="value">48</div>
          </div>
        </div>
        <div className="glass-panel stat-card delay-400">
          <div className="stat-icon" style={{ color: '#6366f1' }}><Activity size={32} /></div>
          <div className="stat-info">
            <h4>Platform Revenue</h4>
            <div className="value">$8.2k</div>
          </div>
        </div>
      </div>

      <div className="charts-grid delay-100">
        <div className="glass-panel chart-card" style={{ height: '400px' }}>
          <h3>Growth Analytics</h3>
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
              <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ background: 'rgba(22, 24, 34, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="patients" stroke="#38bdf8" fillOpacity={1} fill="url(#colorPatients)" />
              <Area type="monotone" dataKey="appointments" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorAppointments)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel chart-card" style={{ height: '400px' }}>
          <h3>Appointments by Specialization</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={specializationData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ background: 'rgba(22, 24, 34, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="glass-panel delay-200" style={{ padding: '24px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Recent Doctor Applications</h3>
          <button className="btn btn-primary">View All</button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dr. Alan Grant</td>
              <td>Cardiology</td>
              <td>12 Years</td>
              <td><span className="badge badge-warning">Pending</span></td>
              <td><button className="btn-icon text-secondary">Review</button></td>
            </tr>
            <tr>
              <td>Dr. Ellie Sattler</td>
              <td>Pediatrics</td>
              <td>8 Years</td>
              <td><span className="badge badge-success">Approved</span></td>
              <td><button className="btn-icon text-secondary">Manage</button></td>
            </tr>
            <tr>
              <td>Dr. Ian Malcolm</td>
              <td>Neurology</td>
              <td>15 Years</td>
              <td><span className="badge badge-danger">Rejected</span></td>
              <td><button className="btn-icon text-secondary">Details</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
