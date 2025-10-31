import React, { useEffect, useMemo, useState, useCallback } from "react";

/** --- Jupiter / 555 theme palette --- */
const JUP = {
    neon: "#00FF9C",
    glow: "#00FFB2",
    aqua: "#13FFE2",
    dark: "#021013",
    dark2: "#041F1C",
    card: "rgba(6, 28, 24, 0.72)",
    stroke: "rgba(0,255,156,0.25)",
};

type LBRow = {
    wallet_address: string;
    best_score: number;
    plays: number;
    last_play: string; // ISO
};

type LBResponse = {
    ok: boolean;
    meta: { top: number; round: "current_hour" | "previous_hour" };
    overall: LBRow[];
    lastround: LBRow[];
};

const LoadingRow: React.FC = () => (
    <div className="animate-pulse grid grid-cols-12 items-center gap-2 rounded-xl p-3"
         style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${JUP.stroke}` }}>
        <div className="col-span-1 h-4 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="col-span-6 h-4 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="col-span-2 h-4 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="col-span-1 h-4 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="col-span-2 h-4 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
    </div>
);

const getErrorMessage = (e: unknown) => (e instanceof Error ? e.message : String(e));
const formatWallet = (w: string) => (w.length > 12 ? `${w.slice(0, 6)}…${w.slice(-4)}` : w);

const LeaderboardPage: React.FC = () => {
    const [data, setData] = useState<LBResponse | null>(null);
    const [tab, setTab] = useState<"overall" | "lastround">("lastround");
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setErr(null);
        try {
            const resp = await fetch("/api/leaderboard?top=20", { cache: "no-store" });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const json = (await resp.json()) as LBResponse;
            setData(json);
        } catch (e: unknown) {
            setErr(getErrorMessage(e));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
        const t = setInterval(load, 10_000);
        return () => clearInterval(t);
    }, [load]);

    const rows = useMemo(() => {
        if (!data) return [];
        return tab === "overall" ? data.overall : data.lastround;
    }, [data, tab]);

    const formatUtc = (iso: string) =>
        new Date(iso).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "UTC",
        }) + " UTC";

    const BG =
        "radial-gradient(900px 600px at 50% 0%, rgba(0,255,156,0.12), transparent), \
         radial-gradient(1000px 500px at 100% 100%, rgba(19,255,137,0.08), transparent), \
         linear-gradient(135deg, #021013 0%, #041F1C 100%)";

    return (
        <main className="min-h-screen w-full p-4" style={{ background: BG, color: "white" }}>
            <section className="mx-auto w-full max-w-6xl">
                {/* Header */}
                <div className="mb-6 text-center">
                    <div
                        className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm shadow backdrop-blur"
                        style={{
                            border: `1px solid ${JUP.stroke}`,
                            background: "rgba(0,0,0,0.35)",
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
                        className="mt-3 text-4xl font-extrabold tracking-tight drop-shadow"
                        style={{ color: JUP.neon, textShadow: `0 0 18px ${JUP.glow}` }}
                    >
                        Flappy-555 Leaderboard
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: "#C6FFF0" }}>
                        Auto-refreshes every 10s • Current hour & overall standings
                    </p>
                </div>

                {/* Tabs */}
                <div className="mb-4 flex justify-center">
                    <div
                        className="inline-flex rounded-xl p-1 shadow-sm backdrop-blur"
                        style={{ border: `1px solid ${JUP.stroke}`, background: "rgba(255,255,255,0.03)" }}
                    >
                        <button
                            onClick={() => setTab("lastround")}
                            className="rounded-lg px-4 py-2 text-sm font-semibold transition"
                            style={
                                tab === "lastround"
                                    ? {
                                        background: `linear-gradient(90deg, ${JUP.neon}, ${JUP.aqua})`,
                                        color: "#00140F",
                                        boxShadow: `0 0 18px ${JUP.neon}66`,
                                    }
                                    : { color: "#BFFFEF" }
                            }
                        >
                            This Hour ⏱️
                        </button>
                        <button
                            onClick={() => setTab("overall")}
                            className="rounded-lg px-4 py-2 text-sm font-semibold transition"
                            style={
                                tab === "overall"
                                    ? {
                                        background: `linear-gradient(90deg, ${JUP.neon}, ${JUP.aqua})`,
                                        color: "#00140F",
                                        boxShadow: `0 0 18px ${JUP.neon}66`,
                                    }
                                    : { color: "#BFFFEF" }
                            }
                        >
                            Overall 🏆
                        </button>
                    </div>
                </div>

                {/* Error */}
                {err && (
                    <div
                        className="mx-auto mb-4 max-w-2xl rounded-xl p-3 text-center"
                        style={{
                            border: "1px solid rgba(255, 99, 132, 0.3)",
                            background: "rgba(255, 99, 132, 0.08)",
                            color: "#ff9fb0",
                        }}
                    >
                        Failed to load: {err}
                    </div>
                )}

                {/* Table-ish list */}
                <div
                    className="rounded-2xl p-2 shadow backdrop-blur"
                    style={{
                        border: `1px solid ${JUP.stroke}`,
                        background: JUP.card,
                        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.02), 0 10px 40px ${JUP.neon}14`,
                    }}
                >
                    <div
                        className="grid grid-cols-12 items-center gap-2 rounded-lg p-3 text-[11px] font-semibold md:text-xs"
                        style={{ background: "rgba(255,255,255,0.03)", color: "#9FFFD9" }}
                    >
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-6">Wallet</div>
                        <div className="col-span-2 text-right">Best</div>
                        <div className="col-span-1 text-right">Plays</div>
                        <div className="col-span-2 text-right">Last Play (UTC)</div>
                    </div>

                    <div className="space-y-2 p-2">
                        {loading && (
                            <>
                                <LoadingRow />
                                <LoadingRow />
                                <LoadingRow />
                                <LoadingRow />
                                <LoadingRow />
                            </>
                        )}

                        {!loading && rows.length === 0 && (
                            <div
                                className="rounded-xl p-6 text-center"
                                style={{ background: "rgba(255,255,255,0.03)", color: "#BFFFEF" }}
                            >
                                No entries yet — be the first to score big! 🚀
                            </div>
                        )}

                        {!loading &&
                            rows.map((r, i) => (
                                <div
                                    key={`${r.wallet_address}-${r.last_play}-${r.best_score}-${i}`}
                                    className="grid grid-cols-12 items-center gap-2 rounded-xl p-3 transition"
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        border: `1px solid ${JUP.stroke}`,
                                    }}
                                >
                                    <div className="col-span-1 text-center font-semibold" style={{ color: "#E7FFF6" }}>
                                        {i + 1}
                                    </div>
                                    <div className="col-span-6 truncate font-mono text-sm" style={{ color: "#E7FFF6" }}>
                                        {formatWallet(r.wallet_address)}
                                    </div>
                                    <div
                                        className="col-span-2 text-right text-lg font-extrabold"
                                        style={{ color: JUP.neon, textShadow: `0 0 12px ${JUP.glow}` }}
                                    >
                                        {r.best_score}
                                    </div>
                                    <div className="col-span-1 text-right" style={{ color: "#BFFFEF" }}>
                                        {r.plays}
                                    </div>
                                    <div className="col-span-2 text-right text-[11px]" style={{ color: "#9FFFD9" }}>
                                        {formatUtc(r.last_play)}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Footnote */}
                {data && (
                    <p className="mt-3 text-center text-xs" style={{ color: "#9FFFD9" }}>
                        Scope: {data.meta.round.replace("_", " ")} (UTC). <span className="ml-1">🪐☄️</span>
                    </p>
                )}
            </section>
        </main>
    );
};

export default LeaderboardPage;
