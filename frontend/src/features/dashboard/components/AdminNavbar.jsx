import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { 
  Bell, 
  Activity,
  User,
  Calendar,
  ShieldCheck,
  Moon,
  Sun,
  Palette,
  SearchIcon,
  CreditCard,
  UserPlus,
  AlertCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/core/auth/AuthContext';
import { useTheme, THEMES, ACCENT_COLORS } from '@/core/theme/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/shared/components/ui';

/**
 * Zenith Command Component (Ultra-Fast & Memoized)
 */
export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, changeAccent } = useTheme();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  
  const notificationRef = useRef(null);

  // Constants (Static Data)
  const notifications = useMemo(() => [
    { id: 1, title: 'Revenue Shard Cleared', desc: 'Clinical payment of $1,240 confirmed.', time: '2m ago', icon: <CreditCard size={14} />, color: 'emerald' },
    { id: 2, title: 'New Specialist Sync', desc: 'Dr. Sarah Connor authorized.', time: '14m ago', icon: <UserPlus size={14} />, color: 'accent' },
    { id: 3, title: 'Kernel Alert Lvl-1', desc: 'Protocol sync successful.', time: '1h ago', icon: <ShieldCheck size={14} />, color: 'blue' },
    { id: 4, title: 'Emergency Shutter Enabled', desc: 'Secure lockdown phase 1 initiated.', time: '3h ago', icon: <AlertCircle size={14} />, color: 'rose' },
  ], []);

  // DSA - Efficient Filtering Selector (Memoized)
  const searchResults = useMemo(() => [
    { id: 1, title: 'Patient Registry', category: 'Registry', icon: User, path: '/admin/patients' },
    { id: 2, title: 'Operation Flux', category: 'Flow', icon: Calendar, path: '/admin/appointments' },
    { id: 3, title: 'AI Shard Diagnostics', category: 'Intelligence', icon: Activity, path: '/admin/analyticss' },
    { id: 4, title: 'Medical Unit Kernel', category: 'Infrastructure', icon: ShieldCheck, path: '/admin/doctors' },
  ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
       if (notificationRef.current && !notificationRef.current.contains(event.target)) setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = useCallback(() => logout(), [logout]);

  return (
    <nav className="h-20 bg-bg-offset/80 dark:bg-slate-900/80 backdrop-blur-3xl border-b border-white/5 py-3 px-8 flex items-center justify-between z-[1100] shadow-sm transition-all duration-700 shrink-0 font-sans relative">
      <div className="flex items-center gap-6 flex-1">
        <div className="flex items-center gap-3 bg-bg-base dark:bg-slate-800 p-1.5 rounded-2xl border border-white/5 group shadow-inner">
           <div className="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center text-white shadow-lg shadow-accent-primary/30 group-hover:rotate-6 transition-transform">
             <Activity size={18} strokeWidth={2.5} />
           </div>
           <p className="text-[11px] font-black text-text-primary dark:text-white uppercase tracking-tight italic pr-4 hidden lg:block">Admin.Node</p>
        </div>

        <div className="relative group max-w-lg flex-1 hidden md:block">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-text-secondary/40 group-focus-within:text-accent-primary transition-colors">
              <SearchIcon size={14} strokeWidth={3} />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            placeholder="Trace Patient Index (CMD+K)" 
            className="w-full bg-bg-base dark:bg-slate-800 border-none rounded-2xl py-3.5 px-12 text-[11px] font-bold tracking-tight text-text-primary dark:text-white placeholder:text-text-secondary/20 focus:ring-4 focus:ring-accent-primary/10 transition-all"
          />
          <AnimatePresence>
            {isSearchOpen && searchQuery.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                className="absolute top-full left-0 right-0 mt-3 bg-bg-offset dark:bg-slate-800 border border-white/5 rounded-[28px] shadow-2xl p-3 z-[2000] backdrop-blur-3xl"
              >
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {searchResults.map(res => (
                    <button key={res.id} onClick={() => {navigate(res.path); setIsSearchOpen(false);}} className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-bg-base dark:hover:bg-white/5 transition-all text-left group">
                      <div className="w-10 h-10 rounded-lg bg-bg-base dark:bg-black/20 flex items-center justify-center text-text-secondary group-hover:bg-accent-primary group-hover:text-white transition-colors">
                        <res.icon size={16} />
                      </div>
                      <div>
                        <p className="text-[12px] font-black text-text-primary dark:text-white uppercase transition-colors group-hover:text-accent-primary">{res.title}</p>
                        <p className="text-[8px] font-black text-accent-primary uppercase tracking-widest mt-1 opacity-60 italic">{res.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-8 pl-6">
        <div className="flex items-center gap-4 relative">
          <CompactNavBtn 
             icon={theme === THEMES.DARK ? Sun : Moon} 
             onClick={toggleTheme}
             active={theme === THEMES.DARK}
          />
          <div className="relative">
            <CompactNavBtn icon={Palette} onClick={() => setShowPalette(!showPalette)} active={showPalette} />
            <AnimatePresence>
              {showPalette && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-full mt-4 right-0 bg-bg-offset dark:bg-slate-800 border border-white/5 rounded-[28px] p-3 shadow-2xl z-[2000] flex flex-col gap-2 min-w-[200px] backdrop-blur-3xl"
                >
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary/40 border-b border-white/5 pb-3 ml-2 italic">Clinical Accents</p>
                  {ACCENT_COLORS.map(color => (
                    <button key={color.value} onClick={() => {changeAccent(color.value); setShowPalette(false);}} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-bg-base dark:hover:bg-white/5 transition-all group">
                      <div className="w-5 h-5 rounded-full border border-white/10" style={{ backgroundColor: color.value }} />
                      <span className="text-[10px] font-black text-text-primary dark:text-white uppercase tracking-tight italic">{color.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={notificationRef}>
            <CompactNavBtn 
               icon={Bell} 
               onClick={() => {setShowNotifications(!showNotifications); setUnreadCount(0);}}
               badge={unreadCount > 0 ? (
                  <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-accent-primary rounded-full shadow-lg shadow-accent-primary/50 animate-pulse" />
               ) : null} 
            />
            <AnimatePresence>
               {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full mt-4 right-0 w-[320px] bg-bg-offset dark:bg-slate-900 border border-white/5 rounded-[36px] p-4 shadow-2xl z-[2000] backdrop-blur-3xl"
                  >
                     <div className="flex items-center justify-between px-4 pb-4 border-b border-white/5 mb-4">
                        <span className="text-[10px] font-black text-text-primary dark:text-white uppercase tracking-[0.3em] italic">Alert Shards</span>
                        <Badge className="bg-accent-primary/10 text-accent-primary border-none text-[8px] font-black uppercase">Live Trace</Badge>
                     </div>
                     <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar pr-1">
                        {notifications.map(notif => (
                           <div key={notif.id} className="p-4 rounded-2xl bg-bg-base dark:bg-white/5 hover:bg-accent-primary/5 transition-all cursor-pointer group/notif">
                              <div className="flex items-start gap-4">
                                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${notif.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : notif.color === 'accent' ? 'bg-accent-primary/10 text-accent-primary border-accent-primary/20' : notif.color === 'rose' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                                    {notif.icon}
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                       <p className="text-[11px] font-black text-text-primary dark:text-white uppercase leading-none">{notif.title}</p>
                                       <span className="text-[8px] font-bold text-text-secondary dark:text-white/20 italic">{notif.time}</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-text-secondary dark:text-white/30 uppercase tracking-tight mt-1.5 leading-relaxed">{notif.desc}</p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                     <button className="w-full mt-4 py-3 text-[9px] font-black text-accent-primary uppercase tracking-[0.3em] hover:text-text-primary dark:hover:text-white transition-colors border-t border-white/5 pt-4">Clear All Shards</button>
                  </motion.div>
               )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-4 group cursor-pointer pl-6 border-l border-white/5">
          <div className="flex flex-col items-end text-right hidden lg:flex">
             <p className="text-[11px] font-black text-text-primary dark:text-white uppercase tracking-tight leading-none italic">{user?.email?.split('@')[0] || 'Admin'}</p>
             <p className="text-[8px] font-black text-accent-primary uppercase tracking-[0.2em] mt-1.5 opacity-60 italic">Root_ID</p>
          </div>
          <div className="relative p-1 rounded-xl bg-bg-base dark:bg-slate-800 border border-white/5 shadow-inner">
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-black/40 flex items-center justify-center overflow-hidden border border-white/10 shadow-sm">
               <img src={`https://ui-avatars.com/api/?name=${user?.email || 'Admin'}&background=0B1121&color=fff&bold=true`} alt="Identity" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>
        </div>

        <button onClick={handleLogout} className="w-10 h-10 rounded-xl bg-neutral-50 dark:bg-red-500/5 hover:bg-neutral-100 dark:hover:bg-red-500/15 transition-all text-text-secondary dark:text-red-400 group flex items-center justify-center border border-transparent">
          <LogOut size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </nav>
  );
}

const CompactNavBtn = memo(({ icon: Icon, badge, onClick, active }) => {
  return (
    <button 
      onClick={onClick}
      className={`relative w-10 h-10 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center shadow-sm border ${active ? 'bg-accent-primary/10 text-accent-primary border-accent-primary/30' : 'bg-bg-base dark:bg-slate-800 text-text-secondary dark:text-white/30 border-white/5 hover:bg-bg-offset dark:hover:bg-white/5'}`}
    >
      <Icon size={16} strokeWidth={2.5} />
      {badge}
    </button>
  );
});

