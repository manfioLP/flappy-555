export const runtime = "nodejs";
export const dynamic = "force-dynamic";   // writes should not be cached

import { getSql } from "@/services/db";

type Body = { walletAddress?: string; score?: number; playId?: string };

export async function POST(req: Request) {
    try {
        const sql = getSql();
        if (!sql) {
            return Response.json(
                { ok: false, error: "Score database is not configured", code: "DB_MISSING_ENV" },
                { status: 503 }
            );
        }

        const body = (await req.json().catch(() => null)) as Body | null;
        if (!body) {
            return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }

        const { walletAddress, score, playId } = body;
        if (!walletAddress || typeof walletAddress !== "string") {
            return Response.json({ ok: false, error: "Invalid walletAddress" }, { status: 400 });
        }
        if (typeof score !== "number" || score < 0) {
            return Response.json({ ok: false, error: "Invalid score" }, { status: 400 });
        }

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

        return Response.json({ ok: true }, { status: 201 });
    } catch (e) {
        console.error("POST /api/scores error", e);
        const message = e instanceof Error ? e.message : "Server error";
        return Response.json({ ok: false, error: message, code: "SCORE_WRITE_FAILED" }, { status: 500 });
    }
}
