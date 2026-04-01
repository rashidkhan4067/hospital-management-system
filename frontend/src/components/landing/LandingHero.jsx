import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Calendar } from 'lucide-react';
import { Badge, Button } from '../ui';

export default function LandingHero() {
  return (
    <header className="hero-section px-6 md:pt-64 pb-32 relative text-center overflow-hidden">
      {/* Background Decorative Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-400 blur-[150px] rounded-full -z-10"
      />
      <motion.div 
        animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-300 blur-[120px] rounded-full -z-10"
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
        >
          <Badge icon={Sparkles} className="bg-white/50 border border-white/60 text-[#007aff] px-8 py-3 mb-10 shadow-soft text-sm font-bold uppercase tracking-widest">
            AI-POWERED CLINICAL HUB • PAKISTAN
          </Badge>
          
          <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-[#1d1d1f] mb-8 leading-[1.05] md:leading-[0.85] tracking-tight md:tracking-tighter"
          >
              The Perfect <br className="hidden sm:block" />
              <span className="text-[#007aff] block sm:inline">Appointment.</span>
          </motion.h1>
          
          <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hero-subtitle text-[#86868b] text-lg sm:text-xl md:text-3xl mb-12 max-w-2xl md:max-w-4xl mx-auto font-medium"
          >
              Achieve zero scheduling conflicts with our AI-augmented, cloud-native 
              <span className="text-[#1d1d1f] font-bold"> Hospital Booking System</span>.  
              Perfectly engineered to transform manual scheduling into a unified, 
              efficient digital experience for every patient in Pakistan.
          </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
                <Link to="/register">
                <Button variant="primary" className="h-18 px-12 text-lg rounded-2xl shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] hover:scale-105 transition-all" icon={ArrowRight}>
                    REGISTER AS PATIENT
                </Button>
                </Link>
                <Link to="/doctors">
                <Button variant="outline" className="h-18 px-12 text-lg rounded-2xl border-white/60 text-slate-900 hover:bg-white/60 bg-white/20 backdrop-blur-3xl shadow-sm" icon={Calendar}>
                    BOOK SPECIALIST
                </Button>
                </Link>
            </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
