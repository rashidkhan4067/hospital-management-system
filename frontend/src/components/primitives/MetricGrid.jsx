import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './index';

/**
 * ⚡ MetricCard (Single Source of Truth)
 * Premium Material 3 Shard for all clinical KPIs across the application.
 * Follows the strict Google 8px rule and unified vertical distribution.
 */
/**
 * 🛰️ MetricGrid
 * Standardized responsive container for clinical telemetry cards.
 * Mirroring Google Enterprise 'Auto-Density' and strict 8px gutter logic.
 */
/**
 * 🛰️ MetricGrid
 * Standardized responsive container for clinical telemetry cards.
 * Mirroring Google Enterprise 'Auto-Density' and strict 8px gutter logic.
 */
export const MetricGrid = ({ children, cols = 4 }) => {
  const responsiveClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2', // Enhanced mobile density
    3: 'grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4' // High density mobile-first
  };

  return (
    <div className={`grid ${responsiveClasses[cols] || responsiveClasses[4]} gap-4 md:gap-6 mb-8`}>
      {children}
    </div>
  );
};

/**
 * ⚡ MetricCard (Single Source of Truth)
 * Premium Material 3 Shard for all clinical KPIs across the application.
 */
export const MetricCard = ({ 
  label, 
  value, 
  subLabel, 
  icon: Icon, 
  trend, 
  isUp, 
  link, 
  onClick,
  className = "",
  children
}) => {
  const navigate = useNavigate();

  const handleInteraction = () => {
    if (onClick) onClick();
    if (link) navigate(link);
  };

  const hasInteraction = !!(onClick || link);

  return (
    <Card 
      onClick={handleInteraction}
      className={`p-4 md:p-5 min-h-[140px] md:min-h-[150px] bg-surface-bright border border-outline rounded-[28px] flex flex-col justify-between transition-all group ${hasInteraction ? 'cursor-pointer hover:border-primary hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98]' : ''} ${className}`}
    >
      {/* ⬆️ Header Node */}
      <div className="flex items-center justify-between">
        <div className={`w-8 h-8 rounded-xl bg-surface flex items-center justify-center text-primary transition-colors ${hasInteraction ? 'group-hover:bg-primary group-hover:text-white' : ''}`}>
          <Icon size={14} className="md:w-4 md:h-4" />
        </div>
        {trend && (
          <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-black ${isUp ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
            {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {trend}
          </div>
        )}
      </div>

      {/* 📟 Central Value Node */}
      <div className="flex flex-col items-start justify-center my-1 md:my-2">
        <h4 className="text-xl md:text-2xl font-bold tracking-tight text-text-main tabular-nums break-words">
          {value}
        </h4>
        <span className="text-[10px] md:text-[11px] font-bold text-text-sub uppercase tracking-widest leading-none mt-1">
          {label}
        </span>
      </div>


      {/* ⬇️ Sparkline / Extended Info */}
      <div className="w-full">
         {children}
      </div>
    </Card>
  );
};
