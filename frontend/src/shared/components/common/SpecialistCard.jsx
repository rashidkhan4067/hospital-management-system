import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Star, Heart, Activity, Globe2, ChevronRight, Sparkles } from 'lucide-react';
import { Badge } from '@/shared/components/ui';

/**
 * 👨‍⚕️ SpecialistCard - Professional Edition
 * A refined, compact, and elegant card for the specialist network.
 */
export default function SpecialistCard({ doc, onClick, isCompact = false }) {
  return (
    <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        onClick={() => onClick && onClick(doc)}
        className="group relative bg-white border border-slate-100 rounded-[32px] p-8 overflow-hidden hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer"
    >
        {/* Subtle Depth Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Top Navigation: Compact Icons & Badges */}
        <div className="flex justify-between items-start mb-10 relative z-10">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#f5f5f7] rounded-2xl flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Stethoscope size={28} strokeWidth={1.5} />
                </div>
                <div>
                   <div className="flex items-center gap-1 mb-1">
                        {[1,2,3,4,5].map(s => <Star key={s} size={8} fill="#ffcc00" stroke="none" />)}
                   </div>
                   <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#86868b]">Clinical Specialist</p>
                </div>
            </div>
            <div className="w-10 h-10 bg-white rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-red-500 group-hover:border-red-500 transition-all">
                <Heart size={14} />
            </div>
        </div>

        {/* Content: Title & Field */}
        <div className="space-y-3 mb-10 relative z-10">
            <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors leading-none">
                    Dr. {doc.full_name}
                </h3>
                <div className={`w-1.5 h-1.5 rounded-full ${doc.is_available ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
            </div>
            <p className="text-[10px] font-black text-[#1d1d1f] uppercase tracking-widest opacity-60">
                {doc.specialization_display}
            </p>
        </div>

        {/* Characteristics: Compact Information Pills */}
        <div className="flex flex-wrap gap-2 mb-10 relative z-10">
            <div className="bg-[#f5f5f7] px-4 py-3 rounded-xl text-[9px] font-bold text-[#1d1d1f] flex items-center gap-2 border border-transparent group-hover:border-blue-100 transition-all">
                <Globe2 size={12} className="text-[#0071e3]" /> EN, UR
            </div>
            <div className="bg-[#f5f5f7] px-4 py-3 rounded-xl text-[9px] font-bold text-[#1d1d1f] flex items-center gap-2 border border-transparent group-hover:border-blue-100 transition-all">
                <Activity size={12} className="text-[#0071e3]" /> {doc.experience_years}Y EXP
            </div>
        </div>

        {/* Action Bar: Pricing & Navigation Trigger */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-50 relative z-10">
            <div>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none text-left">Consultation</p>
                <p className="text-lg font-black text-[#1d1d1f] leading-none text-left">Rs. {doc.consultation_fee}</p>
            </div>
            <motion.div 
                whileHover={{ x: 3 }}
                className="w-12 h-12 bg-[#1d1d1f] text-white rounded-xl flex items-center justify-center group-hover:bg-[#0071e3] transition-colors shadow-lg"
            >
                <ChevronRight size={20} />
            </motion.div>
        </div>
    </motion.div>
  );
}
