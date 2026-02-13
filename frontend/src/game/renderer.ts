import { CANVAS_WIDTH, CANVAS_HEIGHT, OFFICE_WIDTH } from "./constants";
import { drawFloor } from "./floor";
import { drawRooms } from "./rooms";
import { drawCubicles } from "./cubicles";
import { drawCharacter } from "./characters";
import type { AgentEntity } from "./agents";

// ---------------------------------------------------------------------------
// Master render function — called once per frame
// ---------------------------------------------------------------------------
export function render(
  ctx: CanvasRenderingContext2D,
  state: { entities: AgentEntity[] },
): void {
  // ---- Clear entire canvas ------------------------------------------------
  ctx.fillStyle = "#0a0e17";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // ---- Draw office layers in order ----------------------------------------
  drawFloor(ctx);
  drawRooms(ctx);

  // Build agent display data for cubicles
  const cubicleAgents = state.entities.map((e) => ({
    cubicle: e.cubicle,
    status: e.status,
    name: e.name,
    color: e.color,
    deskItem: e.deskItem,
  }));
  drawCubicles(ctx, cubicleAgents);

  // ---- Draw characters (sorted by y for depth) ----------------------------
  const sorted = [...state.entities].sort((a, b) => a.y - b.y);
  for (const entity of sorted) {
    drawCharacter(
      ctx,
      Math.round(entity.x),
      Math.round(entity.y),
      entity.color,
      entity.pose,
      entity.direction,
      2,
    );
  }

  // ---- Right-side separator line ------------------------------------------
  ctx.fillStyle = "#1a1f2e";
  ctx.fillRect(OFFICE_WIDTH, 0, 2, CANVAS_HEIGHT);
}
