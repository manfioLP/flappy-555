import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import ConnectWalletButton from "@/app/components/ConnectWalletButton";

interface SidebarProps {
    setActivePage: (page: string) => void; // Callback to update the active page
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
    const { connected, publicKey, disconnect } = useWallet(); // Solana wallet adapter hooks
    const [showDisconnect, setShowDisconnect] = useState(false);

    const handleDisconnect = async () => {
        try {
            await disconnect();
            console.log('Wallet disconnected!');
        } catch (error) {
            console.error('Failed to disconnect wallet:', error);
        }
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-300 p-6 flex flex-col justify-between">
            {/* Logo/Profile Section */}
            <div className="text-left mb-6">
                {connected && publicKey ? (
                    <div className="flex items-center">
                        <img
                            src="/logo.png"
                            alt="Profile"
                            className="w-16 h-16 rounded-full"
                        />
                        <div className="ml-4">
                            <p className="text-gray-800 text-lg font-bold">Meta Muse</p>
                            <p className="text-sm text-gray-600">
                                {publicKey.toString().slice(0, 6)}...{publicKey.toString().slice(-4)}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <img
                            src="/logo.png"
                            alt="Meta Muse Logo"
                            className="w-32 h-32 mx-auto mb-4"
                        />
                        <h1 className="text-xl font-bold text-gray-800">Meta Muse</h1>
                    </div>
                )}
            </div>

            {/* Navigation Links */}
            <ul className="space-y-4">
                <li
                    onClick={() => setActivePage('Audio')}
                    className="cursor-pointer text-gray-800 hover:text-pink-600"
                >
                    Audio
                </li>
                <li
                    onClick={() => setActivePage('Image')}
                    className="cursor-pointer text-gray-800 hover:text-pink-600"
                >
                    Image
                </li>
                <li
                    onClick={() => setActivePage('Dreams')}
                    className="cursor-pointer text-gray-800 hover:text-pink-600"
                >
                    <i>Dreams (NSFW)</i>
                </li>
                <li className="relative text-gray-500 cursor-not-allowed">
                    Agent
                    <span className="absolute text-xs text-gray-400 top-0 right-0">
                        Coming soon!
                    </span>
                </li>
                <li className="relative text-gray-500 cursor-not-allowed">
                    Video
                    <span className="absolute text-xs text-gray-400 top-0 right-0">
                        Coming soon!
                    </span>
                </li>
            </ul>

            {/* Wallet Section */}
            <div className="mt-auto text-center text-gray-800">
                {connected && publicKey ? (
                    <div
                        className="relative cursor-pointer group"
                        onClick={() => setShowDisconnect(!showDisconnect)}
                    >
                        <p className="text-sm text-gray-600">
                            Connected: <span className="text-pink-600">{publicKey.toString().slice(0, 6)}...{publicKey.toString().slice(-4)}</span>
                        </p>
                        {showDisconnect && (
                            <button
                                onClick={handleDisconnect}
                                className="absolute mt-2 w-full bg-red-500 text-white text-sm py-1 rounded-md shadow-md"
                            >
                                Disconnect
                            </button>
                        )}
                    </div>
                ) : (
                    <ConnectWalletButton size={"small"} />
                )}
            </div>

            <button
                onClick={() => setActivePage('Settings')}
                className="mt-6 text-gray-600 hover:text-gray-800"
            >
                Settings
            </button>
        </aside>
    );
};

export default Sidebar;
