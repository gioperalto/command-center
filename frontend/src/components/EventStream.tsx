import { useEffect, useRef } from "react";
import { EventLogEntry } from "../types";

interface EventStreamProps {
  events: EventLogEntry[];
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function EventStream({ events }: EventStreamProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  return (
    <div
      style={{
        width: 280,
        minWidth: 280,
        background: "#0d1117",
        borderLeft: "1px solid #1e2a3a",
        display: "flex",
        flexDirection: "column",
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 14px 10px",
          borderBottom: "1px solid #1e2a3a",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: "#4ade80",
          textTransform: "uppercase",
          textShadow: "0 0 8px rgba(74, 222, 128, 0.4)",
        }}
      >
        {">"} Event Log
      </div>

      {/* Scrolling event list */}
      <div
        ref={scrollRef}
        className="event-stream-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "4px 0",
        }}
      >
        {events.length === 0 && (
          <div
            style={{
              padding: "20px 14px",
              color: "#4a5568",
              fontSize: 11,
              fontStyle: "italic",
            }}
          >
            Waiting for events...
          </div>
        )}
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              padding: "6px 14px",
              borderBottom: "1px solid #151d2a",
              fontSize: 11,
              lineHeight: 1.5,
            }}
          >
            {/* Timestamp */}
            <span style={{ color: "#4a5568", marginRight: 6 }}>
              {formatTime(event.timestamp)}
            </span>

            {/* Agent color dot */}
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: event.agentColor,
                marginRight: 5,
                verticalAlign: "middle",
                boxShadow: `0 0 4px ${event.agentColor}66`,
              }}
            />

            {/* Agent name */}
            <span
              style={{
                color: event.agentColor,
                fontWeight: 600,
                marginRight: 4,
              }}
            >
              {event.agentName}
            </span>

            {/* Action */}
            <span style={{ color: "#8b949e" }}>{event.action}</span>

            {/* Detail */}
            {event.detail && (
              <div
                style={{
                  color: "#6b7280",
                  fontSize: 10,
                  marginTop: 2,
                  paddingLeft: 12,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {event.detail}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
