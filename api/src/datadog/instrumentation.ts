import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import tracer from "./tracer";

/**
 * Extract trace context from the active span and return a prefix string
 * for structured log correlation: dd.trace_id, dd.span_id, dd.service.
 */
function traceContext(): string {
  const span = tracer.scope().active();
  if (!span) return "";
  const context = span.context();
  return `[dd.trace_id=${context.toTraceId()} dd.span_id=${context.toSpanId()} dd.service=${process.env.DD_SERVICE || "command-center"}]`;
}

/**
 * Trace-aware logger that injects dd.trace_id and dd.span_id into every
 * log line, enabling Datadog log ↔ trace correlation.
 */
export const logger = {
  info(msg: string, ...args: unknown[]) {
    console.log(`${traceContext()} ${msg}`, ...args);
  },
  warn(msg: string, ...args: unknown[]) {
    console.warn(`${traceContext()} ${msg}`, ...args);
  },
  error(msg: string, ...args: unknown[]) {
    console.error(`${traceContext()} ${msg}`, ...args);
  },
};

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