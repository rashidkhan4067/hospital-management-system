import React from 'react';
import { Plus, UserCheck } from 'lucide-react';
import { Card } from '../../../ui';

/**
 * 👨‍⚕️ On-Duty Registry Shard
 * Tracks active clinical staff telemetry.
 * Strictly adheres to the Clinical Theme via dynamic accent and status tokens.
 */
const OnDutyRegistry = ({ doctors }) => {
    return (
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-2xl p-8 space-y-8 flex-1 shadow-lg relative overflow-hidden group
            lg:shadow-[6px_6px_12px_#e2e8f0,-6px_-6px_12px_#ffffff] dark:lg:shadow-none transition-all duration-500">
            
            <div className="flex items-center justify-between mb-2">
                 <div className="space-y-1">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] italic text-slate-500 dark:text-slate-400 leading-none">On-Duty Registry</h4>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40">Live Clinical Shard Pulse</p>
                 </div>
                 <div className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary shadow-inner">
                    <UserCheck size={18} />
                 </div>
            </div>

            <div className="flex flex-wrap gap-4 relative z-10 px-2 lg:px-4">
                {doctors.map(i => (
                    <div key={i} className="relative group/doc cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 overflow-hidden group-hover/doc:scale-110 group-hover/doc:rotate-3 transition-transform duration-300 shadow-sm relative z-0">
                            <img src={`https://i.pravatar.cc/150?u=${i+100}`} className="w-full h-full object-cover grayscale group-hover/doc:grayscale-0 transition-all duration-500" alt="doc" />
                            <div className="absolute inset-0 bg-accent-primary/10 opacity-0 group-hover/doc:opacity-100 transition-opacity" />
                        </div>
                        {/* Status Pulse Shard */}
                        <div className={`absolute -bottom-1.5 -right-1.5 w-4.5 h-4.5 rounded-full border-4 border-white dark:border-slate-900 shadow-xl z-10 ${
                            i % 4 === 0 ? 'bg-status-warning' : 'bg-status-success'
                        }`}>
                            <div className={`w-full h-full rounded-full animate-ping opacity-30 ${
                                i % 4 === 0 ? 'bg-status-warning' : 'bg-status-success'
                            }`} />
                        </div>
                    </div>
                ))}
                
                {/* Expand Trigger Node */}
                <button className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-accent-primary hover:border-accent-primary hover:bg-accent-primary/5 transition-all duration-300 group/add">
                   <Plus size={20} className="group-hover/add:rotate-90 transition-transform" />
                </button>
            </div>

            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-primary/5 blur-[80px] rounded-full pointer-events-none" />
        </Card>
    );
};

export default OnDutyRegistry;
