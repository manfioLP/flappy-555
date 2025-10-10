import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@/services/db'; // <= updated path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    const top = Math.min(Math.max(parseInt(String(req.query.top ?? '20'), 10) || 20, 1), 200);
    const previous = !!req.query.previous;

    try {
        const overall = await sql/*sql*/`
      SELECT wallet_address, MAX(score)::int AS best_score, COUNT(*)::int AS plays, MAX(created_at) AS last_play
      FROM plays
      GROUP BY wallet_address
      ORDER BY best_score DESC, last_play DESC
      LIMIT ${top};
    `;

        const roundStart = previous
            ? `date_trunc('hour', now() at time zone 'utc') - interval '1 hour'`
            : `date_trunc('hour', now() at time zone 'utc')`;
        const roundEnd = previous
            ? `date_trunc('hour', now() at time zone 'utc')`
            : `date_trunc('hour', now() at time zone 'utc') + interval '1 hour'`;

        const lastround = await sql/*sql*/`
      WITH windowed AS (
        SELECT * FROM plays
        WHERE created_at >= ${sql.unsafe(roundStart)}
          AND created_at <  ${sql.unsafe(roundEnd)}
      )
      SELECT wallet_address, MAX(score)::int AS best_score, COUNT(*)::int AS plays, MAX(created_at) AS last_play
      FROM windowed
      GROUP BY wallet_address
      ORDER BY best_score DESC, last_play DESC
      LIMIT ${top};
    `;

        res.status(200).json({ ok: true, meta: { top, round: previous ? 'previous_hour' : 'current_hour' }, overall, lastround });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
