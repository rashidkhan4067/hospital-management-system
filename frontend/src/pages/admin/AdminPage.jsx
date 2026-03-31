import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Calendar, Activity } from 'lucide-react';
import { PageHeader } from '../../components/ui';
import StatsCard from '../../components/features/admin/StatsCard';
import WeeklyChart from '../../components/features/admin/WeeklyChart';
import DoctorTable from '../../components/features/admin/DoctorTable';

export default function AdminPage() {
  const stats = [
    { title: 'Total Patients', value: '12,450', icon: <Users />, color: '#38bdf8' },
    { title: 'Active Doctors', value: '142', icon: <UserPlus />, color: '#10b981' },
    { title: 'Appointments Today', value: '48', icon: <Calendar />, color: '#f59e0b' },
    { title: 'Daily Revenue', value: '$8.2k', icon: <Activity />, color: '#6366f1' }
  ];

  return (
    <div className="page-container space-y-12 pb-12">
      <PageHeader 
        title="Admin Control Center"
        subtitle="Healthcare facility management and analytics"
      />

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 animate-enter-up">
        <div className="lg:col-span-2">
           <WeeklyChart />
        </div>
        <div className="lg:col-span-1 glass-panel p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-6 underline underline-offset-8 decoration-purple-500/50">Capacity Status</h3>
            <div className="space-y-8">
               <div className="progress-item">
                  <div className="flex justify-between mb-2">
                     <span className="text-xs uppercase font-bold text-gray-400">Cardiology</span>
                     <span className="text-xs font-bold text-indigo-400">85%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                     <div className="h-full bg-indigo-500/50 w-[85%] shadow-lg shadow-indigo-500/20" />
                  </div>
               </div>
               <div className="progress-item">
                  <div className="flex justify-between mb-2">
                     <span className="text-xs uppercase font-bold text-gray-400">Emergency</span>
                     <span className="text-xs font-bold text-red-400">92%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                     <div className="h-full bg-red-500/50 w-[92%] shadow-lg shadow-red-500/20" />
                  </div>
               </div>
               <div className="progress-item">
                  <div className="flex justify-between mb-2">
                     <span className="text-xs uppercase font-bold text-gray-400">Pediatrics</span>
                     <span className="text-xs font-bold text-green-400">45%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                     <div className="h-full bg-green-500/50 w-[45%] shadow-lg shadow-green-500/20" />
                  </div>
               </div>
            </div>
        </div>
      </div>

      <section className="animate-enter-up-slow">
        <DoctorTable />
      </section>
    </div>
  );
}
