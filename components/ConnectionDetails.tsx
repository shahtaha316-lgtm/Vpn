
import React from 'react';

interface ConnectionDetailsProps {
    userIp: string;
    vpnIp: string;
    connectionTime: string;
    isConnected: boolean;
}

const ConnectionDetails: React.FC<ConnectionDetailsProps> = ({ userIp, vpnIp, connectionTime, isConnected }) => {
    return (
        <div className="w-full bg-black/20 p-4 rounded-lg space-y-3 text-sm">
            <div className="flex justify-between items-center">
                <span className="text-brand-muted font-medium">Your IP:</span>
                <span className="font-mono text-brand-text">{userIp}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-brand-muted font-medium">VPN IP:</span>
                <span className="font-mono text-brand-text">{vpnIp}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-brand-muted font-medium">Duration:</span>
                <span className="font-mono text-brand-text">{isConnected ? connectionTime : '00:00:00'}</span>
            </div>
        </div>
    );
};

export default ConnectionDetails;
