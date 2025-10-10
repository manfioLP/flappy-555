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

const GamePage: React.FC = () => {
    return (
        <main className="flex flex-col items-center w-full p-4">
            {/* Header */}
            <section className="w-full max-w-6xl text-center">
                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-yellow-300/70 bg-white/80 px-4 py-1 text-sm shadow backdrop-blur">
                    <span className="text-lg">🏮</span>
                    <span className="font-medium text-yellow-700">BNB Chain • 币安智能链</span>
                    <span className="text-lg">🧧</span>
                </div>

                <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-red-700">
                    飞鸟冲天 · Flappy BNB 🐉
                </h1>

                <p className="mt-2 text-base md:text-lg text-gray-700">
                    点击或按空格键开始 · Click or press <span className="font-semibold">SPACE</span> to start
                </p>
                <p className="text-sm text-gray-500">
                    躲避管道，攀登高分榜，赢取🧧！Avoid pipes, chase high score, win red packets!
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
