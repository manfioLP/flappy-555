// src/hooks/useImage.ts
"use client";

import { useState, useEffect } from "react";
import { createDefaultBird } from "@/utils/renderer";
import { GAME_CONFIG } from "@/utils/constants";

export type UseImageResult = {
    image: HTMLCanvasElement | HTMLImageElement | null;
    loading: boolean;
    error?: string; // <- undefined when no error
};

export const useImage = (src?: string): UseImageResult => {
    const [image, setImage] = useState<HTMLCanvasElement | HTMLImageElement | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        let cancelled = false;

        // No source → use default bird
        if (!src) {
            const def = createDefaultBird(); // should return a canvas/image
            if (!cancelled) {
                setImage(def);
                setLoading(false);
                setError(undefined);
            }
            return;
        }

        const img = new Image();

        img.onload = () => {
            if (cancelled) return;
            const canvas = document.createElement("canvas");
            canvas.width = GAME_CONFIG.character.width;
            canvas.height = GAME_CONFIG.character.height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(
                    img,
                    0,
                    0,
                    GAME_CONFIG.character.width,
                    GAME_CONFIG.character.height
                );
            }
            setImage(canvas);
            setLoading(false);
            setError(undefined);
        };

        img.onerror = () => {
            if (cancelled) return;
            console.error("Failed to load image");
            setError("load_failed");                // <- string, not null
            setImage(createDefaultBird());
            setLoading(false);
        };

        if (src.startsWith("http")) {
            img.crossOrigin = "anonymous";
        }

        img.src = src;

        return () => {
            cancelled = true;
        };
    }, [src]);

    return { image, loading, error };
};
