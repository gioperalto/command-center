import { Router } from "express";
import { getEvents } from "../store/events.js";

const router = Router();

router.get("/events", (req, res) => {
  const since = req.query.since ? Number(req.query.since) : undefined;
  res.json(getEvents(since));
});

export default router;
