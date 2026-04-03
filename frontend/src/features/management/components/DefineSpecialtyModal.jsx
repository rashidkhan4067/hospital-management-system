import React, { useState } from 'react';
import { 
  Plus,
  ShieldCheck,
  Stethoscope,
  RefreshCw,
  Database,
  Type,
  FileText
} from 'lucide-react';
import { Button, Badge, Modal } from '@/shared/components/ui';
import { useUI } from '@/core/ui/UIContext';

/**
 * 🏥 Define Specialization Node
 * High-fidelity transaction shard for provisioning new clinical hierarchy units.
 * Re-mapped to the Global Management Modal Registry.
 */
export default function DefineSpecialtyModal({ isOpen, onClose }) {
  const { addNotification } = useUI();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'CLINICAL',
    priority: 'STABLE'
  });

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    // Simulating high-fidelity protocol commit
    setTimeout(() => {
        addNotification('Hierarchy Lock Active', 'Global medical schema is governed by system orchestrators. This node is currently in simulation mode.', 'warning');
        setLoading(false);
        onClose();
    }, 1500);
  };

  const sidebar = (
    <>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary">Registry Shard</p>
        
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                <Database size={18} />
            </div>
            <div>
                <p className="text-[14px] font-black text-text-primary dark:text-white truncate uppercase tracking-tighter">
                    {formData.name || 'New Unit'}
                </p>
                <p className="text-[8px] font-bold text-text-secondary uppercase mt-1 tracking-widest">
                    {formData.type} Hierarchy
                </p>
            </div>
        </div>

        <div className="space-y-4 px-2">
            <div className="flex justify-between items-center">
                <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Status</span>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none text-[7px] font-black px-2 py-0.5">READY</Badge>
            </div>
            <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Protocol</span>
                <span className="text-[10px] font-black text-accent-primary uppercase italic">{formData.priority}</span>
            </div>
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-accent-primary/5 text-accent-primary flex items-center gap-3">
            <ShieldCheck size={16} className="animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-tight">Audit Node: Hardened</span>
        </div>
    </>
  );

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Hierarchy Registry"
        subtitle="Provisioning Clinical Matrix"
        icon={Database}
        sidebar={sidebar}
        maxWidth="max-w-2xl"
    >
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Specialty Identity Shard */}
            <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Specialization Identity</label>
                </div>
                <div className="relative group">
                    <input 
                        required
                        type="text"
                        placeholder="E.G., CARDIOTHORACIC-SURGERY"
                        className="w-full h-[54px] px-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 focus:outline-none focus:border-accent-primary text-[11px] font-bold uppercase tracking-[0.1em] text-text-primary dark:text-white transition-all shadow-sm"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <Type size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
                </div>
            </div>

            {/* Operational Range Shards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Registry Type</label>
                    <div className="relative group">
                        <select 
                            className="w-full h-[54px] px-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 focus:outline-none focus:border-accent-primary text-[10px] font-black uppercase tracking-widest cursor-pointer appearance-none text-text-primary dark:text-white transition-all shadow-sm"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <option value="CLINICAL">Clinical Unit</option>
                            <option value="DIAGNOSTIC">Diagnostic Node</option>
                            <option value="ADMIN">Administrative Faculty</option>
                        </select>
                        <Stethoscope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary pointer-events-none" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Operational Mode</label>
                    <div className="relative group">
                        <select 
                            className="w-full h-[54px] px-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 focus:outline-none focus:border-accent-primary text-[10px] font-black uppercase tracking-widest cursor-pointer appearance-none text-text-primary dark:text-white transition-all shadow-sm"
                            value={formData.priority}
                            onChange={(e) => setFormData({...formData, priority: e.target.value})}
                        >
                            <option value="STABLE">Stable Protocol</option>
                            <option value="CRITICAL">Critical Watch</option>
                            <option value="EXPERIMENTAL">Experimental Shard</option>
                        </select>
                        <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Core Description Matrix</label>
                <div className="relative group">
                    <textarea 
                        rows="4"
                        placeholder="Enter functional scope objectives..."
                        className="w-full p-4 pl-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 focus:outline-none focus:border-accent-primary text-[11px] font-bold text-text-primary dark:text-white transition-all shadow-sm resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                    <FileText size={16} className="absolute left-4 top-4 text-text-secondary opacity-40 group-focus-within:text-accent-primary" />
                </div>
            </div>

            <Button 
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 border-none hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 mt-4"
            >
                {loading ? (
                    <>
                        <RefreshCw size={16} className="animate-spin" />
                        Synchronizing Shard...
                    </>
                ) : (
                    <>
                        <Plus size={16} />
                        Commit Hierarchy Shard
                    </>
                )}
            </Button>
        </form>
    </Modal>
  );
}
