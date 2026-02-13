import { ROOMS, WALL_COLOR } from "./constants";

// ---------------------------------------------------------------------------
// Helper: draw a rectangular border (walls) with optional door gap at bottom
// ---------------------------------------------------------------------------
function drawWalls(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  doorX: number, // relative to room x
  doorW: number,
) {
  const t = 4; // wall thickness
  ctx.fillStyle = WALL_COLOR;

  // top wall
  ctx.fillRect(x, y, w, t);
  // left wall
  ctx.fillRect(x, y, t, h);
  // right wall
  ctx.fillRect(x + w - t, y, t, h);
  // bottom wall — two segments with door gap
  ctx.fillRect(x, y + h - t, doorX, t);
  ctx.fillRect(x + doorX + doorW, y + h - t, w - doorX - doorW, t);
}

// ---------------------------------------------------------------------------
// Conference Room (left)
// ---------------------------------------------------------------------------
function drawConference(ctx: CanvasRenderingContext2D) {
  const r = ROOMS.conference;

  // Floor — light gray tiles
  ctx.fillStyle = "#1d2230";
  ctx.fillRect(r.x, r.y, r.w, r.h);

  // Walls with door at center-bottom
  drawWalls(ctx, r.x, r.y, r.w, r.h, 110, 50);

  // Round table (drawn as a filled circle via arc, but spec says fillRect — approximate with rects)
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2 + 10;
  const tableR = 30;
  // Approximate circle with overlapping rects
  ctx.fillStyle = "#3d2b14";
  ctx.fillRect(cx - tableR, cy - tableR * 0.6, tableR * 2, tableR * 1.2);
  ctx.fillRect(cx - tableR * 0.6, cy - tableR, tableR * 1.2, tableR * 2);
  // slightly rounder corners
  ctx.fillRect(cx - tableR * 0.85, cy - tableR * 0.85, tableR * 1.7, tableR * 1.7);

  // Chairs around table (small dark rectangles)
  ctx.fillStyle = "#2a2a3a";
  const chairSize = 10;
  // top
  ctx.fillRect(cx - chairSize / 2, cy - tableR - 14, chairSize, 10);
  // bottom
  ctx.fillRect(cx - chairSize / 2, cy + tableR + 4, chairSize, 10);
  // left
  ctx.fillRect(cx - tableR - 14, cy - chairSize / 2, 10, chairSize);
  // right
  ctx.fillRect(cx + tableR + 4, cy - chairSize / 2, 10, chairSize);
  // diagonal chairs
  ctx.fillRect(cx - tableR - 8, cy - tableR - 8, 9, 9);
  ctx.fillRect(cx + tableR - 1, cy - tableR - 8, 9, 9);
  ctx.fillRect(cx - tableR - 8, cy + tableR - 1, 9, 9);
  ctx.fillRect(cx + tableR - 1, cy + tableR - 1, 9, 9);

  // Whiteboard on north wall
  ctx.fillStyle = "#c8c8d0";
  ctx.fillRect(r.x + 40, r.y + 10, 80, 35);
  ctx.fillStyle = "#999";
  ctx.fillRect(r.x + 40, r.y + 10, 80, 2); // top edge
  ctx.fillRect(r.x + 40, r.y + 43, 80, 2); // bottom edge
  // Some scribbles on whiteboard
  ctx.fillStyle = "#3366aa";
  ctx.fillRect(r.x + 50, r.y + 20, 30, 2);
  ctx.fillRect(r.x + 48, r.y + 26, 40, 2);
  ctx.fillStyle = "#cc4444";
  ctx.fillRect(r.x + 52, r.y + 32, 25, 2);

  // Room label
  ctx.fillStyle = "#445566";
  ctx.font = '9px "JetBrains Mono", monospace';
  ctx.fillText("CONFERENCE", r.x + 85, r.y + r.h - 12);
}

