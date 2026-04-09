import React from 'react';
import { MoreVertical, Edit, Trash2, Eye } from 'lucide-react';

export default function TableActions({ onEdit, onDelete, onView }) {
  return (
    <div className="flex items-center gap-1">
      {onView && (
        <button onClick={onView} className="p-2 text-slate-400 hover:text-[#1a73e8] hover:bg-blue-50 rounded-full transition-all">
          <Eye size={18} />
        </button>
      )}
      {onEdit && (
        <button onClick={onEdit} className="p-2 text-slate-400 hover:text-[#1a73e8] hover:bg-blue-50 rounded-full transition-all">
          <Edit size={18} />
        </button>
      )}
      {onDelete && (
        <button onClick={onDelete} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all">
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
}
