import React from 'react';
import { UserPlus, User, Award, DollarSign, Phone, Mail, Lock, Briefcase, Stethoscope, Users as UsersIcon } from 'lucide-react';
import { Button, Modal } from '@/components/primitives';
import { useAddUserForm } from '@/features/staff/users/hooks/useAddUserForm';

/**
 * 🩺 AddDoctorModal
 * Unified recruitment portal for clinical practitioners with dynamic sidebar.
 */
export default function AddDoctorModal({ isOpen, onClose, onRefresh }) {
    const {
        formData,
        updateField,
        handleSubmit,
        isSubmitting
    } = useAddUserForm(() => {
        onClose();
        if (onRefresh) onRefresh();
    }, 'doctor');

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Practitioner Summary</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <UserPlus size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-slate-900 dark:text-white truncate">
                        {formData.first_name || formData.last_name ? `${formData.first_name} ${formData.last_name}` : 'New Practitioner'}
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest leading-none italic">Clinical Designation Assigned</p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Enrollment Node</span>
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">Clinical Intake</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Shard Status</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase italic">Onboarding Hub</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 opacity-20 grayscale mt-auto pt-8">
                <Stethoscope size={16} />
                <Briefcase size={16} />
                <UsersIcon size={16} />
            </div>
        </React.Fragment>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Practitioner Intake"
            subtitle="Establish new clinical practitioner identity"
            icon={UserPlus}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-2 gap-5">
                    <InputField label="Given Name" placeholder="Clinical Intent" value={formData.first_name} onChange={(v) => updateField('first_name', v)} required />
                    <InputField label="Family Name" placeholder="Lineage Shard" value={formData.last_name} onChange={(v) => updateField('last_name', v)} required />
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <InputField label="Clinical Fee" icon={<DollarSign size={12}/>} placeholder="Consultation Amount" type="number" value={formData.consultation_fee} onChange={(v) => updateField('consultation_fee', v)} required />
                    <InputField label="Exp Years" icon={<Award size={12}/>} placeholder="Experience Shard" type="number" value={formData. অভিজ্ঞতা_years || formData.experience_years} onChange={(v) => updateField('experience_years', v)} required />
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <InputField label="Contact Hub" icon={<Phone size={12}/>} placeholder="+92 3XX XXXXXXX" value={formData.phone_number} onChange={(v) => updateField('phone_number', v)} required />
                    <InputField label="Email Shard" icon={<Mail size={12}/>} placeholder="practitioner@hospital.com" value={formData.email} onChange={(v) => updateField('email', v)} required />
                </div>

                <InputField label="Specialization Matrix" icon={<Briefcase size={12}/>} value={formData.specialization} onChange={(v) => updateField('specialization', v)} required placeholder="Primary Clinical Designation..." />

                <div className="grid grid-cols-2 gap-5 pt-4 border-t border-slate-100 dark:border-white/5">
                    <InputField label="Master Key" type="password" icon={<Lock size={12}/>} placeholder="••••••••" value={formData.password} onChange={(v) => updateField('password', v)} required />
                    <InputField label="Verify Protocol" type="password" icon={<Lock size={12}/>} placeholder="••••••••" value={formData.confirm_password} onChange={(v) => updateField('confirm_password', v)} required />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-primary text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none italic"
                >
                    {isSubmitting ? 'Synchronizing Practitioner...' : 'Establish Practitioner Shard'}
                </Button>
            </form>
        </Modal>
    );
}

function InputField({ label, icon, ...props }) {
    return (
      <div className="space-y-2">
        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">{label}</label>
        <div className="relative group">
          {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors">{icon}</div>}
          <input
            {...props}
            className={`w-full bg-slate-50 dark:bg-[#0f1117] p-4 ${icon ? 'pl-11' : ''} rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary focus:shadow-[0_0_15px_rgba(45,212,191,0.1)] transition-all text-slate-900 dark:text-white uppercase placeholder:text-slate-300 italic`}
            onChange={(e) => props.onChange(e.target.value)}
          />
        </div>
      </div>
    );
}

