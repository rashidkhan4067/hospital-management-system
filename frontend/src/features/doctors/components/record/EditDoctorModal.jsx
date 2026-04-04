import React, { useEffect, useState } from 'react';
import { User, Award, DollarSign, Mail, Phone, Lock, ShieldCheck, Edit3, Briefcase, Stethoscope, Users as UsersIcon } from 'lucide-react';
import { Button, Modal } from '@/shared/components/ui';
import DoctorService from '@/features/doctors/api/doctorService';
import { useNotifications } from '@/shared/hooks/useNotifications';

/**
 * 🛠 EditDoctorModal
 * Unified modification portal for established practitioner identities with design parity.
 */
export default function EditDoctorModal({ isOpen, onClose, onRefresh, doctorId, initialData = {} }) {
    const { addNotification } = useNotifications();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        specialization: '',
        experience_years: '',
        consultation_fee: '',
        phone_number: '',
        email: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            const names = initialData.name?.split(' ') || ['', ''];
            setFormData({
                first_name: names[0] || '',
                last_name: names.slice(1).join(' ') || '',
                specialization: initialData.specialization_id || initialData.specialization || '',
                experience_years: initialData.experience || 0,
                consultation_fee: initialData.fee || 0,
                phone_number: initialData.phone || '',
                email: initialData.email || '',
            });
        }
    }, [initialData]);

    const updateField = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await DoctorService.update(doctorId, formData);
            addNotification('Practitioner Updated', 'Doctor record synchronized successfully.', 'success');
            onClose();
            if (onRefresh) onRefresh();
        } catch (err) {
            addNotification('Sync Failure', 'Failed to synchronize clinical practitioner shard.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Practitioner Recalibration</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <Edit3 size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-slate-900 dark:text-white truncate">
                        {formData.first_name || formData.last_name ? `Dr. ${formData.last_name}` : 'Practitioner Shard'}
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest leading-none italic">Recalibrating Node #{doctorId}</p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Enrollment Node</span>
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">ID Recalibration</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Shard Status</span>
                    <span className="text-[10px] font-black text-amber-500 uppercase italic">On-Duty Matrix</span>
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
            title="Modify Practitioner"
            subtitle="Recalibrate established practitioner identity shard"
            icon={Edit3}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-2 gap-5">
                    <InputField label="Given Name Shard" placeholder="First Name" value={formData.first_name} onChange={(v) => updateField('first_name', v)} required />
                    <InputField label="Family Name Node" placeholder="Last Name" value={formData.last_name} onChange={(v) => updateField('last_name', v)} required />
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <InputField label="Consultation Fee" icon={<DollarSign size={12}/>} placeholder="Amount" type="number" value={formData.consultation_fee} onChange={(v) => updateField('consultation_fee', v)} required />
                    <InputField label="Experience Shard" icon={<Award size={12}/>} placeholder="Years" type="number" value={formData.experience_years} onChange={(v) => updateField('experience_years', v)} required />
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <InputField label="Secure Contact" icon={<Phone size={12}/>} placeholder="+92 3XX XXXXXXX" value={formData.phone_number} onChange={(v) => updateField('phone_number', v)} required />
                    <InputField label="Email Hub" icon={<Mail size={12}/>} placeholder="doctor@hospital.com" value={formData.email} onChange={(v) => updateField('email', v)} required />
                </div>

                <InputField label="Practitioner Specialty" icon={<Briefcase size={12}/>} value={formData.specialization} onChange={(v) => updateField('specialization', v)} required placeholder="Primary Designation Matrix..." />

                <div className="p-4 rounded-xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-between opacity-80">
                   <div className="flex items-center gap-3">
                      <ShieldCheck size={16} className="text-accent-primary" />
                      <span className="text-[9px] font-black uppercase text-slate-500">Practitioner Calibration Authorized</span>
                   </div>
                   <div className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-[8px] font-black uppercase tracking-widest">
                      L9 Protocols
                   </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-primary text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none italic"
                >
                    {isSubmitting ? 'Synchronizing Practitioner...' : 'Commit Modifications'}
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
