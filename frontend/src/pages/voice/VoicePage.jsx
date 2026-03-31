import React, { useState } from 'react';
import { Mic, Waves, MessageSquare, History, Sparkles } from 'lucide-react';
import { Card, PageHeader, Badge, Button } from '../../components/ui';
import SanaChat from '../../components/features/voice/SanaChat';

export default function VoicePage() {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="page-container flex flex-col h-[calc(100vh-140px)]">
      <div className="flex items-center justify-between mb-12">
        <PageHeader 
          title="Sana AI Assistant"
          subtitle="Book appointments and get medical info with voice"
        />
        <div className="flex gap-4">
          <Badge icon={Sparkles} className="bg-blue-600/10 text-blue-400 border-blue-600/20 px-6 py-2 rounded-full font-bold">GPT-4o Enhanced</Badge>
          <Badge icon={History} className="bg-white/5 text-gray-400 border-white/10 px-6 py-2 rounded-full font-bold cursor-pointer hover:bg-white/10 transition-colors">History</Badge>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <SanaChat />
      </div>
    </div>
  );
}
