import React, { useState } from 'react';
import { 
  FlaskConical, 
  Activity,
  User,
  Stethoscope,
  ClipboardList,
  Zap,
  Clock,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { Button, Modal } from '@/components/primitives';
import { useAdminPatients } from '@/features/patients/hooks/usePatients';

/**
 * 🧪 Request Test Modal Shard
 * Compact, high-fidelity portal for initiating clinical diagnostics.
 * Follows the high-fidelity Appointment Modal design system.
 */
export default function RequestTestModal({ isOpen, onClose, onAction, isSubmitting, tests = [] }) {
  const { patients } = useAdminPatients();
  const [formData, setFormData] = useState({
    patient: '',
    test: '',
    status: 'pending',
    result_value: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAction(formData, () => {
        setFormData({ patient: '', test: '', status: 'pending', result_value: '' });
    });
  };

  const selectedPatient = patients.find(p => p.id == formData.patient);
  const selectedTest = tests.find(t => t.id == formData.test);

  const sidebar = (
    <React.Fragment>
      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Diagnostic Preview</p>
      
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
            <FlaskConical size={18} />
          </div>
          <div>
              <p className="text-[14px] font-black text-slate-900 dark:text-white truncate uppercase italic tracking-tighter">
                {selectedTest ? selectedTest.name : 'Target Analysis'}
              </p>
              <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest italic">
                {selectedPatient ? selectedPatient.full_name : 'Patient Unassigned'}
              </p>
          </div>
      </div>

      <div className="space-y-4 px-2">
          <div className="flex justify-between items-center">
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Pricing</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase italic">
                ${selectedTest ? selectedTest.base_price : '0.00'}
              </span>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-4">
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">ETA Shard</span>
              <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">
                {selectedTest ? selectedTest.turnaround_time : '---'}
              </span>
          </div>
      </div>

      <div className="mt-auto pt-8 flex items-center gap-2 text-slate-400/40">
          <Zap size={14} className="text-amber-500 animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-widest italic tracking-tighter">Laboratory Readiness Level 5</span>
      </div>
    </React.Fragment>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Diagnostic"
      subtitle="Diagnostic Clinical Intelligence Node Registry"
      icon={FlaskConical}
      sidebar={sidebar}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Patient Selection */}
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Target Patient Shard</label>
          <div className="relative group">
            <select 
              required
              className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-14 shadow-sm"
              value={formData.patient}
              onChange={(e) => setFormData({...formData, patient: e.target.value})}
            >
              <option value="">Select Patient Identity...</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.full_name} (ID-{p.id})</option>
              ))}
            </select>
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-accent-primary transition-colors" />
          </div>
        </div>

        {/* 2. Diagnostic Protocol */}
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Diagnostic Protocol / Analysis Target</label>
          <div className="relative group">
            <select 
              required
              className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-14 shadow-sm"
              value={formData.test}
              onChange={(e) => setFormData({...formData, test: e.target.value})}
            >
              <option value="">Select Calibration Target...</option>
              {tests.map(t => (
                <option key={t.id} value={t.id}>{t.name} • {t.category}</option>
              ))}
            </select>
            <Stethoscope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-accent-primary transition-colors" />
          </div>
        </div>

        {/* 3. Node State */}
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Initial Node State</label>
          <div className="relative group">
            <select 
              className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-14 shadow-sm"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="pending">Pending Calibration</option>
              <option value="processing">In-Lab Synchronization</option>
            </select>
            <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-accent-primary transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-accent-primary/5 p-4 rounded-2xl border border-accent-primary/10">
            <AlertCircle size={20} className="text-accent-primary" />
            <p className="text-[9px] font-black uppercase italic text-teal-900/60 dark:text-teal-200/60 tracking-widest leading-relaxed">
                Initializing diagnostic requests will commit clinical data shards to the laboratory processing queue in real-time.
            </p>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-accent-primary text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none h-16 italic"
        >
          {isSubmitting ? 'Syncing Diagnostic Shard...' : 'Initialize Diagnostic Node'}
        </Button>
      </form>
    </Modal>
  );
}
