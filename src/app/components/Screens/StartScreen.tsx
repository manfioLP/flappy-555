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
        <div className="rounded-xl border border-white/10 bg-white/5 text-white p-4 backdrop-blur">
            <h2 className="text-2xl font-bold text-yellow-400 mb-3 animate-bounce">ציפור דש</h2>

            {imageLoading && (
                <p className="text-yellow-300 text-sm mb-2 animate-pulse">
                    Loading custom character...
                </p>
            )}

            {imageError && (
                <p className="text-orange-300 text-sm mb-2">
                    Using default character
                </p>
            )}

            <div className="mt-2">
                <Button variant="primary" size="lg" onClick={onStart}>
                    Start Flappying
                </Button>
            </div>

            <div className="mt-3 space-y-1 text-sm text-white/80">
                <p>Click or press SPACE to fly!</p>
                <p>Avoid the pipes and see how far you can go!</p>
                <p>All fees go to the prize pool and are distributed to top scorers every hour.</p>
            </div>

            {highScore > 0 && (
                <div className="mt-3 rounded-md border border-yellow-400/50 bg-yellow-400/10 px-3 py-2">
                    <p className="m-0 text-sm">
                        High Score: <span className="font-bold text-yellow-300">{highScore}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default StartScreen;
