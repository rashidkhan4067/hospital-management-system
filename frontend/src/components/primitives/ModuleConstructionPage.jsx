import React from 'react';
import { motion } from 'framer-motion';
import { Construction, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';

/**
 * 🚧 ModuleConstructionPage (M3 Premium Placeholder)
 * Provides a highly polished "Under Construction" state for unlinked features,
 * maintaining the Google-grade premium feel instead of a raw 404.
 */
export default function ModuleConstructionPage({ 
    moduleName = 'System Module', 
    description = 'This feature is currently undergoing architectural modernization and will be available in the next clinical release.'
}) {
    const navigate = useNavigate();

    return (
        <AdminPage className="min-h-[80vh] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                className="max-w-md w-full bg-surface-bright border border-outline-variant rounded-[32px] p-8 md:p-10 elev-2 flex flex-col items-center text-center relative overflow-hidden"
            >
                {/* Background ambient glow */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" aria-hidden="true" />
                
                {/* Icon Shard */}
                <motion.div 
                    initial={{ rotate: -15 }}
                    animate={{ rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                    className="w-20 h-20 rounded-3xl bg-primary-container text-primary flex items-center justify-center mb-6 relative z-10"
                >
                    <Construction size={40} strokeWidth={1.5} />
                </motion.div>

                {/* Identity */}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 mb-3 block">
                    Under Construction
                </span>
                <h1 className="text-2xl font-bold text-text-main tracking-tight mb-4 leading-tight">
                    {moduleName}
                </h1>
                <p className="text-sm font-medium text-text-sub leading-relaxed mb-10 max-w-[280px]">
                    {description}
                </p>

                {/* Actions */}
                <div className="flex flex-col w-full gap-3 relative z-10">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-full h-12 bg-primary text-white rounded-full text-[13px] font-semibold tracking-wide 
                            transition-colors hover:brightness-110 active:scale-[0.98] elev-1 shadow-primary/20
                            flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        <ArrowLeft size={16} />
                        Return to Previous
                    </button>
                    
                    <button 
                        onClick={() => navigate('/admin/dashboard')}
                        className="w-full h-12 bg-surface-variant/50 text-text-main border border-outline-variant/50 rounded-full text-[13px] font-semibold tracking-wide 
                            transition-colors hover:bg-surface-variant hover:border-outline-variant active:scale-[0.98]
                            flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        Go to Dashboard
                        <ArrowUpRight size={16} className="opacity-60" />
                    </button>
                </div>
            </motion.div>
        </AdminPage>
    );
}
