export const runtime = "nodejs";
export const revalidate = 0;


export async function GET() {
    const env = {
        hasNEON: !!process.env.NEON_DATABASE_URL,
        hasBsc: !!process.env.NEXT_PUBLIC_BSC_RPC_URL,
        node: process.version,
    };

    // Always return a 200 with basic info.
    // Only probe DB if the env is set; otherwise report status without crashing.
    if (!env.hasNEON) {
        return Response.json({ ok: true, db: "missing-env", env }, { status: 200 });
    }

    try {
        return Response.json({ ok: true, db: "unknow", env}, { status: 200 });
    } catch (err: unknown) {
        // Do not crash the route; show the error so you can see it in Hosting → Server logs
        const e = err instanceof Error ? err : new Error(String(err));
        console.error("HEALTH DB ERROR:", e?.message, e?.stack);
        return Response.json({ ok: true, db: "down", error: e?.message ?? "db error", env }, { status: 200 });
    }
}

