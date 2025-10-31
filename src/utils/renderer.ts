import { GAME_CONFIG, COLORS } from "./constants";

/* ===========================================================
   Small geometry helpers
=========================================================== */

function drawRoundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function drawStar(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    points = 5,
    fill: string = COLORS.chinaGold
) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-Math.PI / 2);
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points;
        const rad = i % 2 === 0 ? r : r / 2.5;
        ctx.lineTo(Math.cos(angle) * rad, Math.sin(angle) * rad);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.restore();
}

function drawBinanceDiamond(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    s: number,
    color: string = COLORS.bnbYellow
) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = color;
    ctx.fillRect(-s, -s, s * 2, s * 2);
    ctx.restore();

    const d = s * 0.6;
    const offsets = [
        [0, -s * 1.8],
        [s * 1.8, 0],
        [0, s * 1.8],
        [-s * 1.8, 0],
    ];
    for (const [dx, dy] of offsets) {
        ctx.save();
        ctx.translate(cx + dx, cy + dy);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = color;
        ctx.fillRect(-d / 2, -d / 2, d, d);
        ctx.restore();
    }
}

/* ===========================================================
   Creative CHINA background
   (clouds, Great Wall, pagoda, lanterns, dragon, chopsticks)
=========================================================== */

function drawChinaBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const t = performance.now() / 1000; // seconds

    /* Sky gradient */
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#FFE9BF");
    g.addColorStop(1, "#F6CF8E");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    /* Drifting clouds (parallax) */
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    const cloudY = h * 0.23;
    for (let i = 0; i < 6; i++) {
        const speed = 12 + i * 4;
        const cx = ((t * speed * 20 + i * (w / 6)) % (w + 120)) - 60;
        drawRoundRect(ctx, cx - 45, cloudY + ((i % 3) - 1) * 16, 90, 26, 13);
        ctx.fill();
    }

    /* Great Wall silhouette (very light) */
    ctx.save();
    ctx.translate(0, h * 0.65);
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(-50, 30);
    const segments = 8;
    for (let i = 1; i <= segments; i++) {
        const x = (w / segments) * i;
        const y = 30 + Math.sin(i * 0.9 + t * 0.3) * 18;
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    // battlements
    ctx.lineWidth = 2;
    for (let i = 0; i <= segments; i++) {
        const x = (w / segments) * i;
        const y = 30 + Math.sin(i * 0.9 + t * 0.3) * 18;
        ctx.beginPath();
        ctx.moveTo(x - 10, y - 10);
        ctx.lineTo(x + 10, y - 10);
        ctx.lineTo(x + 10, y);
        ctx.stroke();
    }
    ctx.restore();

    /* Pagoda / Temple silhouette (parallax slightly above wall) */
    ctx.save();
    const pagodaX = w * 0.18 + Math.sin(t * 0.25) * 6;
    const pagodaY = h * 0.48;
    ctx.fillStyle = "rgba(0,0,0,0.15)";

    // base
    drawRoundRect(ctx, pagodaX - 50, pagodaY + 60, 100, 14, 6);
    ctx.fill();
    // tier 1
    drawRoundRect(ctx, pagodaX - 45, pagodaY + 42, 90, 14, 6);
    ctx.fill();
    // tier 2
    drawRoundRect(ctx, pagodaX - 35, pagodaY + 26, 70, 12, 6);
    ctx.fill();
    // tier 3 (roof)
    drawRoundRect(ctx, pagodaX - 28, pagodaY + 10, 56, 10, 6);
    ctx.fill();
    // top pin + small star
    ctx.fillRect(pagodaX - 2, pagodaY - 2, 4, 14);
    drawStar(ctx, pagodaX, pagodaY - 6, 4, 5, COLORS.chinaGold);
    ctx.restore();

    /* Dragon ribbon (swoosh) */
    ctx.save();
    ctx.strokeStyle = "rgba(216,33,34,0.6)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    const amp = 20;
    ctx.moveTo(0, h * 0.35);
    for (let x = 0; x <= w; x += 18) {
        const y = h * 0.35 + Math.sin((x + t * 120) * 0.01) * amp;
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    // dragon head tip
    ctx.fillStyle = COLORS.chinaRed;
    const headX = (t * 120) % (w + 60) - 30;
    const headY = h * 0.35 + Math.sin((headX + t * 120) * 0.01) * amp;
    drawRoundRect(ctx, headX - 14, headY - 8, 28, 16, 8);
    ctx.fill();
    drawStar(ctx, headX + 16, headY, 3, 4, COLORS.chinaGold);
    ctx.restore();

    /* Hanging lanterns (sway) */
    const sway = Math.sin(t * 2) * 0.15;
    const lanternYs = [h * 0.12, h * 0.18];
    lanternYs.forEach((ly, idx) => {
        const baseX = w * (0.25 + idx * 0.32);
        drawLantern(ctx, baseX, ly, 16, sway * (idx % 2 ? -1 : 1));
    });

    /* Crossed chopsticks (corner accent) */
    ctx.save();
    ctx.translate(w - 80, h - 80);
    ctx.rotate(-0.3);
    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-20, 30);
    ctx.lineTo(40, -30);
    ctx.stroke();

    ctx.rotate(0.6);
    ctx.beginPath();
    ctx.moveTo(-20, 30);
    ctx.lineTo(40, -30);
    ctx.stroke();
    ctx.restore();

    /* Floating Binance diamonds (coins) */
    for (let i = 0; i < 5; i++) {
        const fx = ((i * 150 + t * 60) % (w + 80)) - 40;
        const fy = h * 0.15 + (i % 2 === 0 ? 0 : 30);
        const scale = 0.7 + 0.3 * Math.sin(t * 2 + i);
        drawBinanceDiamond(ctx, fx, fy, 5 * scale, "rgba(243,186,47,0.9)");
    }
}

