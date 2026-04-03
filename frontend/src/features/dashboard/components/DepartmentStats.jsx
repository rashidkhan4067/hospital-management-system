import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * 🥧 Unit Distribution Shard
 * Features high-fidelity distribution telemetry that strictly follows
 * the theme's core accent for its primary segment.
 */
const DepartmentStats = ({ 
    data = [
        { name: 'Surgery', value: 35, color: 'var(--color-accent-primary)' }, 
        { name: 'OPD', value: 45, color: '#0ea5e9' },
        { name: 'Labs', value: 20, color: '#8b5cf6' }
    ],
    onNavigate
}) => {
    return (
        <Card 
            onClick={onNavigate}
            className="relative bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/40 dark:border-white/5 rounded-[2rem] p-8 h-[350px] overflow-hidden group shadow-2xl transition-all duration-700 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
            
            {/* 🌌 Atmospheric Glows */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-accent-primary/5 blur-[80px] rounded-full -ml-24 -mt-24 group-hover:bg-accent-primary/10 transition-colors duration-1000" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                            <h4 className="text-sm font-black uppercase tracking-[0.2em] italic text-slate-500 dark:text-slate-400">Section Distribution</h4>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-40">Operational Shards</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-white/5 flex items-center justify-center text-accent-primary group-hover:rotate-12 transition-transform duration-500">
                        <PieIcon size={24} />
                    </div>
                </div>

                <div className="flex-1 w-full relative">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-24 h-24 rounded-full bg-accent-primary/5 blur-2xl animate-pulse" />
                      <div className="absolute flex flex-col items-center">
                          <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums leading-none">100%</span>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sync</span>
                      </div>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                          <Pie 
                            data={data} 
                            cx="50%" 
                            cy="50%" 
                            innerRadius={75} 
                            outerRadius={95} 
                            paddingAngle={12} 
                            dataKey="value"
                            animationDuration={2000}
                            stroke="none"
                          >
                              {data.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.color} 
                                    className="drop-shadow-[0_0_12px_rgba(var(--color-accent-primary),0.3)] transition-all hover:opacity-100"
                                    opacity={index === 0 ? 1 : 0.6}
                                  />
                              ))}
                          </Pie>
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
                          />
                      </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
                   {data.map((d, i) => (
                     <div key={d.name} className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group/legend transition-all hover:bg-white dark:hover:bg-slate-800">
                        <div 
                            className="w-2.5 h-2.5 rounded-full shadow-lg group-hover/legend:scale-125 transition-transform" 
                            style={{ backgroundColor: d.color, boxShadow: `0 0 10px ${d.color}44` }} 
                        />
                        <span className="text-[10px] font-black uppercase italic tracking-tighter text-slate-500 dark:text-slate-400 group-hover/legend:text-slate-900 dark:group-hover/legend:text-white transition-colors">{d.name}</span>
                     </div>
                   ))}
                </div>
            </div>
        </Card>
    );
};

export default DepartmentStats;
