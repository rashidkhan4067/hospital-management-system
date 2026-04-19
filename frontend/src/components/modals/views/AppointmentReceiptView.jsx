import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Printer, Download, PlusCircle, 
  X, Calendar, Clock, User, Stethoscope, 
  Hash, ShieldCheck, MapPin, QrCode
} from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * 🏥 AppointmentReceiptView
 * A premium, printable clinical booking confirmation shard.
 */
export default function AppointmentReceiptView({ data, onReset, onClose }) {
  const receiptRef = useRef();

  // 🖨️ Clinical Print Orchestration
  const handlePrint = () => {
    window.print();
  };

  // 📄 PDF Generation Logic
  const handleDownloadPDF = async () => {
    try {
      const element = receiptRef.current;
      const canvas = await html2canvas(element, { 
        scale: 2,
        useCORS: true,
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Receipt_APP_${data.id}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Could not generate PDF. Please try printing to PDF instead.");
    }
  };

  const InfoRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400">
          <Icon size={14} />
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-sm font-bold text-slate-800 tracking-tight">{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 🟢 Success Banner */}
      <div className="flex flex-col items-center justify-center p-8 bg-emerald-50/30 border-b border-emerald-100/50">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-white text-emerald-500 rounded-3xl flex items-center justify-center mb-4 shadow-xl shadow-emerald-200/50"
        >
          <CheckCircle2 size={32} strokeWidth={2.5} />
        </motion.div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Booking Confirmed</h2>
        <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.2em] mt-1">Clinical Record Synchronized</p>
      </div>

      {/* 📄 Receipt Shard (Printable Area) */}
      <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-slate-50/30">
        <div 
          ref={receiptRef}
          className="bg-white rounded-3xl p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-md mx-auto print:shadow-none print:border-none print:p-0"
        >
          {/* Hospital Header (Print Only) */}
          <div className="hidden print:flex flex-col items-center mb-8 border-b-2 border-slate-900 pb-6 text-center">
             <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Antigravity General</h1>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Advanced Clinical Matrix • ISO 9001 Certified</p>
          </div>

          {/* ID & Status Badge */}
          <div className="flex items-center justify-between mb-8">
             <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Appointment ID</span>
                <span className="text-lg font-black text-[#0051d9] tracking-tighter">#AP-{data.id?.toString().padStart(5, '0')}</span>
             </div>
             <div className="px-4 py-1.5 bg-blue-50 text-[#0051d9] rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                Scheduled
             </div>
          </div>

          <div className="space-y-1">
            <InfoRow icon={User} label="Patient Name" value={data.patient?.full_name} />
            <InfoRow icon={ShieldCheck} label="Identity (CNIC)" value={data.patient?.cnic || data.patient?.user?.cnic || 'SHARD_NOT_FOUND'} />
            <InfoRow icon={Stethoscope} label="Consultant" value={`Dr. ${data.doctor?.full_name || data.doctor?.user?.full_name}`} />
            <InfoRow icon={Calendar} label="Visit Date" value={data.appointment_date} />
            <InfoRow icon={Clock} label="Slot Time" value={data.start_time} />
            <InfoRow icon={Hash} label="Department" value={data.doctor?.specialization?.toUpperCase() || 'GENERAL'} />
          </div>

          {/* Verification QR (Decorative Mock) */}
          <div className="mt-8 pt-8 border-t border-dashed border-slate-200 flex items-center gap-6">
             <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 border border-slate-100">
                <QrCode size={32} strokeWidth={1.5} />
             </div>
             <div className="flex-1">
                <p className="text-[11px] leading-relaxed text-slate-500 font-medium italic">
                  "Please arrive 10 minutes before your scheduled time for vital signs screening."
                </p>
             </div>
          </div>

          {/* Print Date */}
          <div className="mt-6 text-center hidden print:block">
            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">
              Generated on {new Date().toLocaleString()} • Unique Transaction Node
            </p>
          </div>
        </div>
      </div>

      {/* 🛠 Action Matrix */}
      <div className="p-6 bg-white border-t border-slate-100 grid grid-cols-2 gap-3">
        <button 
          type="button"
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 h-11 bg-slate-900 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-100"
        >
          <Printer size={16} />
          Print Slip
        </button>
        <button 
          type="button"
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2 h-11 bg-white border-2 border-slate-100 text-slate-800 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
        >
          <Download size={16} />
          Download PDF
        </button>
        <button 
          type="button"
          onClick={() => {
            console.log("Resetting modal state...");
            onReset();
          }}
          className="flex items-center justify-center gap-2 h-11 bg-blue-50 text-[#0051d9] rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-blue-100 transition-all active:scale-95 col-span-2 mt-1"
        >
          <PlusCircle size={16} />
          Schedule Another Visit
        </button>
      </div>

      {/* 🔴 Top Close Overlay */}
      <button 
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all z-[60]"
      >
        <X size={20} />
      </button>
    </div>
  );
}
