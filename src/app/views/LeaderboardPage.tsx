import React, { useEffect, useMemo, useState, useCallback } from "react";

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

const BNB_YELLOW = "#F0B90B";

const LoadingRow: React.FC = () => (
    <div className="animate-pulse grid grid-cols-12 items-center gap-2 rounded-xl bg-white/60 p-3">
        <div className="col-span-1 h-4 rounded bg-gray-200" />
        <div className="col-span-6 h-4 rounded bg-gray-200" />
        <div className="col-span-2 h-4 rounded bg-gray-200" />
        <div className="col-span-1 h-4 rounded bg-gray-200" />
        <div className="col-span-2 h-4 rounded bg-gray-200" />
    </div>
);

const getErrorMessage = (e: unknown) =>
    e instanceof Error ? e.message : String(e);

const formatWallet = (w: string) =>
    w.length > 12 ? `${w.slice(0, 6)}…${w.slice(-4)}` : w;

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

    return (
        <main
            className="min-h-screen w-full p-4"
            style={{
                background:
                    "radial-gradient(1200px 600px at 20% -10%, rgba(240,185,11,0.18), transparent), radial-gradient(1000px 500px at 120% 10%, rgba(220,38,38,0.10), transparent), linear-gradient(135deg, #fff 0%, #fffbe6 35%, #fff 100%)",
            }}
        >
            <section className="mx-auto w-full max-w-6xl">
                {/* Header */}
                <div className="mb-6 text-center">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-yellow-300/70 bg-white/80 px-4 py-1 text-sm shadow backdrop-blur">
                        <span className="text-lg">🏮</span>
                        <span className="font-medium text-yellow-700">BNB Chain • 币安智能链</span>
                        <span className="text-lg">🧧</span>
                    </div>

                    <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900">
                        排行榜 · Rewards Board
                    </h1>
                    <p className="mt-1 text-gray-700">
                        每 10 秒自动刷新；展示本小时与历史总榜。<span className="ml-1">⏱️</span>
                    </p>
                    <p className="text-sm text-gray-500">
                        Auto-refreshes every 10 seconds; shows this hour and overall leaders.
                    </p>
                </div>

                {/* Tabs */}
                <div className="mb-4 flex justify-center">
                    <div className="inline-flex rounded-xl border border-slate-200 bg-white/70 p-1 shadow-sm backdrop-blur">
                        <button
                            onClick={() => setTab("lastround")}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                                tab === "lastround"
                                    ? "text-black"
                                    : "text-slate-700 hover:bg-slate-100"
                            }`}
                            style={
                                tab === "lastround"
                                    ? { backgroundColor: BNB_YELLOW }
                                    : undefined
                            }
                        >
                            本小时 ⏱️ <span className="ml-1 hidden sm:inline">/ This Hour</span>
                        </button>
                        <button
                            onClick={() => setTab("overall")}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                                tab === "overall"
                                    ? "text-black"
                                    : "text-slate-700 hover:bg-slate-100"
                            }`}
                            style={
                                tab === "overall" ? { backgroundColor: BNB_YELLOW } : undefined
                            }
                        >
                            历史总榜 🏆 <span className="ml-1 hidden sm:inline">/ Overall</span>
                        </button>
                    </div>
                </div>

                {/* Error */}
                {err && (
                    <div className="mx-auto mb-4 max-w-2xl rounded-xl border border-rose-200 bg-rose-50 p-3 text-center">
                        <p className="text-rose-700">
                            加载失败：{err}
                            <span className="ml-1 text-rose-600/80">/ Failed to load</span>
                        </p>
                    </div>
                )}

                {/* Table-ish list */}
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-2 shadow backdrop-blur">
                    <div className="grid grid-cols-12 items-center gap-2 rounded-lg bg-slate-50 p-3 text-[11px] font-semibold text-slate-600 md:text-xs">
                        <div className="col-span-1 text-center">排名</div>
                        <div className="col-span-6">钱包地址</div>
                        <div className="col-span-2 text-right">最佳分数</div>
                        <div className="col-span-1 text-right">次数</div>
                        <div className="col-span-2 text-right">最近游戏</div>

                        <div className="col-span-1 text-center hidden md:block text-[10px] text-slate-500">
                            #
                        </div>
                        <div className="col-span-6 hidden md:block text-[10px] text-slate-500">
                            Wallet
                        </div>
                        <div className="col-span-2 hidden md:block text-right text-[10px] text-slate-500">
                            Best
                        </div>
                        <div className="col-span-1 hidden md:block text-right text-[10px] text-slate-500">
                            Plays
                        </div>
                        <div className="col-span-2 hidden md:block text-right text-[10px] text-slate-500">
                            Last Play (UTC)
                        </div>
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
                            <div className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">
                                暂无记录，成为第一个冲分的勇士吧！🧧
                                <div className="text-xs text-slate-500">
                                    No entries yet — be the first to score big!
                                </div>
                            </div>
                        )}

                        {!loading &&
                            rows.map((r, i) => (
                                <div
                                    key={`${r.wallet_address}-${r.last_play}-${r.best_score}-${i}`}
                                    className="grid grid-cols-12 items-center gap-2 rounded-xl bg-white p-3 hover:bg-slate-50"
                                >
                                    <div className="col-span-1 text-center font-semibold text-slate-700">
                                        {i + 1}
                                    </div>
                                    <div className="col-span-6 truncate font-mono text-sm text-slate-800">
                                        {formatWallet(r.wallet_address)}
                                    </div>
                                    <div className="col-span-2 text-right text-lg font-extrabold"
                                         style={{ color: BNB_YELLOW }}>
                                        {r.best_score}
                                    </div>
                                    <div className="col-span-1 text-right text-slate-700">
                                        {r.plays}
                                    </div>
                                    <div className="col-span-2 text-right text-[11px] text-slate-500">
                                        {formatUtc(r.last_play)}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Footnote */}
                {data && (
                    <p className="mt-3 text-center text-xs text-slate-600">
                        统计范围：{data.meta.round === "current_hour" ? "本小时" : "上一小时"}（UTC）
                        <span className="mx-1">•</span>
                        Scope: {data.meta.round.replace("_", " ")} (UTC).{" "}
                        <span className="ml-1">🐉🪙</span>
                    </p>
                )}
            </section>
        </main>
    );
};

export default LeaderboardPage;
