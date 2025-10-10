import { NextApiRequest, NextApiResponse } from "next";
import {Language} from "@/utils/types";

const API_URL = process.env.NEXT_PUBLIC_TTS_API_URL;
if (!API_URL) {
    throw new Error("API URL is not defined in the environment variables.");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed. Use POST." });
    }

    const { text, language, voice, speed } = req.body;

    const voice_model = _getVoiceModel(voice, language)

    if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Invalid input. Text is required." });
    }

    try {
        console.log("Received parameters:", { text, language, voice, speed });
        console.log("Using parameters:", { text, voice: voice_model, speed });

        const response = await fetch(`${API_URL}/tts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text, voice: voice_model }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData);
            res.status(response.status).json({ error: errorData.error || "TTS service failed" });
            return;
        }

        // Read the audio file from the TTS service response
        const audioBuffer = await response.arrayBuffer();
        const audioBlob = Buffer.from(audioBuffer);

        // Set headers and send the audio file back
        res.setHeader("Content-Type", "audio/wav");
        res.setHeader("Content-Disposition", `attachment; filename="output.wav"`);
        res.status(200).send(audioBlob);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const _getVoiceModel = (voice: string, language: Language) => {
    return languageMap[language] + '_' + voice;
}

const languageMap = {
    'en-us': 'af',
    'en-gb': 'bf',
}
