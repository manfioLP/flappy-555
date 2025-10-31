'use client';

import React, { useState } from 'react';
import InfoPage from '@/app/views/InfoPage';
import GamePage from '@/app/views/GamePage';
import LeaderboardPage from '@/app/views/LeaderboardPage';
import HeaderBNB from '@/app/components/Header';

const JUPITER_BG =
    "radial-gradient(800px 600px at 50% 0%, rgba(0,255,156,0.12), transparent), \
     radial-gradient(1000px 500px at 100% 100%, rgba(19,255,137,0.08), transparent), \
     linear-gradient(135deg, #021013 0%, #041F1C 100%)";

type NavKey = "Info" | "Game" | "RewardsBoard";

const Page: React.FC = () => {
  const [activePage, setActivePage] = useState<NavKey>('Info');

  const renderPage = () => {
    switch (activePage) {
      case 'Game':         return <GamePage />;
      case 'RewardsBoard': return <LeaderboardPage />;
      case 'Info':
      default:             return <InfoPage />;
    }
  };

  return (
      <div className="min-h-screen flex flex-col" style={{ background: JUPITER_BG }}>
        <HeaderBNB active={activePage} onChange={setActivePage} />
        <main className="flex-1 p-6">{renderPage()}</main>
      </div>
  );
};

export default Page;
