import React from "react";
import { Trophy, Coins, Flame, Clock, Star, Copy, Check, Wallet, ShieldCheck } from "lucide-react";
import ConnectWalletButton from "@/app/components/ConnectWalletButton";
import ConnectedButton from "@/app/components/ConnectedButton";
import {useWallet} from "@/contexts/WalletContext"

type InfoPageProps = {
    /** Optional: discreet CA pill shows if provided */
    contractAddress?: string;
};

const BNB_YELLOW = "#F0B90B";

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
        <main
            className="min-h-screen p-4"
            style={{
                background:
                    "radial-gradient(1200px 600px at 20% -10%, rgba(240,185,11,0.18), transparent), radial-gradient(1000px 500px at 120% 10%, rgba(220,38,38,0.10), transparent), linear-gradient(135deg, #fff 0%, #fffbe6 35%, #fff 100%)",
            }}
        >
            <div className="mx-auto max-w-7xl">
                {/* HERO */}
                <section className="mb-4 text-center">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-yellow-300/70 bg-white/80 px-4 py-1 text-sm shadow backdrop-blur">
                        <span className="text-lg">🏮</span>
                        <span className="font-medium text-yellow-700">BNB Chain • 币安智能链</span>
                        <span className="text-lg">🧧</span>
                    </div>

                    <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-red-700 md:text-6xl">
                        飞鸟冲天 · Flappy BNB 🐉
                    </h1>
                    <p className="mt-2 text-lg text-gray-700">
                        中国风好运起飞，冲分赢🧧红包！BNB 金币一路装满~ 🪙
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        Take flight with a Chinese New Year vibe—chase high scores and win red-packet rewards! Stack BNB as you go.
                    </p>

                    {/* Built for BNB */}
                    <div
                        className="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-1 text-sm font-semibold shadow"
                        style={{ backgroundColor: BNB_YELLOW, color: "#111827" }}
                    >
                        <span>⚡ Built for BNB Chain</span>
                        <span>•</span>
                        <span>低费用 · 高速度</span>
                        <span className="hidden sm:inline">• Low fees · High throughput</span>
                    </div>

                    {/* Inline connect banner */}
                    {!isConnected && (
                        <div className="mx-auto mt-4 inline-flex items-center gap-3 rounded-xl border border-yellow-300 bg-white/80 px-3 py-2 text-sm text-gray-800 shadow backdrop-blur">
                            <Wallet className="h-4 w-4" />
                            <span className="font-medium">Connect your wallet to earn rewards • 连接钱包以领取奖励</span>
                            <ConnectWalletButton size="small" />
                        </div>
                    )}
                </section>

                {/* WALLET & REWARDS (new) */}
                <section className="mb-8 rounded-2xl border border-amber-200 bg-white/85 p-5 shadow-lg backdrop-blur">
                    <div className="mb-3 flex items-center gap-2">
                        <Wallet className="h-6 w-6" style={{ color: BNB_YELLOW }} />
                        <h2 className="text-xl font-bold text-gray-900">Wallet & Rewards · 钱包与奖励</h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                            <p className="text-gray-800">
                                To receive hourly rewards, you must connect a wallet. We use your address to track high scores and send
                                payouts.
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                                <li>Rewards are mapped to your connected address.</li>
                                <li>No connection = no payout attribution.</li>
                            </ul>
                            <div className="mt-3">
                                {isConnected ? <ConnectedButton /> : <ConnectWalletButton size="small" />}
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                            <div className="mb-1 flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                                <p className="font-semibold text-gray-900">Read-only permissions · 只读权限</p>
                            </div>
                            <p className="text-sm text-gray-700">
                                Connecting your wallet <b>only</b> lets us read your public address and balance.
                                <br />
                                <span className="text-gray-600">
                  We will <b>never</b> request token approvals, transfers, or signatures that move funds.
                </span>
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-gray-600">
                                <li>仅读取地址与余额（不会转移资产）</li>
                                <li>不请求授权，不发起代币转账，不强制签名</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* TOP INFO STRIP */}
                <section className="mb-8 grid gap-4 md:grid-cols-3">
                    {/* Network */}
                    <div className="rounded-2xl border border-yellow-200 bg-white/80 p-5 shadow">
                        <div className="mb-2 flex items-center gap-2">
                            <Coins className="h-6 w-6" style={{ color: BNB_YELLOW }} />
                            <h3 className="text-lg font-bold text-gray-900">发行网络 · Network</h3>
                        </div>
                        <p className="text-gray-700">
                            BNB Chain（币安智能链）<span className="ml-1">🟨</span>
                        </p>
                        <p className="mt-1 text-sm text-gray-500">主打：高速、低 Gas、生态繁荣</p>
                        <p className="text-xs text-gray-500">Highlights: fast finality, low gas, vibrant ecosystem</p>
                    </div>

                    {/* Rewards source */}
                    <div className="rounded-2xl border border-red-200 bg-white/80 p-5 shadow">
                        <div className="mb-2 flex items-center gap-2">
                            <Trophy className="h-6 w-6 text-red-500" />
                            <h3 className="text-lg font-bold text-gray-900">奖励来源 · Rewards</h3>
                        </div>
                        <p className="text-gray-700">
                            奖励由<b>开发者钱包</b>定期发放 <span className="ml-1">🧧</span>
                        </p>
                        <p className="text-sm text-gray-600">Rewards funded and distributed from the developer wallet.</p>
                        <p className="mt-1 text-sm font-semibold text-green-700">无开发者手续费（No dev fees）</p>
                    </div>

                    {/* Rounds */}
                    <div className="rounded-2xl border border-amber-200 bg-white/80 p-5 shadow">
                        <div className="mb-2 flex items-center gap-2">
                            <Clock className="h-6 w-6 text-amber-600" />
                            <h3 className="text-lg font-bold text-gray-900">轮次 · Rounds</h3>
                        </div>
                        <p className="text-gray-700">每小时结算一次排名（UTC） ⏱️</p>
                        <p className="text-sm text-gray-600">Rewards Board settles hourly (UTC).</p>
                        <p className="mt-1 text-sm text-gray-500">上分！赢🧧红包！ / Climb the ranks to win red-packet rewards!</p>
                    </div>
                </section>

                {/* PRIZE POOL */}
                <section className="mb-8 rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-50 to-white p-6 shadow-lg">
                    <div className="mb-5 flex items-center">
                        <div
                            className="mr-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                            style={{ backgroundColor: BNB_YELLOW }}
                        >
                            <Trophy className="h-6 w-6 text-black" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">🧧 红包奖池 · Prize Pool</h2>
                    </div>

                    <div className="mb-5 rounded-2xl border border-yellow-200 bg-white/70 p-4">
                        <p className="text-center text-sm font-semibold text-gray-700">
                            每小时根据排行榜发放奖励（由开发者钱包注入）。<span className="ml-1">🪙</span>
                        </p>
                        <p className="text-center text-xs text-gray-500">
                            Rewards are distributed hourly based on the rewards board; funded by the developer wallet.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-200 p-5">
                            <div className="mb-2 flex items-center gap-2">
                                <Star className="h-6 w-6 text-yellow-700" />
                                <h3 className="text-xl font-bold text-yellow-900">第 1 名 / 1st Place</h3>
                            </div>
                            <p className="text-3xl font-extrabold text-yellow-800">30%</p>
                            <p className="mt-1 text-sm text-yellow-900/80">状元高分，财运亨通！🐉</p>
                            <p className="text-xs text-yellow-900/70">Top score, top luck!</p>
                        </div>

                        <div className="rounded-xl border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 p-5">
                            <div className="mb-2 flex items-center gap-2">
                                <Star className="h-6 w-6 text-gray-700" />
                                <h3 className="text-xl font-bold text-gray-900">第 2 名 / 2nd Place</h3>
                            </div>
                            <p className="text-3xl font-extrabold text-gray-800">15%</p>
                            <p className="mt-1 text-sm text-gray-700/80">银榜题名～</p>
                            <p className="text-xs text-gray-600">Silver spot on the board.</p>
                        </div>

                        <div className="rounded-xl border-2 border-orange-300 bg-gradient-to-br from-orange-100 to-amber-200 p-5">
                            <div className="mb-2 flex items-center gap-2">
                                <Star className="h-6 w-6 text-orange-700" />
                                <h3 className="text-xl font-bold text-orange-900">第 3 名 / 3rd Place</h3>
                            </div>
                            <p className="text-3xl font-extrabold text-orange-800">10%</p>
                            <p className="mt-1 text-sm text-orange-800/80">再接再厉！</p>
                            <p className="text-xs text-orange-700/80">Keep pushing!</p>
                        </div>

                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                            <h3 className="mb-1 text-lg font-semibold text-blue-900">第 4–5 名 / 4th–5th</h3>
                            <p className="text-2xl font-bold text-blue-700">5% / each</p>
                            <p className="text-xs text-blue-800/80">Reward per placement.</p>
                        </div>

                        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                            <h3 className="mb-1 text-lg font-semibold text-green-900">第 6–10 名 / 6th–10th</h3>
                            <p className="text-2xl font-bold text-green-700">1% / each</p>
                            <p className="text-xs text-green-800/80">Reward per placement.</p>
                        </div>

                        <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
                            <h3 className="mb-1 text-lg font-semibold text-rose-900">说明 · Notes</h3>
                            <p className="text-sm text-rose-900/80">无开发者手续费；奖励由开发者钱包直接发放并定期补充。🧧</p>
                            <p className="text-xs text-rose-900/70">
                                No developer fee; rewards come directly from a dev wallet and are topped up periodically.
                            </p>
                        </div>
                    </div>
                </section>

                {/* TOKEN MECHANICS */}
                <section className="mb-8 rounded-3xl border border-red-200 bg-white/80 p-6 shadow-lg">
                    <div className="mb-5 flex items-center">
                        <div className="mr-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100">
                            <Flame className="h-6 w-6 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">代币机制 · Token Mechanics</h2>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 p-6 text-center">
                        <p className="text-gray-700">
                            代币价值支持可选<strong>回购与销毁（Rebuy & Burn）</strong>策略，视活动与社区提案而定。🔥
                        </p>
                        <p className="text-sm text-gray-600">
                            Token value may be supported by optional <strong>Rebuy & Burn</strong> strategies based on events and community proposals.
                        </p>
                        <p className="mt-1 text-sm text-gray-500">重点：奖励来自开发者钱包，无平台抽成；BNB 网络低手续费加持。</p>
                        <p className="text-xs text-gray-500">Key points: rewards via developer wallet, no platform rake; powered by BNB’s low fees.</p>
                    </div>
                </section>

                {/* HOW TO PLAY */}
                <section className="mb-16 rounded-3xl border border-yellow-200 bg-white/80 p-6 shadow-lg">
                    <div className="mb-5 flex items-center">
                        <div
                            className="mr-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                            style={{ backgroundColor: BNB_YELLOW }}
                        >
                            <Coins className="h-6 w-6 text-black" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">怎么玩 · How to Play</h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
                            <div className="mb-2 text-3xl">🎮</div>
                            <h3 className="text-lg font-semibold text-gray-900">开始游戏 · Start</h3>
                            <p className="text-gray-600">躲避障碍，收集 BNB 金币 🪙</p>
                            <p className="text-xs text-gray-600">Avoid obstacles, collect BNB coins.</p>
                        </div>
                        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                            <div className="mb-2 text-3xl">🏆</div>
                            <h3 className="text-lg font-semibold text-gray-900">冲击高分 · Score</h3>
                            <p className="text-gray-600">登上小时榜单，领取🧧</p>
                            <p className="text-xs text-gray-600">Climb the hourly rewards board to claim red packets.</p>
                        </div>
                        <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
                            <div className="mb-2 text-3xl">💰</div>
                            <h3 className="text-lg font-semibold text-gray-900">领取奖励 · Claim</h3>
                            <p className="text-gray-600">每小时自动结算并发放</p>
                            <p className="text-xs text-gray-600">Payouts settle automatically every hour.</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Discreet CA pill */}
            {contractAddress && (
                <div className="pointer-events-auto fixed bottom-4 right-4 z-50">
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-2 text-xs text-slate-700 shadow backdrop-blur">
            <span className="font-semibold" style={{ color: BNB_YELLOW }}>
              CA
            </span>
                        <code className="max-w-[180px] truncate font-mono text-[11px] text-slate-800 md:max-w-[260px]">
                            {contractAddress}
                        </code>
                        <button
                            onClick={copyCA}
                            className="inline-flex h-6 items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 hover:bg-slate-100 active:scale-[0.98]"
                            title="复制合约地址 / Copy contract address"
                        >
                            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            <span className="hidden sm:inline">{copied ? "已复制" : "复制"}</span>
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default InfoPage;
