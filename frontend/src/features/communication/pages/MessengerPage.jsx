import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MessageSquare, 
  User, 
  Phone, 
  Video, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Mic,
  Check,
  CheckCheck,
  Clock,
  Filter,
  Plus,
  ArrowLeft,
  Circle,
  FileText,
  Activity,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Input, Badge, Avatar } from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';

// ─── Mock Data Shards ────────────────────────────────────────────────────────

const MOCK_THREADS = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    role: 'Surgical Node',
    avatar: null,
    lastMessage: 'The patient in Ward 4B is stable now.',
    timestamp: '10:45 AM',
    unread: 2,
    online: true,
    type: 'STAFF'
  },
  {
    id: 2,
    name: 'Sector 7 Roster',
    role: 'Nursing Group',
    avatar: null,
    lastMessage: 'Shift change protocol initiated.',
    timestamp: '9:12 AM',
    unread: 0,
    online: true,
    type: 'GROUP'
  },
  {
    id: 3,
    name: 'Ahmed Khan',
    role: 'Patient ID: #9902',
    avatar: null,
    lastMessage: 'When is my next scan scheduled?',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
    type: 'PATIENT'
  },
  {
    id: 4,
    name: 'Pharmacist Hub',
    role: 'Supply Chain',
    avatar: null,
    lastMessage: 'Amoxicillin shards replenished.',
    timestamp: 'Yesterday',
    unread: 0,
    online: true,
    type: 'STAFF'
  },
  {
    id: 5,
    name: 'Institutional Alerts',
    role: 'System Node',
    avatar: null,
    lastMessage: 'New policy update propagated.',
    timestamp: '2 Days Ago',
    unread: 5,
    online: true,
    type: 'SYSTEM'
  }
];

const MOCK_MESSAGES = [
  { id: 1, text: "Good morning Dr. Mitchell. Have you reviewed the lab shards for Ahmed Khan?", sender: 'me', time: '10:30 AM', status: 'read' },
  { id: 2, text: "Yes, I just finished the analysis. The hemoglobin levels are within stable matrix thresholds now.", sender: 'them', time: '10:40 AM' },
  { id: 3, text: "The patient in Ward 4B is stable now.", sender: 'them', time: '10:45 AM' },
];

/**
 * 🛰️ Clinical Communication Hub
 * A high-fidelity, dual-column messaging interface for institutional personnel.
 */
