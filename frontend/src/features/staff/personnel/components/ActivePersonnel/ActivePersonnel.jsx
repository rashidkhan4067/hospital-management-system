import React, { memo } from 'react';
import { Plus, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/features/core_management/dashboard/components/DashboardCard';
import { useActivePersonnel } from '../../hooks/useActivePersonnel';
import StaffPresenceAvatar from './StaffPresenceAvatar';
import PresenceZoneCard from './PresenceZoneCard';
import { useTheme } from '@/core/theme/ThemeContext';

/**
 * 🛰️ ActivePersonnel (Live Presence Hub)
 */
const ActivePersonnel = memo(() => {
    const navigate = useNavigate();
    const { accentColor } = useTheme();
    const { activeStaff, zones, isLoading } = useActivePersonnel();

    return (
        <DashboardCard 
            title="On-Call Matrix" 
            subtitle="Personnel Presence Log"
            icon={UserCheck}
            loading={isLoading}
            className="group"
            actions={
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">Global Presence Active</span>
                </div>
            }
        >
            {/* 👤 IDENTITY CLUSTER: Avatar Stack */}
            <div className="flex flex-wrap gap-4 relative z-10 pb-10 border-b border-slate-100 dark:border-white/10 mb-8">
                {activeStaff && activeStaff.length > 0 ? (
                    activeStaff.map((staff) => (
                        <StaffPresenceAvatar key={staff.id} staff={staff} />
                    ))
                ) : (
                    <div className="flex-1 py-4 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-400" />
                            <p className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-widest italic leading-none">Protocol: Standby</p>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">No Active Personnel Sessions Detected</p>
                    </div>
                )}
                
                {/* ➕ Assignment Gateway */}
                <button 
                    onClick={() => navigate('/staff/assign')}
                    className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white hover:border-accent-primary/50 transition-all duration-300 group/add active:scale-95 shadow-sm"
                >
                   <Plus size={20} className="group-hover/add:rotate-90 transition-transform opacity-100" />
                </button>
            </div>

            {/* 🏥 MISSION CONTROL: Zone Workloads */}
            <div className="space-y-4">
                {zones && zones.length > 0 ? (
                    zones.map((zone) => (
                        <PresenceZoneCard 
                            key={zone.id} 
                            zone={zone} 
                            onClick={() => navigate(`/departments/${zone.zone_id}`)}
                        />
                    ))
                ) : (
                    <div className="py-12 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 rounded-[2rem] shadow-inner text-center">
                        <UserCheck size={32} className="text-slate-300 dark:text-white/10 mb-4" />
                        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] italic">All Operational Zones Nominal</p>
                    </div>
                )}
            </div>

        </DashboardCard>
    );
});

ActivePersonnel.displayName = 'ActivePersonnel';

export default ActivePersonnel;


