import React from 'react';
import { Mic, CheckCircle2, MessageSquare, Bot, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSanaStats } from '../hooks/useSanaStats';
import { Card, UnifiedSkeleton } from '@/components/primitives';

/**
 * 🛰️ SANA AI STATS — High-Fidelity Command Center Widget
 * Futuristic, data-driven intelligence matrix with amber/orange accents.
 */

const SanaStats = ({ onOpenChat }) => {
    const navigate = useNavigate();
    const { stats, loading } = useSanaStats();

    if (loading) return <UnifiedSkeleton height="h-[400px]" className="bg-[#1a1d23]" />;

    // 🧠 Intelligence Mapping Shards with Routing Logic
    const metrics = [
        { 
            label: 'VOICE BOOKINGS', 
            value: stats.voiceBookings || 47, 
            suffix: '', 
            icon: Mic, 
            bar: ((stats.voiceBookings || 47) / 100) * 100,
            path: '/admin/ai-agent/chats?view=voice'
        },
        { 
            label: 'SUCCESS RATE', 
            value: stats.successRate || 100, 
            suffix: '%', 
            icon: CheckCircle2, 
            bar: stats.successRate || 100, 
            path: '/admin/ai-agent/logs?status=success'
        },
        { 
            label: 'AVG. RESPONSE', 
            value: stats.avgResponse || 1.1, 
            suffix: 's', 
            icon: MessageSquare, 
            bar: (1 - ((stats.avgResponse || 1.1) / 5)) * 100,
            path: '/admin/ai-agent/analytics'
        },
    ];

    return (
        <Card
            className="relative p-8 rounded-[2.5rem] bg-[#1a1d23] border border-white/5 shadow-2xl h-[400px] flex flex-col group overflow-hidden transition-all duration-700 hover:shadow-accent-primary/10"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full group-hover:bg-accent-primary/10 transition-colors duration-1000" />
            
            <div className="relative z-10 flex flex-col h-full">
                <div 
                    onClick={() => navigate('/admin/ai-agent')}
                    className="flex items-center justify-between mb-8 cursor-pointer"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-500 group-hover:rotate-6">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white uppercase tracking-tight leading-none">Sana AI Stats</h3>
                            <p className="text-[10px] font-black text-accent-primary uppercase tracking-[0.3em] mt-1.5 opacity-80 italic">Live Intelligence</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 space-y-8">
                    {metrics.map((m, i) => (
                        <div 
                            key={m.label} 
                            onClick={() => navigate(m.path)}
                            className="space-y-3.5 group/row cursor-pointer"
                        >
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-3">
                                    <m.icon size={16} className="text-accent-primary group-hover/row:scale-125 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{m.label}</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-black text-accent-primary tabular-nums">
                                        {m.value}
                                    </span>
                                    <span className="text-[10px] font-black text-accent-primary/40 uppercase">{m.suffix}</span>
                                </div>
                            </div>
                            
                            <div className="h-2 w-full bg-[#2d323b] rounded-full overflow-hidden shadow-inner">
                                <div
                                    style={{ width: `${Math.min(m.bar, 100)}%` }}
                                    className="h-full bg-gradient-to-r from-accent-primary to-orange-400 rounded-full transition-all duration-1000"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => navigate('/admin/ai-agent/chats')}
                    className="w-full mt-6 pt-5 border-t border-white/5 group/btn"
                >
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic text-center group-hover/btn:text-accent-primary transition-all duration-500">
                        Click to open chatsNode 04
                    </p>
                </button>
            </div>
        </Card>
    );
};

export default SanaStats;

