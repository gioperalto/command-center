import { useState, useEffect, useRef } from "react";
import { EventLogEntry } from "../types";
import { fetchEvents } from "../api/client";

export function useEvents(): EventLogEntry[] {
  const [events, setEvents] = useState<EventLogEntry[]>([]);
  const lastTimestamp = useRef<number | undefined>(undefined);
  const seenIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        for (const e of data) seenIds.current.add(e.id);
        setEvents(data);
        if (data.length > 0)
          lastTimestamp.current = data[data.length - 1].timestamp;
      })
      .catch(() => {});
    const interval = setInterval(() => {
      fetchEvents(lastTimestamp.current)
        .then((newEvents) => {
          // Deduplicate — events sharing a timestamp can be returned twice
          const unique = newEvents.filter((e) => !seenIds.current.has(e.id));
          if (unique.length > 0) {
            for (const e of unique) seenIds.current.add(e.id);
            lastTimestamp.current = unique[unique.length - 1].timestamp;
            setEvents((prev) => [...prev, ...unique].slice(-200));
          }
        })
        .catch(() => {});
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return events;
}
