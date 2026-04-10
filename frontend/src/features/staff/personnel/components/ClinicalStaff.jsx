import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, ArrowRight, Activity, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// ── Layout & Shared UI
import DashboardCard from '@/features/core_management/dashboard/components/DashboardCard';
import EmptyState from '@/features/core_management/dashboard/components/EmptyState';
import { useClinicalStaff } from '../hooks/useClinicalStaff';
import { useTheme } from '@/core/theme/ThemeContext';

/**
 * 🏥 ClinicalStaff (Personnel Awareness Module)
 * Monitors real-time availability and department allocation of clinical staff.
 */
const ClinicalStaff = memo(() => {
    const navigate = useNavigate();
    const { accentColor } = useTheme();
    const { staff = [], loading, error } = useClinicalStaff();

    if (error) {
        return (
            <DashboardCard title="Clinical Roster" subtitle="Telemetry Offline" icon={Users} className="h-full">
                <EmptyState title="SIGNAL LOST" subtitle="Staff telemetry nodes disconnected." />
            </DashboardCard>
        );
    }

    return (
        <DashboardCard 
            title="Clinical Roster" 
            subtitle={`${staff?.length || 0} Personnel Online`} 
            icon={Users}
            loading={loading}
            className="h-full flex flex-col"
            telemetryType="clinical"
            actions={
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Live Beam</span>
                </div>
            }
        >
            <div className="flex flex-col h-full overflow-hidden">
                <AnimatePresence mode="wait">
                    {staff.length === 0 ? (
                        <EmptyState 
                            title="SYSTEM NOMINAL" 
                            subtitle="Awaiting clinical personnel nodes." 
                            icon={Users} 
                            className="h-[300px]"
                        />
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                            {staff.map((member) => (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-5 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer group/row"
                                    onClick={() => navigate(`/admin/staff/${member.id}`)}
                                >
                                    {/* AVATAR SHARD */}
                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white text-xs font-black transition-all duration-300 shadow-sm group-hover/row:scale-110 flex-shrink-0">
                                        {member.initials || member.name?.charAt(0)}
                                    </div>

                                    {/* CLINICAL DATA */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase leading-none tracking-tight truncate group-hover/row:text-accent-primary transition-colors mb-2">
                                            {member.name}
                                        </h4>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">
                                            {member.specialty || member.role}
                                        </p>
                                    </div>

                                    {/* STATUS TELEMETRY */}
                                    <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shrink-0 transition-all border ${member.status?.toLowerCase() === 'active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'}`}>
                                        {member.status}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                <div className="mt-auto pt-4 w-full">
                    <button 
                        onClick={() => navigate('/admin/staff')}
                        className="w-full py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:scale-[1.01] active:scale-95 shadow-2xl flex items-center justify-center gap-4 border-none"
                    >
                        Intel Center <ArrowRight size={16} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </DashboardCard>
    );
});

ClinicalStaff.displayName = 'ClinicalStaff';
export default ClinicalStaff;


