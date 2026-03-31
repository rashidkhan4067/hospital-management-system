import React, { useState } from 'react';
import { Send, Mic, Waves, History } from 'lucide-react';
import { Card, Button, Input } from '../../ui';
import VoiceWave from './VoiceWave';
import TranscriptBox from './TranscriptBox';
import SanaButton from './SanaButton';

export default function SanaChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Assalam-o-Alaikum! Main Sana hoon. Main aapki appointment book karne mein madad kar sakti hoon.", type: "ai" }
  ]);
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="voice-interface-wrapper flex flex-col h-full gap-8">
      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
        <TranscriptBox messages={messages} />
      </div>

      <Card className="voice-controls p-8 glass-panel border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
        
        {isListening && (
           <div className="absolute top-0 left-0 right-0 h-1">
             <div className="h-full bg-blue-500 animate-pulse w-full shadow-lg shadow-blue-500/50" />
           </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <div className="flex-1 w-full order-2 md:order-1">
            <div className="flex gap-4 p-2 bg-black/20 rounded-2xl border border-white/5 shadow-inner">
               <Input 
                 placeholder="Type message in Urdu or English..."
                 className="bg-transparent border-none focus:ring-0 text-lg py-4 px-6 w-full h-auto"
                 wrapperClassName="flex-1"
               />
               <Button className="min-w-[64px] rounded-xl shadow-xl shadow-blue-600/20">
                 <Send size={24} />
               </Button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 order-1 md:order-2">
            <VoiceWave active={isListening} />
            <SanaButton 
               active={isListening} 
               onClick={() => setIsListening(!isListening)} 
            />
            <p className="text-[10px] uppercase font-black text-gray-500 tracking-[0.3em]">
               {isListening ? 'Listening Focus' : 'Tap to Activate'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
