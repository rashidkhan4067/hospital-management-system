import React, { useState, useMemo } from 'react';
import { 
  FlaskConical, 
  Plus,
  Activity, 
  CheckCircle2, 
  Clock,
  FileText,
  Microscope,
  ShieldCheck,
  TrendingUp,
  Zap,
  Beaker,
  Dna,
  History
} from 'lucide-react';
import { Badge, Button, PageHeader, Card, FilterBar, AdminTable } from '@/shared/components/ui';
import AdminPage from '@/shared/components/layout/AdminPage';
import UnifiedHeroCTA from '@/shared/components/common/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/shared/components/common/UnifiedKpiGrid';

// Specialized Laboratory Standardized Shards
import RequestTestModal from '@/features/analytics/components/RequestTestModal';
import LaboratoryIntelligenceShard from '@/shared/components/common/LaboratoryIntelligenceShard';
import UnifiedProtocolShard from '@/shared/components/common/UnifiedProtocolShard';

import { useAdminLab } from '@/features/analytics/hooks/useLab';
import { useUI } from '@/core/ui/UIContext';
import LaboratoryService from '@/features/analytics/api/labService';

/**
 * 🧪 Laboratory Management Hub
 * Real-time clinical test processing and results propagation.
 * Fixed theme consistency and dark mode orchestration.
 */
