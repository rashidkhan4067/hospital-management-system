import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, ChevronRight } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * 📊 Universal Administrative Data Matrix
 * A high-fidelity, dry, and scalable table component for all admin modules.
 * Fully optimized for mobile responsiveness with a dual-sharding render engine.
 */
export default function AdminTable({ 
    columns, 
    data, 
    isLoading = false,
    onRowClick, 
    actions 
}) {
    // 📱 MOBILE SHARD: Responsive Card View
    const renderMobileCards = () => (
        <div className="flex flex-col gap-4 sm:hidden px-1">
            {data.map((row, rowIdx) => (
                <motion.div
                    key={row.id || rowIdx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: rowIdx * 0.05 }}
                    onClick={() => onRowClick?.(row)}
                    className="p-5 bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm active:scale-[0.98] transition-all relative overflow-hidden"
                >
                    {/* Primary Identifier Shard (Standard: Column 0) */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-1 min-w-0">
                           {columns[0].cell ? columns[0].cell(row) : (
                               <p className="text-[12px] font-black uppercase text-slate-900 dark:text-white">{row[columns[0].accessor] ?? 'N/A'}</p>
                           )}
                        </div>
                        <div onClick={(e) => e.stopPropagation()} className="shrink-0 flex items-center justify-center min-w-[44px] min-h-[44px]">
                            {actions ? actions(row) : (
                                columns.find(c => {
                                    const h = c.header?.toLowerCase();
                                    return h === 'actions' || h === 'protocol' || h === 'matrix action' || h.includes('action');
                                })?.cell?.(row) || 
                                <ChevronRight size={16} className="text-slate-300" />
                            )}
                        </div>
                    </div>

                    {/* Meta Shard Mesh (Standard: Remaining Columns) */}
                    <div className="grid grid-cols-2 gap-4 pb-2 border-t border-slate-50 dark:border-white/5 pt-4">
                        {columns.slice(1, -1).map((col, idx) => (
                            <div key={idx} className="space-y-1">
                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 opacity-60">
                                    {col.header}
                                </p>
                                <div className="flex items-center min-h-[22px]">
                                    {col.cell ? col.cell(row) : (
                                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                                            {row[col.accessor]}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );

    return (
        <div className="w-full">
            {/* 🖥️ DESKTOP SHARD: Conventional Matrix Grid */}
            <Card className="hidden sm:block matrix-card border-none shadow-xl overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar-hide">
                    <table className="w-full text-left border-collapse border-separate border-spacing-y-1.5 px-2">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-black/20">
                                {columns.map((col, idx) => (
                                    <th 
                                        key={idx} 
                                        className={`py-5 px-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] font-display first:rounded-l-2xl last:rounded-r-2xl ${idx === columns.length - 1 ? 'text-right' : ''}`}
                                    >
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        {columns.map((col, j) => (
                                            <td key={j} className="p-6 bg-white dark:bg-white/5 first:rounded-l-2xl last:rounded-r-2xl">
                                                <div className="h-2 bg-slate-200 dark:bg-white/10 rounded-full w-24"></div>
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {data.length > 0 ? (
                                        data.map((row, rowIdx) => (
                                            <motion.tr 
                                                key={row.id || rowIdx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ delay: rowIdx * 0.03 }}
                                                onClick={() => onRowClick?.(row)}
                                                className="group cursor-pointer"
                                            >
                                                {columns.map((col, colIdx) => (
                                                    <td 
                                                        key={colIdx} 
                                                        className={`py-5 px-6 bg-white dark:bg-white/5 group-hover:bg-accent-primary/5 transition-all duration-300 first:rounded-l-2xl last:rounded-r-2xl border-y border-transparent group-hover:border-accent-primary/20 ${colIdx === columns.length - 1 ? 'text-right' : ''}`}
                                                    >
                                                        <div className="flex items-center min-h-[30px] justify-start">
                                                            {col.cell ? col.cell(row) : (
                                                                <span className="text-[11px] font-bold text-slate-900 dark:text-white/80 uppercase">
                                                                    {row[col.accessor]}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                ))}
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={columns.length} className="p-24 text-center text-slate-400 text-[10px] font-black uppercase tracking-widest italic bg-white dark:bg-white/5 rounded-3xl opacity-40">
                                                No metadata found in this node shard
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* 📱 MOBILE SHARD RENDER */}
            {!isLoading && renderMobileCards()}
            {isLoading && (
               <div className="flex flex-col gap-4 sm:hidden px-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-40 bg-slate-100 dark:bg-white/5 rounded-3xl animate-pulse" />
                  ))}
               </div>
            )}
        </div>
    );
}
