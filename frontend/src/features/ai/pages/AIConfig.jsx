import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Terminal, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Activity,
  CheckCircle2,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { PageHeader, Button } from '@/shared/components/ui';
import AIIntelligenceMatrix from '@/features/ai/components/AIIntelligenceMatrix';
import AIInterfaceProtocols from '@/features/ai/components/AIInterfaceProtocols';
import AINodeStatusCard from '@/features/ai/components/AINodeStatusCard';
import { motion } from 'framer-motion';
import { aiService } from '@/features/ai/api/aiService';

/**
 * 🛰️ Sana AI Neural Configuration Console
 * High-fidelity interface for tuning assistant intelligence and propagation nodes.
 */
export default function AIConfig() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [config, setConfig] = useState({
    confidenceThreshold: 0.85,
    maxLatency: 150,
    model: 'Clinical-Llama-70B',
    voiceEnabled: true,
    diagnosticDepth: 'Advanced'
  });

  const fetchConfig = async () => {
    setFetching(true);
    try {
      const data = await aiService.getAIConfig();
      // data might be an array of configs or a single object depending on backend
      const configObj = Array.isArray(data) ? data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {}) : data;
      
      if (Object.keys(configObj).length > 0) {
          setConfig(prev => ({ ...prev, ...configObj }));
      }
    } catch (err) {
      console.error("Failed to fetch AI configuration:", err);
      setError("Failed to synchronize with Neural Core.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real scenario, we might update individual keys or a single config blob
      // Here we assume we post the entire config object to a bulk update endpoint or iterate
      await aiService.post(`${aiService.endpoint}config/`, {
          key: 'global_neural_config',
          value: config
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Threshold Breach: Propagation Failed.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <RefreshCw className="w-10 h-10 text-accent-primary animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Synchronizing Neural Parameters...</p>
      </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 p-4 md:p-6 pb-20">
      
      <PageHeader 
        title="Neural Configuration" 
        subtitle="Global AI Propagation & Intelligence Tuning Interface"
        actions={
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="bg-accent-primary text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/20 border-none"
          >
            {loading ? 'Propagating...' : 'Commit Settings'}
          </Button>
        }
      />

      {success && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 text-emerald-500 mb-8"
        >
          <CheckCircle2 size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Neural Parameters Synced Successfully</span>
        </motion.div>
      )}

      {error && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-center gap-3 text-rose-500 mb-8"
        >
          <AlertTriangle size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Intelligence Matrix & Protocols */}
        <div className="lg:col-span-8 space-y-6">
          <AIIntelligenceMatrix config={config} setConfig={setConfig} />
          <AIInterfaceProtocols config={config} setConfig={setConfig} />
        </div>

        {/* System Health */}
        <div className="lg:col-span-4 space-y-6">
          <AINodeStatusCard />
        </div>
      </div>
    </div>
  );
}
