import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, ChevronRight, MapPin, 
    Activity, ArrowUpRight, Filter, Search, 
    FileJson, CheckCircle2, AlertCircle, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { TableSkeleton } from './AnalyticsSkeleton';

/**
 * 🏛️ AnalyticalRegistry (Compact Google Edition)
 * A clean, minimalist investigative ledger focusing on high-density clinical auditing.
 */
const AnalyticalRegistry = ({ data, isLoading }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // 🧬 Intelligence Pipeline
    const itemsPerPage = 5;
    
    // Define rawRows using useMemo to ensure it's stable and defined before usage
    const rawRows = useMemo(() => data?.registryData || [], [data]);

    const filteredRows = useMemo(() => {
        const rows = rawRows || [];
        if (!searchTerm) return rows;
        return rows.filter(r => 
            r.patient?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
            r.dept?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
            r.doctor?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
        );
    }, [rawRows, searchTerm]);

    if (isLoading) return <TableSkeleton />;

    const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
    const currentRows = filteredRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const AVATAR_GRADS = [
        'var(--grad-violet)',
        'var(--grad-blue)',
        'var(--grad-emerald)',
        'var(--grad-orange)',
        'var(--grad-rose)',
    ];

    const STATUS_CONFIG = {
        'Completed': { color: 'var(--m3-success)', bg: 'rgba(26, 171, 107, 0.05)', icon: <CheckCircle2 size={10} />, label: 'Completed' },
        'Pending': { color: 'var(--m3-warning)', bg: 'rgba(255, 171, 0, 0.05)', icon: <Clock size={10} />, label: 'Pending' },
        'Cancelled': { color: 'var(--m3-error)', bg: 'rgba(217, 48, 37, 0.05)', icon: <AlertCircle size={10} />, label: 'Cancelled' },
        'Critical': { color: 'var(--m3-error)', bg: 'rgba(217, 48, 37, 0.05)', icon: <Activity size={10} />, label: 'Critical' },
    };

    const handleExportCSV = () => {
        const headers = ['ID', 'Patient', 'Department', 'Practitioner', 'Status', 'Revenue'];
        const csvRows = filteredRows.map(r => [r.id, r.patient, r.dept, r.doctor, r.status, r.revenue]);
        const content = [headers, ...csvRows].map(e => e.join(",")).join("\n");
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `CitePK_Intelligence_Ledger.csv`);
        link.click();
    };

    return (
        <div className="widget" style={{ 
            height: '480px', 
            background: 'linear-gradient(135deg, #ffffff 0%, #fcfdff 100%)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* ✨ Ambient Aura */}
            <div style={{
                position: 'absolute', top: -150, left: -150, width: 400, height: 400,
                background: 'rgba(21, 88, 214, 0.02)',
                borderRadius: '100%', filter: 'blur(80px)', pointerEvents: 'none'
            }} />

            {/* 🛡️ Institutional Header */}
            <div className="widget-header" style={{ 
                padding: '20px 24px', 
                borderBottom: '1px solid rgba(0,0,0,0.04)',
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)',
                zIndex: 10
            }}>
                <div className="flex-1">
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-success)' }} />
                        Clinical Registry
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, letterSpacing: '-0.02em', fontWeight: 700 }}>Institutional Intelligence Ledger</div>
                </div>
                
                <div className="flex items-center gap-2">
                    <AnimatePresence mode="popLayout">
                        {showSearch && (
                            <motion.div 
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 140, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                className="relative pr-2"
                            >
                                <input 
                                    autoFocus
                                    className="w-full pl-8 pr-4 py-2 rounded-xl bg-surface-variant/40 border border-outline-variant/20 outline-none text-[12px] font-medium placeholder:opacity-30"
                                    placeholder="Search registry..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-sub opacity-30" size={12} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button 
                        onClick={() => setShowSearch(!showSearch)}
                        className={`p-2.5 rounded-xl border border-outline-variant/30 transition-all ${showSearch ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white hover:bg-primary/5 text-text-sub'}`}
                    >
                        <Filter size={15} />
                    </button>
                    <button 
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-[11px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/10"
                    >
                        <FileJson size={14} /> Export Node
                    </button>
                </div>
            </div>

            {/* 📋 Intelligence Table Area */}
            <div className="flex-1 overflow-hidden z-1">
                <div className="h-full overflow-y-auto custom-scrollbar">
                    {filteredRows.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center p-12 opacity-40 text-center">
                            <Activity size={48} className="text-text-sub mb-4" />
                            <p className="text-sm font-bold text-text-main tracking-tighter">No Active Telemetry</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead className="bg-[#f8f9fc]/80 sticky top-0 z-10 backdrop-blur-md">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-sub/40 border-b border-outline-variant/10">Entity Identity</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-sub/40 border-b border-outline-variant/10 hidden md:table-cell">Pathology Unit</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-sub/40 border-b border-outline-variant/10 hidden lg:table-cell">Assigned Practitioner</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-sub/40 border-b border-outline-variant/10">Protocol Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-sub/40 border-b border-outline-variant/10 text-right hidden sm:table-cell">Fiscal Flow</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                {currentRows.map((row, i) => {
                                    const cfg = STATUS_CONFIG[row.status] || { color: '#666', bg: 'rgba(0,0,0,0.03)', icon: <Activity size={10} />, label: row.status };
                                    const initials = row.patient?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                                    
                                    return (
                                        <motion.tr 
                                            key={row.id}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group hover:bg-white hover:shadow-xl hover:shadow-primary/5 hover:translate-x-1 transition-all cursor-default"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div 
                                                        className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm transition-all"
                                                        style={{ background: AVATAR_GRADS[i % 5] }}
                                                    >
                                                        {initials}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span 
                                                            className="text-[13px] font-bold text-text-main leading-tight flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors"
                                                            onClick={() => navigate(`/admin/patients/${row.patient_id}`)}
                                                        >
                                                            {row.patient}
                                                            <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                                                        </span>
                                                        <span className="text-[9px] font-bold text-text-sub opacity-30 uppercase tracking-tighter">Node ID {row.id}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* 🏥 Unit Shard (MD+) */}
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-bold text-text-main uppercase tracking-tighter opacity-70">{row.dept}</span>
                                                    <span className="text-[8px] font-bold text-text-sub opacity-30 uppercase">Clinical Unit</span>
                                                </div>
                                            </td>

                                            {/* 🩺 Practitioner Shard (LG+) */}
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-lg bg-surface-variant/40 border border-outline-variant/20 flex items-center justify-center text-[9px] font-bold text-text-sub">
                                                        {row.doctor?.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[11px] font-bold text-text-main leading-none">{row.doctor}</span>
                                                        <span className="text-[8px] font-bold text-text-sub opacity-30 uppercase mt-0.5">Primary Clinician</span>
                                                    </div>
                                                </div>
                                            </td>
                                         {/* 🛡️ Status Shard */}
                                        <td className="px-6 py-4">
                                            <div 
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/10 shadow-sm"
                                                style={{ background: cfg.bg, color: cfg.color }}
                                            >
                                                <div className="animate-pulse">{cfg.icon}</div>
                                                <span className="text-[9px] font-bold uppercase tracking-widest">{cfg.label}</span>
                                            </div>
                                        </td>

                                        {/* 💰 Fiscal Shard (SM+) */}
                                        <td className="px-6 py-4 text-right hidden sm:table-cell">
                                            <div className="flex flex-col items-end">
                                                <span className="text-[13px] font-bold text-text-main tabular-nums">
                                                    <span className="text-[10px] opacity-20 mr-1">Rs.</span>
                                                    {row.revenue?.toLocaleString()}
                                                </span>
                                                <span className="text-[8px] font-bold text-success uppercase tracking-tighter">Verified Flux</span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* 📟 Intelligence Pagination */}
            <div style={{ 
                padding: '12px 24px', 
                borderTop: '1px solid rgba(0,0,0,0.04)', 
                background: 'rgba(255,255,255,0.6)', 
                backdropFilter: 'blur(5px)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                zIndex: 10
            }}>
                <span className="text-[9px] font-bold text-text-sub opacity-40 uppercase tracking-[0.2em]">
                    Segment {currentPage} / {totalPages} Monitoring Active
                </span>

                <div className="flex items-center gap-5">
                    <div className="flex gap-1.5">
                        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${currentPage === i + 1 ? 'w-6 bg-primary' : 'w-1.5 bg-outline-variant/40'}`} />
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="w-8 h-8 rounded-xl bg-white border border-outline-variant/30 text-text-sub flex items-center justify-center hover:border-primary/20 hover:text-primary transition-all disabled:opacity-5 shadow-sm"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="w-8 h-8 rounded-xl bg-white border border-outline-variant/30 text-text-sub flex items-center justify-center hover:border-primary/20 hover:text-primary transition-all disabled:opacity-5 shadow-sm"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticalRegistry;
