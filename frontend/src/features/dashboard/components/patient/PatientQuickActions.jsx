import React from 'react';
import { PlusCircle, Mic, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/ui';

const PatientQuickActions = ({ onSanaToggle }) => {
  const navigate = useNavigate();

  const actions = [
    { 
      label: 'Book Appointment', 
      desc: 'Schedule a new clinical visit', 
      icon: PlusCircle, 
      link: '/doctors', 
      accent: 'text-blue-500 bg-blue-500/10' 
    },
    { 
      label: 'Talk to Sana', 
      desc: 'Neural voice AI assistant', 
      icon: Mic, 
      link: '/voice', 
      accent: 'text-accent-primary bg-accent-primary/10' 
    },
    { 
      label: 'My Records', 
      desc: 'View medical history & files', 
      icon: FileText, 
      link: '/appointments', 
      accent: 'text-emerald-500 bg-emerald-500/10' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      {actions.map((action, i) => (
        <Card 
          key={i}
          className="group relative h-full flex flex-col p-8 sm:p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-2als transition-all hover:scale-[1.03] hover:border-accent-primary/20 cursor-pointer overflow-hidden"
          onClick={() => navigate(action.link)}
        >
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-accent-primary/5 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="flex flex-col h-full space-y-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.accent} group-hover:scale-110 transition-transform duration-500`}>
              <action.icon size={28} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">{action.label}</h3>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{action.desc}</p>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-4 text-accent-primary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
               Click to Open <ArrowRight size={14} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PatientQuickActions;
