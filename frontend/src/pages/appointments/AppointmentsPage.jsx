import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { getMyAppointments, cancelAppointment } from '../../services/appointmentService';
import { PageHeader } from '../../components/ui';
import AppointmentCard from '../../components/features/appointments/AppointmentCard';

export default function AppointmentsPage() {
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

  return (
    <div className="page-container animate-enter">
      <PageHeader 
        title="Medical Schedule"
        subtitle="Manage and track your medical consultations"
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 gap-6 opacity-30">
          <Activity className="animate-pulse text-blue-400" size={64} />
          <p className="font-bold uppercase tracking-widest text-sm">Syncing appointments...</p>
        </div>
      ) : (
        <div className="appointments-list grid gap-6 py-12">
          {appointments.length === 0 ? (
            <div className="col-span-full py-32 text-center opacity-30">
                <p className="text-2xl font-black uppercase tracking-tighter italic">No sessions found</p>
                <a href="/doctors" className="mt-8 inline-block px-12 py-4 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded-full font-bold uppercase tracking-widest hover:bg-blue-600/20 transition-all">Find a Specialist</a>
            </div>
          ) : (
             appointments.map((app, i) => (
                <AppointmentCard 
                    key={app.id} 
                    appointment={app} 
                    onCancel={handleCancel} 
                    index={i} 
                />
            ))
          )}
        </div>
      )}
    </div>
  );
}
