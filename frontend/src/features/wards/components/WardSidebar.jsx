import React from 'react';
import { BED_STATUS } from '../constants/wardConstants';
import { Card, Button } from '@/components/primitives';
import { Plus, LayoutGrid, ArrowRightLeft, Activity, Zap, AlertCircle } from 'lucide-react';
import SanaVoiceBooking from '@/components/composed/SanaVoiceBooking';
import UnifiedProtocolShard from '@/components/composed/UnifiedProtocolShard';

/**
 * 🛰 WARD SIDEBAR SHARD
 * High-fidelity telemetry cluster for occupancy and diagnostic legends.
 * Unified with global intelligence nodes to ensure DRY compliance.
 */
export default function WardSidebar({ byType = [], onAdmit, onTransfer }) {
    return (
        <div className="flex flex-col gap-6 w-full sticky top-8 pb-10">
            
            {/* 1. Bed Legend Shard */}
            <Card className="p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm space-y-6">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic leading-none">Diagnostic Legend</h4>
                <div className="flex flex-col gap-4">
                    {Object.values(BED_STATUS).map((status, idx) => (
                        <div key={idx} className="flex items-center justify-between group transition-all hover:translate-x-2">
                             <div className="flex items-center gap-4">
                                 <div className={`w-8 h-8 rounded-xl ${status.bg} border ${status.border} flex items-center justify-center text-[10px] font-black italic ${status.text} shadow-sm group-hover:scale-110 transition-transform`}>
                                     {status.id.charAt(0).toUpperCase()}
                                 </div>
                                 <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase italic tracking-tighter opacity-80">{status.label}</span>
                             </div>
                             <span className="text-[8px] font-bold text-slate-300 group-hover:text-accent-primary transition-colors">→</span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* 2. Occupancy Rate Shard (Progress Bars) */}
            {byType.length > 0 && (
                <Card className="p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm space-y-6">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic leading-none">Occupancy Velocity</h4>
                    <div className="space-y-6">
                        {byType.map((type, idx) => {
                            const rate = (type.total > 0 ? (type.occupied / type.total * 100) : 0).toFixed(0);
                            return (
                                <div key={idx} className="space-y-3">
                                    <div className="flex justify-between text-[11px] font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">
                                        <span>{type.bed_type}</span>
                                        <span className="text-accent-primary tabular-nums">{rate}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner flex">
                                        <div 
                                            className={`h-full transition-all duration-1000 ${
                                                rate > 90 ? 'bg-rose-500' :
                                                rate > 70 ? 'bg-orange-500' :
                                                'bg-emerald-500'
                                            }`}
                                            style={{ width: `${rate}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            )}

            {/* 3. Global Intelligence Node (Sana AI) */}
            <SanaVoiceBooking onStart={() => {}} title="Spatial Sana" subtitle="Neural Allocation Hub" />

            {/* 4. Spatial Protocol Shard (Blue) */}
            <UnifiedProtocolShard 
                variant="blue"
                title="Spatial Protocol"
                message="Spatial synchronization 100% efficient. Bed allocation verified across critical sectors via neural propagation."
                icon={AlertCircle}
            />

            {/* 5. Quick Action Hub */}
            <Card className="p-7 rounded-[2.5rem] bg-slate-900 dark:bg-slate-800 text-white flex flex-col gap-4 relative overflow-hidden group shadow-xl shadow-slate-900/10 border-none transition-all hover:bg-slate-800 dark:hover:bg-slate-700">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] italic leading-none opacity-40">Command Actions</h4>
                
                <div className="flex flex-col gap-3.5">
                    <button 
                        onClick={onAdmit}
                        className="w-full py-4 rounded-2xl bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-black/10 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 border-none"
                    >
                        <Plus size={16} strokeWidth={3} /> Admit Patient
                    </button>
                    <button 
                        onClick={onTransfer}
                        className="w-full py-4 rounded-2xl bg-white/10 dark:bg-white/5 text-white text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-3 transition-all hover:bg-white/20 border-none"
                    >
                        <ArrowRightLeft size={16} /> Transfer Bed
                    </button>
                </div>
            </Card>
        </div>
    );
}
