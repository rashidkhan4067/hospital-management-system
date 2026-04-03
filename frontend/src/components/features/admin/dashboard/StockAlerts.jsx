import React from 'react';
import { Package, AlertTriangle, ShoppingCart, AlertCircle } from 'lucide-react';
import { Card, Badge, Button } from '../../../ui';
import { motion } from 'framer-motion';

const StockAlerts = ({ inventory = [
    { name: 'Panadol CF', stock: 12, unit: 'packs', level: 'critical' },
    { name: 'Amoxicillin', stock: 45, unit: 'vials', level: 'low' },
], onViewInventory }) => {
    return (
        <Card className="relative bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/40 dark:border-white/5 rounded-[2.5rem] p-6 shadow-2xl overflow-hidden group transition-all duration-700">
            
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[20px] bg-orange-500/10 text-orange-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                        <Package size={18} />
                    </div>
                    <div>
                        <h4 className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white">Stock Alerts</h4>
                        <p className="text-[8px] font-bold text-orange-500 uppercase tracking-[0.2em] animate-pulse">Critical Shortage</p>
                    </div>
                </div>
                <Badge className="bg-orange-500 text-white border-none text-[8px] px-3 py-1 font-black rounded-full shadow-lg shadow-orange-500/20">{inventory.length}</Badge>
            </div>

            <div className="space-y-3 relative z-10">
                {inventory.map((item, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className="flex items-center justify-between p-3 rounded-[1.8rem] bg-white/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group/item hover:border-orange-500/30 transition-all hover:translate-x-1"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className={`w-2.5 h-2.5 rounded-full ${item.level === 'critical' ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-amber-500 shadow-[0_0_10px_#f59e0b]'} animate-pulse`} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white tracking-tight leading-none">{item.name}</p>
                                <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">{item.stock} {item.unit} left</p>
                            </div>
                        </div>
                        <Button 
                            onClick={onViewInventory}
                            className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 text-slate-400 hover:text-orange-500 shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center transition-all opacity-0 group-hover/item:opacity-100"
                        >
                            <ShoppingCart size={14} />
                        </Button>
                    </motion.div>
                ))}
            </div>

            <Button 
                onClick={onViewInventory}
                className="w-full mt-6 bg-slate-900 dark:bg-accent-primary text-white px-6 py-3 rounded-[20px] text-[9px] font-black uppercase tracking-widest transition-all hover:shadow-[0_10px_30px_rgba(var(--color-accent-primary),0.3)] hover:-translate-y-1 flex items-center justify-center gap-3"
            >
                <AlertCircle size={14} /> Open Inventory
            </Button>
        </Card>
    );
};

export default StockAlerts;