function drawLantern(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    angle: number
) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    // string
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -25);
    ctx.lineTo(0, -r - 6);
    ctx.stroke();

    // body
    ctx.fillStyle = COLORS.chinaRed;
    drawRoundRect(ctx, -r, -r, r * 2, r * 2, r * 0.7);
    ctx.fill();

    // gold bands
    ctx.fillStyle = COLORS.chinaGold;
    ctx.fillRect(-r, -r + 3, r * 2, 3);
    ctx.fillRect(-r, r - 6, r * 2, 3);

    // tassel
    ctx.fillStyle = COLORS.chinaGold;
    ctx.fillRect(-2, r, 4, 10);

    ctx.restore();
}

/* ===========================================================
   BNB pipes / background (unchanged from earlier)
=========================================================== */
function drawBNBBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, COLORS.bnbDark);
    g.addColorStop(1, "#14181E");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    const cell = 40;
    for (let x = 0; x <= w; x += cell) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }
    for (let y = 0; y <= h; y += cell) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }
}

function drawBNPPipe(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.fillStyle = COLORS.bnbGray;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = COLORS.bnbYellow;
    ctx.fillRect(x, y, 4, h);
    ctx.fillRect(x + w - 4, y, 4, h);
    ctx.fillStyle = COLORS.bnbDark;
    const capH = 30;
    ctx.fillRect(x - 6, y - capH, w + 12, capH);
    drawBinanceDiamond(ctx, x + w / 2, y - capH / 2, 6, COLORS.bnbYellow);
}

function drawBNPPipeBottom(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.fillStyle = COLORS.bnbGray;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = COLORS.bnbYellow;
    ctx.fillRect(x, y, 4, h);
    ctx.fillRect(x + w - 4, y, 4, h);
    ctx.fillStyle = COLORS.bnbDark;
    const capH = 30;
    ctx.fillRect(x - 6, y, w + 12, capH);
    drawBinanceDiamond(ctx, x + w / 2, y + capH / 2, 6, COLORS.bnbYellow);
}

/* ===========================================================
   Exported API used by your game
=========================================================== */

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    const w = GAME_CONFIG.canvas.width;
    const h = GAME_CONFIG.canvas.height;

    switch (GAME_CONFIG.theme) {
        case "china":   return drawChinaBackground(ctx, w, h);
        case "bnb":     return drawBNBBackground(ctx, w, h);
        case "jupiter": return drawJupiterBackground(ctx, w, h); // NEW
        default: {
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
    }
};

