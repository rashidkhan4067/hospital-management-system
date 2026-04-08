import React, { useState } from 'react';
import { 
  FileBarChart2, Download, TrendingUp, TrendingDown, Wallet, 
  Activity, Calendar, Filter, ArrowUpRight, Zap, PieChart as PieIcon,
  ShieldCheck, Clock
} from 'lucide-react';
import { 
  Button, 
  Card, 
  PageHeader,
  Badge
} from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';

// 🏗️ MODULAR ANALYTICS SHARDS
import RevenueCycleShard from '../components/RevenueCycleShard';
import SpendingBreakdownShard from '../components/SpendingBreakdownShard';
import FiscalVelocityShard from '../components/FiscalVelocityShard';

/**
 * 💹 Financial Reports Command Center
 * High-fidelity hub for clinical audit and fiscal analytics.
 */
export default function FinancialReportsPage() {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('This Month');

  // 🧪 Mock Analytics Matrix
  const stats = {
    revenue: 4850000,
    expenses: 2150000,
    netProfit: 2700000,
    growth: '+14.2%',
    velocity: 82.4,
    efficiency: '98.2%'
  };

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000">
        
        {/* 🛸 COMMAND CLUSTER: Row 1 — Header */}
        <PageHeader 
          title="Fiscal Strategy Matrix"
          subtitle="Clinical Financial Analysis & Intelligence Shards"
          status="Audit Ready"
          actions={
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 italic">
                <Calendar size={14} className="text-slate-400" />
                <span className="text-[10px] font-black uppercase text-slate-500 whitespace-nowrap">{dateRange}</span>
              </div>
              <Button 
                className="bg-accent-primary text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/25 border-none hover:scale-105 transition-all italic font-display"
              >
                <Download size={16} className="mr-2" /> Global Export
              </Button>
            </div>
          }
        />

        {/* 🌠 PERSISTENT HUB: Row 2 — Hero CTA */}
        <UnifiedHeroCTA 
          compact
          title={<>Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Intelligence.</span></>}
          subtitle={`Propagating fiscal reports with Rs. ${stats.revenue.toLocaleString()} in identified revenue nodes. High-fidelity audit synchronization successful.`}
          pillPrefix="Fiscal Report Shard"
          pillIcon={FileBarChart2}
          actions={[
             { title: 'Full Report', subtitle: 'Detailed Ledger', icon: Activity, onClick: () => {} },
             { title: 'Tax Shard',   subtitle: 'Fiscal Compliance', icon: ShieldCheck, onClick: () => {} },
          ]}
        />

        {/* 🛰 KPI Hub */}
        <UnifiedKpiGrid 
          loading={loading}
          stats={[
            { title: 'Gross Matrix', value: `Rs. ${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: 'text-slate-900 dark:text-white', trend: '+14% Up' },
            { title: 'Total Outflow', value: `Rs. ${stats.expenses.toLocaleString()}`, icon: TrendingDown, color: 'text-rose-500', trend: '-2% Down' },
            { title: 'Net Propagation', value: `Rs. ${stats.netProfit.toLocaleString()}`, icon: Wallet, color: 'text-emerald-500', trend: 'Stable' },
            { title: 'Growth Velocity', value: stats.growth, icon: Zap, color: 'text-accent-primary', trend: 'Optimal' }
          ]}
        />

        {/* 🏗 ANALYTICS ASSEMBLY: High-Fidelity Shards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
           
           {/* LEFT - Revenue Cycle (8 cols) */}
           <div className="lg:col-span-8">
              <RevenueCycleShard />
           </div>

           {/* RIGHT - Fiscal Velocity (4 cols) */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              <FiscalVelocityShard 
                 amount={`${stats.velocity}K`} 
                 subtitle="Avg. Per Patient Shard"
                 efficiency={stats.efficiency}
              />
              
              <ProfitabilityMirrorShard stats={stats} />
           </div>

           {/* BOTTOM - Outflow Breakdown (6 cols) + Secondary Analytics (6 cols) */}
           <div className="lg:col-span-7">
              <SpendingBreakdownShard />
           </div>

           <div className="lg:col-span-5 flex flex-col gap-6">
              <Card className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als relative overflow-hidden flex-1 group">
                 <div className="absolute top-0 left-0 w-full h-full bg-slate-900/5 group-hover:bg-slate-900/10 transition-colors pointer-events-none" />
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 italic">
                       <Clock size={20} />
                    </div>
                    <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display text-slate-800 dark:text-white">Recent Audit Events</h4>
                 </div>
                 
                 <div className="space-y-6">
                    {[
                       { time: '10:45 AM', event: 'Fiscal Node Exported', ref: 'EXT-9921', status: 'SUCCESS' },
                       { time: '09:12 AM', event: 'Revenue Shard Synced', ref: 'REV-SH-44', status: 'SUCCESS' },
                       { time: '08:00 AM', event: 'Payroll Batch Initialized', ref: 'PAY-IDX-02', status: 'PENDING' },
                    ].map((idx, i) => (
                       <div key={i} className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4 last:border-none last:pb-0">
                          <div className="flex flex-col gap-1">
                             <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{idx.event}</p>
                             <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{idx.time} · {idx.ref}</p>
                          </div>
                          <Badge variant={idx.status === 'SUCCESS' ? 'success' : 'warning'} className="text-[7px] font-black uppercase italic italic">{idx.status}</Badge>
                       </div>
                    ))}
                 </div>
                 
                 <Button className="w-full mt-8 bg-slate-900 dark:bg-white/10 text-white py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-none transition-all hover:brightness-110 active:scale-95 italic font-display">
                    View Complete Audit Log
                 </Button>
              </Card>
           </div>
        </div>

      </div>
    </AdminPage>
  );
}

/** 🛸 UI SUB-COMPONENT: Profitability Shard */
function ProfitabilityMirrorShard({ stats }) {
    return (
        <Card className="p-8 rounded-[3rem] bg-accent-primary text-white border-none flex flex-col gap-6 shadow-2xl shadow-accent-primary/20 relative overflow-hidden group h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12 italic">
                    <TrendingUp size={18} />
                </div>
                <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display">Profit Margin</h4>
            </div>
            
            <div className="mt-2 space-y-1 relative z-10">
                <p className="text-4xl font-black italic tracking-tighter leading-none">55.6%</p>
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest italic opacity-80 mt-2">Net Operational Efficiency</p>
            </div>

            <div className="mt-auto space-y-4 relative z-10">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white transition-all duration-1000" style={{ width: '55.6%' }} />
                </div>
                <p className="text-[8px] font-black italic text-white/50 leading-relaxed uppercase tracking-wide">
                    Neural projections suggest stability in the next fiscal window. No action required.
                </p>
            </div>
        </Card>
    );
}

function Loading() {
  return (
    <AdminPage>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-[1.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-accent-primary animate-spin shadow-inner italic">
             <FileBarChart2 size={24} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/30 italic font-display">
            Synthesizing Fiscal Report Matrix...
          </p>
        </div>
      </div>
    </AdminPage>
  );
}
