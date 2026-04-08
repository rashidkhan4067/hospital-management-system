import React, { useEffect, useState } from 'react';
import { 
  ChevronLeft, 
  Package, 
  RefreshCw, 
  Box,
  AlertTriangle,
  History,
  DollarSign,
  Edit2,
  Trash2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader, Button, Card, Badge } from '@/components/primitives';
import { motion } from 'framer-motion';
import { inventoryService } from '@/features/analytics/api/inventoryService';
import { useNotifications } from '@/hooks/useNotifications';

/**
 * 📦 Medicine Detail Page
 * Provides a comprehensive view of stock levels, price, and transaction history.
 */
export default function MedicineRecord() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addNotification } = useNotifications();
  
  const [item, setItem] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await inventoryService.getById(id);
        const itemLogs = await inventoryService.getLogs(id);
        setItem({
            ...data,
            name: data.name || 'Anonymous Item',
            sku: data.sku || 'SKU-0000',
            current: data.current_stock || 0,
            min: data.min_stock_level || 10,
            status: data.status || 'stable',
            category: data.category_display || 'Uncategorized',
            price: data.unit_price || 0,
            unit: data.unit_display || 'Units'
        });
        setLogs(itemLogs || []);
      } catch (err) {
        addNotification('Error', 'Failed to load item details.', 'error');
        console.error("Fetch item error:", err);
        setItem({
            name: 'Item Not Found',
            sku: 'ERROR',
            current: 0,
            min: 0,
            status: 'error',
            category: '--',
            price: 0,
            unit: 'Units'
        });
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id, navigate, addNotification]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to remove ${item.name}?`)) {
        try {
            await inventoryService.delete(id);
            addNotification('Item Removed', 'Medicine record deleted successfully.', 'success');
            navigate('/admin/inventory');
        } catch (error) {
            addNotification('Error', 'Could not delete item.', 'error');
        }
    }
  };

  if (loading) return (
     <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
     </div>
  );

  if (!item) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title={`Medicine: ${item.name}`}
        subtitle={`SKU: ${item.sku} • Stock Detail Overview`}
        actions={
          <div className="flex items-center gap-3">
             <Button 
                onClick={() => navigate('/admin/inventory')}
                className="bg-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 border-none text-[9px] font-black uppercase tracking-widest"
              >
                <ChevronLeft size={14} /> Back to Stock
              </Button>
              <Button className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none">
                <Edit2 size={12} /> Edit Details
              </Button>
              <Button onClick={handleDelete} className="bg-rose-500/10 text-rose-500 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border-none">
                <Trash2 size={12} /> Remove Item
              </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Medicine Stats */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="p-8 bg-white dark:bg-slate-900 border-none rounded-[40px] shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-bl-full" />
             
             <div className="flex flex-col items-center text-center space-y-4 mb-8 text-accent-primary">
                <div className={`p-6 rounded-[32px] ${item.status === 'stable' ? 'bg-accent-primary/10' : 'bg-rose-500/10 text-rose-500'} shadow-inner`}>
                  <Box size={48} />
                </div>
                <div>
                   <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{item.name}</h2>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-2">{item.category}</p>
                </div>
             </div>

             <div className="space-y-4 pt-8 border-t border-slate-100 dark:border-white/5">
                <DetailRow icon={<DollarSign size={14}/>} label="Unit Price" value={`Rs. ${item.price}`} />
                <DetailRow icon={<Package size={14}/>} label="Current Stock" value={`${item.current} ${item.unit}`} />
                <DetailRow icon={<AlertTriangle size={14}/>} label="Min Level" value={`${item.min} ${item.unit}`} />
                <DetailRow icon={<RefreshCw size={14}/>} label="Status" value={item.status} valueClass={item.status === 'stable' ? "text-emerald-500" : "text-rose-500"} />
             </div>
          </Card>

          <Card className="p-8 bg-slate-50 dark:bg-black/20 border-none rounded-[40px] flex flex-col items-center gap-6">
             <div className="w-48 h-48 rounded-full border-[12px] border-slate-100 dark:border-white/5 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-[12px] border-accent-primary border-t-transparent -rotate-45" />
                <div className="flex flex-col items-center">
                   <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">{item.current}</span>
                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Available</span>
                </div>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center italic">Safe Stock Level Established</p>
          </Card>
        </div>

        {/* Right Column: Transaction Logs */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="p-8 bg-white dark:bg-slate-900 border-none rounded-[40px] shadow-sm">
             <div className="flex items-center justify-between mb-10 px-2">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-accent-primary rounded-full" />
                   <h3 className="text-[14px] font-black uppercase italic tracking-tighter">Stock Transaction Logs</h3>
                </div>
                <Button onClick={() => addNotification('Info', 'Exporting log matrix...', 'info')} className="bg-slate-50 dark:bg-white/5 text-[9px] font-black py-2 tracking-widest border-none">Export Logs</Button>
             </div>

             <div className="space-y-4">
                {logs.length > 0 ? logs.map((log, i) => (
                   <div key={i} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-black/20 rounded-3xl border border-transparent hover:border-accent-primary/10 transition-all">
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-xl ${log.transaction_type === 'in' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'} flex items-center justify-center font-black`}>
                            <History size={18} />
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[12px] font-black uppercase text-slate-900 dark:text-white">{log.transaction_display || (log.transaction_type === 'in' ? 'Stock Added' : 'Stock Removed')}</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{log.performer_name || 'System Auto'} • {new Date(log.timestamp).toLocaleString()}</span>
                         </div>
                      </div>
                      <span className={`text-[12px] font-black tabular-nums ${log.transaction_type === 'in' ? 'text-emerald-500' : 'text-rose-500'}`}>
                         {log.transaction_type === 'in' ? '+' : '-'}{log.quantity} {item.unit}
                      </span>
                   </div>
                )) : (
                  <div className="p-20 text-center text-slate-400 text-[10px] font-black uppercase tracking-widest italic opacity-40">No records found for this item</div>
                )}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value, valueClass = "text-slate-900 dark:text-white" }) {
  return (
    <div className="flex items-center justify-between group">
       <div className="flex items-center gap-3">
          <div className="text-slate-300 group-hover:text-accent-primary transition-colors">{icon}</div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
       </div>
       <span className={`text-[10px] font-black uppercase tracking-tight ${valueClass}`}>{value}</span>
    </div>
  );
}
