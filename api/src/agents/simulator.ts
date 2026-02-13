import { AgentState, AgentStatus } from "../types";
import { AGENTS } from "./definitions";
import { addEvent } from "../store/events";
import { traceLLMCall } from "../datadog/instrumentation";

const agentStates: Map<string, AgentState> = new Map();

const WORKING_ACTIONS = [
  "Analyzing dataset for anomalies",
  "Generating report draft",
  "Reviewing pull request #42",
  "Designing new component layout",
  "Encoding video segment",
  "Animating transition sequence",
  "Running test suite",
  "Scouting competitor features",
  "Compiling research findings",
  "Writing documentation",
  "Debugging edge case",
  "Creating color palette",
  "Processing footage",
  "Interpolating keyframes",
  "Validating API responses",
  "Mapping user journey",
];

const IDLE_ACTIONS = [
  "Grabbing coffee",
  "Taking a short break",
  "Chatting in the kitchen",
  "Stretching at their desk",
  "Checking messages",
  "Browsing the lounge",
  "Refilling water bottle",
  "Having a snack",
];

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function initSimulator(): void {
  for (const agent of AGENTS) {
    const status: AgentStatus = Math.random() > 0.3 ? "working" : "idle";
    agentStates.set(agent.id, { ...agent, status });
    const action = status === "working" ? "Started working" : "Going idle";
    const detail = status === "working" ? pickRandom(WORKING_ACTIONS) : pickRandom(IDLE_ACTIONS);
    addEvent({
      agentId: agent.id,
      agentName: agent.name,
      agentColor: agent.color,
      action,
      detail,
    });
    traceLLMCall(agent.name, action, detail);
  }

  for (const agent of AGENTS) {
    scheduleTransition(agent.id);
  }
}

function scheduleTransition(agentId: string): void {
  const delay = randomBetween(8000, 33000);
  setTimeout(() => {
    const state = agentStates.get(agentId);
    if (!state) return;

    const newStatus: AgentStatus = state.status === "working" ? "idle" : "working";
    state.status = newStatus;

    const action = newStatus === "working" ? "Started working" : "Going idle";
    const detail = newStatus === "working" ? pickRandom(WORKING_ACTIONS) : pickRandom(IDLE_ACTIONS);

    addEvent({
      agentId: state.id,
      agentName: state.name,
      agentColor: state.color,
      action,
      detail,
    });
    traceLLMCall(state.name, action, detail);

    scheduleTransition(agentId);
  }, delay);
}

export function getAllAgentStates(): AgentState[] {
  return Array.from(agentStates.values());
}
