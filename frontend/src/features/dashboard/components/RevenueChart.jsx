import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, UnifiedSkeleton } from '@/components/primitives';

const RevenueChart = ({ data = [], loading, error, onViewFinances, range = '6mo' }) => {
    const navigate = useNavigate();
    
    const chartData = React.useMemo(() => data, [data]);

    if (loading) return <UnifiedSkeleton height="h-[400px]" />;

    if (error || !chartData?.length) {
        return (
            <Card className="relative bg-[#f8fafc] dark:bg-[#1a1d23] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 h-[400px] flex flex-col items-center justify-center text-center gap-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                    <BarChart3 size={32} />
                </div>
                <div>
                     <p className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wider">Revenue Matrix Offline</p>
                     <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Unable to retrieve financial telemetry</p>
                </div>
            </Card>
        );
    }

    const handleBarClick = (entry) => {
        if (entry?.name) {
            navigate(`/admin/billing?month=${entry.name}`);
        }
    };

    return (
        <Card 
            className="relative bg-[#f8fafc] dark:bg-[#1a1d23] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 h-[400px] overflow-hidden group shadow-2xl transition-all duration-700 hover:shadow-accent-primary/10"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full -mr-32 -mt-32" />
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h4 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tight">Financial Pulse</h4>
                            {chartData[0]?.is_simulated && (
                                <span className="px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary text-[8px] font-black uppercase tracking-tighter">Simulation</span>
                            )}
                        </div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider italic">Monthly Revenue Stream • {range}</p>
                    </div>
                    <button 
                         onClick={onViewFinances}
                         className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-white/5 flex items-center justify-center text-accent-primary hover:rotate-6 transition-transform duration-500"
                    >
                        <BarChart3 size={20} />
                    </button>
                </div>

                <div className="flex-1 w-full relative">
                  <ResponsiveContainer width="100%" height="100%" debounce={1}>
                      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 30 }} onClick={(e) => e && handleBarClick(e.activePayload?.[0]?.payload)}>
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
                            className="cursor-pointer"
                          />
                          <XAxis 
                            dataKey="month" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} 
                            dy={15}
                          />
                          <Tooltip 
                            cursor={{ fill: 'var(--color-accent-primary)', opacity: 0.05, radius: 10 }}
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
