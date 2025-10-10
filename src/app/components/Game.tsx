"use client";

import React, {useState, useCallback, useRef, useEffect} from "react";
import Canvas from "./Canvas";
import StartScreen from "./Screens/StartScreen";
import GameOverScreen from "./Screens/GameOverScreen";
import Score from "./Score";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useScore } from "@/hooks/useScore";
import { useImage } from "@/hooks/useImage";
import { GAME_STATES, GAME_CONFIG } from "@/utils/constants";
import { submitScore } from "@/services/gameApi";
import {useWallet} from "@solana/wallet-adapter-react";

type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];
type CanvasHandle = { jump: () => void };

const Game: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>(GAME_STATES.START);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
    const [guestId, setGuestId] = useState<string | null>(null);

    const submittedRef = useRef(false);               // <-- prevent double submit
    const canvasRef = useRef<CanvasHandle | null>(null);

    const { score, highScore, resetScore, setScore, updateHighScore } = useScore();
    const { loading: imageLoading, error: imageError } = useImage(GAME_CONFIG.character.imageUrl);

    const { connected, publicKey } = useWallet();

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
        submittedRef.current = false;                   // <-- reset submit guard
        setGameState(GAME_STATES.PLAYING);
    }, [resetScore]);

    const handleGameOver = useCallback(async () => {
        setGameState(GAME_STATES.GAME_OVER);
        updateHighScore(score);

        // post to /api/scores once per round
        if (submittedRef.current) return;
        submittedRef.current = true;

        try {
            const playId = sessionId ?? crypto.randomUUID();
            // TODO: replace with real wallet when ready
            const walletAddress = publicKey?.toString() ?? `guest-${(sessionId ?? crypto.randomUUID()).slice(0, 8)}`;
            await submitScore(walletAddress, score, playId);
        } catch (e) {
            console.error("Failed to submit score", e);
            // optional: submittedRef.current = false; // if you want to allow retry
        }
    }, [score, updateHighScore, sessionId]);

    const handleScoreUpdate = useCallback((n: number) => setScore(n), [setScore]);

    const handleJump = useCallback(() => {
        if (gameState === GAME_STATES.PLAYING && canvasRef.current) {
            canvasRef.current.jump();
        }
    }, [gameState]);

    // IMPORTANT to avoid recursion: only handle Space in ONE place.
    // If Canvas also listens to Space and calls back into onJump, remove that.
    useKeyboard("Space", handleJump);

    return (
        <div className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Canvas
                ref={canvasRef}
                gameState={gameState}
                onGameOver={handleGameOver}
                onScore={handleScoreUpdate}
                // NOTE: don't pass onJump if Canvas triggers Space too; keep Space in one place
            />

            {gameState === GAME_STATES.PLAYING && (
                <Score
                    score={score}
                    className="absolute top-6 left-1/2 -translate-x-1/2 text-white text-4xl md:text-5xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] z-10"
                />
            )}

            {(gameState === GAME_STATES.START || gameState === GAME_STATES.GAME_OVER) && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
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
    );
};

export default Game;
