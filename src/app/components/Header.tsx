"use client";

import React from "react";
import { useAccount } from "wagmi";
import { useIsClient } from "@/hooks/useIsClient";
import ConnectWalletButton from "@/app/components/ConnectWalletButton";
import ConnectedButton from "@/app/components/ConnectedButton";

type Props = {
    active: "Info" | "Game" | "RewardsBoard";
    onChange: (k: Props["active"]) => void;
    // remove `connected` prop; we derive it client-side
};

export default function HeaderBNB({ active, onChange }: Props) {
    const isClient = useIsClient();
    const { isConnected } = useAccount();

    return (
        <header className="w-full border-b bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
                {/* left: brand */}
                <div className="flex items-center gap-2">
                    <img src="/images/logo.jpeg" alt="" className="h-6 w-6" />
                    <span className="font-extrabold text-red-600">FLAPPY BNB</span>
                </div>

                {/* center: nav */}
                <nav className="flex items-center gap-3">
                    <button onClick={() => onChange("Info")} className={active==="Info" ? "font-bold" : ""}>Rules</button>
                    <button onClick={() => onChange("Game")} className={active==="Game" ? "font-bold" : ""}>Play</button>
                    <button onClick={() => onChange("RewardsBoard")} className={active==="RewardsBoard" ? "font-bold" : ""}>Rewards</button>
                </nav>

                {/* right: wallet */}
                <div className="flex items-center">
                    {/* Render nothing on the server to avoid mismatch; fill on client */}
                    {isClient && (isConnected ? <ConnectedButton /> : <ConnectWalletButton />)}
                </div>
            </div>
        </header>
    );
}
