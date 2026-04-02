import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from '../../../ui';
import { motion } from 'framer-motion';

/**
 * 📈 Professional SaaS Trend Matrix
 * Strictly following the Theme Color Tokens (Accent Primary).
 */
const AppointmentTrends = ({ data }) => {
    const [viewMode, setViewMode] = useState('7d');

    return (
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-2xl p-8 h-[450px] shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out relative flex flex-col group lg:shadow-[8px_8px_16px_#e2e8f0,-8px_-8px_16px_#ffffff] dark:lg:shadow-none">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 relative z-10 w-full px-2">
                <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none uppercase italic border-l-4 border-accent-primary pl-4">Clinical Demand Shard</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Aggregate Patient Throughput Protocol</p>
                </div>

                {/* 🔘 SLIDE SWITCH - THEMED DESIGN */}
                <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl relative self-center sm:self-auto shadow-inner">
                    <motion.div
                        className="absolute bg-white dark:bg-slate-800 rounded-lg shadow-sm w-[80px] h-[32px] z-0"
                        animate={{ x: viewMode === '7d' ? 0 : 80 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                    <button 
                        onClick={() => setViewMode('7d')}
                        className={`w-20 h-8 text-[10px] font-black uppercase tracking-tight relative z-10 transition-colors ${viewMode === '7d' ? 'text-accent-primary' : 'text-slate-400'}`}
                    >
                        7 Days
                    </button>
                    <button 
                        onClick={() => setViewMode('mo')}
                        className={`w-20 h-8 text-[10px] font-black uppercase tracking-tight relative z-10 transition-colors ${viewMode === 'mo' ? 'text-accent-primary' : 'text-slate-400'}`}
                    >
                        Month
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full relative z-10 pb-4 pr-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorAccent" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-accent-primary)" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="var(--color-accent-primary)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.03} />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} 
                            dy={15} 
                        />
                        <Tooltip 
                            contentStyle={{ 
                                borderRadius: '12px', 
                                border: 'none', 
                                background: '#0F172A', 
                                color: '#fff',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                fontWeight: 900,
                                padding: '12px'
                            }} 
                            cursor={{ stroke: 'var(--color-accent-primary)', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="var(--color-accent-primary)" 
                            strokeWidth={4} 
                            fillOpacity={1} 
                            fill="url(#colorAccent)" 
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default AppointmentTrends;
