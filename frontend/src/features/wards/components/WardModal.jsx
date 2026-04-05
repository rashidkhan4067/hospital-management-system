import React from 'react';
import { Card, Button, Modal } from '@/shared/components/ui';
import { Hospital, Map, Layers, Save, X, Plus, Zap, AlertCircle, LayoutGrid } from 'lucide-react';

/**
 * 🏥 WARD MODAL
 * Clinical Unit Deployment Node.
 * Follows the high-fidelity Appointment Modal design system.
 */
export default function WardModal({ isOpen, onClose, onSave, ward = null }) {
    const [formData, setFormData] = React.useState(ward || {
        name: '',
        type: 'GENERAL',
        floor: '1',
        code: '',
        is_active: true
    });

    const isEdit = !!ward;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Unit Deployment</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <Hospital size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-slate-900 dark:text-white truncate">
                        {formData.name || 'New Ward Shard'}
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest italic">
                        {formData.type} Matrix • Floor {formData.floor}
                    </p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Protocol</span>
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">Clinical Unit Deployment</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Sync Hash</span>
                    <span className="text-[10px] font-black text-orange-500 uppercase italic tracking-tighter">NODE-{Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-2 text-slate-400/40">
                <Zap size={14} className="text-amber-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-widest italic tracking-tighter">System Readiness verified</span>
            </div>
        </React.Fragment>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? "Modify Ward Shard" : "Deploy Ward Node"}
            subtitle="Clinical Spatial Registry Configuration Mapping"
            icon={Hospital}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Shard Name */}
                    <div className="space-y-2 col-span-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Shard Name</label>
                        <div className="relative group">
                            <input
                                required
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-orange-500 transition-all text-slate-900 dark:text-white shadow-sm"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="e.g., General Medicine Block"
                            />
                            <LayoutGrid size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-orange-500" />
                        </div>
                    </div>

                    {/* Ward Code */}
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Ward Code</label>
                        <div className="relative group">
                            <input
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-orange-500 transition-all text-slate-900 dark:text-white shadow-sm"
                                value={formData.code}
                                onChange={(e) => setFormData({...formData, code: e.target.value})}
                                placeholder="e.g., GEN-MED-01"
                            />
                            <AlertCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-orange-500" />
                        </div>
                    </div>

                    {/* Floor */}
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Clinical Floor</label>
                        <div className="relative group">
                            <input
                                type="number"
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-orange-500 transition-all text-slate-900 dark:text-white shadow-sm"
                                value={formData.floor}
                                onChange={(e) => setFormData({...formData, floor: e.target.value})}
                                min="1"
                            />
                            <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Specialization Matrix */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Specialization Matrix</label>
                    <div className="relative group">
                        <select
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-orange-500 transition-all text-slate-900 dark:text-white appearance-none h-[54px] shadow-sm"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <option value="GENERAL">General Ward Matrix</option>
                            <option value="ICU">Intensive Care Node (ICU)</option>
                            <option value="HDU">High Dependency Shard (HDU)</option>
                            <option value="PRIVATE">Private High-Fidelity Suite</option>
                            <option value="PEDIATRIC">Pediatric Clinical Core</option>
                        </select>
                        <Map size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-orange-500" />
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-orange-500/5 p-4 rounded-2xl border border-orange-500/10">
                    <AlertCircle size={20} className="text-orange-500" />
                    <p className="text-[9px] font-black uppercase italic text-orange-900/60 dark:text-orange-200/60 tracking-widest leading-relaxed">
                        Initializing new ward nodes will update the global spatial registry and inform clinical resource allocation algorithms.
                    </p>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-orange-500 text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-orange-500/20 hover:brightness-110 active:scale-95 transition-all mt-6 border-none italic"
                >
                    <Plus size={16} strokeWidth={3} className="mr-2 inline" /> {isEdit ? "Update Configuration" : "Deploy Ward Node Shard"}
                </Button>
            </form>
        </Modal>
    );
}
