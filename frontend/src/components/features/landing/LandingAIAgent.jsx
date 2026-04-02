import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, CheckCircle, Sparkles, Languages, Terminal, Fingerprint, Activity } from 'lucide-react';

/**
 *  Ultra Premium Apple-Style Sana Voice AI
 * Focus: High-Fidelity Conversational Node, Minimalist Sophistication.
 */
export default function LandingAIAgent() {
    return (
        <section className="py-24 lg:py-32 bg-white dark:bg-slate-900 overflow-hidden relative border-b border-slate-50 dark:border-slate-800">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    
                    {/* Visual Pillar: Conversational Node */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="space-y-6 max-w-md mx-auto lg:mx-0">
                            
                            {/* AI Identity Bar */}
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                                    <Mic className="text-white" size={20} strokeWidth={2.5} />
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Sana Voice Engine</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Live & Optimizing</span>
                                    </div>
                                </div>
                            </div>

                            {/* Conversation Thread */}
                            <div className="space-y-6 relative pl-4 border-l border-slate-100 dark:border-slate-800 ml-6">
                                
                                {/* Sana Message */}
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800"
                                >
                                    <p className="text-slate-800 dark:text-slate-300 text-sm font-medium italic">
                                        "Assalam-o-Alaikum, I'm Sana. How can I help you book your appointment?"
                                    </p>
                                </motion.div>

                                {/* User Input - Glass Node */}
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="p-6 bg-blue-600 text-white rounded-[32px] shadow-xl shadow-blue-600/20 relative overflow-hidden"
                                >
                                    <div className="flex items-end gap-1 mb-3 h-3 opacity-40">
                                        {[1, 2, 3, 4, 3, 2, 5, 2, 1].map((h, i) => (
                                            <motion.div 
                                                key={i} 
                                                animate={{ height: ['40%', '100%', '40%'] }} 
                                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                                                className="w-0.5 bg-white rounded-full" 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-60 block mb-1">Urdu Regional Detected</span>
                                    <p className="text-xl font-bold tracking-tight leading-tight italic">
                                        "مجھے ڈاکٹر سارہ کے ساتھ شام کا ٹائم چاہیے۔"
                                    </p>
                                </motion.div>

                                {/* System Feedback */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 rounded-full px-4 py-2"
                                >
                                    <CheckCircle size={14} className="text-emerald-500" />
                                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Entry Verified</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Accessory Metadata Node */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute -top-6 -right-6 p-4 bg-white dark:bg-slate-800 shadow-xl rounded-2xl border border-slate-100 dark:border-slate-700 hidden lg:block"
                        >
                            <div className="flex items-center gap-3">
                                <Activity size={18} className="text-blue-600" />
                                <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</p>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">0.2s Booking Latency</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Content Pillar */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full inline-block">
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Sana Intelligence</span>
                            </div>
                            <h2 className="text-4xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                                Bridging Access <br /><span className="text-blue-600 italic font-medium">With Voice.</span>
                            </h2>
                            <p className="text-lg lg:text-xl text-slate-500 font-medium max-w-xl leading-relaxed">
                                No apps. No complicated forms. Just speak in your native dialect 
                                and Sana handles the clinical registration protocol automatically.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { icon: Languages, title: 'Multi-Dialect', desc: 'Urdu, Punjabi & English support.' },
                                { icon: Terminal, title: 'Direct Node Sync', desc: 'Real-time database integration.' },
                                { icon: Fingerprint, title: 'Biometric Voice', desc: 'Secure identity verification.' },
                                { icon: Sparkles, title: 'AI Augmented', desc: 'Smart slot optimization.' }
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                        <item.icon size={20} />
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">{item.title}</h4>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
