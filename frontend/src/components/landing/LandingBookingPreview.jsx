import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Check, Shield } from 'lucide-react';
import { Badge } from '../ui';

export default function LandingBookingPreview() {
  return (
    <section className="py-48 bg-[#f5f5f7] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24">
            {/* Left: Text Content */}
            <div className="flex-1 space-y-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <Badge className="bg-white text-[#86868b] border-slate-200 mb-6 px-4 py-2 font-black uppercase tracking-widest text-[10px]">Production-Ready Interface</Badge>
                    <h2 className="text-5xl md:text-7xl font-black text-[#1d1d1f] tracking-tighter leading-none mb-8">
                        The Future of <br/> Clinical <span className="text-[#007aff]">Control.</span>
                    </h2>
                    <p className="text-xl text-[#86868b] font-medium leading-relaxed max-w-xl">
                        Our cloud-native platform provides a unified digital interface 
                        designed for speed. From patient onboarding to automated 
                        administrative workflows, every interaction is engineered 
                        for efficiency.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {[
                        'Real-time Patient Data Visibility',
                        'Atomic Database Conflict Resolution',
                        'Hands-free Voice-to-Dashboard Sync',
                        'Encrypted Medical Records Storage'
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-4 text-[#1d1d1f] font-bold"
                        >
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                <Check className="text-white" size={14} />
                            </div>
                            {item}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right: UI Mockup (Advanced CSS Construction) */}
            <motion.div 
                initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
                whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 w-full max-w-2xl perspective-1000"
            >
                <div className="bg-white rounded-[40px] shadow-glass border border-white p-8 relative">
                    {/* Header of Mockup */}
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Shield className="text-emerald-500" size={18} />
                            <span className="text-[10px] font-black text-slate-400 tracking-widest">ENCRYPTED</span>
                        </div>
                    </div>

                    {/* Content of Mockup */}
                    <div className="space-y-6">
                        <div className="h-12 w-3/4 bg-slate-50 rounded-2xl animate-pulse"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                                <Calendar className="text-[#007aff] mb-4" />
                                <p className="text-xs font-black text-slate-400 uppercase mb-1">Confirmed</p>
                                <p className="text-lg font-black text-[#1d1d1f]">Dr. Hussain</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <Clock className="text-slate-400 mb-4" />
                                <p className="text-xs font-black text-slate-400 uppercase mb-1">Time Slot</p>
                                <p className="text-lg font-black text-[#1d1d1f]">05:30 PM</p>
                            </div>
                        </div>
                        <div className="p-6 border border-slate-100 rounded-3xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#1d1d1f] rounded-xl flex items-center justify-center text-white font-bold">AK</div>
                                <div>
                                    <p className="font-black text-[#1d1d1f]">Adnan Khan</p>
                                    <p className="text-[10px] font-bold text-slate-400">PATIENT ID: 88219</p>
                                </div>
                            </div>
                            <Badge className="bg-emerald-500 text-white border-none py-2 px-4 shadow-lg shadow-emerald-500/20">ATOMIC SYNC</Badge>
                        </div>
                    </div>

                    {/* Floating Overlay Card */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -bottom-8 -left-8 p-6 bg-white shadow-2xl rounded-3xl border border-slate-50 flex items-center gap-4"
                    >
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                            <Check size={20} />
                        </div>
                        <p className="text-sm font-black text-[#1d1d1f]">Booking Verified</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
