import React from 'react';
import { motion } from 'framer-motion';
import AdminPage from '@/layouts/AdminPage';
import { MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';

/**
 * 🛰️ MessagingPage (Senior Architect Spec)
 * Enterprise-grade communication hub for hospital operations.
 */
export default function MessagingPage() {
  return (
    <AdminPage className="bg-surface">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col gap-8"
      >
        {/* 📟 Header & Security Tier */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-primary animate-in fade-in zoom-in duration-500" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-70">Unified Communication</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-text-main tracking-tighter transition-colors">Operational Chat</h1>
          </div>

          <div className="flex items-center gap-4 bg-surface-bright border border-outline px-4 py-2.5 rounded-2xl shadow-sm shadow-slate-900/5">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-success uppercase tracking-widest flex items-center gap-1.5">
                   <ShieldCheck size={12} /> Encrypted Terminal
                </span>
                <span className="text-[9px] font-medium text-text-sub opacity-50">Clinical Protocols Active</span>
             </div>
             <div className="w-px h-8 bg-outline/30 mx-2" />
             <div className="flex items-center gap-2 text-primary">
                <Zap size={16} fill="currentColor" className="animate-pulse" />
                <span className="text-xs font-bold">Fast-Lane Sync</span>
             </div>
          </div>
        </div>

        {/* 💬 Main Interface */}
        <ChatInterface />

      </motion.div>
    </AdminPage>
  );
}
