// ---------------------------------------------------------------------------
// Pixel-art desk items drawn entirely with fillRect (and a few arcs where
// noted). Each item fits in roughly a 16x16 area placed at (x, y).
// ---------------------------------------------------------------------------

function drawGlobe(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Base/stand
  ctx.fillStyle = "#555";
  ctx.fillRect(x + 5, y + 13, 6, 3);
  ctx.fillRect(x + 7, y + 10, 2, 3);

  // Globe body (approximate circle with rects)
  ctx.fillStyle = "#1a5588";
  ctx.fillRect(x + 2, y + 2, 12, 8);
  ctx.fillRect(x + 4, y + 0, 8, 12);
  ctx.fillRect(x + 3, y + 1, 10, 10);

  // Land masses (green patches)
  ctx.fillStyle = "#2a8844";
  ctx.fillRect(x + 4, y + 3, 4, 3);
  ctx.fillRect(x + 9, y + 5, 3, 4);
  ctx.fillRect(x + 5, y + 7, 3, 2);

  // Latitude line
  ctx.fillStyle = "#2266aa";
  ctx.fillRect(x + 3, y + 5, 10, 1);
}

function drawBooks(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Three stacked books, slightly offset
  ctx.fillStyle = "#cc4444";
  ctx.fillRect(x + 1, y + 9, 14, 5);
  // spine detail
  ctx.fillStyle = "#aa3333";
  ctx.fillRect(x + 1, y + 9, 2, 5);

  ctx.fillStyle = "#33aa55";
  ctx.fillRect(x + 2, y + 4, 12, 5);
  ctx.fillStyle = "#228844";
  ctx.fillRect(x + 2, y + 4, 2, 5);

  ctx.fillStyle = "#4466cc";
  ctx.fillRect(x + 0, y + 0, 13, 4);
  ctx.fillStyle = "#3355bb";
  ctx.fillRect(x + 0, y + 0, 2, 4);
}

function drawCoffee(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Cup body
  ctx.fillStyle = "#6b4226";
  ctx.fillRect(x + 3, y + 6, 10, 10);
  // Cup rim
  ctx.fillStyle = "#7b5236";
  ctx.fillRect(x + 2, y + 5, 12, 2);
  // Handle
  ctx.fillStyle = "#6b4226";
  ctx.fillRect(x + 13, y + 8, 3, 2);
  ctx.fillRect(x + 14, y + 8, 2, 5);
  ctx.fillRect(x + 13, y + 12, 3, 2);
  // Coffee inside
  ctx.fillStyle = "#3a1a0a";
  ctx.fillRect(x + 4, y + 7, 8, 3);

  // Steam lines (white / light)
  ctx.fillStyle = "#aabbcc";
  ctx.fillRect(x + 5, y + 2, 2, 3);
  ctx.fillRect(x + 9, y + 1, 2, 3);
  ctx.fillRect(x + 7, y + 0, 2, 2);
}

function drawPalette(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Palette body (oval-ish shape)
  ctx.fillStyle = "#8b7355";
  ctx.fillRect(x + 1, y + 4, 14, 8);
  ctx.fillRect(x + 3, y + 2, 10, 12);
  ctx.fillRect(x + 2, y + 3, 12, 10);

  // Thumb hole
  ctx.fillStyle = "#0d1117";
  ctx.fillRect(x + 4, y + 8, 3, 3);

  // Paint dots
  ctx.fillStyle = "#ff4444";
  ctx.fillRect(x + 5, y + 4, 3, 3);
  ctx.fillStyle = "#44dd44";
  ctx.fillRect(x + 9, y + 5, 3, 3);
  ctx.fillStyle = "#4488ff";
  ctx.fillRect(x + 10, y + 9, 3, 3);
  ctx.fillStyle = "#ffcc00";
  ctx.fillRect(x + 7, y + 9, 3, 2);
}

