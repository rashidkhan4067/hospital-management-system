import React, { useState } from 'react';
import { 
    Download, 
    FileText, 
    Calendar, 
    BarChart4, 
    Table,
    FileSpreadsheet,
    FileJson,
    Database,
    Clock,
    User
} from 'lucide-react';
import { Button, Modal } from '@/components/primitives';

/**
 * 📊 Generate Report Modal
 * Simple form to download hospital data reports.
 */
export default function GenerateReportModal({ isOpen, onClose, onAction, isSubmitting }) {
    const [formData, setFormData] = useState({
        reportType: 'clinical',
        dateRange: 'last_30_days',
        format: 'pdf',
        includeAuditTrail: true
    });

    const reportTypes = [
        { id: 'clinical', label: 'Patient Visits', icon: BarChart4, description: 'Summary of daily patient visits and doctor sessions.' },
        { id: 'financial', label: 'Revenue Report', icon: Database, description: 'Summary of total earnings, bills, and payments.' },
        { id: 'inventory', label: 'Medicine & Stock', icon: Table, description: 'Current stock levels and pharmacy usage.' },
        { id: 'users', label: 'Staff & Activity', icon: User, description: 'Staff logins and system activity logs.' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onAction(formData);
    };

    const sidebar = (
        <div className="flex flex-col h-full">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary mb-6">Report Info</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <Download size={18} />
                </div>
                <div>
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">Ready to Export</p>
                    <p className="text-[8px] font-bold text-text-secondary uppercase mt-1 tracking-widest">Hospital System v3.0</p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Format</span>
                    <span className="text-[10px] font-black text-text-primary dark:text-white uppercase">{formData.format}</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Type</span>
                    <span className="text-[10px] font-black text-accent-primary uppercase">{formData.reportType}</span>
                </div>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-2 text-text-secondary/40 italic">
                <Clock size={12} />
                <span className="text-[8px] font-black uppercase tracking-widest">Time: {new Date().toLocaleTimeString()}</span>
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Download Report"
            subtitle="Export Hospital Data"
            icon={FileText}
            sidebar={sidebar}
            maxWidth="max-w-4xl"
        >
            <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* Report Type */}
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-1">Select Report Type</label>
                    <div className="grid grid-cols-2 gap-4">
                        {reportTypes.map((type) => (
                            <button
                                key={type.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, reportType: type.id })}
                                className={`flex items-start gap-4 p-6 rounded-3xl border-2 transition-all text-left group ${
                                    formData.reportType === type.id 
                                    ? 'bg-accent-primary/5 border-accent-primary shadow-xl shadow-accent-primary/10' 
                                    : 'bg-slate-50 dark:bg-black/20 border-slate-100 dark:border-white/5 hover:border-slate-200'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                    formData.reportType === type.id ? 'bg-accent-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-400'
                                }`}>
                                    <type.icon size={18} />
                                </div>
                                <div className="space-y-1 mt-0.5">
                                    <p className={`text-[12px] font-black uppercase italic ${formData.reportType === type.id ? 'text-accent-primary' : 'text-slate-900 dark:text-white'}`}>{type.label}</p>
                                    <p className="text-[9px] font-bold text-slate-400 tracking-tight leading-tight uppercase opacity-60">{type.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Date Range Selector */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-1">Date Range</label>
                        <div className="relative group">
                            <select
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 pl-14 rounded-3xl border border-slate-200 dark:border-white/5 text-[11px] font-black uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none cursor-pointer h-16"
                                value={formData.dateRange}
                                onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
                            >
                                <option value="today">Today</option>
                                <option value="last_7_days">Last 7 Days</option>
                                <option value="last_30_days">Last 30 Days</option>
                                <option value="quarterly">Last Quarter</option>
                            </select>
                            <Calendar size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors" />
                        </div>
                    </div>

                    {/* File Format Selection */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-1">File Format</label>
                        <div className="flex gap-4">
                            {[
                                { id: 'pdf', label: 'PDF', icon: FileText, color: 'rose' },
                                { id: 'excel', label: 'EXCEL', icon: FileSpreadsheet, color: 'emerald' },
                                { id: 'json', label: 'JSON', icon: FileJson, color: 'indigo' }
                            ].map(protocol => (
                                <button
                                    key={protocol.id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, format: protocol.id })}
                                    className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all ${
                                        formData.format === protocol.id 
                                        ? `bg-${protocol.color}-500/5 border-${protocol.color}-500 scale-105` 
                                        : 'bg-slate-50 dark:bg-black/20 border-slate-100 dark:border-white/5 hover:border-slate-200 opacity-60'
                                    }`}
                                >
                                    <protocol.icon size={20} className={formData.format === protocol.id ? `text-${protocol.color}-500` : 'text-slate-400'} />
                                    <span className={`text-[10px] font-black tracking-[0.3em] ${formData.format === protocol.id ? `text-${protocol.color}-500` : 'text-slate-400'}`}>{protocol.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-6 p-1 rounded-full bg-slate-200 dark:bg-white/10 relative transition-colors cursor-pointer ${formData.includeAuditTrail ? 'bg-accent-primary shadow-lg shadow-accent-primary/20' : ''}`}
                             onClick={() => setFormData({...formData, includeAuditTrail: !formData.includeAuditTrail})}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-all shadow-sm ${formData.includeAuditTrail ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 italic">Include System Audit</span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-none"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-accent-primary text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/25 border-none hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? 'Generating...' : 'Download Report'}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
