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
        <main className="flex flex-col items-center w-full p-4 bg-gray-50">
            {/* Page Header */}
            <section className="w-full max-w-6xl text-left">
                <h1 className="text-4xl font-bold text-gray-800 text-center">Play motherfucker</h1>
                <p className="text-gray-500 text-center mt-2">Let's play!</p>
            </section>

            {/* Image/Grid area now hosts the Game */}
            <section className="w-full max-w-6xl mt-8">
                <div className="grid grid-cols-1 gap-6">
                    <Game />
                </div>
            </section>
        </main>
    );
};

export default GamePage;
