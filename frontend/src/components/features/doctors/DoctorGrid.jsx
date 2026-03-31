import React from 'react';
import { motion } from 'framer-motion';
import DoctorCard from './DoctorCard';

export default function DoctorGrid({ doctors, onBookClick }) {
  if (!doctors || doctors.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="no-results text-center py-12"
      >
        No doctors found matching your criteria.
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid-cards"
    >
      {doctors.map((doc, index) => (
        <DoctorCard 
          key={doc.id} 
          doctor={doc} 
          index={index} 
          onBookClick={onBookClick} 
        />
      ))}
    </motion.div>
  );
}
