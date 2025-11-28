import React from 'react';
import { ShieldCheck, WifiOff } from 'lucide-react';

const StatusBadge: React.FC = () => {
  return (
    <div 
      className="flex items-center gap-4 px-4 py-1 border-b text-[10px] uppercase tracking-wider select-none transition-colors duration-500"
      style={{
        backgroundColor: 'var(--theme-bg-header)',
        borderColor: 'var(--theme-border)',
        color: 'var(--theme-text-dim)'
      }}
    >
      <div className="flex items-center gap-1" style={{ color: 'var(--theme-success)' }}>
        <ShieldCheck size={12} />
        <span>Secure</span>
      </div>
      <div className="flex items-center gap-1 opacity-75">
        <WifiOff size={12} />
        <span>Offline</span>
      </div>
      <div className="flex-1"></div>
      <div className="opacity-50">512MB Limit</div>
      <div className="opacity-50">2 vCPU</div>
    </div>
  );
};

export default StatusBadge;