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
}
