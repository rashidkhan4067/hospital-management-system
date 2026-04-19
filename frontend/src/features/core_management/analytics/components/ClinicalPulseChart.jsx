import React from 'react';
import { 
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
    CartesianGrid, Tooltip, Legend 
} from 'recharts';

import { ChartSkeleton } from './AnalyticsSkeleton';

/**
 * 🛰️ ClinicalPulseChart (Institutional Dashboard Standard)
 * Compact visualization of Patient Volume vs Revenue.
 */
const ClinicalPulseChart = ({ data, isLoading }) => {
    if (isLoading) return <ChartSkeleton />;
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
                position: 'absolute', top: -150, right: -150, width: 400, height: 400,
                background: 'rgba(21, 88, 214, 0.02)',
                borderRadius: '100%', filter: 'blur(80px)', pointerEvents: 'none'
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
                        Operational Intensity
                    </div>
                    <div className="widget-title" style={{ marginTop: 2, fontSize: 16, letterSpacing: '-0.02em', fontWeight: 700 }}>Clinical Pulse Correlation</div>
                </div>
                <div className="px-3 py-1.5 rounded-xl border border-outline-variant/30 text-[9px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 bg-primary/5">
                    Live Telemetry
                </div>
            </div>

            {/* 📊 Strategic charting Area */}
            <div className="flex-1 min-h-0 z-1 p-6 pb-2">
                <div style={{ width: '100%', height: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--m3-primary)" stopOpacity={0.12}/>
                                    <stop offset="95%" stopColor="var(--m3-primary)" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--m3-success)" stopOpacity={0.12}/>
                                    <stop offset="95%" stopColor="var(--m3-success)" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="var(--m3-outline-variant)" opacity={0.3} />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: 'var(--m3-text-sub)', fontSize: 9, fontWeight: 700 }} 
                                dy={10}
                            />
                            <YAxis 
                                yAxisId="left"
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: 'var(--m3-text-sub)', fontSize: 9, fontWeight: 700, opacity: 0.4 }} 
                            />
                            <YAxis 
                                yAxisId="right" 
                                orientation="right"
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: 'var(--m3-success)', fontSize: 9, fontWeight: 700, opacity: 0.8 }} 
                                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                            />
                            <Tooltip 
                                cursor={{ stroke: 'var(--m3-primary)', strokeWidth: 1, strokeDasharray: '4 4' }}
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
                            <Area 
                                yAxisId="left"
                                type="monotone" 
                                dataKey="volume" 
                                name="Volume"
                                stroke="var(--m3-primary)" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#volGrad)" 
                                animationDuration={2000}
                            />
                            <Area 
                                yAxisId="right"
                                type="monotone" 
                                dataKey="revenue" 
                                name="Revenue"
                                stroke="var(--m3-success)" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#revGrad)" 
                                animationDuration={2500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 📟 Intelligence Legend & Footer */}
            <div style={{ 
                padding: '12px 24px', 
                borderTop: '1px solid rgba(0,0,0,0.04)', 
                background: 'rgba(255,255,255,0.6)', 
                backdropFilter: 'blur(5px)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                zIndex: 1
            }}>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" style={{ boxShadow: '0 0 8px var(--m3-primary)' }} />
                        <span className="text-[9px] font-bold text-text-sub uppercase tracking-wider opacity-60">Census Load</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success" style={{ boxShadow: '0 0 8px var(--m3-success)' }} />
                        <span className="text-[9px] font-bold text-text-sub uppercase tracking-wider opacity-60">Fiscal Flux</span>
                    </div>
                </div>
                <span className="text-[8px] font-bold text-text-sub/20 uppercase">Chart Shard BI-PULSE-v9</span>
            </div>
        </div>
    );
};

export default ClinicalPulseChart;
