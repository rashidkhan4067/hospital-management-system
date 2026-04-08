import React from 'react';
import { Eye, CheckCircle, XCircle, Clock, Calendar, Users, MapPin, Globe, Mic } from 'lucide-react';
import { Badge, Button } from '@/components/primitives';

/**
 * 🛰 AppointmentsTable — High-density clinical visit matrix
 * Optimized to remove vertical blank spaces.
 */
const AppointmentsTable = ({ appointments = [], isLoading = false, onStatusChange, onViewDetail, onCheckIn }) => {
   if (isLoading) return (
      <div className="w-full h-80 flex flex-col items-center justify-center gap-4 bg-white/50 dark:bg-slate-900/10 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-2als">
         <div className="w-12 h-12 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Synchronizing Clinical Data Hub...</p>
      </div>
   );

   if (appointments.length === 0) return (
      <div className="w-full h-80 flex flex-col items-center justify-center gap-5 bg-white/50 dark:bg-slate-900/10 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-2als">
         <div className="w-16 h-16 rounded-[2rem] bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300 dark:text-slate-700 border border-slate-200 dark:border-white/10 shadow-inner group">
            <Calendar size={40} className="group-hover:scale-110 transition-transform opacity-30" />
         </div>
         <div className="text-center space-y-0.5">
            <h3 className="text-lg font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">Clinical Record Void</h3>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 italic">No medical appointments matching your criteria.</p>
         </div>
         <Button className="px-6 py-2.5 rounded-[1.5rem] bg-accent-primary text-white text-[9px] font-black uppercase tracking-widest border-none shadow-xl shadow-accent-primary/20">Book First Entry</Button>
      </div>
   );

   return (
      <div className="w-full bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col p-3 lg:p-6">
         <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/5 blur-[80px] rounded-full pointer-events-none" />

         <div className="w-full overflow-x-auto relative z-10 scrollbar-hide">
            <table className="w-full text-left border-collapse table-fixed min-w-[850px]">
               <thead>
                  <tr className="border-b border-slate-100 dark:border-white/5">
                     <th className="w-[30%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap">Personnel & Patient HUB</th>
                     <th className="w-[18%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap">Date Matrix</th>
                     <th className="w-[18%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap">Status Matrix</th>
                     <th className="w-[12%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap">Channel</th>
                     <th className="w-[22%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right whitespace-nowrap">Controls</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                  {appointments.map((a, idx) => (
                     <tr key={idx} className="group/row hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300">
                        <td className="px-3 py-6">
                           <div className="flex items-center gap-4">
                              <div className="relative group cursor-pointer" onClick={() => onViewDetail(a)}>
                                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 flex items-center justify-center text-accent-primary font-black text-xs uppercase border border-accent-primary/10 italic shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                                    {a.patient?.full_name?.charAt(0) || 'P'}
                                 </div>
                                 <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-accent-primary border-2 border-white dark:border-slate-900 text-white flex items-center justify-center shadow-lg">
                                    <Clock size={8} />
                                 </div>
                              </div>
                              <div className="flex flex-col min-w-0">
                                 <p className="text-[13px] font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none group-hover/row:text-accent-primary transition-colors truncate">
                                    {a.patient?.full_name || 'Al Shifaa Patient'}
                                 </p>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2 opacity-60">
                                    <Users size={12} className="text-accent-primary" /> {a.doctor?.full_name || 'Dr. To Be Assigned'}
                                 </p>
                              </div>
                           </div>
                        </td>

                        <td className="px-3 py-6 text-center">
                           <div className="flex flex-col items-center gap-1 shrink-0">
                              <p className="text-[13px] font-black text-slate-900 dark:text-white italic tracking-tighter tabular-nums leading-none">
                                 {a.appointment_date}
                              </p>
                              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[9px] font-black uppercase italic text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 leading-none">
                                 {a.start_time || '09:00 AM'}
                              </div>
                           </div>
                        </td>

                        <td className="px-3 py-6 text-center">
                           <div className="flex flex-col items-center gap-2">
                              {a.status === 'scheduled' || a.status === 'pending' ? (
                                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase italic border border-emerald-500/20 shadow-sm leading-none">
                                    <Clock size={12} /> Confirmed
                                 </div>
                              ) : a.status === 'completed' ? (
                                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase italic border border-blue-500/20 leading-none shadow-sm">
                                    <CheckCircle size={12} /> Closed
                                 </div>
                              ) : (
                                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 text-[9px] font-black uppercase italic border border-rose-500/20 leading-none shadow-sm">
                                    <XCircle size={12} /> Aborted
                                 </div>
                              )}
                           </div>
                        </td>

                        <td className="px-3 py-6 text-center">
                           <div className="flex justify-center">
                              {a.channel === 'voice' ? (
                                 <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20 shadow-sm">
                                    <Mic size={18} className="animate-pulse" />
                                 </div>
                              ) : (
                                 <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-sm">
                                    <Globe size={18} />
                                 </div>
                              )}
                           </div>
                        </td>

                        <td className="px-3 py-6 text-right">
                           <div className="flex items-center justify-end gap-2.5 opacity-0 group-hover/row:opacity-100 transition-opacity translate-x-2 group-hover/row:translate-x-0 transition-transform">
                              <button type="button" onClick={() => onViewDetail(a)} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-accent-primary border border-slate-200 dark:border-white/10 transition-all hover:scale-110 shadow-sm whitespace-nowrap"><Eye size={16} /></button>
                              
                              {(a.status === 'scheduled' || a.status === 'pending') && onCheckIn ? (
                                 <button type="button" onClick={() => onCheckIn(a)} className="h-9 px-4 rounded-xl bg-accent-primary text-white text-[9px] font-black uppercase italic tracking-widest border-none transition-all hover:scale-105 shadow-lg shadow-accent-primary/20 whitespace-nowrap">Check-In</button>
                              ) : (
                                 <button type="button" onClick={() => onStatusChange(a, 'completed')} className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 transition-all hover:scale-110 shadow-sm whitespace-nowrap"><CheckCircle size={16} /></button>
                              )}
                              
                              <button type="button" onClick={() => onStatusChange(a, 'cancelled')} className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20 transition-all hover:scale-110 shadow-sm whitespace-nowrap"><XCircle size={16} /></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* ─── Simplified Pagination ─── */}
         <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
            <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic leading-none">Clinical Systems v4.2</span>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-slate-900/60 dark:text-white/40 italic uppercase tracking-tighter tabular-nums leading-none mr-2">Page 01</span>
               <div className="flex gap-1.5">
                  <Button className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 p-0 shadow-sm min-w-0">&lt;</Button>
                  <Button className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-accent-primary text-white border-none p-0 shadow-lg font-black italic shadow-accent-primary/20 min-w-0">01</Button>
                  <Button className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 p-0 shadow-sm min-w-0">&gt;</Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AppointmentsTable;
