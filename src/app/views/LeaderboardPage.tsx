import React, { useEffect, useMemo, useState, useCallback } from 'react';

type LBRow = {
    wallet_address: string;
    best_score: number;
    plays: number;
    last_play: string; // ISO
};

type LBResponse = {
    ok: boolean;
    meta: { top: number; round: 'current_hour' | 'previous_hour' };
    overall: LBRow[];
    lastround: LBRow[];
};

const LoadingRow: React.FC = () => (
    <div className="animate-pulse grid grid-cols-12 items-center gap-2 rounded-xl bg-white/60 p-3">
        <div className="col-span-1 h-4 rounded bg-gray-200" />
        <div className="col-span-6 h-4 rounded bg-gray-200" />
        <div className="col-span-2 h-4 rounded bg-gray-200" />
        <div className="col-span-1 h-4 rounded bg-gray-200" />
        <div className="col-span-2 h-4 rounded bg-gray-200" />
    </div>
);

const formatWallet = (w: string) =>
    w.length > 12 ? `${w.slice(0, 6)}…${w.slice(-4)}` : w;

const LeaderboardPage: React.FC = () => {
    const [data, setData] = useState<LBResponse | null>(null);
    const [tab, setTab] = useState<'overall' | 'lastround'>('lastround');
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setErr(null);
        try {
            const resp = await fetch('/api/leaderboard?top=20', { cache: 'no-store' });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const json = (await resp.json()) as LBResponse;
            setData(json);
        } catch (e: any) {
            setErr(e?.message || 'Failed to load');
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
        return tab === 'overall' ? data.overall : data.lastround;
    }, [data, tab]);

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
            <section className="mx-auto w-full max-w-6xl">
                {/* Header */}
                <div className="mb-6 text-center">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/60 px-4 py-1 text-sm backdrop-blur">
                        <span className="text-xl">✡️</span>
                        <span className="font-medium text-blue-700">Leaderboard</span>
                        <span className="text-xl">🪙</span>
                    </div>
                    <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900">
                        High Scores & Menschy Moves
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Overall champions and this-hour hot streaks — refreshed every 10s.
                    </p>
                </div>

                {/* Tabs */}
                <div className="mb-4 flex justify-center">
                    <div className="inline-flex rounded-xl border border-slate-200 bg-white/70 p-1 shadow-sm backdrop-blur">
                        <button
                            onClick={() => setTab('lastround')}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                                tab === 'lastround'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            This Hour ⏱️
                        </button>
                        <button
                            onClick={() => setTab('overall')}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                                tab === 'overall'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            Overall 🏆
                        </button>
                    </div>
                </div>

                {/* Error */}
                {err && (
                    <div className="mx-auto mb-4 max-w-2xl rounded-xl border border-rose-200 bg-rose-50 p-3 text-center text-rose-700">
                        Failed to load leaderboard: {err}
                    </div>
                )}

                {/* Table-ish list */}
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-2 shadow backdrop-blur">
                    <div className="grid grid-cols-12 items-center gap-2 rounded-lg bg-slate-50 p-3 text-xs font-semibold text-slate-600">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-6">Wallet</div>
                        <div className="col-span-2 text-right">Best Score</div>
                        <div className="col-span-1 text-right">Plays</div>
                        <div className="col-span-2 text-right">Last Play</div>
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
                                No entries yet — be the first to score big! 🕎
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
                                    <div className="col-span-2 text-right text-lg font-extrabold text-blue-700">
                                        {r.best_score}
                                    </div>
                                    <div className="col-span-1 text-right text-slate-700">{r.plays}</div>
                                    <div className="col-span-2 text-right text-xs text-slate-500">
                                        {new Date(r.last_play).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Footnote */}
                {data && (
                    <p className="mt-3 text-center text-xs text-slate-500">
                        Round scope: {data.meta.round.replace('_', ' ')} (UTC). ✡️ Keep flying, keep stacking 🪙
                    </p>
                )}
            </section>
        </main>
    );
};

export default LeaderboardPage;
