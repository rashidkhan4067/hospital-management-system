import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CalendarPlus, BedDouble, ReceiptText, Zap } from 'lucide-react';

const actions = [
    { id: 'patient', label: 'Add Patient', icon: UserPlus, color: 'bg-[#6750A4] text-white', hover: 'hover:bg-[#4F378B]' },
    { id: 'appointment', label: 'Book Appointment', icon: CalendarPlus, color: 'bg-emerald-600 text-white', hover: 'hover:bg-emerald-700' },
    { id: 'admit', label: 'Admit Patient', icon: BedDouble, color: 'bg-blue-600 text-white', hover: 'hover:bg-blue-700' },
    { id: 'invoice', label: 'Generate Invoice', icon: ReceiptText, color: 'bg-amber-600 text-white', hover: 'hover:bg-amber-700' },
];

/**
 * ⚡ QuickActions (Operational Warp Node)
 * High-priority action triggers for rapid facility entry and coordination.
 */
const QuickActions = () => {
    return (
        <div className="flex flex-wrap items-center gap-4">

            {/* 🏷️ Action Label */}
            <div className="flex items-center gap-2 mr-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Zap size={16} fill="currentColor" />
                </div>
                <span className="text-xs font-black uppercase text-primary tracking-[0.2em]">Quick Actions</span>
            </div>

            {/* 🚀 Dynamic CTAs */}
            {actions.map((action, idx) => (
                <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                        flex items-center gap-3 px-6 py-3 rounded-full text-sm font-black tracking-tight shadow-md transition-all
                        ${action.color} ${action.hover}
                    `}
                >
                    <action.icon size={18} strokeWidth={2.5} />
                    {action.label}
                </motion.button>
            ))}
            
            {/* 🔍 Global Meta-Search Shortcut */}
            <div className="ml-auto hidden xl:flex items-center gap-2 group">
                <span className="text-[10px] font-black text-[#49454F] opacity-40 uppercase tracking-widest group-hover:opacity-100 transition-opacity">Press / to search matrix</span>
            </div>
        </div>
    );
};

export default QuickActions;
