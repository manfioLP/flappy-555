"use client";

import React from "react";
import ConnectedButton from "@/app/components/ConnectedButton";
import ConnectWalletButton from "@/app/components/ConnectWalletButton";

type NavKey = "Info" | "Game" | "RewardsBoard";

type HeaderBNBProps = {
    active: NavKey;
    onChange: (key: NavKey) => void;
    connected: boolean;
};

const BNB_YELLOW = "#F0B90B";

const HeaderBNB: React.FC<HeaderBNBProps> = ({ active, onChange, connected }) => {
    const Item = ({
                      k,
                      label,
                      onClick,
                  }: {
        k: NavKey;
        label: React.ReactNode;
        onClick: () => void;
    }) => {
        const isActive = active === k;
        return (
            <button
                onClick={onClick}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                    isActive
                        ? "text-black"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
                style={isActive ? { backgroundColor: BNB_YELLOW } : undefined}
            >
                {label}
            </button>
        );
    };

    return (
        <header className="w-full border-b bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3">
                {/* Brand (left) */}
                <div className="flex items-center gap-2">
                    <img
                        src="/images/img.png"
                        alt="Flappy BNB"
                        className="h-6 w-auto"
                    />
                    <span className="text-red-600 font-bold tracking-wide">
                        FLAPPY BNB
                    </span>
                    <span className="text-base leading-none">🏮</span>
                </div>

                {/* Nav (center) */}
                <nav className="hidden md:flex items-center gap-1">
                    <a
                        href="https://x.com"
                        target="_blank"
                        className="px-3 py-2 text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
                    >
                        Twitter
                    </a>

                    <Item k="Info" label={<>Rules</>} onClick={() => onChange("Info")} />
                    <Item k="Game" label={<>Play</>} onClick={() => onChange("Game")} />
                    <Item
                        k="RewardsBoard"
                        label={<>Rewards</>}
                        onClick={() => onChange("RewardsBoard")}
                    />
                </nav>

                {/* Wallet (right) */}
                <div className="flex items-center gap-2">
                    {/* Mobile nav (optional minimal) */}
                    <details className="relative md:hidden">
                        <summary className="list-none cursor-pointer rounded-lg border px-2 py-1 text-sm hover:bg-slate-50">
                            Menu
                        </summary>
                        <div className="absolute right-0 mt-2 w-40 rounded-lg border bg-white p-1 shadow">
                            <a
                                href="https://x.com"
                                target="_blank"
                                className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                            >
                                Twitter
                            </a>
                            <button
                                className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100"
                                onClick={() => onChange("Info")}
                            >
                                Rules
                            </button>
                            <button
                                className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100"
                                onClick={() => onChange("Game")}
                            >
                                Play
                            </button>
                            <button
                                className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100"
                                onClick={() => onChange("RewardsBoard")}
                            >
                                Rewards Board
                            </button>
                        </div>
                    </details>

                    {connected ? <ConnectedButton /> : <ConnectWalletButton size="small" />}
                </div>
            </div>
        </header>
    );
};

export default HeaderBNB;
