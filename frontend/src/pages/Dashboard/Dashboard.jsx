import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Activity, Users, ShieldAlert } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../context/AuthContext';
import { Card, PageHeader, Badge } from '../../components/ui';
import { ROLES } from '../../constants';

export default function Dashboard() {
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
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const role = user?.role || ROLES.PATIENT;

  // Role-based stats
  const stats = [
    { 
      title: role === ROLES.DOCTOR ? "Today's Patients" : 'Upcoming Visits', 
      value: Array.isArray(appointments) ? appointments.length : 0, 
      icon: <Calendar color="#6366f1" />, 
      color: 'var(--accent-primary)' 
    },
    { 
      title: role === ROLES.ADMIN ? 'Total Users' : 'AI Bookings', 
      value: Array.isArray(appointments) ? appointments.filter(a => a.booked_via_voice).length : 0, 
      icon: <Activity color="#0ea5e9" />, 
      color: 'var(--accent-secondary)' 
    },
    { 
      title: 'Active Doctors', 
      value: doctorCount || 6, 
      icon: <Users color="#10b981" />, 
      color: 'var(--success)' 
    }
  ];

  return (
    <div className="dashboard-layout animate-enter">
      <PageHeader 
        title={`Welcome, ${user?.full_name || 'User'}`}
        subtitle={
          <span>You are logged in as <Badge className="badge-role">{role.toUpperCase()}</Badge></span>
        }
      />

      <section className="stats-grid delay-200">
        {stats.map((stat, idx) => (
          <Card key={idx} className="stat-card flex-row">
            <div className="stat-icon-wrapper" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
              {stat.icon}
            </div>
            <div className="stat-details">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </Card>
        ))}
      </section>

      <section className="appointments-section delay-300">
        <h2 className="section-title">Your Appointments</h2>
        <Card className="p-0 overflow-hidden">
          {loading ? (
            <div className="loading-state">
              <Activity className="va-spin text-gradient" size={32} />
              <p>Syncing data...</p>
            </div>
          ) : appointments.length > 0 ? (
            <table className="glass-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Booked via AI</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id} className="table-row">
                    <td>
                      <div className="td-flex">
                        <Calendar size={16} className="table-icon" />
                        {apt.appointment_date}
                      </div>
                    </td>
                    <td>
                      <div className="td-flex">
                        <Clock size={16} className="table-icon" />
                        {apt.start_time.substring(0, 5)} - {apt.end_time.substring(0, 5)}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge status-${apt.status}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td>{apt.booked_via_voice ? '🎙️ Yes' : '💻 Web'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <ShieldAlert size={48} color="#64748b" />
              <h3>No Appointments Found</h3>
              <p>Looks like your schedule is completely clear.</p>
              <a href="/doctors" className="btn btn-primary mt-4">Book Now</a>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
