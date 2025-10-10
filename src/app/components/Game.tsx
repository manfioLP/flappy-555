"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Canvas from "./Canvas";
import StartScreen from "./Screens/StartScreen";
import GameOverScreen from "./Screens/GameOverScreen";
import Score from "./Score";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useScore } from "@/hooks/useScore";
import { useImage } from "@/hooks/useImage";
import { GAME_STATES, GAME_CONFIG } from "@/utils/constants";
import { submitScore } from "@/services/gameApi";
import { useWallet } from "@solana/wallet-adapter-react";

type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];
type CanvasHandle = { jump: () => void };

const BNB_BG =
    "radial-gradient(1200px 600px at 20% -10%, rgba(240,185,11,0.18), transparent), radial-gradient(1000px 500px at 120% 10%, rgba(220,38,38,0.10), transparent), linear-gradient(135deg, #fff 0%, #fffbe6 35%, #fff 100%)";

const Game: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>(GAME_STATES.START);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [, setSessionStartTime] = useState<number | null>(null);
    const [, setGuestId] = useState<string | null>(null);

    const submittedRef = useRef(false);
    const canvasRef = useRef<CanvasHandle | null>(null);

    const { score, highScore, resetScore, setScore, updateHighScore } = useScore();
    const { loading: imageLoading, error: imageError } = useImage(
        GAME_CONFIG.character.imageUrl
    );

    const { publicKey } = useWallet();

    useEffect(() => {
        try {
            const key = "flappy.guestId";
            let id = localStorage.getItem(key);
            if (!id) {
                id = "guest-" + crypto.randomUUID().slice(0, 8);
                localStorage.setItem(key, id);
            }
            setGuestId(id);
        } catch (e) {
            console.warn("Could not access localStorage for guestId", e);
            setGuestId(null);
        }
    }, []);

    const startGame = useCallback(async () => {
        resetScore();
        setSessionStartTime(Date.now());
        const id = crypto.randomUUID();
        setSessionId(id);
        submittedRef.current = false;
        setGameState(GAME_STATES.PLAYING);
    }, [resetScore]);

    const handleGameOver = useCallback(async () => {
        setGameState(GAME_STATES.GAME_OVER);
        updateHighScore(score);

        if (submittedRef.current) return;
        submittedRef.current = true;

        try {
            const playId = sessionId ?? crypto.randomUUID();
            const walletAddress =
                publicKey?.toString() ??
                `guest-${(sessionId ?? crypto.randomUUID()).slice(0, 8)}`;
            await submitScore(walletAddress, score, playId);
        } catch (e) {
            console.error("Failed to submit score", e);
        }
    }, [score, updateHighScore, sessionId, publicKey]);

    const handleScoreUpdate = useCallback((n: number) => setScore(n), [setScore]);

    const handleJump = useCallback(() => {
        if (gameState === GAME_STATES.PLAYING && canvasRef.current) {
            canvasRef.current.jump();
        }
    }, [gameState]);

    useKeyboard("Space", handleJump);

    return (
        <main
            className="w-full rounded-3xl border border-yellow-200/50 p-4 shadow-inner"
            style={{ background: BNB_BG }}
        >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl backdrop-blur-[0.5px]">
                    <Canvas
                        ref={canvasRef}
                        gameState={gameState}
                        onGameOver={handleGameOver}
                        onScore={handleScoreUpdate}
                    />

                    {gameState === GAME_STATES.PLAYING && (
                        <Score
                            score={score}
                            className="absolute top-6 left-1/2 -translate-x-1/2 text-white text-4xl md:text-5xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] z-10"
                        />
                    )}

                    {(gameState === GAME_STATES.START || gameState === GAME_STATES.GAME_OVER) && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 backdrop-blur-sm">
                            {gameState === GAME_STATES.START ? (
                                <StartScreen
                                    onStart={startGame}
                                    highScore={highScore}
                                    imageLoading={imageLoading}
                                    imageError={!!imageError}
                                />
                            ) : (
                                <GameOverScreen
                                    score={score}
                                    highScore={highScore}
                                    onRestart={startGame}
                                    isNewHighScore={score === highScore && score > 0}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Game;
