import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { Card } from '../../../ui';
import { motion } from 'framer-motion';

/**
 * 📈 Professional SaaS Trend Matrix
 * Strictly following the Theme Color Tokens (Accent Primary).
 */
const PatientTrends = ({ data, onViewStats }) => {
    const [viewMode, setViewMode] = useState('7d');

    return (
        <Card 
            onClick={onViewStats}
            className="relative bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/40 dark:border-white/5 rounded-[2rem] p-8 h-[400px] overflow-hidden group shadow-2xl transition-all duration-700 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
        >
            
            {/* 🌌 Atmospheric Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 group-hover:bg-accent-primary/10 transition-colors duration-1000" />
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 text-accent-primary flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">Clinical Trends</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] opacity-60">Patient Throughput Logic</p>
                        </div>
                    </div>

                    <div className="flex bg-white/50 dark:bg-white/5 p-1.5 rounded-2xl border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        {['7d', 'mo'].map((mode) => (
                            <button 
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === mode ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/30' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
                            >
                                {mode === '7d' ? '7 Days' : 'Month'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity={0.4} />
                                  <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity={0} />
                              </linearGradient>
                          </defs>
                          <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.05} />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8', textTransform: 'uppercase' }} 
                            dy={15}
                          />
                          <Tooltip 
                            contentStyle={{ 
                                borderRadius: '20px', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                background: 'rgba(15, 23, 42, 0.9)', 
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                fontSize: '11px',
                                fontWeight: 900,
                                color: '#fff',
                                padding: '15px'
                            }}
                            cursor={{ stroke: 'var(--color-accent-primary)', strokeWidth: 2, strokeDasharray: '5 5' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="var(--color-accent-primary)" 
                            strokeWidth={5} 
                            fillOpacity={1} 
                            fill="url(#areaGradient)" 
                            animationDuration={2000}
                            className="drop-shadow-[0_0_20px_rgba(var(--color-accent-primary),0.5)]"
                          />
                      </AreaChart>
                  </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
};

export default PatientTrends;
