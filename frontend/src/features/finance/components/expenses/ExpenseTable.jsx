import React from 'react';
import { Eye, CheckCircle, XCircle, Clock, Wallet, Truck, User, ArrowUpRight, ArrowDownRight, Tag } from 'lucide-react';
import { Badge, Button } from '@/shared/components/ui';

/**
 * 🛰 ExpenseTable — High-fidelity fiscal outflow matrix
 * Optimized to remove vertical blank spaces and ensure design parity.
 */
const ExpenseTable = ({ expenses = [], isLoading = false, onStatusChange, onViewDetail }) => {
   if (isLoading) return (
      <div className="w-full h-80 flex flex-col items-center justify-center gap-4 bg-white/50 dark:bg-slate-900/10 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-2als">
         <div className="w-12 h-12 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Synchronizing Fiscal Outflow Hub...</p>
      </div>
   );

   if (expenses.length === 0) return (
      <div className="w-full h-80 flex flex-col items-center justify-center gap-5 bg-white/50 dark:bg-slate-900/10 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-2als">
         <div className="w-16 h-16 rounded-[2rem] bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300 dark:text-slate-700 border border-slate-200 dark:border-white/10 shadow-inner group">
            <Wallet size={40} className="group-hover:scale-110 transition-transform opacity-30" />
         </div>
         <div className="text-center space-y-0.5">
            <h3 className="text-lg font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">Fiscal Void</h3>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 italic">No processed expenses matching your criteria.</p>
         </div>
         <Button className="px-6 py-2.5 rounded-[1.5rem] bg-accent-primary text-white text-[9px] font-black uppercase tracking-widest border-none shadow-xl shadow-accent-primary/20">Log First Expense</Button>
      </div>
   );

   const getCategoryIcon = (category) => {
      switch (category?.toLowerCase()) {
         case 'inventory': return <Truck size={14} />;
         case 'salary': return <User size={14} />;
         case 'maintenance': return <Tag size={14} />;
         default: return <Wallet size={14} />;
      }
   };

   return (
      <div className="w-full bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col p-3 lg:p-6">
         <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/5 blur-[80px] rounded-full pointer-events-none" />

         <div className="w-full overflow-x-auto relative z-10 scrollbar-hide">
            <table className="w-full text-left border-collapse table-fixed min-w-[850px]">
               <thead>
                  <tr className="border-b border-slate-100 dark:border-white/5">
                     <th className="w-[30%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap text-left italic">Fiscal Item & Category</th>
                     <th className="w-[18%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap italic">Amount Matrix</th>
                     <th className="w-[18%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap italic">Status Shard</th>
                     <th className="w-[15%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap italic">Date Dispatched</th>
                     <th className="w-[19%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right whitespace-nowrap italic">Controls</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-white/5 text-left">
                  {expenses.map((e, idx) => (
                     <tr key={idx} className="group/row hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300">
                        <td className="px-3 py-6">
                           <div className="flex items-center gap-4">
                              <div className="relative group cursor-pointer" onClick={() => onViewDetail(e)}>
                                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 flex items-center justify-center text-accent-primary font-black text-xs uppercase border border-accent-primary/10 italic shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                                    {getCategoryIcon(e.category)}
                                 </div>
                              </div>
                              <div className="flex flex-col min-w-0">
                                 <p className="text-[13px] font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none group-hover/row:text-accent-primary transition-colors truncate">
                                    {e.title || 'Al Shifaa Expense'}
                                 </p>
                                 <div className="flex items-center gap-2 mt-2 opacity-60">
                                    <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg bg-slate-900/5 dark:bg-white/5 text-slate-500 border border-slate-200 dark:border-white/5 lowercase italic block">
                                       # {e.reference || 'EXP-NODE-00'}
                                    </span>
                                    <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg bg-accent-primary/5 text-accent-primary border border-accent-primary/10 italic block">
                                       {e.category || 'General'}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </td>

                        <td className="px-3 py-6 text-center">
                           <div className="flex flex-col items-center gap-1 shrink-0">
                              <p className="text-[14px] font-black text-slate-900 dark:text-white italic tracking-tighter tabular-nums leading-none">
                                 Rs. {Number(e.amount).toLocaleString()}
                              </p>
                              <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase italic text-rose-500/80 leading-none">
                                 <ArrowDownRight size={10} /> Outflow
                              </div>
                           </div>
                        </td>

                        <td className="px-3 py-6 text-center">
                           <div className="flex flex-col items-center gap-2">
                              {e.status === 'APPROVED' ? (
                                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase italic border border-emerald-500/20 shadow-sm leading-none">
                                    <CheckCircle size={12} /> Approved
                                 </div>
                              ) : e.status === 'PENDING' ? (
                                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-500 text-[9px] font-black uppercase italic border border-amber-500/20 leading-none shadow-sm animate-pulse">
                                    <Clock size={12} /> Verification
                                 </div>
                              ) : (
                                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 text-[9px] font-black uppercase italic border border-rose-500/20 leading-none shadow-sm">
                                    <XCircle size={12} /> Rejected
                                 </div>
                              )}
                           </div>
                        </td>

                        <td className="px-3 py-6 text-center">
                            <div className="flex flex-col items-center gap-1 shrink-0">
                               <p className="text-[12px] font-black text-slate-400 dark:text-white/40 italic tracking-tighter tabular-nums leading-none">
                                  {e.date || '2026-04-05'}
                               </p>
                            </div>
                        </td>

                        <td className="px-3 py-6 text-right">
                           <div className="flex items-center justify-end gap-2.5 opacity-0 group-hover/row:opacity-100 transition-opacity translate-x-2 group-hover/row:translate-x-0 transition-transform">
                              <button type="button" onClick={() => onViewDetail(e)} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-accent-primary border border-slate-200 dark:border-white/10 transition-all hover:scale-110 shadow-sm whitespace-nowrap italic text-[9px] font-black uppercase"><Eye size={16} /></button>
                              
                              {e.status === 'PENDING' && (
                                 <>
                                    <button type="button" onClick={() => onStatusChange(e, 'APPROVED')} className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 transition-all hover:scale-110 shadow-sm whitespace-nowrap italic text-[9px] font-black uppercase"><CheckCircle size={16} /></button>
                                    <button type="button" onClick={() => onStatusChange(e, 'REJECTED')} className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20 transition-all hover:scale-110 shadow-sm whitespace-nowrap italic text-[9px] font-black uppercase"><XCircle size={16} /></button>
                                 </>
                              )}
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* ─── Simplified Pagination ─── */}
         <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
            <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic leading-none">Fiscal Intelligence Engine v4.2</span>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-slate-900/60 dark:text-white/40 italic uppercase tracking-tighter tabular-nums leading-none mr-2">Cluster 01</span>
               <div className="flex gap-1.5">
                  <Button className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 p-0 shadow-sm min-w-0 italic text-[12px] font-black">&lt;</Button>
                  <Button className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-accent-primary text-white border-none p-0 shadow-lg font-black italic shadow-accent-primary/20 min-w-0 text-[10px]">01</Button>
                  <Button className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 p-0 shadow-sm min-w-0 italic text-[12px] font-black">&gt;</Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ExpenseTable;
