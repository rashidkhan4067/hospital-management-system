import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Activity, 
  Terminal, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Search,
  RefreshCw
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard, Card } from '@/components/primitives';
import AdminTable from '@/components/primitives/AdminTable';
import { aiService } from '@/features/ai_intelligence/ai/api/aiService';

/**
 * 🛰️ Sana AI Command Hub (Logs & Processing)
 * Monitoring neural network performance and real-time assistant propagation.
 */
export default function AdminAILogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([
    { title: "AI Intents", value: "0", icon: Zap, trend: "Syncing...", color: "var(--accent-primary)" },
    { title: "Success Rate", value: "0%", icon: ShieldCheck, trend: "Stable", color: "#10b981" },
    { title: "Active Nodes", value: "Stable", icon: Cpu, trend: "Online", color: "#6366f1" },
    { title: "Avg Latency", value: "---", icon: Activity, trend: "Optimized", color: "#f43f5e" },
  ]);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const response = await aiService.get(`${aiService.endpoint}logs/`);
      const data = response.results || response;
      
      setLogs(data);
      
      // Update Stats Dynamically
      const total = data.length;
      const successCount = data.filter(l => l.status === 'STABLE').length;
      const successRate = total > 0 ? ((successCount / total) * 100).toFixed(1) : '100';
      
      setStats([
        { title: "Inference Count", value: total.toString(), icon: Zap, trend: "+New", color: "var(--accent-primary)" },
        { title: "Success Rate", value: `${successRate}%`, icon: ShieldCheck, trend: "Stable", color: "#10b981" },
        { title: "Active Nodes", value: "Master", icon: Cpu, trend: "Online", color: "#6366f1" },
        { title: "Network Status", value: "Stable", icon: Activity, trend: "Latency Normal", color: "#f43f5e" },
      ]);
    } catch (error) {
      console.error("Failed to fetch AI logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(l => 
    l.event.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { 
        header: 'Neural Event Shard', 
        cell: (l) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <Zap size={16} />
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{l.event.replace('_', ' ')}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">{new Date(l.timestamp).toLocaleString()}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Operational Message', 
        cell: (l) => (
            <div className="max-w-[400px]">
                <p className="text-[10px] text-slate-400 font-medium truncate">{l.message}</p>
            </div>
        )
    },
    { 
        header: 'Status',
        cell: (l) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${l.status === 'STABLE' ? 'bg-emerald-500 shadow-emerald-500' : 'bg-rose-500 shadow-rose-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{l.status}</span>
            </div>
        )
    },
    { 
        header: 'Metadata Shard', 
        cell: (l) => (
            <div className="flex items-center gap-2 font-mono text-[8px] text-accent-primary bg-accent-primary/5 px-2 py-1 rounded-md">
                <Terminal size={10} />
                <span>{l.metadata ? JSON.stringify(l.metadata).substring(0, 30) + '...' : 'NONE'}</span>
            </div>
        )
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Sana AI Command Hub" 
        subtitle="Real-time Neural Propagation & Operational Log Matrix"
        actions={
            <div className="flex gap-4">
                <Button 
                    onClick={fetchLogs}
                    className="bg-bg-base dark:bg-white/5 text-text-primary dark:text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-none flex items-center gap-2"
                >
                    <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} /> Sync Neural Data
                </Button>
            </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      <div className="relative mb-6">
          <input 
            type="text"
            placeholder="Search neural events or messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
      </div>

      <AdminTable columns={columns} data={filteredLogs} />
    </div>
  );
}


