"use client";

import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);

const JUPITER_WALLET_URL = "https://docs.jup.ag/user-docs/manage/extension-wallet/security-and-settings";

export default function ConnectWalletButton({ size = "normal" }: { size?: "normal" | "small" }) {
    const className = size === "small"
        ? "wallet-button-wrapper inline-block origin-center scale-90"
        : "wallet-button-wrapper";

    return (
        <div className={className}>
            <WalletMultiButton />
            <a
                href={JUPITER_WALLET_URL}
                target="_blank"
                rel="noreferrer"
                className="wallet-install-hint"
            >
                Need Jupiter Wallet? Install it, then it will appear in the wallet list.
            </a>
        </div>
    );
}
