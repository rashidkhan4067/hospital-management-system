import React, { useState } from 'react';
import { 
  Droplets, 
  DollarSign,
  Calendar,
  Layers
} from 'lucide-react';
import { Button, Modal } from '@/components/primitives';

/**
 * 💊 Register Medication Modal Shard
 * Compact, high-fidelity portal for medical asset initialization.
 * Re-mapped to the Global Clinical Modal Registry.
 */
export default function RegisterMedicationModal({ isOpen, onClose, onRegister, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'antibiotics',
    stock_quantity: '',
    unit_price: '',
    expiry_date: '',
    batch_number: '',
    reorder_level: 10
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData, () => {
        setFormData({ name: '', category: 'antibiotics', stock_quantity: '', unit_price: '', expiry_date: '', batch_number: '', reorder_level: 10 });
    });
  };

  const sidebar = (
    <>
      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary">Summary</p>
      
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
          <Droplets size={20} className="text-accent-primary" />
          <div>
              <p className="text-[14px] font-black text-text-primary dark:text-white truncate">{formData.name || '---'}</p>
              <p className="text-[8px] font-bold text-text-secondary uppercase mt-1">{formData.category}</p>
          </div>
      </div>

      <div className="space-y-4 px-2">
          <div className="flex justify-between items-center">
              <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Stock</span>
              <span className="text-[10px] font-black text-text-primary dark:text-white uppercase">{formData.stock_quantity || 0}</span>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-4">
              <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Price</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase">Rs. {formData.unit_price || '0'}</span>
          </div>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Medicine"
      subtitle="Pharmacy Store"
      icon={Droplets}
      sidebar={sidebar}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Medicine Name</label>
          <input 
            required
            placeholder="E.G. Panadol"
            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Category</label>
            <select 
              className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="antibiotics">Antibiotics</option>
              <option value="analgesics">Analgesics</option>
              <option value="antivirals">Antivirals</option>
              <option value="supplements">Supplements</option>
              <option value="cardiac">Cardiac Care</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Batch Number</label>
            <input 
              required
              placeholder="E.G. B-101"
              className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
              value={formData.batch_number}
              onChange={(e) => setFormData({...formData, batch_number: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Initial Quantity</label>
            <div className="relative">
                <input 
                    type="number"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-10 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
                />
                <Layers size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Price (Rs)</label>
            <div className="relative">
                <input 
                    type="number"
                    step="0.01"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-10 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                    value={formData.unit_price}
                    onChange={(e) => setFormData({...formData, unit_price: e.target.value})}
                />
                <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Expiry Date</label>
            <div className="relative">
                <input 
                    type="date"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-10 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                    value={formData.expiry_date}
                    onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
                />
                <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500" />
            </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-accent-primary text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 h-16 border-none"
        >
          {isSubmitting ? 'Saving...' : 'Add to Store'}
        </Button>
      </form>
    </Modal>
  );
}
