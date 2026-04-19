import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import { ShimmerCard } from './AnalyticsSkeleton';

/**
 * 👥 DemographicDistributionCard (Institutional Standard)
 * Visualizes patient age-group stratification across the hospital cluster.
 */
const DemographicDistributionCard = ({ data, isLoading }) => {
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
                position: 'absolute', top: -100, right: -100, width: 300, height: 300,
                background: 'rgba(21, 88, 214, 0.02)',
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
                        <div className="eyebrow-dot" style={{ background: 'var(--m3-primary)' }} />
                        Population Intelligence
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, letterSpacing: '-0.03em', fontWeight: 700 }}>Demographic distribution</div>
                </div>
            </div>

            {/* 📊 Matrix Content */}
            <div className="flex-1 min-h-0 z-1 p-6 flex flex-col items-center justify-center">
                <div style={{ width: '100%', height: '220px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <defs>
                                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                                    <feOffset dx="0" dy="4" result="offsetblur" />
                                    <feComponentTransfer>
                                        <feFuncA type="linear" slope="0.1" />
                                    </feComponentTransfer>
                                    <feMerge>
                                        <feMergeNode />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                                filter="url(#shadow)"
                            >
                                {data?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
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
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Custom Legend */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
                    {data?.map((entry, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: entry.color }} />
                            <span className="text-[9px] font-bold text-text-sub uppercase tracking-wider opacity-60">{entry.name}</span>
                        </div>
                    ))}
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
                <span className="text-[9px] font-bold text-text-sub opacity-40 uppercase tracking-[0.2em]">Institutional Stratification v4</span>
                <span className="text-[8px] font-bold text-text-sub/20 uppercase">Shard BI-DEMO-9</span>
            </div>
        </div>
    );
};

export default DemographicDistributionCard;
