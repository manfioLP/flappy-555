"use client";

import React from "react";
import { useAccount } from "wagmi";
import { useIsClient } from "@/hooks/useIsClient";
import ConnectWalletButton from "@/app/components/ConnectWalletButton";
import ConnectedButton from "@/app/components/ConnectedButton";

type Props = {
    active: "Info" | "Game" | "RewardsBoard";
    onChange: (k: Props["active"]) => void;
};

const JUP = {
    neon: "#00FF9C",
    aqua: "#13FFE2",
    glow: "#00FFB2",
    stroke: "rgba(0,255,156,0.25)",
};

export default function HeaderBNB({ active, onChange }: Props) {
    const isClient = useIsClient();
    const { isConnected } = useAccount();

    const tabs: { key: Props["active"]; label: string }[] = [
        { key: "Info", label: "Rules" },
        { key: "Game", label: "Play" },
        { key: "RewardsBoard", label: "Rewards" },
    ];

    return (
        <header
            className="sticky top-0 z-30 w-full backdrop-blur-xl"
            style={{
                background: "rgba(3, 20, 16, 0.70)",
                borderBottom: `1px solid ${JUP.stroke}`,
                boxShadow: `0 0 22px ${JUP.neon}18, inset 0 -1px 0 ${JUP.neon}26`,
            }}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Brand */}
                <div className="flex items-center gap-2">
                    {/* <img src="/images/logo.jpeg" alt="" className="h-6 w-6" /> */}
                    <span
                        className="text-lg font-extrabold tracking-wider select-none"
                        style={{
                            background: `linear-gradient(90deg, ${JUP.neon}, ${JUP.aqua})`,
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                            textShadow: `0 0 18px ${JUP.glow}`,
                        }}
                    >
            FLAPPY-555
          </span>
                </div>

                {/* Nav */}
                <nav
                    className="hidden sm:flex items-center gap-2 rounded-xl px-1 py-1"
                    style={{
                        border: `1px solid ${JUP.stroke}`,
                        background: "rgba(255,255,255,0.03)",
                    }}
                    aria-label="Primary"
                >
                    {tabs.map((t) => {
                        const isActive = active === t.key;
                        return (
                            <button
                                key={t.key}
                                onClick={() => onChange(t.key)}
                                aria-current={isActive ? "page" : undefined}
                                className="relative rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2"
                                style={
                                    isActive
                                        ? {
                                            background: `linear-gradient(90deg, ${JUP.neon}, ${JUP.aqua})`,
                                            color: "#00140F",
                                            boxShadow: `0 0 16px ${JUP.glow}66`,
                                        }
                                        : {
                                            color: "#BFFFEF",
                                        }
                                }
                            >
                                {t.label}
                                {!isActive && (
                                    <span
                                        className="pointer-events-none absolute inset-x-3 -bottom-[2px] h-px opacity-0 transition-opacity group-hover:opacity-60"
                                        style={{ background: JUP.stroke }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Wallet */}
                <div className="flex items-center">
                    {isClient && (isConnected ? <ConnectedButton /> : <ConnectWalletButton />)}
                </div>
            </div>

            {/* Mobile nav */}
            <div className="sm:hidden px-3 pb-3">
                <div className="grid grid-cols-3 gap-2">
                    {tabs.map((t) => {
                        const isActive = active === t.key;
                        return (
                            <button
                                key={t.key}
                                onClick={() => onChange(t.key)}
                                className="rounded-lg px-3 py-2 text-xs font-semibold transition"
                                style={
                                    isActive
                                        ? {
                                            background: `linear-gradient(90deg, ${JUP.neon}, ${JUP.aqua})`,
                                            color: "#00140F",
                                            boxShadow: `0 0 12px ${JUP.glow}66`,
                                        }
                                        : {
                                            color: "#BFFFEF",
                                            border: `1px solid ${JUP.stroke}`,
                                            background: "rgba(255,255,255,0.03)",
                                        }
                                }
                            >
                                {t.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}
