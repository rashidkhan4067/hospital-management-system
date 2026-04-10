import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '../api/patientService';
import { usePatientState } from '../context/PatientContext';
import { 
    Plus, Upload, Activity, Heart, Thermometer, Droplets, Info, 
    History as HistoryIcon, FileText, Pill, FlaskConical, LayoutDashboard, ChevronRight
} from 'lucide-react';
import { Button, Card, Badge } from '@/components/primitives';
import { motion, AnimatePresence } from 'framer-motion';
import ClinicalTimeline from './ClinicalTimeline';

/**
 * 🛰️ PatientClinicalWorkspace (Senior Architect Refinement)
 * High-fidelity 'Clinical Cockpit' with tabbed telemetry indices.
 */
export default function PatientClinicalWorkspace() {
  const { activePatientId } = usePatientState();
  const [activeTab, setActiveTab] = useState('Overview');

  const { data: patient, isLoading } = useQuery({
    queryKey: ['patient-detail', activePatientId],
    queryFn: () => patientService.getPatientById(activePatientId),
    enabled: !!activePatientId,
  });

  if (!activePatientId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-20 text-center bg-surface/30">
        <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center text-primary/20 mb-6">
            <LayoutDashboard size={48} />
        </div>
        <h3 className="text-2xl font-black text-text-main tracking-tighter">Clinical Workspace Idle</h3>
        <p className="text-sm font-medium text-text-sub max-w-[320px] mt-2">Select a patient profile from the registry to hydrate the clinical environment and access historical context.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-12 flex flex-col gap-10 animate-pulse bg-surface">
        <div className="h-40 bg-surface-bright border border-outline rounded-[32px]" />
        <div className="flex-1 space-y-8">
            <div className="h-4 w-40 bg-surface-bright rounded" />
            <div className="space-y-4">
                <div className="h-32 bg-surface-bright border border-outline rounded-2xl" />
                <div className="h-32 bg-surface-bright border border-outline rounded-2xl" />
            </div>
        </div>
      </div>
    );
  }

  const VITAL_CONFIG = [
    { label: 'Blood Pressure', value: patient.vitals.bp, icon: Activity, isAlert: parseInt(patient.vitals.bp.split('/')[0]) > 140 },
    { label: 'Heart Rate', value: `${patient.vitals.hr} bpm`, icon: Heart, isAlert: patient.vitals.hr > 100 },
    { label: 'SpO2 Saturation', value: `${patient.vitals.spo2}%`, icon: Droplets, isAlert: patient.vitals.spo2 < 95 },
    { label: 'Temperature', value: `${patient.vitals.temp}°C`, icon: Thermometer, isAlert: patient.vitals.temp > 37.5 },
  ];

  const TABS = [
    { id: 'Overview', icon: LayoutDashboard },
    { id: 'History', icon: HistoryIcon },
    { id: 'Labs', icon: FlaskConical },
    { id: 'Meds', icon: Pill },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-bright/50 backdrop-blur-3xl overflow-y-auto custom-scrollbar transition-all">
      {/* 📟 Clinical Profile Hub */}
      <div className="p-8 pb-4">
        
        {/* 🔝 Identity Tier */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center text-2xl font-black shadow-xl shadow-primary/20 ring-4 ring-white/10">
                    {patient.name.charAt(0)}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <h2 className="text-4xl font-black text-text-main tracking-tighter transition-colors">{patient.name}</h2>
                        <Badge variant="tonal" className={patient.status === 'In-Patient' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface border-outline'}>
                            {patient.status}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-text-sub uppercase tracking-[0.2em] opacity-80">
                        <span>{patient.age}Y</span>
                        <span className="opacity-30">•</span>
                        <span>{patient.gender}</span>
                        <span className="opacity-30">•</span>
                        <span>Blood: {patient.bloodType}</span>
                        <span className="opacity-30">•</span>
                        <span className="text-text-main font-black">ID: {patient.id}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="tonal" icon={Upload} size="sm" className="rounded-xl">Lab Upload</Button>
                <Button variant="filled" icon={Plus} size="sm" className="rounded-xl shadow-lg shadow-primary/20">New Consult</Button>
            </div>
        </div>

        {/* 📊 High-Intensity Vital Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {VITAL_CONFIG.map((v) => (
                <Card key={v.label} className={`p-5 flex flex-col gap-2 transition-all duration-300 hover:scale-[1.02] cursor-default border-2 ${v.isAlert ? 'bg-error/5 border-error/30 text-error animate-pulse-slow' : 'bg-surface-bright border-outline/30 text-text-main hover:border-primary/40'}`}>
                    <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-xl ${v.isAlert ? 'bg-error/10' : 'bg-primary/10 text-primary'}`}>
                            <v.icon size={16} />
                        </div>
                        {v.isAlert && <span className="text-[9px] font-black uppercase tracking-widest bg-error text-white px-2 py-0.5 rounded-full">High-Alert</span>}
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 leading-none mb-1">{v.label}</span>
                        <span className="text-2xl font-black tracking-tighter">{v.value}</span>
                    </div>
                </Card>
            ))}
        </div>

        {/* 📑 Management Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 custom-scrollbar scroll-smooth">
            {TABS.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20 fill-white' : 'text-text-sub hover:bg-surface border border-outline/50'}`}
                >
                    <tab.icon size={16} className={activeTab === tab.id ? 'text-white' : 'text-text-sub'} />
                    {tab.id}
                </button>
            ))}
        </div>

        {/* 📉 Intelligence Propagation Lane */}
        <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-20"
            >
                {activeTab === 'Overview' && (
                  <div className="grid grid-cols-12 gap-8">
                     <div className="col-span-8 flex flex-col gap-8">
                        {/* Highlights / Recent */}
                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-black text-text-sub uppercase tracking-[0.2em] px-4">Recent Clinical Dispatches</span>
                            <div className="space-y-4">
                                {patient.timeline.slice(0, 2).map((item) => (
                                    <div key={item.id} className="p-5 bg-surface-bright border border-outline rounded-[28px] flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                <FileText size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-text-main group-hover:text-primary transition-colors">{item.title}</span>
                                                <span className="text-[10px] font-bold text-text-sub opacity-50 uppercase tracking-widest">{item.date} • {item.provider}</span>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-text-sub opacity-30 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary Node */}
                        <div className="p-6 bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-[32px] flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Info size={16} className="text-primary" />
                                <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Clinical Care Synthesis</span>
                            </div>
                            <p className="text-[13px] font-medium text-text-main leading-relaxed">Patient currently under cardiovascular observation with primary hypertension management. Chronic registry marker active. Next review scheduled for follow-up biopsy results.</p>
                        </div>
                     </div>

                     <div className="col-span-4 flex flex-col gap-8">
                        {/* Clinical Tags */}
                        <div className="bg-surface-bright border border-outline rounded-[28px] p-6 flex flex-col gap-4">
                            <span className="text-[10px] font-black text-text-sub uppercase tracking-[0.2em]">Medical Flags</span>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="tonal" className="bg-error/10 text-error text-[9px] font-black tracking-widest px-3">High BP</Badge>
                                <Badge variant="tonal" className="bg-primary/10 text-primary text-[9px] font-black tracking-widest px-3">Smoker</Badge>
                                <Badge variant="tonal" className="bg-warning/10 text-warning text-[9px] font-black tracking-widest px-3">Post-Op Recovery</Badge>
                            </div>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'History' && (
                    <div className="px-4">
                        <ClinicalTimeline events={patient.timeline} />
                    </div>
                )}

                {/* Placeholder for other tabs */}
                {(activeTab === 'Labs' || activeTab === 'Meds') && (
                    <div className="py-20 flex flex-col items-center justify-center opacity-30 grayscale gap-6">
                        <FlaskConical size={64} className="animate-bounce-slow" />
                        <span className="text-sm font-black text-text-sub uppercase tracking-[0.2em]">Clinical Telemetry Hydrating...</span>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
