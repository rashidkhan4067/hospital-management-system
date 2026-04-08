import React from 'react';
import { MoreHorizontal, Calendar } from 'lucide-react';
import { Card, Badge, Button } from '@/components/primitives';

/**
 * 🏥 Operating Protocol Matrix
 * Features responsive horizontal scroll with a dynamic shadow indicator.
 * Strictly follows the Theme Accent for its interactive and status nodes.
 *  Optimized for Light/Dark Mode administrative clinical environments.
 */
import { motion } from 'framer-motion';

const LiveAppointments = ({ appointments, onExport, onViewPatient }) => {
    return (
        <Card className="matrix-card rounded-[2.5rem] overflow-hidden transition-all duration-700 bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl shadow-xl border border-transparent hover:border-accent-primary/10 group">
            
            {/* 🏥 Protocol Hub Header */}
            <div className="p-5 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_10px_rgba(20,184,166,0.6)]" />
                        <h3 className="text-lg font-black italic uppercase tracking-tighter text-slate-800 dark:text-white leading-none">Live Appointments</h3>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] opacity-60 ml-5">Real-time Patient Flow Registry</p>
                </div>
                <Button 
                    onClick={onExport}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-lg border-none flex items-center gap-2"
                >
                    <Calendar size={14} /> Data Export Shard
                </Button>
            </div>

            <div className="relative w-full z-10">
                <div className="overflow-x-auto custom-scrollbar w-full">
                    <table className="w-full text-left min-w-[700px] border-separate border-spacing-y-1.5 px-5 pb-4">
                        <thead>
                            <tr className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] italic opacity-40">
                                <th className="px-5 pb-2">Patient Profile</th>
                                <th className="px-5 pb-2">Specialization</th>
                                <th className="px-5 pb-2">Arrival Node</th>
                                <th className="px-5 pb-2">Triage Status</th>
                                <th className="px-5 pb-2 text-right">Gate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((row, idx) => (
                                <motion.tr 
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                    key={idx} 
                                    className="group/row cursor-default"
                                >
                                    <td className="px-5 py-3.5 bg-white/50 dark:bg-white/5 first:rounded-l-2xl last:rounded-r-2xl group-hover/row:bg-accent-primary/5 transition-all duration-300 border-y border-transparent group-hover/row:border-accent-primary/10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary text-[10px] font-black group-hover/row:scale-110 transition-transform shadow-inner">
                                                {row.name.charAt(0)}
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                              <span className="text-[11px] font-black uppercase italic tracking-tight text-slate-900 dark:text-white leading-none">{row.name}</span>
                                              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest opacity-60">UID-429{idx}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider italic">{row.type}</td>
                                    <td className="px-5 py-3.5 text-[10px] font-black text-accent-primary italic tabular-nums">{row.time}</td>
                                    <td className="px-5 py-3.5">
                                        <Badge className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border-none shadow-sm flex items-center gap-2 w-fit ${
                                            row.status === 'In-Session' ? 'bg-sky-500/10 text-sky-500 shadow-sky-500/5' : row.status === 'Waiting' ? 'bg-emerald-500/10 text-emerald-500 shadow-emerald-500/5' : 'bg-amber-500/10 text-amber-500 shadow-amber-500/5'
                                        }`}>
                                            <div className={`w-1 h-1 rounded-full ${row.status === 'In-Session' ? 'bg-sky-500' : row.status === 'Waiting' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                                            {row.status}
                                        </Badge>
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                      <button 
                                        onClick={() => onViewPatient(row.id || idx)}
                                        className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center justify-center text-slate-400 group-hover/row:text-accent-primary ml-auto bg-transparent border-none"
                                      >
                                        <MoreHorizontal size={16} />
                                      </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* 🔮 Security Telemetry Footer */}
            <div className="px-6 py-4 bg-slate-50/50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 flex items-center justify-between relative z-10">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Identity Gate Pulse: Optimal</span>
               </div>
               <span className="text-[8px] font-bold text-slate-400/40 uppercase tracking-[0.4em] italic pointer-events-none">© 2026 AL SHIFAA CLINICAL HUB</span>
            </div>

            {/* 🌌 High-Fidelity Accent Shard */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-primary/2 blur-[120px] rounded-full pointer-events-none" />
        </Card>
    );
};

export default LiveAppointments;
