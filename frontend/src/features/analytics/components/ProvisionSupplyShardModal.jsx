import React, { useState } from 'react';
import { 
  Package, 
  DollarSign,
  Calendar,
  Layers,
  Tag,
  Truck
} from 'lucide-react';
import { Button, Modal } from '@/shared/components/ui';

/**
 * 📦 Provision Supply Shard Modal
 * High-fidelity portal for inventory asset initialization.
 * Re-mapped to the Global Logistics Modal Registry.
 */
export default function ProvisionSupplyShardModal({ isOpen, onClose, onRegister, isSubmitting, categories = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    current_stock: '',
    unit_price: '',
    sku: '',
    supplier_info: '',
    min_stock_level: 50,
    unit: 'units',
    location: ''
  });

  // Set default category when categories are loaded
  React.useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData(prev => ({ ...prev, category: categories[0].id }));
    }
  }, [categories, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData, () => {
        setFormData({ name: '', category: categories[0]?.id || '', current_stock: '', unit_price: '', sku: '', supplier_info: '', min_stock_level: 50, unit: 'units', location: '' });
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
                {formData.category && typeof formData.category === 'string' ? formData.category.replace('-', ' ') : 'Select Category'}
              </p>
          </div>
      </div>

      <div className="space-y-4 px-2">
          <div className="flex justify-between items-center">
              <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">In Stock</span>
              <span className="text-[10px] font-black text-text-primary dark:text-white uppercase">{formData.current_stock || 0} units</span>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-4">
              <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Price</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase">Rs. {formData.unit_price || '0'}</span>
          </div>
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-accent-primary/5 text-accent-primary flex items-center gap-3">
          <Truck size={16} className="animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-tight truncate">
            {formData.supplier_info || 'No Supplier Info'}
          </span>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Stock"
      subtitle="Store Management"
      icon={Package}
      sidebar={sidebar}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Item Name</label>
          <div className="relative group">
            <input 
              required
              placeholder="E.G., PANADOL PACK"
              className="w-full h-14 px-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 focus:outline-none focus:border-accent-primary text-[12px] font-extrabold uppercase outline-none transition-all text-slate-900 dark:text-white shadow-sm"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Category</label>
            <select 
              required
              className="w-full h-14 px-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none cursor-pointer"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">SKU Number</label>
            <input 
              required
              placeholder="E.G., SKU-100"
              className="w-full h-14 px-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
              value={formData.sku}
              onChange={(e) => setFormData({...formData, sku: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Initial Quantity</label>
            <div className="relative group">
                <input 
                    type="number"
                    required
                    className="w-full h-14 px-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-black outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-sm"
                    value={formData.current_stock}
                    onChange={(e) => setFormData({...formData, current_stock: e.target.value})}
                />
                <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Unit Price (Rs)</label>
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
                    value={formData.supplier_info}
                    onChange={(e) => setFormData({...formData, supplier_info: e.target.value})}
                />
                <Truck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
            </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-accent-primary text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none h-16"
        >
          {isSubmitting ? 'Saving Stock...' : 'Add to Stock'}
        </Button>
      </form>
    </Modal>
  );
}
