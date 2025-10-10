import { GAME_CONFIG } from "./constants";
import type { Pipe } from "./physics";

/**
 * Make the pipe gap bigger here.
 * Increase the multiplier (e.g. 1.5 → 50% wider gap).
 */
const PIPE_GAP_MULTIPLIER = 1.5;
const PIPE_GAP = Math.round(GAME_CONFIG.pipeGap * PIPE_GAP_MULTIPLIER);

export const createPipe = (): Pipe => {
    const minHeight = 50;
    const maxHeight = GAME_CONFIG.canvas.height - PIPE_GAP - minHeight;
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;

    return {
        x: GAME_CONFIG.canvas.width,
        topHeight,
        bottomY: topHeight + PIPE_GAP,
        passed: false,
        id: Date.now() + Math.random(),
    };
};

export const updatePipes = (pipes: Pipe[], pipeSpeed: number): Pipe[] => {
    return pipes.map((pipe) => ({
        ...pipe,
        x: pipe.x - pipeSpeed,
    }));
};

export const filterVisiblePipes = (pipes: Pipe[]): Pipe[] => {
    return pipes.filter((pipe) => pipe.x + GAME_CONFIG.pipeWidth > 0);
};

export const checkPipePassed = (pipe: Pipe, playerX: number): boolean => {
    return !pipe.passed && pipe.x + GAME_CONFIG.pipeWidth < playerX;
};

export const shouldCreateNewPipe = (frameCount: number): boolean => {
    return frameCount % GAME_CONFIG.pipeFrequency === 0;
};
