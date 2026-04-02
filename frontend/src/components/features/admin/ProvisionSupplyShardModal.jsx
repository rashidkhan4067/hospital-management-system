import React, { useState } from 'react';
import { 
  Package, 
  DollarSign,
  Calendar,
  Layers,
  Tag,
  Truck
} from 'lucide-react';
import { Button, Modal } from '../../ui';

/**
 * 📦 Provision Supply Shard Modal
 * High-fidelity portal for inventory asset initialization.
 */
export default function ProvisionSupplyShardModal({ isOpen, onClose, onRegister, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'medical-supplies',
    stock_quantity: '',
    unit_price: '',
    expiry_date: '',
    sku: '',
    supplier: '',
    reorder_level: 50
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData, () => {
        setFormData({ name: '', category: 'medical-supplies', stock_quantity: '', unit_price: '', expiry_date: '', sku: '', supplier: '', reorder_level: 50 });
    });
  };

  const sidebar = (
    <>
      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary">Supply Profile</p>
      
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
          <Package size={20} className="text-accent-primary" />
          <div>
              <p className="text-[14px] font-black text-text-primary dark:text-white truncate uppercase tracking-tighter">
                {formData.name || 'New Resource'}
              </p>
              <p className="text-[8px] font-bold text-text-secondary uppercase mt-1 tracking-widest">
                {formData.category.replace('-', ' ')}
              </p>
          </div>
      </div>

      <div className="space-y-4 px-2">
          <div className="flex justify-between items-center">
              <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Inventory</span>
              <span className="text-[10px] font-black text-text-primary dark:text-white uppercase">{formData.stock_quantity || 0} units</span>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-4">
              <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Valuation</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase">${formData.unit_price || '0.00'}</span>
          </div>
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-accent-primary/5 text-accent-primary flex items-center gap-3">
          <Truck size={16} className="animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-tight truncate">
            {formData.supplier || 'Awaiting Logistics'}
          </span>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Provision Supply Shard"
      subtitle="Inventory Command Node"
      icon={Package}
      sidebar={sidebar}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Asset Identity</label>
          <div className="relative group">
            <input 
              required
              placeholder="E.G., TITANIUM-INFUSION-MATRIX"
              className="w-full h-14 px-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 focus:outline-none focus:border-accent-primary text-[12px] font-extrabold uppercase outline-none transition-all text-slate-900 dark:text-white shadow-sm"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Protocol Category</label>
            <select 
              className="w-full h-14 px-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none cursor-pointer"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="medical-supplies">Medical Supplies</option>
              <option value="diagnostic-kits">Diagnostic Kits</option>
              <option value="surgical-instruments">Surgical Instruments</option>
              <option value="laboratory-reagents">Laboratory Reagents</option>
              <option value="emergency-gear">Emergency Gear</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">SKU Identity</label>
            <input 
              required
              placeholder="SKU-9921-X"
              className="w-full h-14 px-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
              value={formData.sku}
              onChange={(e) => setFormData({...formData, sku: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Initial Allocation</label>
            <div className="relative group">
                <input 
                    type="number"
                    required
                    className="w-full h-14 px-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-sm"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
                />
                <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Unit Valuation ($)</label>
            <div className="relative group">
                <input 
                    type="number"
                    step="0.01"
                    required
                    className="w-full h-14 px-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-sm"
                    value={formData.unit_price}
                    onChange={(e) => setFormData({...formData, unit_price: e.target.value})}
                />
                <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 opacity-60 group-focus-within:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Logistics Provider (Supplier)</label>
            <div className="relative group">
                <input 
                    required
                    placeholder="E.G., Global Dynamics Medical"
                    className="w-full h-14 px-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 focus:outline-none focus:border-accent-primary text-[11px] font-bold uppercase outline-none transition-all text-slate-900 dark:text-white shadow-sm"
                    value={formData.supplier}
                    onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                />
                <Truck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
            </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-accent-primary text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none h-16"
        >
          {isSubmitting ? 'Synchronizing Shard...' : 'Initialize Supply Protocol'}
        </Button>
      </form>
    </Modal>
  );
}
