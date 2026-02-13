import { AgentState, EventLogEntry } from "../types";

export async function fetchAgentStatus(): Promise<AgentState[]> {
  const res = await fetch("/api/employee-status");
  return res.json();
}

export async function fetchEvents(since?: number): Promise<EventLogEntry[]> {
  const url = since ? `/api/events?since=${since}` : "/api/events";
  const res = await fetch(url);
  return res.json();
}
