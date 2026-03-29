import { UserPlus, Activity } from 'lucide-react';

export default function AdminDoctors() {
  return (
    <div className="dashboard-layout animate-enter">
      <header className="dash-header">
        <h1>Doctor Management</h1>
        <p>Admin panel to add, remove, and manage hospital staff</p>
      </header>

      <section className="glass-panel text-center p-0">
         <div className="empty-state">
            <UserPlus size={48} color="#6366f1" />
            <h3 className="mt-2">Doctor Directory</h3>
            <p>Admin features to register doctors will be deployed here.</p>
            <button className="btn btn-primary mt-2">Hire New Doctor</button>
         </div>
      </section>
    </div>
  );
}
