// src/utils/constants.ts

// ==== Game config ====
export const GAME_CONFIG = {
    // Game settings
    gravity: 0.5,
    jumpPower: -8,
    pipeWidth: 60,
    pipeGap: 150,
    initialPipeSpeed: 3,
    speedIncrement: 0.5,
    maxSpeed: 7,
    pipeFrequency: 90,

    // Character settings
    character: {
        width: 80,
        height: 80,
        x: 80,
        initialY: 250,
        imageUrl: "/images/img.png",
    },

    // Canvas settings
    canvas: {
        width: 400,
        height: 600,
    },

    // Difficulty settings
    difficulty: {
        scoreInterval: 5, // Increase speed every 5 points
    },

    // Theme (keep, optional)
    theme: "israeli" as "default" | "israeli",
} as const;

export type GameConfig = typeof GAME_CONFIG;

// ==== States (keep keys exactly as your app expects) ====
export const GAME_STATES = {
    START: "start",
    PLAYING: "playing",
    GAME_OVER: "gameOver",
    PAUSED: "paused",
} as const;

export type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];

// ==== Colors ====
export const COLORS = {
    sky: "#87CEEB",
    ground: "#98D98E",
    pipe: "#2ECC40",
    pipeDark: "#27AE60",
    bird: "#FFD700",
    birdEye: "white",
    birdPupil: "black",
    birdBeak: "#FF6B35",

    // extras used by renderer (add these to avoid TS errors)
    groundLine: "rgba(0,0,0,0.2)",

    // israeli theme colors (optional)
    flagBlue: "#0B5CD5",
    flagWhite: "#FFFFFF",
    stoneLight: "#F2E6C9",
    stoneDark: "#DFCFAC",
    gold: "#F3C316",
    olive: "#6b8e23",
} as const;

export type Colors = typeof COLORS;
