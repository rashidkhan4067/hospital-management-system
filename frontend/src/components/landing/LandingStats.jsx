import React from 'react';
import { motion } from 'framer-motion';

const statsData = [
  { value: '25k+', label: 'Perfect Appointments' },
  { value: '0.1s', label: 'Atomic Validation' },
  { value: '100%', label: 'Conflict-Free' },
  { value: '9k+', label: 'AI Voice Consults' }
];

export default function LandingStats() {
  return (
    <section className="py-24 bg-[#007aff] relative overflow-hidden">
      <motion.div 
        animate={{ x: [-200, 200, -200] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-10 font-black text-white text-[15rem] leading-none select-none pointer-events-none"
      >
        BOOK BOOK BOOK BOOK
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
        {statsData.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
          >
            <motion.p 
                whileHover={{ scale: 1.1, color: "#fff" }}
                className="text-5xl md:text-7xl font-black text-white mb-2 cursor-default tracking-tighter"
            >
                {stat.value}
            </motion.p>
            <p className="text-blue-100 font-bold text-[10px] uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
