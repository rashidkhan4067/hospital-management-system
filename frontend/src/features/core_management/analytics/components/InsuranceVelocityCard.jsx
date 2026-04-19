import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from 'recharts';

import { ShimmerCard } from './AnalyticsSkeleton';

/**
 * 🛡️ InsuranceVelocityCard (Fiscal Pipeline Standard)
 * Visualizes claim conversion velocity and approval ratios.
 */
const InsuranceVelocityCard = ({ data, isLoading }) => {
    if (isLoading) return <ShimmerCard height="380px" />;
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
                zIndex: 1
            }}>
                <div className="flex-1">
                    <div className="eyebrow">
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-success)' }} />
                        Fiscal Pipeline
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, letterSpacing: '-0.03em', fontWeight: 700 }}>Insurance velocity</div>
                </div>
                <div className="px-3 py-1.5 rounded-xl border border-success/30 text-[9px] font-bold uppercase tracking-widest text-success flex items-center gap-1.5 bg-success/5">
                    High Flux
                </div>
            </div>

            {/* 📊 Matrix Content */}
            <div className="flex-1 min-h-0 z-1 p-6 pb-2">
                <div style={{ width: '100%', height: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ left: -30, right: 30, top: 20, bottom: 20 }}>
                            <XAxis type="number" hide />
                            <YAxis 
                                dataKey="name" 
                                type="category" 
                                axisLine={false} 
                                tickLine={false} 
                                width={120}
                                tick={{ fill: 'var(--m3-text-sub)', fontSize: 9, fontWeight: 700, opacity: 0.8 }} 
                            />
                            <Tooltip 
                                cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }}
                                contentStyle={{ 
                                    borderRadius: '16px', 
                                    border: '1px solid var(--m3-outline-variant)',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                                    background: 'rgba(255,255,255,0.95)',
                                    backdropFilter: 'blur(10px)',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    padding: '12px'
                                }} 
                            />
                            <Bar 
                                dataKey="value" 
                                radius={[0, 10, 10, 0]} 
                                barSize={24}
                                animationDuration={2000}
                            >
                                {data?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 📟 Intelligence Footer */}
            <div style={{ 
                padding: '12px 24px', 
                borderTop: '1px solid rgba(0,0,0,0.04)', 
                background: 'rgba(255,255,255,0.6)', 
                backdropFilter: 'blur(5px)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                zIndex: 1
            }}>
                <span className="text-[9px] font-bold text-text-sub opacity-40 uppercase tracking-[0.2em]">Settlement Propagation Matrix</span>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[8px] font-bold text-text-sub/20 uppercase tracking-tighter">Auto-Sync Active</span>
                </div>
            </div>
        </div>
    );
};

export default InsuranceVelocityCard;
