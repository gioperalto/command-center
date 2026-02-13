import { useState, useEffect } from "react";
import { AgentState } from "../types";
import { fetchAgentStatus } from "../api/client";

export function useAgentStatus(): AgentState[] {
  const [agents, setAgents] = useState<AgentState[]>([]);

  useEffect(() => {
    fetchAgentStatus().then(setAgents).catch(() => {});
    const interval = setInterval(() => {
      fetchAgentStatus().then(setAgents).catch(() => {});
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return agents;
}
