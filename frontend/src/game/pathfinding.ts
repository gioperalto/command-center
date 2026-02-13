// ---------------------------------------------------------------------------
// Simple waypoint-based movement / wander targets for idle agents
// ---------------------------------------------------------------------------

import { CUBICLES } from "./constants";

export interface WanderTarget {
  x: number;
  y: number;
}

/**
 * Positions agents can wander to when idle.
 * Spread across the main rooms and corridors of the office.
 */
export const WANDER_TARGETS: WanderTarget[] = [
  // Kitchen area (top-right room)
  { x: 600, y: 90 },
  { x: 680, y: 110 },
  { x: 760, y: 130 },
  { x: 640, y: 140 },

  // Conference room (top-left room)
  { x: 60, y: 90 },
  { x: 135, y: 100 },
  { x: 200, y: 120 },

  // Boss office (top-center room)
  { x: 330, y: 90 },
  { x: 420, y: 110 },
  { x: 500, y: 130 },

  // Top corridor (between rooms and cubicle row 1)
  { x: 80, y: 210 },
  { x: 280, y: 210 },
  { x: 500, y: 210 },
  { x: 720, y: 210 },

  // Between cubicle rows
  { x: 120, y: 390 },
  { x: 350, y: 390 },
  { x: 560, y: 390 },

  // Bottom corridor
  { x: 100, y: 580 },
  { x: 300, y: 580 },
  { x: 500, y: 580 },
  { x: 700, y: 580 },
];

/**
 * Returns the chair / sitting position for a given cubicle.
 * Offset from the cubicle top-left to roughly center the character on
 * the chair area (about 60px right, 80px down from cubicle origin).
 */
export function getDeskPosition(
  cubicleIndex: number,
  cubiclePositions: { x: number; y: number }[],
): { x: number; y: number } {
  const cub = cubiclePositions[cubicleIndex];
  if (!cub) {
    // Fallback to constants if no position provided
    const fallback = CUBICLES[cubicleIndex] ?? { x: 100, y: 300 };
    return { x: fallback.x + 60, y: fallback.y + 80 };
  }
  return { x: cub.x + 60, y: cub.y + 80 };
}

/**
 * Pick a random wander target from the list.
 */
export function getRandomWanderTarget(): WanderTarget {
  return WANDER_TARGETS[Math.floor(Math.random() * WANDER_TARGETS.length)];
}
