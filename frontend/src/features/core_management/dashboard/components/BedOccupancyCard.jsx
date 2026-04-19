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
                    name:      w.name,
                    occupancy: Math.round((w.occupied / w.total) * 100) || 0,
                    total:     w.total,
                    occupied:  w.occupied,
                    Icon:      w.name.toLowerCase().includes('icu') ? Activity : Bed
                }));
                setWards(mappedWards);
                
                if (data.overview) {
                    setSummary([
                        { label: 'Aggregate Occ.', value: data.overview.occupancy_rate, note: 'Real-time' },
                        { label: 'Available Beds', value: data.overview.available,      note: `${((data.overview.available/data.overview.total_beds)*100).toFixed(0)}% capacity` },
                        { label: 'ICU Capacity',   value: data.overview.icu_stats,      note: 'Occupied/Total' },
                        { label: 'Maintenance',    value: data.overview.maintenance,    note: 'In-service' },
                    ]);
                }
            } else {
                setWards(WARDS);
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
        <div className="widget" style={{ height: '380px' }}>
            <div className="widget-header" style={{ padding: '14px 16px 0', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                        background: 'var(--m3-primary-container)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--m3-primary)',
                    }}>
                        <Bed size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                        <div className="eyebrow" style={{ marginBottom: 0 }}>Clinical Infrastructure</div>
                        <div className="widget-title">Bed Occupancy</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button className="ghost-link" onClick={() => load()} disabled={loading} style={{ padding: 8 }}>
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button className="ghost-link" onClick={() => navigate('/admin/clinical/wards')}>Detail →</button>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mx-4 my-3 py-3 border-y border-[var(--m3-outline-variant)] flex-shrink-0">
                {summary.map(s => (
                    <div key={s.label}>
                        <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--m3-text-main)' }}>{s.value}</div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--m3-text-sub)', opacity: 0.6, marginTop: 1 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="widget-body" style={{ padding: '0 16px 16px', minHeight: 0 }}>
                <div className="widget-scroll-area">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                        {wards.map((ward, idx) => {
                            const meta = wardMeta(ward.occupancy);
                            const Icon = ward.Icon || Bed;
                            return (
                                <motion.div
                                    key={ward.name + idx}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.04 }}
                                    style={{
                                        padding: 10, borderRadius: 12,
                                        background: 'var(--m3-surface-bright)',
                                        border: '1px solid var(--m3-outline-variant)',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        <div style={{ color: meta.color }}><Icon size={14} /></div>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--m3-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {ward.name}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                        <span style={{ fontSize: 12, fontWeight: 900, color: meta.color }}>{ward.occupancy}%</span>
                                        <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--m3-text-sub)' }}>{ward.occupied}/{ward.total}</span>
                                    </div>
                                    <div className="progress-track" style={{ background: 'var(--m3-surface-variant)' }}>
                                        <div className="progress-fill" style={{ width: `${ward.occupancy}%`, background: meta.color }} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div style={{ 
                        marginTop: 14, padding: '10px 14px', 
                        background: 'var(--m3-primary-container)', border: '1px solid var(--m3-primary)',
                        borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10,
                        cursor: 'pointer'
                    }} onClick={() => navigate('/admin/clinical/admissions')}>
                        <div style={{ 
                            width: 28, height: 28, borderRadius: '50%', 
                            background: 'var(--m3-primary)', color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <UserPlus size={14} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--m3-primary)' }}>New Patient Admission</div>
                            <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--m3-primary)', opacity: 0.7 }}>Protocol ready for ER arrival</div>
                        </div>
                        <ArrowUpRight size={14} style={{ color: 'var(--m3-primary)' }} />
                    </div>
                </div>
            </div>

            {lastSync && (
                <div style={{ padding: '6px 16px', fontSize: 8, fontWeight: 800, color: 'var(--m3-text-sub)', opacity: 0.4, textAlign: 'right', borderTop: '1px solid var(--m3-outline-variant)', flexShrink: 0 }}>
                    LAST SYNC: {lastSync.toLocaleTimeString()}
                </div>
            )}
        </div>
    );
};

export default BedOccupancyCard;
