import React, {useEffect, useState} from 'react';
import {useWallet} from "@solana/wallet-adapter-react";

const ConnectedButton: React.FC = () => {
    const { connected, publicKey, disconnect } = useWallet();
    const [showDisconnect, setShowDisconnect] = useState(false);

    useEffect(() => {
        if (connected) {
            setShowDisconnect(true);
        }
    }, [connected]);

    // Shorten the wallet address for display (e.g., 12xe4...PxdsA)
    const shortenAddress = () => {
        const addr = publicKey?.toString() || ""
        return addr.slice(0, 5) + '...' + addr.slice(-5);
    }

    const handleDisconnect = () => {
        disconnect().then(() => {
            console.log('Wallet disconnected!')
            setShowDisconnect(false);
        }).catch(err => console.error(err));

    }

    return (
        <div className="flex items-center space-x-4">
            {showDisconnect && (
                <>
                    <button
                        onClick={handleDisconnect}
                        className="flex items-center px-4 py-2 bg-purple-100 text-blue-600 rounded-full hover:bg-purple-200 transition-all duration-300 focus:outline-none"
                    >
                        <span className="font-semibold text-sm">{shortenAddress()}</span>
                        <img
                            src="/icons/log-out.svg" // Path to your icon in the public folder
                            alt="Log out"
                            className="ml-2 w-4 h-4"
                        />
                    </button>
                </>
            )}
        </div>
    );
};

export default ConnectedButton;
