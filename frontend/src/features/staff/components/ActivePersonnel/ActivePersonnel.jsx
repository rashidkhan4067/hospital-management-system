import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Plus, UserCheck, RefreshCw, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/primitives';
import { useActivePersonnel } from '../../hooks/useActivePersonnel';
import StaffPresenceAvatar from './StaffPresenceAvatar';
import PresenceZoneCard from './PresenceZoneCard';

/**
 * 🛰️ ActivePersonnel (Live Presence Hub)
 * Refactored high-fidelity telemetry module for clinical availability.
 * Orchestrates live staff movement and zone-based workloads (OT, ER, OPD).
 */
const ActivePersonnel = memo(() => {
    const navigate = useNavigate();
    const { activeStaff, zones, isLoading, error } = useActivePersonnel();

    /**
     * 🦴 SKELETON PRESENCE
     * Pulsing identity nodes for zero-jitter acquisition.
     */
    if (isLoading) {
        return (
            <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl flex flex-col p-7 space-y-7 h-full">
                <div className="flex justify-between items-center">
                    <div className="h-6 w-32 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                    <div className="h-4 w-12 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                </div>
                <div className="flex gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-12 h-12 bg-slate-200 dark:bg-white/5 rounded-[18px] animate-pulse" />
                    ))}
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 w-full bg-slate-100 dark:bg-white/2 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="rounded-[2.5rem] bg-rose-500/5 border border-rose-500/20 p-7 text-center space-y-4 h-full">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto">
                    <RefreshCw size={24} className="animate-spin" />
                </div>
                <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest italic">Presence Logic Offline</h3>
                <p className="text-[8px] text-rose-400/60 font-bold uppercase tracking-widest leading-relaxed">Failed to synchronize live staff telemetry nodes.</p>
            </Card>
        );
    }

    return (
        <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/40 dark:border-white/5 rounded-[2.5rem] p-7 space-y-7 flex-1 shadow-2xl relative overflow-hidden group/presence h-full">
            
            {/* 👽 Mission HUD: Presence Header */}
            <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] italic text-slate-500 dark:text-slate-400 leading-none">Active Personnel</h4>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40">Live Presence Hub</p>
                 </div>
                 <div className="w-10 h-10 rounded-[18px] bg-sky-500/10 text-sky-500 flex items-center justify-center shadow-inner group-hover/presence:rotate-12 transition-transform duration-500">
                    <UserCheck size={18} />
                 </div>
            </div>

            {/* 👤 IDENTITY CLUSTER: Avatar Stack */}
            <div className="flex flex-wrap gap-4 relative z-10 pb-6 border-b border-slate-100 dark:border-white/10">
                {activeStaff.length > 0 ? (
                    activeStaff.map((staff) => (
                        <StaffPresenceAvatar key={staff.id} staff={staff} />
                    ))
                ) : (
                    <div className="flex-1 text-[9px] font-black text-slate-300 uppercase italic tracking-widest py-4">No on-duty personnel detected</div>
                )}
                
                {/* ➕ Assignment Gateway */}
                <button 
                    onClick={() => navigate('/staff/assign')}
                    className="w-12 h-12 rounded-[18px] bg-white/50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 hover:bg-sky-500/5 transition-all duration-500 group/add active:scale-90"
                >
                   <Plus size={18} className="group-hover/add:rotate-90 transition-transform" />
                </button>
            </div>

            {/* 🏥 MISSION CONTROL: Zone Workloads */}
            <div className="space-y-4 pt-2">
                {zones.map((zone) => (
                    <PresenceZoneCard 
                        key={zone.id} 
                        zone={zone} 
                        onClick={() => navigate(`/departments/${zone.zone_id}`)}
                    />
                ))}
            </div>

            {/* 🌌 Atmospheric Glow */}
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-sky-500/5 blur-[100px] rounded-full pointer-events-none group-hover/presence:bg-sky-500/10 transition-colors" />
        </Card>
    );
});

ActivePersonnel.displayName = 'ActivePersonnel';

export default ActivePersonnel;