export const drawPipe = (
    ctx: CanvasRenderingContext2D,
    pipe: { x: number; topHeight: number; bottomY: number }
) => {
    const w = GAME_CONFIG.pipeWidth;
    const h = GAME_CONFIG.canvas.height;

    if (GAME_CONFIG.theme === "jupiter") {
        drawJupiterPipe(ctx, pipe.x, 0, w, pipe.topHeight);
        drawJupiterPipe(ctx, pipe.x, pipe.bottomY, w, h - pipe.bottomY);
        return;
    }

    if (GAME_CONFIG.theme === "china") {
        // red/gold Chinese banner pipes with caps
        ctx.save();
        ctx.globalAlpha = 0.98;
        ctx.restore();
        // top
        drawChinaPipe(ctx, pipe.x, 0, w, pipe.topHeight);
        // bottom
        drawChinaPipeBottom(ctx, pipe.x, pipe.bottomY, w, h - pipe.bottomY);
        return;
    }

    if (GAME_CONFIG.theme === "bnb") {
        drawBNPPipe(ctx, pipe.x, 0, w, pipe.topHeight);
        drawBNPPipeBottom(ctx, pipe.x, pipe.bottomY, w, h - pipe.bottomY);
        return;
    }

    // default
    ctx.fillStyle = COLORS.pipe;
    ctx.fillRect(pipe.x, 0, w, pipe.topHeight);
    ctx.fillRect(pipe.x, pipe.bottomY, w, h - pipe.bottomY);
    ctx.fillStyle = COLORS.pipeDark;
    ctx.fillRect(pipe.x - 5, pipe.topHeight - 30, w + 10, 30);
    ctx.fillRect(pipe.x - 5, pipe.bottomY, w + 10, 30);
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

    // neutral golden bird
    ctx.fillStyle = COLORS.bird;
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = COLORS.birdEye;
    ctx.beginPath();
    ctx.arc(cx + 5, cy - 5, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = COLORS.birdPupil;
    ctx.beginPath();
    ctx.arc(cx + 7, cy - 5, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = COLORS.birdBeak;
    ctx.beginPath();
    ctx.moveTo(cx + 15, cy);
    ctx.lineTo(cx + 18, cy + 3);
    ctx.lineTo(cx + 15, cy + 6);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

/* -------------- China pipe helpers (bottom of file) -------------- */

function drawChinaPipe(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
) {
    ctx.fillStyle = COLORS.chinaRed;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = COLORS.chinaGold;
    ctx.fillRect(x, y, w, 6);
    ctx.fillRect(x, y + h - 6, w, 6);

    ctx.fillStyle = COLORS.chinaDarkRed;
    const capH = 30;
    ctx.fillRect(x - 6, y - capH, w + 12, capH);
    drawStar(ctx, x + w / 2, y - capH / 2, 7, 5, COLORS.chinaGold);
}

function drawChinaPipeBottom(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
) {
    ctx.fillStyle = COLORS.chinaRed;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = COLORS.chinaGold;
    ctx.fillRect(x, y, w, 6);
    ctx.fillRect(x, y + h - 6, w, 6);

    ctx.fillStyle = COLORS.chinaDarkRed;
    const capH = 30;
    ctx.fillRect(x - 6, y, w + 12, capH);
    drawStar(ctx, x + w / 2, y + capH / 2, 7, 5, COLORS.chinaGold);
}

function drawJupiterBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, COLORS.jupiterDark);
    g.addColorStop(1, "#041F1C");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // floating neon stars
    const t = performance.now() / 1000;
    for (let i = 0; i < 40; i++) {
        const x = (i * 80 + t * 50) % (w + 100) - 50;
        const y = (i * 40 + Math.sin(t + i) * 50) % h;
        ctx.fillStyle = COLORS.jupiterStar;
        ctx.globalAlpha = 0.4 + 0.6 * Math.sin(t * 2 + i);
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function drawJupiterPipe(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    const grad = ctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, COLORS.jupiterPipe);
    grad.addColorStop(1, COLORS.jupiterPipeGlow);
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w, h);

    // glowing edge
    ctx.shadowColor = COLORS.jupiterGlow;
    ctx.shadowBlur = 20;
    ctx.fillStyle = COLORS.jupiterGlow;
    ctx.fillRect(x, y, w, 6);
    ctx.fillRect(x, y + h - 6, w, 6);
    ctx.shadowBlur = 0;
}

