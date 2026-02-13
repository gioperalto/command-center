import { useState, useEffect, useRef } from "react";
import { EventLogEntry } from "../types";
import { fetchEvents } from "../api/client";

export function useEvents(): EventLogEntry[] {
  const [events, setEvents] = useState<EventLogEntry[]>([]);
  const lastTimestamp = useRef<number | undefined>(undefined);

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        if (data.length > 0)
          lastTimestamp.current = data[data.length - 1].timestamp;
      })
      .catch(() => {});
    const interval = setInterval(() => {
      fetchEvents(lastTimestamp.current)
        .then((newEvents) => {
          if (newEvents.length > 0) {
            lastTimestamp.current = newEvents[newEvents.length - 1].timestamp;
            setEvents((prev) => [...prev, ...newEvents].slice(-200));
          }
        })
        .catch(() => {});
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return events;
}
