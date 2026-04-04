import React from 'react';
import { User, Award, DollarSign, Mail, Phone, Edit2, ShieldCheck, MapPin } from 'lucide-react';

/**
 * 🆔 DoctorProfileCard
 * Clean identity panel for doctors — consistent with system card design.
 */
export default function DoctorProfileCard({ doctor, id, initials, onEdit }) {
  const statusColor = doctor.is_available 
    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20'
    : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20';

  return (
    <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/[0.06] overflow-hidden">
      
      {/* Avatar + Name Block */}
      <div className="flex flex-col items-center text-center px-6 pt-8 pb-6 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 border-2 border-accent-primary/20 flex items-center justify-center text-accent-primary text-xl font-black mb-4 shadow-sm">
          {initials}
        </div>
        <h2 className="text-[16px] font-black text-slate-800 dark:text-white tracking-tight leading-tight">
          {doctor.name}
        </h2>
        <p className="text-[10px] text-slate-400 dark:text-white/30 font-medium mt-1 uppercase tracking-widest">
          Practitioner ID #{id}
        </p>
        <div className={`mt-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColor}`}>
          {doctor.is_available ? 'Available' : 'On Leave'}
        </div>
      </div>

      {/* Metadata Rows */}
      <div className="px-4 py-4 space-y-1">
        <MetaRow icon={<Award size={13}/>}      label="Experience"  value={`${doctor.experience} Years`} />
        <MetaRow icon={<Award size={13}/>}      label="Specialty"   value={doctor.specialization} />
        <MetaRow icon={<DollarSign size={13}/>} label="Session Fee" value={`Rs. ${doctor.fee}`} valueClass="text-accent-primary font-black" />
        <MetaRow icon={<Phone size={13}/>}     label="Phone"       value={doctor.phone} />
        <MetaRow icon={<Mail size={13}/>}      label="Email"       value={doctor.email} truncate />
      </div>

      {/* Bio / Info */}
      <div className="px-4 pb-4">
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06]">
          <ShieldCheck size={13} className="text-slate-400 mt-0.5 shrink-0" />
          <p className="text-[11px] text-slate-500 dark:text-white/50 font-medium leading-snug">Authorized medical practitioner with verified clinical credentials.</p>
        </div>
      </div>

      {/* Edit Button */}
      <div className="px-4 pb-5">
        <button 
          onClick={onEdit}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-white/40 text-[10px] font-black uppercase tracking-widest hover:border-accent-primary/40 hover:text-accent-primary hover:bg-accent-primary/5 transition-all"
        >
          <Edit2 size={12} /> Edit Practitioner
        </button>
      </div>
    </div>
  );
}

function MetaRow({ icon, label, value, valueClass = 'text-slate-700 dark:text-white/70', truncate = false }) {
  return (
    <div className="flex items-center gap-3 py-2.5 px-1 border-b border-slate-50 dark:border-white/[0.04] last:border-0">
      <div className="text-slate-300 dark:text-white/20 shrink-0">{icon}</div>
      <span className="text-[10px] text-slate-400 dark:text-white/30 font-medium w-16 shrink-0">{label}</span>
      <span className={`text-[11px] font-bold flex-1 ${truncate ? 'truncate' : ''} ${valueClass}`}>{value || '—'}</span>
    </div>
  );
}
