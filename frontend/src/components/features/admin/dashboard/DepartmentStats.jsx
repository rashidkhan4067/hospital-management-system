import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { Card } from '../../../ui';

/**
 * 🥧 Unit Distribution Shard
 * Features high-fidelity distribution telemetry that strictly follows
 * the theme's core accent for its primary segment.
 */
const DepartmentDistribution = ({ 
    data = [
        { name: 'Surgery', value: 35, color: 'var(--color-accent-primary)' }, 
        { name: 'OPD', value: 45, color: '#3B82F6' },
        { name: 'Labs', value: 20, color: '#F97316' }
    ] 
}) => {
    return (
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-2xl p-8 h-[350px] relative overflow-hidden group shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-500 lg:shadow-[6px_6px_12px_#e2e8f0,-6px_-6px_12px_#ffffff] dark:lg:shadow-none">
            
            <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-500 dark:text-slate-400 leading-none">Unit Distribution</h4>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40">Section Shard Analysis</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <PieIcon size={18} />
                </div>
            </div>

            <div className="h-[180px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                      <Pie 
                        data={data} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60} 
                        outerRadius={80} 
                        paddingAngle={8} 
                        dataKey="value"
                        animationDuration={1500}
                        stroke="none"
                      >
                          {data.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                opacity={index === 0 ? 1 : 0.4} 
                                fill={entry.color} 
                              />
                          ))}
                      </Pie>
                      <Tooltip 
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
                  </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 mt-6 pb-2">
               {data.map((d, i) => (
                 <div key={d.name} className="flex items-center gap-2 group/legend">
                    <div 
                        className="w-2.5 h-2.5 rounded-full shadow-sm group-hover/legend:scale-125 transition-transform" 
                        style={{ backgroundColor: d.color, opacity: i === 0 ? 1 : 0.4 }} 
                    />
                    <span className="text-[9px] font-black uppercase italic tracking-tighter text-slate-500 dark:text-slate-400 opacity-60 group-hover/legend:opacity-100 transition-opacity whitespace-nowrap">{d.name}</span>
                 </div>
               ))}
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent-primary/5 rounded-full blur-[80px] pointer-events-none" />
        </Card>
    );
};

export default DepartmentDistribution;
