import React from 'react';

/**
 * 🏛️ AdminTable (Universal Clinical Primitive)
 * Supports both legacy (headers/children) and modern (columns/data) patterns.
 * Optimized for high-density Material 3 administration.
 */
export default function AdminTable({ 
    headers = [], 
    children, 
    columns = [], 
    data = [], 
    onRowClick,
    className = ""
}) {
    // 🧬 Pattern 1: Modern Data-Driven (columns & data)
    if (columns.length > 0) {
        return (
            <div className={`w-full overflow-x-auto rounded-[24px] border border-outline/10 bg-white ${className} custom-scrollbar`}>
                <table className="w-full min-w-[850px] text-left border-collapse">
                    <thead className="bg-surface/50 border-b border-outline/10">
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} className="px-8 py-5 text-[10px] font-black text-text-sub uppercase tracking-widest whitespace-nowrap">
                                    {typeof col.header === 'function' ? col.header() : col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline/5">
                        {data.map((row, rowIndex) => (
                            <tr 
                                key={row.id || rowIndex} 
                                onClick={() => onRowClick?.(row)}
                                className={`transition-all hover:bg-surface-bright group ${onRowClick ? 'cursor-pointer active:scale-[0.995]' : ''}`}
                            >
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-6 sm:px-8 py-3.5 sm:py-5 transition-colors group-hover:text-primary">
                                        {col.cell 
                                            ? col.cell(row[col.accessorKey], row) 
                                            : row[col.accessorKey]
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    // 🧱 Pattern 2: Legacy Structural (headers & children)
    return (
        <div className={`w-full overflow-x-auto rounded-[24px] border border-outline/10 bg-white ${className} custom-scrollbar`}>
            <table className="w-full min-w-[850px] text-left border-collapse">
                <thead className="bg-surface/50 border-b border-outline/10">
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i} className="px-8 py-5 text-[10px] font-black text-text-sub uppercase tracking-widest whitespace-nowrap">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline/5">
                    {children}
                </tbody>
            </table>
        </div>
    );
}
