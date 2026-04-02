import React, { useState, useRef, useEffect } from 'react';
import { aiService } from '../../../services/AIService';
import { 
  Bot, 
  Send, 
  User, 
  Loader2, 
  Sparkles, 
  ChevronRight, 
  ShieldAlert,
  Zap,
  Mic,
  Waves,
  History
} from 'lucide-react';
import { PageHeader, Button, Card, Badge } from '../../../components/ui';

/**
 * 🛰️ Sana Universal Neural Interface
 * High-fidelity clinical command hub with stateful dialogue & voice capabilities.
 */
const SanaAIChat = () => {
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            role: 'assistant', 
            content: "Assalam-o-Alaikum! I am Sana. How can I assist you with clinical operations or appointment bookings today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [chatId, setChatId] = useState(null);
    const scrollRef = useRef(null);
    const audioRef = useRef(new Audio());
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const addMessage = (content, role, metadata = {}) => {
        setMessages(prev => [...prev, {
            id: Date.now(),
            role,
            content,
            timestamp: new Date(),
            ...metadata
        }]);
    };

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        const query = input.trim();
        if (!query || isTyping) return;

        setInput('');
        addMessage(query, 'user');
        setIsTyping(true);

        try {
            const result = await aiService.askSana(query, chatId);
            if (result.chat_id) setChatId(result.chat_id);
            
            addMessage(result.response, 'assistant', { chatId: result.chat_id });
            
            if (result.audio_url) {
                audioRef.current.src = result.audio_url;
                audioRef.current.play().catch(e => console.warn("Audio autoplay blocked", e));
            }
        } catch (error) {
            const errorMsg = error?.response?.data?.detail || error?.response?.data?.error || "The neural core has encountered a threshold breach. Please verify your connection shard.";
            addMessage(errorMsg, 'error');
        } finally {
            setIsTyping(false);
        }
    };

    // 🎙️ Voice Propagation Logic (Unified)
    const startListening = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];
            mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
            mediaRecorder.current.onstop = async () => {
                const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
                sendVoiceToPipeline(blob);
            };
            mediaRecorder.current.start();
            setIsListening(true);
        } catch (err) {
            addMessage("Neural microphone access denied. Check system permissions.", "error");
        }
    };

    const stopListening = () => {
        if (mediaRecorder.current && isListening) {
            mediaRecorder.current.stop();
            setIsListening(false);
            mediaRecorder.current.stream.getTracks().forEach(t => t.stop());
        }
    };

    const sendVoiceToPipeline = async (blob) => {
        setIsTyping(true);
        const formData = new FormData();
        formData.append('audio', blob, 'shard.webm');
        if (chatId) formData.append('chat_id', chatId);

        try {
            const resp = await aiService.vocalQuery(formData);
            if (resp.chat_id) setChatId(resp.chat_id);
            if (resp.transcript) addMessage(resp.transcript, 'user');
            
            addMessage(resp.response, 'assistant', { chatId: resp.chat_id });
            
            if (resp.audio_url) {
                audioRef.current.src = resp.audio_url;
                audioRef.current.play().catch(e => console.warn("Audio autoplay blocked", e));
            }
        } catch (err) {
            const errorMsg = err?.response?.data?.detail || "Neural voice propagation failed. Check your network shard.";
            addMessage(errorMsg, "error");
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-[700px] w-full max-w-4xl mx-auto rounded-[40px] overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-3xl shadow-2xl relative group">
            {/* 💎 Background Flare */}
            <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />

            {/* 🛰️ Header Module */}
            <div className="px-8 py-6 border-b border-white/5 bg-white/5 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="bg-teal-500/10 p-3 rounded-2xl border border-teal-500/20 shadow-inner">
                            <Bot className="w-6 h-6 text-teal-400" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-4 border-slate-900 animate-pulse shadow-lg shadow-emerald-500/50" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase italic tracking-tighter text-white flex items-center gap-2 leading-none">
                            Sana Neural Expert
                            <Badge className="bg-teal-500/20 text-teal-300 border-none text-[8px] font-black py-0.5 tracking-tighter">Llama-3.3-70B</Badge>
                        </h3>
                        <p className="text-[10px] font-bold text-teal-500/60 uppercase tracking-[0.3em] mt-1.5 flex items-center gap-2">
                           <Zap size={10} className="animate-pulse" /> Pulse Stable | Multi-Modal Active
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"><History size={16}/></button>
                    <div className="flex gap-1 items-center px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                        <span className="text-[8px] font-black text-emerald-500 tracking-widest uppercase">Live Node</span>
                    </div>
                </div>
            </div>

            {/* 🧬 Dialogue Shards */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar"
            >
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
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
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-3xl">
                             <div className="flex gap-1.5">
                                <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></span>
                             </div>
                             <span className="text-[9px] text-teal-400 font-black uppercase tracking-[0.3em] italic">Neural Inference...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* ⌨️ Command Console Layer */}
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
        </div>
    );
};

export default SanaAIChat;
