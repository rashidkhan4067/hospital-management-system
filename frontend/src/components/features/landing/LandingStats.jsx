import React from 'react';
import { motion } from 'framer-motion';

const statsData = [
  { value: '25k+', label: 'Successful Hub Appointments' },
  { value: '0.1s', label: 'Atomic Validation Latency' },
  { value: '100%', label: 'Conflict-Free Probability' },
  { value: '9k+', label: 'AI Voice Accessibility Consults' }
];

/**
 *  Ultra Premium Apple-Style Metrics
 * Focus: High-Impact Typography, Minimalist Grid, Sophisticated Breathability.
 */
export default function LandingStats() {
  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-slate-900 border-b border-slate-50 dark:border-slate-800 overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {statsData.map((stat, idx) => (
            <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 text-center group"
            >
                <div className="relative inline-block">
                    {/* Soft Glow */}
                    <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tighter leading-none relative z-10">
                        {stat.value}
                    </p>
                </div>
                
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm lg:text-base leading-relaxed max-w-[180px] mx-auto">
                    {stat.label}
                </p>
            </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}


