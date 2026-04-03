import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { Card } from '../../../ui';

/**
 * 💹 Revenue Flux Diagnostic Shard
 * Strictly follows the Theme Accent color via CSS variables.
 */
import { motion } from 'framer-motion';

const RevenueChart = ({ data, onViewFinances }) => {
    return (
        <Card 
            onClick={onViewFinances}
            className="relative bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/40 dark:border-white/5 rounded-[2.5rem] p-8 h-[350px] overflow-hidden group shadow-2xl transition-all duration-700 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
            
            {/* 🌌 Atmospheric Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-accent-primary/10 transition-colors duration-1000" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-primary/5 blur-[80px] rounded-full -ml-24 -mb-24" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                            <h4 className="text-sm font-black uppercase tracking-[0.2em] italic text-slate-500 dark:text-slate-400">Financial Pulse</h4>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-40">Monthly Revenue Stream</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-white/5 flex items-center justify-center text-accent-primary group-hover:rotate-6 transition-transform duration-500">
                        <BarChart3 size={24} />
                    </div>
                </div>

                <div className="flex-1 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                          <defs>
                              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity={1} />
                                  <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity={0.3} />
                              </linearGradient>
                          </defs>
                          <Bar 
                            dataKey="revenue" 
                            fill="url(#barGradient)"
                            radius={[12, 12, 4, 4]} 
                            animationDuration={1500}
                            className="drop-shadow-[0_0_15px_rgba(var(--color-accent-primary),0.4)]"
                          />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8', textTransform: 'uppercase' }} 
                            dy={15}
                          />
                          <Tooltip 
                            cursor={{ fill: 'var(--color-accent-primary)', opacity: 0.05 }}
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
                            formatter={(value) => [`Rs. ${value.toLocaleString()}`, "Revenue"]}
                          />
                      </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
};

export default RevenueChart;
