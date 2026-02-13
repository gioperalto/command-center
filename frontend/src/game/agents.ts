// ---------------------------------------------------------------------------
// Agent entity management — position, movement, animation state
// ---------------------------------------------------------------------------

import type { CharacterPose } from "./characters";
import { getDeskPosition, getRandomWanderTarget } from "./pathfinding";

export interface AgentEntity {
  id: string;
  name: string;
  color: string;
  deskItem: string;
  cubicle: number;
  status: "working" | "idle";
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  pose: CharacterPose;
  direction: "left" | "right";
  animTimer: number;
  idleWanderTimer: number;
  isMoving: boolean;
  isSitting: boolean;
}

// Movement speed in pixels per second
const MOVE_SPEED = 80;
// Seconds between walk-frame toggles
const WALK_FRAME_INTERVAL = 0.3;
// Seconds between picking a new idle wander target
const IDLE_WANDER_INTERVAL_MIN = 2.0;
const IDLE_WANDER_INTERVAL_MAX = 6.0;
// Distance threshold to consider "arrived"
const ARRIVAL_THRESHOLD = 2;

function randomWanderDelay(): number {
  return (
    IDLE_WANDER_INTERVAL_MIN +
    Math.random() * (IDLE_WANDER_INTERVAL_MAX - IDLE_WANDER_INTERVAL_MIN)
  );
}

/**
 * Create an AgentEntity from agent metadata.
 * The agent starts at its assigned cubicle desk position.
 */
export function createAgentEntity(
  agent: {
    id: string;
    name: string;
    color: string;
    deskItem: string;
    cubicle: number;
    status: string;
  },
  cubiclePositions: { x: number; y: number }[],
): AgentEntity {
  const deskPos = getDeskPosition(agent.cubicle, cubiclePositions);
  const status = agent.status === "working" ? "working" : "idle";

  return {
    id: agent.id,
    name: agent.name,
    color: agent.color,
    deskItem: agent.deskItem,
    cubicle: agent.cubicle,
    status,
    x: deskPos.x,
    y: deskPos.y,
    targetX: deskPos.x,
    targetY: deskPos.y,
    pose: status === "working" ? "sitting" : "standing",
    direction: "right",
    animTimer: 0,
    idleWanderTimer: randomWanderDelay(),
    isMoving: false,
    isSitting: status === "working",
  };
}

/**
 * Per-frame update for an agent entity.
 *
 * @param agent             The agent to update (mutated in place)
 * @param dt                Delta time in seconds
 * @param cubiclePositions  Array of {x,y} for each cubicle (top-left)
 * @param wanderTargets     Array of wander destinations (used as fallback;
 *                          the agent also uses getRandomWanderTarget)
 */
export function updateAgent(
  agent: AgentEntity,
  dt: number,
  cubiclePositions: { x: number; y: number }[],
  _wanderTargets: { x: number; y: number }[],
): void {
  // ---- Working logic ----
  if (agent.status === "working") {
    if (agent.isSitting) {
      // Already at desk, just keep sitting
      agent.pose = "sitting";
      agent.isMoving = false;
      return;
    }

    // Need to walk to desk
    const deskPos = getDeskPosition(agent.cubicle, cubiclePositions);
    agent.targetX = deskPos.x;
    agent.targetY = deskPos.y;

    if (moveTowardTarget(agent, dt)) {
      // Arrived at desk
      agent.isSitting = true;
      agent.isMoving = false;
      agent.pose = "sitting";
    }
    return;
  }

  // ---- Idle logic ----
  if (agent.isSitting) {
    // Just stood up from desk — pick a wander target
    agent.isSitting = false;
    agent.pose = "standing";
    pickNewWanderTarget(agent);
    return;
  }

  if (agent.isMoving) {
    if (moveTowardTarget(agent, dt)) {
      // Arrived at wander destination
      agent.isMoving = false;
      agent.pose = "standing";
      agent.idleWanderTimer = randomWanderDelay();
    }
  } else {
    // Standing idle — count down to next wander
    agent.idleWanderTimer -= dt;
    if (agent.idleWanderTimer <= 0) {
      pickNewWanderTarget(agent);
    }
  }
}

/**
 * Sync agent status from server data.
 * Call this when polled status differs from current status.
 */
export function syncAgentStatus(
  agent: AgentEntity,
  newStatus: "working" | "idle",
  cubiclePositions: { x: number; y: number }[],
): void {
  if (agent.status === newStatus) return;

  agent.status = newStatus;

  if (newStatus === "working") {
    // Start moving back to desk
    const deskPos = getDeskPosition(agent.cubicle, cubiclePositions);
    agent.targetX = deskPos.x;
    agent.targetY = deskPos.y;
    agent.isSitting = false;
    agent.isMoving = true;
    agent.pose = "standing";
  } else {
    // Idle — stand up from desk, will pick wander target next frame
    agent.isSitting = false;
    agent.isMoving = false;
    agent.pose = "standing";
    agent.idleWanderTimer = 0.5; // short delay before wandering
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Move agent toward its target position.
 * Returns true when the agent has arrived (within threshold).
 */
function moveTowardTarget(agent: AgentEntity, dt: number): boolean {
  const dx = agent.targetX - agent.x;
  const dy = agent.targetY - agent.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < ARRIVAL_THRESHOLD) {
    agent.x = agent.targetX;
    agent.y = agent.targetY;
    return true;
  }

  // Normalize direction and move
  const step = MOVE_SPEED * dt;
  if (step >= dist) {
    agent.x = agent.targetX;
    agent.y = agent.targetY;
    return true;
  }

  agent.x += (dx / dist) * step;
  agent.y += (dy / dist) * step;
  agent.isMoving = true;

  // Update facing direction
  if (Math.abs(dx) > 0.5) {
    agent.direction = dx > 0 ? "right" : "left";
  }

  // Animate walk cycle
  agent.animTimer += dt;
  if (agent.animTimer >= WALK_FRAME_INTERVAL) {
    agent.animTimer -= WALK_FRAME_INTERVAL;
    agent.pose = agent.pose === "walk_a" ? "walk_b" : "walk_a";
  }

  return false;
}

/**
 * Pick a new random wander destination and start moving.
 */
function pickNewWanderTarget(agent: AgentEntity): void {
  const target = getRandomWanderTarget();
  agent.targetX = target.x;
  agent.targetY = target.y;
  agent.isMoving = true;
  agent.animTimer = 0;
  agent.pose = "walk_a";
}
