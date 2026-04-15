"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";

type WalletCtx = {
    address: string | null;
    isConnected: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
};

const Ctx = createContext<WalletCtx | null>(null);

export function WaletContextProvider({ children }: { children: React.ReactNode }) {
    const { publicKey, connected, connect, disconnect } = useSolanaWallet();

    const value = useMemo<WalletCtx>(() => {
        return {
            address: publicKey?.toBase58() ?? null,
            isConnected: connected,
            connect: async () => {
                await connect();
            },
            disconnect: async () => {
                await disconnect();
            },
        };
    }, [publicKey, connected, connect, disconnect]);

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useWallet = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error("useWallet must be used within WaletContextProvider");
    return v;
};