export default function MessengerPage() {
  const [selectedThread, setSelectedThread] = useState(MOCK_THREADS[0]);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
        id: Date.now(),
        text: input,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate reply
    setTimeout(() => {
        const reply = {
            id: Date.now() + 1,
            text: "Message received. Processing synchronization...",
            sender: 'them',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const filteredThreads = MOCK_THREADS.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminPage>
      <div className="flex h-[calc(100vh-100px)] w-full gap-6 p-4 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 italic">
        
        {/* 📋 PART 1: THREAD MATRIX (SIDEBAR) */}
        <div className="w-[380px] flex flex-col gap-6 h-full shrink-0">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-none font-display">Communication</h2>
              <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 hover:scale-110 transition-transform cursor-pointer">
                 <Plus size={20} strokeWidth={3} />
              </div>
           </div>

           <div className="relative group">
              <input 
                type="text"
                placeholder="Find Nodes..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-accent-primary/10 transition-all shadow-2als italic placeholder:text-slate-400"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors" size={18} strokeWidth={3} />
           </div>

           <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
              {filteredThreads.map(thread => (
                 <ThreadShard 
                    key={thread.id} 
                    thread={thread} 
                    active={selectedThread?.id === thread.id}
                    onClick={() => setSelectedThread(thread)}
                 />
              ))}
           </div>
        </div>

        {/* 💬 PART 2: CLINICAL NEXUS (CHAT PORT) */}
        <Card className="flex-1 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als overflow-hidden flex flex-col relative group">
           {/* 🧬 HEADER LAYER */}
           <div className="px-10 py-6 border-b border-slate-50 dark:border-white/5 flex items-center justify-between bg-slate-50/30 dark:bg-white/5 backdrop-blur-md relative z-10">
              <div className="flex items-center gap-5">
                 <div className="relative group-hover:scale-105 transition-transform duration-500">
                    <div className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-accent-primary to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-accent-primary/20 border-2 border-white dark:border-slate-800 italic">
                       {selectedThread?.name.charAt(0)}
                    </div>
                    {selectedThread?.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg animate-pulse" />}
                 </div>
                 <div className="flex flex-col">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase leading-none font-display tracking-tighter italic">{selectedThread?.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="text-[8px] font-black text-accent-primary uppercase tracking-widest italic">{selectedThread?.role}</span>
                       <Circle size={4} fill="currentColor" className="text-slate-300" />
                       <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest italic">{selectedThread?.online ? 'Interactive' : 'Dormant'}</span>
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <NexAction icon={Phone} />
                 <NexAction icon={Video} />
                 <NexAction icon={MoreVertical} onClick={() => setShowDetails(!showDetails)} />
              </div>
           </div>

           {/* 🌊 STREAM LAYER */}
           <div 
             ref={scrollRef}
             className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar relative z-10"
           >
              <div className="flex flex-col items-center gap-3 py-6 opacity-30">
                 <div className="h-px w-20 bg-slate-300 dark:bg-white/20" />
                 <span className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Protocol Initiated - Today</span>
                 <div className="h-px w-20 bg-slate-300 dark:bg-white/20" />
              </div>

              {messages.map((msg) => (
                 <NexusBubble key={msg.id} msg={msg} />
              ))}
           </div>

           {/* ⌨️ COMMAND LAYER */}
           <form 
             onSubmit={handleSend}
             className="p-8 border-t border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 backdrop-blur-3xl relative z-10"
           >
              <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-3 flex items-center gap-3 shadow-2als border border-slate-100 dark:border-white/10 group-focus-within:border-accent-primary/30 transition-all">
                 <button type="button" className="w-12 h-12 rounded-full flex items-center justify-center text-slate-300 hover:text-accent-primary transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
                    <Plus size={20} />
                 </button>
                 <button type="button" className="w-12 h-12 rounded-full flex items-center justify-center text-slate-300 hover:text-accent-primary transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
                    <Mic size={20} />
                 </button>
                 <input 
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Input clinical directive..."
                    className="flex-1 bg-transparent border-none py-3 px-2 text-[13px] font-bold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:italic focus:ring-0"
                 />
                 <button 
                    type="submit"
                    className="w-14 h-14 bg-accent-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-accent-primary/25 hover:scale-110 active:scale-95 transition-all"
                 >
                    <Send size={24} className="-mr-1 rotate-[-15deg]" />
                 </button>
              </div>
           </form>

           {/* 🦋 BACKGROUND ORBS */}
           <div className="absolute top-1/4 -left-20 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full -z-0" />
           <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full -z-0" />
        </Card>

        {/* 🕵️ PART 3: IDENTITY SHARD (DETAILS) */}
        <AnimatePresence>
          {showDetails && (
            <motion.div 
               initial={{ width: 0, opacity: 0, x: 50 }}
               animate={{ width: 340, opacity: 1, x: 0 }}
               exit={{ width: 0, opacity: 0, x: 50 }}
               className="h-full flex flex-col gap-6 shrink-0 overflow-hidden"
            >
               <Card className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-white/5 -mr-16 -mt-16 rounded-full" />
                  
                  <div className="w-28 h-28 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 border-4 border-slate-50 dark:border-slate-800 overflow-hidden shadow-2als">
                     <User size={48} className="text-slate-300" />
                  </div>
                  
                  <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic font-display tracking-tighter">{selectedThread?.name}</h4>
                  <Badge className="bg-accent-primary/10 text-accent-primary border-none text-[8px] px-4 py-1 rounded-full uppercase tracking-widest font-black mt-3 italic">{selectedThread?.role}</Badge>
                  
                  <div className="grid grid-cols-2 gap-4 w-full mt-10">
                     <DetailMini label="Activity" value="High" icon={Activity} />
                     <DetailMini label="Verified" value="Secure" icon={ShieldCheck} />
                  </div>

                  <div className="w-full mt-10 space-y-4 text-left">
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] ml-2 italic">Clinical Shards</p>
                     <div className="space-y-2">
                        <MediaShard name="Ahmed_Khan_MRI.pdf" size="2.4 MB" date="Oct 20, 2023" />
                        <MediaShard name="Blood_Panel_X2.txt" size="12 KB" date="Today" />
                        <MediaShard name="Prescription_M9.pdf" size="1.1 MB" date="Today" />
                     </div>
                  </div>
               </Card>

               <Card className="flex-1 p-8 rounded-[3rem] bg-slate-900 border-none relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                  <div className="flex items-center gap-3 relative z-10">
                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10">
                        <Heart size={16} fill="currentColor" />
                     </div>
                     <span className="text-[10px] font-black uppercase text-white tracking-widest italic">Clinical Synergy</span>
                  </div>
                  <p className="mt-6 text-2xl font-black text-white italic leading-tight uppercase font-display tracking-tighter relative z-10">
                     "Stable collaboration with Surgical Node Mitchell detected."
                  </p>
                  <div className="mt-10 pt-6 border-t border-white/5 relative z-10">
                     <div className="flex justify-between items-center text-[8px] font-black uppercase text-slate-400 tracking-widest italic">
                        <span>Resonance Score</span>
                        <span className="text-accent-primary">98.2%</span>
                     </div>
                     <div className="h-1 w-full bg-white/5 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-accent-primary w-[98%]" />
                     </div>
                  </div>
               </Card>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AdminPage>
  );
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

function ThreadShard({ thread, active, onClick }) {
   return (
      <div 
         onClick={onClick}
         className={`p-5 rounded-[2.5rem] flex items-center gap-5 cursor-pointer transition-all duration-300 border italic ${
            active 
            ? 'bg-accent-primary text-white border-accent-primary shadow-xl shadow-accent-primary/20 scale-[1.02]' 
            : 'bg-white dark:bg-slate-900 border-slate-50 dark:border-white/5 hover:border-accent-primary/20 hover:bg-slate-50 dark:hover:bg-white/5'
         }`}
      >
         <div className="relative shrink-0">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black italic shadow-inner ${active ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
               {thread.name.charAt(0)}
            </div>
            {thread.online && <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 ${active ? 'bg-white border-accent-primary' : 'bg-emerald-500 border-white dark:border-slate-900 animate-pulse'}`} />}
         </div>
         <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
               <h4 className={`text-[13px] font-black uppercase leading-none truncate font-display ${active ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{thread.name}</h4>
               <span className={`text-[8px] font-black uppercase italic ${active ? 'text-white/60' : 'text-slate-400'}`}>{thread.timestamp}</span>
            </div>
            <p className={`text-[10px] font-bold uppercase truncate mt-2 tracking-tight ${active ? 'text-white/80' : 'text-slate-500'}`}>{thread.lastMessage}</p>
         </div>
         {thread.unread > 0 && (
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black shadow-lg ${active ? 'bg-white text-accent-primary' : 'bg-accent-primary text-white animate-bounce'}`}>
               {thread.unread}
            </div>
         )}
      </div>
   );
}

function NexusBubble({ msg }) {
   const isMe = msg.sender === 'me';
   return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} group/bubble`}>
         <div className={`flex flex-col max-w-[75%] gap-2 ${isMe ? 'items-end' : 'items-start'}`}>
            <div className={`px-8 py-5 rounded-[2.5rem] shadow-sm relative ${
               isMe 
               ? 'bg-accent-primary text-white rounded-br-none italic shadow-accent-primary/10' 
               : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-white/5'
            }`}>
               <p className="text-[14px] font-bold leading-relaxed">{msg.text}</p>
            </div>
            <div className="flex items-center gap-3 opacity-0 group-hover/bubble:opacity-100 transition-opacity">
               <span className="text-[9px] font-black uppercase text-slate-400 italic tabular-nums">{msg.time}</span>
               {isMe && (
                  msg.status === 'read' ? <CheckCheck size={12} className="text-accent-primary" /> : <Check size={12} className="text-slate-300" />
               )}
            </div>
         </div>
      </div>
   );
}

function NexAction({ icon: Icon, onClick }) {
   return (
      <button 
         onClick={onClick}
         className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-accent-primary hover:scale-110 transition-all border border-slate-100 dark:border-white/5 hover:shadow-xl hover:shadow-accent-primary/10"
      >
         <Icon size={18} strokeWidth={2.5} />
      </button>
   );
}

function DetailMini({ label, value, icon: Icon }) {
   return (
      <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-3xl flex flex-col items-center gap-2 border border-slate-100 dark:border-white/5">
         <Icon size={16} className="text-slate-300" />
         <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest italic leading-none">{label}</p>
         <p className="text-[11px] font-black uppercase text-slate-900 dark:text-white italic leading-none">{value}</p>
      </div>
   );
}

function MediaShard({ name, size, date }) {
   return (
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center gap-4 group cursor-pointer border border-transparent hover:border-accent-primary/20 transition-all">
         <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-accent-primary group-hover:bg-accent-primary/10 transition-all">
            <FileText size={18} strokeWidth={2.5} />
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase truncate italic leading-none">{name}</p>
            <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 leading-none">
               {size} <span className="opacity-40 italic mx-1">•</span> {date}
            </p>
         </div>
      </div>
   );
}