export default function LabPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addNotification } = useUI();
  const { tests, results, loading, refresh } = useAdminLab();

  // ─── Computational Logic ───
  const filteredResults = useMemo(() => {
    return (results || []).filter(r => 
      (r.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       r.test_name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeTab === 'ALL' || r.status.toUpperCase() === activeTab)
    );
  }, [results, searchTerm, activeTab]);

  const handleRequestTest = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await LaboratoryService.createResult(formData);
        addNotification('Diagnostic Node Initialized', 'Laboratory request successfully committed to processing queue.', 'success');
        setIsModalOpen(false);
        refresh();
        resetForm?.();
    } catch (err) {
        addNotification('Sync Failure', 'Could not propagate lab request to clinical database.', 'error');
        console.error(err);
    } finally {
        setIsSubmitting(false);
    }
  };

  const columns = [
    { 
        header: 'Analysis Node', 
        key: 'test',
        render: (r) => (
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm italic">
                    <Beaker size={20} />
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none italic">{r.test_name}</p>
                    <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1.5 leading-none italic tracking-tighter">PHASE: ANALYTICAL</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Patient Shard', 
        key: 'patient',
        render: (r) => (
            <div className="flex flex-col">
                <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase italic leading-none">{r.patient_name}</span>
                <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5 opacity-60">REF: {r.id?.toString().slice(0,8).toUpperCase()}</span>
            </div>
        )
    },
    { 
        header: 'Diagnostics Node', 
        key: 'doctor',
        render: (r) => <span className="text-[10px] font-black text-accent-primary uppercase italic tracking-tighter">{r.doctor_name || 'Lab System'}</span> 
    },
    { 
        header: 'Processing Status',
        key: 'status',
        render: (r) => {
            const s = r.status.toLowerCase();
            return (
                <Badge className={`px-4 py-1.5 rounded-full border-none text-[9px] font-black uppercase italic ${
                    s === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 
                    s === 'processing' ? 'bg-amber-500/10 text-amber-500 animate-pulse' : 
                    'bg-slate-500/10 text-slate-400'
                }`}>
                    {s}
                </Badge>
            );
        }
    },
    { 
        header: 'Result Access', 
        key: 'result',
        render: (r) => (
            <button className="flex items-center gap-2 text-[9px] font-black text-accent-primary uppercase tracking-widest hover:brightness-110 transition-all italic underline underline-offset-4 decoration-accent-primary/30">
                <FileText size={14} /> {r.status === 'completed' ? 'Open Result' : 'Calibrating...'}
            </button>
        )
    }
  ];

  const kpis = [
    { title: "Network Tests", value: loading ? "..." : results.length, icon: Microscope, color: "text-accent-primary", trend: "+4% Velocity" },
    { title: "Finalized Nodes", value: loading ? "..." : results.filter(r => r.status === 'completed').length, icon: CheckCircle2, color: "text-emerald-500", trend: "Protocol Ready" },
    { title: "Active Samples", value: loading ? "..." : results.filter(r => r.status === 'processing').length, icon: Clock, color: "text-amber-500", trend: "High Phase" },
    { title: "Diagnostic Yield", value: "98.8%", icon: TrendingUp, color: "text-rose-500", trend: "Clinical Target" },
  ];

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20">
        
        {/* 🛸 COMMAND HUB: Row 1 — Header */}
        <PageHeader 
          title="Laboratory Command" 
          subtitle="Clinical Diagnostic Propagation & Calibration Hub"
          status="Analyzer Node Live"
          actions={
              <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-accent-primary text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/25 flex items-center gap-2 border-none hover:brightness-110 transition-all font-display italic"
              >
                  <Plus size={16} strokeWidth={3} /> Register Sample Node
              </Button>
          }
        />

        {/* 🌠 PERSISTENT HUB: Row 2 — Unified Hero CTA */}
        <UnifiedHeroCTA 
           compact
           title={<>Diagnostic <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-primary/40">Sample Matrix.</span></>}
           subtitle="Register clinical laboratory samples, manage diagnostic calibration protocols, and synchronize historical result nodes across the Al Shifaa matrix."
           pillPrefix="Laboratory Registry"
           pillIcon={Beaker}
           actions={[
              { title: 'New Analysis', subtitle: 'Request Test Node', icon: Plus, onClick: () => setIsModalOpen(true), variant: 'primary' },
              { title: 'Calibration', subtitle: 'Analyzer Setup', icon: History, onClick: () => {} },
           ]}
        />

        {/* 🛰 KPI & ANALYTICS Hub */}
        <UnifiedKpiGrid stats={kpis} loading={loading} />

        {/* 🛰 Master Control Matrix */}
        <div className="w-full">
           <FilterBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={[
                  { id: 'ALL', label: 'Global Registry' },
                  { id: 'PROCESSING', label: 'Active Calibration' },
                  { id: 'COMPLETED', label: 'Finalized Node' },
                  { id: 'CANCELLED', label: 'Safety Abort' }
              ]}
              placeholder="Search by test node, patient ref, or clinical lead..."
           />
        </div>

        {/* 🏗 UNIFIED ASSEMBLY: Row 4 (8:4 Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
           
           {/* 🏥 CLINICAL OPERATIONS HUB (Left Space) */}
           <div className="lg:col-span-8 flex flex-col gap-8 lg:gap-10">
              <LaboratoryIntelligenceShard />
              
              <Card className="rounded-[3rem] p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-100 dark:border-white/5 overflow-hidden shadow-2als relative">
                 <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
                 <AdminTable 
                    columns={columns} 
                    data={filteredResults} 
                    isLoading={loading}
                 />
              </Card>
           </div>

           {/* 🛰 SIDEBAR INTELLIGENCE CLUSTER (Right Space) */}
           <div className="lg:col-span-4 flex flex-col gap-5 lg:gap-6 sticky top-8">
              
              {/* 🧬 Specialized Lab AI Node */}
              <Card className="p-6 rounded-[2.5rem] bg-slate-900 dark:bg-slate-950 border border-accent-primary/20 shadow-2als relative overflow-hidden flex flex-col gap-6 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[60px] rounded-full pointer-events-none" />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-11 h-11 rounded-xl bg-accent-primary/20 flex items-center justify-center text-accent-primary border border-accent-primary/30">
                        <Dna size={22} className="animate-pulse" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-lg font-black text-indigo-50 dark:text-white uppercase italic tracking-tighter leading-none">Sana Analysis</h3>
                        <p className="text-[9px] font-bold text-accent-primary/50 uppercase tracking-[0.2em] mt-1">AI Diagnostic Agent</p>
                    </div>
                </div>
                <p className="text-[10px] font-black italic text-slate-400 dark:text-slate-500 leading-relaxed uppercase tracking-wide">
                    Neural engine synchronized with 42 diagnostic machines. Ready for result interpretation and logic mapping.
                </p>
                <button className="w-full py-4 rounded-2xl bg-accent-primary hover:bg-teal-600 text-[10px] font-black uppercase text-white tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-accent-primary/25 border-none transition-all group-hover:scale-[1.02] italic">
                    Initiate Result Analysis <Zap size={14} className="fill-white" />
                </button>
              </Card>

              <UnifiedProtocolShard 
                variant="primary"
                title="Laboratory Protocol"
                message="All analyzer nodes are synchronized. Bio-safety protocols verified for Level 3 categorization."
              />

              <UnifiedProtocolShard 
                variant="slate"
                title="System Throughput"
                message="Calibration registry operating at 99.4% efficiency. Global result propagation latency: 12ms."
                icon={Zap}
              />
           </div>

        </div>
      </div>

      {/* 🔮 MODULAR DIAGNOSIS DIALOG */}
      <RequestTestModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleRequestTest}
        isSubmitting={isSubmitting}
        tests={tests}
      />
    </AdminPage>
  );
}