// ---------------------------------------------------------------------------
// Boss Office (center)
// ---------------------------------------------------------------------------
function drawBossOffice(ctx: CanvasRenderingContext2D) {
  const r = ROOMS.boss;

  // Carpet floor
  ctx.fillStyle = "#1a1520";
  ctx.fillRect(r.x, r.y, r.w, r.h);

  // Walls with door at left side of bottom
  drawWalls(ctx, r.x, r.y, r.w, r.h, 30, 50);

  // Executive desk (large dark wood)
  const deskX = r.x + r.w / 2 - 50;
  const deskY = r.y + 50;
  ctx.fillStyle = "#3a2510";
  ctx.fillRect(deskX, deskY, 100, 45);
  // desk surface highlight
  ctx.fillStyle = "#4a3520";
  ctx.fillRect(deskX + 4, deskY + 4, 92, 37);

  // Monitor on desk
  ctx.fillStyle = "#333";
  ctx.fillRect(deskX + 38, deskY + 6, 24, 18);
  ctx.fillStyle = "#1a3a5c";
  ctx.fillRect(deskX + 40, deskY + 8, 20, 14);
  // Monitor stand
  ctx.fillStyle = "#333";
  ctx.fillRect(deskX + 47, deskY + 24, 6, 4);

  // Executive chair behind desk
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(deskX + 35, deskY - 16, 30, 14);
  // chair back (taller)
  ctx.fillStyle = "#222240";
  ctx.fillRect(deskX + 38, deskY - 22, 24, 8);

  // Couch along right wall
  ctx.fillStyle = "#2a1a2a";
  ctx.fillRect(r.x + r.w - 50, r.y + 50, 36, 70);
  // couch back
  ctx.fillStyle = "#3a2a3a";
  ctx.fillRect(r.x + r.w - 50, r.y + 50, 8, 70);
  // cushions
  ctx.fillStyle = "#3a2040";
  ctx.fillRect(r.x + r.w - 40, r.y + 55, 24, 28);
  ctx.fillRect(r.x + r.w - 40, r.y + 87, 24, 28);

  // Bookshelf on north wall
  const bsX = r.x + 20;
  const bsY = r.y + 10;
  ctx.fillStyle = "#2a1f0a";
  ctx.fillRect(bsX, bsY, 80, 50);
  // shelves
  ctx.fillStyle = "#3a2f1a";
  ctx.fillRect(bsX, bsY + 16, 80, 2);
  ctx.fillRect(bsX, bsY + 33, 80, 2);
  // books (colored spines)
  const bookColors = ["#cc4444", "#44aa44", "#4466cc", "#cc8833", "#aa44aa", "#44aaaa"];
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = bookColors[i];
    ctx.fillRect(bsX + 6 + i * 12, bsY + 3, 8, 12);
  }
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = bookColors[(i + 2) % bookColors.length];
    ctx.fillRect(bsX + 8 + i * 14, bsY + 19, 9, 13);
  }
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = bookColors[(i + 4) % bookColors.length];
    ctx.fillRect(bsX + 10 + i * 16, bsY + 36, 10, 12);
  }

  // Wall clock on north wall
  const clockCX = r.x + r.w - 60;
  const clockCY = r.y + 22;
  const clockR = 7;
  // Clock face (approximate circle with overlapping rects)
  ctx.fillStyle = "#dddde0";
  ctx.fillRect(clockCX - clockR, clockCY - clockR * 0.7, clockR * 2, clockR * 1.4);
  ctx.fillRect(clockCX - clockR * 0.7, clockCY - clockR, clockR * 1.4, clockR * 2);
  // Clock border
  ctx.fillStyle = "#444";
  ctx.fillRect(clockCX - clockR - 1, clockCY - clockR * 0.7 - 1, clockR * 2 + 2, 1);
  ctx.fillRect(clockCX - clockR - 1, clockCY + clockR * 0.7, clockR * 2 + 2, 1);
  ctx.fillRect(clockCX - clockR * 0.7 - 1, clockCY - clockR - 1, 1, clockR * 2 + 2);
  ctx.fillRect(clockCX + clockR * 0.7, clockCY - clockR - 1, 1, clockR * 2 + 2);
  // Center dot
  ctx.fillStyle = "#222";
  ctx.fillRect(clockCX - 1, clockCY - 1, 2, 2);
  // Clock hands based on real time
  const clockNow = new Date();
  const minutes = clockNow.getMinutes();
  const hours = clockNow.getHours() % 12;
  // Minute hand (longer)
  const minAngle = (minutes / 60) * Math.PI * 2 - Math.PI / 2;
  const minLen = 5;
  const minEndX = clockCX + Math.round(Math.cos(minAngle) * minLen);
  const minEndY = clockCY + Math.round(Math.sin(minAngle) * minLen);
  ctx.fillStyle = "#222";
  // Draw minute hand as a thin rect from center toward the end
  const minDx = minEndX - clockCX;
  const minDy = minEndY - clockCY;
  for (let t = 0; t <= 1; t += 0.2) {
    ctx.fillRect(clockCX + Math.round(minDx * t), clockCY + Math.round(minDy * t), 1, 1);
  }
  // Hour hand (shorter)
  const hrAngle = ((hours + minutes / 60) / 12) * Math.PI * 2 - Math.PI / 2;
  const hrLen = 3;
  const hrEndX = clockCX + Math.round(Math.cos(hrAngle) * hrLen);
  const hrEndY = clockCY + Math.round(Math.sin(hrAngle) * hrLen);
  ctx.fillStyle = "#333";
  for (let t = 0; t <= 1; t += 0.25) {
    ctx.fillRect(clockCX + Math.round((hrEndX - clockCX) * t), clockCY + Math.round((hrEndY - clockCY) * t), 1, 1);
  }

  // Small plant in corner
  ctx.fillStyle = "#3a2510";
  ctx.fillRect(r.x + 15, r.y + 140, 14, 12);
  ctx.fillStyle = "#2a6630";
  ctx.fillRect(r.x + 12, r.y + 128, 8, 14);
  ctx.fillRect(r.x + 22, r.y + 130, 8, 12);
  ctx.fillRect(r.x + 16, r.y + 122, 8, 12);

  // Room label
  ctx.fillStyle = "#445566";
  ctx.font = '9px "JetBrains Mono", monospace';
  ctx.fillText("BOSS OFFICE", r.x + 100, r.y + r.h - 12);
}

