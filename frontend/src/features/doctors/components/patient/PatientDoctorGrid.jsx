import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PatientDoctorCard from './PatientDoctorCard';

const PatientDoctorGrid = ({ doctors, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="h-[460px] bg-slate-50 dark:bg-white/5 rounded-[40px] animate-pulse border border-slate-100 dark:border-white/5 shadow-sm" />
        ))}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="py-24 text-center bg-slate-50 dark:bg-black/20 rounded-[48px] border border-dashed border-slate-200 dark:border-white/5">
        <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-4">No Specialists Found</h3>
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] max-w-sm mx-auto px-6">We could not locate any active clinical nodes matching these parameters.</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {doctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <PatientDoctorCard doctor={doctor} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default PatientDoctorGrid;
