'use client';

import React, { useState } from 'react';
import InfoPage from '@/app/views/InfoPage';
import GamePage from '@/app/views/GamePage';
import LeaderboardPage from '@/app/views/LeaderboardPage';
import HeaderBNB from '@/app/components/Header';

const BNB_BG =
    "radial-gradient(1200px 600px at 20% -10%, rgba(240,185,11,0.18), transparent), \
     radial-gradient(1000px 500px at 120% 10%, rgba(220,38,38,0.10), transparent), \
     linear-gradient(135deg, #fff 0%, #fffbe6 35%, #fff 100%)";

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
      <div className="min-h-screen flex flex-col" style={{ background: BNB_BG }}>
        <HeaderBNB active={activePage} onChange={setActivePage} />
        <main className="flex-1 p-6">{renderPage()}</main>
      </div>
  );
};

export default Page;
