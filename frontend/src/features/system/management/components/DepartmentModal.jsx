import React from 'react';
import { LayoutGrid, Fingerprint, Activity, ShieldCheck, Database, Zap } from 'lucide-react';
import { Modal, Button, Input } from '@/components/primitives';

/**
 * 🏥 Clinical Unit Shard Generation Modal
 * Handles deployment and reconfiguration of medical departments.
 * Re-mapped to the Global Management Modal Registry.
 */
export default function DepartmentModal({ isOpen, onClose, onSubmit, department = null, loading = false }) {
  const [formData, setFormData] = React.useState({
    name: '',
    code: '',
    description: '',
    is_active: true
  });

  React.useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || '',
        code: department.code || '',
        description: department.description || '',
        is_active: department.is_active ?? true
      });
    } else {
      setFormData({ name: '', code: '', description: '', is_active: true });
    }
  }, [department, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const sidebar = (
    <div className="space-y-6">
       <div className="space-y-2">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-accent-primary italic">Node Compliance</h4>
          <p className="text-[9px] font-bold text-text-secondary dark:text-white/30 uppercase leading-relaxed">Each clinical unit must follow HL7 propagation standards and HIPAA privacy benchmarks Level-01.</p>
       </div>
       <div className="grid grid-cols-1 gap-3 pt-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-accent-primary/20 transition-all">
             <Zap size={14} className="text-amber-500" />
             <span className="text-[8px] font-black uppercase text-slate-400">High-Priority Shard</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-accent-primary/20 transition-all">
             <Database size={14} className="text-indigo-500" />
             <span className="text-[8px] font-black uppercase text-slate-400">Isolated Data Vault</span>
          </div>
       </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={department ? "Reconfigure Unit" : "Deploy Clinical Node"}
      subtitle="Unit Shard Propagation Hub"
      icon={LayoutGrid}
      sidebar={sidebar}
      maxWidth="max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Clinical Entity Name</label>
               <input 
                 required
                 placeholder="e.g. Neurology Intelligence Hub"
                 className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-[24px] border border-slate-200 dark:border-white/5 text-[13px] font-black outline-none focus:ring-4 focus:ring-accent-primary/10 transition-all text-slate-900 dark:text-white"
                 value={formData.name}
                 onChange={e => setFormData({...formData, name: e.target.value})}
               />
            </div>
            <div className="space-y-2">
               <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Node Code (ID)</label>
               <input 
                 required
                 placeholder="e.g. NEURO-01"
                 className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-[24px] border border-slate-200 dark:border-white/5 text-[13px] font-black outline-none focus:ring-4 focus:ring-accent-primary/10 transition-all text-slate-900 dark:text-white"
                 value={formData.code}
                 onChange={e => setFormData({...formData, code: e.target.value})}
               />
            </div>
         </div>

         <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Shard Propagation Details</label>
            <textarea 
               rows={4}
               placeholder="Detailed operational description for the clinical personnel matrix..."
               className="w-full bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[28px] border border-slate-200 dark:border-white/5 text-[13px] font-bold outline-none focus:ring-4 focus:ring-accent-primary/10 transition-all text-slate-900 dark:text-white resize-none"
               value={formData.description}
               onChange={e => setFormData({...formData, description: e.target.value})}
            />
         </div>

         <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/[0.02] rounded-[24px] border border-transparent hover:border-accent-primary/10 transition-all">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-accent-primary/10 text-accent-primary rounded-xl">
                  <Activity size={18} />
               </div>
               <div className="space-y-0.5">
                  <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase">Initialize Active State</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Mark as instantly operational in the clinical grid</p>
               </div>
            </div>
            <button 
              type="button"
              onClick={() => setFormData({...formData, is_active: !formData.is_active})}
              className={`w-12 h-6 rounded-full transition-all relative ${formData.is_active ? 'bg-accent-primary shadow-lg shadow-accent-primary/20' : 'bg-slate-300 dark:bg-white/5'}`}
            >
               <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.is_active ? 'left-7' : 'left-1'}`} />
            </button>
         </div>

         <Button 
            disabled={loading}
            type="submit"
            className="w-full bg-accent-primary text-white py-6 rounded-[32px] text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-accent-primary/40 border-none hover:scale-[1.02] active:scale-95 transition-all mt-4"
         >
            {loading ? 'Propagating Node...' : (department ? 'Confirm Reconfiguration' : 'Commit Clinical Shard')}
         </Button>
      </form>
    </Modal>
  );
}
