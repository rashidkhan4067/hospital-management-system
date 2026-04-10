import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Star, UserX } from 'lucide-react';
import { Card, Button, Badge } from '@/components/primitives';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { TableSkeleton } from './AnalyticsSkeleton';

export default function DoctorPerformanceTable() {
  const { data, isLoading } = useAnalyticsData();
  const [sortConfig, setSortConfig] = useState({ key: 'appt', direction: 'desc' });
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const rawData = data?.doctorPerformance || [];

  const sortedData = useMemo(() => {
    let sortableItems = [...rawData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [rawData, sortConfig]);

  const paginatedData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Active': return 'tonal';
      case 'On Call': return 'tonal';
      case 'On Leave': return 'outlined';
      default: return 'tonal';
    }
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <Card className="p-0 overflow-hidden bg-surface-bright border border-outline rounded-3xl h-full flex flex-col transition-colors">
      <div className="p-5 md:p-8 border-b border-outline/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface/10">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-text-sub uppercase tracking-widest">Intelligence Registry</span>
          <h3 className="text-xl font-bold text-text-main leading-tight transition-colors">Practitioner Performance</h3>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outlined" size="sm" className="flex-1 sm:flex-none">Export</Button>
           <Button variant="filled" size="sm" className="flex-1 sm:flex-none">Manage</Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto min-h-[300px]">
        {rawData.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-12 md:p-20 gap-4 opacity-40 text-center">
            <UserX size={48} className="text-text-sub" />
            <div>
                <p className="text-sm font-bold text-text-main">No practitioners found</p>
                <p className="text-[11px] font-medium text-text-sub">No data available for the selected selection</p>
            </div>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface/50 border-b border-outline/30">
              <tr>
                {[
                  { label: 'Practitioner', key: 'name', hideOn: '' },
                  { label: 'Appointments', key: 'appt', hideOn: 'hidden sm:table-cell' },
                  { label: 'Revenue (PKR)', key: 'revenue', hideOn: 'hidden md:table-cell' },
                  { label: 'Rating', key: 'rating', hideOn: 'hidden lg:table-cell' },
                  { label: 'Status', key: 'status', hideOn: '' }
                ].map((column) => (
                  <th 
                    key={column.key} 
                    onClick={() => requestSort(column.key)}
                    className={`px-5 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-sub cursor-pointer hover:text-primary transition-colors group whitespace-nowrap ${column.hideOn}`}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronUp size={10} className={sortConfig.key === column.key && sortConfig.direction === 'asc' ? 'text-primary' : ''} />
                        <ChevronDown size={10} className={sortConfig.key === column.key && sortConfig.direction === 'desc' ? 'text-primary' : ''} />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/20">
              {paginatedData.map((doc) => (
                <tr key={doc.id} className="hover:bg-surface/50 transition-colors group">
                  <td className="px-5 md:px-8 py-5 text-sm font-bold text-text-main whitespace-nowrap">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface border border-outline/30 flex items-center justify-center text-[10px] font-black text-text-sub transition-colors">
                            {doc.name.charAt(0)}
                        </div>
                        {doc.name}
                    </div>
                  </td>
                  <td className="px-5 md:px-8 py-5 text-sm font-medium text-text-sub hidden sm:table-cell uppercase tracking-tight">{doc.appt}</td>
                  <td className="px-5 md:px-8 py-5 text-sm font-bold text-text-main whitespace-nowrap hidden md:table-cell">
                    <span className="text-text-sub font-medium mr-1 text-[10px] opacity-40">PKR</span>
                    {doc.revenue.toLocaleString()}
                  </td>
                  <td className="px-5 md:px-8 py-5 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-warning/10 rounded-lg w-fit border border-warning/20 transition-colors">
                      <Star size={11} className="fill-warning text-warning" />
                      <span className="text-[11px] font-black text-warning">{doc.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 md:px-8 py-5">
                    <Badge 
                      variant={getStatusVariant(doc.status)} 
                      className={`${doc.status === 'Active' ? 'bg-success/10 text-success border-success/20' : doc.status === 'On Leave' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-surface text-text-sub border-outline'}`}
                    >
                      {doc.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 🧾 Pagination Strip */}
      <div className="mt-auto px-5 md:px-8 py-4 md:py-5 border-t border-outline/30 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface/5 rounded-b-2xl transition-colors">
        <span className="text-[11px] font-medium text-text-sub transition-colors">
          Showing <span className="text-text-main font-bold">{Math.min(rowsPerPage, paginatedData.length)}</span> of <span className="text-text-main font-bold">{sortedData.length}</span> practitioners
        </span>
        <div className="flex items-center gap-2">
          <button 
             onClick={() => setPage(p => Math.max(1, p - 1))}
             disabled={page === 1}
             className="p-2 rounded-lg border border-outline hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-all text-text-main"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[11px] font-black text-text-main mx-2 transition-colors">Page {page} of {totalPages}</span>
          <button 
             onClick={() => setPage(p => Math.min(totalPages, p + 1))}
             disabled={page === totalPages}
             className="p-2 rounded-lg border border-outline hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-all text-text-main"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
}
