"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

type EvmWalletCtx = {
    address: `0x${string}` | null;
    isConnected: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
};

const Ctx = createContext<EvmWalletCtx | null>(null);

export function WaletContextProvider({ children }: { children: React.ReactNode }) {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    const value = useMemo<EvmWalletCtx>(() => {
        const injected = connectors.find((c) => c.id === "injected") ?? connectors[0];

        return {
            address: address ?? null,
            isConnected,
            connect: async () => {
                if (!injected) throw new Error("No EVM connector available");
                await connect({ connector: injected });
            },
            disconnect: async () => {
                await disconnect();
            },
        };
    }, [address, isConnected, connect, connectors, disconnect]);

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useWallet = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error("useEvmWallet must be used within EvmWalletContextProvider");
    return v;
};
