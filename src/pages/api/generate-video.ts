import type { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN, // Set the API key in your .env.local file
});

// input structure:
// fps
// seed
// width
// height
// prompt
// infer_steps
// video_length
// embedded_guidance_scale

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("starting func")
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const {prompt} = req.body;
        console.log("payload", req.body)

        const input = {
            prompt,
        }

        // Validate input
        if (!input || Object.keys(input).length === 0) {
            return res.status(400).json({ error: "Input is required" });
        }

        // Call Replicate API to generate video
        // const output = await replicate.run("tencent/hunyuan-video:8283f26be7ce5dc0119324b4752cbfd3970b3ef1b923c4d3c35eb6546518747a", { input });
        const output = await replicate.run("minimax/video-01", { input });
        console.log("generate-video output", output)

        // Ensure output is a ReadableStream
        if (!(output instanceof ReadableStream)) {
            throw new Error("Unexpected output type from Replicate API");
        }

        // Set headers to indicate video content
        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Content-Disposition", 'inline; filename="output.mp4"');
        res.status(200);

        // Read and stream data from the ReadableStream to the response
        const reader = output.getReader();
        const writable = res;

        const pump = async () => {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    writable.end(); // End the response when the stream is complete
                    break;
                }
                writable.write(value); // Write chunks of data to the response
            }
        };

        await pump();
    }
    catch (error: unknown) {
        console.error("Error generating video:", error);
        if (error instanceof Error) {
            console.error("Error generating video:", error);
            res
                .status(500)
                .json({ error: "Failed to generate video", details: error.message });
        } else {
            console.error("Error generating video:", error);
            res
                .status(500)
                .json({ error: "Failed to generate video", details: "error generating video" });
        }
    }
}
