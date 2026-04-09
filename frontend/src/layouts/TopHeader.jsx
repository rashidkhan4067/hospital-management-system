import React, { useState, useEffect } from 'react';
import {
  Menu as Hamburger,
  Search as SearchIcon,
  Bell,
  Settings,
  X,
  Plus,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '@/core/auth/AuthContext';
import { useUI } from '@/core/ui/UIContext';

/**
 * 🛰️ TopHeader (Material 3 Reset)
 * Fixed navigation terminal for the clinical command center.
 */
export default function TopHeader() {
  const { user } = useAuth();
  const { toggleMobileMenu, notifications } = useUI();
  const [searchValue, setSearchValue] = useState('');

  // 🧪 Debounced search logic
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue) console.log(`🛰️ Searching across clinical shards: ${searchValue}`);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchValue]);

  const initials = user?.email?.substring(0, 2).toUpperCase() || 'AD';

  return (
    <header className="w-full sticky top-0 bg-surface-bright border-b border-outline-variant z-[100] flex items-center justify-between px-8 h-16 shrink-0 transition-colors">

      {/* 🏥 Left: Minimalist Identity (Transparent) */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 hover:bg-surface rounded-full transition-colors text-text-sub"
        >
          <Hamburger size={20} />
        </button>
        <div className="flex items-center gap-3">
          <Stethoscope size={24} strokeWidth={2.5} className="text-text-main" />
          <span className="text-lg font-medium text-text-main tracking-tight">Al Shifa</span>
        </div>
      </div>

      {/* 🔍 Global Command Search bar (max-w-720px) */}
      <div className="flex-1 max-w-[720px] ml-12 hidden md:block">
        <div className="relative flex items-center group">
          <div className="absolute left-4 text-text-sub group-focus-within:text-primary-blue transition-colors">
            <SearchIcon size={18} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            placeholder="Search records or patients"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full h-11 pl-12 pr-6 bg-surface border-transparent rounded-xl text-sm font-normal focus:bg-surface-bright focus:ring-1 focus:ring-outline-variant transition-all outline-none text-text-main placeholder:text-text-sub"
          />
        </div>
      </div>

      {/* ⚙️ Constant Action Nodes */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-surface rounded-full text-text-sub transition-all active:scale-90 relative">
            <Bell size={20} />
            {notifications?.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface-bright shadow-sm" />
            )}
          </button>

          <button className="p-2 hover:bg-surface rounded-full text-text-sub transition-all active:scale-90">
            <Settings size={20} />
          </button>
        </div>

        <div className="h-6 w-px bg-outline-variant" />

        {/* 👤 Identity Hub */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-surface border border-outline-variant flex items-center justify-center text-xs font-bold text-text-sub group-hover:border-primary-blue transition-colors">
            {initials}
          </div>
        </div>
      </div>

    </header>
  );
}


