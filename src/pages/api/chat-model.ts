// pages/api/chat-model.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type OllamaRequest = {
    model: string;
    prompt: string;
    stream?: boolean;
};

type OllamaResponse = {
    model: string;
    message: { role: string; content: string };
    done: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed. Use POST.' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required.' });
    }

    try {
        const ollamaRequest: OllamaRequest = {
            model: 'deepseek-r1:7b', // Replace with your model name
            prompt,
            stream: false,
        };

        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ollamaRequest),
        });

        if (!response.ok) {
            throw new Error(`Ollama API returned an error: ${response.statusText}`);
        }

        const data: OllamaResponse = await response.json();
        res.status(200).json(data);
    } catch (error: unknown) {
        console.error('Error calling Ollama API:', error);
        if (error instanceof Error) {
            console.error("Error generating chat model prompt:", error);
            res
                .status(500)
                .json({ error: "Failed to generate chat message", details: error.message });
        } else {
            console.error("Unknow Error type while generating chat model prompt:", error);
            res
                .status(500)
                .json({ error: "Failed to generate video", details: "error generating video" });
        }
    }
}
