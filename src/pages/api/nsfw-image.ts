import { NextApiRequest, NextApiResponse } from 'next';
import { fal } from "@fal-ai/client";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dzttv4m7o',
    api_key: '125461598549143',
    api_secret: 'sroqrRNVw3v3lgxy2KZTGz7oR0o' // Click 'View API Keys' above to copy your API secret
});

const FAL_API_KEY = process.env.FAL_API_KEY;

if (!FAL_API_KEY) {
    throw new Error('FAL_API_KEY is not defined in the environment variables.');
}

fal.config({
    credentials: FAL_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, style, isNSFW } = req.body;
    const nsfwPrompt = "Being very raw, naughty and NSFW,"
    console.log("using prompt", prompt, " with style ", style)

    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing prompt parameter' });
    }

    try {
        console.log("making request to fal ai....")

        const imaginePrompt = `Using a style ${style}, imagine ${prompt}`
        const parsedPrompt = `${isNSFW ? nsfwPrompt : ""} ${imaginePrompt}`

        const result = await fal.subscribe("fal-ai/flux/dev", {
            input: {
                prompt: parsedPrompt,
                enable_safety_checker: false
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });
        const dataPrompt = result.data.prompt;
        const nsfwImage = result.data.images[0];

        console.log("nsfwImage", nsfwImage);

        // Download the image and convert it to Base64 using fetch
        const imageResponse = await fetch(nsfwImage.url);
        console.log("image repsonse", imageResponse)
        // Convert the image to Base64
        const arrayBuffer = await imageResponse.arrayBuffer(); // Read the image as ArrayBuffer
        const base64Image = `data:${imageResponse.headers.get('content-type') || 'image/jpeg'};base64,${Buffer.from(arrayBuffer).toString('base64')}`;

        const cloudinaryResponse = await cloudinary.uploader
            .upload(base64Image)

        console.log("response data!", result.data)
        res.status(200).json({ image: base64Image, description: dataPrompt, url: cloudinaryResponse.url });
    } catch (error) {
        console.error('Error generating NSFW image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
