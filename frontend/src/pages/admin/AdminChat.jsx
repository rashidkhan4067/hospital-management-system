import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Search, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Stethoscope, 
  Circle, 
  CheckCheck,
  Phone,
  Video,
  Info,
  ChevronLeft
} from 'lucide-react';
import { PageHeader, Button, Card, Badge } from '../../components/ui';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 🛰️ Clinical Communication Hub (Admin-Doctor Messenger)
 * High-fidelity, real-time messaging interface for hospital orchestration.
 */
export default function AdminChat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef(null);

  // Unified Demo Data
  const contacts = [
    { id: 'DR-4421', name: 'Dr. Sarah Smith', specialty: 'Cardiology', status: 'online', avatar: 'SS', lastMsg: 'The patient record for PAT-4421 is ready.' },
    { id: 'DR-1102', name: 'Dr. Bruce Wayne', specialty: 'Neurology', status: 'busy', avatar: 'BW', lastMsg: 'Emergency protocols initiated in Sector 4.' },
    { id: 'DR-2947', name: 'Dr. Ellen Ripley', specialty: 'General-OPD', status: 'offline', avatar: 'ER', lastMsg: 'I will be on leave tomorrow.' },
    { id: 'DR-9921', name: 'Dr. Rick Deckard', specialty: 'Diagnostics', status: 'online', avatar: 'RD', lastMsg: 'Neural scan analysis in progress...' },
  ];

  const demoMessages = [
    { id: 1, sender: 'Doctor', text: "ADMIN, we need immediate clearance for the cardiac unit's new monitoring protocols.", time: '10:30 AM', status: 'read' },
    { id: 2, sender: 'Admin', text: "Request acknowledged, Dr. Smith. Analyzing sector impact now.", time: '10:32 AM', status: 'read' },
    { id: 3, sender: 'Doctor', text: "Thank you. Also, can you verify the Zine-04 stock in Lab-01?", time: '10:35 AM', status: 'read' },
    { id: 4, sender: 'Admin', text: "Stock verified. 12 Vials available. I've flagged them for your unit.", time: '10:40 AM', status: 'sent' },
  ];

  useEffect(() => {
    if (selectedChat) {
      setMessages(demoMessages);
    }
  }, [selectedChat]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: Date.now(),
      sender: 'Admin',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6 animate-in fade-in duration-700 p-4 md:p-6 pb-20 max-w-[1700px] mx-auto overflow-hidden">
      
      {/* 📋 Sidebar: Faculty Registry */}
      <div className={`w-full md:w-80 lg:w-96 flex flex-col gap-6 h-full ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
         <div className="space-y-6 flex flex-col h-full bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm p-6 overflow-hidden">
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white leading-none">Messenger Shards</h2>
              <div className="relative group">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Seach Identity Node..."
                  className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-3 pl-10 pr-4 text-[10px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
               {contacts.map(contact => (
                 <button
                    key={contact.id}
                    onClick={() => setSelectedChat(contact)}
                    className={`w-full p-4 rounded-3xl flex items-center gap-4 transition-all group ${
                      selectedChat?.id === contact.id 
                      ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-[1.02]' 
                      : 'bg-transparent text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                    }`}
                 >
                    <div className="relative">
                       <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center font-black text-xs ${
                          selectedChat?.id === contact.id ? 'bg-white/20 text-white' : 'bg-accent-primary/10 text-accent-primary'
                       }`}>
                          {contact.avatar}
                       </div>
                       <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 ${
                          selectedChat?.id === contact.id ? 'border-accent-primary' : 'border-white dark:border-slate-900'
                       } ${
                          contact.status === 'online' ? 'bg-emerald-500' : contact.status === 'busy' ? 'bg-rose-500' : 'bg-slate-400'
                       }`} />
                    </div>
                    <div className="flex-1 text-left overflow-hidden">
                       <div className="flex justify-between items-center">
                          <p className={`text-[11px] font-black uppercase tracking-tight truncate ${selectedChat?.id === contact.id ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{contact.name}</p>
                          <span className="text-[7px] font-bold opacity-60 uppercase tracking-widest whitespace-nowrap">2m</span>
                       </div>
                       <p className={`text-[9px] font-bold truncate mt-0.5 opacity-80 ${selectedChat?.id === contact.id ? 'text-white/80' : 'text-slate-400'}`}>{contact.lastMsg}</p>
                    </div>
                 </button>
               ))}
            </div>
         </div>
      </div>

      {/* 💬 Main: Intent Propagation Matrix */}
      <div className={`flex-1 flex flex-col h-full ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
         {selectedChat ? (
           <Card className="flex-1 flex flex-col bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm overflow-hidden p-0 relative">
              {/* Chat Header */}
              <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between z-10 sticky top-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
                 <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 text-slate-400"><ChevronLeft size={20}/></button>
                    <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary font-black shadow-inner">
                       {selectedChat.avatar}
                    </div>
                    <div>
                       <h3 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-none">{selectedChat.name}</h3>
                       <div className="flex items-center gap-2 mt-1.5 font-bold uppercase tracking-[0.2em] text-[8px] text-slate-400">
                          <Circle size={8} fill={selectedChat.status === 'online' ? '#10b981' : '#94a3b8'} className={selectedChat.status === 'online' ? 'text-emerald-500' : 'text-slate-400'} />
                          {selectedChat.specialty} • {selectedChat.status}
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <ActionButton icon={<Phone size={16}/>} />
                    <ActionButton icon={<Video size={16}/>} />
                    <ActionButton icon={<Info size={16}/>} />
                 </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar" ref={scrollRef}>
                 <AnimatePresence initial={false}>
                    {messages.map((msg, i) => {
                      const isMe = msg.sender === 'Admin';
                      return (
                        <motion.div 
                          key={msg.id}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                           <div className={`max-w-[70%] space-y-2`}>
                              <div className={`px-6 py-4 rounded-[28px] text-[11px] font-bold shadow-sm ${
                                isMe 
                                ? 'bg-accent-primary text-white rounded-tr-none' 
                                : 'bg-slate-50 dark:bg-black/20 text-slate-800 dark:text-white/90 rounded-tl-none'
                              }`}>
                                 {msg.text}
                              </div>
                              <div className={`flex items-center gap-2 text-[7px] font-black uppercase tracking-widest text-slate-400 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                 <span>{msg.time}</span>
                                 {isMe && <CheckCheck size={10} className={msg.status === 'read' ? 'text-blue-400' : 'text-slate-300'} />}
                              </div>
                           </div>
                        </motion.div>
                      );
                    })}
                 </AnimatePresence>
              </div>

              {/* Input Area */}
              <div className="px-8 py-8 border-t border-slate-100 dark:border-white/5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
                 <div className="flex items-center gap-4 bg-slate-50 dark:bg-black/20 p-2 pl-6 rounded-[32px] group focus-within:ring-4 focus-within:ring-accent-primary/10 transition-all">
                    <button className="text-slate-400 hover:text-accent-primary transition-colors"><Paperclip size={18}/></button>
                    <input 
                       type="text" 
                       placeholder="Propagate clinical intent..."
                       className="flex-1 bg-transparent border-none py-3 text-[11px] font-bold text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
                       value={inputValue}
                       onChange={e => setInputValue(e.target.value)}
                       onKeyPress={e => e.key === 'Enter' && handleSend()}
                    />
                    <div className="flex items-center gap-2">
                       <button className="text-slate-400 hover:text-accent-primary transition-colors"><Smile size={18}/></button>
                       <button 
                          onClick={handleSend}
                          className="w-12 h-12 rounded-full bg-accent-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 shadow-lg shadow-accent-primary/20 transition-all"
                       >
                          <Send size={18} />
                       </button>
                    </div>
                 </div>
              </div>
           </Card>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 p-8 bg-slate-50 dark:bg-black/10 rounded-[40px] border border-dashed border-slate-200 dark:border-white/5 shadow-inner">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900/40 shadow-xl flex items-center justify-center text-accent-primary animate-bounce">
                <Stethoscope size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-none">Clinical Comms Hub</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mt-4 leading-relaxed">Initialize a neural communication shard with authorized medical faculty.</p>
              </div>
              <Badge className="bg-accent-primary/10 text-accent-primary border-none text-[8px] font-black uppercase px-6 py-2 tracking-widest">End-to-End Encrypted Node</Badge>
           </div>
         )}
      </div>
    </div>
  );
}

function ActionButton({ icon }) {
  return (
    <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 flex items-center justify-center hover:bg-accent-primary/10 hover:text-accent-primary transition-all">
       {icon}
    </button>
  );
}
