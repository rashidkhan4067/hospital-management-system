import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * Row 5 — RevenueCard
 * Today's revenue, pending payments, monthly target progress bar.
 */
const RevenueCard = ({ pulse, loading, onNavigate }) => {
  const todayRevenue  = pulse?.financial?.net_revenue || 0;
  const monthTarget   = 500000;
  const progress      = Math.min((todayRevenue / monthTarget) * 100, 100).toFixed(0);
  const pendingAmt    = pulse?.financial?.pending || 0;

  return (
    <Card className="p-5 sm:p-7 rounded-3xl sm:rounded-[2.5rem] bg-white/70 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-3xl h-full shadow-xl flex flex-col group overflow-hidden" onClick={onNavigate}>
      <div className="flex items-center gap-2 mb-6">
        <DollarSign size={13} className="text-emerald-500" />
        <h3 className="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-white leading-none">Revenue Snapshot</h3>
      </div>

      {/* Today Revenue */}
      <div className="mb-4">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Today's Revenue</p>
        <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums leading-none">
          {loading ? '...' : `Rs. ${todayRevenue.toLocaleString()}`}
        </p>
      </div>

      {/* Pending */}
      <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
        <Clock size={12} className="text-amber-500 shrink-0" />
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Pending Payments</p>
          <p className="text-[12px] font-black text-amber-500">Rs. {pendingAmt.toLocaleString() || '12,400'}</p>
        </div>
      </div>

      {/* Monthly progress */}
      <div>
        <div className="flex justify-between mb-1.5">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Monthly Target</span>
          <span className="text-[9px] font-black text-accent-primary">{progress}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-accent-primary to-emerald-500 rounded-full transition-all duration-1000"
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[8px] font-bold text-slate-300 dark:text-slate-600">Rs. 0</span>
          <span className="text-[8px] font-bold text-slate-300 dark:text-slate-600">Rs. {(monthTarget / 1000).toFixed(0)}K</span>
        </div>
      </div>
    </Card>
  );
};

export default RevenueCard;
