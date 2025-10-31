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

    // Theme: "default" | "china" | "bnb"
    theme: "jupiter" as "default" | "china" | "bnb" | "jupiter",
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
    // default
    sky: "#87CEEB",
    ground: "#98D98E",
    pipe: "#2ECC40",
    pipeDark: "#27AE60",
    bird: "#FFD700",
    birdEye: "white",
    birdPupil: "black",
    birdBeak: "#FF6B35",
    groundLine: "rgba(0,0,0,0.2)",

    // china
    chinaRed: "#D82122",
    chinaGold: "#FFD54A",
    chinaDarkRed: "#9E1415",
    cloudLight: "#FFF3D6",
    cloudMid: "rgba(255, 217, 160, 0.6)",

    // bnb (Binance)
    bnbYellow: "#F3BA2F",
    bnbDark: "#0B0E11",
    bnbCard: "#111418",
    bnbGray: "#1C2127",

    // Jupiter / 555
    jupiterGreen: "#00FF9C",
    jupiterDark: "#021013",
    jupiterGlow: "#00FFB2",
    jupiterPipe: "#0A3D2E",
    jupiterPipeGlow: "#13FF89",
    jupiterStar: "#13FFE2",
} as const;

export type Colors = typeof COLORS;
