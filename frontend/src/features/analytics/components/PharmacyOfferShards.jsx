import React, { useState } from 'react';
import { Card, Button } from '@/components/primitives';
import { AlertTriangle, Tag, Calculator, ArrowRight, Percent, Zap, Wallet, CheckCircle } from 'lucide-react';

/**
 * 💊 LowStockReminderShard — Critical Inventory Uplink
 */
export function LowStockReminderShard({ items = [] }) {
  return (
    <Card className="p-7 rounded-[2.5rem] bg-rose-500 text-white border-none flex flex-col gap-5 shadow-xl shadow-rose-500/20 relative overflow-hidden group italic">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-700" />
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20 shadow-sm animate-pulse">
            <AlertTriangle size={18} />
        </div>
        <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display text-white">Low Stock Alert</h4>
      </div>

      <div className="space-y-3 relative z-10">
          {items.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm group/item hover:bg-white/20 transition-all">
                  <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase italic">{item.name}</span>
                      <span className="text-[8px] font-bold opacity-60 uppercase tracking-widest">Qty: {item.stock_quantity} left</span>
                  </div>
                  <Button className="w-7 h-7 rounded-lg bg-white text-rose-500 p-0 border-none shadow-sm hover:scale-110 active:scale-95 transition-all">
                      <Zap size={14} />
                  </Button>
              </div>
          ))}
          {items.length === 0 && (
             <p className="text-[9px] font-black uppercase italic opacity-60 text-center py-4">Global Matrix Stable</p>
          )}
      </div>

      <button className="mt-auto w-full bg-white text-rose-500 border-none rounded-xl py-3.5 text-[9px] font-black uppercase tracking-widest transition-all relative z-10 italic shadow-lg shadow-black/10">
          Dispatch Full Reorder Matrix
      </button>
    </Card>
  );
}

/**
 * ⚡ DiscountCalculatorShard — Fiscal Simulation Shard
 */
export function DiscountCalculatorShard() {
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const finalPrice = price && discount ? price - (price * (discount / 100)) : 0;

    return (
        <Card className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-6 group italic">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/10 shadow-inner group-hover:rotate-12 transition-transform italic shrink-0">
                    <Calculator size={22} />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none italic font-display">Fiscal Simulator</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-60 italic">Discount Matrix Calculation</p>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Unit Matrix (Rs.)</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors">
                            <Wallet size={12} />
                        </div>
                        <input 
                            type="number" 
                            placeholder="0.00"
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-[13px] font-black text-slate-900 dark:text-white focus:outline-none focus:border-accent-primary transition-all font-display italic"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Discount Node (%)</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors">
                            <Percent size={12} />
                        </div>
                        <input 
                            type="number" 
                            placeholder="0"
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-[13px] font-black text-slate-900 dark:text-white focus:outline-none focus:border-accent-primary transition-all font-display italic"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4 p-5 rounded-2xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-between relative z-10 overflow-hidden">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-accent-primary uppercase tracking-widest italic leading-none">Net Revenue Matrix</span>
                    <span className="text-xl font-black text-accent-primary italic mt-2 tabular-nums">Rs. {finalPrice.toLocaleString()}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-accent-primary text-white flex items-center justify-center shadow-lg shadow-accent-primary/20 italic">
                    <CheckCircle size={18} strokeWidth={2.5} />
                </div>
            </div>
        </Card>
    );
}

/**
 * 🎁 MedicinePromotionShard — Fiscal Incentives Shard
 */
export function MedicinePromotionShard() {
    return (
        <Card className="p-8 rounded-[3rem] bg-slate-900 text-white border-none flex flex-col gap-6 shadow-2als relative overflow-hidden group italic h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12 italic">
                    <Tag size={18} className="text-accent-primary" />
                </div>
                <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display">Active Offers</h4>
            </div>
            
            <div className="space-y-4 relative z-10">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/offer flex items-center justify-between">
                   <div className="flex flex-col gap-1">
                      <p className="text-[11px] font-black uppercase italic tracking-tighter">Emergency Shard 15%</p>
                      <p className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] italic">Valid until 2026-04-10</p>
                   </div>
                   <ArrowRight size={14} className="text-accent-primary group-hover/offer:translate-x-1 transition-transform" />
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/offer flex items-center justify-between">
                   <div className="flex flex-col gap-1">
                      <p className="text-[11px] font-black uppercase italic tracking-tighter">Bulk Antibiotics 10%</p>
                      <p className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] italic">Institutional Nodes Only</p>
                   </div>
                   <ArrowRight size={14} className="text-accent-primary group-hover/offer:translate-x-1 transition-transform" />
                </div>
            </div>

            <Button className="mt-auto w-full bg-accent-primary text-white border-none rounded-2xl py-4 text-[9px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/20 transition-all hover:scale-105 active:scale-95 z-10 italic">
                Manage Promotions
            </Button>
        </Card>
    );
}
