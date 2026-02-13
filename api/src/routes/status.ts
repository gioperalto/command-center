import { Router } from "express";
import { getAllAgentStates } from "../agents/simulator.js";

const router = Router();

router.get("/employee-status", (_req, res) => {
  res.json(getAllAgentStates());
});

export default router;
