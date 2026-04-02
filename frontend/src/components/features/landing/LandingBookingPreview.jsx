import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, ShieldCheck, Activity, User } from 'lucide-react';

/**
 *  Ultra Premium Apple-Style Booking Preview
 * Focus: High-Fidelity UI Mockup, Sophisticated Glassmorphism, Minimalist Control.
 */
export default function LandingBookingPreview() {
    return (
        <section className="py-24 lg:py-32 bg-white dark:bg-slate-900 overflow-hidden relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">

                    {/* Content Pillar */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 space-y-12"
                    >
                        <div className="space-y-6">
                            <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full inline-block">
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Clinical Command Node</span>
                            </div>
                            <h2 className="text-4xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                                Complete Clinical <br /><span className="text-blue-600 italic font-medium">Sovereignty.</span>
                            </h2>
                            <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                                Engineered for speed and precision. Manage entire clinical flows 
                                with a unified digital interface—from patient onboarding to 
                                advanced recursive diagnostics.
                            </p>
                        </div>

                        <ul className="space-y-6">
                            {[
                                'Real-time Clinical Synchronicity',
                                'End-to-End Encrypted Records',
                                'Automated Administrative Protocol',
                                'Multi-tenant Resource Optimization'
                            ].map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-4 text-slate-900 dark:text-slate-200 font-bold text-lg tracking-tight"
                                >
                                    <div className="w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center">
                                        <CheckCircle2 className="text-blue-600" size={16} />
                                    </div>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* UI Mockup Pillar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 w-full max-w-2xl relative"
                    >
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[48px] p-10 lg:p-14 border border-slate-100 dark:border-slate-800 shadow-2xl relative group overflow-hidden">
                            
                            {/* Glass Header */}
                            <div className="flex justify-between items-center mb-12">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400/30" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400/30" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-400/30" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="text-blue-600 opacity-60" size={16} />
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Protocol: RSA-4096</span>
                                </div>
                            </div>

                            {/* Patient Card Node */}
                            <div className="space-y-8">
                                <div className="flex items-center justify-between pb-8 border-b border-slate-200/50 dark:border-slate-700/50">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                                            AK
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Adnan Khan</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core ID: 88219-X</p>
                                        </div>
                                    </div>
                                    <Activity className="text-blue-600 animate-pulse" size={24} />
                                </div>

                                {/* Vital Metrics */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-8 bg-blue-600 rounded-[32px] text-white shadow-xl shadow-blue-600/20 group-hover:-translate-y-2 transition-transform duration-500">
                                        <Calendar className="mb-4 opacity-70" size={20} />
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Status</p>
                                        <p className="text-xl font-bold tracking-tight">Confirmed</p>
                                    </div>
                                    <div className="p-8 bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm group-hover:-translate-y-2 transition-transform duration-500 delay-75">
                                        <Clock className="mb-4 text-blue-600 opacity-70" size={20} />
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Clinic Time</p>
                                        <p className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">05:30 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Verification Badge */}
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute bottom-8 right-8 bg-emerald-500 text-white px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20"
                            >
                                Atomic Verification
                            </motion.div>
                        </div>

                        {/* Soft Ambient Gloom */}
                        <div className="absolute -z-10 bottom-[-40px] left-1/2 -translate-x-1/2 w-4/5 h-[80px] bg-blue-500/10 blur-[80px] rounded-full" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

