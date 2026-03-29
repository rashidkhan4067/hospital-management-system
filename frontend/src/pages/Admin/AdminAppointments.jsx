import { CalendarCheck, List } from 'lucide-react';

export default function AdminAppointments() {
  return (
    <div className="dashboard-layout animate-enter">
      <header className="dash-header">
        <h1>Global Appointments</h1>
        <p>Monitor all hospital-wide appointment traffic</p>
      </header>

      <section className="glass-panel text-center p-0">
         <div className="empty-state">
            <List size={48} color="#0ea5e9" />
            <h3 className="mt-2">Live Appointment Feed</h3>
            <p>Admin tools to override and cancel system-wide appointments.</p>
         </div>
      </section>
    </div>
  );
}
