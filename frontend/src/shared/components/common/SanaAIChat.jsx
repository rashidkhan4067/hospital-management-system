import React, { useState, useRef, useEffect } from 'react';
import { aiService } from '@/features/ai/api/aiService';
import {
  Bot, 
  Zap,
  History
} from 'lucide-react';
import { PageHeader, Button, Card, Badge } from '@/shared/components/ui';
import ChatMessageBubble from './ChatMessageBubble';
import ChatInputArea from './ChatInputArea';

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
                    <ChatMessageBubble key={msg.id} msg={msg} />
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
            <ChatInputArea 
              input={input} 
              setInput={setInput} 
              isTyping={isTyping} 
              isListening={isListening} 
              startListening={startListening} 
              stopListening={stopListening} 
              handleSend={handleSend} 
            />
        </div>
    );
};

export default SanaAIChat;
