"use client";

import { useState, useCallback, useEffect } from "react";
import { storage } from "@/services/storage";

type UseScore = {
    score: number;
    highScore: number;
    incrementScore: () => void;
    resetScore: () => void;
    updateHighScore: (newScore: number) => boolean;
    setScore: React.Dispatch<React.SetStateAction<number>>;
};

export const useScore = (): UseScore => {
    const [score, setScore] = useState<number>(0);
    // Start at 0 on server; read real value after mount
    const [highScore, setHighScore] = useState<number>(0);

    // Load high score on client after mount
    useEffect(() => {
        setHighScore(storage.getHighScore());
    }, []);

    const incrementScore = useCallback(() => {
        setScore((prev) => prev + 1);
    }, []);

    const resetScore = useCallback(() => {
        setScore(0);
    }, []);

    const updateHighScore = useCallback(
        (newScore: number) => {
            if (newScore > highScore) {
                setHighScore(newScore);
                storage.setHighScore(newScore);
                return true;
            }
            return false;
        },
        [highScore]
    );

    // Auto-update high score when current score changes (client)
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            storage.setHighScore(score);
        }
    }, [score, highScore]);

    return {
        score,
        highScore,
        incrementScore,
        resetScore,
        updateHighScore,
        setScore,
    };
};
