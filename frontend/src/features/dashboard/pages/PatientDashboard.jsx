import React from 'react';
import PatientWelcome from '../components/patient/PatientWelcome';
import UpcomingAppointmentCard from '../components/patient/UpcomingAppointmentCard';
import PatientQuickActions from '../components/patient/PatientQuickActions';
import HealthTipsWidget from '../components/patient/HealthTipsWidget';
import { PageHeader } from '@/components/primitives';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }
};

export default function PatientDashboard({ user, appointments = [], loading = false, doctorCount = 0 }) {
  // 🧭 Logic to find next upcoming appointment
  const now = new Date();
  const nextAppointment = appointments
    .filter(a => new Date(`${a.appointment_date}T${a.appointment_time || '00:00:00'}`) > now)
    .sort((a, b) => new Date(`${a.appointment_date}T${a.appointment_time}`) - new Date(`${b.appointment_date}T${b.appointment_time}`))[0];

  const stats = {
    totalAppointments: appointments.length,
    upcomingCount: appointments.filter(a => a.status === 'scheduled' || a.status === 'pending').length
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      {/* ── Dashboard Header ── */}
      <PageHeader 
        title="Patient Hub"
        subtitle="Al Shifaa Clinical Portal Matrix"
        status="Live"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-10"
      >
        {/* ── Row 1: Welcome CTA ── */}
        <motion.div variants={itemVariants}>
           <PatientWelcome user={user} stats={stats} />
        </motion.div>

        {/* ── Row 2: Secondary Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Mid-sized upcoming card */}
           <motion.div variants={itemVariants} className="lg:col-span-12 xl:col-span-5">
              <UpcomingAppointmentCard 
                appointment={nextAppointment} 
                onCancel={(id) => console.log('Cancel requested', id)} 
              />
           </motion.div>

           {/* Health Widget */}
           <motion.div variants={itemVariants} className="lg:col-span-12 xl:col-span-7">
              <HealthTipsWidget />
           </motion.div>
        </div>

        {/* ── Row 3: Actions Hub ── */}
        <motion.div variants={itemVariants}>
           <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-4 bg-accent-primary rounded-full" />
              <h3 className="text-[14px] font-black uppercase italic tracking-tighter">Clinical Hub Quick Actions</h3>
           </div>
           <PatientQuickActions />
        </motion.div>

      </motion.div>
    </div>
  );
}
