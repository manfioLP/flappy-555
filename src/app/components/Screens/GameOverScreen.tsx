import React from "react";
import Button from "../Button";

type GameOverScreenProps = {
    score: number;
    highScore: number;
    onRestart: () => void;
    isNewHighScore: boolean;
};

const GameOverScreen: React.FC<GameOverScreenProps> = ({
                                                           score,
                                                           highScore,
                                                           onRestart,
                                                           isNewHighScore,
                                                       }) => {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 text-white p-4 backdrop-blur">
            <h2 className="text-2xl font-bold text-red-400 mb-2">Game Over</h2>

            <div className="space-y-2">
                <div>
                    <p className="text-sm text-white/70">Score</p>
                    <p className="text-2xl font-bold text-yellow-300">{score}</p>
                </div>

                {isNewHighScore && score > 0 ? (
                    <div className="flex items-center gap-2 text-yellow-300 animate-pulse">
                        <span className="text-xl">🏆</span>
                        <strong>New High Score!</strong>
                    </div>
                ) : (
                    highScore > 0 && (
                        <div>
                            <p className="text-sm text-white/70">Best</p>
                            <p className="text-xl font-semibold text-yellow-200">{highScore}</p>
                        </div>
                    )
                )}
            </div>

            <div className="mt-3">
                <Button
                    variant="primary"
                    size="lg"
                    onClick={onRestart}
                    className="font-bold tracking-wider px-8 py-2 rounded-xl transition-all text-[#00140F]
             bg-gradient-to-r from-[#00FF9C] to-[#13FFE2]
             shadow-[0_0_20px_rgba(0,255,156,0.55)] hover:shadow-[0_0_30px_rgba(0,255,178,0.65)]
             hover:scale-[1.02] active:scale-[0.98]"
                >
                    Play Again
                </Button>
            </div>
        </div>
    );
};

export default GameOverScreen;
