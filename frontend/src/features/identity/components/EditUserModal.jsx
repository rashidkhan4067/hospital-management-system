import React, { useState, useEffect } from 'react';
import {
    Edit2,
    Mail,
    Stethoscope,
    Briefcase,
    Users,
    Shield,
    Phone,
    MapPin
} from 'lucide-react';
import { Button, Modal } from '@/shared/components/ui';

/**
 * 🛠️ Modify Identity Shard Modal
 * High-fidelity portal for updating clinical and civilian credentials.
 */
export default function EditUserModal({ isOpen, onClose, onAction, isSubmitting, user }) {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        role: 'patient',
        is_active: true,
        password: '',
        confirm_password: ''
    });

    useEffect(() => {
        if (user && isOpen) {
            const [firstName, ...lastNameParts] = (user.full_name || '').split(' ');
            setFormData({
                email: user.email || '',
                first_name: firstName || '',
                last_name: lastNameParts.join(' ') || '',
                phone_number: user.phone_number || '',
                role: user.role || 'patient',
                is_active: user.is_active ?? true,
                password: '',
                confirm_password: ''
            });
        }
    }, [user, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation for password if entered
        if (formData.password && formData.password !== formData.confirm_password) {
            return alert("Security Protocol Violation: Passwords do not match.");
        }

        // Filter out empty password if not being changed
        const submissionData = { ...formData };
        if (!submissionData.password) {
            delete submissionData.password;
            delete submissionData.confirm_password;
        }

        onAction(submissionData);
    };

    const sidebar = (
        <div className="flex flex-col h-full">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary mb-6">Optimization Shard</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
                    <Edit2 size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-text-primary dark:text-white truncate">
                        {formData.first_name || formData.last_name ? `${formData.first_name} ${formData.last_name}` : 'Node Refactor'}
                    </p>
                    <p className="text-[8px] font-bold text-text-secondary uppercase mt-1 tracking-widest">{formData.role} Shard</p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Action</span>
                    <span className="text-[10px] font-black text-accent-primary uppercase italic">Synchronizing</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Protocol</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase font-mono">ID-{user?.id || '???'}</span>
                </div>
            </div>

            <div className="mt-auto pt-8 flex items-center justify-center gap-6 opacity-30">
                <Stethoscope size={16} />
                <Briefcase size={16} />
                <Users size={16} />
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Modify Credentials"
            subtitle="Update High-Fidelity Identity Shard"
            icon={Edit2}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">First Name Shard</label>
                        <input
                            required
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                            value={formData.first_name}
                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Last Name Shard</label>
                        <input
                            required
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                            value={formData.last_name}
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Relational Email Node</label>
                        <div className="relative group">
                            <input
                                required
                                type="email"
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-3.5 pl-12 rounded-xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Phone Sync</label>
                        <div className="relative group">
                            <input
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-3.5 pl-12 rounded-xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                                value={formData.phone_number}
                                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                            />
                            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Node Role Shard</label>
                        <div className="relative group">
                            <select
                                required
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-3.5 pl-12 rounded-xl border border-slate-200 dark:border-white/5 text-[11px] font-black uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-[50px]"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="patient">Patient Shard</option>
                                <option value="doctor">Doctor Node</option>
                                <option value="staff">Staff Protocol</option>
                                <option value="admin">Admin Gateway</option>
                            </select>
                            <Shield size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Operational Mesh Status</label>
                        <div className="flex bg-slate-50 dark:bg-slate-900/50 p-1.5 rounded-xl border border-slate-200 dark:border-white/5 h-[50px] items-center">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, is_active: true })}
                                className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${formData.is_active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400'}`}
                            >
                                Active
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, is_active: false })}
                                className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${!formData.is_active ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-400'}`}
                            >
                                Locked
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-white/5 pt-5 mt-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Security Override (Leave blank to keep current)</p>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[8px] font-bold uppercase tracking-widest text-slate-400 ml-1">New Key</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[8px] font-bold uppercase tracking-widest text-slate-400 ml-1">Verify Key</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                                value={formData.confirm_password}
                                onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 flex justify-end gap-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-none"
                    >
                        Abort
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-accent-primary text-white px-10 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/25 border-none hover:scale-105 active:scale-95 transition-all min-w-[200px]"
                    >
                        {isSubmitting ? 'Syncing Node...' : 'Commit Protocol'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
