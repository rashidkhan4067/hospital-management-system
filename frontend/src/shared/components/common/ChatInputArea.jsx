import React from 'react';
import { Send, Mic, Waves, ChevronRight } from 'lucide-react';

export default function ChatInputArea({ 
    input, 
    setInput, 
    isTyping, 
    isListening, 
    startListening, 
    stopListening, 
    handleSend 
}) {
  return (
    <div className="p-8 border-t border-white/5 bg-white/5 backdrop-blur-2xl">
        <form 
            onSubmit={handleSend}
            className="relative group"
        >
            <div className="flex items-center gap-4 bg-slate-950/40 border border-white/10 rounded-[32px] p-2 pl-6 group-focus-within:border-teal-500/50 transition-all duration-500">
                <button 
                    type="button"
                    onClick={() => isListening ? stopListening() : startListening()}
                    className={`p-3 rounded-2xl transition-all ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/5 text-teal-400 hover:text-white hover:bg-teal-500/20'}`}
                >
                    {isListening ? <Waves size={20}/> : <Mic size={20} />}
                </button>
                
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening focus active..." : "Initialize clinical command shard..."}
                    className="flex-1 bg-transparent border-none py-4 text-sm font-bold text-white placeholder:text-white/20 focus:outline-none"
                    disabled={isListening}
                />

                <button 
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="w-14 h-14 bg-teal-500 text-slate-900 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20 transition-all disabled:opacity-30 disabled:grayscale"
                >
                    <Send size={20} />
                </button>
            </div>
        </form>
        
        <div className="mt-6 flex items-center justify-between px-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
            <p className="flex items-center gap-2 tracking-[0.2em] leading-none">
                 <ChevronRight className="w-3 h-3 text-teal-500" /> Bimodal Interaction: Type or Speak for extraction
            </p>
            <div className="flex gap-6 opacity-60 hover:opacity-100 transition-opacity">
                 <button className="hover:text-teal-400">Flush Registry</button>
                 <button className="hover:text-teal-400 underline decoration-teal-500/50 underline-offset-8">Intelligence Protocols</button>
            </div>
        </div>
    </div>
  );
}
