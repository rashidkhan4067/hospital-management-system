import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useClinicalTrends } from '../hooks/useClinicalTrends';
import { Card, UnifiedSkeleton } from '@/components/primitives';

/**
 * 📈 Professional SaaS Trend Matrix
 * Strictly following the Theme Color Tokens (Accent Primary).
 */

const PatientTrends = ({ onViewStats, viewMode = '7d', onRangeChange }) => {
    const navigate = useNavigate();
    const { trendData, loading, error } = useClinicalTrends(viewMode);

    const handleChartClick = (activeNode) => {
        if (activeNode?.activeLabel) {
             navigate(`/admin/analytics?range=${viewMode === '7d' ? '7days' : 'month'}`);
        }
    };

    if (loading) return <UnifiedSkeleton height="h-[400px]" />;

    if (error || !trendData?.length) {
        return (
            <Card className="relative bg-[#f8fafc] dark:bg-[#1a1d23] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 h-[400px] flex flex-col items-center justify-center text-center gap-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                    <TrendingUp size={32} />
                </div>
                <div>
                     <p className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wider">Clinical Node Offline</p>
                     <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Unable to retrieve throughput matrix</p>
                </div>
            </Card>
        );
    }

    return (
        <Card 
            className="relative bg-[#f8fafc] dark:bg-[#1a1d23] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 h-[400px] overflow-hidden group shadow-2xl transition-all duration-700 hover:shadow-accent-primary/10"
        >
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40" />
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 text-accent-primary flex items-center justify-center shadow-inner group-hover:rotate-6 transition-all duration-500">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tight">Clinical Trends</h3>
                                {trendData[0]?.is_simulated && (
                                    <span className="px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary text-[8px] font-black uppercase tracking-tighter">Simulation</span>
                                )}
                            </div>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider italic">Patient Throughput Logic</p>
                        </div>
                    </div>

                    <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/5 backdrop-blur-xl transition-all h-fit">
                        {['7d', 'mo'].map((mode) => (
                            <button 
                                key={mode}
                                onClick={(e) => { e.stopPropagation(); onRangeChange?.(mode); }}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === mode ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/30' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                            >
                                {mode === '7d' ? '7 Days' : 'Month'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 w-full relative">
                  <ResponsiveContainer width="100%" height="100%" debounce={1}>
                      <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 30 }} onClick={handleChartClick}>
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
                            tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} 
                            dy={15}
                          />
                          <Tooltip 
                            contentStyle={{ 
                                borderRadius: '20px', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                background: 'rgba(15, 23, 42, 0.9)', 
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                fontSize: '10px',
                                fontWeight: 900,
                                color: '#fff',
                                padding: '15px'
                            }}
                            formatter={(value) => [value, "Patients"]}
                            cursor={{ stroke: 'var(--color-accent-primary)', strokeWidth: 2, strokeDasharray: '5 5' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="var(--color-accent-primary)" 
                            strokeWidth={4} 
                            fillOpacity={1} 
                            fill="url(#areaGradient)" 
                            animationDuration={1000}
                            className="drop-shadow-[0_0_15px_rgba(var(--color-accent-primary),0.3)] cursor-pointer"
                          />
                      </AreaChart>
                  </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
};

export default PatientTrends;
