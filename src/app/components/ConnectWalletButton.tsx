'use client'

import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
    async () =>
        (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);

export default function ConnectWalletButton({size = "normal"}) {
    let className = "wallet-button-wrapper"
    if (size === "small") {
        className += "  inline-block transform scale-75 origin-center"
    }
    return (
        // <div className="wallet-button-wrapper">
        <div className={className}>
            <WalletMultiButtonDynamic />
        </div>
    );
}
