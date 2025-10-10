export const runtime = "nodejs";
export const dynamic = "force-dynamic";   // writes should not be cached

import { sql } from "@/services/db";

type Body = { walletAddress?: string; score?: number; playId?: string };

export async function POST(req: Request) {
    try {
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
        return Response.json({ ok: false, error: "Server error" }, { status: 500 });
    }
}
