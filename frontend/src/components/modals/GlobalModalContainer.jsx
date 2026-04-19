import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MaterialDialog from '@/components/primitives/MaterialDialog';
import { useModalStore } from '@/core/store/useModalStore';
import { useUIStore } from '@/core/store/useUIStore';
import api from '@/core/api/apiClient';
import { useDashboardData } from '@/features/core_management/dashboard/hooks/useDashboardData';
import { 
  UserPlus, CalendarPlus, BedDouble, ReceiptText, 
  Beaker, AlertCircle, X, ChevronRight, Loader2, CheckCircle2,
  Download
} from 'lucide-react';
import AddPatientForm from './forms/AddPatientForm';
import BookAppointmentForm from './forms/BookAppointmentForm';
import AdmitPatientForm from './forms/AdmitPatientForm';
import NewInvoiceForm from './forms/NewInvoiceForm';
import NewLabOrderForm from './forms/NewLabOrderForm';
import InvoiceReportView from './views/InvoiceReportView';
import AppointmentReceiptView from './views/AppointmentReceiptView';
import PatientAddSuccessView from './views/PatientAddSuccessView';
import AdmissionSummaryView from './views/AdmissionSummaryView';

const MODAL_REGISTRY = {
  'ADD_PATIENT': {
    title: 'Register patient',
    subtitle: 'Add a new patient to the clinical registry',
    icon: UserPlus,
    component: AddPatientForm,
    endpoint: 'patients/profiles/', 
    method: 'POST',
    submitLabel: 'Register patient',
    accent: '#0051d9'
  },
  'BOOK_APPOINTMENT': {
    title: 'Schedule appointment',
    subtitle: 'Book a clinical session for a patient',
    icon: CalendarPlus,
    component: BookAppointmentForm,
    endpoint: 'appointments/', 
    method: 'POST',
    submitLabel: 'Confirm booking'
  },
  'ADMIT_PATIENT': {
    title: 'Patient admission',
    subtitle: 'Admit patient to hospital services',
    icon: BedDouble,
    component: AdmitPatientForm,
    endpoint: 'wards/admissions/', 
    method: 'POST',
    submitLabel: 'Admit patient',
    accent: '#4f46e5'
  },
  'GENERATE_BILL': {
    title: 'Create invoice',
    subtitle: 'Generate a new billing record for patient',
    icon: ReceiptText,
    component: NewInvoiceForm,
    endpoint: 'finance/invoices/', 
    method: 'POST',
    submitLabel: 'Create invoice',
    maxWidth: 'sm:max-w-[580px]',
    accent: '#0051d9'
  },
  'NEW_INVOICE': {
    title: 'Create invoice',
    subtitle: 'Generate a new billing record for patient',
    icon: ReceiptText,
    component: NewInvoiceForm,
    endpoint: 'finance/invoices/', 
    method: 'POST',
    submitLabel: 'Create invoice',
    maxWidth: 'sm:max-w-[580px]',
    accent: '#0051d9'
  },
  'NEW_LAB_ORDER': {
    title: 'Lab Requisition',
    subtitle: 'Request diagnostic laboratory tests',
    icon: Beaker,
    component: NewLabOrderForm,
    endpoint: 'lab/orders/', 
    method: 'POST',
    submitLabel: 'Create Lab Order',
    maxWidth: 'sm:max-w-[560px]',
    accent: '#0051d9'
  },
  'LAB_ORDER': {
    title: 'Lab order',
    subtitle: 'Request a diagnostic laboratory test',
    icon: Beaker,
    component: NewLabOrderForm,
    endpoint: 'lab/orders/', 
    method: 'POST',
    submitLabel: 'Create order'
  },
  'INVOICE_REPORT': {
    title: 'Invoice report',
    subtitle: 'Official billing and payment record',
    icon: ReceiptText,
    component: InvoiceReportView,
    accent: '#0051d9',
    maxWidth: 'sm:max-w-[1000px]'
  }
};

