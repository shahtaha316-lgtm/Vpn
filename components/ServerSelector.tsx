
import React, { useState, useRef, useEffect } from 'react';
import { Server } from '../types';

interface ServerSelectorProps {
  servers: Server[];
  selectedServer: Server;
  onSelect: (server: Server) => void;
  disabled: boolean;
}

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
);

const ServerSelector: React.FC<ServerSelectorProps> = ({ servers, selectedServer, onSelect, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (server: Server) => {
    onSelect(server);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full bg-black/20 hover:bg-black/30 text-brand-text font-semibold py-3 px-4 rounded-lg flex items-center justify-between transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{selectedServer.flag}</span>
          <span>{selectedServer.name}</span>
        </div>
        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul className="absolute bottom-full mb-2 w-full bg-brand-surface rounded-lg shadow-xl max-h-60 overflow-y-auto z-20 animate-fadeIn">
          {servers.map(server => (
            <li
              key={server.id}
              onClick={() => handleSelect(server)}
              className={`flex items-center space-x-3 p-3 cursor-pointer hover:bg-brand-primary/20 transition-colors duration-200 ${selectedServer.id === server.id ? 'bg-brand-primary/30' : ''}`}
            >
              <span className="text-2xl">{server.flag}</span>
              <span className="font-medium">{server.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServerSelector;
