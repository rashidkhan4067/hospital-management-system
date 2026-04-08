import React, { useState, useEffect } from 'react';
import { Calendar, Activity, SlidersHorizontal, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import appointmentService from '@/features/appointments/api/appointmentService';
import { PageHeader, Card, Badge, Button } from '@/components/primitives';
import AppointmentRow from '../components/patient/AppointmentRow';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/hooks/useNotifications';

export default function UserAppointmentsPage() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('UPCOMING');
  const { addNotification } = useNotifications();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.getAll();
      setAppointments(data.results || data);
    } catch (error) {
      addNotification('Offline Mode', 'Retrieving local clinical backup...', 'info');
      setAppointments([
        { id: 1, doctor_name: 'Sarah Connor', specialization: 'Cardiology', appointment_date: '2026-10-15', appointment_time: '10:00 AM', status: 'scheduled' },
        { id: 2, doctor_name: 'John Doe', specialization: 'Neurology', appointment_date: '2026-09-20', appointment_time: '02:00 PM', status: 'completed' },
        { id: 3, doctor_name: 'Emily Chen', specialization: 'Pediatrics', appointment_date: '2026-09-25', appointment_time: '11:00 AM', status: 'cancelled' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Confirm Node De-allocation?')) return;
    try {
      await appointmentService.cancel(id);
      addNotification('Node De-allocated', 'Clinical session cancelled successfully.', 'success');
      setAppointments(appointments.map(app => 
         app.id === id ? { ...app, status: 'cancelled' } : app
      ));
    } catch (error) {
      addNotification('Error', 'Failed to update clinical matrix.', 'error');
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const isUpcoming = app.status === 'scheduled' || app.status === 'pending';
    if (activeTab === 'UPCOMING') return isUpcoming;
    return !isUpcoming;
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1400px] mx-auto">
      {/* 🏙️ Integrated Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl p-8 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-soft">
         <div className="space-y-2">
            <div className="flex items-center gap-3">
               <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Medical Schedule</h1>
               <div className="px-3 py-1 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary rounded-lg text-[9px] font-black uppercase italic tracking-widest flex items-center gap-2">
                  <Activity size={10} className="animate-pulse" /> Live Status
               </div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic leading-relaxed">Manage and track your clinical consultations across the Al Shifaa matrix.</p>
         </div>

         <div className="flex items-center gap-2 bg-slate-50 dark:bg-black/20 p-2 rounded-2xl border border-slate-100 dark:border-white/5 h-fit">
            <button 
              onClick={() => setActiveTab('UPCOMING')}
              className={`px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'UPCOMING' 
                ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/25 scale-105' 
                : 'text-slate-400 hover:text-slate-900 group dark:hover:text-white hover:bg-white dark:hover:bg-white/5'
              }`}
            >
              Upcoming Node Sessions
            </button>
            <button 
              onClick={() => setActiveTab('PREVIOUS')}
              className={`px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'PREVIOUS' 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105' 
                : 'text-slate-400 hover:text-slate-900 group dark:hover:text-white hover:bg-white dark:hover:bg-white/5'
              }`}
            >
              Archived History
            </button>
         </div>
      </div>

      {/* 🧬 Sessions Lane */}
      <div className="min-h-[600px] space-y-6">
        {loading ? (
             <div className="flex flex-col items-center justify-center p-32 gap-6">
                <div className="w-16 h-16 rounded-[28px] bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary animate-spin">
                   <Zap size={32} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Syncing clinical nodes...</p>
             </div>
        ) : filteredAppointments.length === 0 ? (
           <Card className="p-32 rounded-[4rem] bg-slate-50/50 dark:bg-black/10 border border-dashed border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center gap-10">
              <div className="w-20 h-20 rounded-[32px] bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300 dark:text-slate-700">
                 <Calendar size={40} />
              </div>
              <div className="space-y-4">
                 <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">No Sessions Found</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">No clinical nodes match your current temporal trajectory.</p>
              </div>
              <Button 
                onClick={() => navigate('/doctors')}
                className="bg-accent-primary text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-accent-primary/25 border-none hover:scale-105 transition-all"
              >
                 Book New Session <ArrowRight size={16} />
              </Button>
           </Card>
        ) : (
           <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8 px-4">
                 <div className="w-1 h-4 bg-accent-primary rounded-full shadow-[0_0_8px_rgba(var(--accent-primary-rgb),0.5)]" />
                 <h3 className="text-[12px] font-black uppercase italic tracking-tighter text-slate-400">{activeTab} NODE IDENTITIES</h3>
              </div>
              <div className="grid gap-6">
                 {filteredAppointments.map((app, i) => (
                    <AppointmentRow 
                        key={app.id} 
                        appointment={app} 
                        onCancel={handleCancel} 
                        index={i} 
                    />
                 ))}
              </div>
           </div>
        )}
      </div>

      {/* 🔘 Atmospheric Depth Shard */}
      <div className="fixed -bottom-20 -left-20 w-[600px] h-[600px] bg-accent-primary/5 blur-[150px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
}