// ---------------------------------------------------------------------------
// Kitchen (right)
// ---------------------------------------------------------------------------
function drawKitchen(ctx: CanvasRenderingContext2D) {
  const r = ROOMS.kitchen;

  // Light tile floor
  ctx.fillStyle = "#1e2230";
  ctx.fillRect(r.x, r.y, r.w, r.h);

  // Subtle tile grid
  ctx.fillStyle = "#222638";
  for (let row = 0; row < r.h / 20; row++) {
    for (let col = 0; col < r.w / 20; col++) {
      if ((row + col) % 2 === 0) {
        ctx.fillRect(r.x + col * 20, r.y + row * 20, 20, 20);
      }
    }
  }

  // Walls with door at left side of bottom
  drawWalls(ctx, r.x, r.y, r.w, r.h, 20, 50);

  // Upper cabinets (white rectangles along north wall)
  ctx.fillStyle = "#8888a0";
  ctx.fillRect(r.x + 15, r.y + 10, 55, 28);
  ctx.fillRect(r.x + 80, r.y + 10, 55, 28);
  ctx.fillRect(r.x + 145, r.y + 10, 55, 28);
  // Cabinet details (knobs / divisions)
  ctx.fillStyle = "#6666880";
  ctx.fillRect(r.x + 40, r.y + 10, 2, 28);
  ctx.fillRect(r.x + 105, r.y + 10, 2, 28);
  ctx.fillRect(r.x + 170, r.y + 10, 2, 28);
  // cabinet handles
  ctx.fillStyle = "#aaaacc";
  ctx.fillRect(r.x + 28, r.y + 22, 8, 3);
  ctx.fillRect(r.x + 48, r.y + 22, 8, 3);
  ctx.fillRect(r.x + 93, r.y + 22, 8, 3);
  ctx.fillRect(r.x + 113, r.y + 22, 8, 3);
  ctx.fillRect(r.x + 158, r.y + 22, 8, 3);
  ctx.fillRect(r.x + 178, r.y + 22, 8, 3);

  // Counter below cabinets
  ctx.fillStyle = "#555568";
  ctx.fillRect(r.x + 15, r.y + 42, 185, 12);

  // Fridge (tall white rect) on right side
  ctx.fillStyle = "#707888";
  ctx.fillRect(r.x + 215, r.y + 15, 40, 100);
  // fridge door division
  ctx.fillStyle = "#606878";
  ctx.fillRect(r.x + 215, r.y + 58, 40, 3);
  // fridge handle
  ctx.fillStyle = "#aaaacc";
  ctx.fillRect(r.x + 250, r.y + 30, 3, 20);
  ctx.fillRect(r.x + 250, r.y + 70, 3, 25);

  // Coffee machine on counter
  ctx.fillStyle = "#3a2a1a";
  ctx.fillRect(r.x + 30, r.y + 56, 22, 28);
  // coffee machine top
  ctx.fillStyle = "#4a3a2a";
  ctx.fillRect(r.x + 28, r.y + 54, 26, 6);
  // red power dot
  ctx.fillStyle = "#ff3333";
  ctx.fillRect(r.x + 46, r.y + 72, 4, 4);
  // coffee pot/cup area
  ctx.fillStyle = "#2a1a0a";
  ctx.fillRect(r.x + 33, r.y + 74, 14, 8);

  // Coffee steam particles
  const steamBaseX = r.x + 40;
  const steamBaseY = r.y + 54;
  const now = Date.now();
  for (let p = 0; p < 3; p++) {
    const cycle = ((now + p * 600) % 1800) / 1800; // 0..1 repeating
    const py = steamBaseY - cycle * 20; // float upward
    const px = steamBaseX + Math.sin((now + p * 500) * 0.004) * 4; // bob left/right
    const alpha = 0.35 * (1 - cycle); // fade out as it rises
    ctx.fillStyle = `rgba(200, 200, 220, ${alpha})`;
    const size = 2 + cycle;
    ctx.fillRect(px, py, size, size);
  }

  // Sink on counter
  ctx.fillStyle = "#4a4a5a";
  ctx.fillRect(r.x + 100, r.y + 56, 30, 20);
  ctx.fillStyle = "#383848";
  ctx.fillRect(r.x + 104, r.y + 60, 22, 12);
  // faucet
  ctx.fillStyle = "#888899";
  ctx.fillRect(r.x + 113, r.y + 54, 4, 8);
  ctx.fillRect(r.x + 110, r.y + 52, 10, 3);

  // Small table with chairs (break area)
  ctx.fillStyle = "#3d2b14";
  ctx.fillRect(r.x + 80, r.y + 110, 60, 35);
  // table highlight
  ctx.fillStyle = "#4d3b24";
  ctx.fillRect(r.x + 83, r.y + 113, 54, 29);
  // chairs
  ctx.fillStyle = "#2a2a3a";
  ctx.fillRect(r.x + 70, r.y + 118, 10, 10);
  ctx.fillRect(r.x + 140, r.y + 118, 10, 10);
  ctx.fillRect(r.x + 95, r.y + 148, 10, 10);
  ctx.fillRect(r.x + 118, r.y + 148, 10, 10);

  // Room label
  ctx.fillStyle = "#445566";
  ctx.font = '9px "JetBrains Mono", monospace';
  ctx.fillText("KITCHEN", r.x + 105, r.y + r.h - 12);
}

// ---------------------------------------------------------------------------
// Public: draw all 3 rooms
// ---------------------------------------------------------------------------
export function drawRooms(ctx: CanvasRenderingContext2D): void {
  drawConference(ctx);
  drawBossOffice(ctx);
  drawKitchen(ctx);

  // Water cooler in corridor area
  const wcX = 400;
  const wcY = 185;
  // Body (white/light gray)
  ctx.fillStyle = "#ccccdd";
  ctx.fillRect(wcX, wcY + 6, 12, 14);
  // Base
  ctx.fillStyle = "#8888aa";
  ctx.fillRect(wcX - 1, wcY + 20, 14, 3);
  // Water jug on top (blue)
  ctx.fillStyle = "#4488cc";
  ctx.fillRect(wcX + 2, wcY, 8, 7);
  // Jug highlight
  ctx.fillStyle = "#66aaee";
  ctx.fillRect(wcX + 3, wcY + 1, 3, 5);
  // Spout
  ctx.fillStyle = "#999";
  ctx.fillRect(wcX + 4, wcY + 13, 4, 2);
}
