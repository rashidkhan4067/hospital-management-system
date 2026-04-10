import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, UserMinus, ShieldAlert, CheckSquare, Clock, ArrowRight } from 'lucide-react';

const alerts = [
    { 
        id: 1, 
        category: 'EMERGENCY', 
        title: 'Cardiac Arrest - Room 402', 
        time: 'Immediate', 
        severity: 'critical', 
        icon: AlertTriangle 
    },
    { 
        id: 2, 
        category: 'CRITICAL', 
        title: 'Lab Results: Patient #812', 
        time: '4m ago', 
        severity: 'high', 
        icon: ShieldAlert 
    },
    { 
        id: 3, 
        category: 'APPROVAL', 
        title: 'Morphine Request - ER', 
        time: '12m ago', 
        severity: 'medium', 
        icon: CheckSquare 
    },
    { 
        id: 4, 
        category: 'CRITICAL', 
        title: 'Blood Type O- Low Stock', 
        time: '22m ago', 
        severity: 'high', 
        icon: AlertTriangle 
    }
];

/**
 * 🚨 AlertsPanel (Command Triage Node)
 * Focuses on high-urgency clinical incidents and pending facility authorizations.
 */
const AlertsPanel = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col bg-white border border-[#CAC4D0]/30 rounded-[32px] overflow-hidden shadow-sm h-full"
        >
            <div className="p-8 border-b border-[#CAC4D0]/20 flex items-center justify-between bg-[#FFFBFB]">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-rose-700 tracking-[0.2em]">Prioritized Response</span>
                    <h3 className="text-xl font-black text-[#1C1B1F] tracking-tight">Clinical Alerts</h3>
                </div>
                <div className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-[10px] font-black uppercase">
                    4 Active
                </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[600px] scrollbar-hide">
                {alerts.map((alert, idx) => (
                    <AlertItem key={alert.id} alert={alert} index={idx} />
                ))}
            </div>

            <button className="w-full p-6 text-center text-[11px] font-black uppercase tracking-[0.2em] text-[#49454F] hover:bg-surface-variant/20 transition-all border-t border-[#CAC4D0]/20 flex items-center justify-center gap-2">
                Launch Emergency Protocol Center <ArrowRight size={14} />
            </button>
        </motion.div>
    );
};

const AlertItem = ({ alert, index }) => {
    const severityStyles = {
        critical: 'bg-rose-500 text-white',
        high: 'bg-rose-50 text-rose-600 border border-rose-100',
        medium: 'bg-amber-50 text-amber-700 border border-amber-100',
    };

    const Icon = alert.icon;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 flex items-start gap-4 border-b border-[#CAC4D0]/10 hover:bg-surface-variant/10 transition-colors last:border-0 cursor-pointer group`}
        >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${severityStyles[alert.severity]}`}>
                <Icon size={20} strokeWidth={2.5} className={alert.severity === 'critical' ? 'animate-pulse' : ''} />
            </div>
            
            <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                        alert.severity === 'medium' ? 'text-amber-800' : 'text-rose-700'
                    }`}>
                        {alert.category}
                    </span>
                    <span className="text-[10px] font-bold text-[#49454F] opacity-40 flex items-center gap-1">
                        <Clock size={10} /> {alert.time}
                    </span>
                </div>
                <h4 className="text-[15px] font-bold text-[#1C1B1F] truncate group-hover:text-primary transition-colors">
                    {alert.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                    <div className="h-1 flex-1 bg-surface-variant/30 rounded-full overflow-hidden">
                        <div className={`h-full ${alert.severity === 'medium' ? 'bg-amber-500' : 'bg-rose-500'} w-2/3`} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AlertsPanel;
