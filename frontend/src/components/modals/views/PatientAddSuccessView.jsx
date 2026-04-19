import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, CalendarPlus, X, User, 
  ShieldCheck, Hash, LogIn
} from 'lucide-react';
import { useModalStore } from '@/core/store/useModalStore';

/**
 * 🏥 PatientAddSuccessView
 * A focused success view after rapid patient intake.
 */
export default function PatientAddSuccessView({ data, onClose }) {
  const { openModal } = useModalStore();

  const handleBookAppointment = () => {
    // 🔗 Seamless transition: Close current and open Book Appointment with patient context
    onClose();
    setTimeout(() => {
      openModal('BOOK_APPOINTMENT', { initialPatient: data });
    }, 150);
  };

  const InfoTag = ({ label, value, icon: Icon }) => (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-slate-50 text-slate-400">
          <Icon size={16} />
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-sm font-bold text-slate-800">{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="flex flex-col bg-white">
      {/* 🟢 Status Banner */}
      <div className="flex flex-col items-center justify-center p-10 bg-emerald-50/20">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-emerald-200"
        >
          <CheckCircle2 size={40} strokeWidth={2.5} />
        </motion.div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Patient registered</h2>
        <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.2em] mt-2">Clinical record active</p>
      </div>

      {/* 📇 Identity Shard Card */}
      <div className="p-8">
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
          <InfoTag icon={User} label="Patient Name" value={data.full_name || data.user_details?.full_name} />
          <InfoTag icon={ShieldCheck} label="Identity (CNIC)" value={data.cnic || data.user_details?.cnic} />
          <InfoTag icon={Hash} label="Medical ID" value={`PID-${data.id?.toString().padStart(4, '0')}`} />
        </div>

        {/* 🛠 Strategic Actions */}
        <div className="grid grid-cols-1 gap-3 mt-8">
          <button 
            type="button"
            onClick={handleBookAppointment}
            className="flex items-center justify-center gap-3 h-14 bg-slate-900 text-white rounded-2xl text-[12px] font-bold uppercase tracking-widest hover:bg-black transition-all active:scale-[0.98] shadow-2xl shadow-slate-200"
          >
            <CalendarPlus size={20} />
            Schedule Appointment
          </button>
          
          <button 
            type="button"
            onClick={onClose}
            className="flex items-center justify-center h-14 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl text-[12px] font-bold uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-[0.98]"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
