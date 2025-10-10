import { GAME_CONFIG } from "./constants";

export type Player = {
    x: number;
    y: number;
    velocity: number;
};

export const updatePlayerPhysics = (player: Player): Player => {
    const newPlayer: Player = { ...player };
    newPlayer.velocity += GAME_CONFIG.gravity;
    newPlayer.y += newPlayer.velocity;

    // Ceiling collision
    if (newPlayer.y < 0) {
        newPlayer.y = 0;
        newPlayer.velocity = 0;
    }

    return newPlayer;
};

export const checkGroundCollision = (player: Player): boolean => {
    return player.y + GAME_CONFIG.character.height > GAME_CONFIG.canvas.height;
};

export type Pipe = {
    x: number;
    topHeight: number;
    bottomY: number;
    passed: boolean;
    id: number;
};

export const checkPipeCollision = (player: Player, pipe: Pipe): boolean => {
    const playerLeft = player.x;
    const playerRight = player.x + GAME_CONFIG.character.width;
    const playerTop = player.y;
    const playerBottom = player.y + GAME_CONFIG.character.height;

    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + GAME_CONFIG.pipeWidth;
    const pipeTopBottom = pipe.topHeight;
    const pipeBottomTop = pipe.bottomY;

    // Horizontal overlap
    if (playerRight > pipeLeft && playerLeft < pipeRight) {
        // Hit top or bottom pipe
        if (playerTop < pipeTopBottom || playerBottom > pipeBottomTop) {
            return true;
        }
    }
    return false;
};

export const applyJump = (player: Player): Player => {
    return {
        ...player,
        velocity: GAME_CONFIG.jumpPower,
    };
};
