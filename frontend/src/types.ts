export type AgentStatus = "working" | "idle";

export interface AgentState {
  id: string;
  name: string;
  role: string;
  color: string;
  deskItem: string;
  cubicle: number;
  status: AgentStatus;
}

export interface EventLogEntry {
  id: string;
  timestamp: number;
  agentId: string;
  agentName: string;
  agentColor: string;
  action: string;
  detail: string;
}
