import React, { useState, useEffect } from 'react';
import api from '@/core/api/apiClient';
import M3TextField from './M3TextField';

/**
 * 🔍 ClinicalLookup
 * Material Design 3 searching primitive.
 * Unified lookup for Patients, Doctors, and Inventory.
 */
export default function ClinicalLookup({ 
  label, 
  endpoint, 
  onSelect, 
  placeholder, 
  required, 
  name,
  icon: LeftIcon 
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      api.get(`${endpoint}?search=${query}`).then(res => {
        const data = res.data.results || res.data || [];
        setResults(data);
        setShow(data.length > 0);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, endpoint]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <M3TextField
        label={label}
        placeholder={placeholder}
        value={query}
        icon={LeftIcon}
        onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length < 2) setShow(false);
        }}
        onFocus={() => query.length >= 2 && results.length > 0 && setShow(true)}
        autoComplete="off"
        required={required}
        name={name}
        fullWidth
      />
      {show && results.length > 0 && (
        <div className="absolute top-[105%] left-0 right-0 bg-white border border-slate-100 shadow-2xl rounded-2xl z-[999] max-h-[220px] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSelect(item);
                setQuery(item.full_name || item.name || item.user?.full_name || item.label);
                setResults([]);
                setShow(false);
              }}
              className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors group"
            >
              <div className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">
                {item.full_name || item.name || item.user?.full_name || item.label}
              </div>
              {item.specialization && <div className="text-[10px] text-text-sub uppercase font-black tracking-wider">{item.specialization}</div>}
              {item.email && <div className="text-[10px] text-text-sub opacity-70">{item.email}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
