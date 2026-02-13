import { AgentState } from "../types";

interface StatusBarProps {
  agents: AgentState[];
}

export default function StatusBar({ agents }: StatusBarProps) {
  return (
    <div
      style={{
        height: 48,
        minHeight: 48,
        background: "#111827",
        borderTop: "1px solid #1e2a3a",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 12px",
        overflowX: "auto",
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      {agents.map((agent) => {
        const isWorking = agent.status === "working";
        return (
          <div
            key={agent.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#1a1f2e",
              borderRadius: 6,
              padding: "4px 10px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {/* Status dot */}
            <span
              className="status-dot"
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: isWorking ? "#22c55e" : "#ef4444",
                boxShadow: isWorking
                  ? "0 0 6px rgba(34, 197, 94, 0.6)"
                  : "0 0 6px rgba(239, 68, 68, 0.4)",
              }}
            />

            {/* Agent name */}
            <span
              style={{
                color: agent.color,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {agent.name}
            </span>

            {/* Status label */}
            <span
              style={{
                fontSize: 10,
                color: isWorking ? "#4ade80" : "#f87171",
                opacity: 0.8,
              }}
            >
              {isWorking ? "Working" : "Idle"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
