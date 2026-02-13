import "./datadog/instrumentation.js";
import express from "express";
import cors from "cors";
import statusRouter from "./routes/status.js";
import eventsRouter from "./routes/events.js";
import { initSimulator } from "./agents/simulator.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", statusRouter);
app.use("/api", eventsRouter);

initSimulator();

app.listen(PORT, () => {
  console.log(`[api] listening on port ${PORT}`);
});
