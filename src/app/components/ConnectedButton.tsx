"use client";
import React from "react";
import { useWallet } from "@/contexts/WalletContext";

const shorten = (address?: string | null) =>
    address ? `${address.slice(0, 5)}...${address.slice(-5)}` : "";

export default function ConnectedButton() {
    const { address, isConnected, disconnect } = useWallet();

    if (!isConnected) return null;

    return (
        <button
            onClick={() => disconnect()}
            className="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-yellow-700 hover:bg-yellow-100 shadow-sm"
        >
            <span className="font-semibold text-sm">{shorten(address)}</span>
            <svg className="ml-2 h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 16l4-4-4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 12h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
}
