import { EventLogEntry } from "../types.js";

const MAX_EVENTS = 500;
const events: EventLogEntry[] = [];
let nextId = 1;

export function addEvent(entry: Omit<EventLogEntry, "id" | "timestamp">): EventLogEntry {
  const event: EventLogEntry = {
    ...entry,
    id: String(nextId++),
    timestamp: Date.now(),
  };
  events.push(event);
  if (events.length > MAX_EVENTS) {
    events.splice(0, events.length - MAX_EVENTS);
  }
  return event;
}

export function getEvents(since?: number): EventLogEntry[] {
  if (since) {
    return events.filter((e) => e.timestamp > since);
  }
  return [...events];
}
