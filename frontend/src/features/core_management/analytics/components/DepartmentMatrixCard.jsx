import React, { useState, useMemo } from 'react';
import { ShimmerCard } from './AnalyticsSkeleton';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, ArrowUpRight, Activity, Filter,
    Stethoscope, FlaskConical, HeartPulse,
    Microscope, Crosshair
} from 'lucide-react';

/**
 * 🏥 DepartmentMatrixCard (Clinical Integrity Efficiency Matrix)
 * A clean, Google-inspired surface for tracking clinical personnel efficiency.
 */
const DepartmentMatrixCard = ({ data, isLoading }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    // 🧬 Tactical Intelligence Filtering
    const filteredDepts = useMemo(() => {
        if (!searchTerm) return data || [];
        return (data || []).filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [data, searchTerm]);

    if (isLoading) return <ShimmerCard height="380px" />;

    const getIcon = (name) => {
        const n = name.toLowerCase();
        if (n.includes('opd')) return <Stethoscope size={16} />;
        if (n.includes('lab')) return <Microscope size={16} />;
        if (n.includes('ipd')) return <HeartPulse size={16} />;
        if (n.includes('er')) return <Crosshair size={16} />;
        return <FlaskConical size={16} />;
    };

    if (!data) {
        return (
            <div className="widget" style={{ height: '380px' }}>
                <div className="flex flex-col p-6 gap-4">
                    <div className="sk h-4 w-40" />
                    {[1, 2, 3].map(i => <div key={i} className="sk h-14 w-full rounded-2xl" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="widget" style={{
            height: '380px',
            background: 'linear-gradient(135deg, #ffffff 0%, #fcfdff 100%)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* ✨ Ambient Aura */}
            <div style={{
                position: 'absolute', top: -100, left: -100, width: 300, height: 300,
                background: 'rgba(26, 171, 107, 0.02)',
                borderRadius: '100%', filter: 'blur(60px)', pointerEvents: 'none'
            }} />

            {/* 🛡️ Strategic Header */}
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
                        Clinical Integrity
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, letterSpacing: '-0.02em', fontWeight: 700 }}>Efficiency Matrix</div>
                </div>
                
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className={`p-2 rounded-full transition-colors ${showSearch ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-primary/5 text-text-sub'}`}
                    >
                        {showSearch ? <Filter size={14} /> : <Search size={14} />}
                    </button>
                    <button
                        onClick={() => navigate('/admin/departments')}
                        className="p-2 rounded-full hover:bg-primary/5 text-text-sub transition-colors"
                    >
                        <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>

            {/* 📊 Matrix Content */}
            <div className="flex-1 overflow-hidden z-1">
                <div className="h-full overflow-y-auto custom-scrollbar p-6">
                    <AnimatePresence mode="popLayout">
                        <div className="flex flex-col gap-3">
                            {filteredDepts.map((dept, i) => {
                                const isOptimal = dept.efficiency >= 85;
                                const isChallenged = dept.efficiency < 70;
                                const statusColor = isOptimal ? 'var(--m3-success)' : (isChallenged ? 'var(--m3-error)' : 'var(--m3-primary)');

                                return (
                                    <motion.div
                                        key={`${dept.id || dept.name}-${i}`}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-outline-variant/30 hover:border-primary/20 hover:shadow-lg transition-all cursor-default group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div style={{
                                                    width: 34, height: 34, borderRadius: '12px',
                                                    background: isOptimal ? 'rgba(26, 171, 107, 0.1)' : 'rgba(21, 88, 214, 0.05)',
                                                    color: statusColor,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    {getIcon(dept.name)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-bold text-text-main tracking-tight uppercase group-hover:text-primary transition-colors">{dept.name}</span>
                                                    <span className="text-[9px] text-text-sub/40 font-bold uppercase tracking-widest flex items-center gap-1">
                                                        <Activity size={8} /> Tactical Sync'd
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-baseline gap-1">
                                                    <span style={{ color: statusColor }} className="text-[14px] font-bold tabular-nums tracking-tighter">
                                                        {dept.efficiency}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-text-sub opacity-30">%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex justify-between items-center text-[10px] text-text-sub font-bold uppercase tracking-widest opacity-60 px-0.5">
                                                <span className="flex items-center gap-1.5">
                                                    {dept.caseload} census
                                                </span>
                                                <span className="flex items-center gap-1.5 text-success">
                                                    Rs. {(dept.revenue / 1000).toFixed(0)}k
                                                </span>
                                            </div>
                                            <div className="w-full h-1 bg-surface-variant/30 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${dept.efficiency}%` }}
                                                    transition={{ duration: 1.2, ease: "circOut" }}
                                                    className="h-full rounded-full"
                                                    style={{ background: statusColor }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </AnimatePresence>
                </div>
            </div>

            {/* 📟 Intelligence Footer */}
            <div style={{ 
                padding: '12px 24px', 
                borderTop: '1px solid rgba(0,0,0,0.04)', 
                background: 'rgba(255,255,255,0.6)', 
                backdropFilter: 'blur(5px)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                zIndex: 10
            }}>
                <span className="text-[9px] font-bold text-text-sub opacity-40 uppercase tracking-[0.2em]">Clinical Matrix Node-BI-9</span>
                <span className="text-[8px] font-bold text-text-sub/20 uppercase tracking-tighter">Last pulse: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        </div>
    );
};

export default DepartmentMatrixCard;
