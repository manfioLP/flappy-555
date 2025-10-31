"use client";

import React from "react";
import dynamic from "next/dynamic";

const Game = dynamic(() => import("../components/Game"), {
    ssr: false,
    loading: () => (
        <div className="w-full max-w-6xl mt-8 text-center text-gray-500">
            Loading game…
        </div>
    ),
});

const JUP = {
    neon: "#00FF9C",
    glow: "#00FFB2",
    aqua: "#13FFE2",
    dark: "#021013",
    dark2: "#041F1C",
    stroke: "rgba(0,255,156,0.25)",
    card: "rgba(6, 28, 24, 0.72)",
};

const GamePage: React.FC = () => {
    return (
        <main className="flex flex-col items-center w-full p-4">
            {/* Header */}
            <section className="w-full max-w-6xl text-center">
                <div
                    className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm shadow backdrop-blur"
                    style={{
                        border: `1px solid ${JUP.stroke}`,
                        background: "rgba(0,0,0,0.35)",
                        boxShadow: `0 0 16px ${JUP.neon}22`,
                    }}
                >
                    <span className="text-lg">🪐</span>
                    <span className="font-medium" style={{color: JUP.aqua}}>
              Jupiter • Solana
            </span>
                    <span className="text-lg">☄️</span>
                </div>

                <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-green-400 drop-shadow-lg">
                    Flappy-555 ☄️
                </h1>
                <p className="mt-2 text-base md:text-lg text-green-200">
                    Dodge pipes, fly through Jupiter space, and chase the leaderboard 🚀
                </p>

            </section>

            {/* Game host */}
            <section className="w-full max-w-6xl mt-6">
                <div className="grid grid-cols-1 gap-6">
                    <Game />
                </div>
            </section>
        </main>
    );
};

export default GamePage;
