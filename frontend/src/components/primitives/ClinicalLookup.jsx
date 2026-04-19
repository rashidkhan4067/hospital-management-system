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

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      api.get(`${endpoint}?search=${query}`).then(res => {
        setResults(res.data.results || res.data || []);
        setShow(true);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, endpoint]);

  return (
    <div className="relative w-full">
      <M3TextField
        label={label}
        placeholder={placeholder}
        value={query}
        icon={LeftIcon}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length >= 2 && setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 200)}
        autoComplete="off"
        required={required}
        name={name}
        fullWidth
      />
      {show && results.length > 0 && (
        <div className="absolute top-[105%] left-0 right-0 bg-surface-bright border border-outline-variant shadow-2xl rounded-2xl z-[500] max-h-[220px] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSelect(item);
                setQuery(item.full_name || item.name || item.user?.full_name || item.label);
                setShow(false);
              }}
              className="px-4 py-3 hover:bg-primary/5 cursor-pointer border-b border-outline-variant/30 last:border-0 transition-colors group"
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
