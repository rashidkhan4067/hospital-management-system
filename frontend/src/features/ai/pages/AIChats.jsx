import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Bot, 
  User, 
  ChevronRight,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { PageHeader, Button, Card, Badge } from '@/components/primitives';
import AdminTable from '@/components/primitives/AdminTable';
import SanaAIChat from '@/components/composed/SanaAIChat';
import { aiService } from '@/features/ai/api/aiService';

/**
 * 🛰️ AI Intent Chat Analysis Hub
 * Real-time monitoring of Sana AI conversation threads and intent resolution.
 */
export default function AIChats() {
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('live'); // 'live' or 'history'

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await aiService.getConversationHistory();
      setChats(response.results || response);
    } catch (error) {
      console.error("Failed to fetch AI conversion history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (viewMode === 'history') {
        fetchHistory();
    }
  }, [viewMode]);

  const filteredChats = chats.filter(c => 
    c.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { 
        header: 'Intelligence Thread', 
        cell: (c) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-black">
                    <MessageSquare size={16} />
                </div>
                <div className="flex flex-col max-w-[300px]">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none truncate italic">"{c.query}"</p>
                    <p className="text-[8px] font-bold text-accent-primary uppercase tracking-[0.2em] mt-1.5">{c.intent}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Human Node', 
        cell: (c) => (
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-bg-base dark:bg-white/5 flex items-center justify-center text-slate-400">
                    <User size={12} />
                </div>
                <span className="text-[10px] font-black uppercase text-slate-400">{c.user_name}</span>
            </div>
        )
    },
    { 
        header: 'Intent Resolution',
        cell: (c) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${c.resolution === 'Success' ? 'bg-emerald-500 shadow-emerald-500' : 'bg-amber-500 shadow-amber-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{c.resolution}</span>
            </div>
        )
    },
    { header: 'Propagation', cell: (c) => <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(c.timestamp).toLocaleDateString()}</span> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Neural Interaction Hub" 
        subtitle="Real-time Sana AI Interface & Conversation Registry"
        actions={
            <div className="flex gap-2 p-1 bg-slate-900/40 rounded-xl border border-white/5">
                <button 
                    onClick={() => setViewMode('live')}
                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'live' ? 'bg-accent-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Live Interface
                </button>
                <button 
                    onClick={() => setViewMode('history')}
                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'history' ? 'bg-accent-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Audit Registry
                </button>
            </div>
        }
      />

      {viewMode === 'live' ? (
          <div className="flex flex-col items-center justify-center py-12">
               <SanaAIChat />
               <div className="mt-8 flex items-center gap-6 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Neural Core Connected
                    </div>
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-accent-primary" />
                        Llama-3.3 Powered
                    </div>
                    <div className="flex items-center gap-2">
                        <Bot className="w-3 h-3 text-accent-primary" />
                        Clinical Expert Trained
                    </div>
               </div>
          </div>
      ) : (
          <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsMini label="Neural Resolves" value={chats.length.toString()} status="Success" />
                <StatsMini label="Active Shards" value="1" status="Success" />
                <StatsMini label="Thread Density" value="Stable" status="Processing" />
              </div>

              <div className="flex justify-between items-center bg-white dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200 dark:border-white/5">
                  <div className="relative flex-1 max-w-md">
                      <input 
                        type="text"
                        placeholder="Filter chat threads..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-bg-base dark:bg-white/5 border-none rounded-xl py-3 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-accent-primary/50"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  </div>
                  <Button 
                    onClick={fetchHistory}
                    className="ml-4 bg-accent-primary/10 text-accent-primary border border-accent-primary/20"
                  >
                      <RefreshCw className={`w-3 h-3 mr-2 ${isLoading ? 'animate-spin' : ''}`} /> Sync Logs
                  </Button>
              </div>

              <AdminTable columns={columns} data={filteredChats} />
          </div>
      )}
    </div>
  );
}

function StatsMini({ label, value, status }) {
  const colors = {
    Success: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    Failure: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    Processing: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  }
  return (
    <Card className={`p-6 border rounded-[32px] bg-white dark:bg-slate-900/40 shadow-sm flex items-center justify-between ${colors[status]}`}>
       <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{label}</p>
          <p className="text-2xl font-black italic tracking-tighter leading-none">{value}</p>
       </div>
       <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900/40 border border-transparent shadow shadow-black/5 flex items-center justify-center">
          <Bot size={18} />
       </div>
    </Card>
  )
}
