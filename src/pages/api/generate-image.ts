import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});

cloudinary.config({
    cloud_name: 'dzttv4m7o',
    api_key: '125461598549143',
    api_secret: 'sroqrRNVw3v3lgxy2KZTGz7oR0o' // Click 'View API Keys' above to copy your API secret
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, style } = req.body;

    if (!prompt || !style) {
        return res.status(400).json({ error: 'Prompt and style are required' });
    }

    const full_prompt = `Using a ${style} style, ${prompt}`

    try {
        console.log("Using prompt:", full_prompt);
        const imageResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: full_prompt,
            size: "1024x1024",
            quality: "standard",
            n: 1,
            response_format: "b64_json",
        });

        const mimeType = 'image/png'
        const base64 = `data:${mimeType};base64,${imageResponse.data[0].b64_json}`;

        const cloudinaryResponse = await cloudinary.uploader
            .upload(base64)

        return res.status(200).json({ image: base64, description: imageResponse.data[0].revised_prompt, url: cloudinaryResponse.url });
    } catch (error: unknown) {
        // console.error('Error generating image:', error);

        console.log(error)
        // Ensure the error is an object and has a `toString` method before accessing it
        const policy =
            typeof error === "object" &&
            error !== null &&
            "toString" in error &&
            typeof (error as { toString: () => string }).toString === "function" &&
            (error as { toString: () => string }).toString().includes("safety");

        if (policy) {
            res.status(400).json({ error: "NonSafe Request - you need to turn NSFW mode on" });
            return;
        }

        res.status(500).json({ error: "Internal server error" });
    }

}