import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Bed, ShieldPlus, Baby, Heart, UserPlus, RefreshCw, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/core/api';
import { useDataStore } from '@/core/store/useDataStore';

const WARDS = [
    { name: 'ICU / Acute Care', occupancy: 92, total: 12,  occupied: 11, Icon: Activity  },
    { name: 'General Ward',     occupancy: 65, total: 120, occupied: 78, Icon: Bed        },
    { name: 'Surgical Wing',    occupancy: 42, total: 45,  occupied: 19, Icon: ShieldPlus },
    { name: 'Maternity Unit',   occupancy: 78, total: 25,  occupied: 19, Icon: Baby       },
    { name: 'Pediatric Ward',   occupancy: 55, total: 30,  occupied: 16, Icon: Heart      },
    { name: 'Private Suites',   occupancy: 30, total: 10,  occupied: 3,  Icon: UserPlus   },
];

const SUMMARY = [
    { label: 'Aggregate Occ.', value: '62.4%',       note: '+2.1% vs yesterday' },
    { label: 'Available Beds', value: '84',           note: '28% of capacity'   },
    { label: 'Discharges',     value: '12',           note: 'Next 6 hours'      },
    { label: 'Queue',          value: '28',           note: '5 urgent'          },
];

const wardMeta = (pct) => {
    if (pct >= 90) return { color: 'var(--m3-error)',   bg: 'var(--m3-error-container)',   label: 'Critical' };
    if (pct >= 75) return { color: 'var(--m3-warning)', bg: 'var(--m3-warning-container)', label: 'High'     };
    if (pct >= 50) return { color: 'var(--m3-primary)', bg: 'var(--m3-primary-container)', label: 'Moderate' };
    return              { color: 'var(--m3-success)', bg: 'var(--m3-success-container)', label: 'Low'      };
};

const BedOccupancyCard = () => {
    const navigate = useNavigate();
    const [wards,    setWards]    = useState([]);
    const [summary,  setSummary]  = useState(SUMMARY);
    const [loading,  setLoading]  = useState(true);
    const [lastSync, setLastSync] = useState(null);
    const filters = useDataStore(s => s.filters);

    const load = useCallback(async (signal) => {
        setLoading(true);
        try {
            const res  = await apiClient.get('/wards/wards/stats/', { 
                signal,
                params: { department: filters.department !== 'All' ? filters.department : undefined }
            });
            const data = res.data;
            
            if (data?.ward_matrix) {
                const mappedWards = data.ward_matrix.map(w => ({
                    id:        w.id,
                    name:      w.name,
                    occupancy: Math.round((w.occupied / w.total) * 100) || 0,
                    total:     w.total,
                    occupied:  w.occupied,
                    Icon:      w.name.toLowerCase().includes('icu') ? Activity : Bed
                }));
                setWards(mappedWards);
                
                if (data.overview) {
                    setSummary([
                        { label: 'Aggregate Occ.', value: data.overview.occupancy_rate, note: 'System Load' },
                        { label: 'Available Beds', value: data.overview.available,      note: 'Vacant' },
                        { label: 'ICU Pulse',      value: data.overview.icu_stats.split('/')[0], note: `Total ${data.overview.icu_stats.split('/')[1]}` },
                        { label: 'Active Wards',   value: mappedWards.length,            note: 'Operational' },
                    ]);
                }
            }
            setLastSync(new Date());
        } catch (e) {
            if (e.name !== 'CanceledError') setWards(WARDS);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        const ctrl = new AbortController();
        load(ctrl.signal);
        return () => ctrl.abort();
    }, [load]);

    return (
        <div className="widget group" style={{ height: '380px', background: 'var(--m3-surface-bright)', overflow: 'hidden' }}>
            <div className="widget-header" style={{ padding: '16px 20px 0', flexShrink: 0 }}>
                <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                        <Activity size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.12em] text-text-sub opacity-50">
                            {filters.department?.toLowerCase() === 'emergency' ? 'Unit Readiness' : 'Clinical Infrastructure'}
                        </div>
                        <h3 className="text-sm font-black text-text-main tracking-tight">
                            {filters.department?.toLowerCase() === 'emergency' ? 'Emergency Bay Status' : 'Bed Occupancy'}
                        </h3>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full hover:bg-surface-variant flex items-center justify-center transition-all text-text-sub" onClick={() => load()} disabled={loading}>
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button 
                        className="px-4 py-1.5 rounded-full bg-surface-variant/50 hover:bg-surface-variant text-[11px] font-black tracking-wide text-text-main transition-all"
                        onClick={() => navigate('/admin/clinical/wards')}
                    >
                        {filters.department?.toLowerCase() === 'emergency' ? 'Bays' : 'Registry'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 px-5 py-4 my-2 border-y border-outline-variant/30 bg-surface-variant/10">
                {summary.map(s => (
                    <div key={s.label} className="flex flex-col">
                        <span className="text-xs font-black text-text-main tabular-nums tracking-tighter">{s.value}</span>
                        <span className="text-[9px] font-bold text-text-sub opacity-40 uppercase truncate">{s.label}</span>
                    </div>
                ))}
            </div>

            <div className="widget-body" style={{ padding: '4px 20px 20px', minHeight: 0 }}>
                <div className="widget-scroll-area pr-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {wards.map((ward, idx) => {
                            const meta = wardMeta(ward.occupancy);
                            const Icon = ward.Icon || Bed;
                            return (
                                <motion.div
                                    key={ward.id || ward.name + idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="p-3.5 rounded-2xl border border-outline-variant/50 hover:border-primary/30 hover:shadow-md transition-all cursor-crosshair bg-surface-bright relative group/node"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-surface-variant/30" style={{ color: meta.color }}>
                                                <Icon size={14} />
                                            </div>
                                            <span className="text-[12px] font-black text-text-main truncate tracking-tight">{ward.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            <span className="text-[10px] font-bold text-text-sub opacity-40 tabular-nums">{ward.occupied}/{ward.total}</span>
                                            <div className={`px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase text-white`} style={{ background: meta.color }}>{meta.label}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 rounded-full bg-surface-variant/40 overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${ward.occupancy}%` }}
                                                className="h-full rounded-full" 
                                                style={{ background: meta.color }} 
                                            />
                                        </div>
                                        <span className="text-xs font-black tabular-nums tracking-tighter" style={{ color: meta.color }}>{ward.occupancy}%</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div 
                        className="mt-6 p-4 rounded-[24px] bg-primary text-white flex items-center gap-4 cursor-pointer hover:shadow-lg active:scale-[0.98] transition-all group/cta relative overflow-hidden"
                        onClick={() => navigate('/admin/clinical/admissions')}
                    >
                        {/* Pulse effect */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/cta:opacity-100 transition-opacity" />
                        
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <UserPlus size={18} />
                        </div>
                        <div className="flex-1">
                            <div className="text-[13px] font-black tracking-tight leading-none">Emergency Intake Hub</div>
                            <div className="text-[10px] font-bold opacity-70 mt-1 uppercase tracking-wider">Deploy clinical protocol</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/cta:translate-x-1 transition-transform">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                </div>
            </div>

            {lastSync && (
                <div className="px-5 py-2 text-[9px] font-black text-text-sub opacity-30 text-right border-t border-outline-variant/30 bg-surface-variant/5">
                    CORE TELEMETRY SYNCED: {lastSync.toLocaleTimeString()}
                </div>
            )}
        </div>
    );
};

export default BedOccupancyCard;
