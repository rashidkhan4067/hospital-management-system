import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Clock, AlertCircle, Info, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 🔔 NotificationBell (MD3 Standard)
 * Features filled circle #B3261E badge and interactive dropdown preview.
 */
const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef(null);

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Critical Alert: ICU Oxygen', detail: 'Pressure sensor dropping in Ward A', time: '2m', type: 'error', read: false },
    { id: 2, title: 'New Staff Protocol', detail: 'Dr. Rashid approved the night shift rotation', time: '15m', type: 'info', read: false },
    { id: 3, title: 'Inventory Warning', detail: 'Sterile gauze stock below 15%', time: '1h', type: 'warning', read: true }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={bellRef}>
      {/* 🔔 The Bell Icon Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all relative ${isOpen ? 'bg-[#6750A4]/15 text-[#6750A4]' : 'text-[#49454F] hover:bg-[#49454F]/8'}`}
      >
        <Bell size={24} strokeWidth={2} />
        
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 min-w-[18px] h-[18px] px-1 bg-[#B3261E] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm ring-2 ring-white/10 scale-100 transition-transform hover:scale-110">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 📂 Dropdown Alert Matrix */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-14 w-80 bg-white border border-[#CAC4D0] rounded-[24px] shadow-2xl z-[120] overflow-hidden"
          >
            <div className="p-4 flex items-center justify-between bg-surface border-b border-outline/5">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#49454F]/60">Incident Notifications</span>
                <span className="text-[10px] font-bold text-[#6750A4] cursor-pointer hover:underline uppercase tracking-widest">Mark All Read</span>
            </div>
            
            <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
                {notifications.map((notif) => (
                    <div 
                        key={notif.id} 
                        className={`group p-4 flex gap-4 hover:bg-[#6750A4]/5 transition-all cursor-pointer relative ${!notif.read ? 'bg-[#6750A4]/2' : ''}`}
                    >
                        <div className="shrink-0 mt-1">
                            <NotificationIcon type={notif.type} />
                        </div>
                        <div className="flex-grow flex flex-col gap-0.5">
                            <div className="flex items-center justify-between">
                                <span className={`text-[13px] font-bold tracking-tight ${!notif.read ? 'text-[#1C1B1F]' : 'text-[#49454F]'}`}>{notif.title}</span>
                                <div className="flex items-center gap-1.5 opacity-60">
                                    <Clock size={10} />
                                    <span className="text-[10px] font-black uppercase whitespace-nowrap">{notif.time}</span>
                                </div>
                            </div>
                            <span className="text-[11px] text-[#49454F] leading-snug opacity-80">{notif.detail}</span>
                            
                            {!notif.read && (
                                <div className="absolute top-4 right-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Check size={14} className="text-[#6750A4]" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            <button className="w-full py-4 text-center bg-surface hover:bg-[#6750A4]/10 transition-colors text-[11px] font-black uppercase tracking-[0.2em] text-[#6750A4] border-t border-outline/5">
                Investigate Command Center
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NotificationIcon = ({ type }) => {
  const configs = {
    error: { icon: AlertCircle, color: 'text-[#B3261E]', bg: 'bg-[#B3261E]/10' },
    warning: { icon: Activity, color: 'text-[#E37400]', bg: 'bg-[#E37400]/10' },
    info: { icon: Info, color: 'text-[#6750A4]', bg: 'bg-[#6750A4]/10' },
  };
  const config = configs[type] || configs.info;
  const Icon = config.icon;
  
  return (
    <div className={`w-8 h-8 rounded-xl ${config.bg} flex items-center justify-center ${config.color} transition-transform hover:scale-105`}>
        <Icon size={16} />
    </div>
  );
};

export default NotificationBell;
