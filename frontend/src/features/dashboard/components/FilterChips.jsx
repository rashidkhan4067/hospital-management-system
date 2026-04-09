import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function FilterChips() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get('unit') || 'All Units';

  const filters = [
    'All Units',
    'Emergency',
    'Cardiology',
    'Pediatrics',
    'Radiology',
    'General Ward',
    'Pharmacy'
  ];

  const handleFilterChange = (filter) => {
    if (filter === 'All Units') {
      searchParams.delete('unit');
    } else {
      searchParams.set('unit', filter);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
      {filters.map((filter) => {
        const isActive = currentFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`
              px-5 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap border shadow-none
              ${isActive 
                ? 'bg-[#E8F0FE] text-[#1967D2] border-[#1967D2]/30' 
                : 'bg-white text-[#3c4043] border-[#DADCE0] hover:bg-[#F8F9FA] hover:border-[#bdc1c6]'}
            `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
