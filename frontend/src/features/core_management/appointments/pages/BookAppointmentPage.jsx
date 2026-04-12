import React, { useState } from 'react';
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
import { useEffect } from 'react';

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
                    setSelectedTime(appt.start_time?.substring(0, 5));
                    setSelectedPatient(appt.patient);
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
    }, [id, doctors]);

    const handleConfirm = async () => {
        if (!selectedDoc || !selectedTime || (!id && !selectedPatient)) return;
        
        setIsSaving(true);
        try {
            if (id) {
                // UPDATE logic
                await apiClient.patch(`/appointments/${id}/`, {
                    notes: notes
                });
            } else {
                // CREATE logic
                await apiClient.post('/appointments/', {
                    doctor_id: selectedDoc.id,
                    patient_id: selectedPatient.id,
                    appointment_date: new Date().toISOString().split('T')[0],
                    start_time: selectedTime,
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
                    className="bg-surface-bright p-12 rounded-[48px] elev-3 border border-outline-variant text-center max-w-sm"
                >
                    <div className="w-24 h-24 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <CheckCircle2 size={48} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-2xl font-bold text-text-main mb-3">Slot Allocated!</h1>
                    <p className="text-sm text-text-sub mb-2">Appointment with <strong>{selectedDoc?.name}</strong> successfully scheduled.</p>
                    <p className="text-[11px] text-text-sub opacity-50">Redirecting to clinical schedule...</p>
                </motion.div>
            </AdminPage>
        );
    }

    return (
        <AdminPage className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                
                {/* ── Dashboard Header ── */}
                <header className="mb-12">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <Calendar size={18} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                            {id ? 'Detail Matrix' : 'Scheduler Matrix'}
                        </span>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <h1 className="text-4xl font-black text-text-main tracking-tight mb-2">
                                {id ? 'Appointment Details' : 'Book Clinical Appointment'}
                            </h1>
                            <p className="text-text-sub font-medium opacity-60">
                                {id 
                                    ? `Reviewing encounter shard APP-${id.substring(0,6).toUpperCase()}` 
                                    : 'Provision time slots for patients across the practitioner network.'}
                            </p>
                        </div>
                        {id && appointment && (
                            <div className={`m3-pill font-bold py-1.5 px-4 text-[10px] uppercase tracking-widest
                                ${appointment.status === 'confirmed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}
                            `}>
                                Status: {appointment.status_display}
                            </div>
                        )}
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8 items-start">
                    
                    {/* ── Left Column: Configuration ── */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                        
                        {/* 📋 Patient Identity Selection or Display */}
                        <section className="bg-surface-bright border border-outline-variant rounded-[40px] p-8 elev-1">
                            <h2 className="text-lg font-bold text-text-main mb-6 flex items-center gap-3">
                                <Users size={20} className="text-primary" />
                                Patient Identity
                            </h2>
                            
                            {id ? (
                                <div className="flex items-center gap-4 p-4 bg-surface-variant/30 rounded-3xl border border-outline-variant/30">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                        {selectedPatient?.full_name?.[0] || 'P'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-main">{selectedPatient?.full_name}</p>
                                        <p className="text-[11px] text-text-sub opacity-60">{selectedPatient?.email}</p>
                                    </div>
                                    <div className="ml-auto flex flex-col items-end gap-1">
                                        <span className="text-[9px] font-bold text-primary uppercase tracking-tighter">Registered Patient</span>
                                        <span className="text-[10px] tabular text-text-sub">{selectedPatient?.phone_number}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <select 
                                        className="w-full h-14 px-6 rounded-2xl bg-surface-variant/30 border border-outline-variant/30 outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all"
                                        onChange={(e) => {
                                            const p = patients.find(pat => pat.id === parseInt(e.target.value));
                                            setSelectedPatient(p);
                                        }}
                                        value={selectedPatient?.id || ''}
                                    >
                                        <option value="">Select Patient Identity...</option>
                                        {patients.map(p => (
                                            <option key={p.id} value={p.id}>{p.full_name} ({p.email})</option>
                                        ))}
                                    </select>
                                    <p className="text-[10px] text-text-sub italic px-2">Ensure identity verification is completed before allocating time slots.</p>
                                </div>
                            )}
                        </section>

                        {/* 🩺 Staff Registry Grid */}
                        <section>
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h2 className="text-lg font-bold text-text-main flex items-center gap-3">
                                    <Star size={20} className="text-primary" />
                                    Practitioner Network
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {doctors.map((doc) => (
                                    <motion.button
                                        key={doc.id}
                                        whileHover={!id ? { y: -4 } : {}}
                                        onClick={() => !id && setSelectedDoc(doc)}
                                        disabled={id && selectedDoc?.id !== doc.id}
                                        className={`flex items-start gap-4 p-5 rounded-[32px] border text-left transition-all group
                                            ${selectedDoc?.id === doc.id ? 'bg-primary-container border-primary elev-2' : 'bg-surface-bright border-outline-variant hover:border-primary/40'}
                                            ${id && selectedDoc?.id !== doc.id ? 'opacity-30 grayscale blur-[1px]' : ''}
                                        `}
                                    >
                                    <div className="w-16 h-16 rounded-[20px] bg-surface-variant flex items-center justify-center text-text-sub overflow-hidden relative">
                                        <UserCircle2 size={40} strokeWidth={1} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-sm font-bold text-text-main truncate">{doc.name}</h3>
                                            <div className="flex items-center gap-1">
                                                <Star size={10} className="fill-warning text-warning" />
                                                <span className="text-[10px] font-bold text-text-main">{doc.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-[11px] font-medium text-primary mb-3">{doc.specialization}</p>
                                        <div className="flex flex-col gap-1.5 opacity-60">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={10} />
                                                <span className="text-[10px] font-medium">{doc.clinics}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={10} />
                                                <span className="text-[10px] font-bold">{doc.availability}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                            </div>
                        </section>
                    </div>

                    {/* ── Right Column: Scheduling & Notes ── */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                        
                        {/* Selector Pane */}
                        <div className="bg-surface-bright border border-outline-variant rounded-[40px] p-8 md:p-10 elev-2 sticky top-8">
                            <AnimatePresence mode="wait">
                                {!selectedDoc ? (
                                    <motion.div 
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="py-12 flex flex-col items-center justify-center text-center gap-4"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center text-text-sub animate-pulse">
                                            <Users size={24} />
                                        </div>
                                        <p className="text-sm font-bold text-text-main">Choose Practitioner</p>
                                        <p className="text-[11px] text-text-sub leading-relaxed">Select a lead from the network to view consultation windows.</p>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="selection"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col h-full"
                                    >
                                        <h2 className="text-xl font-bold text-text-main mb-6">Allocation Details</h2>
                                        
                                        {/* Time Selection */}
                                        <div className="flex font-bold text-[10px] uppercase tracking-widest text-text-sub mb-3 gap-2 px-1">
                                            <Clock size={12} className="text-primary" />
                                            Encounter Window
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mb-8">
                                            {TIME_SLOTS.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => !id && setSelectedTime(time)}
                                                    disabled={id && selectedTime !== time}
                                                    className={`h-11 rounded-xl text-[10px] font-bold transition-all border
                                                        ${selectedTime === time ? 'bg-primary text-white border-primary elev-2' : 'bg-surface-bright border-outline-variant hover:border-primary/40 text-text-main'}
                                                        ${id && selectedTime !== time ? 'opacity-40 grayscale' : ''}
                                                    `}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Clinical Notes */}
                                        <div className="mb-8">
                                            <div className="flex font-bold text-[10px] uppercase tracking-widest text-text-sub mb-3 gap-2 px-1">
                                                <Filter size={12} className="text-primary" />
                                                Encounter Metadata
                                            </div>
                                            <textarea 
                                                className="w-full h-32 p-4 rounded-2xl bg-surface-variant/30 border border-outline-variant/30 text-[12px] font-medium outline-none focus:ring-2 focus:ring-primary/20 resize-none transition-all"
                                                placeholder="Enter clinical symptoms or reason for scheduling..."
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                            />
                                        </div>

                                        {/* Final Action */}
                                        <button 
                                            onClick={handleConfirm}
                                            disabled={!selectedTime || isSaving || (!id && !selectedPatient)}
                                            className="w-full h-14 bg-primary text-white rounded-[24px] font-bold text-sm elev-2 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Syncing...
                                                </>
                                            ) : (
                                                id ? 'Update Shard' : 'Confirm Allocation'
                                            )}
                                        </button>
                                        
                                        {id && (
                                            <p className="mt-4 text-[10px] text-text-sub text-center opacity-60">Created on {new Date(appointment?.created_at).toLocaleDateString()}</p>
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
