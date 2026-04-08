import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, RefreshCw, Layers } from 'lucide-react';
import { Card } from '@/components/primitives';
import { useActivityFeed } from '../../hooks/useActivityFeed';
import ActivityItem from './ActivityItem';

/**
 * 🛰️ ActivityFeed (Real-Time Event Stream)
 * Refactored high-fidelity telemetry module for systemic awareness.
 * Orchestrates multi-departmental audit trails and operational alerts.
 */
const ActivityFeed = memo(() => {
    const { activities, isLoading, error } = useActivityFeed();

    /**
     * 🦴 SKELETON STREAM
     * Layout-accurate pulsing list for smooth acquisition.
     */
    if (isLoading) {
        return (
            <Card className="rounded-[2.5rem] bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/40 dark:border-white/5 p-7 space-y-6 h-full min-h-[500px]">
                <div className="flex justify-between items-center">
                    <div className="h-6 w-32 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                    <Activity size={18} className="text-slate-300 animate-pulse" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-16 w-full bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="rounded-[2.5rem] bg-rose-500/5 border border-rose-500/20 p-7 text-center space-y-4 h-full min-h-[300px] flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto">
                    <RefreshCw size={24} className="animate-spin" />
                </div>
                <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest italic">Event Logic Lost</h3>
                <p className="text-[8px] text-rose-400/60 font-bold uppercase tracking-widest px-4">Failed to synchronize systemic event matrix.</p>
            </Card>
        );
    }

    return (
        <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/40 dark:border-white/5 rounded-[2.5rem] p-7 flex flex-col shadow-2xl relative overflow-hidden h-full group/feed">
            
            {/* 🛸 HUD: Event Stream Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] italic text-slate-800 dark:text-white leading-none">System Activity</h4>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Event Stream
                    </p>
                </div>
                <div className="w-10 h-10 rounded-[18px] bg-slate-500/10 text-slate-500 flex items-center justify-center shadow-inner group-hover/feed:rotate-12 transition-transform duration-500">
                    <Activity size={18} />
                </div>
            </div>

            {/* 📜 VIRTUALIZED FEED: Interactive Event Nodes */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                <AnimatePresence initial={false}>
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <ActivityItem key={activity.id} activity={activity} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-300 dark:text-white/5">
                            <Layers size={48} className="mb-4 opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-widest italic">Matrix is quiet...</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* 🌌 Atmospheric HUD Ornament */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-slate-500/5 blur-[120px] rounded-full pointer-events-none group-hover/feed:bg-slate-500/10 transition-colors" />
        </Card>
    );
});

ActivityFeed.displayName = 'ActivityFeed';

export default ActivityFeed;
