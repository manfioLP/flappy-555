import React from "react";
import Button from "../Button";

type StartScreenProps = {
    onStart: () => void;
    highScore: number;
    imageLoading?: boolean;
    imageError?: boolean;
};

const JUP = {
    neon: "#00FF9C",
    glow: "#00FFB2",
    aqua: "#13FFE2",
    stroke: "rgba(0,255,156,0.25)",
};

const StartScreen: React.FC<StartScreenProps> = ({
                                                     onStart,
                                                     highScore,
                                                     imageLoading,
                                                     imageError,
                                                 }) => {
    return (
        <div
            className="rounded-2xl p-6 text-white text-center backdrop-blur-xl shadow-lg max-w-md mx-auto"
            style={{
                border: `1px solid ${JUP.stroke}`,
                background: "rgba(6,28,24,0.65)",
                boxShadow: `0 0 25px ${JUP.neon}22, inset 0 0 10px ${JUP.neon}11`,
            }}
        >
            {/* Header */}
            <h2
                className="text-3xl font-extrabold tracking-wide drop-shadow"
                style={{
                    color: JUP.neon,
                    textShadow: `0 0 20px ${JUP.glow}`,
                }}
            >
                Flappy-555 🪐
            </h2>
            <p className="mt-1 text-sm" style={{ color: "#BFFFEF" }}>
                Press <span className="font-bold" style={{ color: JUP.aqua }}>SPACE</span> or click to start
            </p>

            {/* Loading / Error */}
            {imageLoading && (
                <p className="mt-2 text-xs text-emerald-200 animate-pulse">
                    Loading your cosmic character…
                </p>
            )}
            {imageError && (
                <p className="mt-2 text-xs text-yellow-300">
                    Using default Jupiter flyer ✨
                </p>
            )}

            {/* CTA Button */}
            <div className="mt-4">
                <Button
                    size="lg"
                    onClick={onStart}
                    className="font-bold tracking-wider px-8 py-2 rounded-xl transition-all text-[#00140F]
             bg-gradient-to-r from-[#00FF9C] to-[#13FFE2]
             shadow-[0_0_20px_rgba(0,255,156,0.55)] hover:shadow-[0_0_30px_rgba(0,255,178,0.65)]
             hover:scale-[1.02] active:scale-[0.98]"
                >
                    🚀 Start
                </Button>
            </div>

            {/* High Score */}
            {highScore > 0 && (
                <div
                    className="mt-3 rounded-lg px-4 py-2 text-sm font-semibold"
                    style={{
                        border: `1px solid ${JUP.stroke}`,
                        background: "rgba(0,255,156,0.05)",
                        color: "#BFFFEF",
                    }}
                >
                    High Score:{" "}
                    <span
                        className="font-extrabold"
                        style={{
                            color: JUP.neon,
                            textShadow: `0 0 6px ${JUP.glow}`,
                        }}
                    >
            {highScore}
          </span>
                </div>
            )}

            {/* Instructions */}
            <div
                className="mt-6 text-left space-y-1 text-sm"
                style={{ color: "#CFFFEF" }}
            >
                <p>🌀 Avoid the space pipes</p>
                <p>🪐 Let Jupiter soar across the neon void</p>
                <p>🏆 Earn points & climb the hourly board</p>
                <p style={{ color: "#9FFFD9" }}>☄️ Time to take off, pilot!</p>
            </div>

            {/* Decorative glow ring */}
            <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                    boxShadow: `0 0 40px ${JUP.neon}11, 0 0 80px ${JUP.glow}08 inset`,
                }}
            />
        </div>
    );
};

export default StartScreen;
