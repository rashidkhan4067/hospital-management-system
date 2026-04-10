import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/**
 * 📟 MiniWidget (Performance Engineered)
 * Optimized via memoization to ensure tactical matrix nodes are extremely light.
 */
const MiniWidget = memo(({ 
    title, 
    value, 
    detail, 
    subValue,
    icon: Icon, 
    color = "text-primary",
    onClick 
}) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="flex items-center gap-4 p-5 bg-surface-bright border border-outline/20 rounded-[28px] shadow-sm hover:shadow-md transition-all cursor-pointer group h-full"
        >
            <div className={`w-12 h-12 rounded-2xl bg-surface flex items-center justify-center ${color} group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner`}>
                {Icon && <Icon size={20} strokeWidth={2.5} />}
            </div>
            
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[9px] font-black uppercase text-text-sub tracking-[0.15em] opacity-40 truncate leading-none mb-1">
                    {title}
                </span>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-text-main tracking-tighter leading-none">
                        {value}
                    </span>
                    {(detail || subValue) && (
                        <span className="text-[9px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-tighter shrink-0">
                            {detail || subValue}
                        </span>
                    )}
                </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                <ChevronRight size={14} className="text-primary" />
            </div>
        </motion.div>
    );
});

MiniWidget.displayName = 'MiniWidget';
export default MiniWidget;
