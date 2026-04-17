"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet, type Wallet } from "@solana/wallet-adapter-react";

const JUPITER_WALLET_URL = "https://docs.jup.ag/user-docs/manage/extension-wallet/security-and-settings";

function getWalletPriority(wallet: Wallet) {
    switch (wallet.readyState) {
        case WalletReadyState.Installed:
            return 0;
        case WalletReadyState.Loadable:
            return 1;
        case WalletReadyState.NotDetected:
            return 2;
        case WalletReadyState.Unsupported:
            return 3;
        default:
            return 4;
    }
}

function getWalletBadge(wallet: Wallet) {
    switch (wallet.readyState) {
        case WalletReadyState.Installed:
            return "Detected";
        case WalletReadyState.Loadable:
            return "Ready";
        case WalletReadyState.NotDetected:
            return "Install";
        case WalletReadyState.Unsupported:
            return "Unsupported";
        default:
            return "";
    }
}

export default function ConnectWalletButton({ size = "normal" }: { size?: "normal" | "small" }) {
    const { wallets, select } = useWallet();
    const [isOpen, setIsOpen] = useState(false);

    const className = size === "small"
        ? "wallet-button-wrapper inline-block origin-center scale-90"
        : "wallet-button-wrapper";

    const sortedWallets = useMemo(
        () =>
            [...wallets].sort((a, b) => {
                const priorityDiff = getWalletPriority(a) - getWalletPriority(b);
                if (priorityDiff !== 0) {
                    return priorityDiff;
                }

                return a.adapter.name.localeCompare(b.adapter.name);
            }),
        [wallets]
    );

    const hasJupiterWallet = useMemo(
        () => sortedWallets.some((wallet) => wallet.adapter.name.toLowerCase().includes("jupiter")),
        [sortedWallets]
    );

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen]);

    const handleWalletClick = (wallet: Wallet) => {
        if (wallet.readyState === WalletReadyState.Unsupported) {
            return;
        }

        if (wallet.readyState === WalletReadyState.NotDetected) {
            setIsOpen(false);
            window.open(wallet.adapter.url, "_blank", "noopener,noreferrer");
            return;
        }

        select(wallet.adapter.name);
        setIsOpen(false);
    };

    const handleJupiterClick = () => {
        setIsOpen(false);
        window.open(JUPITER_WALLET_URL, "_blank", "noopener,noreferrer");
    };

    return (
        <>
            <div className={className}>
                <button
                    type="button"
                    className="wallet-adapter-button wallet-adapter-button-trigger"
                    onClick={() => setIsOpen(true)}
                >
                    Select Wallet
                </button>
            </div>

            {isOpen ? (
                <div
                    className="wallet-picker-overlay"
                    onClick={() => setIsOpen(false)}
                    role="presentation"
                >
                    <div
                        className="wallet-picker-modal"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Select a wallet"
                    >
                        <div className="wallet-picker-header">
                            <div>
                                <h3 className="wallet-picker-title">Connect Wallet</h3>
                                <p className="wallet-picker-subtitle">Choose a wallet to continue.</p>
                            </div>
                            <button
                                type="button"
                                className="wallet-picker-close"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close wallet picker"
                            >
                                x
                            </button>
                        </div>

                        <div className="wallet-picker-list">
                            {sortedWallets.map((wallet) => (
                                <button
                                    key={wallet.adapter.name}
                                    type="button"
                                    className="wallet-picker-item"
                                    onClick={() => handleWalletClick(wallet)}
                                    disabled={wallet.readyState === WalletReadyState.Unsupported}
                                >
                                    <div className="wallet-picker-item-main">
                                        <Image
                                            src={wallet.adapter.icon}
                                            alt=""
                                            className="wallet-picker-icon"
                                            width={36}
                                            height={36}
                                            unoptimized
                                        />
                                        <span className="wallet-picker-name">{wallet.adapter.name}</span>
                                    </div>
                                    <span className="wallet-picker-badge">
                                        {getWalletBadge(wallet)}
                                    </span>
                                </button>
                            ))}

                            {!hasJupiterWallet ? (
                                <button
                                    type="button"
                                    className="wallet-picker-item wallet-picker-item-jupiter"
                                    onClick={handleJupiterClick}
                                >
                                    <div className="wallet-picker-item-main">
                                        <span className="wallet-picker-jupiter-icon">J</span>
                                        <div className="wallet-picker-jupiter-copy">
                                            <span className="wallet-picker-name">Jupiter Wallet</span>
                                            <span className="wallet-picker-help">
                                                Opens Jupiter&apos;s official extension wallet page.
                                            </span>
                                        </div>
                                    </div>
                                    <span className="wallet-picker-badge">Open</span>
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
