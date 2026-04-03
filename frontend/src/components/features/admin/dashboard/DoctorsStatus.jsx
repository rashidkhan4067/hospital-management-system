import React from 'react';
import { Plus, UserCheck } from 'lucide-react';
import { Card } from '../../../ui';

/**
 * 👨‍⚕️ On-Duty Registry Shard
 * Tracks active clinical staff telemetry.
 * Strictly adheres to the Clinical Theme via dynamic accent and status tokens.
 */
import { motion } from 'framer-motion';

const DoctorStatus = ({ doctors, onAddDoctor }) => {
    return (
        <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/40 dark:border-white/5 rounded-[2.5rem] p-6 space-y-6 flex-1 shadow-2xl relative overflow-hidden group">
            
            <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] italic text-slate-500 dark:text-slate-400 leading-none">Active Personnel</h4>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40">Live Presence Hub</p>
                 </div>
                 <div className="w-10 h-10 rounded-[18px] bg-accent-primary/10 text-accent-primary flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-500">
                    <UserCheck size={18} />
                 </div>
            </div>

            <div className="flex flex-wrap gap-4 relative z-10">
                {doctors.map(i => (
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="relative group/doc cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-[18px] bg-white dark:bg-slate-800 p-0.5 border border-slate-100 dark:border-white/5 overflow-hidden group-hover/doc:scale-110 group-hover/doc:-rotate-3 transition-all duration-500 shadow-xl relative z-0">
                            <div className="w-full h-full rounded-[14px] overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?u=${i+100}`} className="w-full h-full object-cover grayscale group-hover/doc:grayscale-0 transition-all duration-700 scale-110 group-hover/doc:scale-100" alt="doc" />
                            </div>
                            <div className="absolute inset-0 bg-accent-primary/10 opacity-0 group-hover/doc:opacity-100 transition-opacity" />
                        </div>
                        
                        {/* 🍏 Advanced Pulse Ring */}
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 shadow-2xl z-10 ${
                            i % 4 === 0 ? 'bg-amber-500 shadow-[0_0_12px_#f59e0b]' : 'bg-emerald-500 shadow-[0_0_12px_#10b981]'
                        }`}>
                            <div className={`w-full h-full rounded-full animate-ping opacity-40 ${
                                i % 4 === 0 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} />
                        </div>
                    </motion.div>
                ))}
                
                <button 
                    onClick={onAddDoctor}
                    className="w-12 h-12 rounded-[18px] bg-white/50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-accent-primary hover:border-accent-primary hover:bg-accent-primary/5 transition-all duration-500 group/add active:scale-90"
                >
                   <Plus size={18} className="group-hover/add:rotate-90 transition-transform" />
                </button>
            </div>

            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-accent-primary/10 transition-colors" />
        </Card>
    );
};

export default DoctorStatus;
