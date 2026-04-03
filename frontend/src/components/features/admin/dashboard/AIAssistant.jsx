import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Mic, CheckCircle2, MessageSquare } from 'lucide-react';
import { Card } from '../../../ui';

/**
 * 🤖 Compact Enterprise Sana AI Shard
 * Refined density to prevent vertical/horizontal bloating.
 * Design: Minimalist SaaS AI telemetry module.
 */
const SanaAICore = () => {
    const aiStats = [
        { label: 'Voice Bookings', value: '42', icon: <Mic size={12} />, bar: '82%' },
        { label: 'Success Velocity', value: '98.2%', icon: <CheckCircle2 size={12} />, bar: '98%' },
        { label: 'Chat Shard IQ', value: 'Lv. 12', icon: <MessageSquare size={12} />, bar: '65%' }
    ];

    return (
        <Card className="bg-gradient-to-br from-[#1F1F2B] to-[#3B3B5A] text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group border border-white/5 transition-all duration-700">
            {/* 🔮 Optimized Radial Glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/20 blur-[100px] rounded-full opacity-40 group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent-primary/10 blur-[80px] rounded-full" />

            <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.05, 1], 
                            rotate: [0, 3, -3, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-accent-primary shadow-2xl shrink-0"
                    >
                        <Activity size={24} />
                    </motion.div>
                    <div className="min-w-0">
                        <h3 className="text-lg font-extrabold uppercase italic tracking-tighter leading-none text-white truncate">Sana AI HUB</h3>
                        <p className="text-[9px] font-black opacity-40 uppercase tracking-[0.3em] mt-1.5 text-accent-primary truncate">Intelligence Core</p>
                    </div>
                </div>

                <div className="space-y-4 py-2">
                    {aiStats.map((ai, i) => (
                        <div key={i} className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 transition-colors group/item">
                            <div className="flex justify-between items-center text-[9px] font-black uppercase italic tracking-widest leading-none">
                                <span className="flex items-center gap-3 text-white/50 group-hover/item:text-white transition-colors">{ai.icon} {ai.label}</span>
                                <span className="text-accent-primary">{ai.value}</span>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    whileInView={{ width: ai.bar }} 
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} 
                                    className={`h-full bg-accent-primary rounded-full shadow-[0_0_10px_rgba(var(--color-accent-primary),0.6)]`} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40 italic text-white">Neural Status: Synced</span>
                    <div className="flex gap-1.5">
                        <div className="w-1 w-1 rounded-full bg-accent-primary animate-ping" />
                        <div className="w-1 w-1 rounded-full bg-accent-primary" />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SanaAICore;
