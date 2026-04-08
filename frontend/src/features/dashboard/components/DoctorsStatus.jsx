import React from 'react';
import { Plus, UserCheck } from 'lucide-react';
import { Card } from '@/components/primitives';

/**
 * 👨‍⚕️ On-Duty Registry Shard
 * Tracks active clinical staff telemetry.
 * Strictly adheres to the Clinical Theme via dynamic accent and status tokens.
 */
import { motion } from 'framer-motion';

const DoctorStatus = ({ doctors, onAddDoctor }) => {
    return (
        <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/40 dark:border-white/5 rounded-[2.5rem] p-7 space-y-7 flex-1 shadow-2xl relative overflow-hidden group">
            
            <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] italic text-slate-500 dark:text-slate-400 leading-none">Active Personnel</h4>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40">Live Presence Hub</p>
                 </div>
                 <div className="w-10 h-10 rounded-[18px] bg-accent-primary/10 text-accent-primary flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-500">
                    <UserCheck size={18} />
                 </div>
            </div>

            <div className="flex flex-wrap gap-4 relative z-10 pb-6 border-b border-slate-100 dark:border-white/10">
                {doctors.map(i => (
                    <div 
                        key={i} 
                        className="relative group/doc cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-[18px] bg-white dark:bg-slate-800 p-0.5 border border-slate-100 dark:border-white/5 overflow-hidden group-hover/doc:scale-110 group-hover/doc:-rotate-3 transition-all duration-500 shadow-xl relative z-0">
                            <div className="w-full h-full rounded-[14px] overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?u=${i+100}`} className="w-full h-full object-cover grayscale group-hover/doc:grayscale-0 transition-all duration-700 scale-110 group-hover/doc:scale-100" alt="doc" />
                            </div>
                            <div className="absolute inset-0 bg-accent-primary/10 opacity-0 group-hover/doc:opacity-100 transition-opacity" />
                        </div>
                        
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 shadow-2xl z-10 ${
                            i % 4 === 0 ? 'bg-amber-500 shadow-[0_0_12px_#f59e0b]' : 'bg-emerald-500 shadow-[0_0_12px_#10b981]'
                        }`}>
                            <div className={`w-full h-full rounded-full animate-ping opacity-40 ${
                                i % 4 === 0 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} />
                        </div>
                    </div>
                ))}
                
                <button 
                    onClick={onAddDoctor}
                    className="w-12 h-12 rounded-[18px] bg-white/50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-accent-primary hover:border-accent-primary hover:bg-accent-primary/5 transition-all duration-500 group/add active:scale-90"
                >
                   <Plus size={18} className="group-hover/add:rotate-90 transition-transform" />
                </button>
            </div>

            {/* Content to fill the space — Status Tickers */}
            <div className="space-y-4 pt-2">
                {[
                    { label: 'Operating Theater', count: 3, status: 'Active Case', color: 'text-rose-500', bg: 'bg-rose-500/5' },
                    { label: 'Emergency Response', count: 2, status: 'On Standby', color: 'text-amber-500', bg: 'bg-amber-500/5' },
                    { label: 'Outpatient Clinic', count: 12, status: 'Consulting', color: 'text-accent-primary', bg: 'bg-accent-primary/5' },
                ].map((s, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl ${s.bg} border border-transparent hover:border-slate-100 dark:hover:border-white/5 transition-all group/stat cursor-pointer`}>
                        <div>
                            <p className="text-[10px] font-black italic uppercase tracking-widest text-slate-400 group-hover/stat:text-slate-600 transition-colors leading-none">{s.label}</p>
                            <p className={`text-[8px] font-black uppercase tracking-[0.2em] mt-1 ${s.color}`}>{s.status}</p>
                        </div>
                        <span className="text-xl font-black text-slate-800 dark:text-white tabular-nums">{s.count}</span>
                    </div>
                ))}
            </div>

            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-accent-primary/10 transition-colors" />
        </Card>
    );
};

export default DoctorStatus;
