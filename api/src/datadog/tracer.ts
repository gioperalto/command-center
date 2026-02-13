import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import tracer from "dd-trace";

tracer.init({
  service: process.env.DD_SERVICE || "command-center",
  env: process.env.DD_ENV || "development",
  version: process.env.DD_VERSION || "1.0.0",
  port: process.env.DD_TRACE_AGENT_PORT ? parseInt(process.env.DD_TRACE_AGENT_PORT) : 8126,
  logInjection: true,
});

export default tracer;