import React, { useState } from 'react';
import { 
  Plus, ShieldCheck, Stethoscope, RefreshCw, Database, Type, FileText, Briefcase, Users as UsersIcon
} from 'lucide-react';
import { Button, Badge, Modal } from '@/components/primitives';
import { useUI } from '@/core/ui/UIContext';

/**
 * 🏥 Define Specialization Node
 * High-fidelity transaction shard for provisioning new clinical hierarchy units with design parity.
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
        addNotification('Hierarchy Lock Active', 'Global medical schema is governed by system orchestrators.', 'warning');
        setLoading(false);
        onClose();
    }, 1500);
  };

  const sidebar = (
    <React.Fragment>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Hierarchy Registry</p>
        
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                <Database size={18} />
            </div>
            <div>
                <p className="text-[14px] font-black text-slate-900 dark:text-white truncate uppercase tracking-tighter">
                    {formData.name || 'New Unit Shard'}
                </p>
                <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest leading-none italic italic">
                    {formData.type} Hierarchy Matrix
                </p>
            </div>
        </div>

        <div className="space-y-4 px-2 pt-4">
            <div className="flex justify-between items-center">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Protocol</span>
                <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">{formData.priority}</span>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Audit Status</span>
                <span className="text-[10px] font-black text-emerald-500 uppercase italic">Hardened</span>
            </div>
        </div>

        <div className="flex items-center justify-center gap-4 opacity-20 grayscale mt-auto pt-8">
            <Stethoscope size={16} />
            <Briefcase size={16} />
            <UsersIcon size={16} />
        </div>
    </React.Fragment>
  );

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Hierarchy Registry"
        subtitle="Provisioning Clinical Matrix Shard"
        icon={Database}
        sidebar={sidebar}
        maxWidth="max-w-2xl"
    >
        <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Specialization Identity Shard</label>
                <div className="relative group">
                    <input 
                        required
                        type="text"
                        placeholder="E.G., CARDIOTHORACIC-SURGERY"
                        className="w-full h-[54px] px-12 bg-slate-50 dark:bg-[#0f1117] rounded-2xl border border-slate-200 dark:border-white/5 focus:outline-none focus:border-accent-primary text-[11px] font-bold uppercase tracking-[0.1em] text-slate-900 dark:text-white transition-all shadow-sm italic placeholder:text-slate-300"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <Type size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-accent-primary transition-colors" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Registry Node Type</label>
                    <div className="relative group">
                        <select 
                            className="w-full h-[54px] px-12 bg-slate-50 dark:bg-[#0f1117] rounded-2xl border border-slate-200 dark:border-white/5 focus:outline-none focus:border-accent-primary text-[10px] font-black uppercase tracking-widest cursor-pointer appearance-none text-slate-900 dark:text-white transition-all shadow-sm italic"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <option value="CLINICAL">Clinical Unit</option>
                            <option value="DIAGNOSTIC">Diagnostic Node</option>
                            <option value="ADMIN">Administrative Faculty</option>
                        </select>
                        <Stethoscope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-accent-primary pointer-events-none" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Operational Protocol</label>
                    <div className="relative group">
                        <select 
                            className="w-full h-[54px] px-12 bg-slate-50 dark:bg-[#0f1117] rounded-2xl border border-slate-200 dark:border-white/5 focus:outline-none focus:border-accent-primary text-[10px] font-black uppercase tracking-widest cursor-pointer appearance-none text-slate-900 dark:text-white transition-all shadow-sm italic"
                            value={formData.priority}
                            onChange={(e) => setFormData({...formData, priority: e.target.value})}
                        >
                            <option value="STABLE">Stable Protocol</option>
                            <option value="CRITICAL">Critical Watch</option>
                            <option value="EXPERIMENTAL">Experimental Shard</option>
                        </select>
                        <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-accent-primary pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Core Scope Objectives Matrix</label>
                <div className="relative group">
                    <textarea 
                        rows="4"
                        placeholder="Enter functional scope objectives..."
                        className="w-full p-4 pl-12 bg-slate-50 dark:bg-[#0f1117] rounded-2xl border border-slate-200 dark:border-white/5 focus:outline-none focus:border-accent-primary text-[11px] font-bold text-slate-900 dark:text-white transition-all shadow-sm resize-none italic placeholder:text-slate-300"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                    <FileText size={16} className="absolute left-4 top-4 text-slate-400 opacity-40 group-focus-within:text-accent-primary" />
                </div>
            </div>

            <Button 
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-accent-primary/20 border-none hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 mt-4 italic"
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
