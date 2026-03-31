import React from 'react';
import { Card } from '../../ui';

export default function StatsCard({ title, value, icon, color }) {
  return (
    <Card className="stat-card flex flex-row items-center gap-6 p-6 transition-all hover:-translate-y-1 hover:shadow-xl group">
      <div 
        className="stat-icon-wrapper p-4 rounded-2xl transition-all group-hover:scale-110" 
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        {React.cloneElement(icon, { size: 24, className: 'group-hover:rotate-12 transition-transform' })}
      </div>
      <div className="stat-details">
        <h3 className="text-3xl font-extrabold text-white mb-1 tracking-tight">{value}</h3>
        <p className="text-xs uppercase font-bold text-gray-400 tracking-widest leading-tight">{title}</p>
      </div>
    </Card>
  );
}
