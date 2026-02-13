// ---------------------------------------------------------------------------
// Pixel-art character renderer — 10x20 logical grid, scaled 2x (20x40px)
// All drawing via fillRect, no external images.
// ---------------------------------------------------------------------------

export type CharacterPose = "standing" | "walk_a" | "walk_b" | "sitting";

// A pixel definition: [row, col] pairs for each body region per pose.
// Grid is 10 columns wide (0-9), 20 rows tall (0-19).
// Rows 0-1:  hair
// Rows 2-4:  face
// Rows 4-9:  shirt / torso + arms
// Rows 10-15: pants / legs
// Rows 16-17: shoes

const SKIN_COLOR = "#deb887";
const PANTS_COLOR = "#2d2d3d";
const SHOE_COLOR = "#1a1a2a";

/**
 * Darken a hex color by a factor (0-1, where 0 = black).
 * Used to derive hair color from agent color.
 */
function darkenColor(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const dr = Math.round(r * factor);
  const dg = Math.round(g * factor);
  const db = Math.round(b * factor);
  return `rgb(${dr},${dg},${db})`;
}

// ---------------------------------------------------------------------------
// Pose pixel definitions — each returns { hair, face, shirt, pants, shoes }
// as arrays of [row, col] pairs.
// ---------------------------------------------------------------------------

interface PosePixels {
  hair: [number, number][];
  face: [number, number][];
  shirt: [number, number][];
  pants: [number, number][];
  shoes: [number, number][];
}

function standingPose(): PosePixels {
  return {
    // Hair: rows 0-1, cols 3-6
    hair: [
      [0, 3], [0, 4], [0, 5], [0, 6],
      [1, 3], [1, 4], [1, 5], [1, 6],
    ],
    // Face: rows 2-3, cols 3-6
    face: [
      [2, 3], [2, 4], [2, 5], [2, 6],
      [3, 3], [3, 4], [3, 5], [3, 6],
    ],
    // Shirt / torso: rows 4-9, cols 3-6 (body), arms at cols 2 and 7
    shirt: [
      [4, 3], [4, 4], [4, 5], [4, 6],
      [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7],
      [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7],
      [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7],
      [8, 3], [8, 4], [8, 5], [8, 6],
      [9, 3], [9, 4], [9, 5], [9, 6],
    ],
    // Pants: rows 10-15, cols 3-4 (left leg), 5-6 (right leg)
    pants: [
      [10, 3], [10, 4], [10, 5], [10, 6],
      [11, 3], [11, 4], [11, 5], [11, 6],
      [12, 3], [12, 4], [12, 5], [12, 6],
      [13, 3], [13, 4], [13, 5], [13, 6],
      [14, 3], [14, 4], [14, 5], [14, 6],
      [15, 3], [15, 4], [15, 5], [15, 6],
    ],
    // Shoes: rows 16-17
    shoes: [
      [16, 3], [16, 4], [16, 5], [16, 6],
      [17, 3], [17, 4], [17, 5], [17, 6],
    ],
  };
}

function walkAPose(): PosePixels {
  // Left arm forward (col 1-2 at rows 6-8), right arm back (col 7 at rows 5-6)
  // Right leg forward (col 5-6 shifted down 1), left leg back (col 3-4 shifted up 1)
  return {
    hair: [
      [0, 3], [0, 4], [0, 5], [0, 6],
      [1, 3], [1, 4], [1, 5], [1, 6],
    ],
    face: [
      [2, 3], [2, 4], [2, 5], [2, 6],
      [3, 3], [3, 4], [3, 5], [3, 6],
    ],
    shirt: [
      [4, 3], [4, 4], [4, 5], [4, 6],
      [5, 3], [5, 4], [5, 5], [5, 6], [5, 7],
      [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7],
      [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6],
      [8, 2], [8, 3], [8, 4], [8, 5], [8, 6],
      [9, 3], [9, 4], [9, 5], [9, 6],
    ],
    // Left leg back (shorter), right leg forward (extended)
    pants: [
      [10, 3], [10, 4], [10, 5], [10, 6],
      [11, 3], [11, 4], [11, 5], [11, 6],
      [12, 3], [12, 4], [12, 6], [12, 7],
      [13, 3], [13, 4], [13, 6], [13, 7],
      [14, 3], [14, 4], [14, 6], [14, 7],
      [15, 3], [15, 4], [15, 6], [15, 7],
    ],
    shoes: [
      [16, 2], [16, 3], [16, 7], [16, 8],
      [17, 2], [17, 3], [17, 7], [17, 8],
    ],
  };
}

