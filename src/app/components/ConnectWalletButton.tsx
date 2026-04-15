"use client";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);

export default function ConnectWalletButton({ size = "normal" }: { size?: "normal" | "small" }) {
    const className = size === "small"
        ? "wallet-button-wrapper inline-block origin-center scale-90"
        : "wallet-button-wrapper";

    return (
        <div className={className}>
            <WalletMultiButton />
        </div>
    );
}
