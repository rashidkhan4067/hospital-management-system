import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, Clock, ExternalLink } from 'lucide-react';

const activities = [
  { id: 1, type: 'alert', title: 'Critical Low Oxygen Supply', time: '2m ago', severity: 'high', location: 'Section B-14' },
  { id: 2, type: 'success', title: 'MRI Calibration Complete', time: '15m ago', severity: 'low', location: 'Radiology' },
  { id: 3, type: 'info', title: 'Shift Handover Initiated', time: '45m ago', severity: 'low', location: 'Nursing Station' },
  { id: 4, type: 'info', title: 'New Surgeon Credentialed', time: '1h ago', severity: 'low', location: 'HR Admin' },
];

/**
 * 🛰️ RecentActivity (Operational Triage Stream)
 * High-density stream of medical facility events.
 */
const RecentActivity = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 min-w-[320px] bg-[#FEF7FF] border border-[#CAC4D0]/40 rounded-[32px] overflow-hidden"
        >
            <div className="p-8 border-b border-[#CAC4D0]/30 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase text-[#49454F] tracking-[0.2em] opacity-60">Telemetry Stream</span>
                    <h3 className="text-xl font-bold text-[#1C1B1F]">Active Incident Feed</h3>
                </div>
                <button className="flex items-center gap-2 p-3 rounded-full hover:bg-primary/5 text-primary transition-colors transition-colors">
                    <ExternalLink size={18} />
                </button>
            </div>

            <div className="flex flex-col">
                {activities.map((act, idx) => (
                    <div 
                        key={act.id} 
                        className={`p-6 flex items-start gap-4 hover:bg-surface-variant/20 transition-all border-b border-[#CAC4D0]/20 last:border-0 cursor-default group`}
                    >
                        <div className={`mt-1 h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                            act.type === 'alert' ? 'bg-rose-50 text-rose-500' :
                            act.type === 'success' ? 'bg-emerald-50 text-emerald-500' :
                            'bg-blue-50 text-blue-500'
                        }`}>
                            {act.type === 'alert' ? <AlertCircle size={20} /> :
                             act.type === 'success' ? <CheckCircle2 size={20} /> :
                             <Info size={20} />}
                        </div>
                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-4">
                                <span className={`text-[12px] font-black uppercase tracking-widest ${
                                    act.type === 'alert' ? 'text-rose-600' : 
                                    act.type === 'success' ? 'text-emerald-600' : 
                                    'text-blue-600'
                                }`}>
                                   {act.id % 2 === 0 ? 'Diagnostic' : 'Facility'} System {act.severity === 'high' ? 'Alert' : 'Update'}
                                </span>
                                <span className="text-[10px] font-bold text-[#49454F] opacity-50 flex items-center gap-1">
                                    <Clock size={10} /> {act.time}
                                </span>
                            </div>
                            <h4 className="text-[15px] font-bold text-[#1C1B1F] truncate group-hover:text-primary transition-colors">{act.title}</h4>
                            <span className="text-xs font-medium text-[#49454F] opacity-70 italic">Node: {act.location}</span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full p-6 text-center text-sm font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-all border-t border-[#CAC4D0]/30">
                Access Event Archives
            </button>
        </motion.div>
    );
};

export default RecentActivity;
