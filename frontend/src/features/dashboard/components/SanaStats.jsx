import React from 'react';
import { motion } from 'framer-motion';
import { Mic, CheckCircle2, MessageSquare, Bot } from 'lucide-react';
import { Card } from '@/components/primitives';

/**
 * Row 2 — SanaStats
 * Voice bookings count, success rate, last conversation.
 */
const SanaStats = ({ onOpenChat }) => {
  const stats = [
    { label: 'Voice Bookings', value: '42', icon: Mic, color: 'text-accent-primary', bg: 'bg-accent-primary/10', bar: 82 },
    { label: 'Success Rate',   value: '98.2%', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', bar: 98 },
    { label: 'Avg. Response',  value: '1.2s', icon: MessageSquare, color: 'text-sky-500', bg: 'bg-sky-500/10', bar: 65 },
  ];

  return (
    <Card
      onClick={onOpenChat}
      className="relative p-5 sm:p-7 rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/5 overflow-hidden cursor-pointer transition-all duration-500 h-full flex flex-col group"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/15 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent-primary/20 border border-accent-primary/30 flex items-center justify-center text-accent-primary">
              <Bot size={16} className="sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[12px] font-black uppercase italic tracking-tight text-white leading-none">Sana AI Stats</p>
              <p className="text-[7px] sm:text-[9px] font-bold text-accent-primary/60 uppercase tracking-widest mt-0.5 sm:mt-1">Live Intelligence</p>
            </div>
          </div>
          <div className="flex gap-1 sm:gap-1.5">
            {[0, 1, 2].map((d) => (
              <div key={d} className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-accent-primary opacity-30" />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/50`}>
                    <Icon size={14} className={s.color} /> {s.label}
                  </span>
                  <span className="text-[12px] font-black text-accent-primary tabular-nums">{s.value}</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${s.bar}%` }}
                    className="h-full bg-accent-primary rounded-full transition-all duration-1000"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-8 text-center italic border-t border-white/5 pt-4">Click to open chats — Neural Node 04</p>
      </div>
    </Card>
  );
};

export default SanaStats;
