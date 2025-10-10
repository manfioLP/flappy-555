import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dzttv4m7o', // Replace with your Cloudinary cloud name
    api_key: '125461598549143', // Replace with your Cloudinary API key
    api_secret: 'sroqrRNVw3v3lgxy2KZTGz7oR0o', // Replace with your Cloudinary API secret
});

type CloudinaryResource = {
    secure_url: string;
    public_id: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed. Only GET requests are supported.' });
    }

    try {
        const nextCursor = req.query.cursor as string | undefined;

        // Fetch resources from Cloudinary
        const response = await cloudinary.api.resources({
            type: 'upload',      // Fetch uploaded images
            max_results: 20,     // Fetch 20 items at a time
            next_cursor: nextCursor || undefined, // Use next_cursor for pagination
        });

        // Map the results to include only necessary data
        const images = response.resources.map((resource: CloudinaryResource) => ({
            url: resource.secure_url,
            title: resource.public_id, // Use public_id as the title
        }));

        res.status(200).json({
            images,
            nextCursor: response.next_cursor || null, // Include the next_cursor for pagination
        });
    } catch (error) {
        console.error('Error fetching images from Cloudinary:', error);
        res.status(500).json({ error: 'Failed to fetch images from Cloudinary.' });
    }
}
