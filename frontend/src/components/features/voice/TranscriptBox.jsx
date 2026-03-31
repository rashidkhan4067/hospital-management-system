import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TranscriptBox({ messages = [] }) {
  return (
    <div className="transcript-box space-y-6 px-4 py-8">
      <AnimatePresence initial={false}>
        {messages.map((msg, index) => (
          <motion.div 
            key={msg.id || index}
            initial={{ opacity: 0, scale: 0.9, y: 15, x: msg.type === 'ai' ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", damping: 20, stiffness: 300, duration: 0.4 }}
            className={`message-item flex flex-col ${msg.type === 'ai' ? 'items-start' : 'items-end'}`}
          >
            <div className={`message-bubble max-w-[85%] p-5 rounded-3xl transition-all duration-300 transform-gpu ${msg.type === 'ai' 
              ? 'bg-blue-600/10 text-blue-100 border border-blue-600/20 rounded-bl-none shadow-xl shadow-blue-600/5' 
              : 'bg-white/5 text-slate-100 border border-white/10 rounded-br-none shadow-lg shadow-black/20'}`}
            >
              <p className="text-base font-medium leading-relaxed tracking-wide UrduRegular">
                {msg.text}
              </p>
            </div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-2 px-3 ${msg.type === 'ai' ? 'text-blue-400' : ''}`}
            >
               {msg.type === 'ai' ? 'Sana AI assistant' : 'You'} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </motion.span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