function drawCamera(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Camera body
  ctx.fillStyle = "#444";
  ctx.fillRect(x + 1, y + 5, 14, 10);
  // Top bump (viewfinder area)
  ctx.fillStyle = "#555";
  ctx.fillRect(x + 3, y + 2, 6, 4);
  // Flash
  ctx.fillStyle = "#888";
  ctx.fillRect(x + 10, y + 3, 4, 3);

  // Lens (concentric rects)
  ctx.fillStyle = "#222";
  ctx.fillRect(x + 4, y + 7, 8, 6);
  ctx.fillStyle = "#1a3a5c";
  ctx.fillRect(x + 5, y + 8, 6, 4);
  ctx.fillStyle = "#3a6a9c";
  ctx.fillRect(x + 6, y + 9, 4, 2);
  // Lens highlight
  ctx.fillStyle = "#88aacc";
  ctx.fillRect(x + 7, y + 9, 2, 1);
}

function drawWaveform(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Background bar (dark)
  ctx.fillStyle = "#111a22";
  ctx.fillRect(x, y + 2, 16, 12);

  // Green waveform bars at varying heights
  ctx.fillStyle = "#33dd66";
  const heights = [3, 6, 10, 5, 8, 11, 4, 7, 9, 6, 3, 8, 5, 10, 7, 4];
  for (let i = 0; i < 16; i++) {
    const h = heights[i];
    ctx.fillRect(x + i, y + 2 + (12 - h), 1, h);
  }

  // Center line
  ctx.fillStyle = "#226644";
  ctx.fillRect(x, y + 8, 16, 1);
}

function drawShield(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Shield shape built from rects (wider at top, tapers down)
  ctx.fillStyle = "#3355aa";
  ctx.fillRect(x + 2, y + 0, 12, 4);
  ctx.fillRect(x + 2, y + 4, 12, 4);
  ctx.fillRect(x + 3, y + 8, 10, 3);
  ctx.fillRect(x + 4, y + 11, 8, 2);
  ctx.fillRect(x + 5, y + 13, 6, 1);
  ctx.fillRect(x + 6, y + 14, 4, 1);

  // Shield emblem (lighter cross/star)
  ctx.fillStyle = "#6688cc";
  ctx.fillRect(x + 7, y + 2, 2, 10);
  ctx.fillRect(x + 4, y + 5, 8, 2);

  // Border highlight
  ctx.fillStyle = "#4466bb";
  ctx.fillRect(x + 2, y + 0, 12, 1);
  ctx.fillRect(x + 2, y + 0, 1, 8);
  ctx.fillRect(x + 13, y + 0, 1, 8);
}

function drawFire(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Outer flame (red/orange)
  ctx.fillStyle = "#cc4400";
  ctx.fillRect(x + 4, y + 8, 8, 6);
  ctx.fillRect(x + 3, y + 6, 10, 4);
  ctx.fillRect(x + 5, y + 3, 6, 5);
  ctx.fillRect(x + 6, y + 1, 4, 4);
  ctx.fillRect(x + 7, y + 0, 2, 2);

  // Inner flame (yellow/orange)
  ctx.fillStyle = "#ff8800";
  ctx.fillRect(x + 5, y + 8, 6, 5);
  ctx.fillRect(x + 6, y + 5, 4, 5);
  ctx.fillRect(x + 7, y + 3, 2, 4);

  // Core (bright yellow)
  ctx.fillStyle = "#ffcc00";
  ctx.fillRect(x + 6, y + 9, 4, 4);
  ctx.fillRect(x + 7, y + 6, 2, 4);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

const drawFns: Record<string, (ctx: CanvasRenderingContext2D, x: number, y: number) => void> = {
  globe: drawGlobe,
  books: drawBooks,
  coffee: drawCoffee,
  palette: drawPalette,
  camera: drawCamera,
  waveform: drawWaveform,
  shield: drawShield,
  fire: drawFire,
};

export function drawDeskItem(
  ctx: CanvasRenderingContext2D,
  item: string,
  x: number,
  y: number,
): void {
  const fn = drawFns[item];
  if (fn) fn(ctx, x, y);
}
