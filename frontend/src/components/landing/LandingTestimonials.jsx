import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui';

const testimonials = [
  {
    quote: "The booking system at Al Shifaa is faster than anything I've used. I verified my email and had an appointment confirmed in under 2 minutes.",
    author: "Adnan Khan",
    role: "Verified Patient",
    color: "bg-blue-50/50"
  },
  {
    quote: "As a doctor, the conflict-detection logic saves us from chaotic schedules. It is purely a world-class management tool.",
    author: "Dr. Sarah Ahmed",
    role: "Cardiologist",
    color: "bg-slate-50/50"
  }
];

export default function LandingTestimonials() {
  return (
    <section id="testimonials" className="py-48 bg-white relative">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-24 tracking-tight"
        >
            Trusted by the <br/> community
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className={`p-16 text-left glass-panel border-slate-200 shadow-soft ${t.color} rounded-[64px] hover:shadow-2xl transition-all`}>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-slate-700 text-2xl font-bold italic mb-12 leading-relaxed"
                >
                  "{t.quote}"
                </motion.p>
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex-shrink-0 animate-pulse"></div>
                    <div>
                        <p className="text-xl font-black text-slate-900">{t.author}</p>
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{t.role}</p>
                    </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
