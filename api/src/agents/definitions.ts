import { AgentDefinition } from "../types";

export const AGENTS: AgentDefinition[] = [
  { id: "researcher", name: "Ada", role: "Researcher", color: "#4a9eff", deskItem: "globe", cubicle: 0 },
  { id: "writer", name: "Byron", role: "Writer", color: "#9b59b6", deskItem: "books", cubicle: 1 },
  { id: "developer", name: "Cleo", role: "Developer", color: "#2ecc71", deskItem: "coffee", cubicle: 2 },
  { id: "designer", name: "Dex", role: "Designer", color: "#e74c3c", deskItem: "palette", cubicle: 3 },
  { id: "video", name: "Echo", role: "Video", color: "#f39c12", deskItem: "camera", cubicle: 4 },
  { id: "motion", name: "Flux", role: "Motion", color: "#1abc9c", deskItem: "waveform", cubicle: 5 },
  { id: "qa", name: "Guard", role: "QA", color: "#3498db", deskItem: "shield", cubicle: 6 },
  { id: "scout", name: "Hex", role: "Scout", color: "#e67e22", deskItem: "fire", cubicle: 7 },
];
