import React from 'react';
import { Activity, Beaker, Scissors, Stethoscope, ChevronRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * 🛰️ ClinicalTimeline (EMR Standard)
 * High-density chronological story of a patient's medical journey.
 */
export default function ClinicalTimeline({ events }) {
  const ICON_MAP = {
    'Consultation': { icon: Stethoscope, color: 'text-primary bg-primary/10 border-primary/20' },
    'Lab Report': { icon: Beaker, color: 'text-success bg-success/10 border-success/20' },
    'Surgical': { icon: Scissors, color: 'text-error bg-error/10 border-error/20' },
    'Imaging': { icon: Activity, color: 'text-warning bg-warning/10 border-warning/20' },
  };

  return (
    <div className="flex flex-col gap-8 relative px-4">
      {/* ⛓️ The Vertical Spine */}
      <div className="absolute left-[31px] top-6 bottom-6 w-0.5 bg-outline/20" />

      {events.map((event, idx) => {
        const config = ICON_MAP[event.type] || { icon: FileText, color: 'text-text-sub bg-surface border-outline' };
        
        return (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-6 relative group"
          >
            {/* 🎯 Timeline Node */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center border shrink-0 z-10 transition-transform group-hover:scale-110 shadow-sm ${config.color}`}>
              <config.icon size={16} />
            </div>

            {/* 📄 Event Card */}
            <div className="flex-1 bg-surface-bright border border-outline/30 rounded-2xl p-5 hover:border-primary/30 transition-all hover:shadow-md cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{event.type}</span>
                <span className="text-[11px] font-bold text-text-sub">{event.date}</span>
              </div>
              <h4 className="text-sm font-black text-text-main group-hover:text-primary transition-colors">{event.title}</h4>
              <p className="text-xs font-medium text-text-sub mt-2 leading-relaxed opacity-80">{event.notes || event.result}</p>
              
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-outline/10">
                <span className="text-[9px] font-bold text-text-sub uppercase tracking-wider">Provider: {event.provider}</span>
                <ChevronRight size={14} className="text-text-sub opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
