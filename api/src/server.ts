import "./datadog/instrumentation.js";
import express from "express";
import cors from "cors";
import statusRouter from "./routes/status.js";
import eventsRouter from "./routes/events.js";
import { initSimulator } from "./agents/simulator.js";
import { logger } from "./datadog/instrumentation.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Request logging with injected trace context
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", statusRouter);
app.use("/api", eventsRouter);

initSimulator();

app.listen(PORT, () => {
  logger.info(`[api] listening on port ${PORT}`);
});
