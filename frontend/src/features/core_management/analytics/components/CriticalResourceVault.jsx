import React from 'react';
import { ShimmerCard } from './AnalyticsSkeleton';
import { motion } from 'framer-motion';
import { 
    ShieldCheck, Box, AlertTriangle, 
    ArrowUpRight, Database
} from 'lucide-react';

/**
 * 📦 CriticalResourceVault (Supply Chain Telemetry)
 * Replaces abstract fiscal leakage indicators with tangible primary resource tracking.
 */
const CriticalResourceVault = ({ data, isLoading }) => {
    if (isLoading) return <ShimmerCard height="380px" />;
    const resources = data || [
        { item: 'ICU Ventilators', status: 'Available', count: '14', total: '16', color: '#1AA361' },
        { item: 'Blood Type O-', status: 'Critical', count: '2', total: '20', color: '#D93025' },
        { item: 'Surgical Kits', status: 'Stable', count: '45', total: '50', color: '#1558D6' }
    ];

    return (
        <div className="widget" style={{ 
            height: '380px', 
            background: 'linear-gradient(135deg, #ffffff 0%, #fcfdff 100%)',
            display: 'flex', flexDirection: 'column'
        }}>
            <div className="widget-header" style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <div className="flex-1">
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-success)' }} />
                        Resource Integrity
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, letterSpacing: '-0.02em', fontWeight: 700 }}>Critical Asset Vault</div>
                </div>
                <Database size={16} className="text-text-sub opacity-20" />
            </div>

            <div className="flex-1 p-6 flex flex-col gap-4">
                {resources.map((res, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-2xl bg-white border border-outline-variant/30 hover:border-primary/20 transition-all flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-surface-variant/40 text-text-sub">
                                {res.status === 'Critical' ? <AlertTriangle size={18} className="text-error" /> : <Box size={18} />}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-bold text-text-main uppercase tracking-tight">{res.item}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full" style={{ background: res.color }} />
                                    <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: res.color }}>{res.status} Protocol</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="text-[16px] font-bold text-text-main tabular-nums tracking-tighter">
                                {res.count}<span className="text-[10px] opacity-20 ml-1">/ {res.total}</span>
                            </div>
                            <div className="text-[8px] font-bold text-text-sub uppercase opacity-30">Active Units</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-3 px-6 border-t border-outline-variant/30 flex justify-between items-center bg-surface-variant/5">
                <div className="flex items-center gap-1.5 grayscale opacity-40">
                    <ShieldCheck size={12} className="text-success" />
                    <span className="text-[9px] font-bold text-text-sub uppercase tracking-widest">Supply Audit Nominal</span>
                </div>
                <button className="text-[9px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
                    Manage <ArrowUpRight size={12} />
                </button>
            </div>
        </div>
    );
};

export default CriticalResourceVault;
