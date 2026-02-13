// ---------------------------------------------------------------------------
// Layout & palette constants for the retro office sim
// ---------------------------------------------------------------------------

export const CANVAS_WIDTH = 1100;
export const CANVAS_HEIGHT = 720;
export const OFFICE_WIDTH = 820; // right 280px reserved for event stream
export const TILE_SIZE = 20;

// ---- Color palette (dark theme) ------------------------------------------

export const FLOOR_DARK = "#0d1117";
export const FLOOR_LIGHT = "#131a24";
export const WALL_COLOR = "#1a1f2e";
export const DESK_COLOR = "#2a1f0a";
export const MONITOR_FRAME = "#333333";
export const MONITOR_SCREEN = "#1a3a5c";
export const CARPET_COLOR = "#1a1520";
export const CHAIR_COLOR = "#222222";
export const PARTITION_COLOR = "#1e2636";

// ---- Vertical zones ------------------------------------------------------

export const ROOM_TOP = 0;
export const ROOM_BOTTOM = 180;
export const CORRIDOR_TOP_Y = 180;
export const CORRIDOR_TOP_BOTTOM = 240;
export const CUBICLE_ROW1_Y = 240;
export const CUBICLE_ROW1_BOTTOM = 400;
export const CUBICLE_ROW2_Y = 400;
export const CUBICLE_ROW2_BOTTOM = 560;
export const CORRIDOR_BOTTOM_Y = 560;
export const CORRIDOR_BOTTOM_BOTTOM = 660;

// ---- Room areas ----------------------------------------------------------

export const ROOMS = {
  conference: { x: 0, y: 0, w: 270, h: 180 },
  boss: { x: 270, y: 0, w: 280, h: 180 },
  kitchen: { x: 550, y: 0, w: 270, h: 180 },
} as const;

// ---- Cubicle grid (4 columns x 2 rows) ----------------------------------

const CUBICLE_W = 185;
const CUBICLE_H = 150;
const CUBICLE_X_START = 20;
const CUBICLE_X_GAP = 10;

function cubicleX(col: number): number {
  return CUBICLE_X_START + col * (CUBICLE_W + CUBICLE_X_GAP);
}

export interface CubiclePos {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const CUBICLES: CubiclePos[] = [
  // Row 1 (indices 0-3)
  { x: cubicleX(0), y: CUBICLE_ROW1_Y, w: CUBICLE_W, h: CUBICLE_H },
  { x: cubicleX(1), y: CUBICLE_ROW1_Y, w: CUBICLE_W, h: CUBICLE_H },
  { x: cubicleX(2), y: CUBICLE_ROW1_Y, w: CUBICLE_W, h: CUBICLE_H },
  { x: cubicleX(3), y: CUBICLE_ROW1_Y, w: CUBICLE_W, h: CUBICLE_H },
  // Row 2 (indices 4-7)
  { x: cubicleX(0), y: CUBICLE_ROW2_Y, w: CUBICLE_W, h: CUBICLE_H },
  { x: cubicleX(1), y: CUBICLE_ROW2_Y, w: CUBICLE_W, h: CUBICLE_H },
  { x: cubicleX(2), y: CUBICLE_ROW2_Y, w: CUBICLE_W, h: CUBICLE_H },
  { x: cubicleX(3), y: CUBICLE_ROW2_Y, w: CUBICLE_W, h: CUBICLE_H },
];

// ---- Corridor Y positions ------------------------------------------------

export const CORRIDOR_Y = {
  top: { y: CORRIDOR_TOP_Y, h: CORRIDOR_TOP_BOTTOM - CORRIDOR_TOP_Y },
  bottom: { y: CORRIDOR_BOTTOM_Y, h: CORRIDOR_BOTTOM_BOTTOM - CORRIDOR_BOTTOM_Y },
} as const;

// ---- Waypoints for pathfinding -------------------------------------------

export const WAYPOINTS: Record<string, { x: number; y: number }> = {
  conference: { x: 135, y: 100 },
  boss_office: { x: 410, y: 100 },
  kitchen: { x: 685, y: 100 },
  corridor_top: { x: 410, y: 210 },
  corridor_bottom: { x: 410, y: 610 },
  lounge: { x: 100, y: 610 },
  corridor_left: { x: 60, y: 210 },
  corridor_right: { x: 760, y: 210 },
};
