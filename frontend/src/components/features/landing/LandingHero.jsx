import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, ShieldCheck, Zap } from 'lucide-react';

/**
 *  Ultra Premium Apple-Style Hero
 * Focus: Minimalist Depth, Refined Typography, Sophisticated Brilliance.
 */
export default function LandingHero() {
  return (
    <header className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white dark:bg-slate-930">
      
      {/* 🔮 Ambient Depth Layers */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -top-[10%] -right-[10%] w-[800px] h-[800px] bg-blue-50/50 dark:bg-blue-900/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-indigo-50/30 dark:bg-indigo-900/10 blur-[100px] rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12"
        >
          {/* Status Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-full shadow-sm">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Unified Clinical Core 4.0</span>
            </div>
          </div>

          {/* Headline Node */}
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-slate-900 dark:text-white tracking-tight leading-[0.9] lg:leading-[0.85]">
            Experience <br />
            <span className="text-blue-600 italic">Efficiency.</span>
          </h1>

          {/* Subtext Node */}
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Revolutionizing healthcare management with a unified, <span className="text-slate-900 dark:text-white font-bold">intelligent platform</span>. 
            Designed for the modern clinic, engineered for Pakistan.
          </p>

          {/* Metrics / Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-10 opacity-40">
             {[
               { icon: ShieldCheck, label: "HIPAA Compliant" },
               { icon: Globe, label: "Cloud Native" },
               { icon: Zap, label: "Real-time Sync" }
             ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                   <item.icon size={14} className="text-slate-900 dark:text-white" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                </div>
             ))}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Link to="/register">
              <button className="h-16 px-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg shadow-2xl shadow-slate-900/20 active:scale-95 transition-all group">
                Access Hub
                <ArrowRight className="inline-ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/doctors">
              <button className="h-16 px-12 bg-white dark:bg-transparent border border-slate-200 dark:border-slate-800 rounded-full font-bold text-lg text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all">
                The Network
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Visual Accent */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <div className="w-1 h-3 bg-slate-400 rounded-full" />
      </div>
    </header>
  );
}
