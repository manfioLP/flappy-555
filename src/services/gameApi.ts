// services/gameApi.ts
export async function submitScore(walletAddress: string, score: number, playId?: string) {
    try {
        console.log('submitScore', score);
        const resp = await fetch("/api/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ walletAddress, score, playId }),
        });
        if (!resp.ok) throw new Error(`Failed: ${resp.status}`);
        return await resp.json();
    } catch (err) {
        console.error("submitScore error:", err);
        return { ok: false, error: "submit failed" };
    }
}
