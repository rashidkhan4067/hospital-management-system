import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Menu } from 'lucide-react';
import { Button } from '@/components/primitives';

export default function PublicNavbar() {
  return (
    <nav className="w-full h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 md:px-12 flex items-center justify-between sticky top-0 z-[500]">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#1a73e8] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Stethoscope size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">Shifaa HMS</span>
      </Link>

      <div className="hidden lg:flex items-center gap-8">
        {['Specialists', 'Services', 'Laboratory', 'Clinical Tech'].map((item) => (
          <Link 
            key={item} 
            to={`/${item.toLowerCase().replace(' ', '-')}`}
            className="text-sm font-bold text-slate-600 hover:text-[#1a73e8] transition-colors tracking-tight"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link to="/login">
          <Button variant="text" className="hidden sm:flex">Sign In</Button>
        </Link>
        <Link to="/register">
          <Button className="shadow-none">Get Started</Button>
        </Link>
      </div>
    </nav>
  );
}
