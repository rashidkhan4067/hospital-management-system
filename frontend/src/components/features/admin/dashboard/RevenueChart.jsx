import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { Card } from '../../../ui';

/**
 * 💹 Revenue Flux Diagnostic Shard
 * Strictly follows the Theme Accent color via CSS variables.
 */
const RevenueFlux = ({ data = [{ name: 'Feb', revenue: 12400 }, { name: 'Mar', revenue: 15800 }, { name: 'Apr', revenue: 18200 }] }) => {
    return (
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-2xl p-8 h-[350px] relative overflow-hidden group shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-500
            lg:shadow-[6px_6px_12px_#e2e8f0,-6px_-6px_12px_#ffffff] dark:lg:shadow-none">
            
            <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-500 dark:text-slate-400 leading-none">Revenue Flux</h4>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40">Monthly Shard Analysis</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <BarChart3 size={18} />
                </div>
            </div>

            <div className="flex-1 w-full relative z-10 pr-4">
              <ResponsiveContainer width="100%" height="200">
                  <BarChart data={data}>
                      {/* 🎨 Using CSS variable for strict theme adherence */}
                      <Bar 
                        dataKey="revenue" 
                        fill="var(--color-accent-primary)" 
                        radius={[8, 8, 4, 4]} 
                        animationDuration={1500}
                        opacity={0.8}
                        onMouseEnter={(data, index) => {}}
                        className="transition-all hover:opacity-100"
                      />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 800, fill: '#94a3b8' }} 
                        dy={10}
                      />
                      <Tooltip 
                        cursor={{ fill: 'var(--color-accent-primary)', opacity: 0.03 }}
                        contentStyle={{ 
                            borderRadius: '12px', 
                            border: 'none', 
                            background: '#0F172A', 
                            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                            fontSize: '9px',
                            fontWeight: 900,
                            color: '#fff'
                        }}
                      />
                  </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </Card>
    );
};

export default RevenueFlux;
