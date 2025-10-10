import { GAME_CONFIG, COLORS } from "./constants";

// ---------- helpers

function drawStarOfDavid(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, fill: string = COLORS.flagBlue) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = fill;

    // two equilateral triangles
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
        const angle = (i * 2 * Math.PI) / 3;
        ctx.lineTo(r * Math.cos(angle), r * Math.sin(angle));
    }
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.rotate(Math.PI / 3); // rotate second triangle
    for (let i = 0; i < 3; i++) {
        const angle = (i * 2 * Math.PI) / 3;
        ctx.lineTo(r * Math.cos(angle), r * Math.sin(angle));
    }
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function drawKotelBlocks(ctx: CanvasRenderingContext2D, w: number, h: number) {
    // soft stone gradient
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, COLORS.stoneLight);
    g.addColorStop(1, COLORS.stoneDark);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // subtle block pattern
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 1;

    const rowHeights = [34, 30, 28, 36, 32]; // uneven rows for realism
    let y = h * 0.62; // wall starts around 62% down
    for (let r = 0; r < 5; r++) {
        const rh = rowHeights[r];
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();

        let x = (r % 2 === 0 ? 18 : 0); // staggered
        while (x < w) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + rh);
            ctx.stroke();
            x += 90 + ((r * 13) % 25); // varying block widths
        }
        y += rh;
    }
}

function drawSkyGradient(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#0a5fae"); // deep blue
    grad.addColorStop(0.6, "#1e88e5");
    grad.addColorStop(0.61, "#1e88e5");
    grad.addColorStop(1, COLORS.olive); // ground color base
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
}

function drawIsraeliBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
    drawSkyGradient(ctx, w, h);
    drawKotelBlocks(ctx, w, h);

    // horizon line
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(0, h * 0.62 - 2, w, 2);
}

// ---------- exported API

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    const w = GAME_CONFIG.canvas.width;
    const h = GAME_CONFIG.canvas.height;

    if (GAME_CONFIG.theme === "israeli") {
        drawIsraeliBackground(ctx, w, h);
    } else {
        // original gradient sky/ground
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, COLORS.sky);
        gradient.addColorStop(0.7, COLORS.sky);
        gradient.addColorStop(0.7, COLORS.ground);
        gradient.addColorStop(1, COLORS.ground);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = COLORS.groundLine;
        ctx.fillRect(0, h - 20, w, 2);
    }
};

export const drawPipe = (ctx: CanvasRenderingContext2D, pipe: { x: number; topHeight: number; bottomY: number }) => {
    const w = GAME_CONFIG.pipeWidth;
    const h = GAME_CONFIG.canvas.height;

    if (GAME_CONFIG.theme !== "israeli") {
        // ---- original look
        ctx.fillStyle = COLORS.pipe;
        // top
        ctx.fillRect(pipe.x, 0, w, pipe.topHeight);
        // bottom
        ctx.fillRect(pipe.x, pipe.bottomY, w, h - pipe.bottomY);

        // caps
        ctx.fillStyle = COLORS.pipeDark;
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 30, w + 10, 30);
        ctx.fillRect(pipe.x - 5, pipe.bottomY, w + 10, 30);
        return;
    }

    // ---- Israeli theme: blue & white banner pipes with small Magen David cap

    // stripes helper
    const drawStripedRect = (y: number, height: number) => {
        // white base
        ctx.fillStyle = COLORS.flagWhite;
        ctx.fillRect(pipe.x, y, w, height);
        // top & bottom blue bands
        const band = Math.max(6, Math.floor(height * 0.08));
        ctx.fillStyle = COLORS.flagBlue;
        ctx.fillRect(pipe.x, y, w, band);
        ctx.fillRect(pipe.x, y + height - band, w, band);
    };

    // top pipe
    drawStripedRect(0, pipe.topHeight);

    // bottom pipe
    drawStripedRect(pipe.bottomY, h - pipe.bottomY);

    // cap plaques with star
    const capH = 30;
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    // top cap
    ctx.fillRect(pipe.x - 6, pipe.topHeight - capH, w + 12, capH);
    drawStarOfDavid(ctx, pipe.x + w / 2, pipe.topHeight - capH / 2, 7, COLORS.gold);
    // bottom cap
    ctx.fillRect(pipe.x - 6, pipe.bottomY, w + 12, capH);
    drawStarOfDavid(ctx, pipe.x + w / 2, pipe.bottomY + capH / 2, 7, COLORS.gold);
};

export const drawPlayer = (
    ctx: CanvasRenderingContext2D,
    player: { x: number; y: number; velocity: number },
    playerImage: HTMLImageElement | HTMLCanvasElement
) => {
    ctx.save();
    ctx.translate(
        player.x + GAME_CONFIG.character.width / 2,
        player.y + GAME_CONFIG.character.height / 2
    );
    const rotation = Math.min(player.velocity * 0.05, 0.5);
    ctx.rotate(rotation);
    ctx.drawImage(
        playerImage,
        -GAME_CONFIG.character.width / 2,
        -GAME_CONFIG.character.height / 2,
        GAME_CONFIG.character.width,
        GAME_CONFIG.character.height
    );
    ctx.restore();
};

export const createDefaultBird = (): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = GAME_CONFIG.character.width;
    canvas.height = GAME_CONFIG.character.height;
    const ctx = canvas.getContext("2d")!;

    const cx = GAME_CONFIG.character.width / 2;
    const cy = GAME_CONFIG.character.height / 2;

    // body
    ctx.fillStyle = COLORS.gold; // little “chick” gold
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fill();

    // eye
    ctx.fillStyle = COLORS.birdEye;
    ctx.beginPath();
    ctx.arc(cx + 5, cy - 5, 6, 0, Math.PI * 2);
    ctx.fill();

    // pupil
    ctx.fillStyle = COLORS.birdPupil;
    ctx.beginPath();
    ctx.arc(cx + 7, cy - 5, 3, 0, Math.PI * 2);
    ctx.fill();

    // beak
    ctx.fillStyle = COLORS.birdBeak;
    ctx.beginPath();
    ctx.moveTo(cx + 15, cy);
    ctx.lineTo(cx + 18, cy + 3);
    ctx.lineTo(cx + 15, cy + 6);
    ctx.closePath();
    ctx.fill();

    // tiny Star of David patch on the side
    drawStarOfDavid(ctx, cx - 8, cy - 2, 4, COLORS.flagBlue);

    return canvas;
};
