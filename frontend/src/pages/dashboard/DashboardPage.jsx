import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Activity, Users } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/ui';
import { ROLES } from '../../constants';
import StatsCard from '../../components/features/admin/StatsCard';
import AppointmentList from '../../components/features/appointments/AppointmentList';

export default function DashboardPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorCount, setDoctorCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [apptsRes, docsRes] = await Promise.all([
          apiClient.get('/appointments/'),
          apiClient.get('/doctors/')
        ]);
        setAppointments(apptsRes.data);
        setDoctorCount(docsRes.data.length || 0);
      } catch (error) {
        console.error("Dashboard page data load failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const role = user?.role || ROLES.PATIENT;

  const stats = [
    { 
      title: role === ROLES.DOCTOR ? "Today's Patients" : 'Upcoming Visits', 
      value: Array.isArray(appointments) ? appointments.length : 0, 
      icon: <Calendar color="#6366f1" />, 
      color: '#6366f1' 
    },
    { 
      title: role === ROLES.ADMIN ? 'Total Users' : 'AI Bookings', 
      value: Array.isArray(appointments) ? appointments.filter(a => a.booked_via_voice).length : 0, 
      icon: <Activity color="#0ea5e9" />, 
      color: '#0ea5e9' 
    },
    { 
      title: 'Active Doctors', 
      value: doctorCount || 6, 
      icon: <Users color="#10b981" />, 
      color: '#10b981' 
    }
  ];

  return (
    <div className="dashboard-content space-y-12">
      <PageHeader 
        title={`Dashboard Overview`}
        subtitle={`Welcome back, ${user?.full_name || 'User'}`}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </section>

      <section className="appointments-section py-8 animate-enter-up">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold tracking-tight underline underline-offset-8 decoration-blue-500/50">Next Appointments</h2>
            <button className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">View All</button>
        </div>
        <AppointmentList appointments={appointments} loading={loading} />
      </section>
    </div>
  );
}
