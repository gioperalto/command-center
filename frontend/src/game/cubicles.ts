import {
  CUBICLES,
  WALL_COLOR,
  DESK_COLOR,
  MONITOR_FRAME,
  MONITOR_SCREEN,
  CHAIR_COLOR,
  PARTITION_COLOR,
} from "./constants";
import { drawDeskItem } from "./desk-items";

export interface CubicleAgent {
  cubicle: number;
  status: string;
  name: string;
  color: string;
  deskItem: string;
}

/**
 * Draw the 4x2 cubicle grid with partitions, desks, monitors, chairs,
 * name plates, status dots, and desk items.
 */
export function drawCubicles(
  ctx: CanvasRenderingContext2D,
  agentStates?: CubicleAgent[],
): void {
  // Build lookup: cubicle index -> agent info
  const agentMap = new Map<number, CubicleAgent>();
  if (agentStates) {
    for (const a of agentStates) {
      agentMap.set(a.cubicle, a);
    }
  }

  for (let i = 0; i < CUBICLES.length; i++) {
    const c = CUBICLES[i];
    const agent = agentMap.get(i);

    // ---- Partition walls (L-shaped) ----------------------------------------
    ctx.fillStyle = PARTITION_COLOR;
    // top wall of cubicle
    ctx.fillRect(c.x, c.y, c.w, 3);
    // left wall
    ctx.fillRect(c.x, c.y, 3, c.h);
    // right wall
    ctx.fillRect(c.x + c.w - 3, c.y, 3, c.h);

    // ---- Subtle floor tint inside cubicle ----------------------------------
    ctx.fillStyle = "#0f1520";
    ctx.fillRect(c.x + 3, c.y + 3, c.w - 6, c.h - 3);

    // ---- Desk (centered, in upper portion of cubicle) ----------------------
    const deskW = 100;
    const deskH = 35;
    const deskX = c.x + (c.w - deskW) / 2;
    const deskY = c.y + 20;

    ctx.fillStyle = DESK_COLOR;
    ctx.fillRect(deskX, deskY, deskW, deskH);
    // desk surface highlight
    ctx.fillStyle = "#3a2f1a";
    ctx.fillRect(deskX + 3, deskY + 3, deskW - 6, deskH - 6);

    // Desk legs
    ctx.fillStyle = "#221a08";
    ctx.fillRect(deskX + 4, deskY + deskH, 3, 6);
    ctx.fillRect(deskX + deskW - 7, deskY + deskH, 3, 6);

    // ---- Monitor on desk ---------------------------------------------------
    const monW = 28;
    const monH = 20;
    const monX = deskX + (deskW - monW) / 2;
    const monY = deskY + 4;

    // Frame
    ctx.fillStyle = MONITOR_FRAME;
    ctx.fillRect(monX, monY, monW, monH);
    // Screen
    ctx.fillStyle = MONITOR_SCREEN;
    ctx.fillRect(monX + 2, monY + 2, monW - 4, monH - 4);

    // Scanline effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    for (let sy = monY + 2; sy < monY + monH - 2; sy += 3) {
      ctx.fillRect(monX + 2, sy, monW - 4, 1);
    }

    // Random flicker overlay (~10% of frames)
    if (Math.random() < 0.1) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      ctx.fillRect(monX + 2, monY + 2, monW - 4, monH - 4);
    }

    // Screen glow lines (fake text)
    ctx.fillStyle = "#2a5a8c";
    ctx.fillRect(monX + 4, monY + 5, 16, 1);
    ctx.fillRect(monX + 4, monY + 8, 12, 1);
    ctx.fillRect(monX + 4, monY + 11, 18, 1);
    ctx.fillRect(monX + 4, monY + 14, 10, 1);

    // Monitor stand
    ctx.fillStyle = MONITOR_FRAME;
    ctx.fillRect(monX + monW / 2 - 3, monY + monH, 6, 4);
    ctx.fillRect(monX + monW / 2 - 6, monY + monH + 4, 12, 2);

    // ---- Chair (in front of desk) ------------------------------------------
    const chairX = deskX + deskW / 2 - 10;
    const chairY = deskY + deskH + 16;

    ctx.fillStyle = CHAIR_COLOR;
    // seat
    ctx.fillRect(chairX, chairY, 20, 14);
    // backrest
    ctx.fillStyle = "#2a2a3a";
    ctx.fillRect(chairX + 2, chairY + 14, 16, 4);

    // Chair wheels (tiny dots)
    ctx.fillStyle = "#181818";
    ctx.fillRect(chairX + 2, chairY + 18, 3, 2);
    ctx.fillRect(chairX + 15, chairY + 18, 3, 2);

    // ---- Desk item (placed to the right of monitor) ------------------------
    if (agent?.deskItem) {
      drawDeskItem(ctx, agent.deskItem, deskX + deskW - 30, deskY + 4);
    }

    // ---- Keyboard on desk --------------------------------------------------
    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(monX - 2, monY + monH + 6, monW + 4, 5);
    ctx.fillStyle = "#383838";
    // key rows
    for (let k = 0; k < 6; k++) {
      ctx.fillRect(monX + k * 5, monY + monH + 7, 4, 1);
      ctx.fillRect(monX + k * 5, monY + monH + 9, 4, 1);
    }

    // ---- Name plate & status dot -------------------------------------------
    const plateY = c.y + c.h - 22;
    const plateX = c.x + 12;

    // Name plate background
    ctx.fillStyle = "#1a1f2e";
    ctx.fillRect(plateX, plateY, c.w - 24, 16);
    ctx.fillStyle = "#252b3a";
    ctx.fillRect(plateX + 1, plateY + 1, c.w - 26, 14);

    if (agent) {
      // Status dot
      const dotColor = agent.status === "working" ? "#33dd66" : "#dd4444";
      ctx.fillStyle = dotColor;
      ctx.fillRect(plateX + 5, plateY + 5, 6, 6);

      // Agent name in their color
      ctx.fillStyle = agent.color;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(agent.name, plateX + 16, plateY + 12);
    } else {
      // Empty cubicle
      ctx.fillStyle = "#334";
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText("vacant", plateX + 16, plateY + 12);
    }
  }
}
