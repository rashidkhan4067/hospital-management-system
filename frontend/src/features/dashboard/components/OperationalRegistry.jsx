import React from 'react';

export default function OperationalRegistry({ unit }) {
  const allPatients = [
    { name: 'Sarah Jenkins', time: '10:45 AM', dept: 'Cardiology', status: 'Waiting', color: 'bg-amber-100 text-amber-700' },
    { name: 'Michael Chen', time: '11:02 AM', dept: 'Emergency', status: 'In-Consult', color: 'bg-blue-100 text-blue-700' },
    { name: 'Emma Watson', time: '11:15 AM', dept: 'Pediatrics', status: 'Waiting', color: 'bg-amber-100 text-amber-700' },
    { name: 'David Miller', time: '11:20 AM', dept: 'Radiology', status: 'In-Consult', color: 'bg-blue-100 text-blue-700' },
    { name: 'Alice Wong', time: '11:35 AM', dept: 'Emergency', status: 'Waiting', color: 'bg-amber-100 text-amber-700' },
    { name: 'Robert Fox', time: '11:40 AM', dept: 'Cardiology', status: 'In-Consult', color: 'bg-blue-100 text-blue-700' },
    { name: 'Jenny Wilson', time: '11:55 AM', dept: 'Pediatrics', status: 'In-Consult', color: 'bg-blue-100 text-blue-700' },
  ];

  const filteredPatients = unit === 'All Units' 
    ? allPatients 
    : allPatients.filter(p => p.dept === unit);


  return (
    <div className="col-span-12 bg-white border border-[#dadce0] rounded-xl overflow-hidden">
      <div className="p-6 border-b border-[#dadce0] flex items-center justify-between bg-slate-50/30">
        <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-[0.2em]">Recent Patient Registry: {unit}</span>
        <button className="text-[10px] font-bold text-[#1a73e8] uppercase tracking-widest hover:underline">View All Records</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-3 text-[10px] font-bold text-[#5F6368] uppercase tracking-widest">Patient Identity</th>
              <th className="px-6 py-3 text-[10px] font-bold text-[#5F6368] uppercase tracking-widest">Registry Time</th>
              <th className="px-6 py-3 text-[10px] font-bold text-[#5F6368] uppercase tracking-widest">Department</th>
              <th className="px-6 py-3 text-[10px] font-bold text-[#5F6368] uppercase tracking-widest text-right">Status Matrix</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dadce0]/30">
            {filteredPatients.map((p, idx) => (
              <tr key={idx} className="hover:bg-[#F8F9FA] transition-colors group">
                <td className="px-6 py-3 text-sm font-bold text-[#202124]">{p.name}</td>
                <td className="px-6 py-3 text-xs font-medium text-[#5F6368]">{p.time}</td>
                <td className="px-6 py-3 text-xs font-bold text-[#1a73e8]/80">{p.dept}</td>
                <td className="px-6 py-3 text-right">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${p.color}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
