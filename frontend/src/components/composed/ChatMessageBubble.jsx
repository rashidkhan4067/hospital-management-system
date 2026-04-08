import React from 'react';
import { Bot, User, ShieldAlert, Sparkles } from 'lucide-react';

export default function ChatMessageBubble({ msg }) {
  return (
    <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
        <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border ${
                msg.role === 'assistant' 
                ? 'bg-teal-500/10 border-teal-500/30 text-teal-400' 
                : msg.role === 'error'
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}>
                {msg.role === 'assistant' ? <Bot size={20} /> : msg.role === 'error' ? <ShieldAlert size={20} /> : <User size={20} />}
            </div>
            
            <div className="space-y-2">
                <div className={`p-5 rounded-[28px] text-[13px] font-medium leading-relaxed ${
                    msg.role === 'assistant'
                    ? 'bg-white/5 border border-white/10 text-slate-100 rounded-tl-none'
                    : msg.role === 'error'
                    ? 'bg-rose-500/5 border border-rose-500/20 text-rose-200 rounded-tl-none'
                    : 'bg-teal-600 text-white rounded-tr-none shadow-xl shadow-teal-600/10'
                } shadow-2xl`}>
                    {msg.content}
                    
                    {msg.chatId && (
                        <div className={`mt-4 pt-4 border-t flex items-center justify-between text-[8px] font-black tracking-[0.2em] uppercase opacity-40 ${msg.role === 'user' ? 'border-white/10' : 'border-teal-500/10 text-teal-400'}`}>
                            <span>Session_Shard_{msg.chatId.slice(-6)}</span>
                            <Sparkles size={10} />
                        </div>
                    )}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 px-2 block ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    </div>
  );
}
