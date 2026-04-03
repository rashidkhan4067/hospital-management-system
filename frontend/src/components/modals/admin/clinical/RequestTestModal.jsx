import React, { useState } from 'react';
import { 
  FlaskConical, 
  Activity,
  User,
  Stethoscope
} from 'lucide-react';
import { Button, Modal } from '../../../ui';
import { useAdminPatients } from '../../../../hooks/admin/useAdminPatients';

/**
 * 🧪 Request Test Modal Shard
 * Compact, high-fidelity portal for initiating clinical diagnostics.
 * Re-mapped to the Global Clinical Modal Registry.
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
    <>
      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary">Protocol Preview</p>
      
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
          <Stethoscope size={20} className="text-emerald-500" />
          <div>
              <p className="text-[14px] font-black text-text-primary dark:text-white truncate">
                {selectedTest ? selectedTest.name : '---'}
              </p>
              <p className="text-[8px] font-bold text-text-secondary uppercase mt-1">Target Analysis</p>
          </div>
      </div>

      <div className="space-y-4 px-2">
          <div className="flex justify-between items-center">
              <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Pricing</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase">
                ${selectedTest ? selectedTest.base_price : '0.00'}
              </span>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-4">
              <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">ETA Node</span>
              <span className="text-[10px] font-black text-text-primary dark:text-white uppercase">
                {selectedTest ? selectedTest.turnaround_time : '---'}
              </span>
          </div>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Test"
      subtitle="Diagnostic Intelligence Node"
      icon={FlaskConical}
      sidebar={sidebar}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Target Patient Identity</label>
          <div className="relative">
            <select 
              required
              className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-14"
              value={formData.patient}
              onChange={(e) => setFormData({...formData, patient: e.target.value})}
            >
              <option value="">Select Patient Shard</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.full_name}</option>
              ))}
            </select>
            <User size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Diagnostic Protocol</label>
          <div className="relative">
            <select 
              required
              className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-14"
              value={formData.test}
              onChange={(e) => setFormData({...formData, test: e.target.value})}
            >
              <option value="">Select Analysis Target</option>
              {tests.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
              ))}
            </select>
            <Activity size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Initial Status</label>
          <select 
            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white h-14"
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="pending">Pending Sync</option>
            <option value="processing">In-Lab Calibration</option>
          </select>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-emerald-500 text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none h-16"
        >
          {isSubmitting ? 'Calibrating Shard...' : 'Initialize Diagnostic Node'}
        </Button>
      </form>
    </Modal>
  );
}
