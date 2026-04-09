import React from 'react';

export default function AdminTable({ headers, children }) {
  return (
    <div className="w-full overflow-x-auto rounded-[24px] border border-slate-100 bg-white">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/50">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {children}
        </tbody>
      </table>
    </div>
  );
}
