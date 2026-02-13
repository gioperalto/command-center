import { Router } from "express";
import { getAllAgentStates } from "../agents/simulator.js";
import { logger } from "../datadog/instrumentation.js";

const router = Router();

router.get("/employee-status", (_req, res) => {
  const states = getAllAgentStates();
  const working = states.filter((a) => a.status === "working").length;
  logger.info(`employee-status: ${working}/${states.length} agents working`);
  res.json(states);
});

export default router;
