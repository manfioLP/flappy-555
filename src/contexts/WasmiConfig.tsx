"use client";

import React from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { bsc } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const rpcUrl =
    process.env.NEXT_PUBLIC_BSC_RPC_URL || "https://bsc-dataseed.binance.org";

export const wagmiConfig = createConfig({
    chains: [bsc],
    connectors: [injected({ shimDisconnect: true })], // MetaMask / Rabby / Trust / OKX…
    transports: { [bsc.id]: http(rpcUrl) },
    multiInjectedProviderDiscovery: true,
});

const queryClient = new QueryClient();

export function WagmiWalletProvider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
}
