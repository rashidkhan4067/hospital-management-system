import React from 'react';
import { Card } from '@/components/primitives';
import { Droplets, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

/**
 * 💊 PharmacyStockShard — Aesthetic stock telemetry
 */
export default function PharmacyStockShard({ inventory = [], loading = false }) {
  const categories = [...new Set(inventory.map(m => m.category || 'General'))];
  const catStats = categories.map(cat => ({
    label: cat,
    total: inventory.filter(m => m.category === cat).length,
    low: inventory.filter(m => m.category === cat && m.stock_quantity <= m.reorder_level).length
  })).slice(0, 4);

  return (
    <Card className="lg:col-span-1 p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-6 group">
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none transition-colors group-hover:bg-accent-primary/10" />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-inner group-hover:scale-110 transition-transform italic shrink-0">
          <Droplets size={24} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl lg:text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none font-display">Stock Node</h3>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-2 opacity-60 italic">Stability Matrix</p>
        </div>
      </div>

      <div className="space-y-6 mt-4 relative z-10">
        {loading ? (
            <div className="w-full h-40 flex items-center justify-center italic text-[10px] font-black uppercase text-slate-400">Syncing Telemetry...</div>
        ) : (
            catStats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-3 group/item">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-300 italic group-hover/item:text-accent-primary transition-colors">{stat.label}</span>
                        <div className="flex items-center gap-2">
                           <span className="text-[11px] font-black text-slate-900 dark:text-white italic tabular-nums">{stat.total} Items</span>
                           {stat.low > 0 && <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest px-2 py-0.5 bg-rose-500/10 rounded-lg">{stat.low} Critical</span>}
                        </div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div 
                           className={`h-full transition-all duration-1000 ${stat.low > 0 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                           style={{ width: `${Math.max(20, (1 - stat.low/stat.total) * 100)}%` }} 
                        />
                    </div>
                </div>
            ))
        )}
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-accent-primary/5 text-accent-primary text-[10px] font-black uppercase italic tracking-widest">
              <Zap size={14} className="animate-pulse" />
              Real-time Inventory Link Active
          </div>
      </div>
    </Card>
  );
}
