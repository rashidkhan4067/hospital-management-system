import React, { useState, useEffect } from 'react';
import M3TextField from '@/components/primitives/M3TextField';
import ClinicalLookup from '@/components/primitives/ClinicalLookup';
import { 
  Receipt, Wallet, CreditCard, User, 
  Trash2, Plus, Calculator, ShieldCheck, 
  ChevronDown, FileText, Ban, Stethoscope
} from 'lucide-react';

const ITEM_TYPES = [
    { value: 'CONSULTATION', label: 'Clinical Consultation', icon: User },
    { value: 'MEDICINE', label: 'Pharmacy / Medicine', icon: Calculator },
    { value: 'LAB_TEST', label: 'Laboratory Diagnostics', icon: FileText },
    { value: 'PROCEDURE', label: 'Medical Procedure', icon: Stethoscope },
    { value: 'OTHER', label: 'Miscellaneous Shards', icon: Plus }
];

export default function NewInvoiceForm({ onChange, setFormData, formData }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [items, setItems] = useState([
    { name: 'Initial Consultation', item_type: 'CONSULTATION', unit_price: 2500, quantity: 1 }
  ]);
  
  const subtotal = items.reduce((acc, curr) => acc + (curr.unit_price * curr.quantity), 0);
  const taxRate = 0.05; // 5% Institutional Tax Shard
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;

  useEffect(() => {
    setFormData(prev => ({ 
        ...prev, 
        items, 
        total_amount: grandTotal,
        subtotal,
        tax_amount: taxAmount 
    }));
  }, [items, grandTotal, subtotal, taxAmount, setFormData]);

  const handlePatientSelect = (p) => {
    setSelectedPatient(p);
    setFormData(prev => ({ ...prev, patient: p.id }));
  };

  const addItem = () => {
    setItems([...items, { name: '', item_type: 'OTHER', unit_price: 0, quantity: 1 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <div className="flex flex-col gap-6 py-2 pb-6 font-sans max-h-[75vh] overflow-y-auto px-1 custom-scrollbar">
      
      {/* 🏥 SECTION 1: Financial Subject Identity */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-primary pl-2 mb-1">
           <User className="text-primary" size={18} />
           <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-sub">Financial Entity</span>
        </div>
        
        <ClinicalLookup 
          label="Identify Account Holder" 
          endpoint="patients/profiles/" 
          onSelect={handlePatientSelect} 
          placeholder="Search by Name, MRN or Cellular ID" 
          required 
        />

        {selectedPatient && (
          <div className="p-4 rounded-[20px] bg-primary/5 border border-primary/10 flex items-center justify-between animate-in slide-in-from-top-2">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-bright flex items-center justify-center border border-outline-variant text-[11px] font-black">
                   {selectedPatient.full_name?.substring(0,2).toUpperCase()}
                </div>
                <div>
                   <div className="text-[13px] font-black text-text-main">{selectedPatient.full_name}</div>
                   <div className="text-[9px] text-text-sub font-bold uppercase tracking-widest italic">
                      {selectedPatient.mrn} • Institutional Shard Verified
                   </div>
                </div>
             </div>
             <ShieldCheck size={18} className="text-primary opacity-40" />
          </div>
        )}
      </div>

      {/* 🏥 SECTION 2: Line Item Implementation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 border-l-4 border-secondary pl-2">
             <Receipt className="text-secondary" size={18} />
             <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-sub">Itemized Ledger</span>
          </div>
          <button 
            type="button" 
            onClick={addItem}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary rounded-lg text-[10px] font-black hover:bg-secondary/20 transition-all border border-secondary/10"
          >
            <Plus size={14} /> Add Fiscal Shard
          </button>
        </div>

        <div className="space-y-3">
           {items.map((item, i) => (
             <div key={i} className="group p-4 rounded-2xl bg-surface-bright border border-outline-variant hover:border-primary/40 transition-all space-y-3 relative overflow-hidden">
                <div className="flex gap-3">
                   <div className="flex-1">
                      <input 
                        className="w-full bg-transparent text-[13px] font-bold text-text-main outline-none border-b border-transparent focus:border-primary/30 py-1"
                        placeholder="Clinical service description"
                        value={item.name}
                        onChange={(e) => updateItem(i, 'name', e.target.value)}
                      />
                   </div>
                   <div className="flex items-center gap-2">
                      <select 
                        value={item.item_type}
                        onChange={(e) => updateItem(i, 'item_type', e.target.value)}
                        className="text-[10px] font-black uppercase bg-outline-variant/10 px-2 py-1 rounded-md outline-none text-text-sub border-none cursor-pointer"
                      >
                         {ITEM_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                      {items.length > 1 && (
                        <button onClick={() => removeItem(i)} className="text-error/40 hover:text-error transition-colors">
                           <Trash2 size={16} />
                        </button>
                      )}
                   </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                   <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                         <span className="text-[9px] font-black uppercase text-text-sub opacity-60">Unit Price</span>
                         <input 
                            type="number"
                            className="bg-transparent text-[13px] font-black text-primary outline-none w-20"
                            value={item.unit_price}
                            onChange={(e) => updateItem(i, 'unit_price', Number(e.target.value))}
                         />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[9px] font-black uppercase text-text-sub opacity-60">Qty</span>
                         <input 
                            type="number"
                            className="bg-transparent text-[13px] font-black text-text-main outline-none w-10 text-center"
                            value={item.qty}
                            onChange={(e) => updateItem(i, 'quantity', Number(e.target.value))}
                         />
                      </div>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[9px] font-black uppercase text-text-sub opacity-60">Subtotal</span>
                      <span className="text-[13px] font-black text-text-main">
                        Rs. {(item.unit_price * item.quantity).toLocaleString()}
                      </span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* 🏥 SECTION 3: Fiscal Summary */}
      <div className="p-6 rounded-[32px] bg-primary text-white space-y-4 shadow-xl shadow-primary/20 relative overflow-hidden">
        {/* Abstract Background Design Element */}
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-2 opacity-70">
           <Calculator size={16} />
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Institutional Fiscal Matrix</span>
        </div>

        <div className="space-y-2">
           <div className="flex justify-between items-center opacity-80">
              <span className="text-[11px] font-bold">Ledger Subtotal</span>
              <span className="text-[12px] font-black">Rs. {subtotal.toLocaleString()}</span>
           </div>
           <div className="flex justify-between items-center opacity-60 border-b border-white/10 pb-2">
              <span className="text-[11px] font-bold">Standard Tax (5%)</span>
              <span className="text-[12px] font-black">+ Rs. {taxAmount.toLocaleString()}</span>
           </div>
           <div className="flex justify-between items-center pt-1">
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Grand Total Amount</span>
                 <span className="text-3xl font-black tracking-tighter italic">
                    Rs. {grandTotal.toLocaleString()}
                 </span>
              </div>
           </div>
        </div>
      </div>

      {/* 🏥 SECTION 4: Settlement Configuration */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-primary pl-2 mb-1">
           <Wallet className="text-primary" size={18} />
           <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-sub">Settlement Protocol</span>
        </div>
        
        <M3TextField 
            label="Settlement Instrument" 
            placeholder="e.g. Cash, Credit/Debit, Institutional Wallet" 
            required 
            fullWidth 
            name="payment_method" 
            onChange={onChange} 
            value={formData.payment_method || ''}
        />
        
        <div className="flex items-center gap-3 p-4 bg-outline-variant/10 rounded-2xl border border-outline-variant/20 italic">
           <Ban size={16} className="text-text-sub opacity-50" />
           <p className="text-[10px] text-text-sub font-medium leading-relaxed">
             Institutional Notice: This fiscal document is immutable once validated. Ensure all clinical shards are itemized before submission.
           </p>
        </div>
      </div>

    </div>
  );
}
