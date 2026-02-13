import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import tracer from "dd-trace";

tracer.init({
  service: process.env.DD_SERVICE || "command-center",
  env: process.env.DD_ENV || "development",
});

export function traceLLMCall(agentName: string, action: string, detail: string): void {
  const span = tracer.startSpan("llm.call", {
    tags: {
      "resource.name": `${agentName}.${action}`,
      "agent.name": agentName,
      "agent.action": action,
      "llm.model": "openclaw-v1",
      "llm.prompt": detail,
    },
  });

  // Simulate LLM latency
  const latency = 100 + Math.random() * 400;
  setTimeout(() => {
    span.setTag("llm.response", `[${agentName}] Completed: ${detail}`);
    span.finish();
  }, latency);
}

export default tracer;
