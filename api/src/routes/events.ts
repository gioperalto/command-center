import { Router } from "express";
import { getEvents } from "../store/events.js";
import { logger } from "../datadog/instrumentation.js";

const router = Router();

router.get("/events", (req, res) => {
  const since = req.query.since ? Number(req.query.since) : undefined;
  const events = getEvents(since);
  logger.info(`events: returning ${events.length} entries${since ? ` (since ${since})` : ""}`);
  res.json(events);
});

export default router;
