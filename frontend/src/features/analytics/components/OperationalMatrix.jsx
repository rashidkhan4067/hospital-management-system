import React from 'react';
import { Card } from '@/shared/components/ui';
import { Star, Download, FileText, ChevronRight, Zap, Users, ClipboardCheck, BarChart3 } from 'lucide-react';

/**
 * 🛰 OperationalMatrix — Clinical Command Deep-Dive Shard
 * Fully recreated for a professional, high-density telemetry experience.
 */
const OperationalMatrix = ({ doctorVolume = [] }) => {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mt-4">

         {/* 📋 Practitioner Matrix (Left Column) */}
         <Card className="lg:col-span-8 p-6 lg:p-10 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[80px] rounded-full pointer-events-none" />

            {/* Header Matrix */}
            <div className="flex items-center justify-between relative z-10 shrink-0">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-inner group-hover:scale-110 transition-transform">
                     <Users size={24} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                     <h2 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">Practitioner Matrix</h2>
                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Personnel Benchmark Matrix</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <button className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase text-slate-500 hover:text-accent-primary transition-all shadow-sm">Volume ▾</button>
                  <button className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase text-slate-500 hover:text-accent-primary transition-all shadow-sm">Rating</button>
               </div>
            </div>

            {/* Table Matrix — Ultra-Tight Responsive Layout */}
            <div className="w-full relative z-10">
               <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                     <tr className="border-b border-slate-100 dark:border-white/5">
                        <th className="w-[38%] px-2 py-4 text-[8px] font-black uppercase text-slate-400 tracking-[0.2em] whitespace-nowrap">Medical Personnel</th>
                        <th className="w-[20%] px-2 py-4 text-[8px] font-black uppercase text-slate-400 tracking-[0.2em] text-center whitespace-nowrap">Volume</th>
                        <th className="w-[22%] px-2 py-4 text-[8px] font-black uppercase text-slate-400 tracking-[0.2em] text-center whitespace-nowrap">Status Hub</th>
                        <th className="w-[20%] px-2 py-4 text-[8px] font-black uppercase text-slate-400 tracking-[0.2em] text-right whitespace-nowrap">Merit Rating</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                     {doctorVolume.map((doc, idx) => (
                        <tr key={idx} className="group/row hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer">
                           <td className="px-2 py-4">
                              <div className="flex items-center gap-2">
                                 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary font-black text-[9px] italic shrink-0 group-hover/row:rotate-6 transition-transform shadow-sm">
                                    {doc.name[0]}
                                 </div>
                                 <div className="flex flex-col min-w-0">
                                    <p className="text-[12px] font-black text-slate-900 dark:text-white italic uppercase tracking-tight leading-none truncate">{doc.name}</p>
                                    <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest opacity-60 mt-0.5 truncate">{doc.spec}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-2 py-4">
                              <div className="flex flex-col items-center gap-1">
                                 <p className="text-lg font-black text-slate-900 dark:text-white italic tracking-tighter tabular-nums leading-none">{doc.volume.toLocaleString()}</p>
                                 <div className="w-10 h-0.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent-primary opacity-60" style={{ width: `${(doc.volume/1000)*100}%` }} />
                                 </div>
                              </div>
                           </td>
                           <td className="px-2 py-4 text-center">
                              <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[7px] font-black uppercase italic border border-emerald-500/20 shadow-sm leading-none">
                                 <ClipboardCheck size={8} /> {doc.confirm || '98%'}
                              </div>
                           </td>
                           <td className="px-2 py-4 text-right">
                              <div className="flex items-center justify-end gap-1 text-amber-500">
                                 <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums drop-shadow-sm leading-none">{doc.rating?.toFixed(1) || '0.0'}</span>
                                 <Star size={12} className="fill-current drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>

         {/* 🚀 Right Column: Conversion & Asset Intelligence */}
         <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Conversion Hub Shard */}
            <Card className="p-6 lg:p-8 rounded-[2rem] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2als flex flex-col min-h-[400px]">
               <div className="flex items-center gap-4 mb-10 shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                     <Zap size={24} />
                  </div>
                  <div>
                     <h3 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">Conversion Hub</h3>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Lifecycle Telemetry</p>
                  </div>
               </div>

               <div className="space-y-8 flex-1 flex flex-col justify-center">
                  {[
                     { label: 'Registered', val: '2,482', cap: '100%', color: '#2dd4bf' },
                     { label: 'Booked', val: '1,842', cap: '74%', color: '#0ea5e9' },
                     { label: 'Confirmed', val: '1,562', cap: '62%', color: '#6366f1' },
                     { label: 'Completed', val: '1,242', cap: '50%', color: '#14b8a6' }
                  ].map((step, idx) => (
                     <div key={idx} className="flex flex-col gap-2 group/step cursor-crosshair">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest opacity-60">{step.label}</span>
                           <span className="text-[14px] font-black text-slate-900 dark:text-white tabular-nums italic">{step.val}</span>
                        </div>
                        <div className="h-4 bg-slate-100 dark:bg-slate-900/40 rounded-full p-1 border border-slate-200/50 dark:border-white/5 overflow-hidden">
                           <div className="h-full rounded-full transition-all duration-1000 shadow-lg" style={{ width: step.cap, background: step.color }} />
                        </div>
                     </div>
                  ))}
               </div>
            </Card>

            {/* Asset Export Hub — Premium Intelligence Theme */}
            <Card className="p-6 lg:p-8 rounded-[2rem] bg-slate-950 border border-indigo-500/20 shadow-2als flex flex-col gap-8 shrink-0">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                     <Download size={24} />
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-lg lg:text-xl font-black text-indigo-100 italic uppercase tracking-tighter leading-none">Asset Hub</h3>
                     <p className="text-[10px] font-bold text-indigo-400/50 uppercase tracking-widest mt-1 italic">Intelligence Reporting</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  {[
                     { l: 'Full Audit Archive', s: '30-Day CSV Report', i: FileText, b: 'bg-indigo-500/10' },
                     { l: 'Neural Performance', s: 'PDF Analytical Digest', i: BarChart3, b: 'bg-emerald-500/10' }
                  ].map((item, idx) => (
                     <button key={idx} className="flex items-center justify-between p-5 rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-white/20 transition-all text-left shadow-lg group/ex">
                        <div className="flex items-center gap-4">
                           <div className={`p-3 rounded-xl ${item.b} border border-white/5 group-hover:scale-110 transition-transform`}>
                              <item.i className="text-white" size={22} />
                           </div>
                           <div className="flex flex-col">
                              <p className="text-white text-[12px] font-black uppercase tracking-wider">{item.l}</p>
                              <p className="text-[8px] font-bold text-indigo-400/60 uppercase tracking-widest mt-1 italic leading-none">{item.s}</p>
                           </div>
                        </div>
                        <ChevronRight size={18} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-2 transition-all" />
                     </button>
                  ))}
               </div>
            </Card>
         </div>
      </div>
   );
};

export default OperationalMatrix;
