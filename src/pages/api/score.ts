import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@/services/db'; // <= updated path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { walletAddress, score, playId } = req.body || {};
    if (!walletAddress || typeof walletAddress !== 'string') return res.status(400).json({ error: 'Invalid walletAddress' });
    if (typeof score !== 'number' || score < 0) return res.status(400).json({ error: 'Invalid score' });

    try {
        if (playId) {
            await sql/*sql*/`
        INSERT INTO plays (wallet_address, score, play_id)
        VALUES (${walletAddress}, ${score}, ${playId})
        ON CONFLICT (play_id) DO NOTHING;
      `;
        } else {
            await sql/*sql*/`
        INSERT INTO plays (wallet_address, score)
        VALUES (${walletAddress}, ${score});
      `;
        }
        res.status(201).json({ ok: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
