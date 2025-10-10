"use client";

import React, {
    useRef,
    useEffect,
    useCallback,
    forwardRef,
    useImperativeHandle,
} from "react";
import {GAME_CONFIG, GAME_STATES} from "@/utils/constants";
import { clearCanvas, drawPipe, drawPlayer } from "@/utils/renderer";
import {
    updatePlayerPhysics,
    checkGroundCollision,
    checkPipeCollision,
    applyJump,
} from "@/utils/physics";
import {
    createPipe,
    updatePipes,
    filterVisiblePipes,
    checkPipePassed,
    shouldCreateNewPipe,
} from "@/utils/pipes";
import { useGameLoop } from "@/hooks/useGameLoop";
import { useImage } from "@/hooks/useImage";
import { useKeyboard } from "@/hooks/useKeyboard";

type GameState = "start" | "playing" | "game_over";

export type CanvasHandle = { jump: () => void };

type CanvasProps = {
    gameState: GameState | string;
    onGameOver: () => void;
    onScore: (score: number) => void;
    // onJump?: () => void;
};

type Player = { x: number; y: number; velocity: number };
type Pipe = ReturnType<typeof createPipe>;

const Canvas = forwardRef<CanvasHandle, CanvasProps>(
    ({ gameState, onGameOver, onScore }, ref) => {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);
        const playerRef = useRef<Player>({
            x: GAME_CONFIG.character.x,
            y: GAME_CONFIG.character.initialY,
            velocity: 0,
        });
        const pipesRef = useRef<Pipe[]>([]);
        const frameCountRef = useRef<number>(0);
        const pipeSpeedRef = useRef<number>(GAME_CONFIG.initialPipeSpeed);
        const scoreRef = useRef<number>(0);

        const { image: playerImage } = useImage(GAME_CONFIG.character.imageUrl) as {
            image: HTMLImageElement | HTMLCanvasElement | null;
            loading: boolean;
            error?: string;
        };

        useImperativeHandle(ref, () => ({
            jump: () => {
                if (gameState === "PLAYING") applyJump(playerRef.current);
            },
        }));

        const handleJump = useCallback(() => {
            if (gameState === "playing") {
                playerRef.current = applyJump(playerRef.current);
            }
        }, [gameState]);

        const update = useCallback(() => {
            if (gameState !== "playing") return;

            playerRef.current = updatePlayerPhysics(playerRef.current);

            if (checkGroundCollision(playerRef.current)) {
                console.log("GAME OVER!!!")
                onGameOver();
                return;
            }

            pipesRef.current = updatePipes(pipesRef.current, pipeSpeedRef.current);
            pipesRef.current = filterVisiblePipes(pipesRef.current);

            for (const pipe of pipesRef.current) {
                if (checkPipeCollision(playerRef.current, pipe)) {
                    onGameOver();
                    return;
                }

                // Mark as passed only once
                if (checkPipePassed(pipe, playerRef.current.x) && !pipe.passed) {
                    pipe.passed = true;
                    scoreRef.current += 1;
                    onScore(scoreRef.current);

                    if (scoreRef.current % GAME_CONFIG.difficulty.scoreInterval === 0) {
                        pipeSpeedRef.current = Math.min(
                            pipeSpeedRef.current + GAME_CONFIG.speedIncrement,
                            GAME_CONFIG.maxSpeed
                        );
                    }
                }
            }

            frameCountRef.current++;
            if (shouldCreateNewPipe(frameCountRef.current)) {
                pipesRef.current.push(createPipe());
            }
        }, [gameState, onGameOver, onScore]);

        const render = useCallback(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Always paint background so START/GAME_OVER look like the game
            clearCanvas(ctx);

            // Pipes (if any)
            pipesRef.current.forEach((pipe) => drawPipe(ctx, pipe));

            // Player only if we have an image
            if (playerImage) {
                drawPlayer(ctx, playerRef.current, playerImage);
            }
        }, [playerImage]);

        // 2) game loop: UPDATE only while playing, but RENDER every frame
        const gameLoop = useCallback(() => {
            if (gameState === "playing") {
                update();       // physics, collisions, score, etc.
            }
            render();         // always draw background (and pipes/bird if present)
        }, [gameState, update, render]);

        // 3) run the loop ALWAYS; it’s cheap since update() is gated by state
        useGameLoop(gameLoop, true);

        useEffect(() => {
            render();
        }, [render, gameState]);

        // 4) also render once immediately when state changes (covers first frame)
        useEffect(() => {
            if (gameState === "playing") {
                playerRef.current = {
                    x: GAME_CONFIG.character.x,
                    y: GAME_CONFIG.character.initialY,
                    velocity: 0,
                };
                pipesRef.current = [];
                frameCountRef.current = 0;
                pipeSpeedRef.current = GAME_CONFIG.initialPipeSpeed;
                scoreRef.current = 0;
            }
        }, [gameState]);

        useKeyboard("Space", handleJump);

        const handleCanvasClick = useCallback(() => {
            handleJump();
        }, [handleJump]);

        return (
            <canvas
                ref={canvasRef}
                width={GAME_CONFIG.canvas.width}
                height={GAME_CONFIG.canvas.height}
                className="block w-full h-full"
                onClick={handleCanvasClick}
                // No explicit background color; lets the parent gradient show through
                style={{ backgroundColor: "transparent" }}
            />
        );
    }
);

Canvas.displayName = "Canvas";
export default Canvas;
