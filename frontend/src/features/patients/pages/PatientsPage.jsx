import React, { useState, useMemo, useCallback } from 'react';
import {
  Eye,
  ShieldPlus,
  Calendar,
  Trash2,
  Activity,
  UserPlus,
  Users,
  Heart,
} from 'lucide-react';
import { Badge, Button, TableActions, PageHeader, FilterBar } from '@/components/primitives';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminTable from '@/components/primitives/AdminTable';
import AdminPage from '@/layouts/AdminPage';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';

// Modularized Clinical Components
import PatientTable from '../components/list/PatientTable';
import PatientStatsRow from '../components/list/PatientStatsRow';
import AddPatientModal from '../components/list/AddPatientModal';
import EditPatientModal from '../components/emr/modals/EditPatientModal';

// Modals & Identity
import DeleteConfirmModal from '@/features/identity/components/DeleteConfirmModal';
import UserService from '@/features/identity/api/userService';
import { useNotifications } from '@/hooks/useNotifications';

// Data Hooks
import { useAdminPatients } from '@/features/patients/hooks/usePatients';
import { useAdminStats } from '@/features/dashboard/hooks/useStats';

/**
 * 🩺 Patient Registry Command Center
 * Full patient list with CTA hero, KPI strip, search, and action table.
 */
export default function AdminPatients({ autoOpenAdd = false }) {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL State Nodes - Single Source of Truth
  const searchTerm = searchParams.get('q') || '';
  const viewParam = searchParams.get('view')?.toUpperCase();
  const isAdmittedParam = searchParams.get('is_admitted');
  
  // Resolve activeTab from multiple possible source params
  let activeTab = 'ALL';
  if (viewParam === 'QUEUE') activeTab = 'QUEUE';
  else if (viewParam === 'ADMISSIONS' || viewParam === 'ADMITTED' || isAdmittedParam === 'true') activeTab = 'ADMITTED';
  else if (viewParam === 'OUTPATIENTS' || viewParam === 'STABLE') activeTab = 'STABLE';

  // Reactive Setters (URL Driven)
  const setSearchTerm = (val) => {
    setSearchParams(prev => {
      if (val) prev.set('q', val); else prev.delete('q');
      return prev;
    }, { replace: true });
  };

  const setActiveTab = (val) => {
    setSearchParams(prev => {
      if (val === 'ALL') {
         prev.delete('view');
         prev.delete('is_admitted');
      } else if (val === 'ADMITTED') {
         prev.set('is_admitted', 'true');
         prev.delete('view');
      } else {
         prev.set('view', val.toLowerCase());
         prev.delete('is_admitted');
      }
      return prev;
    }, { replace: true });
  };

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(autoOpenAdd);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data - Mapping internal activeTab to Backend Registry Keys
  const fetchFilters = {};
  if (activeTab === 'ADMITTED') fetchFilters.is_admitted = 'true';
  if (searchTerm) fetchFilters.search = searchTerm;

  const { patients, loading: patientsLoading, refresh } = useAdminPatients(fetchFilters);
  const { stats: statsSummary, loading: statsLoading } = useAdminStats();
  const loading = patientsLoading || statsLoading;

  // Derived stats
  const totalPatients = statsSummary?.counts?.patients ?? patients.length;
  const admitted = statsSummary?.counts?.active_admissions ?? patients.filter((p) => p.is_admitted).length;
  const newPatients = patients.length > 5 ? 5 : patients.length;

  // Handlers
  const handleDelete = useCallback(
    async (patient) => {
      setIsSubmitting(true);
      try {
        await UserService.delete(patient.id);
        addNotification('Patient Deleted', 'Patient record has been removed.', 'success');
        setIsDeleteModalOpen(false);
        refresh();
      } catch {
        addNotification('Error', 'Failed to delete record.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    },
    [refresh, addNotification]
  );

  const openDelete = useCallback((patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  }, []);

  const openEdit = (patient) => {
     setSelectedPatient(patient);
     setIsEditModalOpen(true);
  };

  const openRecord = (patient) => {
     navigate(`/admin/patients/${patient.id}`);
  };  // Filtered list
  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchesSearch =
        p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id?.toString().includes(searchTerm) ||
        p.phone?.includes(searchTerm);

      if (activeTab === 'ADMITTED') return matchesSearch && p.is_admitted;
      if (activeTab === 'STABLE' || activeTab === 'QUEUE') return matchesSearch && !p.is_admitted;
      return matchesSearch;
    });
  }, [patients, searchTerm, activeTab]);

  return (
    <AdminPage>
      {/* ── Proper Modular Header ── */}
      <PageHeader 
        title="Patient Registry" 
        subtitle="Clinical Identity Matrix Synchronized"
        status="Live Records"
        actions={
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-primary/90 hover:scale-105 transition-all shadow-lg shadow-accent-primary/25 border-none"
          >
            <UserPlus size={16} strokeWidth={3} /> Add Patient Shard
          </Button>
        }
      />

      {/* ── Unified Hero CTA ── */}
      <UnifiedHeroCTA 
        compact
        title={<>Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Command Center.</span></>}
        subtitle={`Currently tracking ${totalPatients} registered patients with ${admitted} actively admitted nodes.`}
        pillPrefix="Clinical Patient Registry"
        pillIcon={Users}
        actions={[
          { title: 'New Intake', subtitle: 'Register Patient', icon: UserPlus, onClick: () => setIsAddModalOpen(true) },
          { title: 'Live Admissions', subtitle: `${admitted} Admitted Now`, icon: Activity, onClick: () => setActiveTab('ADMITTED') }
        ]}
      />

      {/* ── Patient Stats Matrix (Blueprint Alignment) ── */}
      <PatientStatsRow 
         total={totalPatients} 
         newThisMonth={newPatients} 
         activeToday={admitted} 
         loading={loading} 
       />

      {/* ── Integrated Commands ── */}
      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        placeholder="Search patient name, ID, phone..."
        tabs={[
          { id: 'ALL',      label: 'All Patients' },
          { id: 'STABLE',   label: 'Outpatients' },
          { id: 'ADMITTED', label: 'Admitted' },
        ]}
      />
      {/* ── Primary Data Matrix (Blueprint Alignment) ── */}
      <PatientTable
        data={filteredPatients}
        isLoading={loading}
        onRowClick={openRecord}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      {/* ── Specialized Modals ── */}
      <AddPatientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onRefresh={refresh}
      />
      <EditPatientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patientId={selectedPatient?.id}
        initialData={selectedPatient}
        onRefresh={refresh}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onAction={handleDelete}
        isSubmitting={isSubmitting}
        item={selectedPatient}
        title="Delete Patient Record"
      />
    </AdminPage>
  );
}
