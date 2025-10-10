import React from 'react';

import './globals.css';

import {WaletContextProvider} from '@/contexts/WalletContext';
import { ContextProvider } from "@/contexts/ContextProvider";
import {WagmiWalletProvider} from "@/contexts/WasmiConfig";

// Providers

/**
 *
 * @param Children --> This will be the rendered component in the current page
 * @returns --> A wrapper of providers such as Session, WalletContext around the Children param
 */
type LayoutWrapperProps = {
    children: React.ReactNode;
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
    return (
        <WagmiWalletProvider>
            <WaletContextProvider>
                <ContextProvider>
                    {children}
                </ContextProvider>
            </WaletContextProvider>
        </WagmiWalletProvider>
    );
};

export default LayoutWrapper;
