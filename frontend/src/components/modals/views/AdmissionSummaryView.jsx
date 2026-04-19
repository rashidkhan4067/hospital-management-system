import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Printer, Download, X, 
  User, Stethoscope, Hash, ShieldCheck, 
  Building2, DoorOpen, Bed, Calendar, 
  Clock, QrCode, FileText, Info
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * 🏥 AdmissionSummaryView
 * A professional clinical admission slip system.
 */

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-3 my-6 px-2">
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">
      {title}
    </span>
    <div className="h-[1px] w-full bg-slate-100" />
  </div>
);

export default function AdmissionSummaryView({ data, onClose }) {
  const slipRef = useRef();

  // 🖨️ Browser Print
  const handlePrint = () => {
    window.print();
  };

  // 📄 PDF Generator
  const handleDownloadPDF = async () => {
    try {
      const element = slipRef.current;
      const canvas = await html2canvas(element, { 
        scale: 4, // Ultra-High Resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Admission_Slip_${data.id}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  const InfoRow = ({ label, value, icon: Icon, color = "indigo" }) => (
    <div className="flex items-center justify-between py-3.5 border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-all px-2 rounded-xl group">
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-xl bg-${color}-50 text-${color}-600 shadow-inner group-hover:scale-110 transition-transform`}>
          <Icon size={16} strokeWidth={2.5} />
        </div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</span>
      </div>
      <span className="text-sm font-black text-slate-900 tracking-tight text-right">{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] relative overflow-hidden">
      {/* 🔮 Background Glass Motif */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* 🚀 Success Shard */}
      <div className="flex flex-col items-center justify-center p-10 bg-white border-b border-slate-100 relative z-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="w-24 h-24 bg-emerald-500 text-white rounded-[40px] flex items-center justify-center mb-6 shadow-2xl shadow-emerald-200"
        >
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </motion.div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Patient Admitted</h2>
        <p className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em] mt-2 bg-emerald-50 px-4 py-1 rounded-full">
           Clinical Record Synchronized
        </p>
      </div>

      {/* 📄 Admission Slip Portal */}
      <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-transparent">
        <div 
          ref={slipRef}
          className="bg-white rounded-[40px] p-12 shadow-[0_48px_80px_-24px_rgba(0,0,0,0.1)] border border-slate-100 max-w-xl mx-auto print:shadow-none print:border-none print:p-0 print:max-w-full"
        >
          {/* 🏥 Premium Header (Print Mode Only) */}
          <div className="hidden print:flex flex-col items-center mb-12 border-b-8 border-slate-900 pb-10 text-center w-full">
             <div className="flex items-center gap-6 mb-3">
                <Building2 size={56} className="text-slate-900" />
                <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">Antigravity General</h1>
             </div>
             <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em]">Clinical Matrix • ISO 9001:2015 Approved</p>
             <h2 className="mt-10 text-2xl font-black bg-slate-900 text-white px-12 py-3 rounded-full uppercase tracking-[0.3em]">IPD Admission Authorization</h2>
          </div>

          {/* 🪪 Identity Card Shard */}
          <div className="bg-slate-900 rounded-[32px] p-8 mb-10 relative overflow-hidden shadow-2xl shadow-slate-200">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] -mr-16 -mt-16" />
             <div className="flex items-start justify-between relative z-10">
                <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                        <User size={32} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">In-Patient Identity</span>
                        <h3 className="text-2xl font-black text-white tracking-tight">{data.patient_details?.name}</h3>
                        <span className="text-indigo-400 text-xs font-bold mt-1 tracking-wider uppercase">MRN #{data.patient_details?.mrn}</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Admission Status</span>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active Care
                    </div>
                </div>
             </div>
          </div>

          <div className="flex items-center justify-between mb-12 px-2">
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authorization Node</span>
                <span className="text-3xl font-black text-slate-900 tracking-tighter italic">#IPD-{data.id?.toString().padStart(6, '0')}</span>
             </div>
             <div className="text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Registration Date</span>
                <span className="text-base font-black text-slate-900">{new Date(data.admission_date).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
             </div>
          </div>

          {/* Allocation Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <div className="space-y-1">
                <SectionHeader title="Staffing" />
                <InfoRow icon={Stethoscope} color="indigo" label="Lead Consultant" value={`Dr. ${data.doctor_details?.name}`} />
                <InfoRow icon={User} label="Admission Role" value="Lead Attending" />
            </div>
            <div className="space-y-1">
                <SectionHeader title="Location" />
                <div className="flex items-center gap-4 py-4 px-2 bg-indigo-50/30 rounded-[24px] border border-indigo-100/20">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100">
                        <DoorOpen size={24} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">Active Ward / Bed</span>
                        <span className="text-sm font-black text-slate-900">{data.ward_details?.name} • Room {data.room_details?.room_number || data.room}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Assigned Bed: {data.bed_details?.number}</span>
                    </div>
                </div>
            </div>
          </div>

          <div className="mt-8">
            <SectionHeader title="Clinical Profile" />
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 mt-2 relative">
                <div className="absolute top-4 right-4 text-slate-200">
                    <FileText size={24} />
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block font-sans">Primary Observation</span>
                <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                  "{data.primary_diagnosis}"
                </p>
            </div>
          </div>

          {/* 🔍 Secure Verification */}
          <div className="mt-12 pt-12 border-t-4 border-slate-100 flex items-center gap-10">
             <div className="w-28 h-28 bg-white p-3 rounded-[32px] flex items-center justify-center text-slate-900 border-2 border-slate-50 shadow-2xl shadow-slate-100 relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-indigo-600 scale-0 group-hover:scale-100 transition-transform duration-500 origin-bottom-right rounded-full opacity-5" />
                <QrCode size={64} strokeWidth={1} />
             </div>
             <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Institutional Artifact</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400 font-bold max-w-[320px]">
                  This is a digitally verified admission shroud. Please present this artifact at all clinical verification checkpoints and during pharmacy/billing handshakes.
                </p>
             </div>
          </div>

          {/* 🖋️ Official Shard (Print Mode Only) */}
          <div className="mt-20 hidden print:grid grid-cols-2 gap-20">
               <div className="flex flex-col border-t-2 border-slate-900 pt-4">
                   <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Hospital Registrar Shard</span>
               </div>
               <div className="flex flex-col border-t-2 border-slate-900 pt-4 text-right">
                   <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Patient Proxy Signature</span>
               </div>
          </div>
        </div>
      </div>

      {/* 🚀 Action Command Matrix */}
      <div className="p-8 bg-white border-t border-slate-100 grid grid-cols-2 gap-4 relative z-20">
        <button 
          type="button"
          onClick={handlePrint}
          className="flex items-center justify-center gap-3 h-16 bg-slate-900 text-white rounded-[24px] text-[13px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-2xl shadow-indigo-100 group"
        >
          <Printer size={20} className="group-hover:rotate-12 transition-transform" />
          Print Artifact
        </button>
        <button 
          type="button"
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-3 h-16 bg-white border-2 border-slate-100 text-slate-900 rounded-[24px] text-[13px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-xl shadow-slate-50"
        >
          <Download size={20} />
          Digital Backup (PDF)
        </button>
        <button 
          type="button"
          onClick={onClose}
          className="flex items-center justify-center h-16 bg-indigo-50 text-indigo-600 rounded-[24px] text-[13px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all active:scale-95 col-span-2 mt-2"
        >
          Return to Hub
        </button>
      </div>

      {/* 🔴 Sovereign Close Overlay */}
      <button 
        type="button"
        onClick={onClose}
        className="absolute top-8 right-8 w-14 h-14 rounded-[28px] bg-slate-900 text-white shadow-2xl flex items-center justify-center hover:bg-red-600 transition-all z-[60] group active:scale-75"
      >
        <X size={28} className="group-hover:rotate-90 transition-transform" />
      </button>
    </div>
  );
}
