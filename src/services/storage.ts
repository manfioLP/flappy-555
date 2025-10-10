// src/services/storage.ts
export const STORAGE_KEYS = {
    HIGH_SCORE: "flappy_high_score",
    SETTINGS: "flappy_settings",
    PLAYER_NAME: "flappy_player_name",
    STATS: "flappy_stats",
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export type Settings = {
    soundEnabled: boolean;
    difficulty: "easy" | "normal" | "hard" | string;
    theme: string;
};

export type Stats = {
    gamesPlayed: number;
    totalScore: number;
    bestStreak: number;
    averageScore: number;
};

const DEFAULT_SETTINGS: Settings = {
    soundEnabled: true,
    difficulty: "normal",
    theme: "default",
};

const DEFAULT_STATS: Stats = {
    gamesPlayed: 0,
    totalScore: 0,
    bestStreak: 0,
    averageScore: 0,
};

// Guard for SSR
function ls(): Storage | null {
    if (typeof window === "undefined") return null;
    try {
        return window.localStorage;
    } catch {
        return null;
    }
}

export const storage = {
    // High Score
    getHighScore(): number {
        const local = ls();
        if (!local) return 0;
        try {
            const score = local.getItem(STORAGE_KEYS.HIGH_SCORE);
            return score ? parseInt(score, 10) : 0;
        } catch {
            return 0;
        }
    },

    setHighScore(score: number): void {
        const local = ls();
        if (!local) return;
        try {
            local.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
        } catch {}
    },

    // Settings
    getSettings(): Settings {
        const local = ls();
        if (!local) return DEFAULT_SETTINGS;
        try {
            const settings = local.getItem(STORAGE_KEYS.SETTINGS);
            return settings ? (JSON.parse(settings) as Settings) : DEFAULT_SETTINGS;
        } catch {
            return DEFAULT_SETTINGS;
        }
    },

    setSettings(settings: Settings): void {
        const local = ls();
        if (!local) return;
        try {
            local.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        } catch {}
    },

    // Player Name
    getPlayerName(): string {
        const local = ls();
        if (!local) return "Anonymous";
        try {
            return local.getItem(STORAGE_KEYS.PLAYER_NAME) || "Anonymous";
        } catch {
            return "Anonymous";
        }
    },

    setPlayerName(name: string): void {
        const local = ls();
        if (!local) return;
        try {
            local.setItem(STORAGE_KEYS.PLAYER_NAME, name);
        } catch {}
    },

    // Stats
    getStats(): Stats {
        const local = ls();
        if (!local) return DEFAULT_STATS;
        try {
            const stats = local.getItem(STORAGE_KEYS.STATS);
            return stats ? (JSON.parse(stats) as Stats) : DEFAULT_STATS;
        } catch {
            return DEFAULT_STATS;
        }
    },

    updateStats(newGameScore: number): Stats {
        const local = ls();
        const stats = this.getStats();
        try {
            stats.gamesPlayed += 1;
            stats.totalScore += newGameScore;
            stats.averageScore = Math.round(stats.totalScore / stats.gamesPlayed);
            // Optional: track best streak externally if you add it later
            local?.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
        } catch {}
        return stats;
    },

    clearAll(): void {
        const local = ls();
        if (!local) return;
        try {
            (Object.values(STORAGE_KEYS) as StorageKey[]).forEach((key) =>
                local.removeItem(key)
            );
        } catch {}
    },
};
