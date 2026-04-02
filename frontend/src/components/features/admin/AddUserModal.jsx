import React, { useState } from 'react';
import {
    UserPlus,
    Mail,
    Stethoscope,
    Briefcase,
    Users
} from 'lucide-react';
import { Button, Modal } from '../../ui';

/**
 * 🧛 Onboard User Modal Shard
 * Compact, high-fidelity portal for provisioning clinical and civilian identities.
 * Used for "Provision Identity" and "Onboarding Personnel".
 */
export default function AddUserModal({ isOpen, onClose, onAction, isSubmitting, initialRole = 'patient' }) {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        role: initialRole,
        password: '',
        confirm_password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAction(formData, () => {
            setFormData({
                email: '', first_name: '', last_name: '',
                phone_number: '', role: initialRole,
                password: '', confirm_password: ''
            });
        });
    };

    const sidebar = (
        <>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary">Summary</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <UserPlus size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-text-primary dark:text-white truncate">
                        {formData.first_name || formData.last_name ? `${formData.first_name} ${formData.last_name}` : 'New Identity'}
                    </p>
                    <p className="text-[8px] font-bold text-text-secondary uppercase mt-1 tracking-widest">{formData.role} node</p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Protocol</span>
                    <span className="text-[10px] font-black text-text-primary dark:text-white uppercase">Onboarding</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Status</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase">Ready</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 opacity-20 grayscale mt-auto pt-8">
                <Stethoscope size={16} />
                <Briefcase size={16} />
                <Users size={16} />
            </div>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Onboard Personnel"
            subtitle="Identity Provisioning Protocol"
            icon={UserPlus}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">First Name</label>
                        <input
                            required
                            placeholder="John"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={formData.first_name}
                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Last Name</label>
                        <input
                            required
                            placeholder="Doe"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={formData.last_name}
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Identity Gateway (Email)</label>
                    <div className="relative">
                        <input
                            required
                            type="email"
                            placeholder="john.doe@hospital.com"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Phone</label>
                        <input
                            placeholder="+1 234 567 890"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={formData.phone_number}
                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Operational Role</label>
                        <select
                            required
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="patient">Civilian Patient</option>
                            <option value="doctor">Clinical Specialist</option>
                            <option value="staff">Operational Staff</option>
                            <option value="admin">System Administrator</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Security Key (Password)</label>
                        <input
                            required
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Confirm Security Key</label>
                        <input
                            required
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={formData.confirm_password}
                            onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-primary text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-6 border-none"
                >
                    {isSubmitting ? 'Syncing Identity Node...' : 'Authorize Global Identity'}
                </Button>
            </form>
        </Modal>
    );
}
