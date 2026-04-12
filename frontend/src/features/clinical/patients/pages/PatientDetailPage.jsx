import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    User, 
    Calendar, 
    FileText, 
    Activity, 
    Pill, 
    Thermometer, 
    Stethoscope, 
    ArrowLeft,
    Clock,
    MoreVertical,
    Download,
    ShieldAlert
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';

/**
 * 👤 PatientDetailPage (M3 EMR Master View)
 * Comprehensive clinical identity dashboard for a single patient record.
 */
export default function PatientDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Mock patient data
    const patient = {
        id: id || 'PID-10293',
        name: 'Ali Khan',
        age: 42,
        gender: 'Male',
        blood: 'B+',
        status: 'In-Patient',
        ward: 'Cardiology (W-4)',
        vitals: { temp: '37.2°C', bp: '120/80', hr: '72 bpm', sat: '98%' },
        meds: ['Atorvastatin 20mg', 'Aspirin 75mg', 'Metformin 500mg'],
        history: [
            { date: '2026-05-10', event: 'Initial Consultation', unit: 'OPD' },
            { date: '2026-05-12', event: 'Cardiac Stress Test', unit: 'Cardiology' },
            { date: '2026-05-14', event: 'Standard Admission', unit: 'IPD' },
        ]
    };

    return (
        <AdminPage className="min-h-screen">
            <div className="max-w-[1400px] mx-auto px-4 py-8 lg:py-12">
                
                {/* ── Breadcrumbs & Actions ── */}
                <div className="flex items-center justify-between mb-8">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm font-bold text-text-sub hover:text-primary transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Registry Matrix
                    </button>

                    <div className="flex gap-3">
                        <button className="h-10 px-4 rounded-xl bg-surface-variant/50 hover:bg-surface-variant flex items-center gap-2 text-[12px] font-bold text-text-sub border border-outline-variant/30 transition-colors">
                            <Download size={14} />
                            Export EMR
                        </button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-surface-variant/50 hover:bg-surface-variant border border-outline-variant/30">
                            <MoreVertical size={16} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
                    
                    {/* ── Left column: Identity & Vitals ── */}
                    <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
                        
                        {/* Identity Card */}
                        <div className="bg-surface-bright border border-outline-variant rounded-[40px] p-8 elev-1 flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-[32px] bg-primary-container text-primary flex items-center justify-center font-black text-3xl mb-6">AK</div>
                            <h1 className="text-2xl font-black text-text-main tracking-tight mb-1">{patient.name}</h1>
                            <p className="text-sm font-bold text-primary mb-6">{patient.id}</p>
                            
                            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                                <span className="px-3 py-1 rounded-full bg-surface-variant/60 text-[10px] font-black uppercase text-text-sub">{patient.age} Years</span>
                                <span className="px-3 py-1 rounded-full bg-surface-variant/60 text-[10px] font-black uppercase text-text-sub">{patient.gender}</span>
                                <span className="px-3 py-1 rounded-full bg-error/10 text-[10px] font-black uppercase text-error">Blood: {patient.blood}</span>
                            </div>

                            <div className="w-full h-px bg-outline-variant/30 mb-8" />

                            <div className="grid grid-cols-2 w-full gap-4">
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-text-sub uppercase tracking-wider mb-1">Status</p>
                                    <p className="text-xs font-bold text-success flex items-center gap-1.5">
                                        <Activity size={12} /> {patient.status}
                                    </p>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-text-sub uppercase tracking-wider mb-1">Primary Unit</p>
                                    <p className="text-xs font-bold text-text-main">{patient.ward}</p>
                                </div>
                            </div>
                        </div>

                        {/* Vital Metrics */}
                        <div className="bg-surface-bright border border-outline-variant rounded-[40px] p-8 elev-1">
                            <h2 className="text-sm font-bold text-text-main mb-6 flex items-center gap-2">
                                <Thermometer size={16} className="text-primary" />
                                Real-time Vitals
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(patient.vitals).map(([key, val]) => (
                                    <div key={key} className="p-4 rounded-2xl bg-surface-variant/30 border border-outline-variant/30">
                                        <p className="text-[10px] font-bold text-text-sub uppercase mb-1">{key.replace('_', ' ')}</p>
                                        <p className="text-lg font-black text-text-main tracking-tight">{val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right Column: Medical History & Prescriptions ── */}
                    <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
                        
                        {/* Prescriptions Matrix */}
                        <div className="bg-surface-bright border border-outline-variant rounded-[40px] p-8 elev-1">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-lg font-black text-text-main tracking-tight flex items-center gap-3">
                                    <Pill size={18} className="text-[#6750A4]" />
                                    Active Medication Protocol
                                </h2>
                                <button className="text-[11px] font-black text-primary uppercase tracking-widest">+ Update Dose</button>
                            </div>
                            <div className="flex flex-col gap-3">
                                {patient.meds.map((med, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-5 rounded-3xl bg-surface-variant/20 border border-outline-variant/30">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-white border border-outline-variant flex items-center justify-center">
                                                <Pill size={18} className="text-text-sub opacity-40 text-[#6750A4]" />
                                            </div>
                                            <span className="text-[13px] font-bold text-text-main">{med}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-text-sub bg-surface-variant px-3 py-1 rounded-full uppercase">Oral / 12 Hours</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Clinical Timeline */}
                        <div className="bg-surface-bright border border-outline-variant rounded-[40px] p-8 elev-1">
                            <h2 className="text-lg font-black text-text-main tracking-tight flex items-center gap-3 mb-8">
                                <Clock size={18} className="text-primary" />
                                Interactive Clinical Timeline
                            </h2>
                            <div className="flex flex-col gap-0">
                                {patient.history.map((h, idx) => (
                                    <div key={idx} className="flex gap-6 group">
                                        <div className="flex flex-col items-center w-8 pt-1">
                                            <div className="w-3 h-3 rounded-full border-2 border-primary bg-white z-10" />
                                            {idx < patient.history.length - 1 && (
                                                <div className="w-px flex-1 bg-outline-variant/50 my-1" />
                                            )}
                                        </div>
                                        <div className="flex-1 pb-8">
                                            <div className="p-5 rounded-3xl bg-surface-variant/10 border border-outline-variant/20 group-hover:border-primary/40 transition-colors">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="text-sm font-bold text-text-main">{h.event}</h3>
                                                    <span className="text-[10px] font-bold text-text-sub opacity-50">{h.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Stethoscope size={12} className="text-primary opacity-60" />
                                                    <span className="text-[11px] font-semibold text-text-sub uppercase tracking-wider">{h.unit} Department</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Alerts Notification */}
                        <div className="bg-error/5 border border-error/10 rounded-[40px] p-6 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-error text-white flex items-center justify-center shrink-0">
                                <ShieldAlert size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-error mb-1">Critical Allergy Warning</h3>
                                <p className="text-[11px] font-medium text-error opacity-70">Patient exhibits severe hyper-sensitivity to Penicillin G. Avoid all β-lactam antibiotics.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPage>
    );
}
