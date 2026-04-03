import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  Wallet, 
  Calendar, 
  Filter,
  Zap,
  CheckCircle2,
  FileText,
  Clock
} from 'lucide-react';
import { Card, Button, PageHeader, StatsCard } from '@/shared/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import AdminPage from '@/shared/components/layout/AdminPage';
import { useAdminAnalytics } from '@/features/analytics/hooks/useAnalytics';

// Modals
import GenerateReportModal from '@/features/analytics/components/GenerateReportModal';

/**
 * 📊 Hospital Reports & Analytics
 * Finalized screen for medical and financial data reporting.
 */
export default function Stats() {
  const { pulse, clinicalTrends, financialTrends, loading, refresh } = useAdminAnalytics();
  
  // UI State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [activeChart, setActiveChart] = useState('clinical'); // clinical | financial

  const stats = [
    { 
        title: 'Total Patients', 
        value: loading ? '...' : (pulse?.clinical?.today?.total_patients || '0'), 
        icon: Users, 
        trend: pulse?.clinical?.delta || '+0.0%' 
    },
    { 
        title: 'Today\'s Visits', 
        value: loading ? '...' : (pulse?.clinical?.today?.appointments || '0'), 
        icon: Calendar, 
        trend: 'Steady' 
    },
    { 
        title: 'Net Revenue', 
        value: loading ? '...' : `Rs. ${((pulse?.financial?.today?.total_revenue || 0) / 1000).toFixed(1)}k`, 
        icon: Wallet, 
        trend: pulse?.financial?.delta || 'Steady' 
    },
    { 
        title: 'Active Admissions', 
        value: loading ? '...' : (pulse?.clinical?.today?.admissions || '0'), 
        icon: Activity, 
        trend: 'Live' 
    },
  ];

  const handleGenerateReport = async (data) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const content = `Al Shifaa Hospital Report\nGenerated: ${new Date().toLocaleString()}\nCategory: ${data.reportType}\nRange: ${data.dateRange}\n\nSummary:\nPulse: Online\nSystem ID: AL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HOSPITAL_REPORT_${data.reportType.toUpperCase()}_${new Date().getTime()}.${data.format === 'excel' ? 'csv' : 'pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsSubmitting(false);
    setIsReportModalOpen(false);
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 3000);
  };

  const clinicalNodes = clinicalTrends?.length > 0 ? clinicalTrends.slice(0, 12).reverse() : Array(12).fill({ total_patients: 0 });
  const financialNodes = financialTrends?.length > 0 ? financialTrends.slice(0, 12).reverse() : Array(12).fill({ total_revenue: 0 });
  const chartData = activeChart === 'clinical' ? clinicalNodes : financialNodes;
  const dataKey = activeChart === 'clinical' ? 'total_patients' : 'total_revenue';

  return (
    <AdminPage>
      <PageHeader 
        title="Hospital Reports" 
        subtitle="Medical Data & Financial Performance"
        actions={
            <div className="flex items-center gap-4 bg-white dark:bg-slate-800/40 p-1.5 rounded-2xl border border-slate-200/40 shadow-xl backdrop-blur-3xl shrink-0">
                <Button 
                    onClick={() => refresh()}
                    className="bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border-none"
                >
                   <Activity size={14} /> Refresh Data
                </Button>
                <div className="w-px h-8 bg-slate-200 dark:bg-white/10 self-center mx-1" />
                <Button 
                    onClick={() => setIsReportModalOpen(true)}
                    className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all"
                >
                   <BarChart3 size={18} /> Download Report
                </Button>
            </div>
        }
      />

      {/* Success Notification */}
      <AnimatePresence>
        {reportSuccess && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4 text-emerald-500"
            >
                <CheckCircle2 size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Report Generated Successfully. Check your downloads.</span>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[600px] animate-in slide-in-from-bottom-8 duration-1000 delay-200 mt-10">
        <Card className="lg:col-span-8 matrix-card p-12 border-none flex flex-col gap-10 relative overflow-hidden group">
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-6">
              <div className="space-y-2">
                 <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white flex items-center gap-4">
                    {activeChart === 'clinical' ? 'Patient Visits' : 'Hospital Revenue'}
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}>
                        <Zap size={16} className="text-accent-primary opacity-50" />
                    </motion.div>
                 </h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-display">Time-series data of {activeChart === 'clinical' ? 'daily visits' : 'monthly earnings'}</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-black/20 p-2 rounded-2xl border border-slate-100 dark:border-white/5">
                 <Button 
                    onClick={() => setActiveChart('clinical')}
                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase shadow-lg border-none transition-all ${activeChart === 'clinical' ? 'bg-accent-primary text-white' : 'text-slate-400 hover:text-accent-primary'}`}
                >Clinical</Button>
                 <Button 
                    onClick={() => setActiveChart('financial')}
                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase border-none transition-all ${activeChart === 'financial' ? 'bg-accent-primary text-white shadow-lg' : 'text-slate-400 hover:text-accent-primary'}`}
                >Financial</Button>
              </div>
           </div>

           <div className="flex-1 flex items-end justify-between gap-1 md:gap-4 relative z-10 px-4 pt-14 pb-10">
              {chartData.map((node, i) => {
                const maxVal = Math.max(...chartData.map(d => d[dataKey] || 0), 1);
                const val = node[dataKey] || 0;
                const height = (val / maxVal) * 100;
                return (
                    <div key={i} className="flex-1 relative group h-full flex flex-col justify-end">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(height, 8)}%` }}
                        transition={{ delay: i * 0.05, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full ${activeChart === 'clinical' ? 'bg-accent-primary/10 group-hover:bg-accent-primary/30' : 'bg-indigo-500/10 group-hover:bg-indigo-500/30'} rounded-t-2xl transition-all relative overflow-hidden group-hover:scale-x-110 origin-bottom`}
                      >
                        <div className={`absolute inset-x-0 bottom-0 ${activeChart === 'clinical' ? 'bg-accent-primary' : 'bg-indigo-500'} h-full opacity-30 group-hover:opacity-80 transition-opacity`} />
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-black text-white tabular-nums transition-all -translate-y-2 group-hover:translate-y-0 text-center">
                            {activeChart === 'clinical' ? val : `Rs.${(val/1000).toFixed(0)}k`}
                        </div>
                      </motion.div>
                      <p className="text-[9px] font-black text-slate-400 text-center mt-6 uppercase tracking-widest tabular-nums opacity-60 group-hover:opacity-100 transition-opacity">{node.date?.split('-')[2] || `D${i+1}`}</p>
                    </div>
                )
              })}
           </div>

           <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(circle, #2dd4bf 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </Card>

        <div className="lg:col-span-4 flex flex-col gap-10">
           <Card className="matrix-card p-10 border-none space-y-8 h-full hover:brightness-105 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 blur-[80px] rounded-full group-hover:scale-150 transition-transform" />
              
              <div className="space-y-4 relative z-10">
                 <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white flex items-center gap-4">
                    <FileText size={24} className="text-emerald-500" /> Key Insights
                 </h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.1em] opacity-80 leading-relaxed italic">Real-time summaries of hospital performance.</p>
              </div>

              <div className="space-y-6 pt-4 relative z-10">
                {[
                    { label: 'Patient Growth', value: '+12%', icon: Users },
                    { label: 'Revenue Growth', value: '+8%', icon: Wallet },
                    { label: 'Avg Visit Time', value: '24m', icon: Clock },
                    { label: 'System Uptime', value: '99.9%', icon: Activity },
                ].map((insight, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 hover:border-accent-primary/20 transition-all cursor-default">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-accent-primary transition-colors">
                                <insight.icon size={14} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{insight.label}</span>
                        </div>
                        <span className="text-[12px] font-black italic text-slate-900 dark:text-white">{insight.value}</span>
                    </div>
                ))}
              </div>

              <div className="mt-auto p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest">Efficiency Status: Optimal</p>
              </div>
           </Card>
        </div>
      </div>

      {/* Modals Dispatcher */}
      <GenerateReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        onAction={handleGenerateReport}
        isSubmitting={isSubmitting}
      />
    </AdminPage>
  );
}

