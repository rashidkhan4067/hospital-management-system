import React from 'react';
import { MoreHorizontal, Calendar } from 'lucide-react';
import { Card, Badge, Button } from '../../../ui';

/**
 * 🏥 Operating Protocol Matrix
 * Features responsive horizontal scroll with a dynamic shadow indicator.
 * Strictly follows the Theme Accent for its interactive and status nodes.
 *  Optimized for Light/Dark Mode administrative clinical environments.
 */
const OperatingProtocol = ({ appointments }) => {
    return (
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 lg:shadow-[8px_8px_16px_#e2e8f0,-8px_-8px_16px_#ffffff] dark:lg:shadow-none">
            <div className="p-6 md:p-10 border-b border-slate-50 dark:border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white dark:bg-white/5">
                <div className="space-y-1.5 min-w-0">
                    <h3 className="text-lg md:text-xl font-extrabold italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none border-b-2 border-accent-primary pb-2 inline-block truncate max-w-full">Operating Protocol HUB</h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] opacity-60 truncate">Real-time scheduling matrix synchronization</p>
                </div>
                <Button className="bg-accent-primary/5 hover:bg-accent-primary text-accent-primary hover:text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 border border-accent-primary/20 shrink-0">
                    <Calendar size={14} /> Full View
                </Button>
            </div>

            {/* 🌊 RESPONSIVE SCROLL MATRIX ENGINE */}
            <div className="relative group/table w-full">
                {/* 🌈 Scroll Overflow Shadow (Mobile Only) */}
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none z-10 opacity-0 group-hover/table:opacity-100 transition-opacity lg:hidden" />
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-slate-900 to-transparent pointer-events-none z-10 opacity-0 group-hover/table:opacity-100 transition-opacity lg:hidden" />
                
                <div className="overflow-x-auto custom-scrollbar w-full">
                    <table className="w-full text-left min-w-[800px] border-separate border-spacing-y-4 px-6 md:px-8 pb-8">
                        <thead>
                            <tr className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] italic opacity-40">
                                <th className="px-6 pb-2">Identity Shard</th>
                                <th className="px-6 pb-2">Consult Target</th>
                                <th className="px-6 pb-2">Sync Pulse</th>
                                <th className="px-6 pb-2">Neural Status</th>
                                <th className="px-6 pb-2 text-right">Gate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((row, idx) => (
                                <tr key={idx} className="group/row transition-all duration-300">
                                    <td className="px-6 py-4 md:py-5 bg-slate-50/50 dark:bg-white/5 first:rounded-l-2xl last:rounded-r-2xl group-hover/row:bg-accent-primary/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary text-[10px] font-black uppercase group-hover/row:scale-110 transition-transform shrink-0 shadow-inner">
                                                {row.name.charAt(0)}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                              <span className="text-xs font-black uppercase italic tracking-tighter text-slate-900 dark:text-white truncate max-w-[120px]">{row.name}</span>
                                              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest opacity-60">ID: SHARD-0{idx+1}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 md:py-5 text-[9px] md:text-[10px] font-bold md:font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em]">{row.type}</td>
                                    <td className="px-6 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-accent-primary italic">{row.time}</td>
                                    <td className="px-6 py-4 md:py-5">
                                        <Badge className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[6px] md:text-[8px] font-black uppercase tracking-widest border-none ${
                                            row.status === 'In-Session' ? 'bg-status-info/10 text-status-info' : row.status === 'Waiting' ? 'bg-status-success/10 text-status-success' : 'bg-status-warning/10 text-status-warning'
                                        }`}>{row.status}</Badge>
                                    </td>
                                    <td className="px-6 py-4 md:py-5 text-right">
                                      <button className="w-8 h-8 rounded-lg hover:bg-accent-primary hover:text-white transition-all flex items-center justify-center text-slate-300 dark:text-slate-700 ml-auto group-hover/row:text-accent-primary group-hover/row:scale-110">
                                        <MoreHorizontal size={14} />
                                      </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="px-8 py-4 bg-slate-50/50 dark:bg-black/10 border-t border-slate-50 dark:border-white/5 flex items-center justify-between text-[7px] md:text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] italic">
               <span>Shard Sync Status: Operational</span>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                 <span className="opacity-0 lg:opacity-60 transition-opacity">100% Core Matrix Stable</span>
               </div>
            </div>
        </Card>
    );
};

export default OperatingProtocol;
