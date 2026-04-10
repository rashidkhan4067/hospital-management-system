import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Activity, ShieldCheck, Clock } from 'lucide-react';

/**
 * 🛰️ AIPulseNode (Responsive Intelligence Shard)
 * Optimized for mobile-to-desktop transitions using MD3 principles.
 */
const AIPulseNode = () => {
    const intelligence = {
        type: 'efficiency',
        label: 'Clinical Intelligence Agent',
        content: 'OPD Ward 3 wait-time has reached a critical threshold. Enabling Overflow Protocol B to optimize patient throughput.',
        status: 'Auto-Active',
        icon: Clock,
        color: 'text-primary bg-primary/5'
    };

    return (
        <section className="col-span-12">
            <div className="bg-white border border-[#CAC4D0]/30 rounded-[32px] p-2 flex flex-col xl:flex-row items-stretch gap-2 shadow-sm shadow-slate-900/5">
                
                {/* 🏷️ Intelligence Identity (Stackable Column) */}
                <div className="bg-primary/[0.03] rounded-[28px] p-6 md:p-8 flex flex-col justify-center w-full xl:min-w-[280px] xl:max-w-[320px] border border-primary/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <Sparkles size={18} fill="currentColor" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Advisory</span>
                    </div>
                    <h3 className="text-xl font-black text-[#1C1B1F] tracking-tight leading-tight">Predictive Insight</h3>
                    <p className="text-[10px] font-bold text-[#49454F] opacity-50 mt-1.5 uppercase tracking-widest">Neural Sync: v2.4.1</p>
                </div>

                {/* 📊 Active Intelligence Shard (Responsive Body) */}
                <div className="flex-1 p-6 md:p-8 flex items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-6 md:gap-8"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${intelligence.color}`}>
                            <intelligence.icon size={24} />
                        </div>
                        
                        <div className="flex flex-col flex-1 gap-1.5">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black tracking-widest text-primary uppercase">{intelligence.label}</span>
                                <span className="w-1 h-1 rounded-full bg-[#CAC4D0]/40" />
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{intelligence.status}</span>
                                </div>
                            </div>
                            <p className="text-lg font-bold text-[#1C1B1F] leading-snug lg:max-w-xl">
                                {intelligence.content}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto mt-4 lg:mt-0">
                            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                                Execute Protocol
                                <ArrowRight size={14} />
                            </button>
                            <button className="flex items-center justify-center h-14 w-14 border border-[#CAC4D0]/40 rounded-full text-[#49454F] hover:bg-surface-variant/20 transition-all shrink-0">
                                <ShieldCheck size={20} />
                            </button>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default AIPulseNode;
