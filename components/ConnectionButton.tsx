
import React from 'react';

interface ConnectionButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  onClick: () => void;
}

const PowerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0V6zM11.25 14.632a.75.75 0 00.091 1.058 6.002 6.002 0 008.21 0 .75.75 0 00.091-1.058A4.5 4.5 0 0112 16.5a4.5 4.5 0 01-2.059-1.868z" clipRule="evenodd" />
    </svg>
);


const ConnectionButton: React.FC<ConnectionButtonProps> = ({ isConnected, isConnecting, onClick }) => {
  const buttonStateClasses = isConnected
    ? 'bg-brand-secondary hover:bg-green-500'
    : isConnecting
    ? 'bg-brand-muted animate-pulse cursor-not-allowed'
    : 'bg-brand-primary hover:bg-indigo-500';
  
  const buttonText = isConnecting ? 'CONNECTING' : isConnected ? 'DISCONNECT' : 'CONNECT';

  return (
    <button
      onClick={onClick}
      disabled={isConnecting}
      className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center text-white font-bold text-xl uppercase tracking-widest shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${buttonStateClasses} ${isConnected ? 'focus:ring-green-400' : 'focus:ring-indigo-400'}`}
    >
      <div className="absolute inset-0 rounded-full border-8 border-white/10"></div>
      <PowerIcon className="w-16 h-16 mb-2" />
      <span>{buttonText}</span>
    </button>
  );
};

export default ConnectionButton;
