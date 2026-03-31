import React from 'react';
import { Ghost } from 'lucide-react';
import Card from './Card';
import Button from './Button';

export default function EmptyState({ 
  icon: Icon = Ghost, 
  title = "Nothing to see here", 
  message = "Your medical record is empty or no matches found.",
  actionText,
  onAction,
  className = "" 
}) {
  return (
    <Card className={`empty-state-card glass-panel flex flex-col items-center justify-center p-16 text-center border-dashed border-2 border-white/5 opacity-80 ${className}`}>
      <div className="p-8 rounded-full bg-blue-500/5 mb-8 animate-va-bounce-slow">
        <Icon size={64} className="text-blue-400 opacity-20" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="max-w-md mx-auto text-sm font-semibold text-gray-500 uppercase tracking-widest leading-relaxed mb-10 italic">
        {message}
      </p>
      {actionText && onAction && (
        <Button onClick={onAction} className="min-w-[200px] py-4 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-600/20 rounded-full font-extrabold uppercase tracking-[0.2em] transition-all">
          {actionText}
        </Button>
      )}
    </Card>
  );
}
