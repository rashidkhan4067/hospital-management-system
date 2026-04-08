import React from 'react';
import {
    UserPlus,
    Mail,
    Stethoscope,
    Briefcase,
    Users
} from 'lucide-react';
import { Button, Modal } from '@/components/primitives';
import { useAddUserForm } from '../hooks/useAddUserForm';

/**
 * 🧛 Add User Modal
 * Portal for adding new students, doctors, and staff.
 */
export default function AddUserModal({ isOpen, onClose, onRefresh, initialRole = 'patient' }) {
    const {
        formData,
        updateField,
        handleSubmit,
        isSubmitting
    } = useAddUserForm(() => {
        onClose();
        if (onRefresh) onRefresh();
    }, initialRole);

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary">Summary</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <UserPlus size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-text-primary dark:text-white truncate">
                        {formData.first_name || formData.last_name ? `${formData.first_name} ${formData.last_name}` : 'New User'}
                    </p>
                    <p className="text-[8px] font-bold text-text-secondary uppercase mt-1 tracking-widest">{formData.role}</p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Process</span>
                    <span className="text-[10px] font-black text-text-primary dark:text-white uppercase">Adding User</span>
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
        </React.Fragment>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New User"
            subtitle="Create Hospital Account"
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
                            onChange={(e) => updateField('first_name', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Last Name</label>
                        <input
                            required
                            placeholder="Doe"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={formData.last_name}
                            onChange={(e) => updateField('last_name', e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Email Address</label>
                    <div className="relative">
                        <input
                            required
                            type="email"
                            placeholder="john.doe@hospital.com"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                        />
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Phone</label>
                        <input
                            placeholder="+92 300 0000000"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                            value={formData.phone_number}
                            onChange={(e) => updateField('phone_number', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Role Matrix</label>
                        <select
                            required
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-[53px]"
                            value={formData.role}
                            onChange={(e) => updateField('role', e.target.value)}
                        >
                            <option value="patient">Patient Shard</option>
                            <option value="doctor">Doctor Shard</option>
                            <option value="staff">Staff Node</option>
                            <option value="admin">Root Admin</option>
                        </select>
                    </div>
                </div>

                {formData.role === 'patient' && (
                  <div className="animate-in slide-in-from-top-4 duration-500 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Age</label>
                            <input
                                type="number"
                                placeholder="Age"
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                                value={formData.age || ''}
                                onChange={(e) => updateField('age', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Gender</label>
                            <select
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-[53px]"
                                value={formData.gender || ''}
                                onChange={(e) => updateField('gender', e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Blood Group</label>
                            <select
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-[53px]"
                                value={formData.blood_group || ''}
                                onChange={(e) => updateField('blood_group', e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Residence Address</label>
                        <input
                            placeholder="Residential Matrix Address..."
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={formData.address || ''}
                            onChange={(e) => updateField('address', e.target.value)}
                        />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Password</label>
                        <input
                            required
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={formData.password}
                            onChange={(e) => updateField('password', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Confirm Password</label>
                        <input
                            required
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={formData.confirm_password}
                            onChange={(e) => updateField('confirm_password', e.target.value)}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-primary text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-6 border-none"
                >
                    {isSubmitting ? 'Saving...' : 'Create Account'}
                </Button>
            </form>
        </Modal>
    );
}
