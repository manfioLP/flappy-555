import React from "react";
import {
    Trophy,
    Coins,
    Flame,
    Clock,
    Star,
    Copy,
    Check,
    Wallet,
    ShieldCheck,
} from "lucide-react";
import ConnectWalletButton from "@/app/components/ConnectWalletButton";
import ConnectedButton from "@/app/components/ConnectedButton";
import { useWallet } from "@/contexts/WalletContext";

type InfoPageProps = {
    /** Optional: discreet CA pill shows if provided */
    contractAddress?: string;
};

/** Jupiter / 555 palette */
const JUP = {
    neon: "#00FF9C",
    glow: "#00FFB2",
    aqua: "#13FFE2",
    dark: "#021013",
    dark2: "#041F1C",
    stroke: "rgba(0,255,156,0.25)",
    card: "rgba(6, 28, 24, 0.72)",
};
const BG =
    "radial-gradient(900px 600px at 50% 0%, rgba(0,255,156,0.12), transparent), \
     radial-gradient(1000px 500px at 100% 100%, rgba(19,255,137,0.08), transparent), \
     linear-gradient(135deg, #021013 0%, #041F1C 100%)";

const InfoPage: React.FC<InfoPageProps> = ({ contractAddress }) => {
    const [copied, setCopied] = React.useState(false);
    const copyCA = async () => {
        if (!contractAddress) return;
        try {
            await navigator.clipboard.writeText(contractAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch {}
    };

    const { isConnected } = useWallet();

    return (
        <main className="min-h-screen p-4" style={{ background: BG, color: "white" }}>
            <div className="mx-auto max-w-7xl">
                {/* HERO */}
                <section className="mb-6 text-center">
                    <div
                        className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm shadow backdrop-blur"
                        style={{
                            background: "rgba(0,0,0,0.35)",
                            border: `1px solid ${JUP.stroke}`,
                            boxShadow: `0 0 16px ${JUP.neon}22`,
                        }}
                    >
                        <span className="text-lg">🪐</span>
                        <span className="font-medium" style={{ color: JUP.aqua }}>
              Jupiter • Solana
            </span>
                        <span className="text-lg">☄️</span>
                    </div>

                    <h1
                        className="mt-3 text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow"
                        style={{ color: JUP.neon, textShadow: `0 0 20px ${JUP.glow}` }}
                    >
                        Flappy-555
                    </h1>
                    <p className="mt-2 text-lg" style={{ color: "#C6FFF0" }}>
                        Fly through neon space, dodge pipes, and climb the hourly board. Green. Fast.
                        Futurish. 🚀
                    </p>
                    <p className="mt-1 text-sm" style={{ color: "#9FFFD9" }}>
                        Built for the Jupiter/555 vibe on Solana — low fees, high speed, pure glow.
                    </p>

                    {/* Inline connect banner */}
                    {!isConnected && (
                        <div
                            className="mx-auto mt-4 inline-flex items-center gap-3 rounded-xl px-3 py-2 text-sm shadow backdrop-blur"
                            style={{
                                border: `1px solid ${JUP.stroke}`,
                                background: "rgba(0,0,0,0.35)",
                                color: "#E7FFF6",
                            }}
                        >
                            <Wallet className="h-4 w-4" />
                            <span className="font-medium">
                Connect your wallet to track scores & earn rewards
              </span>
                            <ConnectWalletButton size="small" />
                        </div>
                    )}
                </section>

                {/* WALLET & REWARDS */}
                <section
                    className="mb-8 rounded-2xl p-5 shadow-lg backdrop-blur"
                    style={{ border: `1px solid ${JUP.stroke}`, background: JUP.card }}
                >
                    <div className="mb-3 flex items-center gap-2">
                        <Wallet className="h-6 w-6" style={{ color: JUP.neon }} />
                        <h2 className="text-xl font-bold" style={{ color: "#E7FFF6" }}>
                            Wallet & Rewards
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div
                            className="rounded-xl p-4"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: `1px solid ${JUP.stroke}`,
                            }}
                        >
                            <p style={{ color: "#CFFFEF" }}>
                                To receive hourly rewards, connect a wallet. Your address maps to your
                                high scores and payouts.
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm" style={{ color: "#9FFFD9" }}>
                                <li>Rewards attribute to your connected address.</li>
                                <li>No connection = no payout attribution.</li>
                            </ul>
                            <div className="mt-3">
                                {isConnected ? <ConnectedButton /> : <ConnectWalletButton size="small" />}
                            </div>
                        </div>

                        <div
                            className="rounded-xl p-4"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: `1px solid ${JUP.stroke}`,
                            }}
                        >
                            <div className="mb-1 flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5" style={{ color: JUP.aqua }} />
                                <p className="font-semibold" style={{ color: "#E7FFF6" }}>
                                    Read-only permissions
                                </p>
                            </div>
                            <p className="text-sm" style={{ color: "#BFFFEF" }}>
                                Connecting your wallet <b>only</b> reads your public address/balance.
                                <br />
                                <span style={{ color: "#9FFFD9" }}>
                  We will <b>never</b> request approvals or transfers.
                </span>
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs" style={{ color: "#9FFFD9" }}>
                                <li>Read-only (no asset movement)</li>
                                <li>No token approvals, no forced signatures</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* TOP INFO STRIP */}
                <section className="mb-8 grid gap-4 md:grid-cols-3">
                    {/* Network */}
                    <div
                        className="rounded-2xl p-5 shadow"
                        style={{ background: JUP.card, border: `1px solid ${JUP.stroke}` }}
                    >
                        <div className="mb-2 flex items-center gap-2">
                            <Coins className="h-6 w-6" style={{ color: JUP.neon }} />
                            <h3 className="text-lg font-bold" style={{ color: "#E7FFF6" }}>
                                Network
                            </h3>
                        </div>
                        <p style={{ color: "#CFFFEF" }}>Solana <span className="ml-1">🟩</span></p>
                        <p className="mt-1 text-sm" style={{ color: "#9FFFD9" }}>
                            Ultra-low fees, fast finality, thriving ecosystem.
                        </p>
                    </div>

                    {/* Rewards source */}
                    <div
                        className="rounded-2xl p-5 shadow"
                        style={{ background: JUP.card, border: `1px solid ${JUP.stroke}` }}
                    >
                        <div className="mb-2 flex items-center gap-2">
                            <Trophy className="h-6 w-6" style={{ color: JUP.aqua }} />
                            <h3 className="text-lg font-bold" style={{ color: "#E7FFF6" }}>
                                Rewards
                            </h3>
                        </div>
                        <p style={{ color: "#CFFFEF" }}>
                            Rewards are funded and distributed by the developer wallet.
                        </p>
                        <p className="mt-1 text-sm" style={{ color: "#9FFFD9" }}>
                            No developer fees.
                        </p>
                    </div>

                    {/* Rounds */}
                    <div
                        className="rounded-2xl p-5 shadow"
                        style={{ background: JUP.card, border: `1px solid ${JUP.stroke}` }}
                    >
                        <div className="mb-2 flex items-center gap-2">
                            <Clock className="h-6 w-6" style={{ color: JUP.neon }} />
                            <h3 className="text-lg font-bold" style={{ color: "#E7FFF6" }}>
                                Rounds
                            </h3>
                        </div>
                        <p style={{ color: "#CFFFEF" }}>Leaderboard settles hourly (UTC) ⏱️</p>
                        <p className="text-sm" style={{ color: "#9FFFD9" }}>
                            Climb the ranks to earn.
                        </p>
                    </div>
                </section>

                {/* PRIZE POOL */}
                <section
                    className="mb-8 rounded-3xl p-6 shadow-lg"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(0,255,156,0.08), rgba(19,255,226,0.06))",
                        border: `1px solid ${JUP.stroke}`,
                    }}
                >
                    <div className="mb-5 flex items-center">
                        <div
                            className="mr-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                            style={{ background: "rgba(0,255,156,0.18)", boxShadow: `0 0 16px ${JUP.neon}44` }}
                        >
                            <Trophy className="h-6 w-6" style={{ color: JUP.neon }} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#E7FFF6" }}>
                            Prize Pool
                        </h2>
                    </div>

                    <div
                        className="mb-5 rounded-2xl p-4 text-center"
                        style={{ background: JUP.card, border: `1px solid ${JUP.stroke}` }}
                    >
                        <p className="text-sm font-semibold" style={{ color: "#BFFFEF" }}>
                            Rewards are distributed hourly based on the leaderboard.
                        </p>
                        <p className="text-xs" style={{ color: "#9FFFD9" }}>
                            Funded by the developer wallet.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div
                            className="rounded-xl p-5"
                            style={{
                                border: `2px solid ${JUP.neon}`,
                                background:
                                    "linear-gradient(180deg, rgba(0,255,156,0.18), rgba(0,255,156,0.06))",
                                boxShadow: `0 0 24px ${JUP.neon}33`,
                            }}
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <Star className="h-6 w-6" style={{ color: JUP.neon }} />
                                <h3 className="text-xl font-bold" style={{ color: "#E7FFF6" }}>
                                    1st Place
                                </h3>
                            </div>
                            <p className="text-3xl font-extrabold" style={{ color: JUP.neon, textShadow: `0 0 12px ${JUP.glow}` }}>
                                30%
                            </p>
                            <p className="mt-1 text-sm" style={{ color: "#CFFFEF" }}>
                                Top score, top glow.
                            </p>
                        </div>

                        <div
                            className="rounded-xl p-5"
                            style={{ border: `1px solid ${JUP.stroke}`, background: JUP.card }}
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <Star className="h-6 w-6" style={{ color: JUP.aqua }} />
                                <h3 className="text-xl font-bold" style={{ color: "#E7FFF6" }}>
                                    2nd Place
                                </h3>
                            </div>
                            <p className="text-3xl font-extrabold" style={{ color: "#C6FFF0" }}>
                                15%
                            </p>
                            <p className="mt-1 text-sm" style={{ color: "#9FFFD9" }}>
                                Strong orbit.
                            </p>
                        </div>

                        <div
                            className="rounded-xl p-5"
                            style={{ border: `1px solid ${JUP.stroke}`, background: JUP.card }}
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <Star className="h-6 w-6" style={{ color: "#8BFFE7" }} />
                                <h3 className="text-xl font-bold" style={{ color: "#E7FFF6" }}>
                                    3rd Place
                                </h3>
                            </div>
                            <p className="text-3xl font-extrabold" style={{ color: "#BFFFEF" }}>
                                10%
                            </p>
                            <p className="mt-1 text-sm" style={{ color: "#9FFFD9" }}>
                                Keep rising.
                            </p>
                        </div>

                        <div className="rounded-xl p-5" style={{ border: `1px solid ${JUP.stroke}`, background: JUP.card }}>
                            <h3 className="mb-1 text-lg font-semibold" style={{ color: "#E7FFF6" }}>
                                4th–5th
                            </h3>
                            <p className="text-2xl font-bold" style={{ color: "#C6FFF0" }}>
                                5% / each
                            </p>
                            <p className="text-xs" style={{ color: "#9FFFD9" }}>
                                Reward per placement.
                            </p>
                        </div>

                        <div className="rounded-xl p-5" style={{ border: `1px solid ${JUP.stroke}`, background: JUP.card }}>
                            <h3 className="mb-1 text-lg font-semibold" style={{ color: "#E7FFF6" }}>
                                6th–10th
                            </h3>
                            <p className="text-2xl font-bold" style={{ color: "#BFFFEF" }}>
                                1% / each
                            </p>
                            <p className="text-xs" style={{ color: "#9FFFD9" }}>
                                Reward per placement.
                            </p>
                        </div>

                        <div className="rounded-xl p-5" style={{ border: `1px solid ${JUP.stroke}`, background: JUP.card }}>
                            <h3 className="mb-1 text-lg font-semibold" style={{ color: "#E7FFF6" }}>
                                Notes
                            </h3>
                            <p className="text-sm" style={{ color: "#CFFFEF" }}>
                                No developer fee; rewards come directly from a dev wallet and are topped up periodically.
                            </p>
                        </div>
                    </div>
                </section>

                {/* TOKEN MECHANICS */}
                <section
                    className="mb-8 rounded-3xl p-6 shadow-lg"
                    style={{ background: JUP.card, border: `1px solid ${JUP.stroke}` }}
                >
                    <div className="mb-5 flex items-center">
                        <div
                            className="mr-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                            style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                            <Flame className="h-6 w-6" style={{ color: JUP.aqua }} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#E7FFF6" }}>
                            Token Mechanics
                        </h2>
                    </div>

                    <div
                        className="rounded-2xl p-6 text-center"
                        style={{
                            background: "linear-gradient(180deg, rgba(19,255,226,0.08), rgba(0,255,156,0.06))",
                            border: `1px solid ${JUP.stroke}`,
                        }}
                    >
                        <p style={{ color: "#CFFFEF" }}>
                            Optional <strong>Rebuy & Burn</strong> strategies may support value based on events and community proposals.
                        </p>
                        <p className="text-sm" style={{ color: "#9FFFD9" }}>
                            Rewards via developer wallet; no platform rake.
                        </p>
                    </div>
                </section>

                {/* HOW TO PLAY */}
                <section
                    className="mb-16 rounded-3xl p-6 shadow-lg"
                    style={{ background: JUP.card, border: `1px solid ${JUP.stroke}` }}
                >
                    <div className="mb-5 flex items-center">
                        <div
                            className="mr-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                            style={{ background: "rgba(0,255,156,0.18)" }}
                        >
                            <Coins className="h-6 w-6" style={{ color: JUP.neon }} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#E7FFF6" }}>
                            How to Play
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div
                            className="rounded-xl p-6 text-center"
                            style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${JUP.stroke}` }}
                        >
                            <div className="mb-2 text-3xl">🎮</div>
                            <h3 className="text-lg font-semibold" style={{ color: "#E7FFF6" }}>
                                Start
                            </h3>
                            <p style={{ color: "#BFFFEF" }}>Tap/space to fly through neon pipes.</p>
                        </div>
                        <div
                            className="rounded-xl p-6 text-center"
                            style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${JUP.stroke}` }}
                        >
                            <div className="mb-2 text-3xl">🏆</div>
                            <h3 className="text-lg font-semibold" style={{ color: "#E7FFF6" }}>
                                Score
                            </h3>
                            <p style={{ color: "#BFFFEF" }}>Climb the hourly leaderboard to earn.</p>
                        </div>
                        <div
                            className="rounded-xl p-6 text-center"
                            style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${JUP.stroke}` }}
                        >
                            <div className="mb-2 text-3xl">💰</div>
                            <h3 className="text-lg font-semibold" style={{ color: "#E7FFF6" }}>
                                Claim
                            </h3>
                            <p style={{ color: "#BFFFEF" }}>Rewards settle automatically every hour.</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Discreet CA pill */}
            {contractAddress && (
                <div className="pointer-events-auto fixed bottom-4 right-4 z-50">
                    <div
                        className="flex items-center gap-2 rounded-full px-3 py-2 text-xs shadow backdrop-blur"
                        style={{
                            background: "rgba(0,0,0,0.35)",
                            border: `1px solid ${JUP.stroke}`,
                            color: "#E7FFF6",
                        }}
                    >
            <span className="font-semibold" style={{ color: JUP.neon }}>
              CA
            </span>
                        <code className="max-w-[180px] md:max-w-[260px] truncate font-mono text-[11px]">
                            {contractAddress}
                        </code>
                        <button
                            onClick={copyCA}
                            className="inline-flex h-6 items-center gap-1 rounded-full px-2 active:scale-[0.98]"
                            style={{ border: `1px solid ${JUP.stroke}`, background: "rgba(255,255,255,0.05)" }}
                            title="Copy contract address"
                        >
                            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default InfoPage;
