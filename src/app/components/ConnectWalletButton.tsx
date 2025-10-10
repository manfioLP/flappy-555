"use client";
import React from "react";
import { useConnect } from "wagmi";

export default function ConnectWalletButton({ size = "normal" }: { size?: "normal" | "small" }) {
    const { connectors, connect, status } = useConnect();
    const injected = connectors.find((c) => c.id === "injected") ?? connectors[0];

    const className =
        "inline-flex items-center rounded-full px-4 py-2 font-semibold text-sm text-black bg-yellow-400 hover:bg-yellow-300 shadow " +
        (size === "small" ? "scale-90" : "");

    return (
        <button
            className={className}
            onClick={() => injected && connect({ connector: injected })}
            disabled={status === "pending"}
            title="Connect EVM wallet (BNB)"
        >
            {status === "pending" ? "Connecting…" : "Connect Wallet"}
        </button>
    );
}
