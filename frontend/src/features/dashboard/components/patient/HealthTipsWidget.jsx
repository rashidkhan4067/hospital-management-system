import React, { useState, useEffect } from 'react';
import { Heart, Activity, Droplets, Zap, ShieldCheck } from 'lucide-react';
import { Card } from '@/shared/components/ui';
import { motion, AnimatePresence } from 'framer-motion';

const HealthTipsWidget = () => {
  const [index, setIndex] = useState(0);

  const tips = [
    { 
      title: 'Hydration Fix', 
      desc: 'Drink at least 3 liters of water daily for optimal organ function.', 
      icon: Droplets, 
      accent: 'text-blue-500 bg-blue-500/10' 
    },
    { 
      title: 'Active Living', 
      desc: 'A 30-minute brisk walk can reduce risk of heart disease by 30%.', 
      icon: Activity, 
      accent: 'text-rose-500 bg-rose-500/10' 
    },
    { 
      title: 'Quality Sleep', 
      desc: 'Consistency is key. 7-8 hours of sleep regulates your metabolism.', 
      icon: Zap, 
      accent: 'text-amber-500 bg-amber-500/10' 
    },
    { 
      title: 'Immune Shield', 
      desc: 'Include Vitamin C rich fruits like oranges and kiwi in your diet.', 
      icon: ShieldCheck, 
      accent: 'text-emerald-500 bg-emerald-500/10' 
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length);
    }, 6000); // 🚀 Automatic rotation every 6s
    return () => clearInterval(interval);
  }, []);

  const tip = tips[index];

  return (
    <Card className="h-full p-8 sm:p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-2als group/tip transition-all hover:border-accent-primary/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-accent-primary/5 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="flex flex-col h-full space-y-6">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover/tip:scale-110 transition-transform duration-500">
                 <Heart size={20} fill="currentColor" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Health Tip</h3>
           </div>
           <div className="flex items-center gap-1.5 opacity-40">
              {tips.map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full ${i === index ? 'bg-accent-primary w-3 scale-y-110' : 'bg-slate-300'} transition-all`} />
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="flex-1 space-y-4 py-4"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tip.accent}`}>
               <tip.icon size={28} />
            </div>
            <div className="space-y-1">
               <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">{tip.title}</h4>
               <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mt-1 opacity-60 leading-relaxed">{tip.desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="pt-4 border-t border-slate-100 dark:border-white/5 mt-auto">
           <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover/tip:text-accent-primary transition-colors">Daily Wellness Shard</p>
        </div>
      </div>
    </Card>
  );
};

export default HealthTipsWidget;
