import { CANVAS_WIDTH, CANVAS_HEIGHT, CUBICLES } from "./constants";
import { render } from "./renderer";
import { AgentEntity, createAgentEntity, updateAgent, syncAgentStatus } from "./agents";
import { WANDER_TARGETS } from "./pathfinding";
import type { AgentState } from "../types";

/**
 * OfficeEngine drives the requestAnimationFrame loop, manages agent entities,
 * and bridges React data (polled AgentState[]) with the per-frame simulation.
 */
export class OfficeEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private entities: Map<string, AgentEntity> = new Map();
  private rafId: number | null = null;
  private lastTime: number = 0;

  private cubiclePositions = CUBICLES.map((c) => ({ x: c.x, y: c.y }));

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get 2d context");
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
  }

  /**
   * Sync agent data from the API. Creates new entities for agents we haven't
   * seen before, and syncs status changes for existing ones.
   */
  updateAgents(agents: AgentState[]): void {
    for (const a of agents) {
      const existing = this.entities.get(a.id);
      if (!existing) {
        this.entities.set(a.id, createAgentEntity(a, this.cubiclePositions));
      } else {
        if (existing.status !== a.status) {
          syncAgentStatus(existing, a.status, this.cubiclePositions);
        }
      }
    }
  }

  start(): void {
    if (this.rafId !== null) return;
    this.lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - this.lastTime) / 1000, 0.1); // cap dt at 100ms
      this.lastTime = now;

      // Update all agent entities
      for (const entity of this.entities.values()) {
        updateAgent(entity, dt, this.cubiclePositions, WANDER_TARGETS);
      }

      // Build display data and render
      const entities = Array.from(this.entities.values());
      render(this.ctx, { entities });

      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}
