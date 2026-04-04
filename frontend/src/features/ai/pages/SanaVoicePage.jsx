import React, { useState, useRef, useEffect } from 'react';
import { Bot, Mic, Square, Volume2, Sparkles, History, ArrowRight, Activity, Zap } from 'lucide-react';
import { Card, Button, Badge } from '@/shared/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceWaves from '../components/patient/VoiceWaves';
import { aiService } from '@/features/ai/api/aiService';

export default function SanaVoicePage() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('Assalam-o-Alaikum! I am Sana. Tap the neural node to communicate via voice.');
  const [history, setHistory] = useState([]);
  
  const audioRef = useRef(new Audio());
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];
      mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
      mediaRecorder.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        sendVoice(blob);
      };
      mediaRecorder.current.start();
      setIsListening(true);
      setTranscript('Listening for clinical input...');
    } catch (err) {
      console.error(err);
    }
  };

  const stopListening = () => {
    if (mediaRecorder.current && isListening) {
      mediaRecorder.current.stop();
      setIsListening(false);
      mediaRecorder.current.stream.getTracks().forEach(t => t.stop());
    }
  };

  const sendVoice = async (blob) => {
    const formData = new FormData();
    formData.append('audio', blob, 'shard.webm');
    
    try {
      setIsSpeaking(true);
      setTranscript('Processing Neural Shards...');
      const resp = await aiService.vocalQuery(formData);
      
      setTranscript(resp.transcript);
      setResponse(resp.response);
      setHistory(prev => [{ q: resp.transcript, a: resp.response }, ...prev]);

      if (resp.audio_url) {
        audioRef.current.src = resp.audio_url;
        audioRef.current.onended = () => setIsSpeaking(false);
        audioRef.current.play();
      } else {
        setIsSpeaking(false);
      }
    } catch (err) {
      setTranscript('Neural connection threshold breach.');
      setIsSpeaking(false);
    }
  };

  const quickPrompts = [
     "When is my next appointment?",
     "Who is the best cardiologist?",
     "Is Dr. Sarah available today?",
     "What are the hospital hours?"
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-10 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1200px] mx-auto">
      {/* 🚀 Layer 1: Neural Status Shard */}
      <div className="flex flex-col items-center justify-center space-y-12 flex-1 relative">
         <div className="absolute inset-0 bg-accent-primary/5 blur-[150px] rounded-full -z-10 pointer-events-none animate-pulse" />
         
         <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3">
               <div className="px-5 py-2 bg-slate-900 border border-white/10 rounded-2xl flex items-center gap-3 shadow-xl">
                  <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : isSpeaking ? 'bg-blue-400 animate-pulse' : 'bg-emerald-500'} shadow-lg`} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white italic">
                     {isListening ? 'Sana: Listening' : isSpeaking ? 'Sana: Transmitting' : 'Sana: Ready'}
                  </span>
               </div>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter max-w-2xl mx-auto leading-tight">
               {isListening ? 'Voice Input Active...' : response}
            </h2>
         </div>

         {/* 🌊 Animation Node */}
         <div className="w-full">
            <VoiceWaves isListening={isListening} isSpeaking={isSpeaking} />
         </div>

         {/* 🔘 Neural Command Node */}
         <div className="flex flex-col items-center gap-8">
            <button
               onMouseDown={startListening}
               onMouseUp={stopListening}
               onTouchStart={startListening}
               onTouchEnd={stopListening}
               className={`w-32 h-32 rounded-[3rem] flex items-center justify-center transition-all duration-500 scale-110 active:scale-95 shadow-2als relative group ${
                 isListening 
                 ? 'bg-red-500 shadow-xl shadow-red-500/30' 
                 : 'bg-accent-primary shadow-xl shadow-accent-primary/30'
               }`}
            >
               <div className="absolute inset-x-0 -bottom-12 flex flex-col items-center opacity-40 group-hover:opacity-100 transition-opacity">
                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Hold to speak</p>
               </div>
               {isListening ? <Square size={48} className="text-white" fill="white" /> : <Mic size={48} className="text-white" />}
               
               <div className="absolute inset-0 rounded-[3.5rem] border-4 border-accent-primary/20 animate-ping opacity-20 pointer-events-none" />
            </button>
         </div>
      </div>

      {/* 🧬 Layer 2: Intelligence Context */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* History / Transcriptions */}
         <Card className="p-8 sm:p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-soft">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="w-1 h-5 bg-accent-primary rounded-full shadow-[0_0_8px_rgba(var(--accent-primary-rgb),0.5)]" />
                  <h3 className="text-[12px] font-black uppercase italic tracking-tighter">Clinical Transcriptions</h3>
               </div>
               <Badge className="bg-slate-50 dark:bg-white/5 text-slate-400 border-none text-[8px] font-black uppercase px-4 py-1.5 flex items-center gap-2">
                  <History size={10} /> Local Shard
               </Badge>
            </div>

            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
               {history.length === 0 ? (
                  <div className="py-20 text-center opacity-20 grayscale scale-90">
                     <History size={48} className="mx-auto mb-4" />
                     <p className="text-[10px] font-black uppercase tracking-widest">No Previous Shards Match</p>
                  </div>
               ) : (
                  history.map((h, i) => (
                    <div key={i} className="space-y-3 p-5 rounded-3xl bg-slate-50 dark:bg-black/20 border border-transparent hover:border-accent-primary/5 transition-all">
                       <p className="text-[10px] font-black text-accent-primary uppercase tracking-widest italic opacity-50 flex items-center gap-2">
                          <Zap size={10} /> Query Shard
                       </p>
                       <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed italic">"{h.q}"</p>
                       <div className="h-[1px] bg-slate-100 dark:bg-white/5" />
                       <p className="text-sm font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-snug">{h.a}</p>
                    </div>
                  ))
               )}
            </div>
         </Card>

         {/* Suggested Neurons */}
         <Card className="p-8 sm:p-10 rounded-[3rem] bg-slate-950 border border-white/5 shadow-2als relative overflow-hidden group/prompts">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent-primary/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-8 h-full">
               <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Neural Shortcuts</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Sync with optimized query nodes.</p>
               </div>

               <div className="flex flex-wrap gap-3">
                  {quickPrompts.map((p, i) => (
                    <button 
                      key={i} 
                      className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-accent-primary hover:text-white hover:border-accent-primary transition-all flex items-center gap-3 group/item text-left"
                    >
                       {p} <ArrowRight size={14} className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                    </button>
                  ))}
               </div>

               <div className="mt-auto pt-8 border-t border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                     <Sparkles size={20} className="animate-pulse" />
                  </div>
                  <div className="space-y-0.5">
                     <p className="text-[10px] font-black text-white uppercase italic tracking-widest">Sana v.42.0 Edge Shard</p>
                     <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Pakistan Medical Intelligence Core</p>
                  </div>
               </div>
            </div>
         </Card>
      </div>

      {/* 🔘 Atmospheric Bottom Shard */}
      <div className="fixed -bottom-20 -right-20 w-[600px] h-[600px] bg-accent-primary/5 blur-[150px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
}
