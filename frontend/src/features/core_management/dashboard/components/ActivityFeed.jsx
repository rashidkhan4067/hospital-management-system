import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, UserMinus, Settings, FileText, CheckCircle2 } from 'lucide-react';

const activities = [
    { id: 1, type: 'admission', title: 'New Admission: John Doe', time: '10:24 AM', meta: 'Ward B-12', icon: UserPlus, color: 'text-emerald-500' },
    { id: 2, type: 'discharge', title: 'Discharge: Maria Garcia', time: '09:45 AM', meta: 'Obstetrics', icon: UserMinus, color: 'text-blue-500' },
    { id: 3, type: 'system', title: 'Backup Recovery Point Created', time: '09:00 AM', meta: 'Cloud Node 4', icon: Settings, color: 'text-[#6750A4]' },
    { id: 4, type: 'action', title: 'New Clinical Policy Propagated', time: '08:30 AM', meta: 'Admin Hub', icon: FileText, color: 'text-amber-500' },
    { id: 5, type: 'admission', title: 'New Admission: Sarah Smith', time: '08:15 AM', meta: 'Pediatrics', icon: UserPlus, color: 'text-emerald-500' },
    { id: 6, type: 'discharge', title: 'Discharge: Robert Chen', time: '07:50 AM', meta: 'Emergency', icon: UserMinus, color: 'text-blue-500' },
];

/**
 * 📟 ActivityFeed (Chronological Log Node)
 * A high-volume stream of facility operations and routine clinical movements.
 */
const ActivityFeed = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col bg-[#F7F2FA]/30 border border-[#CAC4D0]/20 rounded-[32px] overflow-hidden h-full"
        >
            <div className="p-8 pb-4 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-[#49454F] tracking-[0.2em] opacity-40">Operational Log</span>
                    <h3 className="text-xl font-black text-[#1C1B1F] tracking-tight">Timeline Hub</h3>
                </div>
                <div className="p-2 bg-white rounded-full border border-[#CAC4D0]/20 text-[#49454F]">
                    <CheckCircle2 size={16} />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[400px] p-4 pt-0 scrollbar-hide space-y-1">
                {activities.map((act, idx) => (
                    <div 
                        key={act.id} 
                        className="flex items-center gap-4 p-4 hover:bg-white rounded-2xl transition-all group cursor-default"
                    >
                        <div className={`w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center ${act.color} group-hover:scale-110 transition-transform`}>
                            <act.icon size={16} />
                        </div>
                        
                        <div className="flex flex-col flex-1 min-w-0">
                            <h4 className="text-[13px] font-bold text-[#1C1B1F] truncate leading-tight">{act.title}</h4>
                            <span className="text-[10px] font-medium text-[#49454F] opacity-60 tracking-tight">{act.meta}</span>
                        </div>

                        <span className="text-[10px] font-black tabular-nums text-[#49454F] opacity-30 whitespace-nowrap">
                            {act.time}
                        </span>
                    </div>
                ))}
            </div>

            <div className="p-4 pt-0">
                <button className="w-full py-3 bg-white border border-[#CAC4D0]/30 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] text-[#49454F] hover:bg-primary hover:text-white transition-all">
                    Synchronize Historical Records
                </button>
            </div>
        </motion.div>
    );
};

export default ActivityFeed;
