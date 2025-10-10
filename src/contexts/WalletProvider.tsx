'use client';

import { WalletError } from '@solana/wallet-adapter-base';
import {WalletContextState} from '@solana/wallet-adapter-react';
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import React, {createContext, FC, ReactNode, useCallback, useMemo} from 'react';
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {PhantomWalletAdapter} from "@solana/wallet-adapter-phantom";
import {SolflareWalletAdapter} from "@solana/wallet-adapter-wallets";

// @ts-ignore
export const WalletContext = createContext<WalletContextState | null>(null);

export const WalletContextProvider: FC<{ children: ReactNode }> = ({
                                                                       children,
                                                                   }) => {
    const wallets = useMemo(() => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter()
        ], []
    );

    const onError = useCallback((error: WalletError) => {
        console.error(error);
    }, []);

    return (
        <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_HELIUS_URL || ""}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
                <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;
