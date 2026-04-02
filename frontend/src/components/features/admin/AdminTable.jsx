import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';
import { Card } from '../../ui';

/**
 * 📊 Universal Administrative Data Matrix
 * A high-fidelity, dry, and scalable table component for all admin modules.
 */
export default function AdminTable({ 
    columns, 
    data, 
    isLoading = false,
    onRowClick, 
    actions = (row) => (
        <button className="p-2.5 rounded-xl bg-bg-base dark:bg-slate-800/40 text-text-secondary hover:text-accent-primary transition-all shadow-inner">
            <MoreHorizontal size={14} />
        </button>
    )
}) {
    return (
        <Card className="bg-bg-offset dark:bg-slate-800/40 border border-white/5 rounded-[40px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-bg-base dark:bg-black/10">
                            {columns.map((col, idx) => (
                                <th 
                                    key={idx} 
                                    className={`p-6 text-[9px] font-black text-text-secondary dark:text-white/20 uppercase tracking-[0.3em] ${idx === 0 ? 'pl-10' : ''} ${idx === columns.length - 1 ? 'text-right pr-10' : ''}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse border-b border-white/5 bg-bg-base dark:bg-black/5">
                                    {columns.map((col, j) => (
                                        <td key={j} className="p-8">
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
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ delay: rowIdx * 0.03 }}
                                            onClick={() => onRowClick?.(row)}
                                            className="group border-b border-white/5 last:border-none hover:bg-bg-base dark:hover:bg-white/5 transition-all cursor-pointer"
                                        >
                                            {columns.map((col, colIdx) => (
                                                <td 
                                                    key={colIdx} 
                                                    className={`p-6 ${colIdx === 0 ? 'pl-10' : ''} ${colIdx === columns.length - 1 ? 'text-right pr-10' : ''}`}
                                                >
                                                    {col.cell ? col.cell(row) : (
                                                        <span className="text-[11px] font-bold text-text-primary dark:text-white/80 uppercase">
                                                            {row[col.accessor]}
                                                        </span>
                                                    )}
                                                </td>
                                            ))}
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={columns.length} className="p-20 text-center text-text-secondary/40 text-[10px] font-black uppercase tracking-widest italic">
                                            No data found in this node
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
