import React from 'react';

export default function DoctorTable() {
  return (
    <div className="glass-panel delay-200" style={{ padding: '24px', overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
        <h3 className="text-xl font-bold text-white mb-2 underline underline-offset-8 decoration-blue-500">Recent Doctor Applications</h3>
        <button className="btn btn-primary px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs">View All</button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 text-[10px] uppercase tracking-widest font-bold text-gray-400">
            <th className="px-6 py-4">Doctor Name</th>
            <th className="px-6 py-4">Specialization</th>
            <th className="px-6 py-4">Experience</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          <tr className="hover:bg-white/5 transition-colors">
            <td className="px-6 py-4">Dr. Alan Grant</td>
            <td className="px-6 py-4">Cardiology</td>
            <td className="px-6 py-4">12 Years</td>
            <td className="px-6 py-4"><span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-[10px] font-bold">Pending</span></td>
            <td className="px-6 py-4"><button className="text-blue-400 font-bold text-xs uppercase hover:underline underline-offset-4 decoration-blue-400/50">Review</button></td>
          </tr>
          <tr className="hover:bg-white/5 transition-colors">
            <td className="px-6 py-4">Dr. Ellie Sattler</td>
            <td className="px-6 py-4">Pediatrics</td>
            <td className="px-6 py-4">8 Years</td>
            <td className="px-6 py-4"><span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-[10px] font-bold">Approved</span></td>
            <td className="px-6 py-4"><button className="text-blue-400 font-bold text-xs uppercase hover:underline underline-offset-4 decoration-blue-400/50">Manage</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