function walkBPose(): PosePixels {
  // Mirrored walk_a: right arm forward, left leg forward
  return {
    hair: [
      [0, 3], [0, 4], [0, 5], [0, 6],
      [1, 3], [1, 4], [1, 5], [1, 6],
    ],
    face: [
      [2, 3], [2, 4], [2, 5], [2, 6],
      [3, 3], [3, 4], [3, 5], [3, 6],
    ],
    shirt: [
      [4, 3], [4, 4], [4, 5], [4, 6],
      [5, 2], [5, 3], [5, 4], [5, 5], [5, 6],
      [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
      [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8],
      [8, 3], [8, 4], [8, 5], [8, 6], [8, 7],
      [9, 3], [9, 4], [9, 5], [9, 6],
    ],
    // Right leg back, left leg forward
    pants: [
      [10, 3], [10, 4], [10, 5], [10, 6],
      [11, 3], [11, 4], [11, 5], [11, 6],
      [12, 2], [12, 3], [12, 5], [12, 6],
      [13, 2], [13, 3], [13, 5], [13, 6],
      [14, 2], [14, 3], [14, 5], [14, 6],
      [15, 2], [15, 3], [15, 5], [15, 6],
    ],
    shoes: [
      [16, 1], [16, 2], [16, 6], [16, 7],
      [17, 1], [17, 2], [17, 6], [17, 7],
    ],
  };
}

function sittingPose(): PosePixels {
  // Seated: legs bent at row 10, arms extended forward (typing)
  return {
    hair: [
      [0, 3], [0, 4], [0, 5], [0, 6],
      [1, 3], [1, 4], [1, 5], [1, 6],
    ],
    face: [
      [2, 3], [2, 4], [2, 5], [2, 6],
      [3, 3], [3, 4], [3, 5], [3, 6],
    ],
    // Torso leaning forward slightly; arms extended at rows 6-8 cols 0-2 and 7-9
    shirt: [
      [4, 3], [4, 4], [4, 5], [4, 6],
      [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7],
      [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
      [7, 0], [7, 1], [7, 3], [7, 4], [7, 5], [7, 6], [7, 8], [7, 9],
      [8, 0], [8, 1], [8, 3], [8, 4], [8, 5], [8, 6], [8, 8], [8, 9],
      [9, 3], [9, 4], [9, 5], [9, 6],
    ],
    // Legs bent — thighs horizontal then knees down
    pants: [
      [10, 3], [10, 4], [10, 5], [10, 6],
      [11, 3], [11, 4], [11, 5], [11, 6],
      [12, 2], [12, 3], [12, 6], [12, 7],
      [13, 2], [13, 3], [13, 6], [13, 7],
    ],
    shoes: [
      [14, 2], [14, 3], [14, 6], [14, 7],
      [15, 2], [15, 3], [15, 6], [15, 7],
    ],
  };
}

const POSE_MAP: Record<CharacterPose, () => PosePixels> = {
  standing: standingPose,
  walk_a: walkAPose,
  walk_b: walkBPose,
  sitting: sittingPose,
};

// ---------------------------------------------------------------------------
// Main draw function
// ---------------------------------------------------------------------------

/**
 * Draw a pixel-art character at the given position.
 *
 * @param ctx       Canvas 2D context
 * @param x         Top-left x in canvas coords
 * @param y         Top-left y in canvas coords
 * @param color     Agent shirt color (hex string like "#ff6b6b")
 * @param pose      One of the four character poses
 * @param direction Facing direction — 'right' is the default layout, 'left' mirrors
 * @param scale     Pixel scale factor (default 2 → each logical pixel = 2x2 canvas px)
 */
export function drawCharacter(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  pose: CharacterPose,
  direction: "left" | "right",
  scale: number = 2,
): void {
  const GRID_COLS = 10;
  const pixels = POSE_MAP[pose]();
  const hairColor = darkenColor(color, 0.55);

  const regionColors: { region: keyof PosePixels; fill: string }[] = [
    { region: "hair", fill: hairColor },
    { region: "face", fill: SKIN_COLOR },
    { region: "shirt", fill: color },
    { region: "pants", fill: PANTS_COLOR },
    { region: "shoes", fill: SHOE_COLOR },
  ];

  for (const { region, fill } of regionColors) {
    ctx.fillStyle = fill;
    for (const [row, col] of pixels[region]) {
      // Mirror horizontally for 'left' direction
      const drawCol = direction === "left" ? GRID_COLS - 1 - col : col;
      ctx.fillRect(
        x + drawCol * scale,
        y + row * scale,
        scale,
        scale,
      );
    }
  }
}
