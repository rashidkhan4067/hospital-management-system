import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Baby, Brain, ShieldAlert, Thermometer, UserPlus } from 'lucide-react';

/**
 *  Ultra Premium Apple-Style Clinical Services
 * Focus: Clean Departmental Nodes, Minimalist Interaction.
 */
export default function LandingClinicalServices() {
    const services = [
        { icon: <Heart size={24} />, title: 'Cardiology', desc: 'Advanced diagnostics and surgical heart care.' },
        { icon: <Baby size={24} />, title: 'Pediatrics', desc: 'Specialized healthcare for infants and children.' },
        { icon: <Brain size={24} />, title: 'Neurology', desc: 'Comprehensive brain and nervous system care.' },
        { icon: <ShieldAlert size={24} />, title: 'Emergency', desc: '24/7 rapid response trauma care unit.' },
        { icon: <Thermometer size={24} />, title: 'Diagnostics', desc: 'High-precision lab and imaging services.' },
        { icon: <UserPlus size={24} />, title: 'OPD Services', desc: 'Streamlined outpatient consultation flows.' }
    ];

    return (
        <section className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="max-w-3xl mb-20 text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                            Clinical Centers <br /> <span className="text-blue-600">Built for Precision.</span>
                        </h2>
                        <p className="text-lg lg:text-xl text-slate-500 font-medium">
                            World-class medical expertise across diverse specialties, 
                            powered by our unified digital management ecosystem.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -4 }}
                            className="bg-white dark:bg-slate-800/50 p-10 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-600/5 transition-all group"
                        >
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                {service.icon}
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{service.title}</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

