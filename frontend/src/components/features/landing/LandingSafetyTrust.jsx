import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, CheckCircle } from 'lucide-react';

/**
 *  Ultra Premium Apple-Style Safety & Trust
 * Focus: Data Ethics, Clinical Security, Minimalist Resilience.
 */
export default function LandingSafetyTrust() {
    const protocols = [
        { icon: <ShieldCheck size={24} />, title: 'Patient Data Ethics', desc: 'Strict HIPAA & GDPR compliance for clinical data.' },
        { icon: <Lock size={24} />, title: 'End-to-End Encryption', desc: 'Secure medical record storage with RSA-4096.' },
        { icon: <Eye size={24} />, title: 'Clinical Reliability', desc: 'Verified PMDC specialist network & audit logs.' }
    ];

    return (
        <section className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    
                    {/* Trust Pillar */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-full inline-block">
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Clinical Security Protocol</span>
                            </div>
                            <h2 className="text-4xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                                Security by <br /><span className="text-emerald-500 italic font-medium">Design.</span>
                            </h2>
                            <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                                We prioritize the sanctity of your medical data. Our architecture is 
                                built on the principles of zero-trust clinical security and absolute 
                                data portability.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {protocols.map((p, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                                        {p.icon}
                                    </div>
                                    <div className="space-y-1 pt-1">
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{p.title}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{p.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Security Visual Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-slate-800 rounded-[48px] p-12 border border-slate-100 dark:border-slate-700 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                        <div className="space-y-8 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Lock className="text-emerald-500" size={20} />
                                    <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">Neural Security: Active</span>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <div className="h-px bg-slate-100 dark:bg-slate-700" />
                            <div className="grid grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 p-4">
                                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mb-3 overflow-hidden">
                                            <motion.div animate={{ x: [-100, 200] }} transition={{ repeat: Infinity, duration: 2 }} className="w-24 h-full bg-emerald-500/30" />
                                        </div>
                                        <div className="w-1/2 h-2 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 bg-slate-900 text-white rounded-3xl flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-widest font-mono">ENCRYPTED_NODE_STABLE</span>
                                <CheckCircle size={16} className="text-emerald-500" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
