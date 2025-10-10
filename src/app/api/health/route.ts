// src/app/api/health/route.ts
export const runtime = "nodejs";
export const revalidate = 0;
export const dynamic = "force-dynamic";


import { sql } from "@/services/db";

export async function GET() {
    try {
        // Quick DB ping
        const rows = await sql/* sql */`SELECT now() as ts;`;

        // (Optional) expose a safe env summary
        const env = {
            hasNEON: Boolean(process.env.NEON_DATABASE_URL),
            hasHelius: Boolean(process.env.NEXT_PUBLIC_HELIUS_URL),
            node: process.version,
        };

        return Response.json(
            { ok: true, db: "up", ts: rows?.[0]?.ts ?? null, env },
            { status: 200 }
        );
    } catch (e) {
        console.error("healthcheck error:", e);
        return Response.json(
            { ok: false, db: "down", error: "db-connection-failed" },
            { status: 500 }
        );
    }
}
