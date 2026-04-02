import React from 'react';
import { 
  User, 
  ChevronLeft, 
  Heart, 
  Activity, 
  History, 
  FileText, 
  Calendar, 
  Droplets,
  Zap,
  MoreHorizontal,
  Mail,
  Phone,
  Edit2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader, Button, Card, Badge } from '../../../components/ui';
import { motion } from 'framer-motion';

/**
 * 🛰️ Global Patient Record Console
 * Command-hub style detail view for individual medical records.
 */
export default function PatientRecord() {
  const navigate = useNavigate();
  const { id = 'PAT-4421' } = useParams();

  // Unified Demo Data
  const patient = {
    id,
    name: 'Ellen Ripley',
    age: 42,
    gender: 'F',
    bloodType: 'O+',
    status: 'Stable',
    email: 'ripley@weyland.com',
    phone: '+1 555-01-99',
    lastVitals: {
      bpm: '72',
      bp: '120/80',
      temp: '36.6',
      oxygen: '98%'
    },
    history: [
      { date: '2026-03-28', event: 'Clinical Xenon-Scan', provider: 'Dr. Sarah Smith', status: 'Completed' },
      { date: '2026-02-15', event: 'Cryo-Stasis Recovery', provider: 'Medical Unit 7', status: 'Follow-up' },
      { date: '2025-11-20', event: 'Bio-Matrix Checkup', provider: 'Dr. Bruce Wayne', status: 'Completed' },
    ]
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title={`Identity: ${patient.name}`}
        subtitle={`System Access Path: ${patient.id} • Global Medical Registry`}
        actions={
          <div className="flex items-center gap-3">
             <Button 
                onClick={() => navigate('/admin/patients')}
                className="bg-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 border-none text-[9px] font-black uppercase tracking-widest"
              >
                <ChevronLeft size={14} /> Back to Registry
              </Button>
              <Button className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none">
                <Edit2 size={12} /> Ammend Record
              </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Biometrics & Identity */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-bl-full" />
             
             <div className="flex flex-col items-center text-center space-y-4 mb-8">
                <div className="w-24 h-24 rounded-[32px] bg-accent-primary/10 border border-accent-primary/10 flex items-center justify-center text-accent-primary font-black text-3xl shadow-inner">
                  {patient.name[0]}
                </div>
                <div>
                   <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-none">{patient.name}</h2>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary mt-2">{patient.id}</p>
                </div>
             </div>

             <div className="space-y-4 pt-8 border-t border-slate-100 dark:border-white/5">
                <InfoShard icon={<Mail size={14}/>} label="Email Shard" value={patient.email} />
                <InfoShard icon={<Phone size={14}/>} label="Comms Freq" value={patient.phone} />
                <InfoShard icon={<Droplets size={14}/>} label="Blood Grp" value={patient.bloodType} />
                <InfoShard icon={<Zap size={14}/>} label="Condition" value={patient.status} valueClass="text-emerald-500" />
             </div>
          </Card>

          <Card className="p-8 bg-black/5 dark:bg-black/40 border-none rounded-[40px] shadow-inner">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-4 bg-accent-primary rounded-full" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] italic text-slate-400">Biological Flux</h3>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <VitalCard label="BPM" value={patient.lastVitals.bpm} icon={<Heart size={14}/>} color="rose" />
                <VitalCard label="BP" value={patient.lastVitals.bp} icon={<Activity size={14}/>} color="blue" />
                <VitalCard label="TEMP" value={patient.lastVitals.temp} icon={<Droplets size={14}/>} color="amber" />
                <VitalCard label="O2" value={patient.lastVitals.oxygen} icon={<Zap size={14}/>} color="emerald" />
             </div>
          </Card>
        </div>

        {/* Right Col: Timeline & Protocol Files */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
             <div className="flex items-center justify-between mb-10 px-2">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-accent-primary rounded-full" />
                   <h3 className="text-[14px] font-black uppercase italic tracking-tighter">Clinical Timeline Shard</h3>
                </div>
                <Button className="bg-bg-base dark:bg-white/5 text-[9px] font-black py-2 tracking-widest border-none">Filter Nodes</Button>
             </div>

             <div className="space-y-6 relative ml-4 before:content-[''] before:absolute before:left-[1px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-white/5">
                {patient.history.map((event, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="relative pl-10"
                  >
                     <div className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-primary ring-4 ring-white dark:ring-slate-900 shadow-lg shadow-accent-primary/20" />
                     <div className="bg-bg-base dark:bg-black/20 p-6 rounded-[24px] border border-transparent hover:border-accent-primary/10 transition-all group overflow-hidden">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                           <div className="space-y-1">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{event.date} • {event.provider}</p>
                              <p className="text-md font-black text-slate-800 dark:text-white uppercase italic">{event.event}</p>
                           </div>
                           <Badge className="bg-accent-primary/10 text-accent-primary border-none text-[8px] font-black uppercase px-4">{event.status}</Badge>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <ActionCard title="Prescriptions" subtitle="Bio-Chemical Protocols" icon={<Droplets size={24}/>} />
             <ActionCard title="Reports Upload" subtitle="Clinical Imaging Hub" icon={<FileText size={24}/>} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoShard({ icon, label, value, valueClass = "text-slate-900 dark:text-white" }) {
  return (
    <div className="flex items-center justify-between group">
       <div className="flex items-center gap-3">
          <div className="text-slate-300 group-hover:text-accent-primary transition-colors">{icon}</div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
       </div>
       <span className={`text-[10px] font-black uppercase tracking-tight ${valueClass}`}>{value}</span>
    </div>
  );
}

function VitalCard({ label, value, icon, color }) {
  const colors = {
    rose: 'text-rose-500 bg-rose-500/10',
    blue: 'text-blue-500 bg-blue-500/10',
    amber: 'text-amber-500 bg-amber-500/10',
    emerald: 'text-emerald-500 bg-emerald-500/10'
  };
  return (
    <div className="p-4 rounded-3xl bg-white dark:bg-slate-900/40 flex flex-col items-center gap-2 shadow-sm text-center">
       <div className={`p-2.5 rounded-xl ${colors[color]}`}>{icon}</div>
       <div className="space-y-0.5">
          <p className="text-lg font-black text-slate-900 dark:text-white leading-none">{value}</p>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
       </div>
    </div>
  );
}

function ActionCard({ title, subtitle, icon }) {
  return (
    <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex items-center gap-6">
       <div className="w-14 h-14 rounded-2xl bg-bg-base dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-accent-primary transition-colors">
         {icon}
       </div>
       <div className="space-y-1">
          <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-none">{title}</h3>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{subtitle}</p>
       </div>
    </Card>
  );
}
