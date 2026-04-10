import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import AdminPage from '@/layouts/AdminPage';
import { PatientProvider, usePatientState } from '../context/PatientContext';
import { patientService } from '../api/patientService';

import PatientMasterList from '../components/PatientMasterList';
import PatientClinicalWorkspace from '../components/PatientClinicalWorkspace';

/**
 * 🛰️ PatientHub (EMR Senior Architect Spec)
 * Orchestrates a high-density Master-Detail workspace with full clinical telemetry.
 */
function PatientHubContent() {
  const [searchParams] = useSearchParams();
  const { setActivePatientId } = usePatientState();
  const [query, setQuery] = useState('');

  // 🏥 Clinical Registry Fetch (TanStack Query)
  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients', query],
    queryFn: () => patientService.fetchPatients({ query }),
  });

  // ⛓️ Deep-Link Synchronization
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) setActivePatientId(id);
  }, [searchParams, setActivePatientId]);

  return (
    <div className="flex h-[calc(100vh-140px)] w-full overflow-hidden bg-surface-bright/50 backdrop-blur-3xl border border-outline rounded-[32px] shadow-2xl transition-all">
      {/* 📋 Master Navigation Registry (Google Standard Density) */}
      <div className="w-[320px] h-full flex-shrink-0">
        <PatientMasterList 
            patients={patients || []} 
            isLoading={isLoading} 
            query={query} 
            setQuery={setQuery} 
        />
      </div>

      {/* 📟 Clinical Cockpit (Detail View) */}
      <div className="flex-1 h-full relative">
        {/* Subtle decorative background shard */}
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full -z-10" />
        <PatientClinicalWorkspace />
      </div>
    </div>
  );
}

export default function PatientsPage() {
    return (
        <AdminPage className="bg-surface">
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col gap-8 px-2"
            >
                {/* 📟 Unified Clinical Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                             <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-80">Clinical Registry Portal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tighter transition-colors">Electronic Records</h1>
                        <p className="text-sm font-medium text-text-sub mt-1">Manage global patient telemetry and clinical history across the hospital matrix.</p>
                    </div>

                    <div className="flex items-center gap-4 bg-surface-bright/80 backdrop-blur border border-outline px-5 py-3 rounded-[24px] shadow-sm">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-text-sub uppercase tracking-widest">Global Status</span>
                            <span className="text-[11px] font-bold text-success flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-success" /> System Nominal
                            </span>
                        </div>
                    </div>
                </div>

                <PatientProvider>
                    <PatientHubContent />
                </PatientProvider>
            </motion.div>
        </AdminPage>
    );
}
