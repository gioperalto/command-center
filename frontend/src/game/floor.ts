import {
  OFFICE_WIDTH,
  TILE_SIZE,
  FLOOR_DARK,
  FLOOR_LIGHT,
  CORRIDOR_TOP_Y,
  CORRIDOR_BOTTOM_BOTTOM,
} from "./constants";

/**
 * Draw the checkered dark-navy tile floor across the walkable office area.
 * Rooms (y < 180) paint their own backgrounds, so we only tile the corridors
 * and cubicle zones (y 180..660).
 */
export function drawFloor(ctx: CanvasRenderingContext2D): void {
  const cols = Math.ceil(OFFICE_WIDTH / TILE_SIZE);
  const startY = CORRIDOR_TOP_Y;
  const endY = CORRIDOR_BOTTOM_BOTTOM;
  const rows = Math.ceil((endY - startY) / TILE_SIZE);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isEven = (r + c) % 2 === 0;
      ctx.fillStyle = isEven ? FLOOR_DARK : FLOOR_LIGHT;
      ctx.fillRect(
        c * TILE_SIZE,
        startY + r * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
      );
    }
  }
}
