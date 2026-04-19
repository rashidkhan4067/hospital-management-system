/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, 
    Search, 
    Clock, 
    Users, 
    Filter, 
    ChevronLeft, 
    ChevronRight, 
    MapPin, 
    Star,
    Video,
    UserCircle2,
    CheckCircle2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';
import { apiClient } from '@/core/api';
import { UI_TOKENS, CTA_THEMES } from '@/core/config/UI';

const TIME_SLOTS = ['09:00 AM', '10:15 AM', '11:30 AM', '02:00 PM', '03:45 PM', '05:00 PM'];

/**
 * 📅 BookAppointmentPage (Clinical Scheduler Archetype)
 * Standardized practitioner selection & time-slot allocation matrix.
 */
export default function BookAppointmentPage() {
    const navigate = useNavigate();
    const { id }    = useParams();
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [notes, setNotes] = useState('');
    const [appointment, setAppointment] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading]       = useState(false);
    const [isSaving, setIsSaving]         = useState(false);

    // ── Load Clinical Nodes ──
    useEffect(() => {
        // Fetch Doctors
        apiClient.get('/doctors/')
            .then(res => {
                const data = res.data.results || res.data;
                if (Array.isArray(data)) {
                    setDoctors(data
                        .filter(d => d.full_name || d.user?.full_name)
                        .map(d => {
                            const rawName = d.full_name || d.user?.full_name || 'Staff Practitioner';
                            const displayName = rawName.toLowerCase().startsWith('dr.') ? rawName : `Dr. ${rawName}`;
                            return {
                                id: d.id,
                                name: displayName,
                                specialization: d.specialization_display || d.specialization,
                                rating: 4.8, 
                                clinics: d.clinic_address || 'Main Clinic',
                                avatar: null,
                                availability: d.is_available ? 'Available Today' : 'On Leave'
                            };
                        }));
                }
            })
            .catch(err => console.error("Staff Node Error:", err));

        // Fetch Patients (for Admin selection)
        apiClient.get('/patients/profiles/')
            .then(res => {
                const data = res.data.results || res.data;
                if (Array.isArray(data)) setPatients(data);
            })
            .catch(err => console.error("Patient Node Error:", err));
    }, []);

    // ── Load Existing Shard ──
    useEffect(() => {
        if (id) {
            setIsLoading(true);
            apiClient.get(`/appointments/${id}/`)
                .then(res => {
                    const appt = res.data;
                    setAppointment(appt);
                    setNotes(appt.notes || '');
                    
                    // Match Doctor
                    const doc = doctors.find(d => d.id === appt.doctor?.id) || {
                        id: appt.doctor?.id,
                        name: `Dr. ${appt.doctor?.full_name}`,
                        specialization: 'Staff Physician',
                        rating: 4.8,
                        clinics: 'General Ward',
                        availability: 'Scheduled'
                    };
                    setSelectedDoc(doc);

                    // Parse start_time to match AM/PM format
                    let parsedTime = appt.start_time;
                    if (parsedTime && !parsedTime.includes('AM') && !parsedTime.includes('PM')) {
                        const parts = parsedTime.split(':');
                        if (parts.length >= 2) {
                            let h = parseInt(parts[0], 10);
                            const ampm = h >= 12 ? 'PM' : 'AM';
                            h = h % 12 || 12;
                            parsedTime = `${h.toString().padStart(2, '0')}:${parts[1]} ${ampm}`;
                        }
                    } else if (parsedTime) {
                         // Clean up any extra seconds if present inside the parsed AM/PM format
                         const match = parsedTime.match(/(\d{2}:\d{2})(:\d{2})?\s?(AM|PM)/i);
                         if (match) {
                             parsedTime = `${match[1]} ${match[3].toUpperCase()}`;
                         }
                    }
                    setSelectedTime(parsedTime);

                    const p = patients.find(pat => pat.id === appt.patient?.id) || appt.patient;
                    setSelectedPatient(p);
                })
                .catch(err => console.error("Shard Retrieval Error:", err))
                .finally(() => setIsLoading(false));
        } else {
            setAppointment(null);
            setSelectedDoc(null);
            setSelectedPatient(null);
            setSelectedTime(null);
            setNotes('');
        }
    }, [id, doctors, patients]);

    const handleConfirm = async () => {
        if (!selectedDoc || !selectedTime || (!id && !selectedPatient)) return;
        
        setIsSaving(true);
        try {
            // Need to convert "10:15 AM" to server format (24H)
            let serverTime = selectedTime;
            if (serverTime.includes('AM') || serverTime.includes('PM')) {
                const [timePart, modifier] = serverTime.split(' ');
                let [hours, minutes] = timePart.split(':');
                if (hours === '12') {
                    hours = '00';
                }
                if (modifier === 'PM') {
                    hours = parseInt(hours, 10) + 12;
                }
                serverTime = `${hours.toString().padStart(2, '0')}:${minutes}:00`;
            }

            if (id) {
                // UPDATE logic
                await apiClient.patch(`/appointments/${id}/`, {
                    notes: notes,
                    start_time: serverTime
                });
            } else {
                // CREATE logic
                await apiClient.post('/appointments/', {
                    doctor_id: selectedDoc.id,
                    patient_id: selectedPatient.id,
                    appointment_date: new Date().toISOString().split('T')[0],
                    start_time: serverTime,
                    notes: notes
                });
            }
            setIsConfirmed(true);
            setTimeout(() => navigate('/admin/appointments'), 2000);
        } catch (err) {
            console.error("Clinical Write Error:", err);
            alert("Failed to synchronize appointment shard. Check connectivity.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isConfirmed) {
        return (
            <AdminPage className="min-h-[80vh] flex items-center justify-center">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`${UI_TOKENS.SHARD_BASE} text-center max-w-sm`}
                >
                    <div className="w-24 h-24 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <CheckCircle2 size={48} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-3">Slot Allocated!</h1>
                    <p className="text-sm text-slate-600 mb-2">Appointment with <strong className="text-slate-900">{selectedDoc?.name}</strong> successfully {id ? 'updated' : 'scheduled'}.</p>
                    <p className="text-[11px] text-slate-400 font-medium tracking-widest mt-4 uppercase">Redirecting to clinical schedule...</p>
                </motion.div>
            </AdminPage>
        );
    }

    return (
        <AdminPage className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                
                {/* ── Dashboard Header ── */}
                <header className={UI_TOKENS.HEADER}>
                    <div className={UI_TOKENS.HEADER_LEFT}>
                        <div className={UI_TOKENS.ICON_BOX}>
                            <Calendar size={20} />
                        </div>
                        <div>
                            <span className={UI_TOKENS.TEXT_SECONDARY}>
                                {id ? 'Detail Matrix' : 'Scheduler Matrix'}
                            </span>
                            <h1 className={`${UI_TOKENS.TEXT_PRIMARY} text-2xl mt-1`}>
                                {id ? 'Appointment Details' : 'Book Clinical Appointment'}
                            </h1>
                            <p className="text-sm text-slate-500 font-medium mt-1">
                                {id 
                                    ? `Reviewing encounter shard APP-${id.substring(0,6).toUpperCase()}` 
                                    : 'Provision time slots for patients across the practitioner network.'}
                            </p>
                        </div>
                    </div>
                    {id && appointment && (
                        <div className={UI_TOKENS.STATUS_NODE}>
                            <div className={appointment.status === 'confirmed' ? UI_TOKENS.PULSE_DOT : "w-2 h-2 rounded-full bg-amber-400"} />
                            <span className={UI_TOKENS.TEXT_SECONDARY}>{appointment.status_display}</span>
                        </div>
                    )}
                </header>

                <div className="grid grid-cols-12 gap-8 items-start">
                    
                    {/* ── Left Column: Configuration ── */}
                    <div className="col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
                        
                        {/* 📋 Patient Identity Selection or Display */}
                        <section className={UI_TOKENS.SHARD_BASE}>
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Users size={20} className="text-[#1a73e8]" />
                                Patient Identity
                            </h2>
                            
                            {id ? (
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-[#1a73e8] font-bold text-xl shrink-0">
                                        {selectedPatient?.full_name?.[0] || 'P'}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-base font-bold text-slate-900 truncate">{selectedPatient?.full_name}</p>
                                        <p className="text-sm text-slate-500 truncate">{selectedPatient?.email}</p>
                                    </div>
                                    <div className="ml-auto flex flex-col items-end gap-1 shrink-0">
                                        <span className={UI_TOKENS.TEXT_SECONDARY}>Registered Patient</span>
                                        <span className="text-xs font-bold text-slate-600 tabular-nums">{selectedPatient?.phone_number}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div className="relative">
                                        <select 
                                            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold focus:bg-white focus:border-[#1a73e8] focus:ring-4 focus:ring-[#1a73e8]/10 transition-all appearance-none cursor-pointer outline-none"
                                            onChange={(e) => {
                                                const p = patients.find(pat => pat.id === parseInt(e.target.value));
                                                setSelectedPatient(p);
                                            }}
                                            value={selectedPatient?.id || ''}
                                        >
                                            <option value="" disabled>Select Patient Identity...</option>
                                            {patients.map(p => (
                                                <option key={p.id} value={p.id}>{p.full_name} ({p.email})</option>
                                            ))}
                                        </select>
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                            <Users size={18} />
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium px-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                        Ensure identity verification is completed before allocating time slots.
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* 🩺 Staff Registry Grid */}
                        <section className={UI_TOKENS.SHARD_BASE}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                                    <Star size={20} className="text-[#1a73e8]" />
                                    Practitioner Network
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {doctors.map((doc) => (
                                    <motion.button
                                        key={doc.id}
                                        whileHover={!id ? { scale: 1.02 } : {}}
                                        onClick={() => !id && setSelectedDoc(doc)}
                                        disabled={id && selectedDoc?.id !== doc.id}
                                        className={`flex items-start gap-4 p-5 rounded-[20px] transition-all text-left bg-white
                                            ${selectedDoc?.id === doc.id 
                                                ? 'border-2 border-[#1a73e8] shadow-md shadow-blue-500/10' 
                                                : 'border border-slate-200 hover:border-[#1a73e8]/40 hover:shadow-sm'}
                                            ${id && selectedDoc?.id !== doc.id ? 'opacity-40 grayscale pointer-events-none' : ''}
                                        `}
                                    >
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${selectedDoc?.id === doc.id ? 'bg-[#1a73e8] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            <UserCircle2 size={28} strokeWidth={1.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="text-sm font-bold text-slate-900 truncate">{doc.name}</h3>
                                                <div className="flex items-center gap-1 shrink-0 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100 pr-2">
                                                    <Star size={10} className="fill-orange-400 text-orange-400" />
                                                    <span className="text-[10px] font-bold text-orange-700">{doc.rating}</span>
                                                </div>
                                            </div>
                                            <p className="text-[11px] font-bold text-[#1a73e8] uppercase tracking-widest leading-none mb-3">{doc.specialization}</p>
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <MapPin size={12} />
                                                    <span className="text-[11px] font-medium">{doc.clinics}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <Clock size={12} className={doc.availability === 'Available Today' ? 'text-green-500' : ''} />
                                                    <span className={`text-[11px] font-bold ${doc.availability === 'Available Today' ? 'text-green-600' : ''}`}>{doc.availability}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* ── Right Column: Scheduling & Notes ── */}
                    <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
                        
                        {/* Selector Pane */}
                        <div className={`${UI_TOKENS.SHARD_BASE} sticky top-8`}>
                            <AnimatePresence mode="wait">
                                {!selectedDoc ? (
                                    <motion.div 
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="py-16 flex flex-col items-center justify-center text-center gap-4"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                            <Users size={24} />
                                        </div>
                                        <p className="text-sm font-bold text-slate-900">Choose Practitioner</p>
                                        <p className="text-[12px] font-medium text-slate-500 leading-relaxed px-4">Select a lead from the network to view consultation windows.</p>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="selection"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col h-full"
                                    >
                                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1a73e8] flex items-center justify-center shrink-0">
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-bold text-slate-900">Allocation Details</h2>
                                                <p className="text-xs text-slate-500 font-medium">{id ? 'Review and update slot' : 'Configure time and notes'}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Time Selection */}
                                        <div className="mb-8">
                                            <div className="flex font-bold text-[11px] uppercase tracking-widest text-[#1a73e8] mb-4 gap-2 items-center">
                                                <Calendar size={14} />
                                                Encounter Window
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                {TIME_SLOTS.map((time) => {
                                                    // Ensure time comparison works even if formatting slightly diverges
                                                    const isSelected = selectedTime && (selectedTime === time || selectedTime.includes(time.substring(0, 5)));
                                                    return (
                                                        <button
                                                            key={time}
                                                            onClick={() => !id ? setSelectedTime(time) : null}
                                                            disabled={id && !isSelected}
                                                            className={`h-12 rounded-[16px] text-xs font-bold transition-all border
                                                                ${isSelected 
                                                                    ? 'bg-[#1a73e8] text-white border-[#1a73e8] shadow-md shadow-blue-500/20' 
                                                                    : 'bg-white border-slate-200 text-slate-700 hover:border-[#1a73e8] hover:text-[#1a73e8] hover:bg-blue-50'}
                                                                ${id && !isSelected ? 'opacity-30 grayscale cursor-not-allowed border-slate-100 bg-slate-50' : ''}
                                                            `}
                                                        >
                                                            {time}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            {(selectedTime && !TIME_SLOTS.includes(selectedTime) && TIME_SLOTS.every(ts => !selectedTime.includes(ts.substring(0,5)))) && (
                                                 <div className="mt-4 p-3 rounded-2xl bg-blue-50 border border-blue-100">
                                                     <p className="text-xs font-bold text-[#1a73e8] flex items-center justify-center gap-2">
                                                         <Clock size={12}/> Custom Time: {selectedTime}
                                                     </p>
                                                 </div>
                                            )}
                                        </div>

                                        {/* Clinical Notes */}
                                        <div className="mb-8">
                                            <div className="flex font-bold text-[11px] uppercase tracking-widest text-slate-400 mb-4 gap-2 items-center">
                                                <Filter size={14} />
                                                Encounter Metadata
                                            </div>
                                            <textarea 
                                                className="w-full h-32 p-5 rounded-[20px] bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:border-[#1a73e8] focus:ring-4 focus:ring-[#1a73e8]/10 resize-none transition-all outline-none text-slate-800 placeholder:text-slate-400"
                                                placeholder="Enter clinical symptoms or reason for scheduling..."
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                            />
                                        </div>

                                        {/* Final Action */}
                                        <button 
                                            onClick={handleConfirm}
                                            disabled={!selectedTime || isSaving || (!id && !selectedPatient)}
                                            className={`${CTA_THEMES.PRIMARY} w-full !rounded-[20px] !h-14 !text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                                        >
                                            {isSaving ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                                                    Syncing...
                                                </>
                                            ) : (
                                                id ? 'Update Shard' : 'Confirm Allocation'
                                            )}
                                        </button>
                                        
                                        {id && (
                                            <p className="mt-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">
                                                Created on {new Date(appointment?.created_at).toLocaleDateString()}
                                            </p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPage>
    );
}
