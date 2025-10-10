// src/app/api/leaderboard/route.ts
import { NextResponse } from "next/server";
import { sql } from "@/services/db";

// Row type for leaderboard
export type LBRow = {
    wallet_address: string;
    best_score: number;
    plays: number;
    last_play: string; // ISO string
};

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const topRaw = parseInt(String(searchParams.get("top") ?? "20"), 10);
        const top = Math.min(Math.max(Number.isFinite(topRaw) ? topRaw : 20, 1), 200);
        const previous = searchParams.has("previous");

        // Build round window
        const roundStart = previous
            ? `date_trunc('hour', now() at time zone 'utc') - interval '1 hour'`
            : `date_trunc('hour', now() at time zone 'utc')`;
        const roundEnd = previous
            ? `date_trunc('hour', now() at time zone 'utc')`
            : `date_trunc('hour', now() at time zone 'utc') + interval '1 hour'`;

        // Overall leaderboard
        const overall = (await sql/*sql*/`
      SELECT wallet_address,
             MAX(score)::int AS best_score,
             COUNT(*)::int   AS plays,
             MAX(created_at) AS last_play
      FROM plays
      GROUP BY wallet_address
      ORDER BY best_score DESC, last_play DESC
      LIMIT ${top};
    `) as LBRow[];

        // Last round leaderboard
        const lastround = (await sql/*sql*/`
      WITH windowed AS (
        SELECT * FROM plays
        WHERE created_at >= ${sql.unsafe(roundStart)}
          AND created_at <  ${sql.unsafe(roundEnd)}
      )
      SELECT wallet_address,
             MAX(score)::int AS best_score,
             COUNT(*)::int   AS plays,
             MAX(created_at) AS last_play
      FROM windowed
      GROUP BY wallet_address
      ORDER BY best_score DESC, last_play DESC
      LIMIT ${top};
    `) as LBRow[];

        return NextResponse.json({
            ok: true,
            meta: { top, round: previous ? "previous_hour" : "current_hour" },
            overall,
            lastround,
        });
    } catch (e: unknown) {
        console.error("Leaderboard error:", e);
        return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
    }
}
