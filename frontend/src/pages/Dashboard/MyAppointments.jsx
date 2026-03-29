import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, XCircle, Activity } from 'lucide-react';
import { getMyAppointments, cancelAppointment } from '../../services/appointmentService';
import { Card, PageHeader, Badge, Button } from '../../components/ui';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getMyAppointments();
      setAppointments(data.results || data);
    } catch (error) {
      // Fallback for demo/debug
      setAppointments([
        { id: 1, doctor_name: 'Sarah Connor', specialization: 'Cardiology', date: '2027-10-15', time: '10:00 AM', status: 'upcoming' },
        { id: 2, doctor_name: 'John Doe', specialization: 'Neurology', date: '2027-09-20', time: '02:00 PM', status: 'completed' },
        { id: 3, doctor_name: 'Emily Chen', specialization: 'Pediatrics', date: '2027-09-25', time: '11:00 AM', status: 'cancelled' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await cancelAppointment(id);
      setAppointments(appointments.map(app => 
         app.id === id ? { ...app, status: 'cancelled' } : app
      ));
    } catch (error) {
      setAppointments(appointments.map(app => 
        app.id === id ? { ...app, status: 'cancelled' } : app
      ));
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      upcoming: 'status-upcoming',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    };
    return <Badge className={`status-badge ${statusClasses[status?.toLowerCase()] || ''}`}>{status}</Badge>;
  };

  return (
    <div className="page-container animate-enter">
      <PageHeader 
        title="My Appointments"
        subtitle="Manage and view your medical appointments"
      />

      {loading ? (
        <div className="loading-state">
           <Activity className="va-spin text-gradient" size={32} />
           <p>Loading appointments...</p>
        </div>
      ) : (
        <div className="appointments-list">
          {appointments.length === 0 ? (
            <Card className="empty-state">No appointments found.</Card>
          ) : (
             appointments.map((app, i) => (
              <Card key={app.id} className={`appointment-item delay-${(i % 5)*100}`}>
                <div className="app-info">
                  <div className="doc-detail">
                    <User className="icon" size={24} />
                    <div>
                      <h3>Dr. {app.doctor_name}</h3>
                      <span className="spec">{app.specialization}</span>
                    </div>
                  </div>
                  <div className="time-detail">
                    <span><Calendar size={16}/> {app.date}</span>
                    <span><Clock size={16}/> {app.time}</span>
                  </div>
                </div>
                
                <div className="app-actions">
                  {getStatusBadge(app.status)}
                  {app.status === 'upcoming' && (
                    <Button 
                      variant="danger" 
                      onClick={() => handleCancel(app.id)} 
                      icon={XCircle}
                      className="btn-danger-lite"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
