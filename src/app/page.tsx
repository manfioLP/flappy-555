'use client';

import React, { useEffect, useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { getTokenBalance } from "@/utils";
import Topbar from "@/app/components/Topbar";
import ConnectedButton from "@/app/components/ConnectedButton";
import InfoPage from "@/app/views/InfoPage";
import GamePage from "@/app/views/GamePage";
import LeaderboardPage from "@/app/views/LeaderboardPage";
import ConnectWalletButton from "@/app/components/ConnectWalletButton";

const Page: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Game');
  const [tokenBalance, setTokenBalance] = useState(0);
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    console.log("connected", connected)
    if (publicKey) {
      getTokenBalance(publicKey)
          .then((balance: number) => {
            setTokenBalance(balance);
          })
          .catch(err => {
            console.error("error fetching token balance", err);
          });
    }
  }, [publicKey, connected]);

  // Render the current page component
  const renderPage = () => {
    switch (activePage) {
      case 'Game':
        return <GamePage />;
      case 'Leaderboard':
        return <LeaderboardPage />;
        // return tokenBalance >= 100000 ? <ImagePage/> : <LowBalancePage requiredBalance={100000} balance={tokenBalance} background={"pink"}/>;
      case 'Info':
        return <InfoPage />
      default:
        return <GamePage />;
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
        {/* Header */}
        <header className="w-full bg-white border-b p-4 flex items-center justify-between">
          <div className="p-0 flex space-x-2 text-center justify-between align-bottom">
            {/*// todo: add logo*/}
            <img
                src="/images/img.png"
                alt="Flappy CZ Logo"
                className="mt-2 h-6 w-auto" // Adjust height as needed
            />
            <b>Flappy Jew</b>
          </div>
          <nav className="flex space-x-4 text-gray-600">
            {/*<a href="#" className="hover:text-indigo-500">GitHub</a>*/}
            <a href="https://x.com" target={"_blank"} className="hover:text-indigo-500">Twitter</a>
            <span onClick={() => setActivePage("Settings")}
                  className="hover:text-indigo-500 cursor-pointer">Settings</span>
            {/*<ConnectedButton/>*/}
            {/* Wallet button slot */}
            {connected ? (
                <ConnectedButton />
            ) : (
                <ConnectWalletButton size="small" />
            )}
          </nav>
        </header>

        <Topbar activePage={activePage} setActivePage={setActivePage}/>
        {/* Main Content */}
        <main className="flex-1 p-6">{renderPage()}</main>
      </div>
  );
};

export default Page;