export default function GlobalModalContainer() {
  const { activeModal, closeModal } = useModalStore();
  const addNotification = useUIStore((state) => state.addNotification);
  const { refetch } = useDashboardData();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formState, setFormState] = useState({
    isValid: false,
    data: {},
    title: '',
    subtitle: '',
    submitLabel: ''
  });

  // Atomic State Reset on Modal Type Transition
  useEffect(() => {
    if (activeModal?.type) {
      resetLocalState();
    }
  }, [activeModal?.type]);

  const resetLocalState = () => {
    setFormState({
      isValid: false,
      data: {},
      title: '',
      subtitle: '',
      submitLabel: ''
    });
    setFormErrors({});
    setSuccess(false);
    setSuccessData(null);
  };

  const handleFormStateChange = useCallback((state) => {
    setFormState(prev => {
      // Comparison logic to prevent unnecessary re-renders
      const isSame = prev.isValid === state.isValid && 
                     prev.submitLabel === state.submitLabel && 
                     prev.title === state.title &&
                     JSON.stringify(prev.data) === JSON.stringify(state.data);
      return isSame ? prev : { ...prev, ...state };
    });
  }, []);

  if (!activeModal) return null;

  const config = MODAL_REGISTRY[activeModal.type];
  if (!config) return null;

  const Icon = config.icon || AlertCircle;
  const FormComponent = config.component;

  const handleClose = () => {
    if (success) {
        closeModal();
        return;
    }
    const hasData = formState.data && Object.keys(formState.data).length > 0;
    if (hasData) {
      if (!window.confirm("Discard changes? Unsaved clinical data will be lost.")) return;
    }
    closeModal();
  };

  const handleRegistrySubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    // Check for internal form submission override (used by multi-step rapid forms)
    if (formState.onSubmit) {
      formState.onSubmit();
      return;
    }

    if (!formState.isValid || loading) return;

    setFormErrors({});
    setLoading(true);
    
    try {
      const response = await api({
          method: config.method,
          url: config.endpoint,
          data: formState.data
      });

      addNotification("Success", formState.successMessage || "Process completed successfully.", "success");
      
      if (refetch) refetch();
      setSuccessData(response.data);
      setSuccess(true);
      
      if (activeModal.props?.onSuccess) activeModal.props.onSuccess(response.data);
    } catch (err) {
      setFormErrors(err.response?.data || {});
      addNotification("Error", "Action failed. Please verify entries.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showHeader = !success || (activeModal.type !== 'BOOK_APPOINTMENT' && activeModal.type !== 'ADD_PATIENT' && activeModal.type !== 'ADMIT_PATIENT');

  return (
    <MaterialDialog 
      isOpen={!!activeModal} 
      onClose={handleClose} 
      maxWidth={config.maxWidth || "max-w-[560px]"}
      className="rounded-[24px] shadow-[0_24px_54px_rgba(0,0,0,0.15)] border-none bg-white p-0 overflow-hidden"
      title={
        showHeader && (
          <div className="flex items-center justify-between w-full p-5 pb-1 border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div 
                className="flex items-center justify-center w-11 h-11 rounded-xl shadow-inner border"
                style={{ 
                  background: `${config.accent || '#f8fafc'}1a`, 
                  color: config.accent || '#0f172a',
                  borderColor: `${config.accent || '#f8fafc'}26`
                }}
              >
                <Icon size={22} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                  <h1 className="font-sans text-[18px] font-bold text-slate-900 tracking-tight leading-none">
                      {formState.title || config.title}
                  </h1>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-1">
                      {formState.subtitle || config.subtitle}
                  </p>
              </div>
            </div>
            <button 
              type="button"
              onClick={handleClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all text-slate-300 hover:text-slate-900"
            >
              <X size={16} />
            </button>
        </div>
        )
      }
      footerActions={
        (success || formState.hideFooter) ? null : (
          <div className="flex items-center justify-between w-full px-6 py-3 bg-white border-t border-slate-100">
            <button 
              onClick={handleClose} 
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleRegistrySubmit} 
              disabled={!formState.isValid || loading}
              className={`
                  px-8 py-3 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 flex items-center gap-2
                  ${formState.isValid && !loading 
                      ? 'text-white shadow-lg' 
                      : 'bg-slate-50 text-slate-300 cursor-not-allowed shadow-none'
                  }
              `}
              style={{
                  backgroundColor: (formState.isValid && !loading) ? (config.accent || '#0f172a') : undefined,
                  boxShadow: (formState.isValid && !loading) ? `0 12px 24px -6px ${(config.accent || '#0f172a')}40` : undefined
              }}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <span>{formState.submitLabel || config.submitLabel}</span>
                  <ChevronRight size={16} strokeWidth={3} />
                </>
              )}
            </button>
          </div>
        )
      }
    >
      <div className="relative min-h-[250px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div 
                key="success-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
              {activeModal.type === 'BOOK_APPOINTMENT' && successData ? (
                <AppointmentReceiptView 
                  data={successData} 
                  onReset={resetLocalState}
                  onClose={closeModal}
                />
              ) : activeModal.type === 'ADD_PATIENT' && successData ? (
                <PatientAddSuccessView 
                  data={successData} 
                  onClose={closeModal} 
                />
              ) : activeModal.type === 'ADMIT_PATIENT' && successData ? (
                <AdmissionSummaryView 
                  data={successData} 
                  onClose={closeModal} 
                />
              ) : (
                <motion.div 
                  key="generic-success"
                  className="flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle2 size={40} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                    {formState.successMessage || "Action completed"}
                  </h2>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest max-w-[280px] leading-relaxed">
                    The clinical record has been updated and synchronized.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3 mt-10 w-full max-sm:w-full max-w-sm">
                    {(activeModal.type === 'NEW_INVOICE' || activeModal.type === 'GENERATE_BILL') && successData?.id && (
                      <button 
                        onClick={() => {
                            const id = successData.id;
                            closeModal();
                            setTimeout(() => useModalStore.getState().openModal('INVOICE_REPORT', { invoiceId: id }), 100);
                        }}
                        className="flex-1 w-full px-6 py-3 bg-blue-600 text-white rounded-xl text-[12px] font-bold uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Download size={16} />
                        View & Download
                      </button>
                    )}
                    <button 
                      onClick={closeModal}
                      className="flex-1 w-full px-6 py-3 bg-slate-900 text-white rounded-xl text-[12px] font-bold uppercase tracking-widest shadow-xl shadow-slate-100 hover:bg-black transition-all active:scale-95 flex items-center justify-center"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="form-entry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FormComponent 
                onFormStateChange={handleFormStateChange}
                formErrors={formErrors}
                {...activeModal.props} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MaterialDialog>
  );
}
