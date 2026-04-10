import React, { useState, useRef, useEffect } from 'react';
import { useMessaging } from '../hooks/useMessaging';
import { Send, Search, MoreVertical, Video, Phone, Paperclip, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 🛰️ ChatInterface (Google Identity Spec)
 * High-fidelity messaging terminal for clinical roles.
 */
export default function ChatInterface() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null);

  const { contacts, messages, sendMessage, isSending } = useMessaging(selectedUser?.id);

  // 🏥 Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedUser) return;
    sendMessage({ receiverId: selectedUser.id, text: inputText });
    setInputText('');
  };

  return (
    <div className="flex w-full h-[calc(100vh-160px)] bg-surface-bright border border-outline rounded-[32px] overflow-hidden shadow-sm">
      
      {/* 📋 Contacts Sidebar */}
      <div className="w-80 border-r border-outline/30 flex flex-col bg-surface/30">
        <div className="p-6">
            <h2 className="text-xl font-black text-text-main tracking-tighter mb-4">Messages</h2>
            <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub" />
                <input 
                  type="text" 
                  placeholder="Search contacts..." 
                  className="w-full h-10 pl-9 pr-4 bg-surface border border-outline rounded-xl text-xs outline-none focus:border-primary transition-all"
                />
            </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1">
            {contacts.map(user => (
              <button 
                key={user.id} 
                onClick={() => setSelectedUser(user)}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${selectedUser?.id === user.id ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'hover:bg-surface text-text-main'}`}
              >
                <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${selectedUser?.id === user.id ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                        {user.avatar}
                    </div>
                    {user.status === 'online' && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-surface-bright rounded-full" />
                    )}
                </div>
                <div className="flex flex-col items-start overflow-hidden">
                    <span className="text-[13px] font-bold truncate">{user.name}</span>
                    <span className={`text-[10px] uppercase tracking-widest font-black truncate opacity-60 ${selectedUser?.id === user.id ? 'text-white' : 'text-text-sub'}`}>
                        {user.role}
                    </span>
                </div>
              </button>
            ))}
        </div>
      </div>

      {/* 💬 Chat Area */}
      <div className="flex-1 flex flex-col bg-surface">
        {selectedUser ? (
          <>
            {/* Thread Header */}
            <div className="h-20 px-8 border-b border-outline/30 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {selectedUser.avatar}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-text-main">{selectedUser.name}</span>
                        <span className="text-[10px] font-bold text-text-sub uppercase tracking-widest">{selectedUser.status}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2.5 rounded-full hover:bg-surface transition-colors text-text-sub"><Phone size={18} /></button>
                    <button className="p-2.5 rounded-full hover:bg-surface transition-colors text-text-sub"><Video size={18} /></button>
                    <button className="p-2.5 rounded-full hover:bg-surface transition-colors text-text-sub"><MoreVertical size={18} /></button>
                </div>
            </div>

            {/* Message Pool */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 flex flex-col gap-6"
            >
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center opacity-30 grayscale gap-4">
                        <Smile size={64} />
                        <span className="text-xs font-bold uppercase tracking-widest">Start a clinical dispatch</span>
                    </div>
                )}
                {messages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    key={msg.id} 
                    className={`flex flex-col max-w-[70%] ${msg.senderId === 'me' ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    <div className={`p-4 rounded-3xl text-sm font-medium leading-relaxed ${msg.senderId === 'me' ? 'bg-primary text-white rounded-tr-none' : 'bg-surface-bright border border-outline/50 text-text-main rounded-tl-none shadow-sm'}`}>
                        {msg.text}
                    </div>
                    <div className="flex items-center gap-2 mt-2 px-2">
                        <span className="text-[9px] font-black text-text-sub uppercase tracking-widest">{msg.role}</span>
                        <span className="text-[9px] font-medium text-text-sub opacity-50">{msg.timestamp}</span>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Input Node */}
            <form onSubmit={handleSend} className="p-6 border-t border-outline/30 bg-surface/30">
                <div className="relative group">
                    <input 
                      type="text" 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={`Message ${selectedUser.name}...`}
                      className="w-full h-14 pl-6 pr-32 bg-surface-bright border border-outline rounded-2xl text-[13px] font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <button type="button" className="p-2 text-text-sub hover:bg-surface rounded-lg transition-colors"><Paperclip size={18} /></button>
                        <button type="button" className="p-2 text-text-sub hover:bg-surface rounded-lg transition-colors"><Smile size={18} /></button>
                        <button 
                          type="submit" 
                          disabled={!inputText.trim()}
                          className={`ml-1 p-2.5 rounded-xl transition-all shadow-md active:scale-95 ${!inputText.trim() ? 'bg-outline text-text-sub cursor-not-allowed' : 'bg-primary text-white shadow-primary/20'}`}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center gap-6">
             <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Send size={40} className="rotate-12" />
             </div>
             <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-black text-text-main tracking-tighter">Clinical Communication Hub</h3>
                <p className="text-sm font-medium text-text-sub max-w-[320px]">Select a practitioner or administrator from the left to start a secure clinical thread.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
