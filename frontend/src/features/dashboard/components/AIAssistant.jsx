import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Mic, CheckCircle2, MessageSquare } from 'lucide-react';
import { Card } from '@/components/primitives';

/**
 * 🤖 Compact Enterprise Sana AI Shard
 * Refined density to prevent vertical/horizontal bloating.
 * Design: Minimalist SaaS AI telemetry module.
 */
const AIAssistant = ({ onOpenChat }) => {
    const aiStats = [
        { label: 'Voice Bookings', value: '42', icon: <Mic size={12} />, bar: '82%', color: 'from-accent-primary to-accent-primary/40' },
        { label: 'Inquiry Success', value: '98.2%', icon: <CheckCircle2 size={12} />, bar: '98%', color: 'from-emerald-400 to-emerald-600' },
        { label: 'AI Response', value: 'Instant', icon: <MessageSquare size={12} />, bar: '65%', color: 'from-sky-400 to-sky-600' }
    ];

    return (
        <Card 
            onClick={onOpenChat}
            className="relative bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#1E293B] text-white p-6 rounded-[2.5rem] shadow-2xl overflow-hidden group border border-white/5 transition-all duration-700 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
            
            {/* 🌌 Neural Glow Shards */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/20 blur-[130px] rounded-full opacity-40 group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-accent-primary/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10 flex flex-col h-full gap-4">
                <div className="flex items-center gap-4">
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.1, 1], 
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="w-12 h-12 rounded-[18px] bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-accent-primary shadow-[0_0_30px_rgba(var(--color-accent-primary),0.3)] shrink-0"
                    >
                        <Activity size={24} />
                    </motion.div>
                    <div className="min-w-0">
                        <h3 className="text-lg font-black uppercase italic tracking-tighter leading-none text-white truncate">Sana Intelligence</h3>
                        <p className="text-[9px] font-black italic opacity-40 uppercase tracking-[0.4em] mt-1 text-accent-primary truncate">Automated Triage Node</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {aiStats.map((ai, i) => (
                        <div key={i} className="space-y-3 p-4 rounded-[1.8rem] bg-white/5 border border-white/5 backdrop-blur-3xl hover:bg-white/10 transition-all duration-500 group/item">
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/50 group-hover/item:text-white transition-colors">{ai.icon} {ai.label}</span>
                                <span className="text-[10px] font-black text-accent-primary italic tabular-nums">{ai.value}</span>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    whileInView={{ width: ai.bar }} 
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }} 
                                    className={`h-full bg-gradient-to-r ${ai.color} rounded-full shadow-[0_0_15px_rgba(var(--color-accent-primary),0.4)]`} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent-primary animate-ping" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 italic text-white flex items-center gap-2">
                           Live Shard Pipeline: 100%
                        </span>
                    </div>
                    <div className="flex gap-2">
                        {[0, 1, 2].map((dot) => (
                           <motion.div 
                             key={dot}
                             animate={{ opacity: [0.2, 1, 0.2] }}
                             transition={{ repeat: Infinity, duration: 1.5, delay: dot * 0.3 }}
                             className="w-1.5 h-1.5 rounded-full bg-accent-primary" 
                           />
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AIAssistant;
