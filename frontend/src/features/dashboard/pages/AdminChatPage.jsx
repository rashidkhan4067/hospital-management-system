import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Search, 
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
import { PageHeader, Card, Badge } from '@/shared/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import AdminPage from '@/shared/components/layout/AdminPage'; // ✨ THE BASE FILE

/**
 * 🛰️ Clinical Communication Hub (Admin-Doctor Messenger)
 */
export default function AdminChat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef(null);

  const contacts = [
    { id: 'DR-4421', name: 'Dr. Sarah Smith', specialty: 'Cardiology', status: 'online', avatar: 'SS', lastMsg: 'Synchronizing clinical records.' },
    { id: 'DR-1102', name: 'Dr. Bruce Wayne', specialty: 'Neurology', status: 'busy', avatar: 'BW', lastMsg: 'Emergency protocols initiated.' },
    { id: 'DR-2947', name: 'Dr. Ellen Ripley', specialty: 'General-OPD', status: 'offline', avatar: 'ER', lastMsg: 'Relay confirmed for tomorrow.' },
    { id: 'DR-9921', name: 'Dr. Rick Deckard', specialty: 'Diagnostics', status: 'online', avatar: 'RD', lastMsg: 'Neural scan analysis complete.' },
  ];

  const demoMessages = [
    { id: 1, sender: 'Doctor', text: "ADMIN, immediate clearance for Sector 4 monitoring nodes.", time: '10:30 AM', status: 'read' },
    { id: 2, sender: 'Admin', text: "Protocol acknowledged. Shard propagation initiated.", time: '10:32 AM', status: 'read' },
  ];

  useEffect(() => {
    if (selectedChat) setMessages(demoMessages);
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
    <AdminPage fullHeight className="p-0 md:p-0">
      <div className="flex flex-col md:flex-row h-full w-full overflow-hidden">
        {/* 📋 Sidebar: Faculty Matrix */}
        <div className={`w-full md:w-80 lg:w-96 flex flex-col bg-white dark:bg-slate-900 shadow-xl z-20 border-r border-slate-100 dark:border-white/5 ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
           <div className="p-8 space-y-8 flex flex-col h-full">
              <div className="space-y-6">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-none">Intelligence Shards</h2>
                <div className="relative group">
                  <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search Node ID..."
                    className="w-full bg-slate-50 dark:bg-black/20 border-none rounded-2xl py-4 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                 {contacts.map(contact => (
                   <button
                      key={contact.id}
                      onClick={() => setSelectedChat(contact)}
                      className={`w-full p-5 rounded-[28px] flex items-center gap-4 transition-all duration-500 group ${
                        selectedChat?.id === contact.id 
                        ? 'bg-accent-primary text-white shadow-[0_20px_40px_-10px_rgba(20,184,166,0.3)] scale-[1.02]' 
                        : 'bg-transparent text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                   >
                      <div className="relative shrink-0">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm shadow-inner ${
                            selectedChat?.id === contact.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-white/10 text-accent-primary'
                         }`}>
                            {contact.avatar}
                         </div>
                         <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 ${
                            selectedChat?.id === contact.id ? 'border-accent-primary' : 'border-white dark:border-slate-900'
                         } ${
                            contact.status === 'online' ? 'bg-emerald-500' : 'bg-rose-500'
                         }`} />
                      </div>
                      <div className="flex-1 text-left overflow-hidden space-y-0.5">
                         <div className="flex justify-between items-center">
                            <p className={`text-[12px] font-black uppercase tracking-tight truncate ${selectedChat?.id === contact.id ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{contact.name}</p>
                            <span className="text-[8px] font-black opacity-60 uppercase tracking-widest tabular-nums">2m</span>
                         </div>
                         <p className={`text-[10px] font-bold truncate opacity-80 italic ${selectedChat?.id === contact.id ? 'text-white/80' : 'text-slate-400'}`}>{contact.lastMsg}</p>
                      </div>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* 💬 Main: Comms Shard */}
        <div className={`flex-1 flex flex-col bg-slate-50 dark:bg-black/20 ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
           {selectedChat ? (
             <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Chat Header Node */}
                <div className="px-10 py-7 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border-b border-slate-200/50 dark:border-white/5 flex items-center justify-between z-30">
                   <div className="flex items-center gap-5">
                      <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 text-slate-400"><ChevronLeft size={24}/></button>
                      <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary font-black shadow-inner relative">
                         {selectedChat.avatar}
                         <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                      </div>
                      <div>
                         <h3 className="text-lg font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-none">{selectedChat.name}</h3>
                         <div className="flex items-center gap-3 mt-2 font-black uppercase tracking-[0.2em] text-[9px] text-slate-400">
                            <span className={selectedChat.status === 'online' ? 'text-emerald-500' : 'text-rose-500'}>{selectedChat.status}</span>
                            <span className="opacity-20">•</span>
                            {selectedChat.specialty}
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <ActionButton icon={<Phone size={18}/>} />
                      <ActionButton icon={<Video size={18}/>} />
                      <ActionButton icon={<Info size={18}/>} />
                   </div>
                </div>

                {/* Shard Messages Area */}
                <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                   <AnimatePresence initial={false}>
                      {messages.map((msg) => {
                        const isMe = msg.sender === 'Admin';
                        return (
                          <motion.div 
                            key={msg.id}
                            initial={{ opacity: 0, x: isMe ? 20 : -20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                          >
                             <div className={`max-w-[65%] space-y-3`}>
                                <div className={`px-8 py-5 rounded-[32px] text-[13px] font-bold shadow-xl leading-relaxed ${
                                  isMe 
                                  ? 'bg-accent-primary text-white rounded-tr-none' 
                                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white/90 rounded-tl-none border border-slate-100 dark:border-white/5'
                                }`}>
                                   {msg.text}
                                </div>
                                <div className={`flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-slate-400 ${isMe ? 'justify-end pr-2' : 'justify-start pl-2'}`}>
                                   <span>{msg.time}</span>
                                   {isMe && <CheckCheck size={14} className={msg.status === 'read' ? 'text-accent-primary' : 'text-slate-300'} />}
                                </div>
                             </div>
                          </motion.div>
                        );
                      })}
                   </AnimatePresence>
                   <div ref={scrollRef} />
                </div>

                {/* Input Matrix Area */}
                <div className="p-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border-t border-slate-200/50 dark:border-white/5">
                   <div className="flex items-center gap-5 bg-slate-100 dark:bg-black/20 p-2.5 pl-8 rounded-[40px] focus-within:ring-8 focus-within:ring-accent-primary/10 transition-all duration-500 shadow-inner">
                      <button className="text-slate-400 hover:text-accent-primary transition-colors"><Paperclip size={22}/></button>
                      <input 
                         type="text" 
                         placeholder="Propagate clinical intent..."
                         className="flex-1 bg-transparent border-none py-4 text-[13px] font-black text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 italic tracking-tight"
                         value={inputValue}
                         onChange={e => setInputValue(e.target.value)}
                         onKeyPress={e => e.key === 'Enter' && handleSend()}
                      />
                      <div className="flex items-center gap-3 pr-2">
                         <button className="text-slate-400 hover:text-accent-primary transition-colors"><Smile size={22}/></button>
                         <button 
                            onClick={handleSend}
                            className="w-14 h-14 rounded-full bg-accent-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 shadow-2xl shadow-accent-primary/40 transition-all"
                         >
                            <Send size={22} fill="currentColor" />
                         </button>
                      </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden bg-white/50 dark:bg-black/20">
                <div className="absolute top-0 left-0 w-full h-full bg-slate-50 dark:bg-transparent -z-10" />
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-10 max-w-lg"
                >
                  <div className="w-32 h-32 rounded-[40px] bg-white dark:bg-slate-900 shadow-2xl flex items-center justify-center text-accent-primary mx-auto relative group">
                    <div className="absolute inset-0 bg-accent-primary rounded-[40px] blur-3xl opacity-10 group-hover:opacity-30 transition-opacity" />
                    <Stethoscope size={56} strokeWidth={2.5} className="relative z-10" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">Communication Shard Hub</h3>
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 leading-loose">Initialize an end-to-end encrypted neural communication shard with authorized medical specialists and staff nodes.</p>
                  </div>
                  <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Security Protocol: Active
                  </div>
                </motion.div>
             </div>
           )}
        </div>
      </div>
    </AdminPage>
  );
}

function ActionButton({ icon }) {
  return (
    <button className="w-12 h-12 rounded-[18px] bg-slate-50 dark:bg-white/5 text-slate-400 flex items-center justify-center hover:bg-accent-primary/10 hover:text-accent-primary transition-all duration-500 border border-transparent hover:border-accent-primary/10 shadow-sm">
       {icon}
    </button>
  );
}
