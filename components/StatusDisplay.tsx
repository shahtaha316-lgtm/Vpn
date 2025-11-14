
import React from 'react';

interface StatusDisplayProps {
  isConnected: boolean;
  isConnecting: boolean;
}

const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
    </svg>
);

const StatusDisplay: React.FC<StatusDisplayProps> = ({ isConnected, isConnecting }) => {
  const getStatusText = () => {
    if (isConnecting) return "Securing Connection...";
    if (isConnected) return "Your Connection is Secure";
    return "You are Not Protected";
  };

  const statusColor = isConnected ? 'text-brand-secondary' : isConnecting ? 'text-brand-primary' : 'text-brand-muted';

  return (
    <div className="flex flex-col items-center space-y-2">
      <ShieldIcon className={`w-12 h-12 transition-colors duration-500 ${statusColor}`} />
      <span className={`font-semibold text-lg transition-colors duration-500 ${statusColor}`}>
        {getStatusText()}
      </span>
    </div>
  );
};

export default StatusDisplay;
