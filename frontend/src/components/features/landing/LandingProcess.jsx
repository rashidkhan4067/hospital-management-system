import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Brain, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const processSteps = [
    {
        id: '01',
        title: 'Clinical Hub Access',
        desc: 'Seamlessly transition from guest to verified patient node with atomic identity synchronization.',
        icon: Globe,
    },
    {
        id: '02',
        title: 'Specialist Allocation',
        desc: 'AI-augmented matching with Pakistans elite clinical network based on your specific diagnostic needs.',
        icon: Brain,
    },
    {
        id: '03',
        title: 'Unified Recovery',
        desc: 'Conflict-free surgical scheduling and real-time resource management for optimal clinical outcomes.',
        icon: Activity,
    }
];

/**
 *  Ultra Premium Apple-Style Process
 * Focus: High-Fidelity Workflow, Minimalist Precision, Sophisticated Narrative.
 */
export default function LandingProcess() {
    return (
        <section className="py-24 lg:py-32 bg-white dark:bg-slate-900 overflow-hidden relative">
            <div className="container mx-auto px-6 max-w-7xl">
                
                {/* Header Node */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mb-24 lg:mb-32"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Protocol Workflow</span>
                        </div>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                        Engineered for <br /><span className="text-blue-600 italic font-medium">Precision.</span>
                    </h2>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {processSteps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative space-y-8"
                        >
                            {/* Number Trace */}
                            <span className="text-8xl font-bold text-slate-50 dark:text-slate-800/50 absolute -top-12 -left-4 group-hover:text-blue-500/5 transition-colors -z-10">{step.id}</span>

                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                <step.icon size={28} />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">{step.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>

                            <Link to="/doctors">
                                <button className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                                    Explore Hub <ArrowRight size={14} />
                                </button>
                            </Link>

                            {/* Connecting Line (Desktop) */}
                            {idx < 2 && (
                                <div className="hidden lg:block absolute top-8 -right-8 w-16 h-px bg-slate-100 dark:bg-slate-800" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}


