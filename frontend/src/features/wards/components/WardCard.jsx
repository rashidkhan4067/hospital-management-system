import React from 'react';
import { BED_STATUS } from '../constants/wardConstants';

/**
 * 🛰 WARD NODE COMPONENT
 * Represents a specific clinical wing with dynamic bed allocation telemetry.
 */
export default function WardCard({ ward }) {
    if (!ward) return null;

    const { name, code, floor, total, occupied, available, maintenance, reserved, beds } = ward;
    const occupancyRate = (occupied / total * 100).toFixed(0);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden shadow-2als group transition-all hover:shadow-3als p-6 space-y-5">
            {/* Header Telemetry */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-[14px] font-black text-slate-900 dark:text-white uppercase italic leading-none">{name}</h3>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">
                        {code} • Floor {floor}
                    </p>
                </div>
                <div className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black uppercase italic border ${
                    occupancyRate > 90 ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 animate-pulse' :
                    occupancyRate > 70 ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                    'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                }`}>
                    {occupancyRate}% Full
                </div>
            </div>

            {/* Bed Matrix Shard */}
            <div className="grid grid-cols-4 gap-2.5 min-h-[140px]">
                {beds?.slice(0, 8).map((bed, idx) => {
                    const statusConfig = BED_STATUS[bed.status.toUpperCase()] || BED_STATUS.AVAILABLE;
                    return (
                        <div 
                            key={idx}
                            title={`Bed ${bed.number} (${bed.type})`}
                            className={`aspect-square rounded-xl flex items-center justify-center text-[10px] font-black italic transition-all cursor-pointer hover:scale-105 border shadow-sm ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                        >
                            {bed.number}
                        </div>
                    );
                })}
                {total > 8 && (
                   <div className="aspect-square rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-[9px] font-black text-slate-400 border border-slate-100 dark:border-white/5 uppercase tracking-tighter">
                      +{total-8}
                   </div>
                )}
            </div>

            {/* Bottom Density Report */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-white/5">
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span className="text-[8.5px] font-black uppercase text-slate-900 dark:text-white leading-none">{occupied} <span className="opacity-40 italic">Occ</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[8.5px] font-black uppercase text-slate-900 dark:text-white leading-none">{available} <span className="opacity-40 italic">Avail</span></span>
                    </div>
                    {maintenance > 0 && (
                       <div className="flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                           <span className="text-[8.5px] font-black uppercase text-slate-900 dark:text-white leading-none">{maintenance} <span className="opacity-40 italic">Maint</span></span>
                       </div>
                    )}
                </div>
                <p className="text-[9px] font-black text-accent-primary uppercase tracking-tighter cursor-pointer hover:underline">View Matrix →</p>
            </div>
        </div>
    );
}
