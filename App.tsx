
import React, { useState, useEffect, useRef } from 'react';
import { Server } from './types';
import { SERVERS } from './constants';
import StatusDisplay from './components/StatusDisplay';
import ConnectionButton from './components/ConnectionButton';
import ServerSelector from './components/ServerSelector';
import ConnectionDetails from './components/ConnectionDetails';
import { WorldMap } from './components/WorldMap';

const App: React.FC = () => {
  const [servers] = useState<Server[]>(SERVERS);
  const [selectedServer, setSelectedServer] = useState<Server>(servers[0]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionTime, setConnectionTime] = useState(0);
  const [userIp] = useState('198.51.100.10');

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setConnectionTime(prevTime => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setConnectionTime(0);
  };

  const handleConnectToggle = () => {
    if (isConnected) {
      setIsConnected(false);
      stopTimer();
    } else {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
        startTimer();
      }, 2000);
    }
  };

  const handleServerSelect = (server: Server) => {
    if (isConnected) {
      handleConnectToggle(); // Disconnect first
    }
    setSelectedServer(server);
  };
  
  const vpnIp = isConnected ? selectedServer.ip : '-';

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <WorldMap selectedServerId={selectedServer.id} isConnected={isConnected} />
      </div>
      <main className="w-full max-w-sm mx-auto bg-brand-surface/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 z-10 flex flex-col items-center space-y-6 animate-fadeIn">
        <h1 className="text-2xl font-bold tracking-tight">Gemini Shield VPN</h1>
        
        <StatusDisplay isConnected={isConnected} isConnecting={isConnecting} />

        <ConnectionButton
          isConnected={isConnected}
          isConnecting={isConnecting}
          onClick={handleConnectToggle}
        />

        <div className="w-full space-y-4">
          <ServerSelector
            servers={servers}
            selectedServer={selectedServer}
            onSelect={handleServerSelect}
            disabled={isConnecting || isConnected}
          />
          <ConnectionDetails 
            userIp={userIp} 
            vpnIp={vpnIp} 
            connectionTime={formatTime(connectionTime)} 
            isConnected={isConnected}
          />
        </div>
      </main>
      <footer className="absolute bottom-4 text-center text-brand-muted text-sm z-10">
        <p>This is a UI demonstration and does not provide a real VPN service.</p>
      </footer>
    </div>
  );
};

export default App;
