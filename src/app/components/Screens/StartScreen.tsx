import React from "react";
import Button from "../Button";

type StartScreenProps = {
    onStart: () => void;
    highScore: number;
    imageLoading?: boolean;
    imageError?: boolean;
};

const StartScreen: React.FC<StartScreenProps> = ({
                                                     onStart,
                                                     highScore,
                                                     imageLoading,
                                                     imageError,
                                                 }) => {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 text-white p-5 backdrop-blur">
            {/* Centered header + status + CTA */}
            <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-extrabold text-red-400">飞鸟冲天 · Flappy BNB 🐉</h2>
                <p className="mt-1 text-xs text-white/70">
                    点击或按空格键开始 / Click or press SPACE to start
                </p>

                {imageLoading && (
                    <p className="mt-2 text-yellow-300 text-sm animate-pulse">
                        正在加载自定义角色… / Loading custom character…
                    </p>
                )}
                {imageError && (
                    <p className="mt-2 text-orange-300 text-sm">
                        使用默认角色 / Using default character
                    </p>
                )}

                <div className="mt-3">
                    {/* Force a red button using className (overrides Button's default styles) */}
                    <Button
                        size="lg"
                        onClick={onStart}
                        className="bg-red-600 hover:bg-red-500 active:bg-red-700 text-white shadow-lg px-6"
                    >
                        开始游戏 · Start
                    </Button>
                </div>

                {highScore > 0 && (
                    <div className="mt-3 rounded-md border border-yellow-400/50 bg-yellow-400/10 px-3 py-2">
                        <p className="m-0 text-sm">
                            最高分 / High Score:{" "}
                            <span className="font-bold text-yellow-300">{highScore}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Left-aligned instructions (not centered) */}
            <div className="mt-4 space-y-1 text-sm text-white/85 text-left">
                <p>避开“蜡烛”🕯️（K 线）/ Avoid the candles (K-lines)!</p>
                <p>让 CZ 飞！/ Let CZ fly!</p>
                <p>冲分上榜，🧧 红包每小时发放 / Climb the board—rewards hourly.</p>
                <p className="text-white/60">加油！起飞！/ Jiāyóu! Time to take off!</p>
            </div>
        </div>
    );
};

export default StartScreen;
