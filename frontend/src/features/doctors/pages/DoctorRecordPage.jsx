import React, { useEffect, useState } from 'react';
import { 
  ChevronLeft, 
  Stethoscope, 
  Calendar, 
  Award,
  Clock,
  Mail,
  Phone,
  DollarSign,
  Edit2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader, Button, Card, Badge } from '@/shared/components/ui';
import { motion } from 'framer-motion';
import DoctorService from '@/features/doctors/api/doctorService';
import { useNotifications } from '@/shared/hooks/useNotifications';

/**
 * 🩺 Doctor Profile Page
 * Comprehensive view of a doctor's specialties, schedule, and patient history.
 */
export default function DoctorRecord() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addNotification } = useNotifications();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await DoctorService.getById(id);
        setDoctor({
            ...data,
            name: data.user?.full_name || data.full_name || 'Anonymous Doctor',
            specialization: data.specialization_display || data.specialization,
            experience: data.experience_years || 0,
            fee: data.consultation_fee || 0,
            status: data.is_available ? 'Available' : 'On Leave',
            email: data.user?.email || data.email || 'doctor@hospital.com',
            phone: data.user?.phone || data.phone || 'No Contact',
            schedule: [
              { day: 'Monday', time: '09:00 AM - 05:00 PM', status: 'Active' },
              { day: 'Wednesday', time: '09:00 AM - 05:00 PM', status: 'Active' },
              { day: 'Friday', time: '09:00 AM - 02:00 PM', status: 'Active' },
            ],
            history: [
              { date: '2026-04-03', patient: 'Ellen Ripley', type: 'Consultation', status: 'Completed' },
              { date: '2026-04-02', patient: 'John Doe', type: 'Follow-up', status: 'Completed' },
              { date: '2026-04-01', patient: 'Sarah Connor', type: 'Emergency', status: 'Completed' },
            ]
        });
      } catch (err) {
        addNotification('Error', 'Failed to load doctor profile.', 'error');
        console.error("Fetch doctor error:", err);
        setDoctor({
          name: 'Record Not Found',
          specialization: 'N/A',
          experience: 0,
          fee: 0,
          status: 'Offline',
          email: '--',
          phone: '--',
          schedule: [],
          history: []
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDoctor();
  }, [id, navigate, addNotification]);

  if (loading) return (
     <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
     </div>
  );

  if (!doctor) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title={`Doctor: ${doctor.name}`}
        subtitle={`${doctor.specialization} • Professional Profile`}
        actions={
          <div className="flex items-center gap-3">
             <Button 
                onClick={() => navigate('/admin/doctors')}
                className="bg-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 border-none text-[9px] font-black uppercase tracking-widest"
              >
                <ChevronLeft size={14} /> Back to List
              </Button>
              <Button className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none">
                <Edit2 size={12} /> Edit Profile
              </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Doctor Info */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="p-8 bg-white dark:bg-slate-900 border-none rounded-[40px] shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-bl-full" />
             
             <div className="flex flex-col items-center text-center space-y-4 mb-8">
                <div className="w-24 h-24 rounded-[32px] bg-accent-primary/10 border border-accent-primary/10 flex items-center justify-center text-accent-primary font-black text-3xl">
                  {doctor.name[0]}
                </div>
                <div>
                   <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{doctor.name}</h2>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary mt-2">{doctor.specialization}</p>
                </div>
             </div>

             <div className="space-y-4 pt-8 border-t border-slate-100 dark:border-white/5">
                <DetailRow icon={<Award size={14}/>} label="Experience" value={`${doctor.experience} Years`} />
                <DetailRow icon={<DollarSign size={14}/>} label="Consultation Fee" value={`Rs. ${doctor.fee}`} />
                <DetailRow icon={<Mail size={14}/>} label="Email" value={doctor.email} />
                <DetailRow icon={<Phone size={14}/>} label="Phone" value={doctor.phone} />
                <DetailRow icon={<Stethoscope size={14}/>} label="Status" value={doctor.status} valueClass={doctor.is_available ? "text-emerald-500" : "text-amber-500"} />
             </div>
          </Card>

          <Card className="p-8 bg-slate-50 dark:bg-black/20 border-none rounded-[40px]">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-4 bg-accent-primary rounded-full" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Weekly Schedule</h3>
             </div>
             
             <div className="space-y-4">
                {doctor.schedule.map((shift, i) => (
                  <div key={i} className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm">
                     <span className="text-[10px] font-black uppercase text-slate-900 dark:text-white">{shift.day}</span>
                     <span className="text-[10px] font-bold text-slate-400">{shift.time}</span>
                  </div>
                ))}
             </div>
          </Card>
        </div>

        {/* Right Column: Appointments & Stats */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <StatMini label="Total Patients" value="1,240" icon={<Award size={18}/>} />
             <StatMini label="Appointments" value="48" icon={<Calendar size={18}/>} />
             <StatMini label="Avg Rating" value="4.9/5" icon={<Stethoscope size={18}/>} />
          </div>

          <Card className="p-8 bg-white dark:bg-slate-900 border-none rounded-[40px] shadow-sm">
             <div className="flex items-center justify-between mb-10 px-2">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-accent-primary rounded-full" />
                   <h3 className="text-[14px] font-black uppercase italic tracking-tighter">Recent Appointments</h3>
                </div>
                <Button className="bg-slate-50 dark:bg-white/5 text-[9px] font-black py-2 tracking-widest border-none">View All</Button>
             </div>

             <div className="space-y-4">
                {doctor.history.map((app, i) => (
                   <div key={i} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-black/20 rounded-3xl border border-transparent hover:border-accent-primary/10 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary font-black uppercase">
                            {app.patient[0]}
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[12px] font-black uppercase text-slate-900 dark:text-white">{app.patient}</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{app.type} • {app.date}</span>
                         </div>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-black uppercase px-4">{app.status}</Badge>
                   </div>
                ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value, valueClass = "text-slate-900 dark:text-white" }) {
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

function StatMini({ label, value, icon }) {
  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-[32px] shadow-sm flex flex-col items-center gap-3 text-center border border-slate-50 dark:border-white/5">
       <div className="p-3 rounded-2xl bg-accent-primary/10 text-accent-primary">{icon}</div>
       <div className="space-y-1">
          <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</p>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
       </div>
    </div>
  );
}
